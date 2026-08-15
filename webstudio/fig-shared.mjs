// Fragments shared by more than one Figma page build.
//
// The nav / footer / offering / caseStudies fragments live in fig-gen.mjs (a copy
// of build-figma-home.mjs). This module holds the pieces that first appeared on a
// later page and are reused since: the JSX helpers, the gradient icon card, the
// dark CTA form band (4:36112 / 4:36834) and the ROI calculator (4:36698 / 4:36479).

// Navigator labels. Without a ws:label every instance shows as "Div"/"Section"
// in the Webstudio navigator, which makes a 40-section page impossible to work
// in by hand. ws:label is understood by the fragment parser, so applying labels
// here means they survive every rebuild instead of being re-applied one call at
// a time in the builder.
export const withLabel = (jsx, label) => jsx.replace("<ws.element", `<ws.element ws:label="${label}"`);

export const esc = (s) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\{/g,"&#123;").replace(/\}/g,"&#125;");
export const el = (t,s,c="",a="") => `<ws.element ws:tag="${t}"${a}${s?` ws:style={css\`${s}\`}`:""}>${c}</ws.element>`;
export const img = (id,alt,s) => `<$.Image src={new AssetValue("${id}")} alt="${alt}" ws:style={css\`${s}\`} />`;

export const FIRA = `"Fira Sans", system-ui, sans-serif`;
export const POP  = `"Poppins", system-ui, sans-serif`;
export const PAD  = `padding-left: clamp(20px, 4.9vw, 70px); padding-right: clamp(20px, 4.9vw, 70px);`;
export const H38  = `font-family: ${FIRA}; font-weight: 600; font-size: clamp(28px, 3.2vw, 38px); line-height: 1.21; color: #333333;`;
export const H36C = `font-family: ${FIRA}; font-weight: 600; font-size: clamp(26px, 3vw, 36px); letter-spacing: -1px; color: #333333; text-align: center;`;
export const BODY = `font-family: ${FIRA}; font-weight: 300; font-size: 18px; line-height: 28px; letter-spacing: 0.36px; color: #464A4B;`;
export const PILL = `display: inline-flex; align-items: center; justify-content: center; padding-top: 12px; padding-bottom: 12px; padding-left: 28px; padding-right: 28px; border-radius: 999px; background-image: linear-gradient(-11.45deg, #0A6500 0%, #63DE55 100%); font-family: ${POP}; font-weight: 400; font-size: 16px; color: #FFFFFF; text-decoration-line: none; white-space: nowrap;`;

// 40px gradient chip with a 21.333px leaf — 4:28119 / 4:27627
export const chip = (assetId, label) =>
  el("div", `display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; flex-shrink: 0; border-radius: 7.217px; background-image: linear-gradient(-45deg, #0A6500 0%, #63DE55 100%);`,
    img(assetId, label, `width: 21.333px; height: 21.333px;`));

export const iconCard = (assetId, title, body) =>
  el("article", `display: flex; flex-direction: column; gap: 24px; padding-top: 30px; padding-bottom: 30px; padding-left: 20px; padding-right: 20px; border-radius: 20px; background-color: #FFFFFF; border-width: 1px; border-style: solid; border-color: #E6E9EE;`,
    el("div", `display: flex; align-items: center; gap: 18px;`,
      chip(assetId, esc(title)) +
      el("h3", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 600; font-size: 20px; line-height: 26px; color: #262626;`, esc(title))) +
    el("p", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 400; font-size: 18px; line-height: 1.35; color: #606060;`, esc(body)));

// ---- Dark CTA band with the demo form (4:36112 / 4:36834) ----
const fieldStyle = `padding-top: 13px; padding-bottom: 13px; padding-left: 12px; padding-right: 12px; border-radius: 8px; border-width: 1px; border-style: solid; border-color: #E6E9EE; background-color: #F9F9F9; font-family: ${POP}; font-size: 16px; color: #333333; width: 100%;`;
const field = (label, tag, attrs) => el("label",
  `display: flex; flex-direction: column; gap: 8px; font-family: ${POP}; font-weight: 400; font-size: 14px; color: #464A4B;`,
  esc(label) + `<ws.element ws:tag="${tag}"${attrs} ws:style={css\`${fieldStyle}\`}></ws.element>`);

// The shared footer owns id="contact", so this band anchors as #get-in-touch.
const ctaFormRaw = el("section",
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

// ---- ROI calculator (4:36698 on Drive-Thru, 4:36479 + 4:36555 on Digital Signage) ----
// Static: the design's Totals panel recomputes live from the inputs. Wiring that
// needs Webstudio variables + expressions, so the design's own figures are shown.
const roiStats = [["22%","Average AOV Increase"],["8.2 mo","Average Payback Period"],["65%","Faster Menu Updates"],["300+","Restaurant Deployments"]];
const calcField = (label, tag, attrs, placeholder) => el("label",
  `display: flex; flex-direction: column; gap: 8px; font-family: ${POP}; font-weight: 400; font-size: 14px; color: #464A4B;`,
  esc(label) + `<ws.element ws:tag="${tag}"${attrs}${placeholder?` placeholder="${placeholder}"`:``} ws:style={css\`padding-top: 12px; padding-bottom: 12px; padding-left: 14px; padding-right: 14px; border-radius: 8px; border-width: 1px; border-style: solid; border-color: #E6E9EE; background-color: #FFFFFF; font-family: ${POP}; font-size: 15px; color: #333333; width: 100%;\`}></ws.element>`);
const total = (label, value, primary) => el("div",
  `display: flex; flex-direction: column; align-items: center; gap: 6px; padding-top: 18px; padding-bottom: 18px; padding-left: 16px; padding-right: 16px; border-radius: 12px; ${primary?`background-image: linear-gradient(180deg, #63DE55 0%, #0A6500 100%);`:`background-color: #FFFFFF; border-width: 1px; border-style: solid; border-color: #E6E9EE;`}`,
  el("span", `font-family: ${POP}; font-weight: 600; font-size: 14px; color: ${primary?"#FFFFFF":"#333333"}; text-align: center;`, esc(label)) +
  el("span", `font-family: ${POP}; font-weight: 700; font-size: ${primary?"20px":"22px"}; color: ${primary?"#FFFFFF":"#333333"};`, esc(value)));

const roiCalculatorRaw = (heading, intro) => el("section",
  `display: flex; flex-direction: column; align-items: center; padding-top: clamp(48px, 6vw, 90px); padding-bottom: clamp(48px, 6vw, 90px); ${PAD} background-color: #FCFCFC;`,
  el("h2", `margin-top: 0px; margin-bottom: 12px; ${H36C}`, esc(heading)) +
  el("p", `margin-top: 0px; margin-bottom: 40px; max-width: 800px; ${BODY} letter-spacing: normal; text-align: center;`, esc(intro)) +
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

// ---- Navigator labels for the shared fragments ----
export const ctaForm = withLabel(ctaFormRaw, "Get in Touch CTA");
export const roiCalculator = (heading, intro) => withLabel(roiCalculatorRaw(heading, intro), "ROI Calculator");
