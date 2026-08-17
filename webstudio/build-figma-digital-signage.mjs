// Digital Signage page — Figma YcekX1kGhoti7ssk1sOlnr node 4:36302 (Set B, 1440x8372)
// Reuses nav / footer / technical from fig-gen.mjs and ctaForm-adjacent helpers +
// the ROI calculator from fig-shared.mjs.
import fs from "node:fs";
import { nav, footer, technical, mobileNavBehaviour } from "./fig-gen.mjs";
import { esc, el, img, FIRA, POP, PAD, H38, H36C, BODY, PILL, roiCalculator, withLabel as L , LINK_HOVER, CARD_HOVER, BTN_HOVER} from "./fig-shared.mjs";

const A = {
  hero:        "18FpsDaqSp8wwv25DlufR",  // ds-hero.jpg (slider 4:36466)
  collageWide: "Y-7TFrrSNb2hzvxF5FEqZ",  // ds-collage-wide.jpg
  collageWall: "DlNKw0eCkpOHsr6W0ykdi",  // ds-collage-wall.jpg
  cta:         "tVsZYXDb4IVEZyxl5xf87",  // ds-cta.png (dashboard + phone mockup, 4:36564)
  // byte-identical to assets already in the project
  driveThru:   "1gCL0Vqf-3PXIYVgHOTpG",  // fig-drive-thru
  menuBoard:   "ZQSZCRz1MYJtabOsi0OOY",  // fig-menu-board
  kiosk:       "Nimvx8knZj1VVNBFLvW9j",  // fig-kiosk
  audio:       "RGX8lJSn0-YRpoqLR_kDT",  // dt-audio.png
  bright:      "kR26XyOwy-YGgoRs3OQCg",  // dt-bright.png
};

// ---- 1. Hero (4:36465 slider + 4:36470 heading) ----
const hero = el("section",
  `position: relative; display: flex; flex-direction: column; justify-content: flex-end; min-height: clamp(420px, 51vw, 737px); ${PAD} padding-top: 140px; padding-bottom: clamp(48px, 6vw, 80px); background-color: #1A1A1A; overflow: hidden;`,
  img(A.hero, "Digital menu boards above the counter in a quick service restaurant",
      `position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; object-fit: cover; z-index: 0;`) +
  el("div", `position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; background-color: rgba(17,17,17,0.55); z-index: 1;`) +
  el("div", `position: relative; z-index: 2; display: flex; flex-direction: column; max-width: 970px;`,
    el("h1", `margin-top: 0px; margin-bottom: 0px; font-family: ${POP}; font-weight: 400; font-size: clamp(34px, 5vw, 72px); line-height: 1.083; letter-spacing: -1px; color: #FFFFFF;`,
      "Digital Signage Solutions for Leading Restaurant Brands")), ` id="top"`);

// ---- 2. ROI-2 stat strip (4:36472 / component 4:27688) ----
const heroStats = [
  ["22%","Average increase in order value with integrated upselling."],
  ["40%","Reduction in service time during peak hours."],
  ["360°","Unified view of guest lifetime value and preferences."],
];
const stats = el("section",
  `display: flex; flex-wrap: wrap; align-items: stretch; justify-content: center; gap: 0px; padding-top: clamp(40px, 5vw, 70px); padding-bottom: clamp(32px, 4vw, 56px); ${PAD} background-color: #FFFFFF;`,
  heroStats.map(([n,l],i) =>
    el("div", `display: flex; flex-direction: column; align-items: center; gap: 8px; max-width: 200px; padding-left: 24px; padding-right: 24px; ${i?`border-left-width: 1px; border-left-style: solid; border-left-color: #E6E9EE;`:``}`,
      el("span", `font-family: ${FIRA}; font-weight: 600; font-size: clamp(30px, 3.2vw, 38px); color: #0F9300;`, esc(n)) +
      el("span", `font-family: ${FIRA}; font-weight: 300; font-size: 16px; line-height: 1.35; color: #333333; opacity: 0.86; text-align: center;`, esc(l)))).join(""));

// ---- 3. Pictures Collage + intro (4:36574) ----
const collage = el("section",
  `display: flex; flex-direction: column; gap: 28px; padding-top: clamp(24px, 3vw, 40px); padding-bottom: clamp(40px, 5vw, 70px); ${PAD} background-color: #FFFFFF;`,
  el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 14px; width: 100%; max-width: 1300px; margin-left: auto; margin-right: auto;`,
    el("div", `display: flex; align-items: center; justify-content: center; padding: 20px; border-radius: 6px; background-color: #EDEDED;`,
      img(A.driveThru, "Outdoor digital menu board and speaker post", `width: 100%; height: auto; max-height: 420px; object-fit: contain;`)) +
    el("div", `display: flex; flex-direction: column; gap: 14px;`,
      img(A.collageWide, "Overhead digital menu boards across a restaurant counter",
          `width: 100%; height: auto; max-height: 220px; object-fit: cover; border-radius: 6px;`) +
      el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 14px;`,
        img(A.audio, "Drive-thru audio tower and lane timer", `width: 100%; height: 150px; object-fit: contain; border-radius: 6px; background-color: #EDEDED;`) +
        img(A.bright, "Indoor digital menu board pair", `width: 100%; height: 150px; object-fit: contain; border-radius: 6px; background-color: #EDEDED;`) +
        img(A.collageWall, "Video wall of digital signage panels", `width: 100%; height: 150px; object-fit: cover; border-radius: 6px;`)))) +
  el("div", `display: flex; flex-direction: column; gap: 10px; max-width: 1300px; margin-left: auto; margin-right: auto; width: 100%;`,
    el("h2", `margin-top: 0px; margin-bottom: 0px; ${H38}`, "Digital Signage Solutions") +
    el("p", `margin-top: 0px; margin-bottom: 0px; max-width: 720px; ${BODY}`,
      "Comprehensive digital signage solutions designed specifically for restaurant environments, from drive-thru to dining room.")));

// ---- 4-6. Feature bands (4:36471 / 4:36575 / 4:36573) ----
// Bullet label is Fira Sans Medium, the rest Light — matching 4:27784 et al.
const features = [
  ["Creative Studio: Design Without Limits",
   "Empower your marketing team to create stunning digital signage content with our intuitive design platform.",
   [["Drag-and-Drop Editor:","No coding or design skills needed"],
    ["Restaurant-Specific Templates:","Pre-designed for menus, promotions, and events"],
    ["Brand Control Center:","Ensure consistency across all locations"],
    ["Real-Time Collaboration:","Multiple team members can work simultaneously"],
    ["Content Scheduling:","Plan campaigns weeks or months in advance"],
    ["Asset Library:","Access to thousands of food and restaurant images"]],
   A.menuBoard, "Three-panel digital menu board running an ice cream menu", true],
  ["Indoor Digital Menu Boards",
   "Transform your restaurant interior with displays that engage customers and drive higher order values.",
   [["High-Resolution Displays:","Crystal-clear visuals that make food look irresistible"],
    ["Real-Time Updates:","Change prices, promotions, or entire menus in seconds"],
    ["Daypart Automation:","Automatically switch between breakfast, lunch, and dinner menus"],
    ["Interactive Touchscreens:","Allow customers to browse menus at their own pace"],
    ["Multi-Zone Layouts:","Show menus, promotions, and brand content simultaneously"],
    ["POS Integration:","Automatically remove out-of-stock items"]],
   A.kiosk, "Self-ordering kiosk showing a personalized welcome screen", false],
  ["Outdoor Digital Menu Boards",
   "Capture drive-thru and walk-up business with displays built to withstand the elements.",
   [["Weatherproof Construction:","Rated for rain, snow, heat, and cold"],
    ["High-Brightness Displays:","Visible in direct sunlight up to 2,500 nits"],
    ["Temperature Tolerance:","Operates from -20°F to 120°F (-29°C to 49°C)"],
    ["Drive-Thru Integration:","Sync with order confirmation systems"],
    ["Remote Management:","Update content from anywhere"],
    ["Energy Efficient:","Low power consumption with auto-brightness"]],
   A.driveThru, "Outdoor drive-thru menu board and speaker post", true],
];
const featureBandsRaw = features.map(([title, intro, bullets, asset, alt, imageFirst]) =>
  el("section", `display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); align-items: center; gap: clamp(24px, 4vw, 60px); background-color: #F6F8FF;`,
    el("div", `display: flex; align-items: center; justify-content: center; padding-top: clamp(24px, 3vw, 40px); padding-bottom: clamp(24px, 3vw, 40px); padding-left: 20px; padding-right: 20px; background-color: #F6F8FF;${imageFirst?``:` order: 2;`}`,
      img(asset, esc(alt), `width: 100%; max-width: 600px; height: auto; max-height: 520px; object-fit: contain;`)) +
    el("div", `display: flex; flex-direction: column; gap: 18px; padding-top: clamp(40px, 5vw, 70px); padding-bottom: clamp(40px, 5vw, 70px); padding-left: clamp(20px, 3vw, 40px); padding-right: clamp(20px, 4.9vw, 70px); background-color: #FFFFFF; height: 100%; justify-content: center;${imageFirst?``:` order: 1;`}`,
      el("h2", `margin-top: 0px; margin-bottom: 0px; ${H38}`, esc(title)) +
      el("p", `margin-top: 0px; margin-bottom: 0px; ${BODY}`, esc(intro)) +
      el("ul", `display: flex; flex-direction: column; margin-top: 0px; margin-bottom: 0px; padding-left: 27px; list-style-type: disc;`,
        bullets.map(([label, rest]) => el("li", `${BODY}`,
          el("span", `font-weight: 500;`, esc(label)) + " " + esc(rest))).join("")))));
// Each band is named after its own feature so the navigator lists them apart.
const featureBands = featureBandsRaw.map((band, i) => L(band, features[i][0])).join("");

// ---- 7. Drive-Thru Optimization band (4:36473) ----
const driveThruBand = el("section",
  `display: flex; flex-direction: column; align-items: center; gap: 10px; padding-top: clamp(48px, 6vw, 90px); padding-bottom: clamp(48px, 6vw, 90px); ${PAD} background-color: #FFFFFF;`,
  el("h2", `margin-top: 0px; margin-bottom: 0px; max-width: 1280px; ${H36C}`, "Drive-Thru Optimization") +
  el("p", `margin-top: 0px; margin-bottom: 0px; max-width: 722px; ${BODY} letter-spacing: normal; text-align: center;`,
    "Our outdoor displays are specifically engineered for drive-thru environments, reducing order times by an average of 22 seconds per vehicle."));

// ---- 9. Free-trial CTA (4:36556) ----
// Layer is named "Heading 3 → Get Your 14 Days Free Trial"; the rendered copy is
// the Ready-to-Transform headline, which is what is used here.
const trialCta = el("section",
  `padding-top: clamp(40px, 5vw, 70px); padding-bottom: clamp(48px, 6vw, 90px); ${PAD} background-color: #FFFFFF;`,
  el("div", `position: relative; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); align-items: center; gap: 32px; max-width: 1280px; margin-left: auto; margin-right: auto; padding-top: 58px; padding-bottom: 58px; padding-left: clamp(24px, 5vw, 80px); padding-right: 0px; border-radius: 20px; background-color: #232323; background-image: radial-gradient(ellipse 90% 120% at 15% 30%, #3A3A3A 0%, #262626 45%, #1B1B1B 100%); overflow: hidden;`,
    el("div", `display: flex; flex-direction: column; max-width: 505px; padding-right: 24px;`,
      el("h2", `margin-top: 0px; margin-bottom: 24px; font-family: ${POP}; font-weight: 700; font-size: clamp(26px, 3.2vw, 40px); line-height: 1.2; color: #FFFFFF;`,
        "Ready to Transform Your Restaurant Technology Stack?") +
      el("p", `margin-top: 0px; margin-bottom: 28px; font-family: ${POP}; font-weight: 300; font-size: clamp(15px, 1.4vw, 18px); line-height: 1.62; color: #FFFFFF;`,
        "Schedule a personalized 30-minute consultation with our solutions team. See how the Botnizer platform integrates with your ecosystem to drive revenue and operational efficiency.") +
      el("a", PILL + ` align-self: flex-start;`, "Request a Demo", ` href="/contact"`)) +
    img(A.cta, "Botnizer analytics dashboard on desktop and mobile",
        `width: 100%; height: auto; align-self: center; justify-self: end;`)));

const main = `<ws.element ws:label="Main" ws:tag="main" ws:style={css\`display: flex; flex-direction: column;\`}>${
  L(hero, "Hero")}${
  L(stats, "ROI Stat Strip")}${
  L(collage, "Picture Collage")}${
  featureBands}${
  L(driveThruBand, "Drive-Thru Optimization")}${
  technical}${
  roiCalculator("Proven Return on Investment","Digital signage pays for itself in months, not years. Here is what our customers see.")}${
  L(trialCta, "Free Trial CTA")}</ws.element>`;
const page = `<ws.element ws:label="Digital Signage Page" ws:tag="div" ws:style={css\`display: flex; flex-direction: column; font-family: ${FIRA}; color: #333333; background-color: #FFFFFF;\`}>${mobileNavBehaviour}${nav}${main}${footer}</ws.element>`;

fs.mkdirSync(".temp", { recursive: true });
fs.writeFileSync(".temp/fig-digital-signage.json", JSON.stringify({
  parentInstanceId: "cPTO5BAE8iaAZ23V4jSG9",   // /digital-signage page root
  fragment: page,
  mode: "replace",
}));
console.log("fragment:", page.length, "chars");
