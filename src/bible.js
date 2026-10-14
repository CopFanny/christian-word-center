export async function loadBibleVerses() {
  const apiKey = import.meta.env.VITE_BIBLE_API_KEY;
  const apiBase = import.meta.env.VITE_BIBLE_API_BASE_URL;

  if (apiKey && apiBase) {
    try {
      const response = await fetch(`${apiBase}/passages?api_key=${apiKey}&content-type=json`);
      if (!response.ok) throw new Error('Bible API request failed');
      const payload = await response.json();

      if (Array.isArray(payload)) {
        return payload;
      }

      if (payload && Array.isArray(payload.data)) {
        return payload.data;
      }

      if (payload && Array.isArray(payload.verses)) {
        return payload.verses;
      }
    } catch (error) {
      console.warn('Falling back to local KJV verses.', error);
    }
  }

  const localResponse = await fetch('/content/verses.json');
  return localResponse.json();
}
