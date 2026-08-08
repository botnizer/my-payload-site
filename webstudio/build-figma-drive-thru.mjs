// Drive-Thru page — Figma YcekX1kGhoti7ssk1sOlnr node 4:36578 ("Drive-Thru Page", Set B, 1440x10542)
// Reuses nav / footer from fig-gen.mjs and the CTA form pattern from the Solutions build.
import fs from "node:fs";
import { nav, footer } from "./fig-gen.mjs";

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
const productBands = products.map(([title, body, chips, asset, alt, reversed]) =>
  el("section", `display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); align-items: center; gap: clamp(24px, 4vw, 60px); background-color: #F6F8FF;`,
    el("div", `display: flex; flex-direction: column; gap: 20px; padding-top: clamp(40px, 5vw, 70px); padding-bottom: clamp(40px, 5vw, 70px); padding-left: clamp(20px, 4.9vw, 70px); padding-right: clamp(20px, 3vw, 40px); background-color: #FFFFFF; height: 100%; justify-content: center;${reversed?` order: 2;`:``}`,
      el("h2", `margin-top: 0px; margin-bottom: 0px; ${H38}`, esc(title)) +
      el("p", `margin-top: 0px; margin-bottom: 0px; ${BODY}`, esc(body)) +
      el("div", `display: flex; flex-wrap: wrap; gap: 10px;`,
        chips.map((c) => el("span",
          `display: inline-flex; align-items: center; justify-content: center; padding-top: 10px; padding-bottom: 10px; padding-left: 20px; padding-right: 20px; border-radius: 10px; background-color: #F6F8FF; font-family: ${FIRA}; font-weight: 300; font-size: 18px; line-height: 28px; color: #464A4B; white-space: nowrap;`,
          esc(c))).join(""))) +
    el("div", `display: flex; align-items: center; justify-content: center; padding-top: clamp(24px, 3vw, 40px); padding-bottom: clamp(24px, 3vw, 40px); padding-left: 20px; padding-right: 20px; background-color: #F6F8FF;${reversed?` order: 1;`:``}`,
      img(asset, esc(alt), `width: 100%; max-width: 620px; height: auto;`)))).join("");

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

// ---- 8. Drive-Thru ROI Calculator (4:36698) ----
// The design's calculator is a live widget: the Totals panel recomputes from the
// form. Built here as a static form with the design's own figures; wiring the
// arithmetic needs Webstudio variables + expressions.
const roiStats = [["22%","Average AOV Increase"],["8.2 mo","Average Payback Period"],["65%","Faster Menu Updates"],["300+","Restaurant Deployments"]];
const calcField = (label, tag, attrs, placeholder) => el("label",
  `display: flex; flex-direction: column; gap: 8px; font-family: ${POP}; font-weight: 400; font-size: 14px; color: #464A4B;`,
  esc(label) + `<ws.element ws:tag="${tag}"${attrs}${placeholder?` placeholder="${placeholder}"`:``} ws:style={css\`padding-top: 12px; padding-bottom: 12px; padding-left: 14px; padding-right: 14px; border-radius: 8px; border-width: 1px; border-style: solid; border-color: #E6E9EE; background-color: #FFFFFF; font-family: ${POP}; font-size: 15px; color: #333333; width: 100%;\`}></ws.element>`);
const total = (label, value, primary) => el("div",
  `display: flex; flex-direction: column; align-items: center; gap: 6px; padding-top: 18px; padding-bottom: 18px; padding-left: 16px; padding-right: 16px; border-radius: 12px; ${primary?`background-image: linear-gradient(180deg, #63DE55 0%, #0A6500 100%);`:`background-color: #FFFFFF; border-width: 1px; border-style: solid; border-color: #E6E9EE;`}`,
  el("span", `font-family: ${POP}; font-weight: 600; font-size: 14px; color: ${primary?"#FFFFFF":"#333333"}; text-align: center;`, esc(label)) +
  el("span", `font-family: ${POP}; font-weight: 700; font-size: ${primary?"20px":"22px"}; color: ${primary?"#FFFFFF":"#333333"};`, esc(value)));

const roi = el("section",
  `display: flex; flex-direction: column; align-items: center; padding-top: clamp(48px, 6vw, 90px); padding-bottom: clamp(48px, 6vw, 90px); ${PAD} background-color: #FCFCFC;`,
  el("h2", `margin-top: 0px; margin-bottom: 12px; ${H36C}`, "Drive-Thru ROI Calculator") +
  el("p", `margin-top: 0px; margin-bottom: 40px; max-width: 800px; ${BODY} letter-spacing: normal; text-align: center;`,
    "See exactly how digital signage transforms your drive-thru profitability. Based on data from 200+ QSR deployments.") +
  el("div", `display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 0px; margin-bottom: 48px;`,
    roiStats.map(([n,l],i) =>
      el("div", `display: flex; flex-direction: column; align-items: center; gap: 6px; padding-left: 28px; padding-right: 28px; ${i?`border-left-width: 1px; border-left-style: solid; border-left-color: #E6E9EE;`:``}`,
        el("span", `font-family: ${FIRA}; font-weight: 700; font-size: clamp(26px, 2.6vw, 34px); color: #0F9300;`, esc(n)) +
        el("span", `font-family: ${FIRA}; font-weight: 300; font-size: 16px; color: #464A4B; text-align: center;`, esc(l)))).join("")) +
  el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; align-items: start; width: 100%; max-width: 1285px;`,
    el("form", `display: flex; flex-direction: column; gap: 24px; padding: 32px; border-radius: 20px; background-color: #FFFFFF; border-width: 1px; border-style: solid; border-color: #E6E9EE;`,
      el("div", `display: flex; flex-direction: column; align-items: center; gap: 10px;`,
        el("h3", `margin-top: 0px; margin-bottom: 0px; font-family: ${POP}; font-weight: 600; font-size: 24px; color: #333333; text-align: center;`, "Outcome calculator simulator") +
        el("p", `margin-top: 0px; margin-bottom: 0px; font-family: ${POP}; font-weight: 300; font-size: 15px; line-height: 24px; color: #464A4B; text-align: center;`,
          "Maths is confusing. However, maths are a crucial part of your compensation. This tool will help you estimate the value of your generic package.")) +
      el("fieldset", `display: flex; flex-direction: column; gap: 18px; margin: 0px; padding: 24px; border-radius: 12px; border-width: 1px; border-style: solid; border-color: #E6E9EE;`,
        el("legend", `padding-left: 6px; padding-right: 6px; font-family: ${POP}; font-weight: 500; font-size: 17px; color: #333333;`, "Company information") +
        calcField("Company name","input",` type="text" name="company"`,"Placeholder") +
        el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 18px;`,
          calcField("Country","input",` type="text" name="country"`,"United Kingdom") +
          calcField("Currency","input",` type="text" name="currency"`,"£ GBP")) +
        el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 18px;`,
          calcField("Annual amount","input",` type="text" name="annualAmount"`,"£") +
          calcField("Number of Locations","input",` type="text" name="locations"`,"123")) +
        el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 18px;`,
          calcField("Average Daily Customers","input",` type="text" name="dailyCustomers"`,"£") +
          calcField("Current Average Order Value","input",` type="text" name="aov"`,"£"))) +
      el("div", `display: flex; flex-direction: column; gap: 12px; padding: 24px; border-radius: 12px; border-width: 1px; border-style: solid; border-color: #E6E9EE;`,
        el("span", `font-family: ${POP}; font-weight: 500; font-size: 15px; color: #333333;`, "Expected additional dilution") +
        el("div", `display: flex; align-items: center; gap: 16px;`,
          el("input", `flex-grow: 1; accent-color: #0F9300;`, "", ` type="range" name="dilution" min="0" max="100" value="10" aria-label="Expected additional dilution"`) +
          el("span", `display: inline-flex; align-items: center; gap: 6px; padding-top: 10px; padding-bottom: 10px; padding-left: 16px; padding-right: 16px; border-radius: 8px; border-width: 1px; border-style: solid; border-color: #E6E9EE; font-family: ${POP}; font-weight: 500; font-size: 15px; color: #333333;`, "10 %")))) +
    el("div", `display: flex; flex-direction: column; gap: 14px; padding: 24px; border-radius: 20px; background-color: #FFFFFF; border-width: 1px; border-style: solid; border-color: #0F9300;`,
      el("div", `display: flex; flex-direction: column; align-items: center; gap: 4px;`,
        el("h3", `margin-top: 0px; margin-bottom: 0px; font-family: ${POP}; font-weight: 600; font-size: 22px; color: #333333;`, "Totals") +
        el("p", `margin-top: 0px; margin-bottom: 0px; font-family: ${POP}; font-weight: 300; font-size: 14px; color: #464A4B;`, "Pre and post tax estimates")) +
      total("Annual amount","£9,316", true) +
      total("Quantity of options","£2,670", false) +
      total("Total cost of outstanding shares","£1,987,500", false) +
      total("Post-tax value estimate","£1,564.21", false) +
      total("Pre-tax value estimate","£1,987,500", false))));

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
  el("a", PILL, "View All Integrations →", ` href="#contact"`));

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
      el("a", PILL + ` align-self: flex-start;`, "Read Full Case Study →", ` href="#contact"`)) +
    el("div", `position: relative; display: flex; flex-direction: column; gap: 16px;`,
      img(A.story, "Illuminated drive-thru sign at a quick service restaurant at night",
          `width: 100%; height: auto; max-height: 640px; object-fit: cover; border-radius: 20px;`) +
      testimonial(A.av1, "Blessing welcomed ladyship she met humoured sir breeding her.", "Linda, Project Manager") +
      testimonial(A.av2, "Wisdom new and valley answer. Contented it so is discourse recommend. Man its upon him call mile.", "Linda, Project Manager"))), ` id="cases"`);

// ---- 11. CTA Section (4:36834 — same component as the Solutions page) ----
const fieldStyle = `padding-top: 13px; padding-bottom: 13px; padding-left: 12px; padding-right: 12px; border-radius: 8px; border-width: 1px; border-style: solid; border-color: #E6E9EE; background-color: #F9F9F9; font-family: ${POP}; font-size: 16px; color: #333333; width: 100%;`;
const field = (label, tag, attrs) => el("label",
  `display: flex; flex-direction: column; gap: 8px; font-family: ${POP}; font-weight: 400; font-size: 14px; color: #464A4B;`,
  esc(label) + `<ws.element ws:tag="${tag}"${attrs} ws:style={css\`${fieldStyle}\`}></ws.element>`);

const cta = el("section",
  `padding-top: clamp(56px, 7vw, 100px); padding-bottom: clamp(56px, 7vw, 100px); ${PAD} background-color: #111111; background-image: radial-gradient(ellipse 80% 100% at 20% 40%, #2A2A2A 0%, #1A1A1A 45%, #111111 100%);`,
  el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 48px; align-items: center; max-width: 1300px; margin-left: auto; margin-right: auto;`,
    el("div", `display: flex; flex-direction: column; max-width: 528px;`,
      el("p", `margin-top: 0px; margin-bottom: 8px; font-family: ${POP}; font-weight: 400; font-size: 18px; color: #FFFFFF;`, "Get in Touch") +
      el("h2", `margin-top: 0px; margin-bottom: 28px; font-family: ${POP}; font-weight: 700; font-size: clamp(32px, 4vw, 52px); line-height: 1.17; color: #FFFFFF;`, "Ready to Transform Your Restaurant Technology Stack?") +
      el("p", `margin-top: 0px; margin-bottom: 0px; font-family: ${POP}; font-weight: 300; font-size: clamp(15px, 1.4vw, 18px); line-height: 1.65; color: #FFFFFF;`,
        "Schedule a personalized 30-minute consultation with our solutions team. See how the Botnizer platform integrates with your ecosystem to drive revenue and operational efficiency.")) +
    el("form", `display: flex; flex-direction: column; gap: 20px; padding: 30px; border-radius: 20px; background-color: #FFFFFF;`,
      field("Full Name","input",` type="text" name="fullName" required="true"`) +
      field("Email","input",` type="email" name="email" required="true"`) +
      el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;`,
        field("Phone","input",` type="tel" name="phone"`) +
        field("Country","input",` type="text" name="country"`)) +
      field("Brand","input",` type="text" name="brand"`) +
      field("Number of Locations","input",` type="text" name="locations"`) +
      el("input", fieldStyle + ` color: #464A4B;`, "",
        ` type="text" name="challenge" placeholder="What’s your biggest operational challenge?" aria-label="What’s your biggest operational challenge?"`) +
      field("Tell us more","textarea",` name="message" rows="6"`) +
      el("button", `align-self: flex-start; padding-top: 12px; padding-bottom: 12px; padding-left: 34px; padding-right: 34px; border-radius: 999px; border-width: 0px; background-image: linear-gradient(-11.45deg, #0A6500 0%, #63DE55 100%); font-family: ${POP}; font-weight: 400; font-size: 16px; color: #FFFFFF; cursor: pointer;`,
        "Request a Personalize Demo", ` type="submit"`) +
      el("p", `margin-top: 0px; margin-bottom: 0px; font-family: ${POP}; font-weight: 400; font-size: 13px; color: #464A4B;`,
        "By submitting, you agree to our " +
        el("a", `color: #224EED; text-decoration-line: underline;`, "Privacy Policy", ` href="#privacy"`) +
        ". No spam, ever.")), ` id="get-in-touch"`));

const main = `<ws.element ws:tag="main" ws:style={css\`display: flex; flex-direction: column;\`}>${hero}${challenges}${visual}${productBands}${optimization}${roi}${integration}${stories}${cta}</ws.element>`;
const page = `<ws.element ws:tag="div" ws:style={css\`display: flex; flex-direction: column; font-family: ${FIRA}; color: #333333; background-color: #FFFFFF;\`}>${nav}${main}${footer}</ws.element>`;

fs.mkdirSync(".temp", { recursive: true });
fs.writeFileSync(".temp/fig-drive-thru.json", JSON.stringify({
  parentInstanceId: "wzfl8B9ShdzugGYR0zNej",   // /drive-thru page root
  fragment: page,
  mode: "replace",
}));
console.log("fragment:", page.length, "chars");
