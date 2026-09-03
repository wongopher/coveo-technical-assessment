# RoboMotion demo script

For **sales engineers and AEs**. About **eight minutes** with a manufacturing prospect (plant engineering, aftermarket, procurement). You are showing RoboMotion Industries — a fictitious industrial robotics company — how Coveo turns a parts catalog into a fitment journey.

The buyer already owns a **robot**. They need tooling and consumables that fit, then a list they can send to procurement. Do not demo a three-robot compare tray.

Say **robot** whenever you point at the page (Compatible Robots, Find parts for your robot, Your parts). Say **welding arm** only when you click that query suggestion — then immediately: the grid is torches. Say **welding cell** only in the chatbot; that is a spec question, not a SKU.

Run `npm run dev` and open the URL Vite prints. Full setup is in the [README](README.md).

## Before you go live

- Use this path: `weld` → **welding arm** → **Find parts for your robot** → pin an **S-5** → add two parts → chat **How do I spec a MIG welding cell?**
- Do not search `payload 50kg`. That is not a field in this catalog.
- Ask follow-ups in the **chatbot** (top right), not in the catalogue search box. Chat must not look like it refreshed the parts grid.
- Quote and download are demo buttons. Speak them as the handoff to CPQ, then move on.

## Opening (about one minute)

> RoboMotion sells industrial robots and the parts that service them. This catalogue is 1,242 products. Only 61 are robots. A plant engineer is not browsing that list. They know the robot on the line — for example, an S-5 — and they need the torch, scanner, and spares that actually fit. Wrong parts delay a line. Calling a distributor is the default today. I will pin the series, show only compatible parts, build a quote list, and ask a spec question without leaving the page.

Bob as user story:
> Bob is a plant engineer who services these robotic arms. He was tasked to audit the robots on the production floor and to come up with a list of spare and repair parts to send to their procurement team. He already knows the exact series of robots on the floor, and now he needs to know the parts.

## Walkthrough

### 1. They start with the job, not the SKU

**Show:** Type `weld`. Coveo suggests **welding**, **welding arm**, **welding robot**, **welding cell**. Pick **welding arm**.

**Say:** A plant engineer starts in their language. Suggestions meet them there.

**Expect:** The grid is welding **torches**, not arms. Name that out loud: this is a fitment / aftermarket catalog. Searching "arm" contextually leads to "torches" (along with the "End-of-Tooling Arm" category).

**Point at the left rail:** Category, Compatible Robots, Brand, Price, Rating.

**Value:** Faster discovery. Fewer bounced searches.

### 2. Start from the installed machine

**Show:** **Find parts for your robot** (sidebar). Open a **NexBot S-5**.

**Say:** Robots are a small slice of the catalog, so we give the buyer an explicit path to the machine already on the line.

**On the card:** Class/type comes from the category (for example Large Articulated 50–200kg). Brand is shown as Line. Payload and reach are not indexed fields — in production those become filters.

### 3. Pin the series — only what fits remains

**Show:** **Find parts for this.** Compatible Robots is selected (up to three machines). The grid is parts for that series. Hero copy and hint chips switch to parts language (`MIG torch`, `safety scanner`).

**Say:** Once the series is known, everything else should disappear. Compatible Robots is the manufacturing equivalent of a size filter.

**Optional proof:** Type `MIG torch` or click a hint. The pin stays. The buyer can keep searching without starting over.

**Value:** Confidence. Wrong-part orders drop because incompatible SKUs are out of the way.

### 4. Narrow, then see why a result appeared

**Show:** Toggle Brand, Price, or Rating. Sort Best match vs price. Point at the query summary and breadcrumbs.

**On a part card:** Type chip, Mounts at (for example J6), Fits pills, and the line **Fits your NexBot S-5** when a robot is pinned.

**Say:** Fitment is the relevance explanation — not a generic excerpt.

**Value:** Clearer comparison of candidate parts against the installed series.

### 5. Next action is a parts quote, not add to cart

**Show:** **Add to your parts** on two cards. The sticky **Your parts** panel: robot context, table (category, class/type, mounts at, fits, price), mismatch row if something does not fit.

**Say:** Procurement wants a list they can send onward. **Request a quote** and **Download parts list** are the handoff to CPQ or a distributor portal.

Do not dwell if the buttons do not call a backend. The list is the payload.

**Value:** A conversion event manufacturing actually has.

### 6. Not every question is a SKU

**Show:** Circular chat control, **top right**. Starter chip or:

> How do I spec a MIG welding cell?

**Say:** Not every question is a part number. Spec knowledge lives in articles. Conversational search answers on the page, with citations. A follow-up stays in the chat so the parts list and the robot pin do not move.

**Value:** Self-service. Fewer “call an applications engineer” loops on spec questions.

Close chat (button, Escape, or click outside) and leave the catalogue as it is.

## Questions

| Question | Answer |
| --- | --- |
| Why did welding arm return torches? | That is the catalog: parts that fit a robot, not a robot showroom. Coveo is following the index, not a spec sheet. |
| Where is payload / reach / certification? | Not fields today. Category leaves encode payload bands for robots. Production is to index those specs so they can filter and rank — that is the Coveo catalog conversation. |
| Can I compare three robots? | The buying motion here is parts against an installed robot. Your parts is that comparison, including mismatch rows. |
| Quote does nothing. | Demo handoff. The list is what CPQ would accept. |
| Can chat add a part to the grid? | On purpose, no. Chat is knowledge. Catalogue search is products. Mixing them would wipe the fitment filter. |

## If something breaks

| What you see | What to do |
| --- | --- |
| Chat missing or 403 | The search key needs **Execute agent queries**. Say it is an org privilege. The catalogue demo still stands — do not fake an answer. |
| Labels like `no-products` | Atomic assets did not copy. Restart Vite after `npm install`. Do not debug CSS in front of the customer. |
| Pin drops after typing | Click **Find parts for this** again and continue. |
| Agent cannot answer | Ask **How do I spec a MIG welding cell?** — not a random SKU. Knowledge is grounded on the blog index, not product JSON. |
