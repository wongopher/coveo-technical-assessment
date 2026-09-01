/**
 * Atomic renders each product template inside the product list's shadow DOM,
 * so the page stylesheet cannot reach it. Coveo's documented workaround for
 * Atomic React templates is to ship a <style> tag with the template itself.
 */
export const CARD_CSS = `
.card {
  --ink: #101826;
  --ink-soft: #5a6b82;
  --line: #dde3ec;
  --surface: #ffffff;
  --accent: #0b5cd5;
  --signal: #0f7a4d;
  --signal-soft: #e6f4ed;

  display: flex;
  flex-direction: column;
  height: 100%;
  text-align: left;
  color: var(--ink);
  font-family: inherit;
}

.card *, .card *::before, .card *::after { box-sizing: border-box; }

.card__media {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 128px;
  margin-bottom: 0.7rem;
}

.card__media atomic-product-image { max-width: 100%; }

.card__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.45rem;
}

.card__eyebrow {
  margin: 0;
  font-size: 0.66rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--ink-soft);
  font-weight: 600;
}

.card__title {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.35;
  font-weight: 640;
}

.card__title atomic-product-link::part(result-link) {
  color: var(--ink);
  text-decoration: none;
}

.card__title atomic-product-link::part(result-link):hover {
  color: var(--accent);
  text-decoration: underline;
}

.card__desc {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.5;
  color: var(--ink-soft);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0.1rem 0 0;
}

.chip {
  border: 1px solid var(--line);
  border-radius: 7px;
  padding: 0.22rem 0.45rem;
  background: #fbfcfe;
  min-width: 0;
}

.chip dt {
  font-size: 0.58rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--ink-soft);
  font-weight: 600;
  margin: 0;
}

.chip dd {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.3;
}

.card__fitment {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
  margin: 0.1rem 0 0;
  font-size: 0.72rem;
}

.card__fitment-label {
  color: var(--ink-soft);
  margin-right: 0.15rem;
  font-weight: 600;
}

.pill {
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 0.08rem 0.42rem;
  font-size: 0.7rem;
  font-variant-numeric: tabular-nums;
  color: var(--ink-soft);
  white-space: nowrap;
}

.pill--match {
  border-color: #a9d9c2;
  background: var(--signal-soft);
  color: var(--signal);
  font-weight: 650;
}

.card__reason {
  margin: 0.1rem 0 0;
  font-size: 0.72rem;
  color: var(--signal);
  background: var(--signal-soft);
  border-radius: 7px;
  padding: 0.3rem 0.45rem;
  line-height: 1.35;
}

.card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 0.5rem;
}

.card__price {
  font-size: 1.02rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  padding-top: 0.15rem;
}

.btn {
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--ink);
  border-radius: 8px;
  padding: 0.38rem 0.65rem;
  font: inherit;
  font-size: 0.76rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
}

.btn:hover:not(:disabled) {
  border-color: var(--accent);
  color: var(--accent);
}

.btn:disabled { opacity: 0.45; cursor: not-allowed; }

.btn--primary {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.btn--primary:hover:not(:disabled) {
  background: #08479f;
  border-color: #08479f;
  color: #fff;
}

.btn--active {
  background: var(--signal-soft);
  border-color: #a9d9c2;
  color: var(--signal);
}
`
