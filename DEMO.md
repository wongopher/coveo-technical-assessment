# Demo walkthrough

About **eight minutes**. The story is: a manufacturing buyer needs to spec a welding cell, or service an installed robot. They do not compare three robots in a tray — they pin a series and build a parts list.

## 1. Open the catalogue

`npm run dev` → load the page.

Point at:

- RoboMotion chrome (“Industrial robotics · Parts & service”)
- Hero: “Find the right parts for your robot”
- Full catalogue (1,242 products). Robots are only 61 of those, so they rarely surface on a blank search.

## 2. Query suggestions

Type `weld` in the search box (it is a textarea — a buying question can be more than one line).

Coveo suggests **welding**, **welding arm**, **welding robot**, **welding cell**. Pick **welding arm**.

The grid is welding **torches**, not arms. That is the catalog: fitment parts, not finished robots. Name the five Commerce facets in the left rail: Category, Compatible Robots, Brand, Price, Rating.

## 3. Find a robot, then pin the series

Click **Find parts for your robot** (sidebar / mobile bar). That hashes to Category = Robots, 48 per page, so all 61 machines are findable.

Open a card (e.g. a NexBot R-20). Spec chips are structured: class/type from the category leaf, brand as “Line”. Payload/reach are not indexed — that is the production gap.

Click **Find parts for this**. Compatible Robots is selected (max 3 robots). The grid is now parts that fit that series. Hero copy and hint queries switch to parts language (`MIG torch`, `safety scanner`, …).

## 4. Facets, cards, sort

- Toggle another Compatible Robots value, or Brand / Price / Rating.
- Query summary and breadbox stay in sync.
- Custom **Sort** (not the stock Atomic dropdown): Best match, price, rating. The API only advertises relevance; field sorts are sent anyway and come back ordered.
- Per page: 12 / 24 / 48.

On a part card, point at series pills and the fitment line when a robot is anchored.

## 5. Your parts

On two part cards, click **Add to your parts**. The sticky **Your parts** panel is the next action: robot context, shortlist table (category, class/type, mounts at, fits, price), mismatch row if a part does not fit the pinned series.

**Request a quote** / **Download parts list** are demo CTAs (no backend). The shortlist is not capped at 3; only robot anchors are.

## 6. Ask the Agent a buying question

Click the circular chat button in the **top-right**. In the popover, submit:

> How do I spec a MIG welding cell?

or use the starter chip.

The Agent streams a markdown answer with blog citations and will name real SKUs when the knowledge base has them. Ask a follow-up **in the chatbot** (not the catalogue search box) so the parts grid and the Compatible Robots pin stay put. Close the popover with the button, Escape, or a click outside — the catalogue does not change.

If the chat control is missing or the answer 403s, the anonymous key is missing **Execute agent queries** — that is an org privilege, not a UI bug. The rest of the page is still the deliverable.

## Q&A notes

- **RGA vs Search Agent:** RGA is the single-turn ancestor. This org has a Search Agent on blog content; the demo calls it conversational search. Do not also mount a one-shot RGA widget — they compete for the same slot.
- **Why two engines:** Commerce for products; Search API `default` pipeline for the Agent chatbot. Asking in the chat does not search the catalogue.
- **Why custom Headless:** Atomic Commerce would drop Compatible Robots on every new query, and it joins multi-select as `R-20,C-10`.
