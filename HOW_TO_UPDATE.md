# How to Update Your Website

Your website is managed through **Sanity Studio** — a friendly visual editor that works in any web browser. You don't need to touch any code, open a terminal, or know anything about GitHub.

---

## How to log in

1. Open your web browser and go to: **https://wonder-montessori.sanity.studio**
2. Sign in with your email and password
3. You'll see a clean editing dashboard on the left

That's it — you're in.

---

## What you can edit

### School Information
> Controls: school name, tagline, address, phone, fax, extensions, email, hours,
> program locations, and the Google Calendar ID

Click **School Information** in the left sidebar. The fields are split into three tabs —
**Identity**, **Contact**, and **Calendar & Forms**. Change any field, then click the blue
**Publish** button.

Your website will automatically update within about 1 minute.

Changing the phone number, address, or hours here updates them **everywhere** on the
site at once — the footer, the tour page, and the map all read from this one place.

---

### Programs & Tuition
> Controls: each program's name, age range, description, schedules, tuition, and photo

Click **Programs**. You'll see your three programs: Infant & Toddlers, Toddler & Two's,
and 3–6 Primary.

- **To change tuition**: Click the program → scroll to **Schedules & Monthly Tuition** →
  each row is one schedule option (for example "5 Full Days", "7:00 AM – 6:00 PM", "$2,230").
  Edit the price → Publish
- **To add a schedule option**: In that same list, click **"Add item"** → fill in the
  schedule name, hours, and price → Publish
- **To reorder programs**: Change the "Display Order" number. Youngest program should be 1.

> **Every year:** when the new Tuition Plans document is finalized, update the prices here
> so the website matches it. The website has no other copy of these numbers.

---

### The Calendar
> Controls: school closings, holidays, and events on the Calendar page

**This is no longer edited on the website.** The Calendar page displays your school's
Google Calendar directly, so whatever you put in Google Calendar appears on the website
automatically — usually within a few minutes.

- **To add a closing or event**: Add it in Google Calendar as you normally would
- **To change or delete one**: Change or delete it in Google Calendar
- **No publishing step, no waiting on your web developer**

The calendar being displayed is **wondermontessori60646@gmail.com**.

**Important:** that calendar must stay set to public, or visitors will see an error
instead of your dates. To check: open Google Calendar → hover the calendar name →
**⋮** → **Settings and sharing** → **Access permissions for events** → make sure
**"Make available to public"** is checked.

If you ever switch to a different Google Calendar, paste its Calendar ID into the
**Google Calendar ID** field under **School Information → Calendar & Forms** in Sanity.

---

### Staff & Team
> Controls: staff names, titles, bios, and headshot photos shown on the About page

Click **Staff & Team**.

- **To add a team member**: Click **"+"** → fill in name, title, bio, upload a photo → Publish
- **To update a bio**: Click the person → edit the text → Publish
- **To remove someone**: Open their profile → "..." → Delete

---

## How publishing works

1. Make your change in any field
2. Click the blue **Publish** button in the top right corner
3. Wait about **1 minute**
4. Visit your website — the change is live

If you don't see the change, try a **hard refresh** in your browser (hold Shift and click the refresh button).

---

## Tips

- You can **save a draft** without publishing — use this if you want to prepare a change ahead of time
- Changes won't appear on the live site until you click **Publish**
- If you make a mistake, click the **History** icon to see previous versions and restore them
- You can upload photos directly by clicking the image field and dragging a photo in
- **Calendar changes are the exception** — they happen in Google Calendar, with no Publish step

---

## What is *not* edited in Sanity

A few things live in the website's code and need your web developer:

| What | Where it lives |
|---|---|
| Calendar events and closings | **Google Calendar** — see the Calendar section above |
| Curriculum areas, tuition policy, daily schedule | `src/lib/content.ts` |
| Photographs | `src/lib/images.ts` — see `PHOTO_SWAP_LIST.md` |
| Page layouts and wording outside the fields above | The page files in `src/pages/` |

---

## Keeping the site honest

The website's facts come from two documents: the **Parent Handbook** and the current
year's **Tuition Plans**. When either is revised, tell your web developer — the tuition
figures, program names, age ranges, and contact details on the site all need to be
re-checked against the new version.

---

## Need help?

Contact your web developer. They set up this system and can help if anything looks wrong.

*Guide for Wonder Montessori School · Updated 2026*
