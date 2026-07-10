/**
 * Progressive enhancement for the contact form.
 *
 * - If the form's action points at a real endpoint (e.g. a Formspree form),
 *   the message is submitted with fetch() and an inline, screen-reader-friendly
 *   status message is shown — no page reload.
 * - Until an endpoint is configured (action still contains "YOUR_FORM_ID"),
 *   the form falls back to opening a pre-filled email in the visitor's mail
 *   client, so "Send message" does something real out of the box.
 *
 * To go live with Formspree: create a form at https://formspree.io, then set
 * the <form> action to https://formspree.io/f/xxxxxxx. Nothing else changes.
 */
(() => {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const status = form.querySelector('[data-form-status]');
    const fallbackEmail = form.dataset.fallbackEmail || 'this@hunterevans.net';
    const endpoint = form.getAttribute('action') || '';
    const endpointReady = endpoint && !endpoint.includes('YOUR_FORM_ID') && endpoint !== '#';

    const setStatus = (message, kind) => {
        if (!status) return;
        status.textContent = message;
        status.dataset.state = kind;
    };

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!form.reportValidity()) return;

        const data = new FormData(form);
        const name = (data.get('name') || '').toString().trim();
        const email = (data.get('email') || '').toString().trim();
        const message = (data.get('message') || '').toString().trim();

        if (!endpointReady) {
            // No backend configured yet — hand off to the visitor's mail client.
            const subject = encodeURIComponent(`Portfolio message from ${name || 'a visitor'}`);
            const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
            window.location.href = `mailto:${fallbackEmail}?subject=${subject}&body=${body}`;
            setStatus('Opening your email app so you can send the message…', 'info');
            return;
        }

        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;
        setStatus('Sending…', 'info');

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: data,
            });
            if (response.ok) {
                form.reset();
                setStatus('Thanks! Your message has been sent.', 'success');
            } else {
                setStatus('Something went wrong. Please email me directly.', 'error');
            }
        } catch {
            setStatus('Network error. Please email me directly.', 'error');
        } finally {
            if (submitBtn) submitBtn.disabled = false;
        }
    });
})();
