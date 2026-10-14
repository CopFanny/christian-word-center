function renderPrayers(items) {
  const list = document.querySelector('#prayer-list');
  if (!list) return;
  if (!items.length) {
    list.innerHTML = '<div class="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-500">No prayers yet. Add one in the CMS.</div>';
    return;
  }
  list.innerHTML = items.map(item => `
    <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h4 class="text-lg font-semibold text-slate-900">${item.title}</h4>
      <p class="mt-3 text-slate-700">${item.text}</p>
      <div class="mt-4 text-sm text-slate-500">${item.author || ''}</div>
    </article>
  `).join('');
}

function renderTestimonials(items) {
  const list = document.querySelector('#testimonial-list');
  if (!list) return;
  if (!items.length) {
    list.innerHTML = '<div class="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-500">No testimonials yet. Add one in the CMS.</div>';
    return;
  }
  list.innerHTML = items.map(item => `
    <blockquote class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p class="text-slate-700">“${item.text}”</p>
      <footer class="mt-4 text-sm text-slate-500">— ${item.name}${item.location ? ', ' + item.location : ''}</footer>
    </blockquote>
  `).join('');
}
