const pptxgen = require("pptxgenjs");
const path = require("path");

const ASSETS = path.join(__dirname, "..", "client", "src", "assets");
const a = (f) => path.join(ASSETS, f);

// ---- Palette: "Terracotta Harvest" — grounded in the actual KenaKata logo (coral/terracotta)
// and the produce banner (fresh green, cream). Feels specific to a grocery brand, not generic blue.
const TERRACOTTA = "B8574A"; // primary — dominant, matches logo gradient
const TERRACOTTA_DEEP = "8C3F35"; // deep shade for dark slides
const FOREST = "3A6B4A"; // secondary — fresh produce green
const CREAM = "FBF7F2"; // light background (off-white, not beige-yellow)
const INK = "2A2323"; // near-black text, matches logo wordmark
const SLATE = "5B534E"; // muted body text
const GOLD = "D9A441"; // sharp accent, used sparingly

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5 in
const PAGE_W = 13.33;
const PAGE_H = 7.5;

const FONT_HEAD = "Cambria";
const FONT_BODY = "Calibri";

function bgSlide(color) {
  const s = pres.addSlide();
  s.background = { color };
  return s;
}

function pageNum(s, n, dark) {
  s.addText(String(n).padStart(2, "0"), {
    x: PAGE_W - 0.9,
    y: PAGE_H - 0.55,
    w: 0.6,
    h: 0.35,
    fontFace: FONT_BODY,
    fontSize: 10,
    color: dark ? "E8D9D3" : "B7ACA5",
    align: "right",
    margin: 0,
  });
}

function kicker(s, text, opts = {}) {
  s.addText(text.toUpperCase(), {
    x: opts.x ?? 0.7,
    y: opts.y ?? 0.55,
    w: opts.w ?? 6,
    h: 0.35,
    fontFace: FONT_BODY,
    fontSize: 12,
    bold: true,
    color: opts.color ?? TERRACOTTA,
    charSpacing: 2,
    margin: 0,
  });
}

// ============================================================
// SLIDE 1 — TITLE
// ============================================================
{
  const s = bgSlide(TERRACOTTA_DEEP);

  // Full-bleed produce image on the right, lightly tinted by an overlay shape
  s.addImage({ path: a("main_banner_bg.png"), x: 6.9, y: 0, w: 6.43, h: 7.5, sizing: { type: "cover", w: 6.43, h: 7.5 } });
  s.addShape("rect", { x: 6.9, y: 0, w: 6.43, h: 7.5, fill: { color: TERRACOTTA_DEEP, transparency: 72 }, line: { type: "none" } });

  // Left panel content
  s.addText("KENAKATA", {
    x: 0.75, y: 0.75, w: 6, h: 0.5,
    fontFace: FONT_BODY, fontSize: 14, bold: true, color: "F1C6BC", charSpacing: 3, margin: 0,
  });

  s.addText([
    { text: "Groceries,", options: { breakLine: true } },
    { text: "delivered like", options: { breakLine: true } },
    { text: "it's next door.", options: {} },
  ], {
    x: 0.75, y: 2.05, w: 6.1, h: 2.9,
    fontFace: FONT_HEAD, fontSize: 46, bold: true, color: "FFFFFF",
    lineSpacingMultiple: 1.05, margin: 0,
  });

  s.addText("A full-stack grocery marketplace built for Dhaka — fast checkout for shoppers, a real analytics dashboard for sellers.", {
    x: 0.75, y: 4.95, w: 5.5, h: 1.0,
    fontFace: FONT_BODY, fontSize: 14, color: "F1E4DF", lineSpacingMultiple: 1.3, margin: 0,
  });

  s.addText("PROJECT OVERVIEW  ·  FEATURE WALKTHROUGH", {
    x: 0.75, y: 6.75, w: 6, h: 0.4,
    fontFace: FONT_BODY, fontSize: 11, color: "D89A8C", charSpacing: 1.5, margin: 0,
  });
}

// ============================================================
// SLIDE 2 — WHAT IS KENAKATA
// ============================================================
{
  const s = bgSlide(CREAM);
  kicker(s, "The Big Picture");
  s.addText("One app, two sides of the same trip to the market", {
    x: 0.7, y: 0.95, w: 11.5, h: 1.0,
    fontFace: FONT_HEAD, fontSize: 30, bold: true, color: INK, margin: 0,
  });

  const cards = [
    {
      title: "For Shoppers",
      body: "Browse fresh groceries, add them to a cart, pay however they like, and track the order until it's on their doorstep.",
      img: a("fresh_fruits_image.png"),
    },
    {
      title: "For Sellers",
      body: "List products, manage stock, fulfil orders, and see exactly what's selling — from a dashboard built into the same app.",
      img: a("upload_area.png"),
    },
  ];
  const cardW = 5.55, cardX = [0.7, 6.65], cardY = 2.35, cardH = 3.7;
  cards.forEach((c, i) => {
    s.addShape("roundRect", {
      x: cardX[i], y: cardY, w: cardW, h: cardH, rectRadius: 0.12,
      fill: { color: "FFFFFF" }, line: { type: "none" },
      shadow: { type: "outer", color: "8C3F35", opacity: 0.18, blur: 12, offset: 4, angle: 90 },
    });
    s.addShape("ellipse", {
      x: cardX[i] + 0.5, y: cardY + 0.5, w: 1.15, h: 1.15,
      fill: { color: i === 0 ? "F3DCD5" : "DCE9DF" }, line: { type: "none" },
    });
    s.addImage({ path: c.img, x: cardX[i] + 0.68, y: cardY + 0.68, w: 0.79, h: 0.79 });
    s.addText(c.title, {
      x: cardX[i] + 0.5, y: cardY + 1.95, w: cardW - 1.0, h: 0.5,
      fontFace: FONT_HEAD, fontSize: 22, bold: true, color: INK, margin: 0,
    });
    s.addText(c.body, {
      x: cardX[i] + 0.5, y: cardY + 2.5, w: cardW - 1.0, h: 1.1,
      fontFace: FONT_BODY, fontSize: 14, color: SLATE, lineSpacingMultiple: 1.35, margin: 0,
    });
  });

  s.addText("Built for Bangladesh: prices in Taka (৳), Dhaka-only delivery, orders typically arriving in 30–60 minutes.", {
    x: 0.7, y: 6.35, w: 11.9, h: 0.6,
    fontFace: FONT_BODY, fontSize: 13, italic: true, color: TERRACOTTA, margin: 0,
  });
  pageNum(s, 2, false);
}

// ============================================================
// SLIDE 3 — BROWSE & DISCOVER
// ============================================================
{
  const s = bgSlide(CREAM);
  // Left image column
  s.addImage({ path: a("main_banner_bg.png"), x: 0, y: 0, w: 4.6, h: 7.5, sizing: { type: "cover", w: 4.6, h: 7.5 } });
  s.addShape("rect", { x: 0, y: 0, w: 4.6, h: 7.5, fill: { color: FOREST, transparency: 55 }, line: { type: "none" } });

  kicker(s, "Feature 01", { x: 5.0, y: 0.7 });
  s.addText("Browsing feels like walking\nthe aisles, not a spreadsheet", {
    x: 5.0, y: 1.15, w: 7.6, h: 1.5,
    fontFace: FONT_HEAD, fontSize: 27, bold: true, color: INK, lineSpacingMultiple: 1.08, margin: 0,
  });

  const rows = [
    { img: "menu_icon.svg", t: "Curated categories", d: "Fruits, vegetables, dairy, bakery and more, organised so shoppers reach what they need in a couple of taps.", iw: 0.26 },
    { img: "search_icon.svg", t: "Instant search", d: "A live search bar in the navigation bar jumps straight to matching products.", iw: 0.26 },
    { img: "star_icon.svg", t: "Best sellers, front and centre", d: "The homepage highlights popular picks and promotional banners so nothing useful is buried.", iw: 0.28 },
    { img: "product_list_icon.svg", t: "Rich product pages", d: "Each product has its own detail page with images, pricing, and quantity selection.", iw: 0.28 },
  ];
  let ry = 2.85;
  rows.forEach((r) => {
    s.addShape("ellipse", { x: 5.0, y: ry, w: 0.56, h: 0.56, fill: { color: "F3DCD5" }, line: { type: "none" } });
    s.addImage({ path: a(r.img), x: 5.28 - r.iw / 2, y: ry + 0.28 - r.iw / 2, w: r.iw, h: r.iw });
    s.addText(r.t, { x: 5.75, y: ry - 0.04, w: 6.9, h: 0.35, fontFace: FONT_BODY, fontSize: 15, bold: true, color: INK, margin: 0 });
    s.addText(r.d, { x: 5.75, y: ry + 0.28, w: 6.9, h: 0.5, fontFace: FONT_BODY, fontSize: 12.5, color: SLATE, lineSpacingMultiple: 1.25, margin: 0 });
    ry += 1.0;
  });
  pageNum(s, 3, false);
}

// ============================================================
// SLIDE 4 — CART, ADDRESSES & CHECKOUT
// ============================================================
{
  const s = bgSlide(CREAM);
  kicker(s, "Feature 02");
  s.addText("From cart to doorstep in a few clear steps", {
    x: 0.7, y: 0.95, w: 11, h: 0.8,
    fontFace: FONT_HEAD, fontSize: 28, bold: true, color: INK, margin: 0,
  });

  const steps = [
    { n: "1", t: "Add to cart", d: "Adjust quantities and see the running total update instantly, with a live cart badge in the header.", img: "cart_icon.svg" },
    { n: "2", t: "Choose an address", d: "Save delivery addresses once and pick from them at checkout — no retyping every order.", img: "add_address_image.svg" },
    { n: "3", t: "Confirm the order", d: "Review items and totals in Taka before placing the order.", img: "order_icon.svg" },
  ];
  const colW = 3.75, gap = 0.35, startX = 0.7, y0 = 2.3, h0 = 4.0;
  steps.forEach((st, i) => {
    const x = startX + i * (colW + gap);
    s.addShape("roundRect", {
      x, y: y0, w: colW, h: h0, rectRadius: 0.1,
      fill: { color: "FFFFFF" }, line: { type: "none" },
      shadow: { type: "outer", color: "8C3F35", opacity: 0.15, blur: 10, offset: 3, angle: 90 },
    });
    s.addText(st.n, {
      x: x + 0.35, y: y0 + 0.3, w: 1, h: 0.8,
      fontFace: FONT_HEAD, fontSize: 40, bold: true, color: "F3DCD5", margin: 0,
    });
    s.addShape("ellipse", { x: x + colW - 1.05, y: y0 + 0.35, w: 0.7, h: 0.7, fill: { color: "FBF0EC" }, line: { type: "none" } });
    s.addImage({ path: a(st.img), x: x + colW - 0.88, y: y0 + 0.52, w: 0.36, h: 0.36 });
    s.addText(st.t, {
      x: x + 0.35, y: y0 + 1.35, w: colW - 0.7, h: 0.5,
      fontFace: FONT_HEAD, fontSize: 18, bold: true, color: INK, margin: 0,
    });
    s.addText(st.d, {
      x: x + 0.35, y: y0 + 1.85, w: colW - 0.7, h: 1.9,
      fontFace: FONT_BODY, fontSize: 12.5, color: SLATE, lineSpacingMultiple: 1.35, margin: 0,
    });
  });
  pageNum(s, 4, false);
}

// ============================================================
// SLIDE 5 — PAYMENTS (dark slide for contrast)
// ============================================================
{
  const s = bgSlide(TERRACOTTA_DEEP);
  kicker(s, "Feature 03", { color: "F1C6BC" });
  s.addText("Pay however feels comfortable", {
    x: 0.7, y: 0.95, w: 10, h: 0.8,
    fontFace: FONT_HEAD, fontSize: 28, bold: true, color: "FFFFFF", margin: 0,
  });
  s.addText("Two payment paths, covering both trust-first and card-first shoppers.", {
    x: 0.7, y: 1.55, w: 9.5, h: 0.5,
    fontFace: FONT_BODY, fontSize: 14, color: "F1E4DF", margin: 0,
  });

  const opts = [
    { t: "Cash on Delivery", d: "Pay the delivery rider in person when the order arrives — no card required, the default choice for many local shoppers.", mode: "cash" },
    { t: "Card, via Stripe", d: "Pay online at checkout with secure, verified card payment — the order is confirmed automatically once payment clears.", mode: "card" },
  ];
  const cw = 5.55, cx = [0.7, 6.65], cy = 2.6, ch = 3.5;
  opts.forEach((o, i) => {
    s.addShape("roundRect", {
      x: cx[i], y: cy, w: cw, h: ch, rectRadius: 0.12,
      fill: { color: "A2493D" }, line: { type: "none" },
    });
    s.addShape("ellipse", { x: cx[i] + 0.45, y: cy + 0.45, w: 0.9, h: 0.9, fill: { color: "FFFFFF" }, line: { type: "none" } });
    if (o.mode === "cash") {
      s.addText("৳", {
        x: cx[i] + 0.45, y: cy + 0.45, w: 0.9, h: 0.9,
        fontFace: FONT_HEAD, fontSize: 34, bold: true, color: TERRACOTTA_DEEP, align: "center", valign: "middle", margin: 0,
      });
    } else {
      // simple card glyph: rounded rect body + stripe, drawn from primitives (no external icon)
      s.addShape("roundRect", { x: cx[i] + 0.66, y: cy + 0.63, w: 0.48, h: 0.34, rectRadius: 0.04, fill: { color: TERRACOTTA_DEEP }, line: { type: "none" } });
      s.addShape("rect", { x: cx[i] + 0.66, y: cy + 0.71, w: 0.48, h: 0.07, fill: { color: "FFFFFF" }, line: { type: "none" } });
    }
    s.addText(o.t, {
      x: cx[i] + 0.45, y: cy + 1.6, w: cw - 0.9, h: 0.5,
      fontFace: FONT_HEAD, fontSize: 20, bold: true, color: "FFFFFF", margin: 0,
    });
    s.addText(o.d, {
      x: cx[i] + 0.45, y: cy + 2.15, w: cw - 0.9, h: 1.2,
      fontFace: FONT_BODY, fontSize: 13, color: "F6E5E0", lineSpacingMultiple: 1.35, margin: 0,
    });
  });
  s.addText("Every order — either payment method — triggers a branded confirmation email automatically.", {
    x: 0.7, y: 6.55, w: 11.5, h: 0.5,
    fontFace: FONT_BODY, fontSize: 12.5, italic: true, color: "F1C6BC", margin: 0,
  });
  pageNum(s, 5, true);
}

// ============================================================
// SLIDE 6 — ORDER TRACKING & EMAIL
// ============================================================
{
  const s = bgSlide(CREAM);
  kicker(s, "Feature 04");
  s.addText("Shoppers always know where their order stands", {
    x: 0.7, y: 0.95, w: 11.5, h: 0.9,
    fontFace: FONT_HEAD, fontSize: 28, bold: true, color: INK, margin: 0,
  });

  // Two-column: left = My Orders, right = email
  s.addShape("roundRect", {
    x: 0.7, y: 2.3, w: 5.6, h: 4.1, rectRadius: 0.1,
    fill: { color: "FFFFFF" }, line: { type: "none" },
    shadow: { type: "outer", color: "8C3F35", opacity: 0.15, blur: 10, offset: 3, angle: 90 },
  });
  s.addShape("ellipse", { x: 1.15, y: 2.75, w: 0.85, h: 0.85, fill: { color: "DCE9DF" }, line: { type: "none" } });
  s.addImage({ path: a("order_icon.svg"), x: 1.36, y: 2.96, w: 0.43, h: 0.43 });
  s.addText("My Orders", { x: 2.2, y: 2.8, w: 3.9, h: 0.5, fontFace: FONT_HEAD, fontSize: 19, bold: true, color: INK, margin: 0 });
  s.addText(
    "A dedicated page lists every past order — items, quantities, totals, and payment status — so shoppers never have to ask “where is it?”",
    { x: 1.15, y: 3.85, w: 4.7, h: 2.35, fontFace: FONT_BODY, fontSize: 13.5, color: SLATE, lineSpacingMultiple: 1.4, margin: 0 }
  );

  s.addShape("roundRect", {
    x: 6.5, y: 2.3, w: 6.15, h: 4.1, rectRadius: 0.1,
    fill: { color: "3A6B4A" }, line: { type: "none" },
  });
  s.addShape("ellipse", { x: 6.95, y: 2.75, w: 0.85, h: 0.85, fill: { color: "FFFFFF" }, line: { type: "none" } });
  s.addImage({ path: a("nav_cart_icon.svg"), x: 7.16, y: 2.96, w: 0.43, h: 0.43 });
  s.addText("Automatic Email Confirmations", { x: 8.0, y: 2.8, w: 4.5, h: 0.5, fontFace: FONT_HEAD, fontSize: 17, bold: true, color: "FFFFFF", margin: 0 });
  const bullets = [
    "Sent the moment an order is placed, whether paid by card or Cash on Delivery",
    "Branded, itemised, and shows the full price and delivery breakdown",
    "A second email confirms once online payment is verified",
  ];
  s.addText(
    bullets.map((b, i) => ({ text: b, options: { bullet: { code: "2022" }, breakLine: i < bullets.length - 1, paraSpaceAfter: 10 } })),
    { x: 6.95, y: 3.85, w: 5.4, h: 2.35, fontFace: FONT_BODY, fontSize: 13, color: "EAF2EC", lineSpacingMultiple: 1.3, margin: 0 }
  );
  pageNum(s, 6, false);
}

// ============================================================
// SLIDE 7 — ACCOUNTS
// ============================================================
{
  const s = bgSlide(CREAM);
  kicker(s, "Feature 05");
  s.addText("Accounts that stay simple and secure", {
    x: 0.7, y: 0.95, w: 10, h: 0.8,
    fontFace: FONT_HEAD, fontSize: 28, bold: true, color: INK, margin: 0,
  });

  const items = [
    { t: "Register & log in", d: "A quick sign-up gets shoppers ordering in moments." },
    { t: "Forgot-password recovery", d: "A secure reset flow when a password slips their mind." },
    { t: "Change password anytime", d: "Update credentials from the account settings." },
    { t: "Editable profile", d: "Keep contact details current for smoother deliveries." },
  ];
  const cw = 2.78, gap = 0.28, x0 = 0.7, y0 = 2.5, ch = 3.6;
  items.forEach((it, i) => {
    const x = x0 + i * (cw + gap);
    s.addShape("roundRect", {
      x, y: y0, w: cw, h: ch, rectRadius: 0.1,
      fill: { color: "FFFFFF" }, line: { type: "none" },
      shadow: { type: "outer", color: "8C3F35", opacity: 0.13, blur: 8, offset: 3, angle: 90 },
    });
    s.addShape("ellipse", { x: x + 0.35, y: y0 + 0.35, w: 0.62, h: 0.62, fill: { color: i % 2 === 0 ? "F3DCD5" : "DCE9DF" }, line: { type: "none" } });
    s.addImage({ path: a("profile_icon.png"), x: x + 0.5, y: y0 + 0.5, w: 0.32, h: 0.32 });
    s.addText(it.t, { x: x + 0.32, y: y0 + 1.2, w: cw - 0.6, h: 0.85, fontFace: FONT_HEAD, fontSize: 14.5, bold: true, color: INK, lineSpacingMultiple: 1.1, margin: 0 });
    s.addText(it.d, { x: x + 0.32, y: y0 + 2.05, w: cw - 0.6, h: 1.4, fontFace: FONT_BODY, fontSize: 11.5, color: SLATE, lineSpacingMultiple: 1.3, margin: 0 });
  });
  s.addText("Every account action is protected by encrypted passwords and signed session tokens behind the scenes.", {
    x: 0.7, y: 6.35, w: 11.9, h: 0.6,
    fontFace: FONT_BODY, fontSize: 13, italic: true, color: TERRACOTTA, margin: 0,
  });
  pageNum(s, 7, false);
}

// ============================================================
// SLIDE 8 — SELLER DASHBOARD
// ============================================================
{
  const s = bgSlide(TERRACOTTA_DEEP);
  kicker(s, "Feature 06", { color: "F1C6BC" });
  s.addText("A back office for the people selling the groceries", {
    x: 0.7, y: 0.95, w: 11, h: 0.9,
    fontFace: FONT_HEAD, fontSize: 28, bold: true, color: "FFFFFF", margin: 0,
  });
  s.addText("A separate, gated seller area — its own login, hidden from ordinary shoppers.", {
    x: 0.7, y: 1.65, w: 10, h: 0.5,
    fontFace: FONT_BODY, fontSize: 14, color: "F1E4DF", margin: 0,
  });

  const rows = [
    { t: "Add products", d: "Upload photos and details for new items in a simple form." },
    { t: "Manage the catalogue", d: "Edit prices, toggle stock availability, or remove listings." },
    { t: "Process orders", d: "See incoming orders and move them through fulfilment." },
  ];
  let x = 0.7;
  const cw = 3.85, gap = 0.25, y0 = 2.55, ch = 3.9;
  rows.forEach((r, i) => {
    s.addShape("roundRect", { x, y: y0, w: cw, h: ch, rectRadius: 0.1, fill: { color: "A2493D" }, line: { type: "none" } });
    s.addText(String(i + 1).padStart(2, "0"), { x: x + 0.35, y: y0 + 0.3, w: 1.2, h: 0.6, fontFace: FONT_HEAD, fontSize: 26, bold: true, color: "E3AA9E", margin: 0 });
    s.addText(r.t, { x: x + 0.35, y: y0 + 1.05, w: cw - 0.7, h: 0.7, fontFace: FONT_HEAD, fontSize: 17, bold: true, color: "FFFFFF", lineSpacingMultiple: 1.1, margin: 0 });
    s.addText(r.d, { x: x + 0.35, y: y0 + 1.75, w: cw - 0.7, h: 1.9, fontFace: FONT_BODY, fontSize: 12.5, color: "F6E5E0", lineSpacingMultiple: 1.35, margin: 0 });
    x += cw + gap;
  });
  pageNum(s, 8, true);
}

// ============================================================
// SLIDE 9 — SELLER ANALYTICS
// ============================================================
{
  const s = bgSlide(CREAM);
  kicker(s, "Feature 07");
  s.addText("Real numbers, not just a product list", {
    x: 0.7, y: 0.95, w: 9, h: 0.8,
    fontFace: FONT_HEAD, fontSize: 28, bold: true, color: INK, margin: 0,
  });
  s.addText("An analytics dashboard turns raw orders into decisions sellers can act on.", {
    x: 0.7, y: 1.6, w: 8.5, h: 0.5,
    fontFace: FONT_BODY, fontSize: 14, color: SLATE, margin: 0,
  });

  // Right-side accent image
  s.addShape("ellipse", { x: 9.55, y: 1.0, w: 3.1, h: 3.1, fill: { color: "F3DCD5" }, line: { type: "none" } });
  s.addImage({ path: a("analytics.png"), x: 9.95, y: 1.4, w: 2.3, h: 2.3 });

  const stats = [
    { t: "Revenue tracking", d: "Total earnings, viewable as a running trend over time." },
    { t: "Items sold", d: "Volume moved across the whole catalogue." },
    { t: "Payment mix", d: "How orders split between Cash on Delivery and card." },
    { t: "Top products", d: "Which items customers buy most." },
    { t: "Top locations", d: "Which delivery areas drive the most orders." },
  ];
  let ry = 2.75;
  const colW = 8.3;
  stats.forEach((st) => {
    s.addShape("ellipse", { x: 0.7, y: ry + 0.05, w: 0.12, h: 0.12, fill: { color: TERRACOTTA }, line: { type: "none" } });
    s.addText(st.t, { x: 1.0, y: ry - 0.08, w: 2.7, h: 0.45, fontFace: FONT_BODY, fontSize: 14, bold: true, color: INK, margin: 0 });
    s.addText(st.d, { x: 3.6, y: ry - 0.08, w: colW - 3.0, h: 0.45, fontFace: FONT_BODY, fontSize: 13, color: SLATE, margin: 0 });
    ry += 0.68;
  });
  pageNum(s, 9, false);
}

// ============================================================
// SLIDE 10 — CLOSING
// ============================================================
{
  const s = bgSlide(TERRACOTTA_DEEP);

  // Image confined to the right panel only — mirrors slide 1's layout so text never
  // has to compete with the photo's subject for contrast.
  s.addImage({ path: a("bottom_banner_image.png"), x: 6.9, y: 0, w: 6.43, h: 7.5, sizing: { type: "cover", w: 6.43, h: 7.5 } });
  s.addShape("rect", { x: 6.9, y: 0, w: 6.43, h: 7.5, fill: { color: TERRACOTTA_DEEP, transparency: 72 }, line: { type: "none" } });

  s.addText("KENAKATA", {
    x: 0.75, y: 2.35, w: 6, h: 0.5,
    fontFace: FONT_BODY, fontSize: 14, bold: true, color: "F1C6BC", charSpacing: 3, margin: 0,
  });
  s.addText("One storefront.\nOne dashboard.\nEvery step, covered.", {
    x: 0.75, y: 2.85, w: 6, h: 2.3,
    fontFace: FONT_HEAD, fontSize: 32, bold: true, color: "FFFFFF", lineSpacingMultiple: 1.12, margin: 0,
  });
  s.addText("Browsing  ·  Cart & Checkout  ·  Payments\nOrder Tracking  ·  Accounts  ·  Seller Tools  ·  Analytics", {
    x: 0.75, y: 5.25, w: 6, h: 0.9,
    fontFace: FONT_BODY, fontSize: 13, color: "F1E4DF", lineSpacingMultiple: 1.4, margin: 0,
  });
  pageNum(s, 10, true);
}

pres.writeFile({ fileName: path.join(__dirname, "KenaKata-Feature-Overview.pptx") }).then(() => {
  console.log("Written.");
});
