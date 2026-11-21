# HEAL Plan

Mobile-first personal plan: **Gym · Nutrition · Timetable · Body tracking**.

Open `index.html` in Chrome on your phone, or host free on GitHub Pages.

## Features

- **Home** — phase status, birthday countdown, **live numbers from Measure logs** vs start vs 20 Dec vs Baki targets
- **Gym** — unique start/finish photos, target muscles, full how-to + mistakes, YouTube form links; **multi-set logger** + **Use last time**; warm-up (3 days) → Build → Full with archive
- **Muscles** — tap body map / pills to learn muscle names and related exercises
- **Measure** — Sunday weight/waist; full tape every 14 days; updates Home live column
- **Food / Day** — change automatically by phase (warm-up days 1–3 / build day 4–14 / full day 15+)

Logs: **localStorage** (`heal-v2`). Hard-refresh after pulls. Export JSON from Measure.

## Use on phone at gym

1. Open the site in **Chrome**
2. Menu → **Add to Home screen**
3. Use **Gym** tab while training; log each set
4. Every **Sunday** open **Measure**

## GitHub Pages (free)

Repo suggestion: `Dev-Inn-ovator/heal`

```bash
cd /home/sumanth/Documents/heal
git init
git add .
git commit -m "Add HEAL mobile plan site"
git branch -M main
git remote add origin https://github.com/Dev-Inn-ovator/heal.git
git push -u origin main
```

Then: GitHub → Settings → Pages → Deploy from **main** / root.

Site URL will be: `https://dev-inn-ovator.github.io/heal/`

## Notes

- Exercise photos load from the public [free-exercise-db](https://github.com/yuhonas/free-exercise-db) (needs network at gym Wi‑Fi / mobile data).
- No health diagnoses are named in the UI; nutrition supports general recovery, lower gut comfort, and sexual health via food/sleep/training.
