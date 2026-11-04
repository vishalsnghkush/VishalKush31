export function setupTheme() {
  const root = document.documentElement;
  const button = document.getElementById('theme-toggle');
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let preference;
  try { preference = localStorage.getItem('portfolio-theme'); } catch {}
  if (preference !== 'light' && preference !== 'dark') preference = null;

  function apply(theme) {
    const dark = theme === 'dark';
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    button.querySelector('.theme-toggle-icon').textContent = dark ? '☀' : '☾';
    button.querySelector('.theme-toggle-label').textContent = dark ? 'Light' : 'Dark';
    document.querySelector('meta[name="theme-color"]').content = dark ? '#181619' : '#f3b9c8';
  }
  apply(preference || (system.matches ? 'dark' : 'light'));
  button.addEventListener('click', () => {
    preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
    apply(preference);
    try { localStorage.setItem('portfolio-theme', preference); } catch {}
  });
  system.addEventListener('change', () => {
    if (!preference) apply(system.matches ? 'dark' : 'light');
  });
  window.addEventListener('storage', event => {
    if (event.key !== 'portfolio-theme' && event.key !== null) return;
    preference = event.newValue === 'dark' || event.newValue === 'light' ? event.newValue : null;
    apply(preference || (system.matches ? 'dark' : 'light'));
  });
}
