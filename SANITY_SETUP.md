# Setting Up Sanity CMS

This guide walks you through connecting your Sanity Studio to the Wonder Montessori website so content is editable through a visual dashboard.

---

## Step 1 — Create a free Sanity account

1. Go to [sanity.io](https://sanity.io) and sign up for a free account
2. Click **"Create new project"**
3. Name it `wonder-montessori` (or anything you like)
4. Choose the **free plan**
5. Select dataset: `production`
6. Copy your **Project ID** — it looks like `abc123de`

---

## Step 2 — Add your credentials

1. In this project folder, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and fill in:
   ```
   SANITY_PROJECT_ID=abc123de    ← your real Project ID
   SANITY_DATASET=production
   ```
3. Open `studio/sanity.config.ts` and replace `YOUR_PROJECT_ID` with the same ID.

---

## Step 3 — Set up the Studio

```bash
cd studio
npm install
npm run dev
```

Visit **http://localhost:3333** in your browser. You'll see the Sanity Studio — log in with your Sanity account.

---

## Step 4 — Add your content

In the Studio:

1. **School Information** — Add your school name, address, phone, email, and Formspree ID
2. **Programs & Pricing** — Add each program with pricing, age range, and description
3. **Events & Calendar** — Add upcoming events
4. **Staff & Team** — Add staff bios and headshot photos

---

## Step 5 — Deploy the Studio (so the owner can use it from anywhere)

```bash
cd studio
npm run deploy
```

You'll be prompted to choose a hostname. Use something like `wonder-montessori`. The Studio will be available at:
```
https://wonder-montessori.sanity.studio
```

**Invite the owner:**
1. In the Studio, go to **Manage → Members**
2. Click **Invite** and enter the owner's email
3. Set role to **Editor**
4. She'll receive an email, set a password, and log in at the studio URL — no technical knowledge required

---

## Step 6 — Connect to Cloudflare Pages

### Build settings in Cloudflare Pages:
| Setting | Value |
|---|---|
| Framework | Astro |
| Build command | `npm run build` |
| Build output | `dist/` |
| Root directory | `/` (root of repo) |

### Environment variables in Cloudflare Pages:
Go to **Settings → Environment variables** and add:
```
SANITY_PROJECT_ID = your_project_id
SANITY_DATASET    = production
```

### Auto-rebuild when content changes (Sanity webhook):
1. In Cloudflare Pages → **Settings → Builds & deployments → Deploy hooks**
2. Create a hook named `Sanity Content Update` — copy the webhook URL
3. In **sanity.io/manage → your project → API → Webhooks**
4. Create a new webhook, paste the Cloudflare URL
5. Set trigger: `create`, `update`, `delete` on all document types

Now when the owner publishes a change in Sanity, the site automatically rebuilds within ~1 minute.

---

## Setting Up Formspree (contact form)

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Click **New Form** → name it `Wonder Montessori Tour Request`
3. Copy the **Form ID** (looks like `xrgjabnq`)
4. In Sanity Studio → **School Information** → paste the Form ID in the `Formspree Form ID` field
5. Publish the change — the contact form will now send email notifications to your address

---

## Quick Reference

| What | Where |
|---|---|
| Edit school info | Studio → School Information |
| Update pricing | Studio → Programs & Pricing |
| Add/remove events | Studio → Events & Calendar |
| Update staff bios | Studio → Staff & Team |
| Studio URL | https://wonder-montessori.sanity.studio |
| Owner guide | `HOW_TO_UPDATE.md` |
