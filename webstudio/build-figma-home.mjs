import fs from "node:fs";
const esc = (s) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\{/g,"&#123;").replace(/\}/g,"&#125;");
const el = (tag, style, children="", attrs="") =>
  `<ws.element ws:tag="${tag}"${attrs}${style?` ws:style={css\`${style}\`}`:""}>${children}</ws.element>`;
const img = (id, alt, style) => `<$.Image src={new AssetValue("${id}")} alt="${alt}" ws:style={css\`${style}\`} />`;

export const A = {
  logo:"MHl5eeuro1yEUQtJTgxih", chevron:"uFCL0Fer2nIGAImDGeCMJ", heroBg:"0QYmIAiZpOfP4LCcw6xlj",
  partners:["jDt0P1zsCh9SpgwipOWF5","0Bne6aa_sE-8u9ZVDRcBr","W9IWSgCumKbPcF_hqRh4X","j1quaRWUuRR3wch-a-Mw5",
            "3SJVFV8CayD5E2Fzp2KPE","xqZCG2U7kGzhfN2wHKLiz","R3YOsKSyz9p7FHKJ_rJZD","8x8esDbdNLZAJ3Bn66z6c",
            "LECaP8zRtWyY0R5nF7c08","Uy8Xa0ymB-mNheS0DN6V3","aFS9JiK3mhvSgR37Ct_N4","etrjf9rVCg8RgxlG6vLxl"],
};
const FIRA = `"Fira Sans", system-ui, sans-serif`;

// ---- Nav Bar (65:49368) + "What we do" dropdown panel (0:26 / 0:27) ----
//
// Site routes, in one place so the nav dropdown and the footer cannot drift.
// Self-Ordering Kiosk, NFC Google Review Cards and Digital Menu Board have no
// page of their own; they exist only as cards in the Solutions offering grid,
// so they deep-link there.
export const ROUTES = {
  home: "/", solutions: "/solutions", driveThru: "/drive-thru",
  signage: "/digital-signage", about: "/about", cases: "/case-studies",
  caseDetail: "/case-studies/detail", contact: "/contact",
  offering: "/solutions#solutions",
};
export const EXPERIENCE_LINKS = [["Drive-Thru", ROUTES.driveThru]];
export const PRODUCT_LINKS = [
  ["Digital Signage", ROUTES.signage],
  ["Self-Ordering Kiosk", ROUTES.offering],
  ["NFC Google Review Cards", ROUTES.offering],
  ["Digital Menu Board", ROUTES.signage],
  ["Drive-Thru Audio System", ROUTES.driveThru],
];
export const COMPANY_LINKS = [
  ["About", ROUTES.about], ["Solutions", ROUTES.solutions], ["Case Study", ROUTES.cases],
];

const navLinks = [[ROUTES.solutions,"Solutions"],[ROUTES.about,"About"],[ROUTES.cases,"Case Study"],[ROUTES.contact,"Contact"]];
const navLinkStyle = `font-family: ${FIRA}; font-weight: 300; font-size: clamp(15px, 1.4vw, 20px); color: #FFFFFF; text-decoration-line: none; padding-top: 10px; padding-bottom: 10px; white-space: nowrap; transition-property: color; transition-duration: 160ms; transition-timing-function: ease; &:hover { color: #13C000; }`;

// Panel column. Mirrors the footer's fcol so the two stay visually consistent.
const panelCol = (heading, links) =>
  el("div", `display: flex; flex-direction: column; gap: 14px;`,
    el("p", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 500; font-size: 15px; letter-spacing: 0.5px; text-transform: uppercase; color: #9C9C9C;`, esc(heading)) +
    el("div", `display: flex; flex-direction: column; gap: 4px;`,
      links.map(([label, href]) => el("a",
        `font-family: ${FIRA}; font-weight: 300; font-size: 18px; line-height: 26px; color: #333333; text-decoration-line: none; padding-top: 4px; padding-bottom: 4px;`,
        esc(label), ` href="${href}"`)).join("")));

// Webstudio's css template supports self-states (:hover / :focus-within) but not
// descendant combinators, so the panel cannot be toggled with `&:hover .panel`.
// It does keep custom properties, including per-state values, and vars resolve
// inside functions — so the trigger's :hover flips a set of variables that the
// panel reads. That is what makes the reveal animatable rather than a hard
// on/off. :focus-within mirrors :hover so the menu opens for keyboard users too.
const megaPanel = el("div",
  // Open/close is driven entirely by custom properties set on the trigger and
  // inherited down here. The trigger keeps its own visibility (and so stays
  // hit-testable, including the padding that bridges the pointer down from the
  // link); only the panel reacts. Transitioning visibility alongside opacity
  // keeps the close animated instead of snapping.
  //
  // Spans the full page width. The trigger is deliberately NOT positioned, so the
  // nearest positioned ancestor is the sticky header — left/right 0 then resolve
  // against the header's padding box, i.e. edge to edge, and top:100% lands flush
  // under it. Custom properties still reach here because they inherit through the
  // DOM regardless of what the panel is positioned against.
  `position: absolute; top: 100%; left: 0px; right: 0px; z-index: 60; padding-top: 34px; padding-bottom: 34px; padding-left: clamp(20px, 4.9vw, 70px); padding-right: clamp(20px, 4.9vw, 70px); background-color: #FFFFFF; box-shadow: 0px 18px 50px 0px rgba(0,0,0,0.22); visibility: var(--menu-vis); opacity: var(--menu-open); transform: translateY(var(--menu-y)); transition-property: opacity, transform, visibility; transition-duration: 220ms, 220ms, 0ms; transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1); transition-delay: 0ms, 0ms, var(--menu-delay);`,
  el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; width: 100%; max-width: 1300px; margin-left: auto; margin-right: auto;`,
    panelCol("Experience", EXPERIENCE_LINKS) +
    panelCol("Products", PRODUCT_LINKS) +
    el("div", `display: flex; flex-direction: column; gap: 14px; padding: 24px; border-radius: 10px; background-color: #F3F3F3;`,
      el("p", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 500; font-size: 20px; color: #333333;`, "Let&#39;s Get Started!") +
      el("p", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 300; font-size: 17px; line-height: 25px; color: #333333;`, "We&#39;re here to listen and assist.") +
      el("a", `align-self: flex-start; display: inline-flex; padding-top: 10px; padding-bottom: 10px; padding-left: 22px; padding-right: 22px; border-radius: 999px; background-color: #0F9300; font-family: ${FIRA}; font-weight: 400; font-size: 16px; color: #FFFFFF; text-decoration-line: none;`,
        "Contact us today", ` href="${ROUTES.contact}"`))));

const whatWeDo = el("div",
  // Not position: relative — see megaPanel. padding-bottom stretches the hover
  // target down to the header's bottom edge (25px header padding + 1px border)
  // so there is no gap to fall through; the negative margin keeps that padding
  // from growing the nav row. The 26px is independent of the row height:
  // panel top = trigger top (25) + row + padding, header bottom = row + 51.
  //
  // --menu-delay holds visibility on for the length of the fade when closing,
  // and drops to 0 when opening so the panel appears at once and then eases in.
  `display: flex; align-items: center; padding-bottom: 26px; margin-bottom: -26px; --menu-open: 0; --menu-y: -10px; --menu-vis: hidden; --menu-delay: 220ms; &:hover { --menu-open: 1; --menu-y: 0px; --menu-vis: visible; --menu-delay: 0ms; } &:focus-within { --menu-open: 1; --menu-y: 0px; --menu-vis: visible; --menu-delay: 0ms; }`,
  el("a", navLinkStyle, "What we do", ` href="${ROUTES.solutions}"`) +
  megaPanel);

// justify-content is flex-start, not space-between: the menu sits beside the
// logo rather than being pushed to the far right of the bar.
export const nav = el("header",
  // Black gloss, not grey haze.
  //
  // A flat rgba(0,0,0,0.55) sheet over bright footage averages out to grey: it
  // veils the video instead of tinting it. Three things fix that, and all three
  // matter — the gradient gives the glass depth (deepest at the top edge where
  // it meets the viewport, easing off toward the rule), `saturate` lets the
  // footage's colour survive the tint rather than washing to neutral, and the
  // inset top highlight plus drop shadow give it a lit edge and lift it off the
  // page. Net effect is darker than before, not lighter, which also improves
  // contrast for the white links over the white sections on the other pages —
  // this header is shared, so it has to hold up on both.
  `position: sticky; top: 0px; z-index: 50; display: flex; align-items: center; justify-content: flex-start; gap: clamp(20px, 4vw, 56px); padding-top: 25px; padding-bottom: 25px; padding-left: clamp(20px, 4.9vw, 70px); padding-right: clamp(20px, 4.9vw, 70px); background-color: rgba(0,0,0,0.58); background-image: linear-gradient(180deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.66) 55%, rgba(0,0,0,0.54) 100%); backdrop-filter: blur(20px) saturate(170%); box-shadow: inset 0px 1px 0px 0px rgba(255,255,255,0.12), 0px 10px 30px 0px rgba(0,0,0,0.28); border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: #13C000;`,
  el("a", `display: flex; align-items: center; gap: 5px; text-decoration-line: none; flex-shrink: 0;`,
     img(A.logo, "Botnizer", `height: 34px; width: auto;`), ` href="${ROUTES.home}"`) +
  el("nav", `display: flex; flex-wrap: wrap; align-items: center; gap: 30px;`,
     whatWeDo +
     navLinks.map(([h,t]) => el("a", navLinkStyle, esc(t), ` href="${h}"`)).join("")),
  // Hook for the scroll behaviour below. Harmless on the pages that do not
  // opt in — it is only an attribute until some CSS targets it.
  ` data-nav="main"`);

// ---- Scroll-aware nav (home page only) ----
//
// The nav starts fully transparent over the hero video and fades into black
// glass once the page scrolls. Webstudio's `css` template cannot express this:
// it has no descendant selectors and no @keyframes, and the state depends on
// scroll position rather than on any CSS state of the element itself. So the
// rules go in via an HtmlEmbed, which renders raw HTML.
//
// This is opt-in per page for a reason. The bar is shared, and the other pages
// open on white sections — a transparent nav there would leave white links on
// white. Only the home page, whose hero is dark video, includes these.
//
// Two embeds, deliberately: the <style> is server-rendered so the nav is
// already transparent on first paint, while the <script> is clientOnly because
// that is what Webstudio requires for scripts that touch the DOM. Splitting
// them avoids a flash of the solid bar before hydration.
const NAV_SCROLL_CSS =
  `<style>` +
  // position:fixed is the part that makes "transparent" mean anything. The
  // header is a sibling *before* <main> and sticky keeps it in normal flow, so
  // it sits above the hero rather than over it — a transparent bar there just
  // reveals the white page wrapper behind it. Going fixed takes it out of flow,
  // so the 100vh hero starts at y=0 and runs underneath the bar, which is what
  // gives it the video to be transparent against. Home only: the sticky
  // in-flow bar is correct on every other page.
  `header[data-nav='main']{position:fixed!important;top:0!important;left:0!important;right:0!important;` +
  `background-color:rgba(0,0,0,0)!important;background-image:none!important;` +
  `backdrop-filter:none!important;box-shadow:none!important;border-bottom-color:rgba(19,192,0,0)!important;` +
  `transition:background-color .3s ease,backdrop-filter .3s ease,box-shadow .3s ease,border-bottom-color .3s ease}` +
  `header[data-nav='main'][data-scrolled='1']{background-color:rgba(0,0,0,0.72)!important;` +
  `backdrop-filter:blur(20px) saturate(170%)!important;box-shadow:0 10px 30px rgba(0,0,0,.28)!important;` +
  `border-bottom-color:rgba(19,192,0,1)!important}` +
  `@media (prefers-reduced-motion:reduce){header[data-nav='main']{transition:none}}` +
  `</style>`;

// Single quotes throughout so the whole thing survives being JSON-encoded into
// the JSX `code` prop. Threshold is 80px — roughly the bar's own height.
const NAV_SCROLL_JS =
  `<script>(function(){var n=document.querySelector('header[data-nav]');if(!n){return;}` +
  `var s=function(){n.setAttribute('data-scrolled',window.scrollY>80?'1':'0');};` +
  `s();window.addEventListener('scroll',s,{passive:true});})();</script>`;

export const navScrollBehaviour =
  `<$.HtmlEmbed code={${JSON.stringify(NAV_SCROLL_CSS)}} />` +
  `<$.HtmlEmbed clientOnly={true} code={${JSON.stringify(NAV_SCROLL_JS)}} />`;

// ---- Home hero background media ----
//
// Acrelec drive-thru product-line teaser, 2.8 MB. Set to null to fall back to
// the still image; the slot is the same either way.
//
// This lives INSIDE the hero section, absolutely positioned and clipped by the
// hero's overflow, so it cannot reach any other part of the page. An earlier
// version used a viewport-fixed layer at z-index -1 behind the whole document;
// that relied on every following section painting an opaque background over it,
// which is fragile and showed through at the foot of the page.
//
// The boolean props must use React's camelCase spellings and be written as
// {true}, not "true": as strings they store as type "string", `muted` never
// reaches the DOM property, and the browser then blocks autoplay.
export const HERO_VIDEO = "rVCSVikBmzJjovMSU9AY4";

// No poster. A poster of the old hero photo flashed a completely different
// image for about a second on every load before the first video frame painted.
// With none, the hero's own #1A1A1A shows for that moment, which is close to
// the scrimmed video and reads as the video simply fading up.
const heroMediaStyle = `position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; object-fit: cover; z-index: 0;`;
const heroMedia = HERO_VIDEO
  ? `<ws.element ws:tag="video" src={new AssetValue("${HERO_VIDEO}")} autoPlay={true} muted={true} loop={true} playsInline={true} preload="auto" aria-hidden="true" tabIndex="-1" ws:style={css\`${heroMediaStyle}\`}></ws.element>`
  : img(A.heroBg, "", heroMediaStyle);

// ---- Home Hero (65:49366) ----
// Self-contained: the video, the scrim and the copy all live in here, and the
// section clips its own overflow, so the background media is confined to the
// top of the page. Layers are video (0) → scrim and bottom fade (1) → copy (2).
export const hero = el("section",
  `position: relative; display: flex; flex-direction: column; justify-content: flex-end; min-height: 100vh; overflow: hidden; background-color: #1A1A1A;`,
  heroMedia +
  // Scrim: darkest at the top (behind the translucent nav) and at the bottom
  // (behind the copy), lightest through the middle so the footage still reads.
  el("div", `position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 1; background-image: linear-gradient(180deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.18) 32%, rgba(0,0,0,0.30) 62%, rgba(0,0,0,0.78) 100%);`) +
  // Bottom fade into the white section that follows.
  el("div", `position: absolute; bottom: 0px; left: 0px; width: 100%; height: 160px; z-index: 1; background-image: linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 100%);`) +
  el("div", `position: relative; z-index: 2; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); align-items: end; gap: clamp(28px, 3vw, 48px); margin-top: auto; margin-left: auto; margin-right: auto; margin-bottom: clamp(90px, 12vh, 150px); width: calc(100% - clamp(40px, 9.8vw, 140px)); max-width: 1300px; padding-top: clamp(28px, 3.2vw, 44px); padding-bottom: clamp(28px, 3.2vw, 44px); padding-left: clamp(24px, 3.5vw, 48px); padding-right: clamp(24px, 3.5vw, 48px); border-radius: 20px; background-color: rgba(12,12,12,0.34); backdrop-filter: blur(14px); border-width: 1px; border-style: solid; border-color: rgba(255,255,255,0.16); box-shadow: 0px 24px 70px 0px rgba(0,0,0,0.35);`,
    el("div", `display: flex; flex-direction: column;`,
      el("h1", `margin-top: 0px; margin-bottom: 10px; font-family: ${FIRA}; font-weight: 700; font-size: clamp(32px, 4.6vw, 68px); line-height: 1.02; letter-spacing: -1.5px; color: #FFFFFF; text-shadow: 0px 2px 18px rgba(0,0,0,0.45);`, "Restaurant Technology") +
      el("div", `font-family: ${FIRA}; font-weight: 400; font-size: clamp(19px, 2.5vw, 34px); line-height: 1.15; letter-spacing: -0.6px; color: #15CA01; text-shadow: 0px 2px 14px rgba(0,0,0,0.4);`, "Designed for Leading Brands")) +
    el("div", `display: flex; flex-direction: column; align-items: flex-start; gap: clamp(20px, 2.2vw, 30px);`,
      el("p", `margin-top: 0px; margin-bottom: 0px; max-width: 560px; font-family: ${FIRA}; font-weight: 300; font-size: clamp(15px, 1.25vw, 19px); line-height: 1.55; color: rgba(255,255,255,0.92);`,
         "An API-first platform that unifies digital signage, self ordering kiosks, drive-thru systems, and checkout solutions into one seamless ecosystem.") +
      el("a", `display: inline-flex; align-items: center; justify-content: center; padding-top: 15px; padding-bottom: 15px; padding-left: 34px; padding-right: 34px; border-radius: 999px; background-color: #FFFFFF; color: #333333; font-family: ${FIRA}; font-weight: 600; font-size: clamp(15px, 1.2vw, 18px); letter-spacing: -0.4px; text-decoration-line: none; white-space: nowrap; transition-property: background-color, color, transform; transition-duration: 180ms; transition-timing-function: ease; &:hover { background-color: #0F9300; color: #FFFFFF; transform: translateY(-2px); }`,
         "Request a Demo", ` href="${ROUTES.contact}"`))), ` id="top"`);

// ---- Trust Bar (65:49356) ----
export const trust = el("section",
  `display: flex; flex-direction: column; align-items: center; padding-top: clamp(56px, 7vw, 100px); padding-bottom: clamp(56px, 7vw, 100px); padding-left: clamp(20px, 4.9vw, 70px); padding-right: clamp(20px, 4.9vw, 70px); background-color: #FFFFFF;`,
  el("p", `margin-top: 0px; margin-bottom: 10px; font-family: ${FIRA}; font-weight: 300; font-size: 18px; color: #333333; text-align: center;`, "Trusted by") +
  el("p", `margin-top: 0px; margin-bottom: 48px; font-family: ${FIRA}; font-weight: 600; font-size: clamp(26px, 3vw, 36px); letter-spacing: -1px; color: #333333; text-align: center;`, "100+ Businesses") +
  el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); align-items: center; justify-items: center; gap: 40px; width: 100%; max-width: 1280px;`,
     A.partners.map((id,i) => img(id, `Partner logo ${i+1}`, `width: 100%; max-width: 160px; height: auto;`)).join("")));

// ---- Vision (65:49352) ----
export const vision = el("section",
  `display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); align-items: center; gap: 48px; padding-top: clamp(56px, 7vw, 100px); padding-bottom: clamp(56px, 7vw, 100px); padding-left: clamp(20px, 4.9vw, 70px); padding-right: clamp(20px, 4.9vw, 70px); background-color: #FFFFFF;`,
  el("div", `display: flex; flex-direction: column;`,
    el("p", `margin-top: 0px; margin-bottom: 12px; font-family: ${FIRA}; font-weight: 300; font-size: clamp(24px, 2.8vw, 40px); letter-spacing: -1px; color: #9C9C9C;`, "Our Vision") +
    el("h2", `margin-top: 0px; margin-bottom: 28px; font-family: ${FIRA}; font-weight: 700; font-size: clamp(36px, 5vw, 70px); line-height: 1.08; letter-spacing: -1px; color: #333333;`, "The Autonomous Enterprise") +
    el("p", `margin-top: 0px; margin-bottom: 0px; max-width: 460px; font-family: ${FIRA}; font-weight: 300; font-size: 18px; line-height: 28px; letter-spacing: 0.36px; color: #464A4B;`,
      "We believe in a future where humans and intelligent robots collaborate seamlessly. " +
      el("span", `font-weight: 500;`, "Botnizer&#39;s") +
      " adaptive AI systems don&#39;t just automate tasks they optimize entire workflows, learn from patterns, and create unprecedented operational efficiency.")) +
  img("sEUXYxB9QbH9hzQJqwUCR", "Connected restaurant technology illustration", `width: 100%; height: auto; justify-self: center;`), ` id="about"`);

// ---- Elevate your brand (65:49353 / 65:49354) ----
export const elevate = el("section",
  `display: flex; flex-direction: column; padding-top: clamp(48px, 6vw, 90px); padding-bottom: clamp(24px, 3vw, 40px); padding-left: clamp(20px, 4.9vw, 70px); padding-right: clamp(20px, 4.9vw, 70px); background-color: #FFFFFF;`,
  el("h2", `margin-top: 0px; margin-bottom: 24px; max-width: 640px; font-family: ${FIRA}; font-weight: 700; font-size: clamp(36px, 5vw, 70px); line-height: 1.08; letter-spacing: -1px; color: #333333;`, "Elevate your brand!") +
  el("p", `margin-top: 0px; margin-bottom: 0px; max-width: 640px; font-family: ${FIRA}; font-weight: 300; font-size: 18px; line-height: 28px; color: #464A4B;`,
    "Incorporate technology into your brand strategy and witness a game-changing improvement. Our advanced solutions enhance user experience and optimize business operations. Let&#39;s talk about how we can work together to integrate our technology and take your brand to the next level."));

// ---- Offering items (65:49357) ----
const offerings = [
  ["Digital Signage","AI-powered outdoor digital menu boards delivering dynamic, personalized content optimized for traffic flow and higher throughput.","1gCL0Vqf-3PXIYVgHOTpG"],
  ["Self-Ordering Kiosk","Self-ordering kiosks that streamline ordering, reduce queues, and enhance customer experience while improving operational efficiency.","Nimvx8knZj1VVNBFLvW9j"],
  ["Drive Thru Timer","Real-time drive-thru analytics solution that tracks traffic flow, order duration, and POS data to optimize efficiency and revenue.","6-QAGFAgftVFdpY6LxV6k"],
  ["NFC Google Review Cards","NFC and QR code–enabled Google review cards that simplify customer feedback, boost online visibility, and strengthen brand reputation.","N9uL3oS6FEKojWQrGMfn5"],
  ["Digital Menu Board","Dynamic digital menu boards that enhance customer engagement, showcase your dishes, and boost sales while streamlining operations.","ZQSZCRz1MYJtabOsi0OOY"],
  ["Drive Thru Audio System","High-quality drive-thru audio solution delivering clear communication, improved order accuracy, and AI-ready performance for future-proof operations.","F_SbF_pBTzq5J4KD3qnTP"],
];
export const offering = el("section",
  `padding-top: clamp(32px, 4vw, 60px); padding-bottom: clamp(56px, 7vw, 100px); padding-left: clamp(20px, 4.9vw, 70px); padding-right: clamp(20px, 4.9vw, 70px); background-color: #FFFFFF;`,
  el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; max-width: 1080px; margin-left: auto; margin-right: auto;`,
    offerings.map(([title, body, asset]) =>
      el("article", `display: flex; flex-direction: column; min-height: 450px; padding-top: 40px; padding-bottom: 0px; padding-left: 30px; padding-right: 30px; border-radius: 10px; background-color: #F1F1F1; overflow: hidden;`,
        el("h3", `margin-top: 0px; margin-bottom: 10px; font-family: ${FIRA}; font-weight: 700; font-size: clamp(26px, 2.6vw, 36px); line-height: 1.1; letter-spacing: -1px; color: #333333;`, esc(title)) +
        el("p", `margin-top: 0px; margin-bottom: 24px; font-family: ${FIRA}; font-weight: 300; font-size: 18px; line-height: 1.5; color: #464A4B;`, esc(body)) +
        img(asset, esc(title), `width: 100%; height: auto; max-height: 320px; object-fit: contain; object-position: bottom; margin-top: auto;`))).join("")), ` id="solutions"`);

// ---- Results (65:49361) ----
const stats = [["+34%","Increase in peak hour throughput"],["-22%","Reduction in order errors"],["-48s","Shaved off average drive-thru time"]];
export const results = el("section",
  `display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 48px; padding-top: clamp(56px, 7vw, 100px); padding-bottom: clamp(56px, 7vw, 100px); padding-left: clamp(20px, 4.9vw, 70px); padding-right: clamp(20px, 4.9vw, 70px); background-color: #FFFFFF;`,
  el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; align-content: start;`,
    stats.map(([n,l]) =>
      el("div", `display: flex; flex-direction: column; gap: 24px; padding-top: 60px; padding-bottom: 60px; padding-left: 20px; padding-right: 20px; border-radius: 20px; background-color: #FFFFFF; border-width: 1px; border-style: solid; border-color: #E6E9EE;`,
        el("div", `font-family: ${FIRA}; font-weight: 700; font-size: 38px; color: #606060;`, esc(n)) +
        el("div", `font-family: ${FIRA}; font-weight: 400; font-size: 18px; color: #606060;`, esc(l)))).join("")) +
  el("div", `display: flex; flex-direction: column; justify-content: center;`,
    el("h2", `margin-top: 0px; margin-bottom: 24px; font-family: ${FIRA}; font-weight: 700; font-size: clamp(34px, 4.8vw, 70px); line-height: 1.08; letter-spacing: -1px; color: #333333;`, "Measurable Results for Full-Service and Fast-Casual Restaurants") +
    el("p", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 300; font-size: 18px; line-height: 28px; letter-spacing: 0.36px; color: #464A4B;`,
      "Trade Foresight’s powerful dataset is constantly growing and expanding making it preferred platform for all Trading needs.")));

// ---- Case Study Cards (65:49362) ----
const cases = [
  ["Managing complex customizations during lunch rush","Botnizer Smart Modifiers &amp; Station Routing","40% faster build times, 95% order accuracy","yzW_aV1I038VjPers-XX7"],
  ["Inconsistent quality across food trucks and brick-and-mortar","Unified cloud-based platform for all locations","Standardized processes, 30% faster service","Fp2dhi4lJ_Sjg55pBkmCu"],
  ["Delivery timing and driver coordination","Integrated delivery dispatch with kitchen timing","25% faster delivery, 18% more deliveries per shift","Du-jEIgZ5rOiivQVTUIbB"],
];
export const caseStudies = el("section",
  `padding-top: clamp(40px, 5vw, 70px); padding-bottom: clamp(56px, 7vw, 100px); padding-left: clamp(20px, 4.9vw, 70px); padding-right: clamp(20px, 4.9vw, 70px); background-color: #FFFFFF;`,
  el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; max-width: 1280px; margin-left: auto; margin-right: auto;`,
    cases.map(([title, solution, res, asset]) =>
      el("article", `display: flex; flex-direction: column; gap: 16px; border-radius: 10px;`,
        img(asset, esc(title), `width: 100%; height: 312px; object-fit: cover; border-radius: 10px;`) +
        el("h3", `margin-top: 0px; margin-bottom: 0px; padding-left: 10px; padding-right: 10px; font-family: ${FIRA}; font-weight: 600; font-size: clamp(20px, 1.9vw, 24px); line-height: 1.25; color: #333333;`, esc(title)) +
        el("div", `display: flex; flex-direction: column; gap: 17px; padding-left: 10px; padding-right: 10px; padding-bottom: 20px;`,
          el("p", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 300; font-size: 18px; line-height: 28px; letter-spacing: 0.36px; color: #464A4B;`,
            el("span", `font-weight: 500;`, "Solution:") + " " + solution + "<ws.element ws:tag=\"br\"></ws.element>" +
            el("span", `font-weight: 500;`, "Results:") + " " + esc(res)) +
          el("a", `display: inline-flex; align-items: center; gap: 10px; font-family: ${FIRA}; font-weight: 400; font-size: 14px; line-height: 1.4; color: #0033C3; text-decoration-line: none;`, "Read More →", ` href="${ROUTES.caseDetail}"`)))).join("")), ` id="cases"`);

// ---- Technical (65:49360) ----
const integrations = [["cdkhmIrpwW3T6HQnyNCNF","Toast POS"],["SCeTgxgnQMJ6uY7-5Lm5Z","NCR Aloha"],["tu_tMDg9xB6i7p4heNTve","Kitchen Display"],["sH5ZMAYft7s2bSKXf19DY","Micros"],["sDBLLj0UbzXNKsh6PODJS","CRM"]];
export const technical = el("section",
  `display: flex; flex-direction: column; align-items: center; padding-top: clamp(60px, 8vw, 96px); padding-bottom: clamp(60px, 8vw, 96px); padding-left: clamp(20px, 4.9vw, 70px); padding-right: clamp(20px, 4.9vw, 70px); background-color: #333333;`,
  el("h2", `margin-top: 0px; margin-bottom: 28px; max-width: 620px; font-family: ${FIRA}; font-weight: 600; font-size: clamp(26px, 3vw, 38px); line-height: 1.05; color: #FFFFFF; text-align: center;`, "An API-First Platform Built for Integration &amp; Scale") +
  el("p", `margin-top: 0px; margin-bottom: 44px; max-width: 860px; font-family: ${FIRA}; font-weight: 300; font-size: 18px; line-height: 34px; color: #FFFFFF; text-align: center;`,
    el("span", `font-weight: 700; color: #0F9300;`, "Botnizer") +
    " is not a collection of point solutions. It&#39;s a single, API-first platform where every module shares data in real-time and integrates seamlessly with your existing " +
    el("span", `font-weight: 500; color: #0F9300;`, "POS (Toast, NCR Aloha, Micros), kitchen systems, and CRM") +
    ". Ensure enterprise-grade security, scalability, and a single point of accountability.") +
  el("div", `display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 28px; margin-bottom: 44px;`,
    el("div", `display: flex; align-items: center; justify-content: center; padding: 10px; border-radius: 31px; background-image: linear-gradient(-45deg, #0A6500 0%, #63DE55 100%);`,
      img("Wn25RZDNbWnu4AQyR9LB9", "Botnizer", `width: 66px; height: auto;`)) +
    integrations.map(([id,label]) =>
      el("div", `display: flex; flex-direction: column; align-items: center; gap: 7px;`,
        el("div", `display: flex; align-items: center; justify-content: center; width: 56px; height: 56px; border-radius: 9px; background-color: #FFFFFF;`,
          img(id, esc(label), `width: 32px; height: auto;`)) +
        el("span", `font-family: ${FIRA}; font-weight: 400; font-size: 15.6px; line-height: 21px; color: #FFFFFF; text-align: center;`, esc(label)))).join("")) +
  el("a", `display: inline-flex; align-items: center; justify-content: center; margin-bottom: 34px; padding-top: 9px; padding-bottom: 9px; padding-left: 37px; padding-right: 37px; border-radius: 914px; border-width: 1px; border-style: solid; border-color: #0F9300; background-image: linear-gradient(-11deg, #0A6500 0%, #63DE55 100%); box-shadow: 0px 4px 22px 0px rgba(15,147,0,0.55); font-family: ${FIRA}; font-weight: 400; font-size: 16.5px; letter-spacing: -0.9px; color: #FFFFFF; text-decoration-line: none;`, "Request a Demo", ` href="${ROUTES.contact}"`) +
  el("p", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 300; font-size: 18px; line-height: 34px; color: #FFFFFF; text-align: center;`,
    "Trusted by CTOs for secure, scalable, and fully integrated operational solutions."), ` id="what-we-do"`);

// ---- Footer (65:49297) ----
const fcol = (heading, links) =>
  el("div", `display: flex; flex-direction: column; gap: 24px;`,
    el("p", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 500; font-size: 24px; color: #FFFFFF;`, esc(heading)) +
    el("div", `display: flex; flex-direction: column; gap: 10px;`,
      links.map(([label, href]) => el("a", `font-family: ${FIRA}; font-weight: 300; font-size: 20px; color: rgba(255,255,255,0.78); text-decoration-line: none; padding-top: 6px; padding-bottom: 6px; transition-property: color; transition-duration: 160ms; transition-timing-function: ease; &:hover { color: #13C000; }`, esc(label), ` href="${href}"`)).join("")));

export const footer = el("footer",
  `display: flex; flex-direction: column; gap: 48px; padding-top: 50px; padding-bottom: 50px; padding-left: clamp(20px, 4.9vw, 70px); padding-right: clamp(20px, 4.9vw, 70px); background-color: #242829; border-top-width: 1px; border-top-style: solid; border-top-color: rgba(255,255,255,0.12);`,
  el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; align-items: start;`,
    el("h2", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 700; font-size: clamp(28px, 3.2vw, 38px); line-height: 1.15; letter-spacing: -1px; color: #FFFFFF;`, "Let’s Connect Today") +
    el("p", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 300; font-size: 18px; line-height: 28px; color: rgba(255,255,255,0.72);`,
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s.")) +
  el("div", `display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; align-items: start;`,
    el("div", `display: flex; flex-direction: column; gap: 24px;`,
      el("a", `align-self: flex-start; text-decoration-line: none;`,
        img(A.logo, "Botnizer", `height: 57px; width: auto;`), ` href="${ROUTES.home}"`)) +
    fcol("Experience", EXPERIENCE_LINKS) +
    fcol("Products", PRODUCT_LINKS) +
    fcol("Company", COMPANY_LINKS) +
    el("div", `display: flex; flex-direction: column; gap: 24px; padding: 20px; border-radius: 10px; background-color: rgba(255,255,255,0.06); border-width: 1px; border-style: solid; border-color: rgba(255,255,255,0.12);`,
      el("p", `margin-top: 0px; margin-bottom: 0px; font-family: ${FIRA}; font-weight: 500; font-size: 24px; color: #FFFFFF;`, "Let&#39;s Get Started!") +
      el("div", `display: flex; flex-direction: column; gap: 10px;`,
        el("p", `margin-top: 0px; margin-bottom: 0px; max-width: 260px; font-family: ${FIRA}; font-weight: 300; font-size: 22px; color: rgba(255,255,255,0.78);`, "We&#39;re here to listen and assist.") +
        el("a", `font-family: ${FIRA}; font-weight: 300; font-size: 20px; color: #13C000; text-decoration-line: none; padding-top: 10px; padding-bottom: 10px;`, "Contact us today", ` href="${ROUTES.contact}"`)))) +
  el("div", `display: flex; flex-wrap: wrap; align-items: center; gap: 16px; padding-top: 24px; border-top-width: 1px; border-top-style: solid; border-top-color: rgba(255,255,255,0.12);`,
    el("span", `font-family: ${FIRA}; font-weight: 300; font-size: 16px; color: rgba(255,255,255,0.6);`, "©2025 Botnizer, All rights reserved") +
    el("a", `margin-left: auto; font-family: ${FIRA}; font-weight: 400; font-size: 16px; color: #13C000; text-decoration-line: none;`, "Back to top ↑", ` href="#top"`)), ` id="contact"`);
