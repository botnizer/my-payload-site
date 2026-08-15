// About us page — Figma YcekX1kGhoti7ssk1sOlnr node 4:37370 (Set B, 1440x7744)
// Reuses nav / trust / footer from fig-gen.mjs and helpers from fig-shared.mjs.
import fs from "node:fs";
import { nav, footer, trust, mobileNavBehaviour } from "./fig-gen.mjs";
import { esc, el, img, FIRA, POP, PAD, H38, BODY, PILL, withLabel as L } from "./fig-shared.mjs";

const A = {
  hero:     "T-M5YIBuHiHxq5RocTERN",  // ab-hero.jpg    (4:36359 restaurant interior + kiosk)
  video:    "88a4k9UHQFpXCkayPhzEe",  // ab-video.jpg   (4:36358 street poster pair)
  cube:     "xFjE9IA-umuTKPdbQDZ8y",  // ab-cube.jpg    (4:36383 Our Vision)
  mcd:      "C3yo2-M6KvBqEBUcaFaii",  // ab-mcd.jpg     (4:36384 Our Mission)
  portrait: "TjqJ5Ap07B26m4CWQQw2v",  // ab-portrait.jpg (4307 CEO)
  play:     "SZJzBSh1ZRYcREA9JqP_7",  // ab-play.svg
  purpose:  "1gCL0Vqf-3PXIYVgHOTpG",  // fig-drive-thru — byte-identical to the design's Our Purpose image
  cta:      "tVsZYXDb4IVEZyxl5xf87",  // ds-cta.png — same mockup as the Digital Signage CTA
};

const LABEL = `font-family: ${FIRA}; font-weight: 300; font-size: 18px; line-height: 28px; letter-spacing: 0.36px; color: #464A4B;`;

// ---- 1. Hero (4:28714) ----
const hero = el("section",
  `display: flex; flex-direction: column; align-items: center; padding-top: clamp(110px, 12vw, 160px); padding-bottom: clamp(40px, 5vw, 70px); ${PAD} background-color: #FFFFFF;`,
  el("p", `margin-top: 0px; margin-bottom: 12px; ${LABEL} text-align: center;`, "About us") +
  el("h1", `margin-top: 0px; margin-bottom: 48px; max-width: 900px; font-family: ${FIRA}; font-weight: 600; font-size: clamp(28px, 3.2vw, 38px); line-height: 1.21; color: #333333; text-align: center;`,
    "We Power Seamless Digital Experiences Across Millions of Interactions Daily") +
  el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 48px; align-items: center; width: 100%; max-width: 1300px;`,
    el("div", `display: flex; flex-direction: column; gap: 20px;`,
      [
        "At Botnizer, we turn digital touchpoints into seamless experiences through a deep understanding of customer behavior.",
        "We bring together brands and audiences across the QSR and retail landscape, creating connected journeys that drive engagement, efficiency, and loyalty.",
        "We define ourselves by transforming everyday interactions—like drive-thru orders, self-serve kiosks, and digital menu boards—into meaningful, high-value experiences. Every screen, every prompt, every moment is designed to enhance the customer journey and leave a lasting impression.",
      ].map((p) => el("p", `margin-top: 0px; margin-bottom: 0px; ${BODY}`, esc(p))).join("") +
      el("p", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 500; font-size: 18px; line-height: 28px; color: #333333;`, "We call it The Art of Outdoor.")) +
    img(A.hero, "Self-ordering kiosk beside the counter in a cafe",
        `width: 100%; height: auto; border-radius: 10px;`)), ` id="top"`);

// ---- 2. The Art of Connection band (4:28762) ----
// The design shows a video player; there is no playable source in the file, so
// this is the poster frame with the play glyph as a static overlay.
const connection = el("section",
  `display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: clamp(28px, 4vw, 56px); align-items: center; padding-top: clamp(48px, 6vw, 80px); padding-bottom: clamp(48px, 6vw, 80px); ${PAD} background-color: #2A2B3A;`,
  el("div", `position: relative; display: flex; align-items: center; justify-content: center;`,
    img(A.video, "Digital out-of-home posters on a city street",
        `width: 100%; height: auto; border-radius: 10px;`) +
    el("div", `position: absolute; display: flex; align-items: center; justify-content: center; width: 64px; height: 64px; border-radius: 999px; background-color: rgba(255,255,255,0.9);`,
      img(A.play, "Play", `width: 22px; height: 26px;`))) +
  el("div", `display: flex; flex-direction: column; gap: 20px;`,
    el("p", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 300; font-size: 18px; line-height: 28px; letter-spacing: 0.36px; color: #FFFFFF;`,
      "The Art of Connection is a single-minded focus on seamless customer journeys and impactful touchpoints, powered by technology, data, and human insight. These are the elements that define our values and our commitment to the brands and audiences we serve.") +
    el("p", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 500; font-size: 18px; line-height: 28px; color: #FFFFFF;`,
      "This is how we turn interactions into experiences.")));

// ---- 3-5. Purpose / Vision / Mission (4:28800, 4:28821, 4:28842) ----
const pillars = [
  ["Our Purpose","Customer Centric Solutions that Deliver",
   "We are committed to delivering exceptional quality and service to every client. By taking a customer-centric approach, we work closely with businesses to understand their unique needs and challenges, allowing us to create customized solutions that achieve tangible results.",
   A.purpose, "Outdoor digital menu board and speaker post", "#EDEDED", "contain"],
  ["Our Vision","Shaping the Future of Digital Experiences",
   "To be the leading partner for QSR and retail brands in the region, enabling them to stay ahead of the curve through innovative digital solutions, seamless customer experiences, and strategic marketing insights.",
   A.cube, "Abstract cube illustration representing modular platform architecture", "#F5F5F5", "contain"],
  ["Our Mission","Empowering Brands, Enhancing Journeys",
   "To empower businesses to transform customer interactions into meaningful experiences by leveraging cutting-edge technology, data-driven strategies, and a team of skilled experts. From enhancing drive-thru journeys to implementing kiosks and digital signage, we strive to help brands achieve their goals and maintain a competitive edge.",
   A.mcd, "McDonald's restaurant exterior lit up at night", "#FFFFFF", "cover"],
];
const pillarSectionsRaw = pillars.map(([label, title, body, asset, alt, bg, fit], i) =>
  el("section", `display: flex; flex-direction: column; gap: 32px; padding-top: clamp(40px, 5vw, 70px); padding-bottom: clamp(40px, 5vw, 70px); ${PAD} background-color: #FFFFFF;`,
    el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; align-items: start; width: 100%; max-width: 1300px; margin-left: auto; margin-right: auto;`,
      el("div", `display: flex; flex-direction: column; gap: 4px;${i===1?` order: 2;`:``}`,
        el("p", `margin-top: 0px; margin-bottom: 0px; ${LABEL}`, esc(label)) +
        el("h2", `margin-top: 0px; margin-bottom: 0px; ${H38}`, esc(title))) +
      el("p", `margin-top: 0px; margin-bottom: 0px; ${BODY}${i===1?` order: 1;`:``}`, esc(body))) +
    el("div", `display: flex; align-items: center; justify-content: center; width: 100%; max-width: 1300px; margin-left: auto; margin-right: auto; border-radius: 10px; background-color: ${bg}; overflow: hidden;`,
      img(asset, esc(alt), `width: 100%; height: auto; max-height: 560px; object-fit: ${fit};`))));
// "Our Purpose" / "Our Vision" / "Our Mission" — the eyebrow label names the section.
const pillarSections = pillarSectionsRaw.map((section, i) => L(section, pillars[i][0])).join("");

// ---- 6. Our Impact (4:28863) ----
const impact = [["40","Avg. Efficiency Gain"],["98.2","Client Satisfaction"],["28","Avg. Error Reduction"],["99.9","System Uptime"]];
const impactSection = el("section",
  `display: flex; flex-direction: column; align-items: center; padding-top: clamp(48px, 6vw, 90px); padding-bottom: clamp(48px, 6vw, 90px); ${PAD} background-color: #FFFFFF;`,
  el("h2", `margin-top: 0px; margin-bottom: 10px; ${H38} text-align: center;`, "Our Impact") +
  el("p", `margin-top: 0px; margin-bottom: 40px; max-width: 720px; ${BODY} text-align: center;`,
    "The numbers tell our story helping restaurants achieve measurable results.") +
  el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; width: 100%; max-width: 1300px;`,
    impact.map(([n,l]) =>
      el("div", `display: flex; flex-direction: column; gap: 10px; padding-top: 30px; padding-bottom: 30px; padding-left: 24px; padding-right: 24px; border-radius: 10px; border-width: 1px; border-style: solid; border-color: #E6E9EE;`,
        el("span", `font-family: ${FIRA}; font-weight: 600; font-size: clamp(28px, 3vw, 38px); color: #333333;`, esc(n)) +
        el("span", `font-family: ${FIRA}; font-weight: 300; font-size: 18px; color: #464A4B;`, esc(l)))).join("")));

// ---- 7. Hear from Our CEO (4:28929) ----
const ceo = el("section",
  `display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 48px; align-items: center; padding-top: clamp(40px, 5vw, 70px); padding-bottom: clamp(48px, 6vw, 90px); ${PAD} background-color: #FFFFFF;`,
  el("div", `display: flex; flex-direction: column; gap: 20px;`,
    el("h2", `margin-top: 0px; margin-bottom: 0px; ${H38}`, "Hear from Our CEO") +
    el("p", `margin-top: 0px; margin-bottom: 0px; ${BODY}`,
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")) +
  img(A.portrait, "Portrait of the Botnizer CEO",
      `width: 100%; height: auto; max-width: 520px; justify-self: center; border-radius: 15.421px; object-fit: cover;`));

// ---- 9. Free-trial CTA (4:29010 — same component as the Digital Signage page) ----
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
  L(connection, "The Art of Connection")}${
  pillarSections}${
  L(impactSection, "Our Impact")}${
  L(ceo, "Hear from Our CEO")}${
  trust}${
  L(trialCta, "Free Trial CTA")}</ws.element>`;
const page = `<ws.element ws:label="About Page" ws:tag="div" ws:style={css\`display: flex; flex-direction: column; font-family: ${FIRA}; color: #333333; background-color: #FFFFFF;\`}>${mobileNavBehaviour}${nav}${main}${footer}</ws.element>`;

fs.mkdirSync(".temp", { recursive: true });
fs.writeFileSync(".temp/fig-about.json", JSON.stringify({
  parentInstanceId: "pym2TcUsw3nospq1eInI1",   // /about page root
  fragment: page,
  mode: "replace",
}));
console.log("fragment:", page.length, "chars");
