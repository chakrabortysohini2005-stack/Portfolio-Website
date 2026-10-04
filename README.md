# Sohini Chakraborty — Portfolio

A dark, high-contrast, fully responsive personal portfolio website for **Sohini Chakraborty** —
GIS Analyst, Geospatial Data Scientist & Geoinformatics researcher.

Built as a lightweight static site (no build step) so it can be hosted anywhere, including
**GitHub Pages**, Vercel or Netlify.

## Structure

| File | Purpose |
|------|---------|
| `index.html` | Single-page site markup (semantic HTML5) |
| `styles.css` | Dark theme, layout, responsive rules |
| `script.js` | Mobile nav, scroll reveal, active-link highlighting |
| `assets/` | Profile photo and media |

## Sections (in order)

1. Career Objective
2. Expertise
3. Education
4. Projects
5. Internship
6. Experience
7. Achievements & Awards
8. Certificates
9. Contact

## Running locally

Just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying on GitHub Pages

1. Push to GitHub.
2. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
3. Pick the branch and `/ (root)` folder, then save.

## Design notes

- **Restraint-first**: near-monochrome dark palette with a single teal accent, generous whitespace.
- **Proof-first**: quantified metrics (CGPA, basin area, glacier loss) surfaced as a stat strip.
- **Accessible**: skip link, semantic landmarks, visible focus states, descriptive alt text,
  `prefers-reduced-motion` support, "(opens in a new window)" cues on external links.
- **Responsive**: mobile-first layout tested down to 360px.
