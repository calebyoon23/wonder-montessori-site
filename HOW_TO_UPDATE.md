# How to Update Your Website

Tuition is edited through **Sanity Studio** — a visual editor that works in any web
browser. You don't need to touch any code, open a terminal, or know anything about GitHub.

Sanity controls **one thing: tuition.** Everything else on the site — your phone number,
address, program names, photos, and page wording — lives in the website's code and is
changed by your web developer. That's deliberate: it means nothing on the site can be
accidentally broken while updating prices.

---

## How to log in

1. Open your web browser and go to: **https://wonder-montessori.sanity.studio**
2. Sign in with your email and password
3. You'll see a single item in the left sidebar: **Tuition & Pricing**

That's it — you're in.

---

## Editing tuition

Click **Tuition & Pricing**. You'll see:

**Academic Year** — the label shown above every tuition table on the site, e.g. `2026–2027`.

**Tuition by Program** — three blocks, one per program: Infant & Toddlers, Toddler &
Two's, and 3–6 Primary. The program name itself is greyed out and can't be changed here.
Open a program and you'll find its **Schedules & Monthly Tuition** list, where each row is
one schedule option:

| Field | Example |
|---|---|
| Schedule | `5 Full Days` |
| Hours | `7:00 AM – 6:00 PM` |
| Monthly Tuition | `$2,230` |

- **To change a price**: click the row, edit **Monthly Tuition**, then **Publish**
- **To add a schedule option**: click **"Add item"** at the bottom of the list, fill in all
  three fields, then **Publish**
- **To remove a schedule option**: click the **⋮** on the row → **Remove**
- **To reorder rows**: drag them by the handle on the left. The site shows them in this order.

Write prices exactly as they should appear, including the dollar sign and comma: `$2,230`.
If you type something in a different format the Studio shows a yellow warning — it will
still publish, but double-check it looks right on the site.

**Discounts & Fees** — five short notes shown underneath the tuition tables: the annual
payment discount, the sibling discount, early drop-off, proration, and registration fees.
Edit them like any other field.

- **To hide a note**: delete all the text in it. The note disappears from the site
  entirely; the rest stay put.
- The registration fees note currently says the amounts aren't published. If that changes,
  put the real figures in — families ask about this constantly.

> **Every year:** when the new Tuition Plans document is finalized, update the Academic
> Year and every price here so the website matches it.

---

## How publishing works

1. Make your change
2. Click the blue **Publish** button in the top right corner
3. Wait about **1 minute** while the site rebuilds
4. Visit your website — the change is live on the home page and the Programs page

If you don't see the change, try a hard refresh in your browser (hold Shift and click the
refresh button).

- You can **save a draft** without publishing — useful for preparing next year's prices ahead of time
- Changes won't appear on the live site until you click **Publish**
- If you make a mistake, click the **History** icon to see previous versions and restore one

---

## The Calendar

School closings, holidays, and events are **not** edited in Sanity. The Calendar page
displays your school's Google Calendar directly, so whatever you put in Google Calendar
appears on the website automatically — usually within a few minutes. No publishing step.

The calendar being displayed is **wondermontessori60646@gmail.com**.

**Important:** that calendar must stay set to public, or visitors will see an error
instead of your dates. To check: open Google Calendar → hover the calendar name →
**⋮** → **Settings and sharing** → **Access permissions for events** → make sure
**"Make available to public"** is checked.

---

## What is *not* edited in Sanity

Everything below lives in the website's code and needs your web developer:

| What | Where it lives |
|---|---|
| Calendar events and closings | **Google Calendar** — see above |
| School name, address, phone, fax, email, hours | `content/site-info.json` |
| Program names, age ranges, meal policy | `src/lib/site.ts` |
| Founder bios | `src/lib/site.ts` |
| Curriculum areas, credentials, quotations | `src/lib/content.ts` |
| Photographs | `src/lib/images.ts` |
| Page layouts and wording | The page files in `src/pages/` |
| Tuition fallback, used if Sanity is ever unreachable | `content/pricing.json` |

---

## Keeping the site honest

The website's facts come from two documents: the **Parent Handbook** and the current
year's **Tuition Plans**. When either is revised, tell your web developer — the program
names, age ranges, and contact details on the site all need to be re-checked against the
new version. Tuition figures you can update yourself, in the Studio.

---

## Need help?

Contact your web developer. They set up this system and can help if anything looks wrong.

*Guide for Wonder Montessori School · Updated 2026*
