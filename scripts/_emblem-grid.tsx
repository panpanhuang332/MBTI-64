import { writeFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { Resvg } from "@resvg/resvg-js";
import { TypeEmblem } from "../src/components/TypeEmblem";

const SAMPLES = [
  "ESTJ-AH", "ISTJ-AH", "ENTJ-AH", "ESFJ-AH",
  "ESTP-AH", "ESTJ-OH", "ESTJ-AC", "INFP-OC",
  "ENFP-AH", "INTJ-OC", "ISFP-OH", "ENTP-AC",
  "ISTP-AC", "ESFP-AH", "INFJ-OH", "ENFJ-AH",
];

const COLS = 4, W = 150, H = 152;
const cells = SAMPLES.map((code, i) => {
  const x = (i % COLS) * W + 5;
  const y = Math.floor(i / COLS) * H + 5;
  const inner = renderToStaticMarkup(createElement(TypeEmblem, { code }))
    .replace('<svg viewBox="0 0 140 120" role="img"', `<svg x="${x}" y="${y}" width="140" height="120" viewBox="0 0 140 120"`);
  return `${inner}<text x="${x + 70}" y="${y + 136}" text-anchor="middle" font-family="DejaVu Sans" font-size="13" fill="#333">${code}</text>`;
}).join("\n");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${COLS * W + 10}" height="${Math.ceil(SAMPLES.length / COLS) * H + 10}"><rect width="100%" height="100%" fill="white"/>${cells}</svg>`;
const png = new Resvg(svg, { font: { loadSystemFonts: true } }).render().asPng();
writeFileSync(process.argv[2], png);
console.log("grid written");
