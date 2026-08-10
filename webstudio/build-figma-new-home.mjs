// New Home page — Figma YcekX1kGhoti7ssk1sOlnr node 65:49189 ("New Home Page-updated")
//
// Every section of this page lives in fig-gen.mjs, because the other Figma pages
// reuse them. Previously this page was composed ad hoc on the command line; this
// script exists so it can be rebuilt reproducibly whenever the shared nav or
// footer changes.
import fs from "node:fs";
import { nav, hero, trust, vision, elevate, offering, technical, results, caseStudies, footer } from "./fig-gen.mjs";

const FIRA = `"Fira Sans", system-ui, sans-serif`;

// Figma node order: Nav Bar 65:49368, Hero 65:49366, Trust Bar 65:49356,
// Vision 65:49352, Elevate 65:49353/4, Offering items 65:49357,
// Technical 65:49360, Results 65:49361, Case Study cards 65:49362, Footer 65:49297.
const main = `<ws.element ws:tag="main" ws:style={css\`display: flex; flex-direction: column;\`}>${hero}${trust}${vision}${elevate}${offering}${technical}${results}${caseStudies}</ws.element>`;
const page = `<ws.element ws:tag="div" ws:style={css\`display: flex; flex-direction: column; font-family: ${FIRA}; color: #333333; background-color: #FFFFFF;\`}>${nav}${main}${footer}</ws.element>`;

fs.mkdirSync(".temp", { recursive: true });
fs.writeFileSync(".temp/fig-new-home.json", JSON.stringify({
  parentInstanceId: "-0LaMMjJQ_vQ6QCmYUzQQ",   // /new-home page root
  fragment: page,
  mode: "replace",
}));
console.log("fragment:", page.length, "chars");
