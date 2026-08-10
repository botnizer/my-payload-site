// Case Study page — Figma YcekX1kGhoti7ssk1sOlnr node 4:37161 (Set B, 1440x5178)
import fs from "node:fs";
import { nav, footer, trust } from "./fig-gen.mjs";
import { esc, el, img, FIRA, POP, PAD, H38, BODY, PILL } from "./fig-shared.mjs";

const A = {
  billboard: "RLqkppj9c3Y5NRUhvg63O",  // cs-billboard.jpg (4:37162 hero)
  // row 1 reuses the case images already in the project (byte-identical sources)
  card1: "yzW_aV1I038VjPers-XX7",      // fig-case-1
  card2: "Fp2dhi4lJ_Sjg55pBkmCu",      // fig-case-2
  card3: "Du-jEIgZ5rOiivQVTUIbB",      // fig-case-3
  card4: "geKjtDjxFLRw0Lm9VBKRB",
  card5: "TRZ2q6JXMxxEYsqtOxLze",
  card6: "2RyNncRdKhTNpx-6O464j",
  gal1:  "RWCkCl6fAUf3MAjap5b9q",
  gal2:  "_-k93MIUgJ-hRXAlqjycI",
  gal3:  "nAiDNQY6lZ4MdF26qVFIV",
  gal4:  "Ggf4tgO-GT8vU9wb_D9ay",
  galMcd:"C3yo2-M6KvBqEBUcaFaii",      // ab-mcd.jpg — byte-identical to the design's tile
  cta:   "tVsZYXDb4IVEZyxl5xf87",      // ds-cta.png
};

// ---- 1. Hero billboard (4:37162) ----
const hero = el("section",
  `display: flex; justify-content: center; padding-top: 105px; padding-bottom: 0px; background-color: #FFFFFF;`,
  img(A.billboard, "Botnizer billboard reading Automate Your World on a city street",
      `width: 100%; height: auto; max-height: 620px; object-fit: cover;`), ` id="top"`);

// ---- 2. Intro strip (4:37163) ----
const strip = el("section",
  `display: flex; justify-content: center; padding-top: 28px; padding-bottom: 28px; ${PAD} background-color: #333333;`,
  el("p", `margin-top: 0px; margin-bottom: 0px; max-width: 900px; font-family: ${FIRA}; font-weight: 300; font-size: clamp(15px, 1.5vw, 18px); line-height: 28px; color: #FFFFFF; text-align: center;`,
    "Explore how Botnizer transforms drive-thru experiences and elevates QSR operations through end-to-end digital solutions."));

// ---- 3. Real Results from Restaurant Leaders (4:37166) ----
const intro = el("section",
  `display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; align-items: start; padding-top: clamp(48px, 6vw, 90px); padding-bottom: clamp(32px, 4vw, 50px); ${PAD} background-color: #FFFFFF;`,
  el("h1", `margin-top: 0px; margin-bottom: 0px; max-width: 460px; ${H38}`, "Real Results from Restaurant Leaders") +
  el("p", `margin-top: 0px; margin-bottom: 0px; ${BODY}`,
    "Discover how top-performing brands leverage Botnizer to transform operations, elevate guest experiences, and drive measurable growth across their organizations."));

// ---- 4. Botnizer Talks — six cards (4:37170) ----
// The design repeats the same three case studies twice with different imagery.
const cases = [
  ["Managing complex customizations during lunch rush","Botnizer Smart Modifiers &amp; Station Routing","40% faster build times, 95% order accuracy"],
  ["Inconsistent quality across food trucks and brick-and-mortar","Unified cloud-based platform for all locations","Standardized processes, 30% faster service"],
  ["Delivery timing and driver coordination","Integrated delivery dispatch with kitchen timing","25% faster delivery, 18% more deliveries per shift"],
];
const cardImages = [
  [A.card1,"Drive-thru lane at dusk with an illuminated menu board"],
  [A.card2,"Pre-sell screen displaying a burger promotion"],
  [A.card3,"Drive-thru entrance lined with palm trees at sunset"],
  [A.card4,"Plated dishes being served in a restaurant dining room"],
  [A.card5,"Empty restaurant dining room with low lighting"],
  [A.card6,"Close-up of a cheeseburger"],
];
const card = ([title, solution, results], [asset, alt]) =>
  el("article", `display: flex; flex-direction: column; gap: 16px;`,
    img(asset, esc(alt), `width: 100%; height: 200px; object-fit: cover; border-radius: 10px;`) +
    el("h3", `margin-top: 0px; margin-bottom: 0px; padding-left: 10px; padding-right: 10px; font-family: ${FIRA}; font-weight: 600; font-size: clamp(18px, 1.7vw, 22px); line-height: 1.25; color: #333333;`, esc(title)) +
    el("div", `display: flex; flex-direction: column; gap: 14px; padding-left: 10px; padding-right: 10px; padding-bottom: 16px;`,
      el("p", `margin-top: 0px; margin-bottom: 0px; ${BODY} font-size: 16px; line-height: 24px;`,
        el("span", `font-weight: 500;`, "Solution:") + " " + solution + `<ws.element ws:tag="br"></ws.element>` +
        el("span", `font-weight: 500;`, "Results:") + " " + esc(results)) +
      el("a", `display: inline-flex; align-items: center; gap: 8px; font-family: ${FIRA}; font-weight: 400; font-size: 14px; color: #0033C3; text-decoration-line: none;`,
        "Read More →", ` href="/case-studies/detail"`)));

const talks = el("section",
  `display: flex; flex-direction: column; align-items: center; padding-top: clamp(24px, 3vw, 40px); padding-bottom: clamp(48px, 6vw, 90px); ${PAD} background-color: #FFFFFF;`,
  el("h2", `margin-top: 0px; margin-bottom: 28px; align-self: flex-start; ${H38}`, "Botnizer Talks") +
  el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; width: 100%; max-width: 1300px; margin-bottom: 40px;`,
    cardImages.map((imgSpec, i) => card(cases[i % 3], imgSpec)).join("")) +
  el("a", `display: inline-flex; align-items: center; justify-content: center; padding-top: 10px; padding-bottom: 10px; padding-left: 34px; padding-right: 34px; border-radius: 999px; border-width: 1px; border-style: solid; border-color: #0F9300; font-family: ${FIRA}; font-weight: 400; font-size: 16px; color: #0F9300; text-decoration-line: none;`,
    "See More", ` href="/case-studies/detail"`), ` id="cases"`);

// ---- 6. Gallery (4:37342) ----
const gallery = el("section",
  `padding-top: clamp(40px, 5vw, 70px); padding-bottom: clamp(40px, 5vw, 70px); ${PAD} background-color: #FFFFFF;`,
  el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 14px; width: 100%; max-width: 1300px; margin-left: auto; margin-right: auto;`,
    img(A.gal1, "McDonald's Mc-DRIVE sign against an evening sky",
        `width: 100%; height: 100%; min-height: 260px; object-fit: cover; border-radius: 10px;`) +
    el("div", `display: flex; flex-direction: column; gap: 14px;`,
      img(A.galMcd, "McDonald's restaurant exterior lit up at night",
          `width: 100%; height: 170px; object-fit: cover; border-radius: 10px;`) +
      el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 14px;`,
        img(A.gal3, "Cheeseburger held in a wrapper", `width: 100%; height: 120px; object-fit: cover; border-radius: 10px;`) +
        img(A.gal2, "McDonald's golden arches on a red wall", `width: 100%; height: 120px; object-fit: cover; border-radius: 10px;`) +
        img(A.gal4, "Stacked burger on a dark background", `width: 100%; height: 120px; object-fit: cover; border-radius: 10px;`)))));

// ---- 7. Free-trial CTA (4:37318) ----
const trialCta = el("section",
  `padding-top: clamp(24px, 3vw, 40px); padding-bottom: clamp(48px, 6vw, 90px); ${PAD} background-color: #FFFFFF;`,
  el("div", `position: relative; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); align-items: center; gap: 32px; max-width: 1280px; margin-left: auto; margin-right: auto; padding-top: 58px; padding-bottom: 58px; padding-left: clamp(24px, 5vw, 80px); padding-right: 0px; border-radius: 20px; background-color: #232323; background-image: radial-gradient(ellipse 90% 120% at 15% 30%, #3A3A3A 0%, #262626 45%, #1B1B1B 100%); overflow: hidden;`,
    el("div", `display: flex; flex-direction: column; max-width: 505px; padding-right: 24px;`,
      el("h2", `margin-top: 0px; margin-bottom: 24px; font-family: ${POP}; font-weight: 700; font-size: clamp(26px, 3.2vw, 40px); line-height: 1.2; color: #FFFFFF;`,
        "Ready to Transform Your Restaurant Technology Stack?") +
      el("p", `margin-top: 0px; margin-bottom: 28px; font-family: ${POP}; font-weight: 300; font-size: clamp(15px, 1.4vw, 18px); line-height: 1.62; color: #FFFFFF;`,
        "Schedule a personalized 30-minute consultation with our solutions team. See how the Botnizer platform integrates with your ecosystem to drive revenue and operational efficiency.") +
      el("a", PILL + ` align-self: flex-start;`, "Request a Demo", ` href="/contact"`)) +
    img(A.cta, "Botnizer analytics dashboard on desktop and mobile",
        `width: 100%; height: auto; align-self: center; justify-self: end;`)));

const main = `<ws.element ws:tag="main" ws:style={css\`display: flex; flex-direction: column;\`}>${hero}${strip}${intro}${talks}${trust}${gallery}${trialCta}</ws.element>`;
const page = `<ws.element ws:tag="div" ws:style={css\`display: flex; flex-direction: column; font-family: ${FIRA}; color: #333333; background-color: #FFFFFF;\`}>${nav}${main}${footer}</ws.element>`;

fs.mkdirSync(".temp", { recursive: true });
fs.writeFileSync(".temp/fig-case-studies.json", JSON.stringify({
  parentInstanceId: "bsNoPbbJ50MqAAlz3bOAF",   // /case-studies page root
  fragment: page,
  mode: "replace",
}));
console.log("fragment:", page.length, "chars");
