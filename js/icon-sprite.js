/**
 * Shared inline SVG icon sprite (Lucide, ISC-licensed).
 * Injects one hidden <svg> of <symbol> definitions into the document so every
 * page can reference glyphs with <use href="#icon-*"> without duplicating the
 * markup. Icons inherit color via currentColor and follow the theme tokens.
 *
 * Load in <head> alongside theme-preference.js. <use> references resolve as
 * soon as the sprite exists in the DOM, so injecting after parse is fine and
 * the page still renders without JavaScript (labels carry the meaning).
 */
(() => {
    const SPRITE_ID = 'app-icon-sprite';
    const SPRITE = `
<svg xmlns="http://www.w3.org/2000/svg" id="${SPRITE_ID}" style="display:none" aria-hidden="true">
  <symbol id="icon-arrow-left" viewBox="0 0 24 24"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></symbol>
  <symbol id="icon-arrow-right" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></symbol>
  <symbol id="icon-arrow-up-right" viewBox="0 0 24 24"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></symbol>
  <symbol id="icon-phone" viewBox="0 0 24 24"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></symbol>
  <symbol id="icon-mail" viewBox="0 0 24 24"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></symbol>
  <symbol id="icon-linkedin" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></symbol>
  <symbol id="icon-github" viewBox="0 0 24 24"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></symbol>
  <symbol id="icon-contrast" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 18a6 6 0 0 0 0-12v12z"/></symbol>
</svg>`;

    const inject = () => {
        if (document.getElementById(SPRITE_ID)) return;
        const host = document.createElement('div');
        host.innerHTML = SPRITE.trim();
        const svg = host.firstChild;
        if (document.body) {
            document.body.insertBefore(svg, document.body.firstChild);
        }
    };

    if (document.body) {
        inject();
    } else {
        document.addEventListener('DOMContentLoaded', inject);
    }
})();
