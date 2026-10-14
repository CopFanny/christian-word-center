# Christian Word Center

A modern Christian website built with Vite and Tailwind CSS. This project is designed for scripture sharing, uplifting content, image gallery management, and simple CMS editing.

## Included

- Responsive landing page
- Scripture list with search
- Featured verse card
- Empty gallery placeholder for uploads
- Netlify CMS admin configuration
- Support/donate and newsletter blocks
- Tailwind production workflow for build optimization

## Legal and licensing notes

This project uses the public-domain King James Version (KJV) as the default scripture text. You may add your own licensed translations later if needed. Images should be your own, or from a source that allows reuse and attribution.

## Local development

1. Install dependencies:
   npm install
2. Run the app locally:
   npm run dev
3. Build for production:
   npm run build

## CMS setup with Netlify

This project includes a basic CMS admin UI under `/admin`. For production, connect the repo to Netlify and enable the CMS in a Netlify site.

The content files are stored in:
- `public/content/verses.json`
- `public/content/gallery.json`

When you add images via Netlify CMS, they will be stored in `public/images`.

## Deploy to Netlify

1. Push this repo to GitHub.
2. In Netlify, add a new site from Git.
3. Set the build command to `npm run build`.
4. Set the publish directory to `dist`.
5. Optionally add environment variables for Bible API integration later.

## Optional next enhancements

- Add a real Bible API (ESV or another licensed provider) behind an environment variable.
- Upload a custom gallery image set.
- Add multilingual support.
- Add testimonials and devotionals.
