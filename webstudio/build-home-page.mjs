import fs from "node:fs";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\{/g, "&#123;").replace(/\}/g, "&#125;");
const el = (tag, style, children, attrs = "") =>
  `<ws.element ws:tag="${tag}"${attrs}${style ? ` ws:style={css\`${style}\`}` : ""}>${children}</ws.element>`;

const SEC = `padding-top: clamp(56px, 8vw, 88px); padding-bottom: clamp(56px, 8vw, 88px); padding-left: clamp(20px, 4vw, 32px); padding-right: clamp(20px, 4vw, 32px);`;
const EYEBROW = `font-family: "Fira Sans", sans-serif; font-size: 13px; font-weight: 300; letter-spacing: 1.4px; color: #0F9300; margin-bottom: 14px;`;
const H2 = `margin-top: 0px; margin-bottom: 48px; max-width: 820px; font-family: "Fira Sans", sans-serif; font-size: clamp(28px, 4.2vw, 42px); line-height: 1.12; font-weight: 700; letter-spacing: -1.15px; color: #333333;`;
const H2D = H2.replace("#333333", "#FFFFFF");
const BODY = `margin-top: 0px; margin-bottom: 0px; font-size: 16px; line-height: 1.65; color: #464A4B;`;
const CARD = `display: flex; flex-direction: column; padding: 28px; border-radius: 18px; background-color: #FFFFFF; border-width: 1px; border-style: solid; border-color: #E4E6E7;`;
const GRID = (min) => `display: grid; grid-template-columns: repeat(auto-fit, minmax(${min}px, 1fr)); gap: 22px;`;
const KIT = `display: inline-flex; padding-top: 5px; padding-bottom: 5px; padding-left: 11px; padding-right: 11px; border-radius: 999px; background-color: rgba(15,147,0,0.1); color: #0F9300; font-family: "Fira Sans", sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.9px;`;

const stations = [
  { no: "01", zone: "PRE-ALERT / LANE ENTRY", title: "The lane starts before the lane.", body: "Directional signage at the entry point tells the driver where to go and tells your timer a car has arrived. Every measurement downstream depends on this first clean event.", kit: ["DIRECTIONAL SIGNAGE", "ENTRY DETECTION", "WAYFINDING"] },
  { no: "02", zone: "PRE-SELL", title: "Sell before they reach the speaker.", body: "A pre-sell screen inside the drive thru enclosure runs promotions and daypart offers while the car is still in the queue, so the order is half-decided by the time the customer speaks.", kit: ["PRE-SELL SCREEN", "DAYPART CMS", "OUTDOOR ENCLOSURE"] },
  { no: "03", zone: "ORDERING", title: "Heard first time, in 45°C.", body: "Speaker post and dual menu board with an order confirmation panel. Wideband audio carries the conversation clearly; the board stays readable in direct Gulf sun.", kit: ["DUAL MENU BOARD", "SPEAKER POST", "WIDEBAND AUDIO"] },
  { no: "04", zone: "CASHIER", title: "One more offer while they pay.", body: "A small screen at the cashier window shows the order total and a cross-sell prompt. Payment and upsell happen in the same few seconds instead of costing extra ones.", kit: ["UPSELL SCREEN", "PAYMENT TERMINAL", "POS INTEGRATION"] },
  { no: "05", zone: "PICKUP / SERVICE", title: "Every second, accounted for.", body: "The car leaves and the timer closes the loop: entry to exit, split by station, tied back to the POS ticket. You see where the seconds went, per store and per shift.", kit: ["LANE TIMER", "SPLIT ANALYTICS", "MOBILE ALERTS"] },
];

const products = [
  { tag: "SELF-SERVICE", name: "Self-ordering kiosks", body: "Floor-standing and wall-mounted kiosks with Arabic-first UI, Mada and Apple Pay, and menus that stay in sync with the lane." },
  { tag: "INDOOR", name: "Digital menu boards", body: "Bright, colour-calibrated indoor screens. One CMS drives counter, lane and delivery pickup walls together." },
  { tag: "SOFTWARE", name: "Content management", body: "Schedule by daypart, store cluster or live stock. Push a price change to 300 screens in one action." },
  { tag: "REPUTATION", name: "NFC review cards", body: "Tap-to-review cards at counter and window. More Google reviews, better local ranking, measurable per store." },
];

const diffs = [
  { title: "Support that answers", body: "Local engineers, 4-hour response, spare parts held in Riyadh. Not a ticket queue in another timezone." },
  { title: "The full stack", body: "Boards, audio, timers, kiosks, signage, network and civil works. One contract, one accountable partner." },
  { title: "Integrations that hold", body: "Clean POS and back-office integrations, fewer defects in the field, and firmware we actually test before rollout." },
  { title: "Better pricing", body: "Distributor economics on Acrelec and Quail Digital hardware, passed on. Compare us line by line against HME." },
];

const services = [
  { no: "01", name: "Lane design consultancy", body: "Throughput modelling, lane geometry, menu board sightlines and stacking capacity before build." },
  { no: "02", name: "Site survey", body: "Power, data, mounting, drainage and glare assessed on site, documented for the contractor." },
  { no: "03", name: "Network & infrastructure", body: "Switching, cabling, failover connectivity and remote access built for unattended outdoor kit." },
  { no: "04", name: "POS & back-office integration", body: "Menu, pricing and order data flowing correctly between POS, boards, kiosks and timers." },
  { no: "05", name: "Installation & rollout", body: "Phased multi-site rollouts scheduled around trading hours, with commissioning sign-off per store." },
  { no: "06", name: "Managed support", body: "Monitoring, preventive maintenance and an SLA with response times you can hold us to." },
];

const cases = [
  { tag: "COFFEE CHAIN — RIYADH", title: "Dual-lane rebuild cut peak wait by 22 seconds across 40 stores" },
  { tag: "QSR — EASTERN PROVINCE", title: "Menu board and audio refresh across 60 stores in one quarter" },
  { tag: "NEW BUILD — JEDDAH", title: "Lane designed from the drawings, live on opening day" },
];

const needs = ["Drive thru", "Menu boards", "Audio & headsets", "Timers", "Kiosks", "Signage", "Consultancy"];

// --- Section 2: the lane ---
const laneCards = stations.map((s) =>
  el("article", `${CARD} background-color: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.12);`,
    el("div", `font-family: "Fira Sans", sans-serif; font-size: 40px; font-weight: 700; color: rgba(15,147,0,0.9); line-height: 1;`, esc(s.no)) +
    el("div", `margin-top: 10px; font-family: "Fira Sans", sans-serif; font-size: 11px; letter-spacing: 1.2px; color: rgba(255,255,255,0.55);`, esc(s.zone)) +
    el("h3", `margin-top: 14px; margin-bottom: 12px; font-family: "Fira Sans", sans-serif; font-size: 22px; font-weight: 500; line-height: 1.25; color: #FFFFFF;`, esc(s.title)) +
    el("p", `${BODY} color: rgba(255,255,255,0.7); margin-bottom: 18px;`, esc(s.body)) +
    el("div", `display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto;`, s.kit.map((k) => el("span", KIT, esc(k))).join(""))
  )).join("");

const laneSection = el("section", `${SEC} background-color: #1C1C1C;`,
  el("div", EYEBROW, "DRIVE THRU") +
  el("h2", H2D, "Walk the lane, station by station.") +
  el("div", GRID(260), laneCards), ` id="lane"`);

// --- Section 3: in restaurant ---
const productCards = products.map((p) =>
  el("article", CARD,
    el("div", `${KIT} align-self: flex-start; margin-bottom: 14px;`, esc(p.tag)) +
    el("h3", `margin-top: 0px; margin-bottom: 10px; font-family: "Fira Sans", sans-serif; font-size: 21px; font-weight: 500; color: #0F9300;`, esc(p.name)) +
    el("p", BODY, esc(p.body))
  )).join("");

const productSection = el("section", `${SEC} background-color: #F9FAFB;`,
  el("div", EYEBROW, "IN RESTAURANT") +
  el("h2", H2, "Inside the restaurant, too.") +
  el("div", GRID(250), productCards), ` id="products"`);

// --- Section 4: why ---
const diffCards = diffs.map((d) =>
  el("article", CARD,
    el("h3", `margin-top: 0px; margin-bottom: 10px; font-family: "Fira Sans", sans-serif; font-size: 21px; font-weight: 500; color: #003EF6;`, esc(d.title)) +
    el("p", BODY, esc(d.body))
  )).join("");

const whySection = el("section", `${SEC} background-color: #FFFFFF;`,
  el("div", EYEBROW, "WHY BOTNIZER") +
  el("h2", H2, "Better support, better kit, better price.") +
  el("div", GRID(250), diffCards), ` id="why"`);

// --- Section 5: services ---
const serviceRows = services.map((s) =>
  el("article", `display: flex; gap: 20px; padding-top: 24px; padding-bottom: 24px; border-top-width: 1px; border-top-style: solid; border-top-color: #E4E6E7;`,
    el("div", `font-family: "Fira Sans", sans-serif; font-size: 15px; font-weight: 700; color: #8827FF; min-width: 34px;`, esc(s.no)) +
    el("div", `display: flex; flex-direction: column; gap: 8px;`,
      el("h3", `margin-top: 0px; margin-bottom: 0px; font-family: "Fira Sans", sans-serif; font-size: 20px; font-weight: 500; color: #333333;`, esc(s.name)) +
      el("p", BODY, esc(s.body)))
  )).join("");

const serviceSection = el("section", `${SEC} background-color: #F9FAFB;`,
  el("div", EYEBROW, "SERVICES") +
  el("h2", H2, "We show up before the concrete is poured.") +
  el("div", `display: flex; flex-direction: column; max-width: 900px;`, serviceRows), ` id="services"`);

// --- Section 6: cases ---
const caseCards = cases.map((c) =>
  el("article", CARD,
    el("div", `${KIT} align-self: flex-start; margin-bottom: 16px;`, esc(c.tag)) +
    el("h3", `margin-top: 0px; margin-bottom: 0px; font-family: "Fira Sans", sans-serif; font-size: 20px; font-weight: 500; line-height: 1.3; color: #333333;`, esc(c.title))
  )).join("");

const caseSection = el("section", `${SEC} background-color: #FFFFFF;`,
  el("div", EYEBROW, "CASE STUDIES") +
  el("h2", H2, "Proof, from the Kingdom.") +
  el("div", GRID(280), caseCards), ` id="cases"`);

// --- Section 7: quote form ---
const needChips = needs.map((n) =>
  el("label", `display: inline-flex; align-items: center; gap: 8px; padding-top: 9px; padding-bottom: 9px; padding-left: 16px; padding-right: 16px; border-radius: 999px; border-width: 1px; border-style: solid; border-color: rgba(255,255,255,0.28); color: rgba(255,255,255,0.85); font-size: 14px;`,
    `<ws.element ws:tag="input" type="checkbox" name="needs" value="${esc(n)}" ws:style={css\`accent-color: #0F9300;\`}></ws.element>` + esc(n))).join("");

const field = (label, tag, attrs) =>
  el("label", `display: flex; flex-direction: column; gap: 8px; font-size: 13px; letter-spacing: 0.6px; color: rgba(255,255,255,0.6); font-family: "Fira Sans", sans-serif;`,
    esc(label) + `<ws.element ws:tag="${tag}"${attrs} ws:style={css\`padding-top: 13px; padding-bottom: 13px; padding-left: 15px; padding-right: 15px; border-radius: 10px; border-width: 1px; border-style: solid; border-color: rgba(255,255,255,0.22); background-color: rgba(255,255,255,0.06); color: #FFFFFF; font-size: 15px; font-family: inherit;\`}></ws.element>`);

const quoteSection = el("section", `${SEC} background-color: #242829;`,
  el("div", EYEBROW, "GET STARTED") +
  el("h2", H2D, "Get a lane-by-lane quote.") +
  el("p", `${BODY} color: rgba(255,255,255,0.7); max-width: 620px; margin-top: -28px; margin-bottom: 36px;`, "Tell us how many lanes and stores you run. We come back within one business day with a line-by-line proposal.") +
  el("form", `display: flex; flex-direction: column; gap: 22px; max-width: 720px;`,
    el("div", GRID(240),
      field("NAME", "input", ` type="text" name="name" required="true"`) +
      field("COMPANY", "input", ` type="text" name="company"`) +
      field("EMAIL", "input", ` type="email" name="email" required="true"`) +
      field("PHONE", "input", ` type="tel" name="phone"`)) +
    el("div", `display: flex; flex-direction: column; gap: 12px;`,
      el("div", `font-family: "Fira Sans", sans-serif; font-size: 13px; letter-spacing: 0.6px; color: rgba(255,255,255,0.6);`, "WHAT DO YOU NEED?") +
      el("div", `display: flex; flex-wrap: wrap; gap: 10px;`, needChips)) +
    field("ANYTHING ELSE?", "textarea", ` name="message" rows="4"`) +
    el("button", `align-self: flex-start; padding-top: 15px; padding-bottom: 15px; padding-left: 34px; padding-right: 34px; border-radius: 999px; border-width: 0px; background-color: #0F9300; color: #FFFFFF; font-size: 16px; font-weight: 600; font-family: inherit; cursor: pointer;`, "Request a quote", ` type="submit"`)
  ), ` id="quote"`);

// --- Section 8: footer ---
const footer = el("footer", `display: flex; flex-wrap: wrap; gap: 18px; align-items: center; padding-top: 34px; padding-bottom: 34px; padding-left: clamp(20px, 4vw, 32px); padding-right: clamp(20px, 4vw, 32px); background-color: #1C1C1C; color: rgba(255,255,255,0.55); font-size: 13px;`,
  el("span", `font-family: "Fira Sans", sans-serif; font-weight: 700; color: #FFFFFF; font-size: 16px;`, "Botnizer KSA") +
  el("span", ``, "Authorised Acrelec + Quail Digital distributor — Saudi Arabia, Bahrain and Qatar.") +
  el("span", `margin-left: auto;`, "© 2026 Botnizer"));

const fragments = {
  "02-lane": laneSection,
  "03-products": productSection,
  "04-why": whySection,
  "05-services": serviceSection,
  "06-cases": caseSection,
  "07-quote": quoteSection,
  "08-footer": footer,
};

const parent = process.argv[2];
for (const [name, frag] of Object.entries(fragments)) {
  fs.writeFileSync(`.temp/${name}.json`, JSON.stringify({ parentInstanceId: parent, fragment: frag, mode: "append" }));
  console.log(name, frag.length, "chars");
}

// ---- full page with correct landmarks ----
const header = el("header", `position: sticky; top: 0px; z-index: 50; display: flex; align-items: center; gap: 24px; padding-top: 16px; padding-bottom: 16px; padding-left: clamp(16px, 4vw, 32px); padding-right: clamp(16px, 4vw, 32px); background-color: rgba(28,28,28,0.92); border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgba(255,255,255,0.1);`,
  el("a", `display: flex; align-items: center; gap: 10px; color: #FFFFFF; text-decoration-line: none; font-family: "Fira Sans", sans-serif; font-weight: 700; font-size: 20px; letter-spacing: -0.4px;`,
    `<$.Image src={new AssetValue("n_1IKQjhtWW6e6abil99O")} alt="Botnizer" ws:style={css\`height: 26px; width: auto;\`} />` +
    el("span", `font-size: 12px; font-weight: 500; color: #0F9300; letter-spacing: 1px;`, "KSA"), ` href="#top"`) +
  el("nav", `display: flex; align-items: center; flex-wrap: wrap; gap: clamp(10px, 2vw, 24px); margin-left: auto; font-size: 14px;`,
    [["#lane","Drive Thru"],["#products","In Restaurant"],["#services","Services"],["#why","Partners"],["#cases","Case Studies"]]
      .map(([h,t]) => el("a", `color: rgba(255,255,255,0.8); text-decoration-line: none;`, t, ` href="${h}"`)).join("") +
    el("a", `padding-top: 10px; padding-bottom: 10px; padding-left: 18px; padding-right: 18px; border-radius: 999px; background-color: #0F9300; color: #FFFFFF; font-weight: 600; text-decoration-line: none;`, "Request a quote", ` href="#quote"`)));

const hero = el("section", `position: relative; display: flex; flex-direction: column; justify-content: flex-end; min-height: clamp(460px, 72vh, 620px); padding-top: 96px; padding-bottom: 72px; padding-left: clamp(20px, 4vw, 32px); padding-right: clamp(20px, 4vw, 32px); background-color: #1C1C1C; background-image: linear-gradient(180deg, rgba(28,28,28,0.55) 0%, rgba(28,28,28,0.95) 100%); overflow: hidden;`,
  el("div", `display: inline-flex; align-self: flex-start; font-family: "Fira Sans", sans-serif; font-size: 13px; font-weight: 300; letter-spacing: 1.4px; color: #0F9300; margin-bottom: 20px;`, "AUTHORISED ACRELEC + QUAIL DIGITAL DISTRIBUTOR — SAUDI ARABIA") +
  el("h1", `margin-top: 0px; margin-bottom: 24px; max-width: 900px; font-family: "Fira Sans", sans-serif; font-size: clamp(34px, 6vw, 64px); line-height: 1.05; font-weight: 700; letter-spacing: -1.8px; color: #FFFFFF;`, "Seconds off every car in the lane.") +
  el("p", `margin-top: 0px; margin-bottom: 32px; max-width: 640px; font-size: 18px; line-height: 1.6; color: rgba(255,255,255,0.78);`, "We design, install and support the full drive thru stack for QSR and coffee chains across the Kingdom — menu boards, audio, timers and analytics, from one team that answers the phone.") +
  el("div", `display: flex; gap: 14px; flex-wrap: wrap;`,
    el("a", `padding-top: 15px; padding-bottom: 15px; padding-left: 30px; padding-right: 30px; border-radius: 999px; background-color: #0F9300; color: #FFFFFF; font-weight: 600; text-decoration-line: none;`, "Request a quote", ` href="#quote"`) +
    el("a", `padding-top: 15px; padding-bottom: 15px; padding-left: 30px; padding-right: 30px; border-radius: 999px; border-width: 1px; border-style: solid; border-color: rgba(255,255,255,0.35); color: #FFFFFF; font-weight: 600; text-decoration-line: none;`, "Walk the lane", ` href="#lane"`)), ` id="top"`);

const trust = el("div", `display: flex; flex-wrap: wrap; align-items: center; gap: 28px; padding-top: 18px; padding-bottom: 18px; padding-left: clamp(20px, 4vw, 32px); padding-right: clamp(20px, 4vw, 32px); background-color: #EEEEEE; font-family: "Fira Sans", sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 1.2px; color: #464A4B;`,
  el("span", `color: #0F9300;`, "TRUSTED BY OPERATORS IN") +
  ["SAUDI ARABIA","BAHRAIN","QATAR","300+ LANES SERVICED","4H RESPONSE SLA","13 CITIES"].map((t)=>el("span","",t)).join(""));

const hardware = el("section", `display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); align-items: center; gap: 48px; ${SEC} background-color: #EEEEEE;`,
  el("div", `display: flex; flex-direction: column;`,
    el("div", EYEBROW, "THE HARDWARE") +
    el("h2", `${H2} margin-bottom: 20px;`, "Readable at noon. Heard at 45°C.") +
    el("p", `${BODY} margin-bottom: 28px; max-width: 520px;`, "Dual outdoor menu boards with an order confirmation panel, built for Gulf sun and Gulf summers. One CMS drives the lane, the counter and the pickup wall together.") +
    el("div", `display: flex; flex-wrap: wrap; gap: 8px;`, ["DUAL MENU BOARD","ORDER CONFIRMATION","OUTDOOR ENCLOSURE"].map((k)=>el("span",KIT,k)).join(""))) +
  `<$.Image src={new AssetValue("bc-38CykDuP8CsFZUsbH1")} alt="Dual outdoor digital menu board with order confirmation panel" ws:style={css\`width: 100%; height: auto; max-width: 560px; justify-self: center;\`} />`);

const main = el("main", `display: flex; flex-direction: column;`,
  hero + trust + laneSection + hardware + productSection + whySection + serviceSection + caseSection + quoteSection);

const fullPage = el("div", `display: flex; flex-direction: column; font-family: "Open Sans", system-ui, sans-serif; color: #333333; background-color: #FFFFFF;`,
  header + main + footer);

fs.writeFileSync(".temp/full.json", JSON.stringify({
  parentInstanceId: "gAjzfwdgTVTr0bkZO_d9B",
  fragment: fullPage,
  mode: "replace",
}));
console.log("full page:", fullPage.length, "chars");
