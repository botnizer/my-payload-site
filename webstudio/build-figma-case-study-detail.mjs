// Case Study Detailed page — Figma YcekX1kGhoti7ssk1sOlnr node 4:36956 (Set B, 1440x6320)
import fs from "node:fs";
import { nav, footer, caseStudies } from "./fig-gen.mjs";
import { esc, el, img, FIRA, POP, PAD, H38, BODY, PILL, withLabel as L } from "./fig-shared.mjs";

const A = {
  hero:   "yzW_aV1I038VjPers-XX7",  // fig-case-1 — the design's hero is byte-identical to it
  avatar: "shEYZF5I2oQZgNlZUFEmv",  // csd-avatar.jpg
  stars:  "bbI_iZDlGP_SioYxXVFhz",  // dt-stars.svg
  gal1:   "RWCkCl6fAUf3MAjap5b9q",  // cs-gal-1.jpg
  gal2:   "_-k93MIUgJ-hRXAlqjycI",
  gal3:   "nAiDNQY6lZ4MdF26qVFIV",
  gal4:   "Ggf4tgO-GT8vU9wb_D9ay",
  galMcd: "C3yo2-M6KvBqEBUcaFaii",  // ab-mcd.jpg
  cta:    "tVsZYXDb4IVEZyxl5xf87",  // ds-cta.png
};

// ---- 1. Hero with title overlay (4:36957) ----
const hero = el("section",
  `position: relative; display: flex; flex-direction: column; justify-content: flex-end; min-height: clamp(360px, 40vw, 560px); padding-top: 105px; background-color: #1A1A1A; overflow: hidden;`,
  img(A.hero, "McDonald's restaurant and drive-thru lane at sunset",
      `position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; object-fit: cover; z-index: 0;`) +
  el("div", `position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 12px; padding-top: 26px; padding-bottom: 26px; ${PAD} background-color: rgba(51,51,51,0.92);`,
    el("p", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 300; font-size: 14px; color: #FFFFFF;`, "December 26th, 2025") +
    el("h1", `margin-top: 0px; margin-bottom: 0px; max-width: 900px; font-family: ${FIRA}; font-weight: 600; font-size: clamp(20px, 2.2vw, 26px); line-height: 1.35; color: #FFFFFF; text-align: center;`,
      "Botnizer selected as digital drive-thru solutions partner for McDonald&#39;s") +
    el("a", `display: inline-flex; align-items: center; justify-content: center; padding-top: 6px; padding-bottom: 6px; padding-left: 20px; padding-right: 20px; border-radius: 999px; border-width: 1px; border-style: solid; border-color: #FFFFFF; font-family: ${FIRA}; font-weight: 400; font-size: 13px; color: #FFFFFF; text-decoration-line: none;`,
      "Share", ` href="#top"`)), ` id="top"`);

// ---- 2. Overview / Objectives / Solutions (4:36965) ----
const body = [
  ["Overview", [
    "To modernize the digital ordering experience, McDonald’s ANZ transitioned from static signage to a combination of indoor and outdoor digital menu boards, alongside the introduction of self-serve kiosks.",
    "Additionally, indoor digital menu boards and self-serve kiosks were rolled out across more than 1,000 retail storefronts.",
    "These technologies were integrated seamlessly with McDonald’s existing point-of-sale system, including a suggestion engine that recommended complementary items to enhance each order.",
  ]],
  ["Objectives", [
    "McDonald’s identified that drive-thru order accuracy was below target, slowing service and impacting the overall customer experience.",
    "To address this, and in line with the brand’s goal to enhance the customer journey and leverage new technology, McDonald’s moved away from static signage in favor of modern, relevant digital solutions.",
  ]],
  ["Solutions", [
    "Botnizer partnered with McDonald’s to deploy outdoor digital menu boards and order confirmation screens at over 800 locations as part of the “Ask, Ask, Tell” initiative, aimed at improving the drive-thru experience. The order confirmation screens provided customers with a second point to verify their orders, significantly improving accuracy.",
  ]],
];
const article = el("section",
  `display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 48px; align-items: start; padding-top: clamp(48px, 6vw, 90px); padding-bottom: clamp(32px, 4vw, 50px); ${PAD} background-color: #FFFFFF;`,
  el("div", `display: flex; flex-direction: column; gap: 16px;`,
    el("h2", `margin-top: 0px; margin-bottom: 0px; max-width: 420px; ${H38}`, "Proven Results for Industry Leaders") +
    el("p", `margin-top: 0px; margin-bottom: 0px; max-width: 420px; ${BODY}`,
      "See how top-performing restaurant brands leverage Botnizer to drive efficiency, elevate guest experiences, and accelerate growth.")) +
  el("div", `display: flex; flex-direction: column; gap: 28px;`,
    body.map(([heading, paras]) =>
      el("div", `display: flex; flex-direction: column; gap: 12px;`,
        el("h3", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 600; font-size: 20px; color: #333333;`, esc(heading)) +
        paras.map((p) => el("p", `margin-top: 0px; margin-bottom: 0px; ${BODY} font-size: 16px; line-height: 26px;`, esc(p))).join(""))).join("")));

// ---- 3. Gallery (4:37003) — same tiles as the Case Study index ----
const gallery = el("section",
  `padding-top: clamp(24px, 3vw, 40px); padding-bottom: clamp(40px, 5vw, 70px); ${PAD} background-color: #FFFFFF;`,
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

// ---- 4. Results (4:37060) ----
const outcomes = [
  "15% increase in order accuracy in drive-thru operations",
  "Uplift in drive-thru sales",
  "Long-term operational efficiencies and cost savings",
];
const metrics = [["+34%","Increase in peak hour throughput"],["-22%","Reduction in order errors"],["-48s","Shaved off average drive-thru time"],["+15%","Improvement in labor efficiency"]];
const results = el("section",
  `display: flex; flex-direction: column; align-items: center; padding-top: clamp(40px, 5vw, 70px); padding-bottom: clamp(40px, 5vw, 70px); ${PAD} background-color: #FFFFFF;`,
  el("h2", `margin-top: 0px; margin-bottom: 8px; ${H38} text-align: center;`, "Results") +
  el("p", `margin-top: 0px; margin-bottom: 36px; max-width: 700px; font-family: ${FIRA}; font-weight: 600; font-size: clamp(18px, 1.8vw, 22px); line-height: 1.35; color: #333333; text-align: center;`,
    "The implementation of these solutions led to measurable improvements:") +
  el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; width: 100%; max-width: 1300px; margin-bottom: 28px;`,
    outcomes.map((o) =>
      el("div", `display: flex; align-items: center; padding: 24px; border-radius: 10px; background-color: #F9F9F9; font-family: ${FIRA}; font-weight: 300; font-size: 16px; line-height: 24px; color: #464A4B;`, esc(o))).join("")) +
  el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0px; width: 100%; max-width: 1300px; margin-bottom: 28px;`,
    metrics.map(([n,l],i) =>
      el("div", `display: flex; flex-direction: column; gap: 8px; padding-top: 24px; padding-bottom: 24px; padding-left: 28px; padding-right: 28px; ${i?`border-left-width: 1px; border-left-style: solid; border-left-color: #E6E9EE;`:``}`,
        el("span", `font-family: ${FIRA}; font-weight: 600; font-size: clamp(26px, 2.8vw, 34px); color: #333333;`, esc(n)) +
        el("span", `font-family: ${FIRA}; font-weight: 300; font-size: 16px; line-height: 22px; color: #464A4B;`, esc(l)))).join("")) +
  el("p", `margin-top: 0px; margin-bottom: 0px; max-width: 1100px; font-family: ${FIRA}; font-weight: 300; font-size: 14px; line-height: 22px; color: #7A7A7A; text-align: center;`,
    "Integration of indoor and outdoor digital boards with the POS system enabled real-time pricing updates and a national pricing rollout. Simplified content management also allowed McDonald’s to accelerate campaign cycles, contributing to a positive return on sales."));

// ---- 5. Testimonial (4:37101) ----
const testimonial = el("section",
  `display: flex; justify-content: center; padding-top: clamp(24px, 3vw, 40px); padding-bottom: clamp(48px, 6vw, 90px); ${PAD} background-color: #FFFFFF;`,
  el("figure", `display: flex; flex-direction: column; align-items: center; gap: 16px; margin: 0px; width: 100%; max-width: 760px; padding: 40px; border-radius: 20px; background-color: #FFFFFF; border-width: 1px; border-style: solid; border-color: #0F9300;`,
    img(A.avatar, "", `width: 64px; height: 64px; border-radius: 999px; object-fit: cover;`) +
    el("figcaption", `display: flex; flex-direction: column; align-items: center; gap: 2px;`,
      el("span", `font-family: ${FIRA}; font-weight: 600; font-size: 18px; color: #333333;`, "David Park") +
      el("span", `font-family: ${FIRA}; font-weight: 300; font-size: 15px; color: #464A4B;`, "Director of Technology")) +
    el("blockquote", `margin: 0px; font-family: ${FIRA}; font-weight: 300; font-size: 17px; line-height: 28px; color: #464A4B; text-align: center;`,
      "“The visibility Botnizer provides has been transformative. Our franchisees now have real-time data to make decisions, and our corporate team can spot trends before they become problems. It&#39;s become our operational nervous system.”") +
    img(A.stars, "5 out of 5 stars", `width: 110px; height: auto;`)));

// ---- 6. Success Stories (4:37141) — the shared three case cards ----
const stories = el("section",
  `display: flex; flex-direction: column; align-items: center; padding-top: clamp(24px, 3vw, 40px); padding-bottom: 0px; ${PAD} background-color: #FFFFFF;`,
  el("h2", `margin-top: 0px; margin-bottom: 0px; ${H38} text-align: center;`, "Success Stories"));

// ---- 7. Free-trial CTA (4:37117) ----
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

const main = `<ws.element ws:label="Main" ws:tag="main" ws:style={css\`display: flex; flex-direction: column;\`}>${
  L(hero, "Hero")}${
  L(article, "Overview and Objectives")}${
  L(gallery, "Gallery")}${
  L(results, "Results")}${
  L(testimonial, "Testimonial")}${
  L(stories, "Success Stories Heading")}${
  caseStudies}${
  L(trialCta, "Free Trial CTA")}</ws.element>`;
const page = `<ws.element ws:label="Case Study Detail Page" ws:tag="div" ws:style={css\`display: flex; flex-direction: column; font-family: ${FIRA}; color: #333333; background-color: #FFFFFF;\`}>${nav}${main}${footer}</ws.element>`;

fs.mkdirSync(".temp", { recursive: true });
fs.writeFileSync(".temp/fig-case-study-detail.json", JSON.stringify({
  parentInstanceId: "ea7QGk72H4mlward_X4A1",   // /case-studies/detail page root
  fragment: page,
  mode: "replace",
}));
console.log("fragment:", page.length, "chars");
