/**
 * Theme preference: restore on load (before paint) and persist on change.
 * Load in <head> WITHOUT defer or async.
 */
(() => {
    const ALLOWED = new Set(['light', 'system', 'dark']);
    const id = 'theme-preference-sync';
    let container = document.getElementById(id);
    if (!container) {
        container = document.createElement('div');
        container.id = id;
        container.hidden = true;
        container.setAttribute('aria-hidden', 'true');
        ['light', 'system', 'dark'].forEach((v) => {
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'theme-preference';
            input.value = v;
            if (v === 'system') {
                input.checked = true;
            }
            container.appendChild(input);
        });
        const mount = document.body ?? document.head;
        if (mount) {
            mount.appendChild(container);
        }
    }
    let stored = null;
    try {
        stored = localStorage.getItem('theme-preference');
    } catch {
        /* storage may be disabled */
    }
    const value = ALLOWED.has(stored) ? stored : 'system';
    const input = container.querySelector(
        'input[value="' + value + '"]'
    );
    if (input) {
        input.checked = true;
    }
    // Expose programmatic API for simple toggles
    const setPreference = (val) => {
        if (!ALLOWED.has(val)) return;
        const target = container.querySelector('input[value="' + val + '"]');
        if (target) {
            target.checked = true;
            // dispatch a change event so listeners persist
            const ev = new Event('change', { bubbles: true });
            target.dispatchEvent(ev);
        }
    };
    const toggle = () => {
        const checked = container.querySelector('input:checked');
        const current = checked ? checked.value : 'system';
        const next = current === 'dark' ? 'light' : 'dark';
        setPreference(next);
    };
    window.setThemePreference = setPreference;
    window.toggleThemePreference = toggle;
    document.addEventListener('change', (e) => {
        if (e.target.name === 'theme-preference') {
            try {
                localStorage.setItem('theme-preference', e.target.value);
            } catch {
                /* storage may be disabled */
            }
        }
    });
})();
