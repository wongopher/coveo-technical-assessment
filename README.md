# RoboMotion parts search

A manufacturing buyer search page for RoboMotion Industries: find a robot, pin the series, then shortlist tooling and consumables that fit. Built as a Coveo technical assessment demo.

## Stack

- **Vite + React + TypeScript** at the repo root (`src/`).
- **Atomic for Commerce** (`@coveo/atomic-react` 3.11 / `@coveo/headless` 3.49) on a Headless `CommerceEngine` for the product catalog. Atomic owns the search box, facets, breadbox, summary, product list, pager, and empty state. These versions are required for Search Agent `agent-id` on `atomic-generated-answer`.
- **Custom Headless** for the robot-fitment journey (pin Compatible Robots across queries, split Atomic’s joined multi-select values, custom sort and page size, parts list).
- **Sidecar SearchEngine** on the default Search API pipeline for conversational search (`atomic-generated-answer` with `agent-id`). Atomic Commerce cannot host generated answers against the product index.

Shared card/panel state lives in module stores (`configurationStore`, `robotFilterStore`) because Atomic mounts each product card in its own React root.

## Setup

```bash
cp .env.example .env
# paste the anonymous Search API key from the brief into VITE_COVEO_API_KEY
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Environment

| Variable | Required | Default |
| --- | --- | --- |
| `VITE_COVEO_API_KEY` | yes | — |
| `VITE_COVEO_ORG_ID` | no | `robomotionindustriesp0bp5xin` |
| `VITE_COVEO_TRACKING_ID` | no | `robomotion` |
| `VITE_COVEO_AGENT_ID` | no | `5c358d04-3cf2-4885-84d3-39f4aec8dd48` |

The key is anonymous-search scoped. It is still gitignored; never commit `.env`.

## Architecture

![Architecture diagram](/src/assets/architecture_diagram.png)

**Connects to Coveo.** `src/engine.ts` builds a Headless `CommerceEngine` with the org ID, anonymous search token, `trackingId` `robomotion`, and locale `en` / `GB` / `GBP`. `AtomicCommerceInterface` (`type="search"`) sends product queries to the Commerce API. A second `SearchEngine` on pipeline `default` hosts the Search Agent. Chat does not re-run Commerce search and does not clear a pinned Compatible Robots filter.

**Search state.** Headless owns query, facets, sort, and page. Atomic components subscribe to that engine. Compatible Robots is re-applied from a pin store when the buyer types a new parts query (stock Atomic would clear the facet). Card and parts-list state lives in module stores because Atomic mounts each product card in its own React root.

**Renders results.** Atomic owns the search box, facets, breadbox, summary, product grid, pager, and empty state. Each card is a custom `ProductCard` template (fitment pills, “Fits your …”, pin / add-to-parts). **Your parts** is a page-level panel, not a Coveo widget.

**Filtering.** The index returns five facets: Category, Compatible Robots, Brand, Price, Rating. Pinning a robot selects Compatible Robots on the engine so the rail, breadbox, and URL stay in sync. Further filters are stock Atomic.

## Assumptions

- Listings and recommendations are **not configured** in this org, so they are not mounted.
- `AtomicCommerceQueryError` is not mounted; empty catalog uses `AtomicCommerceNoProducts`.
- Sort: the Commerce API advertises only relevance in documentation, but honours explicit `ec_price` / `ec_rating` field sorts. The page uses a custom `SortControl` for that reason.

## Known limits

- **Indexing gap vs the brief.** The assignment suggests payload / reach / models as filters, but they are not in the index. Facets returned: `ec_category` (hierarchical), `compatible_robot_series` (display name **Compatible Robots**, not “Compatible Robot Models”), `ec_brand`, `ec_price`, `ec_rating`. Payload, reach, precision, mounting, and certification are not structured fields and are not regexed out of `ec_shortdesc`. Payload bands exist only as category-leaf labels (e.g. `Large Articulated (50-200kg)`). Cards stay on structured fields, with one exception: robot series codes are parsed from `ec_name` when `compatible_robot_series` is missing on robot listings.
- **Atomic clears facets on a new query.** Compatible Robots is re-applied from a pin store so the robot-then-parts journey survives typing.
- **Conversion is placeholder.** Quote / download CTAs are placeholders, no backend for demo.
- **Joined series values.** Atomic may send `R-20,C-10` as one facet value. The request (and URL hash) are expanded back into real series codes before they leave the browser.
- Conversational search answers from the **blog** index (~1,400 docs), not from product JSON. The Agent names SKUs when the blogs mention them.

See [DEMO.md](DEMO.md) for a walkthrough.
