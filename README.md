## Donation & Payments

This project includes a simple Donate button that links to PayPal or a third-party page. For a nicer donation flow consider one of these options:

- Stripe Checkout integration (requires server-side code or Netlify Functions to keep your secret keys safe). See Stripe docs for serverless Checkout: https://stripe.com/docs/checkout/quickstart
- PayPal Donate / Buttons (client-side link options): https://www.paypal.com/donate
- Buy Me a Coffee: https://www.buymeacoffee.com/

If you want me to add a full Stripe donation flow, I can add a serverless function and an example checkout flow — you will need Stripe keys.

## CMS and content generation

Netlify CMS creates individual JSON files for scriptures, gallery, prayers, and testimonials under `public/content/<collection>`.

Before building for production the project runs a small script (`node scripts/generateContent.js`) that aggregates the individual files into:

- `public/content/verses.json` — aggregated scriptures
- `public/content/gallery.json` — aggregated gallery
- `public/content/prayers.json` — aggregated prayers
- `public/content/testimonials.json` — aggregated testimonials

This keeps the editing workflow simple (folder-per-item in the CMS) while allowing the front-end to fetch single JSON files.
