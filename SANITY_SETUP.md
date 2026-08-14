# Setting Up Sanity CMS

This guide connects Sanity Studio to the Wonder Montessori website.

**Scope, on purpose:** Sanity controls **tuition and nothing else**. The Studio has one
schema, one document, and no way to create or delete documents. Everything else on the
site — school details, program names, staff, photos, copy — lives in the repo and changes
through a commit. See "How the content is split" at the bottom.

If Sanity is never configured, or the API is down at build time, the site builds from
`content/pricing.json` instead. It cannot break the site.

---

## Step 1 — Create a free Sanity account

1. Go to [sanity.io](https://sanity.io) and sign up for a free account
2. Click **"Create new project"**
3. Name it `wonder-montessori` (or anything you like)
4. Choose the **free plan**
5. Select dataset: `production`
6. Copy your **Project ID** — it looks like `abc123de`

---

## Step 2 — Point the website at the project

1. In this project folder, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Fill in your real project id:
   ```
   SANITY_PROJECT_ID=abc123de
   SANITY_DATASET=production
   ```

---

## Step 3 — Point the Studio at the project

The Studio reads its project id from its own environment file. Both the Studio and the
`sanity` command line tool pick it up from there — `sanity.cli.ts` passes it to the CLI,
which is what `sanity deploy` needs to know where to publish.

```bash
cd studio
echo "SANITY_STUDIO_PROJECT_ID=abc123de" > .env
npm install
npx sanity login          # opens a browser to authorize the CLI
npm run dev
```

Visit **http://localhost:3333** and log in with your Sanity account.

> The hosted address (`https://<name>.sanity.studio`) does **not** exist yet and will
> return 404 until you run Step 5. Until then, `localhost:3333` is the only way in.

---

## Step 4 — Create the tuition document

The Studio sidebar shows exactly one item: **Tuition & Pricing**. Open it. It opens
pre-filled with the current prices (seeded from `studio/schemas/tuition.ts`), so all you
have to do is click **Publish** once. That creates the singleton document with the fixed
id `tuition`, which is what the site queries.

From this point on, the Studio is the live source of truth for prices, and
`content/pricing.json` is only the offline fallback. The two are expected to diverge.

---

## Step 5 — Deploy the Studio (so the admin can use it from anywhere)

```bash
cd studio
npm run deploy
```

Choose a hostname such as `wonder-montessori`. The Studio will live at:
```
https://wonder-montessori.sanity.studio
```

**Invite the admin:**
1. Go to [sanity.io/manage](https://sanity.io/manage) → your project → **Members**
2. Click **Invite** and enter their email
3. Set role to **Editor**
4. They set a password and log in at the Studio URL — no technical knowledge required

An Editor can only ever reach the tuition document: the Studio exposes no other schema
type, the "new document" menu is empty, and create/delete/duplicate/unpublish actions are
removed in `studio/sanity.config.ts`.

---

## Step 6 — Hosting (Vercel)

The site is deployed on **Vercel**, in the team `wonder-montessori`. Vercel builds
whatever is on `main` and publishes it.

### Build settings
| Setting | Value |
|---|---|
| Framework | Astro (auto-detected) |
| Build command | `npm run build` |
| Output directory | `dist` |
| Root directory | `./` — the site is at the repo root; `studio/` is not built |

### Environment variables
**Settings → Environment Variables**, added to **all three** environments
(Production, Preview, Development):
```
SANITY_PROJECT_ID = 3yvu2fth
SANITY_DATASET    = production
```
Adding them to Production only is the usual mistake — preview deploys then serve
fallback prices. These must exist *before* a build runs, or that build bakes in
`content/pricing.json` and no Studio edit will ever appear.

### The repository must stay PUBLIC
This is load-bearing, not a preference. The project is on Vercel's Hobby plan,
which refuses to build a **private** repo when a commit carries any author other
than the account that owns the project. Deployments fail with "the commit author
did not have contributing access", and a manual redeploy is blocked too.

Two rules follow:
- Do not flip the repo back to private without moving the project to a Vercel
  account whose GitHub login matches the commit author, or upgrading to Pro.
- Do not add `Co-Authored-By:` trailers to commit messages. A second author on a
  commit is what triggered the block originally.

If deploys start failing silently, check this first.

### Auto-rebuild when prices change (Sanity webhook)
1. Vercel → **Settings → Git → Deploy Hooks** — create one for `main`, copy the URL
2. **sanity.io/manage → your project → API → Webhooks** — create a webhook, paste that URL
3. Trigger on `create`, `update`, `delete` for the `tuition` type

Without this, a published price change sits in Sanity until something else
triggers a build.

---

## DNS

DNS is hosted at **Cloudflare**; the domain is registered elsewhere (see below).
The records that point the site at Vercel:

| Name | Type | Value | Proxy |
|---|---|---|---|
| `@` | A | `76.76.21.21` | **DNS only** |
| `www` | CNAME | the project's `*.vercel-dns-0NN.com` target | **DNS only** |

Both must be **DNS only** (grey cloud). Cloudflare proxying in front of Vercel
breaks certificate issuing and produces 526 errors.

Everything else in the zone is mail: the `MX` to Google Workspace, `_dmarc`,
`google._domainkey`, the verification TXT, and SPF. Leave those alone when
changing the website.

> **Known issue, unresolved:** the SPF record still reads
> `v=spf1 ip4:66.96.128.0/18 -all`, authorising the old Homestead mail servers
> rather than Google. It should be `v=spf1 include:_spf.google.com ~all`. There
> are also two `_dmarc` TXT records; duplicates cause receivers to ignore DMARC
> entirely, so one should be deleted.

> **Registrar warning:** the domain was registered through Homestead (reselling
> Tucows). Cancelling the Homestead account repointed the nameservers to
> `ns1/ns2.expired.homestead.com`, which publish a null MX (`300 ~.`) that
> rejects all mail. The Cloudflare zone survived intact — only the nameserver
> delegation changed. If the site and email go dark at once, check the registry
> nameservers first.

---

## The tour request form (Formspree)

The form on `/contact` posts to Formspree, which emails the submission to
`info@wondermontessori.org`. The form id lives in `content/site-info.json` as
`formspreeId` and is currently `xaewjrab`.

The free tier allows 50 submissions per month. Beyond that, submissions are
dropped — silently, from the visitor's point of view.

To repoint it at a different address or account, create a new form at
[formspree.io](https://formspree.io), then replace `formspreeId` and deploy.
The destination address must be verified in Formspree before anything is
delivered.

---

## How the content is split

| Layer | Lives in | Changed by |
|---|---|---|
| Tuition (prices, schedules, academic year) | Sanity `tuition` singleton, falling back to `content/pricing.json` | **The admin, in the Studio** |
| School details (name, address, phone, hours, calendar id, Formspree id) | `content/site-info.json` | Developer |
| Program identity (name, age range, meal policy) | `src/lib/site.ts` | Developer |
| Founder bios | `src/lib/site.ts` | Developer |
| Curriculum, credentials, quotations | `src/lib/content.ts` | Developer |
| Photographs | `src/lib/images.ts` + `public/images/` | Developer |
| Calendar events | Google Calendar | School staff, directly |

### Adding or renaming a program

Program identity is code. To change one:

1. Edit `PROGRAMS` in `src/lib/site.ts` (slug, name, age range)
2. Add the matching slug to `PROGRAM_PHOTOS` in `src/lib/images.ts`
3. Add a fallback price block for the slug in `content/pricing.json`
4. Add the slug to `PROGRAM_SLUGS` and to `initialValue` in `studio/schemas/tuition.ts`
5. In the Studio, add a block for the new program under **Tuition by Program**

The slug is the join key across all five. A Sanity block whose slug matches nothing in
`PROGRAMS` is ignored; a program with no Sanity block falls back to `content/pricing.json`.

## Quick Reference

| What | Where |
|---|---|
| Update prices | Studio → Tuition & Pricing |
| Studio URL | https://wonder-montessori.sanity.studio (only after `npm run deploy`) |
| Admin guide | `HOW_TO_UPDATE.md` |
| Price fallback | `content/pricing.json` |
| Hosting | Vercel, team `wonder-montessori` |
| DNS | Cloudflare |
| Site query + merge logic | `src/lib/pricing.ts` |
