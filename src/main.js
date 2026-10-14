import { loadBibleVerses } from './bible.js';
import { t, setLanguage, getLanguage } from './i18n.js';

const scriptureList = document.querySelector('#scripture-list');
const galleryList = document.querySelector('#gallery-list');
const scriptureSearch = document.querySelector('#scripture-search');
const featuredVerse = document.querySelector('#featured-verse');
const featuredReference = document.querySelector('#featured-reference');
const copyVerseButton = document.querySelector('#copy-verse');
const shareVerseButton = document.querySelector('#share-verse');
const languageToggle = document.querySelector('#language-toggle');

let scriptures = [];
let gallery = [];

async function loadContent() {
  const [scriptureRes, galleryRes] = await Promise.all([
    loadBibleVerses(),
    fetch('/content/gallery.json'),
  ]);

  scriptures = Array.isArray(scriptureRes) ? scriptureRes : [];
  gallery = await galleryRes.json();

  renderScriptures(scriptures);
  renderGallery(gallery);

  if (scriptures.length > 0) {
    const first = scriptures[0];
    setFeaturedVerse(first);
  }
}

function setFeaturedVerse(verse) {
  if (!verse) return;

  featuredVerse.textContent = `“${verse.text}”`;
  featuredReference.textContent = `— ${verse.reference}`;
}

function renderScriptures(items) {
  if (!scriptureList) return;

  if (!items.length) {
    scriptureList.innerHTML = `<div class="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-500">${t('noResults')}</div>`;
    return;
  }

  scriptureList.innerHTML = items
    .map(
      (item) => `
        <article class="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
          <div class="mb-4 inline-flex rounded-full bg-faith-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-faith-700">
            ${item.reference}
          </div>
          <p class="text-lg leading-8 text-slate-700">“${item.text}”</p>
          <div class="mt-5 flex items-center justify-between gap-3">
            <span class="text-xs uppercase tracking-[0.2em] text-slate-400">${item.topic || t('scripture')}</span>
            <button data-reference="${item.reference}" data-text="${item.text}" class="verse-select rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-faith-300 hover:text-faith-700">
              ${t('featured')}
            </button>
          </div>
        </article>
      `
    )
    .join('');

  document.querySelectorAll('.verse-select').forEach((button) => {
    button.addEventListener('click', () => {
      setFeaturedVerse({
        reference: button.dataset.reference,
        text: button.dataset.text,
      });
    });
  });
}

function renderGallery(items) {
  if (!galleryList) return;

  if (!items.length) {
    galleryList.innerHTML = `
      <div class="col-span-full rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
        <p class="text-lg font-semibold text-slate-800">${t('galleryReady')}</p>
        <p class="mt-2 text-slate-500">${t('galleryPlaceholder')}</p>
      </div>
    `;
    return;
  }

  galleryList.innerHTML = items
    .map(
      (item) => `
        <figure class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <img src="${item.image}" alt="${item.title || 'Christian image'}" class="h-64 w-full object-cover transition duration-500 hover:scale-105" />
          <figcaption class="p-4 text-sm text-slate-600">
            <span class="block font-semibold text-slate-900">${item.title || 'Image'}</span>
            <span class="mt-1 block">${item.description || 'Faith-inspired image'}</span>
          </figcaption>
        </figure>
      `
    )
    .join('');
}

scriptureSearch?.addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase();

  const filtered = scriptures.filter((item) => {
    const haystack = `${item.reference} ${item.text} ${item.topic}`.toLowerCase();
    return haystack.includes(query);
  });

  renderScriptures(filtered);
});

copyVerseButton?.addEventListener('click', async () => {
  const text = `${featuredReference.textContent.replace('— ', '')}: ${featuredVerse.textContent.replace(/[“”]/g, '')}`;
  try {
    await navigator.clipboard.writeText(text);
    copyVerseButton.textContent = t('copied');
    setTimeout(() => {
      copyVerseButton.textContent = t('copyVerse');
    }, 1200);
  } catch (error) {
    console.error('Copy failed:', error);
  }
});

shareVerseButton?.addEventListener('click', async () => {
  const url = window.location.href;
  const text = `${featuredReference.textContent.replace('— ', '')}: ${featuredVerse.textContent.replace(/[“”]/g, '')}`;

  if (navigator.share) {
    try {
      await navigator.share({ title: 'Christian Word Center', text, url });
      return;
    } catch (error) {
      console.warn('Share cancelled or unsupported', error);
    }
  }

  await navigator.clipboard.writeText(`${text} ${url}`);
  shareVerseButton.textContent = t('linkCopied');
  setTimeout(() => {
    shareVerseButton.textContent = t('share');
  }, 1200);
});

languageToggle?.addEventListener('click', () => {
  const nextLanguage = getLanguage() === 'en' ? 'es' : 'en';
  setLanguage(nextLanguage);
  languageToggle.textContent = nextLanguage === 'en' ? 'ES' : 'EN';
  document.title = nextLanguage === 'en' ? 'Christian Word Center' : 'Centro de la Palabra Cristiana';
  renderScriptures(scriptures);
});

loadContent();
