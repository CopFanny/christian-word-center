const translations = {
  en: {
    title: 'Christian Word Center',
    scriptures: 'Scriptures',
    gallery: 'Gallery',
    about: 'About',
    support: 'Support',
    give: 'Give',
    readScripture: 'Read scripture',
    viewGallery: 'View gallery',
    noResults: 'No scriptures match your search.',
    featured: 'Featured',
    scripture: 'Scripture',
    galleryReady: 'Gallery is ready for your first image.',
    galleryPlaceholder: 'Add images through the Netlify CMS admin or upload them into the site later.',
    copyVerse: 'Copy verse',
    share: 'Share',
    copied: 'Copied',
    linkCopied: 'Link copied',
    newsletter: 'Join newsletter',
    donate: 'Donate',
  },
  es: {
    title: 'Centro de la Palabra Cristiana',
    scriptures: 'Escrituras',
    gallery: 'Galería',
    about: 'Acerca de',
    support: 'Apoya',
    give: 'Dar',
    readScripture: 'Leer la palabra',
    viewGallery: 'Ver galería',
    noResults: 'No hay escrituras que coincidan con tu búsqueda.',
    featured: 'Destacado',
    scripture: 'Escritura',
    galleryReady: 'La galería está lista para tu primera imagen.',
    galleryPlaceholder: 'Agrega imágenes a través del panel de Netlify CMS o súbelas al sitio más adelante.',
    copyVerse: 'Copiar verso',
    share: 'Compartir',
    copied: 'Copiado',
    linkCopied: 'Enlace copiado',
    newsletter: 'Suscribirse',
    donate: 'Donar',
  }
};

let currentLanguage = 'en';

export function getLanguage() {
  return currentLanguage;
}

export function setLanguage(language) {
  currentLanguage = language in translations ? language : 'en';
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    if (translations[currentLanguage][key]) {
      node.textContent = translations[currentLanguage][key];
    }
  });
}

export function t(key) {
  return translations[currentLanguage]?.[key] || translations.en[key] || key;
}
