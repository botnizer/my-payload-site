// Solutions page — Figma YcekX1kGhoti7ssk1sOlnr node 4:35995 ("Solutions Page", Set B, 1440x7263)
// Reuses nav / offering / caseStudies / footer from fig-gen.mjs so shared chrome stays in one place.
import fs from "node:fs";
import { nav, footer, offering, caseStudies, mobileNavBehaviour } from "./fig-gen.mjs";
import { ctaForm, withLabel as L , LINK_HOVER, CARD_HOVER, BTN_HOVER} from "./fig-shared.mjs";

const esc = (s) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\{/g,"&#123;").replace(/\}/g,"&#125;");
const el = (t,s,c="",a="") => `<ws.element ws:tag="${t}"${a}${s?` ws:style={css\`${s}\`}`:""}>${c}</ws.element>`;
const img = (id,alt,s) => `<$.Image src={new AssetValue("${id}")} alt="${alt}" ws:style={css\`${s}\`} />`;

const FIRA = `"Fira Sans", system-ui, sans-serif`;
const POP  = `"Poppins", system-ui, sans-serif`;
const PAD  = `padding-left: clamp(20px, 4.9vw, 70px); padding-right: clamp(20px, 4.9vw, 70px);`;
// Section heading: Fira Sans SemiBold 36px / -1px, #333 (4:27553, 4:27621)
const H36  = `font-family: ${FIRA}; font-weight: 600; font-size: clamp(26px, 3vw, 36px); line-height: 1.2; letter-spacing: -1px; color: #333333;`;
const SUB  = `font-family: ${FIRA}; font-weight: 300; font-size: 18px; line-height: 28px; color: #464A4B;`;
// Green CTA pill (4:27515) — linear-gradient(-11.45deg, #0A6500, #63DE55)
const PILL = `display: inline-flex; align-items: center; justify-content: center; padding-top: 10px; padding-bottom: 10px; padding-left: 20px; padding-right: 20px; border-radius: 999px; border-width: 1px; border-style: solid; border-color: #333333; background-image: linear-gradient(-11.45deg, #0A6500 0%, #63DE55 100%); font-family: ${POP}; font-weight: 400; font-size: 18px; letter-spacing: -1px; color: #FFFFFF; text-decoration-line: none; white-space: nowrap;${BTN_HOVER}`;

const A = {
  hero:  "KR-MIvkP0zOhnJut-HrfW",  // sol-hero.jpg   (slider frame 4:36104, transcoded 1440->1600w jpg)
  arrow: "DmK0es6SFnXqdET-iuH-u",  // sol-arrow.svg  (I4:27511;4:27045)
  adv:   ["VHj1D2B75r__8Oyh-728f","9rquMHzN7UQHS7CkpbqzP","dD4pAo1sgWcmW0ERCu6xi","MC0ykKAjF9h_ReIQ91Kel"],
};

// ---- 1. Hero (4:36103 slider + 4:36287 heading) ----
const hero = el("section",
  `position: relative; display: flex; flex-direction: column; justify-content: flex-end; min-height: clamp(420px, 51vw, 737px); ${PAD} padding-top: 140px; padding-bottom: clamp(48px, 7vw, 100px); background-color: #1A1A1A; overflow: hidden;`,
  img(A.hero, "Self-checkout lanes and digital signage in a modern store",
      `position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; object-fit: cover; z-index: 0;`) +
  el("div", `position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; background-color: rgba(17,17,17,0.55); z-index: 1;`) +
  el("div", `position: relative; z-index: 2; display: flex; flex-direction: column; max-width: 910px;`,
    el("h1", `margin-top: 0px; margin-bottom: 0px; font-family: ${POP}; font-weight: 400; font-size: clamp(34px, 5vw, 72px); line-height: 1.083; letter-spacing: -1px; color: #FFFFFF;`,
      "A Unified Platform for Every Restaurant Touchpoint")), ` id="top"`);

// ---- 2. Measurable Results (4:36284 / component 4:27507) ----
const resultCards = [
  ["QuickServe Chain","85 locations | QSR segment",[["27%","↑ Order value"],["45%","↓ Service time"]],
   "“Botnizer’s kiosks and digital signage reduced our peak-hour labor costs by 22% while increasing average ticket size.”"],
  ["Fast Casual Group","42 locations | Full service",[["18%","↑ Table turnover"],["35%","↓ Order errors"]],
   "“The unified platform eliminated our previous $45,000 monthly cost from managing 3 separate vendors.”"],
  ["Drive-Thru Leader","120+ locations | Drive-thru focus",[["31%","↑ Drive-thru speed"],["4.8★","Customer rating"]],
   "“Botnizer’s drive-thru timer and audio system reduced our average service time from 3:45 to 2:35 minutes.”"],
];
const viewCase = el("a", `display: inline-flex; align-items: center; gap: 10px; font-family: ${FIRA}; font-weight: 500; font-size: 16px; color: #2859EC; text-decoration-line: none;${LINK_HOVER}`,
  "View Case Study" + img(A.arrow, "", `width: 14px; height: 10.857px; flex-shrink: 0;`), ` href="/case-studies/detail"`);

const results = el("section",
  `display: flex; flex-direction: column; align-items: center; padding-top: clamp(56px, 7vw, 100px); padding-bottom: clamp(40px, 5vw, 70px); ${PAD} background-color: #FFFFFF;`,
  el("h2", `margin-top: 0px; margin-bottom: 14px; max-width: 880px; font-family: ${FIRA}; font-weight: 600; font-size: clamp(28px, 3.2vw, 38px); line-height: 1.21; color: #333333; text-align: center;`,
    "Measurable Results for Full-Service and Fast-Casual Restaurants") +
  el("p", `margin-top: 0px; margin-bottom: 44px; max-width: 880px; ${SUB} letter-spacing: 0.36px; text-align: center;`,
    "Trade Foresight’s powerful dataset is constantly growing and expanding making it preferred platform for all Trading needs.") +
  el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; width: 100%; max-width: 1300px; margin-bottom: 44px;`,
    resultCards.map(([name, meta, stats, quote]) =>
      el("article", `display: flex; flex-direction: column; justify-content: space-between; gap: 28px; padding-top: 40px; padding-bottom: 40px; padding-left: 30px; padding-right: 30px; border-radius: 10px; background-color: #F9F9F9; border-width: 1px; border-style: solid; border-color: #E6E9EE;${CARD_HOVER}`,
        el("div", `display: flex; flex-direction: column;`,
          el("p", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 600; font-size: clamp(28px, 2.6vw, 36px); letter-spacing: -1px; color: #333333;`, esc(name)) +
          el("p", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 300; font-size: 18px; color: #333333;`, esc(meta))) +
        el("div", `display: flex; flex-direction: column; gap: 18px; padding-left: 10px; border-left-width: 1px; border-left-style: solid; border-left-color: #333333;`,
          el("div", `display: flex; flex-wrap: wrap; gap: 16px;`,
            stats.map(([n,l]) => el("div", `display: flex; flex-direction: column; gap: 10px;`,
              el("span", `font-family: ${FIRA}; font-weight: 600; font-size: clamp(28px, 2.6vw, 36px); letter-spacing: -1px; color: #333333;`, esc(n)) +
              el("span", `font-family: ${FIRA}; font-weight: 300; font-size: 18px; color: #333333; white-space: nowrap;`, esc(l)))).join("")) +
          el("p", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 300; font-size: 18px; line-height: 1.4; color: #333333;`, esc(quote))) +
        viewCase)).join("")) +
  el("a", PILL, "View All Case Studies →", ` href="/case-studies"`));

// ---- 3. Solution / offerings heading (4:36107) + reused offering grid (4:36110 == home 65:49357) ----
const offeringsIntro = el("section",
  `display: flex; flex-direction: column; align-items: center; padding-top: clamp(48px, 6vw, 90px); padding-bottom: 0px; ${PAD} background-color: #FFFFFF;`,
  el("h2", `margin-top: 0px; margin-bottom: 14px; max-width: 1280px; ${H36} text-align: center;`,
    "Complete Restaurant Technology Solutions") +
  el("p", `margin-top: 0px; margin-bottom: 0px; max-width: 722px; ${SUB} text-align: center;`,
    "Each solution integrates seamlessly with others and with your existing systems, or deploy the complete platform for unified operations."));

// ---- 4. Solution Categories (4:36286 / component 4:27550) ----
const cats = [
  ["Revenue Driver","#9AF290","rgba(15,147,0,0.1)"],
  ["Efficiency Focus","#809FFC","rgba(0,62,246,0.1)"],
  ["Guest Experience","#B981FF","rgba(136,39,255,0.1)"],
  ["Operations","#FFB772","rgba(255,171,91,0.1)"],
  ["Data Insights","#76EE69","rgba(19,192,0,0.1)"],
];
const categories = el("section",
  `padding-top: clamp(40px, 5vw, 70px); padding-bottom: clamp(40px, 5vw, 70px); ${PAD} background-color: #FFFFFF;`,
  el("div", `display: flex; flex-direction: column; align-items: center; gap: 50px; max-width: 1300px; margin-left: auto; margin-right: auto; padding-top: 40px; padding-bottom: 40px; padding-left: 20px; padding-right: 20px; border-radius: 20px; background-color: #1F1F1F; background-image: radial-gradient(ellipse 60% 120% at 50% 0%, #484848 0%, #2D2D2D 41%, #1F1F1F 61%, #111111 82%);`,
    el("div", `display: flex; flex-direction: column; align-items: center; gap: 10px;`,
      el("h2", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 600; font-size: clamp(26px, 3vw, 36px); letter-spacing: -1px; color: #FFFFFF; text-align: center;`, "Solution Categories") +
      el("p", `margin-top: 0px; margin-bottom: 0px; max-width: 722px; font-family: ${FIRA}; font-weight: 300; font-size: 18px; line-height: 28px; color: #FFFFFF; text-align: center;`, "Each solution is optimized for specific business outcomes")) +
    el("div", `display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: center; gap: 20px; padding: 10px;`,
      cats.map(([t,c,bg]) => el("span",
        `display: inline-flex; align-items: center; justify-content: center; padding-top: 10px; padding-bottom: 10px; padding-left: 20px; padding-right: 20px; border-radius: 10px; border-width: 1px; border-style: solid; border-color: ${c}; background-color: ${bg}; font-family: ${FIRA}; font-weight: 400; font-size: 18px; letter-spacing: -1px; color: ${c}; text-align: center; white-space: nowrap;`,
        esc(t))).join(""))));

// ---- 5. The Botnizer Platform Advantage (4:36285 / component 4:27619) ----
const advantages = [
  ["Unified Data","All solutions share customer, order, and operational data in real-time for complete visibility."],
  ["Cost Efficiency","One platform eliminates multiple vendor contracts, reducing costs by 30-40%."],
  ["Faster Implementation","Pre-integrated solutions deploy in weeks, not months, with single-point support."],
  ["Scalable Architecture","Grow from one module to full platform without re-implementation or data migration."],
];
const advantage = el("section",
  `display: flex; flex-direction: column; align-items: center; padding-top: clamp(48px, 6vw, 90px); padding-bottom: clamp(48px, 6vw, 90px); ${PAD} background-color: #FFFFFF;`,
  el("h2", `margin-top: 0px; margin-bottom: 10px; ${H36} text-align: center;`, "The Botnizer Platform Advantage") +
  el("p", `margin-top: 0px; margin-bottom: 40px; max-width: 722px; ${SUB} text-align: center;`, "Why choose integrated solutions over point systems") +
  el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; width: 100%; max-width: 1300px;`,
    advantages.map(([title, body], i) =>
      el("article", `display: flex; flex-direction: column; gap: 24px; padding-top: 30px; padding-bottom: 30px; padding-left: 20px; padding-right: 20px; border-radius: 20px; background-color: #FFFFFF; border-width: 1px; border-style: solid; border-color: #E6E9EE;${CARD_HOVER}`,
        el("div", `display: flex; align-items: center; gap: 18px;`,
          el("div", `display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; flex-shrink: 0; border-radius: 7.217px; background-image: linear-gradient(-45deg, #0A6500 0%, #63DE55 100%);`,
            img(A.adv[i], esc(title), `width: 21.333px; height: 21.333px;`)) +
          el("h3", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 600; font-size: 20px; line-height: 26px; color: #262626;`, esc(title))) +
        el("p", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 400; font-size: 18px; line-height: 1.35; color: #606060;`, esc(body)))).join("")));

// ---- 6. Success Stories heading (4:36294) + reused case cards (4:36297-99 == home 65:49362) ----
const stories = el("section",
  `display: flex; flex-direction: column; align-items: center; padding-top: clamp(48px, 6vw, 90px); padding-bottom: 0px; ${PAD} background-color: #FFFFFF;`,
  el("h2", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 600; font-size: clamp(28px, 3.2vw, 38px); letter-spacing: -1px; color: #333333; text-align: center;`, "Success Stories"));

// Labels are applied here rather than at each definition so the section order
// and its navigator name read as one list.
const main = `<ws.element ws:label="Main" ws:tag="main" ws:style={css\`display: flex; flex-direction: column;\`}>${
  L(hero, "Hero")}${
  L(results, "Measurable Results")}${
  L(offeringsIntro, "Our Solutions Intro")}${
  offering}${
  L(categories, "Solution Categories")}${
  L(advantage, "Platform Advantage")}${
  L(stories, "Success Stories Heading")}${
  caseStudies}${ctaForm}</ws.element>`;
const page = `<ws.element ws:label="Solutions Page" ws:tag="div" ws:style={css\`display: flex; flex-direction: column; font-family: ${FIRA}; color: #333333; background-color: #FFFFFF;\`}>${mobileNavBehaviour}${nav}${main}${footer}</ws.element>`;

fs.mkdirSync(".temp", { recursive: true });
fs.writeFileSync(".temp/fig-solutions.json", JSON.stringify({
  parentInstanceId: "5JiRCfmpKTErOYaN3UNdP",   // /solutions page root
  fragment: page,
  mode: "replace",
}));
console.log("fragment:", page.length, "chars");
