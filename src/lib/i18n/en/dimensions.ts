import type { Dimension } from "../../types";
import type { DimensionMeta } from "../../dimensions";

export const DIMENSION_META_EN: Record<Dimension, DimensionMeta> = {
  EI: {
    code: "EI",
    first: "E",
    second: "I",
    title: "Energy Source",
    firstName: "Outward engagement",
    secondName: "Inward reflection",
    firstDescription:
      "Gains energy from external interaction and action — thinking out loud, sorting ideas while talking.",
    secondDescription:
      "Recharges through inner reflection and time alone — thinking things through before speaking.",
    custom: false,
  },
  SN: {
    code: "SN",
    first: "S",
    second: "N",
    title: "Information Intake",
    firstName: "Concrete sensing",
    secondName: "Abstract intuition",
    firstDescription:
      "Prefers concrete information, facts and hands-on experience; values what is certain right now.",
    secondDescription:
      "Prefers patterns, possibilities and abstract concepts; often thinks about what things imply.",
    custom: false,
  },
  TF: {
    code: "TF",
    first: "T",
    second: "F",
    title: "Decision Basis",
    firstName: "Logical weighing",
    secondName: "Values and people",
    firstDescription:
      "Prioritises logic, consistency and principles when deciding; cares about arguments that hold up.",
    secondDescription:
      "Prioritises values, relationships and impact on people; cares about empathy and harmony.",
    custom: false,
  },
  JP: {
    code: "JP",
    first: "J",
    second: "P",
    title: "Life Rhythm",
    firstName: "Structure and planning",
    secondName: "Flexibility and exploring",
    firstDescription:
      "Prefers structure, plans, decisions and visible progress; feels settled once things are decided.",
    secondDescription:
      "Prefers flexibility, exploration and keeping options open; likes to figure things out along the way.",
    custom: false,
  },
  AO: {
    code: "AO",
    first: "A",
    second: "O",
    title: "Decision Momentum (site-specific dimension)",
    firstName: "Action-oriented",
    secondName: "Observant-reflective",
    firstDescription:
      "Action-oriented: tends to decide and move once the information is good enough, adjusting on the go.",
    secondDescription:
      "Observant-reflective: tends to keep observing, weighing risks and preserving room to adjust.",
    custom: true,
  },
  HC: {
    code: "HC",
    first: "H",
    second: "C",
    title: "Expressive Warmth (site-specific dimension)",
    firstName: "Humanly expressive",
    secondName: "Composed-reserved",
    firstDescription:
      "Humanly expressive: emotions and goodwill are easy for others to feel — direct, warm expression.",
    secondDescription:
      "Composed-reserved: expression is restrained and steady, with care shown through actions and boundaries.",
    custom: true,
  },
};
