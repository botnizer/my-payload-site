import fs from "node:fs";
import { nav, footer, caseStudies, mobileNavBehaviour } from "./fig-gen.mjs";
import { withLabel as L , LINK_HOVER, CARD_HOVER, BTN_HOVER} from "./fig-shared.mjs";
const esc=(s)=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\{/g,"&#123;").replace(/\}/g,"&#125;");
const el=(t,s,c="",a="")=>`<ws.element ws:tag="${t}"${a}${s?` ws:style={css\`${s}\`}`:""}>${c}</ws.element>`;
const img=(id,alt,s)=>`<$.Image src={new AssetValue("${id}")} alt="${alt}" ws:style={css\`${s}\`} />`;
const FIRA=`"Fira Sans", system-ui, sans-serif`, POP=`"Poppins", system-ui, sans-serif`;
const PAD=`padding-left: clamp(20px, 4.9vw, 70px); padding-right: clamp(20px, 4.9vw, 70px);`;
const H36=`font-family: ${FIRA}; font-weight: 600; font-size: clamp(26px, 3vw, 36px); letter-spacing: -1px; color: #333333;`;

// 1. Hero
const hero = el("section", `display: flex; flex-direction: column; align-items: center; padding-top: clamp(60px, 8vw, 110px); padding-bottom: clamp(40px, 5vw, 60px); ${PAD} background-color: #FFFFFF;`,
  el("h1", `margin-top: 0px; margin-bottom: 20px; max-width: 900px; font-family: ${POP}; font-weight: 600; font-size: clamp(38px, 6.5vw, 72px); line-height: 1.06; color: #333333; text-align: center;`, "Request a Personalized Platform Demo") +
  el("p", `margin-top: 0px; margin-bottom: 0px; max-width: 760px; font-family: ${POP}; font-weight: 300; font-size: clamp(17px, 1.8vw, 24px); line-height: 1.5; color: #464A4B; text-align: center;`,
    "Our solutions team will show you how Botnizer addresses your specific operational challenges"), ` id="top"`);

// 2. Demo form + what happens next
const field=(label,tag,attrs)=>el("label",`display: flex; flex-direction: column; gap: 8px; font-family: ${POP}; font-weight: 400; font-size: 14px; color: #464A4B;`,
  esc(label)+`<ws.element ws:tag="${tag}"${attrs} ws:style={css\`padding-top: 13px; padding-bottom: 13px; padding-left: 14px; padding-right: 14px; border-radius: 8px; border-width: 1px; border-style: solid; border-color: #E6E9EE; background-color: #FFFFFF; font-family: inherit; font-size: 16px; color: #333333;\`}></ws.element>`);
const nextStep=(strong,rest)=>el("li",`display: flex; gap: 10px; font-family: ${POP}; font-weight: 300; font-size: 16px; line-height: 26px; color: #FFFFFF;`,
  el("span",`color: #15CA01;`,"→")+" "+el("span",`font-weight: 500;`,esc(strong))+" "+esc(rest));
const form = el("section", `display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; align-items: start; padding-top: clamp(20px, 3vw, 40px); padding-bottom: clamp(56px, 7vw, 90px); ${PAD} background-color: #FFFFFF;`,
  el("form", `display: flex; flex-direction: column; gap: 20px;`,
    el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px;`,
      field("Full Name","input",` type="text" name="fullName" required="true"`)+
      field("Email","input",` type="email" name="email" required="true"`)+
      field("Phone","input",` type="tel" name="phone"`)+
      field("Country","input",` type="text" name="country"`)+
      field("Brand","input",` type="text" name="brand"`)+
      field("Number of Locations","input",` type="text" name="locations"`))+
    field("What’s your biggest operational challenge?","input",` type="text" name="challenge"`)+
    field("Tell us more","textarea",` name="message" rows="4"`)+
    el("button", `align-self: flex-start; padding-top: 15px; padding-bottom: 15px; padding-left: 34px; padding-right: 34px; border-radius: 999px; border-width: 0px; background-color: #0F9300; font-family: ${POP}; font-weight: 400; font-size: 18px; color: #FFFFFF; cursor: pointer;${BTN_HOVER}`, "Request a Personalize Demo", ` type="submit"`)+
    el("p", `margin-top: 0px; margin-bottom: 0px; font-family: ${POP}; font-weight: 400; font-size: 14px; color: #464A4B;`, "By submitting, you agree to our privacy policy. No spam, ever.")) +
  el("div", `display: flex; flex-direction: column; gap: 16px; padding: 32px; border-radius: 20px; background-color: #333333;`,
    el("p", `margin-top: 0px; margin-bottom: 8px; font-family: ${POP}; font-weight: 600; font-size: 24px; color: #FFFFFF;`, "What happens next?") +
    el("ul", `display: flex; flex-direction: column; gap: 12px; margin-top: 0px; margin-bottom: 0px; padding-left: 0px; list-style-type: none;`,
      nextStep("Average response:","within 2 hours, with calendar invite")+
      nextStep("Discovery call:","before our call, to tailor the demo")+
      nextStep("SLA:","30-minute priority response for existing customers"))));

// 3. Contact routes
const routeCard=(title,body,cta,note)=>el("article",`display: flex; flex-direction: column; gap: 14px; padding: 32px; border-radius: 20px; background-color: #FFFFFF; border-width: 1px; border-style: solid; border-color: #E6E9EE;${CARD_HOVER}`,
  el("h3",`margin-top: 0px; margin-bottom: 0px; ${H36}`,esc(title))
  + el("p",`margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 300; font-size: 18px; line-height: 28px; color: #464A4B;`,body)
  + (cta?el("a",`align-self: flex-start; padding-top: 12px; padding-bottom: 12px; padding-left: 26px; padding-right: 26px; border-radius: 999px; background-color: #0F9300; font-family: ${FIRA}; font-weight: 400; font-size: 18px; color: #FFFFFF; text-decoration-line: none;${LINK_HOVER}`,esc(cta),` href="#top"`):"")
  + (note?el("p",`margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 300; font-size: 16px; color: #0F9300;`,esc(note)):""));

const inquiryRows = [
  ["Partnership &amp; Integration","Technology partners, POS providers, or integration questions","partnerships@botnizer.com","mailto:partnerships@botnizer.com"],
  ["Press &amp; Media","Interview requests, media inquiries, or press releases","press@botnizer.com","mailto:press@botnizer.com"],
  ["Careers","Join our team building restaurant technology","View Open Positions →","#careers"],
];
const inquiryBlocks = inquiryRows.map(function (row) {
  const h = row[0], b = row[1], l = row[2], href = row[3];
  const inner = el("p",`margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 500; font-size: 18px; color: #333333;`,h)
    + el("p",`margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 300; font-size: 16px; line-height: 24px; color: #464A4B;`,esc(b))
    + el("a",`font-family: ${FIRA}; font-weight: 300; font-size: 18px; color: #224EED; text-decoration-line: none;${LINK_HOVER}`,l,` href="${href}"`);
  return el("div",`display: flex; flex-direction: column; gap: 4px;`,inner);
}).join("");

const inquiriesCard = el("article",`display: flex; flex-direction: column; gap: 18px; padding: 32px; border-radius: 20px; background-color: #FFFFFF; border-width: 1px; border-style: solid; border-color: #E6E9EE;${CARD_HOVER}`,
  el("h3",`margin-top: 0px; margin-bottom: 0px; ${H36}`,"Other Inquiries") + inquiryBlocks);

const routesGrid = el("div",`display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; max-width: 1300px; margin-left: auto; margin-right: auto;`,
  routeCard("Request a Platform Demo","Get expert guidance on unified restaurant technology solutions for leading brands","Request a Demo","Average response: 2 hours")
  + routeCard("Technical Support","Existing customer? Get help with implementation or technical issues","Get Support","SLA: 30-minute priority response")
  + inquiriesCard);

const routes = el("section", `padding-top: clamp(40px, 5vw, 70px); padding-bottom: clamp(56px, 7vw, 90px); ${PAD} background-color: #F9FAFB;`, routesGrid);

// 4. Why partners choose Botnizer
const benefits=[["m8ho1zcsMn0R1uFNlwhxC","Dedicated Account Management","Every enterprise customer gets a dedicated solutions architect and success manager"],
                ["Yb-b0-qX3zq13o6aS0BgN","Enterprise-Grade Security","SOC 2 Type II compliant, GDPR-ready, and enterprise security protocols"],
                ["gweDHGcC76eQ2P9f_I9LA","Proven Implementation","150+ successful deployments with 99.9% platform uptime SLA"],
                ["m6L1Uf9BRAW_dV-QDqBU0","Global Support","Support teams in North America, Europe, and Asia Pacific regions"]];
const stats=[["22%","Average increase in order value with integrated upselling."],["40%","Reduction in service time during peak hours."],["","Unified view of guest lifetime value and preferences."]];
const why = el("section", `padding-top: clamp(56px, 7vw, 90px); padding-bottom: clamp(56px, 7vw, 90px); ${PAD} background-color: #FFFFFF;`,
  el("h2",`margin-top: 0px; margin-bottom: 16px; ${H36}`, "Why Partners Choose " + el("span",`color: #0F9300;`,"Botnizer")) +
  el("p",`margin-top: 0px; margin-bottom: 40px; max-width: 860px; font-family: ${FIRA}; font-weight: 300; font-size: 18px; line-height: 28px; color: #464A4B;`,
    "Built for QSR &amp; Retail Operations. Botnizer is purpose built for the unique demands of quick-service restaurants and retail brands in KSA, Bahrain, and Qatar.")+
  el("div",`display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 40px;`,
    benefits.map(([id,t,b])=>el("article",`display: flex; flex-direction: column; gap: 12px; padding: 28px; border-radius: 20px; background-color: #F9FAFB; border-width: 1px; border-style: solid; border-color: #E6E9EE;${CARD_HOVER}`,
      img(id,esc(t),`width: 36px; height: 36px;`)+
      el("h3",`margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 500; font-size: 20px; color: #333333;`,esc(t))+
      el("p",`margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 300; font-size: 16px; line-height: 24px; color: #464A4B;`,esc(b)))).join(""))+
  el("div",`display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;`,
    stats.map(([n,l])=>el("div",`display: flex; flex-direction: column; gap: 10px; padding: 28px; border-radius: 20px; border-width: 1px; border-style: solid; border-color: #E6E9EE;${CARD_HOVER}`,
      (n?el("div",`font-family: ${FIRA}; font-weight: 700; font-size: 38px; color: #0F9300;`,n):"")+
      el("div",`font-family: ${FIRA}; font-weight: 400; font-size: 18px; line-height: 26px; color: #606060;`,esc(l)))).join("")), ` id="why"`);

// 5. Solution categories
const cats=[["Revenue Driver","#9AF290"],["Efficiency Focus","#809FFC"],["Guest Experience","#B981FF"],["Operations","#FFB772"],["Data Insights","#76EE69"]];
const categories = el("section", `display: flex; flex-direction: column; align-items: center; padding-top: clamp(56px, 7vw, 90px); padding-bottom: clamp(56px, 7vw, 90px); ${PAD} background-color: #333333;`,
  el("h2",`margin-top: 0px; margin-bottom: 12px; font-family: ${FIRA}; font-weight: 600; font-size: clamp(26px, 3vw, 36px); letter-spacing: -1px; color: #FFFFFF; text-align: center;`,"Solution Categories")+
  el("p",`margin-top: 0px; margin-bottom: 36px; font-family: ${FIRA}; font-weight: 300; font-size: 18px; color: rgba(255,255,255,0.75); text-align: center;`,"Each solution is optimized for specific business outcomes")+
  el("div",`display: flex; flex-wrap: wrap; justify-content: center; gap: 14px;`,
    cats.map(([t,c])=>el("span",`display: inline-flex; padding-top: 10px; padding-bottom: 10px; padding-left: 22px; padding-right: 22px; border-radius: 999px; border-width: 1px; border-style: solid; border-color: ${c}; font-family: ${FIRA}; font-weight: 400; font-size: 18px; color: ${c};`,esc(t))).join("")));

// 6. Success stories heading + reused case cards
const stories = el("section", `padding-top: clamp(56px, 7vw, 90px); padding-bottom: 0px; ${PAD} background-color: #FFFFFF;`,
  el("h2",`margin-top: 0px; margin-bottom: 0px; ${H36}`,"Success Stories"));

// 7. Partner CTA
const partnerCta = el("section", `display: flex; flex-direction: column; align-items: center; padding-top: clamp(56px, 7vw, 90px); padding-bottom: clamp(56px, 7vw, 90px); ${PAD} background-color: #F9FAFB;`,
  el("h2",`margin-top: 0px; margin-bottom: 14px; ${H36} text-align: center;`,"Partner with " + el("span",`color: #0F9300;`,"Botnizer"))+
  el("p",`margin-top: 0px; margin-bottom: 28px; font-family: ${FIRA}; font-weight: 300; font-size: 18px; color: #464A4B; text-align: center;`,"See how Botnizer&#39;s unified platform can transform your operations")+
  el("a",`display: inline-flex; padding-top: 15px; padding-bottom: 15px; padding-left: 34px; padding-right: 34px; border-radius: 999px; background-color: #0F9300; font-family: ${FIRA}; font-weight: 400; font-size: 18px; color: #FFFFFF; text-decoration-line: none;${LINK_HOVER}`,"Request a Demo",` href="#top"`), ` id="contact"`);

const main=`<ws.element ws:label="Main" ws:tag="main" ws:style={css\`display: flex; flex-direction: column;\`}>${
  L(hero, "Hero")}${
  L(form, "Contact Form")}${
  L(routes, "Contact Routes")}${
  L(why, "Why Partner With Us")}${
  L(categories, "Solution Categories")}${
  L(stories, "Success Stories Heading")}${
  caseStudies}${
  L(partnerCta, "Partner CTA")}</ws.element>`;
const page=`<ws.element ws:label="Contact Page" ws:tag="div" ws:style={css\`display: flex; flex-direction: column; font-family: ${FIRA}; color: #333333; background-color: #FFFFFF;\`}>${mobileNavBehaviour}${nav}${main}${footer}</ws.element>`;
fs.writeFileSync(".temp/fig-contact.json", JSON.stringify({parentInstanceId:"jgMB3UgyIKyr-2P6vVmPR", fragment:page, mode:"replace"}));
console.log("fragment:", page.length, "chars");
