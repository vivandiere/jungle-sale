# JUNGLE SALE — PRD (MVP SHOP + Appointment Flow)

## Goals
- Studio plants catalog (~20 plants with S/M/L variants).
- Customers browse, select, and hold multiple plants (cart-like experience).
- No online payment — instead, book a pickup appointment to confirm hold.
- Minimum order value of £30 enforced.
- Calendly Free plan for scheduling.
- Floating WhatsApp button for direct chat.
- Calendly emails to both customer and business.

## User Flow
- 1. Browse Catalog → Select plant(s) & size(s).
- 2. Hold Cart → Multiple plants possible; total must be £30 or more.
- 3. Checkout → Calendly embed appears, prefilled with cart summary.
- 4. Confirmation → Success page + Calendly email confirmation.

## Features
- Catalog / Data (Google Sheet → CSV):
-  - Google Sheet as master catalog.
-  - Published as CSV (public share link).
-  - Site fetches CSV and parses live.
-  - Columns: name, slug, description, image_urls, tags, price_s, price_m, price_l, stock_s, stock_m, stock_l, display_order.
- 
- Cart / Hold:
-  - Session-based cart.
-  - Multiple plants supported.
-  - Total auto-calculated.
-  - Minimum order check (£30).
-  - Cart summary passed into Calendly custom field(s).
- 
- Booking:
-  - Calendly Free plan inline embed.
-  - Event type: 'Studio Pickup'.
-  - Custom questions: 'Which plant(s)?', 'Total value (£)'.
-  - Prefilled via querystring from cart.
-  - Confirmation emails include details.
- 
- Chat (WhatsApp):
-  - Floating button links to wa.me/<number>.
-  - Opens WhatsApp app (mobile) or web (desktop).

## Ops / Data Management
- Client Workflow:
-  - Open shared Google Sheet.
-  - Add/edit/remove rows (plants).
-  - Paste image URLs (comma separated if multiple).
-  - Update stock/price cells.
-  - Save — site updates live.
- 
- Notes:
-  - Only rows with name + price appear.
-  - Stock optional in MVP.

## Tech Stack (MVP)
- Frontend: Next.js on Vercel.
- Data: Google Sheet published as CSV.
- Booking: Calendly Free plan embed (prefilled).
- Chat: WhatsApp click-to-chat.
- Emails: Calendly default confirmations.

## Constraints
- No payment gateway.
- Stock managed manually via Sheet.
- CSV must remain published.
- Catalog limited to ~20 rows.

## Future Enhancements (v2)
- Auto stock decrement with Calendly webhook → Sheet.
- Branded emails via Zapier/Make or backend.
- Deposits/payments (Stripe).
- WhatsApp Business API (automated reminders).
- CMS (Sanity/Strapi) instead of Sheet.

