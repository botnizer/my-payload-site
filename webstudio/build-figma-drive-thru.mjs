// Drive-Thru page — Figma YcekX1kGhoti7ssk1sOlnr node 4:36578 ("Drive-Thru Page", Set B, 1440x10542)
// Reuses nav / footer from fig-gen.mjs and the CTA form pattern from the Solutions build.
import fs from "node:fs";
import { nav, footer } from "./fig-gen.mjs";
import { ctaForm, roiCalculator, withLabel as L } from "./fig-shared.mjs";

const esc = (s) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\{/g,"&#123;").replace(/\}/g,"&#125;");
const el = (t,s,c="",a="") => `<ws.element ws:tag="${t}"${a}${s?` ws:style={css\`${s}\`}`:""}>${c}</ws.element>`;
const img = (id,alt,s) => `<$.Image src={new AssetValue("${id}")} alt="${alt}" ws:style={css\`${s}\`} />`;

const FIRA = `"Fira Sans", system-ui, sans-serif`;
const POP  = `"Poppins", system-ui, sans-serif`;
const PAD  = `padding-left: clamp(20px, 4.9vw, 70px); padding-right: clamp(20px, 4.9vw, 70px);`;
const H38  = `font-family: ${FIRA}; font-weight: 600; font-size: clamp(28px, 3.2vw, 38px); line-height: 1.21; color: #333333;`;
const H36C = `font-family: ${FIRA}; font-weight: 600; font-size: clamp(26px, 3vw, 36px); letter-spacing: -1px; color: #333333; text-align: center;`;
const BODY = `font-family: ${FIRA}; font-weight: 300; font-size: 18px; line-height: 28px; letter-spacing: 0.36px; color: #464A4B;`;
const PILL = `display: inline-flex; align-items: center; justify-content: center; padding-top: 12px; padding-bottom: 12px; padding-left: 28px; padding-right: 28px; border-radius: 999px; background-image: linear-gradient(-11.45deg, #0A6500 0%, #63DE55 100%); font-family: ${POP}; font-weight: 400; font-size: 16px; color: #FFFFFF; text-decoration-line: none; white-space: nowrap;`;

const A = {
  hero:    "wEirIX5fm0ZgDHFfka2MB",  // dt-hero.jpg     (slider 4:36687)
  visual:  "YJ2IwF3NnGfIvpR-83jAi",  // dt-visual.jpg   (4:36953)
  bright:  "kR26XyOwy-YGgoRs3OQCg",  // dt-bright.png   (4:36694)
  audio:   "RGX8lJSn0-YRpoqLR_kDT",  // dt-audio.png    (4:36695)
  media:   "ZQSZCRz1MYJtabOsi0OOY",  // fig-menu-board  (4:36696 — byte-identical to the existing asset)
  story:   "er_2aEkA_bgsyIKMGyDDa",  // dt-story.jpg    (4:36777)
  av1:     "zbBCVLOLVdmpUcYEZ9Nrg",
  av2:     "YgpmDcLW7jZUkBAuLGoV1",
  stars:   "bbI_iZDlGP_SioYxXVFhz",
  optMenu: "n7i93OFEtF-lgzZ-TDsaQ",  // dt-opt-1.svg (5ZNqAy) — also the Integration card glyph
  optFast: "dD4pAo1sgWcmW0ERCu6xi",  // sol-adv-3 (zXkO4B) reused
  optWx:   "rDCrLnKGgZlQr5mlj8nE0",  // dt-opt-3.svg (zUKZKt)
  optPred: "MC0ykKAjF9h_ReIQ91Kel",  // sol-adv-4 (lO2Ca6) reused
};

// Gradient icon chip, 40px outer / 21.333px leaf — matches 4:28119 et al.
const chip = (assetId, label) =>
  el("div", `display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; flex-shrink: 0; border-radius: 7.217px; background-image: linear-gradient(-45deg, #0A6500 0%, #63DE55 100%);`,
    img(assetId, label, `width: 21.333px; height: 21.333px;`));

// Icon card used by both AI Optimization (4:28116) and Integration (4:36776)
const iconCard = (assetId, title, body) =>
  el("article", `display: flex; flex-direction: column; gap: 24px; padding-top: 30px; padding-bottom: 30px; padding-left: 20px; padding-right: 20px; border-radius: 20px; background-color: #FFFFFF; border-width: 1px; border-style: solid; border-color: #E6E9EE;`,
    el("div", `display: flex; align-items: center; gap: 18px;`,
      chip(assetId, esc(title)) +
      el("h3", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 600; font-size: 20px; line-height: 26px; color: #262626;`, esc(title))) +
    el("p", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 400; font-size: 18px; line-height: 1.35; color: #606060;`, esc(body)));

// ---- 1. Hero (4:36686 slider + 4:36691 heading) ----
const hero = el("section",
  `position: relative; display: flex; flex-direction: column; justify-content: flex-end; min-height: clamp(420px, 51vw, 737px); ${PAD} padding-top: 140px; padding-bottom: clamp(48px, 6vw, 80px); background-color: #1A1A1A; overflow: hidden;`,
  img(A.hero, "Cars queuing at an illuminated drive-thru lane",
      `position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; object-fit: cover; z-index: 0;`) +
  el("div", `position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; background-color: rgba(17,17,17,0.5); z-index: 1;`) +
  el("div", `position: relative; z-index: 2; display: flex; flex-direction: column; max-width: 1060px;`,
    el("h1", `margin-top: 0px; margin-bottom: 0px; font-family: ${POP}; font-weight: 400; font-size: clamp(30px, 4.3vw, 62px); line-height: 1.16; letter-spacing: -1px; color: #FFFFFF;`,
      "Did you know that 60% of customers prefer to order through the drive-thru when visiting a restaurant?")), ` id="top"`);

// ---- 2. The Drive-Thru Bottleneck Problem (4:36692 / component 4:27929) ----
const painPoints = [
  "Long wait times during peak hours lead to abandoned orders",
  "Limited upsell opportunities with static menu boards",
  "Inconsistent order accuracy due to communication issues",
  "High operational costs from inefficient workflows",
  "Poor visibility in direct sunlight or bad weather",
  "No data insights to optimize menu or operations",
];
const challenges = el("section",
  `display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; padding-top: clamp(56px, 7vw, 100px); padding-bottom: clamp(40px, 5vw, 70px); ${PAD} background-color: #FFFFFF;`,
  el("div", `display: flex; flex-direction: column; gap: 18px;`,
    el("h2", `margin-top: 0px; margin-bottom: 0px; ${H38}`, "The Drive-Thru Bottleneck Problem") +
    el("p", `margin-top: 0px; margin-bottom: 0px; ${BODY}`,
      "Traditional drive-thru operations face significant challenges that impact customer satisfaction and revenue:")) +
  el("div", `display: flex; flex-direction: column; gap: 24px;`,
    el("ul", `display: flex; flex-direction: column; gap: 0px; margin-top: 0px; margin-bottom: 0px; padding-left: 27px; list-style-type: disc;`,
      painPoints.map((p) => el("li", `${BODY}`, esc(p))).join("")) +
    el("p", `margin-top: 0px; margin-bottom: 0px; ${H38}`,
      "These challenges cost QSR brands millions in lost revenue and customer loyalty annually.")), ` id="problem"`);

// ---- 3. Drive-thru product visual (4:36951 / 4:36953) ----
const visual = el("section",
  `display: flex; justify-content: center; padding-top: 0px; padding-bottom: clamp(40px, 5vw, 70px); ${PAD} background-color: #FFFFFF;`,
  img(A.visual, "Botnizer drive-thru menu board, timer and audio hardware",
      `width: 100%; max-width: 1264px; height: auto;`));

// ---- 4-6. Product bands (4:36694 / 4:36695 / 4:36696) ----
const products = [
  ["High-Brightness Displays",
   "2,500+ nits brightness for perfect visibility in direct sunlight. Rated for -20°F to 120°F operation.",
   ["IP65 Rated","5-Year Warranty"], A.bright, "Outdoor drive-thru menu board showing a bright digital menu", false],
  ["Integrated Audio Systems",
   "Crystal-clear audio with noise cancellation and echo reduction. Weather-resistant speakers and microphones.",
   ["Noise Canceling","HD Audio"], A.audio, "Drive-thru speaker post, headset and lane timer display", true],
  ["Smart Media Players",
   "Industrial-grade media players with remote management, automatic updates, and failover redundancy.",
   ["24/7 Monitoring","Auto Failover"], A.media, "Three-screen digital menu board running a dessert menu", false],
];
const productBandsRaw = products.map(([title, body, chips, asset, alt, reversed]) =>
  el("section", `display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); align-items: center; gap: clamp(24px, 4vw, 60px); background-color: #F6F8FF;`,
    el("div", `display: flex; flex-direction: column; gap: 20px; padding-top: clamp(40px, 5vw, 70px); padding-bottom: clamp(40px, 5vw, 70px); padding-left: clamp(20px, 4.9vw, 70px); padding-right: clamp(20px, 3vw, 40px); background-color: #FFFFFF; height: 100%; justify-content: center;${reversed?` order: 2;`:``}`,
      el("h2", `margin-top: 0px; margin-bottom: 0px; ${H38}`, esc(title)) +
      el("p", `margin-top: 0px; margin-bottom: 0px; ${BODY}`, esc(body)) +
      el("div", `display: flex; flex-wrap: wrap; gap: 10px;`,
        chips.map((c) => el("span",
          `display: inline-flex; align-items: center; justify-content: center; padding-top: 10px; padding-bottom: 10px; padding-left: 20px; padding-right: 20px; border-radius: 10px; background-color: #F6F8FF; font-family: ${FIRA}; font-weight: 300; font-size: 18px; line-height: 28px; color: #464A4B; white-space: nowrap;`,
          esc(c))).join(""))) +
    el("div", `display: flex; align-items: center; justify-content: center; padding-top: clamp(24px, 3vw, 40px); padding-bottom: clamp(24px, 3vw, 40px); padding-left: 20px; padding-right: 20px; background-color: #F6F8FF;${reversed?` order: 1;`:``}`,
      img(asset, esc(alt), `width: 100%; max-width: 620px; height: auto;`))));
// Each band is named after its own product so the navigator lists them apart.
const productBands = productBandsRaw.map((band, i) => L(band, products[i][0])).join("");

// ---- 7. AI-Powered Drive-Thru Optimization (4:36697 / component 4:28113) ----
const optimizations = [
  [A.optMenu,"Intelligent Menu Rotation","AI automatically promotes high-margin items during peak hours and suggests combos based on weather, time of day, and inventory levels."],
  [A.optFast,"Throughput Optimization","Real-time analysis of queue length and order complexity to suggest menu items that maintain fast service times during rushes."],
  [A.optWx,"Weather-Adaptive Promotions","Automatically promotes hot drinks on cold days, cold beverages in heat, and seasonal items based on local weather data."],
  [A.optPred,"Predictive Analytics","Forecasts demand based on historical data, local events, and weather to optimize staffing and inventory."],
];
const optimization = el("section",
  `display: flex; flex-direction: column; align-items: center; padding-top: clamp(48px, 6vw, 90px); padding-bottom: clamp(48px, 6vw, 90px); ${PAD} background-color: #FFFFFF;`,
  el("h2", `margin-top: 0px; margin-bottom: 12px; ${H36C}`, "AI-Powered Drive-Thru Optimization") +
  el("p", `margin-top: 0px; margin-bottom: 40px; max-width: 720px; ${BODY} letter-spacing: normal; text-align: center;`,
    "Our proprietary AI engine analyzes real time data to optimize every aspect of your drive-thru operations.") +
  el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; width: 100%; max-width: 1300px;`,
    optimizations.map(([a,t,b]) => iconCard(a,t,b)).join("")));

// ---- 9. Seamless Integration With Your Systems (4:36776) ----
const integrations = [
  ["POS System Integration","Real-time sync with Toast, NCR Aloha, Micros, Oracle, and 25+ other POS systems. Menu prices and availability update automatically based on POS data."],
  ["Kitchen Display System","Drive-thru orders flow directly to kitchen monitors with priority tagging. Menu promotes items with faster prep times during peak hours."],
  ["Inventory Management","Automatically removes out-of-stock items from drive-thru menus. Promotes ingredients you need to move before expiration."],
  ["CRM &amp; Loyalty Programs","Personalized promotions for returning customers. Welcome messages for loyalty members. Integration with major loyalty platforms."],
];
const integration = el("section",
  `display: flex; flex-direction: column; align-items: center; padding-top: clamp(48px, 6vw, 90px); padding-bottom: clamp(48px, 6vw, 90px); ${PAD} background-color: #FFFFFF;`,
  el("h2", `margin-top: 0px; margin-bottom: 12px; ${H36C}`, "Seamless Integration With Your Systems") +
  el("p", `margin-top: 0px; margin-bottom: 40px; max-width: 800px; ${BODY} letter-spacing: normal; text-align: center;`,
    "Botnizer drive-thru solutions connect directly to your existing technology stack") +
  el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; width: 100%; max-width: 1298px; margin-bottom: 40px;`,
    integrations.map(([t,b]) =>
      el("article", `display: flex; flex-direction: column; gap: 24px; padding: 30px; border-radius: 20px; background-color: #FFFFFF; border-width: 1px; border-style: solid; border-color: #E6E9EE;`,
        el("div", `display: flex; align-items: center; gap: 18px;`,
          chip(A.optMenu, esc(t)) +
          el("h3", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 600; font-size: 20px; line-height: 26px; color: #262626;`, t)) +
        el("p", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 300; font-size: 17px; line-height: 26px; color: #464A4B;`, esc(b)))).join("")) +
  el("a", PILL, "View All Integrations →", ` href="/solutions"`));

// ---- 10. Drive-Thru Success Stories (4:36777) ----
const storyStats = [["22%","Average AOV Increase"],["8.2mo","Average Payback Period"],["65%","Faster Menu Updates"],["327%","5 Year ROI"]];
// figcaption must be a direct child of figure, so the avatar sits outside it.
const testimonial = (avatar, quote, name) => el("div",
  `display: flex; gap: 14px; padding: 16px; border-radius: 12px; background-color: #FFFFFF; box-shadow: 0px 8px 30px 0px rgba(0,0,0,0.12);`,
  img(avatar, "", `width: 56px; height: 56px; flex-shrink: 0; border-radius: 999px; object-fit: cover;`) +
  el("figure", `display: flex; flex-direction: column; gap: 8px; margin: 0px;`,
    el("blockquote", `margin: 0px; font-family: ${FIRA}; font-weight: 400; font-size: 15px; line-height: 21px; color: #333333;`, esc(quote)) +
    el("figcaption", `display: flex; align-items: center; gap: 10px;`,
      img(A.stars, "5 out of 5 stars", `width: 62px; height: auto;`) +
      el("span", `font-family: ${FIRA}; font-weight: 300; font-size: 14px; color: #464A4B;`, esc(name)))));

const stories = el("section",
  `display: flex; flex-direction: column; align-items: center; padding-top: clamp(48px, 6vw, 90px); padding-bottom: clamp(48px, 6vw, 90px); ${PAD} background-color: #FFFFFF;`,
  el("h2", `margin-top: 0px; margin-bottom: 12px; ${H36C}`, "Drive-Thru Success Stories") +
  el("p", `margin-top: 0px; margin-bottom: 48px; max-width: 800px; ${BODY} letter-spacing: normal; text-align: center;`,
    "See how leading restaurant brands transformed their drive-thru operations with Botnizer") +
  el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 48px; align-items: center; width: 100%; max-width: 1280px;`,
    el("div", `display: flex; flex-direction: column; gap: 40px;`,
      el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 32px;`,
        storyStats.map(([n,l]) =>
          el("div", `display: flex; flex-direction: column; gap: 8px; padding-left: 16px; border-left-width: 3px; border-left-style: solid; border-left-color: #0F9300;`,
            el("span", `font-family: ${FIRA}; font-weight: 400; font-size: clamp(30px, 3.2vw, 42px); color: #333333;`, esc(n)) +
            el("span", `font-family: ${FIRA}; font-weight: 300; font-size: 17px; line-height: 24px; color: #464A4B;`, esc(l)))).join("")) +
      el("a", PILL + ` align-self: flex-start;`, "Read Full Case Study →", ` href="/case-studies/detail"`)) +
    el("div", `position: relative; display: flex; flex-direction: column; gap: 16px;`,
      img(A.story, "Illuminated drive-thru sign at a quick service restaurant at night",
          `width: 100%; height: auto; max-height: 640px; object-fit: cover; border-radius: 20px;`) +
      testimonial(A.av1, "Blessing welcomed ladyship she met humoured sir breeding her.", "Linda, Project Manager") +
      testimonial(A.av2, "Wisdom new and valley answer. Contented it so is discourse recommend. Man its upon him call mile.", "Linda, Project Manager"))), ` id="cases"`);

const main = `<ws.element ws:label="Main" ws:tag="main" ws:style={css\`display: flex; flex-direction: column;\`}>${
  L(hero, "Hero")}${
  L(challenges, "Drive-Thru Bottleneck")}${
  L(visual, "Product Line Visual")}${
  productBands}${
  L(optimization, "AI Optimization")}${
  roiCalculator("Drive-Thru ROI Calculator","See exactly how digital signage transforms your drive-thru profitability. Based on data from 200+ QSR deployments.")}${
  L(integration, "System Integrations")}${
  L(stories, "Drive-Thru Success Stories")}${ctaForm}</ws.element>`;
const page = `<ws.element ws:label="Drive-Thru Page" ws:tag="div" ws:style={css\`display: flex; flex-direction: column; font-family: ${FIRA}; color: #333333; background-color: #FFFFFF;\`}>${nav}${main}${footer}</ws.element>`;

fs.mkdirSync(".temp", { recursive: true });
fs.writeFileSync(".temp/fig-drive-thru.json", JSON.stringify({
  parentInstanceId: "wzfl8B9ShdzugGYR0zNej",   // /drive-thru page root
  fragment: page,
  mode: "replace",
}));
console.log("fragment:", page.length, "chars");
