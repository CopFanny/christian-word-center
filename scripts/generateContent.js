const fs = require('fs');
const path = require('path');

function readJsonFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const items = [];
  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const data = JSON.parse(raw);
      // If file contains an array, merge arrays; else push object
      if (Array.isArray(data)) items.push(...data);
      else items.push(data);
    } catch (err) {
      console.warn('Skipping invalid JSON file', file, err.message);
    }
  }
  return items;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

(function generate() {
  const contentDir = path.join(__dirname, '..', 'public', 'content');
  ensureDir(contentDir);

  // Scripture files folder
  const scripturesDir = path.join(contentDir, 'scriptures');
  ensureDir(scripturesDir);
  const scriptures = readJsonFiles(scripturesDir);
  const versesPath = path.join(contentDir, 'verses.json');
  if (!fs.existsSync(versesPath) || scriptures.length) {
    fs.writeFileSync(versesPath, JSON.stringify(scriptures.length ? scriptures : [
      {
        "reference": "John 3:16",
        "text": "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
        "topic": "Love"
      }
    ], null, 2));
    console.log('Wrote', versesPath);
  }

  // Gallery
  const galleryDir = path.join(contentDir, 'gallery');
  ensureDir(galleryDir);
  const gallery = readJsonFiles(galleryDir);
  const galleryPath = path.join(contentDir, 'gallery.json');
  if (!fs.existsSync(galleryPath) || gallery.length) {
    fs.writeFileSync(galleryPath, JSON.stringify(gallery.length ? gallery : [], null, 2));
    console.log('Wrote', galleryPath);
  }

  // Prayers
  const prayersDir = path.join(contentDir, 'prayers');
  ensureDir(prayersDir);
  const prayers = readJsonFiles(prayersDir);
  const prayersPath = path.join(contentDir, 'prayers.json');
  if (!fs.existsSync(prayersPath) || prayers.length) {
    fs.writeFileSync(prayersPath, JSON.stringify(prayers.length ? prayers : [
      {
        "title": "Guidance",
        "text": "Lord, grant us wisdom and discernment as we seek your will.",
        "author": "Community"
      }
    ], null, 2));
    console.log('Wrote', prayersPath);
  }

  // Testimonials
  const testimonialsDir = path.join(contentDir, 'testimonials');
  ensureDir(testimonialsDir);
  const testimonials = readJsonFiles(testimonialsDir);
  const testimonialsPath = path.join(contentDir, 'testimonials.json');
  if (!fs.existsSync(testimonialsPath) || testimonials.length) {
    fs.writeFileSync(testimonialsPath, JSON.stringify(testimonials.length ? testimonials : [
      {
        "name": "A. Believer",
        "text": "This site helped me reconnect with scripture every day.",
        "location": "USA"
      }
    ], null, 2));
    console.log('Wrote', testimonialsPath);
  }

  console.log('Content generation complete.');
})();
