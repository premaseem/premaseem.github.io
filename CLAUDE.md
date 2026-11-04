# Site rules for premaseem.github.io

Personal brand site for Prem Aseem Jain ("Aseem"). Claude maintains it and deploys by pushing to `main`, and GitHub Pages serves it. These rules come from Aseem and override any other source, including his resume and blog.

## Never show on the site

- **His most recent employer (2021–2026, games industry) must never be named.** That covers its name, short forms, game titles, and any awards or roles from there. If context is truly needed, write "a leading global gaming company." Partners such as Netflix Games, Amazon Luna, PlayStation, NBA and Apple may stay.
- No phone number, no home address.
- No unverified numbers. Use only the approved metrics below.
- Don't name this company in commit messages, comments or any file in this repo either. The repo is public.

## Voice

- Less words, more meaning. Short, confident, professional. Don't bloat pages.
- About is in the third person ("Aseem builds…"), never "I".
- Positioning: Data & AI architect · Cloud architect · Tech lead · Identity/IAM expert · Breathwork & yoga teacher · Mentor and creator · Pilot.

## Approved metrics

8.5M blog views · 6.9M readers · 4.4M video impressions · 885K YouTube views · 43,000+ hours watched · 10,000+ followers across platforms · 300M accounts · 2M AI requests/day · 1B+ events · 20+ years.
Don't show the YouTube subscriber count. Use "10,000+ followers" instead.

## Design and stack

- Plain HTML/CSS/JS, no build step. GSAP + ScrollTrigger and Lenis from CDNs. Shared styles in `assets/css/style.css`, behaviour in `assets/js/main.js`.
- Palette: cream `#F4EEE7`, sand `#D9B881`, terracotta `#9A5151`, ink `#141414`. Font: Poppins.
- Respect `prefers-reduced-motion`. Check layouts at phone width.
- Pages: Home, About, Gallery, Connect. Each page carries its own nav, so update all of them together.

## Contact

- The public email is `contact@premaseem.com`. Use it in every mailto link.
- The form on Connect posts to the Cloudflare Worker `https://premaseem-contact.jain-premaseem.workers.dev`, protected by Turnstile (public site key in the HTML). Its handler is in `main.js`.
- The Worker is configured in the Cloudflare dashboard. Never create, change or redeploy it from this repo, and never add a wrangler config, or its bindings and secrets get wiped. Never write any secret to a file.

## Analytics (required on every page)

Every HTML page, including any new one, must have this Cloudflare Web Analytics tag as the last line before `</body>`, after the other scripts. Copy it exactly and never remove or change it:

```html
<!-- Cloudflare Web Analytics --><script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "4089dc42cae44a83a6085d753ad78482"}'></script><!-- End Cloudflare Web Analytics -->
```

## Photos

- Stored in `assets/img/`, resized for the web (≤1800px, JPEG).
- New photos go into the Gallery with a short caption. Put the strongest ones on Home.
- Skip off-tone images, such as the yoga channel's convertible banner.

## Before every push

1. Search all files for the forbidden employer's name and its short forms. It must return nothing.
2. Check that every `.html` file contains the Cloudflare analytics token `4089dc42cae44a83a6085d753ad78482`.
3. Take screenshots at desktop and phone width.
4. Get Aseem's go-ahead, then push to `main`.
