import type { SubtypeCode, SubtypeProfile } from "../../profiles/subtypes";

export const SUBTYPE_PROFILES_EN: Record<SubtypeCode, SubtypeProfile> = {
  AH: {
    code: "AH",
    name: "Daybreak",
    enName: "Daybreak",
    tagline: "Moves fast, warmth in the open",
    summary:
      "You tend to make the call and move once the information is good enough, while letting people clearly feel your emotions and goodwill. Action and warmth travel together — that is the first impression you give.",
    decisionStyle:
      "A brisk decision rhythm: you'd rather move and adjust than leave things hanging, and you're willing to be the first to take a position.",
    socialStyle:
      "Feelings and care show openly; praise and thanks come easily, which makes you feel approachable.",
    stressStyle:
      "Under pressure you want to do something right away and will say how you feel; watch out for moving so fast you skip the pause things deserve.",
    communicationStyle:
      "Direct and warm — you state your position and your feelings together; slower-paced discussions ask a little extra patience of you.",
  },
  AC: {
    code: "AC",
    name: "Ridgeline",
    enName: "Ridgeline",
    tagline: "Moves fast, steady and reserved",
    summary:
      "You decide crisply and move cleanly forward, but express emotion with restraint, valuing boundaries and stability. People notice your efficiency first and only later learn to read how much you care.",
    decisionStyle:
      "Decisive: when you're ready, you act, without dragging things out; endless inconclusive meetings wear on you quickly.",
    socialStyle:
      "Restrained and matter-of-fact, keeping a clean distance with most people; warmth appears gradually once trust is built.",
    stressStyle:
      "Under pressure you quietly speed up and work the problem, showing little emotion; be aware people may not realise you need support.",
    communicationStyle:
      "Concise, focused on conclusions and next steps; the occasional added word of feeling or appreciation makes the message complete.",
  },
  OH: {
    code: "OH",
    name: "Lakeshore",
    enName: "Lakeshore",
    tagline: "Looks closely, warmth in the open",
    summary:
      "You prefer to observe and compare before deciding, but your warmth towards people can't be hidden. You don't rush, yet those walking with you feel looked after and at ease.",
    decisionStyle:
      "Before deciding you like laying the options out side by side and keeping room to adjust; \"let me double-check\" is your refrain — and it often catches traps.",
    socialStyle:
      "Care and emotion flow naturally; you listen well and keep people company, so others open up to you.",
    stressStyle:
      "Under pressure you turn things over repeatedly and seek people to talk it through with; careful that consulting too many voices can make deciding even harder.",
    communicationStyle:
      "Gentle and open to negotiation, tending to tend to feelings before business; important positions deserve to be stated earlier and more plainly.",
  },
  OC: {
    code: "OC",
    name: "Deepwood",
    enName: "Deepwood",
    tagline: "Looks closely, steady and reserved",
    summary:
      "You observe quietly, think things through fully, then act with care; your expression is restrained and stable. The value of your deliberation is often understood only after the fact.",
    decisionStyle:
      "Careful decisions that weigh risk and long-term consequences — you'd rather go slower than redo it; a natural fit for gatekeeping roles.",
    socialStyle:
      "Quiet, boundary-respecting, with a small and deep circle; your care lives mostly in actions and details rather than words.",
    stressStyle:
      "Under pressure you process alone and re-run the scenarios; notice that turning too far inward keeps support out — letting your state show a little is a form of protection.",
    communicationStyle:
      "Careful wording — you speak once you've thought it through, so your words carry weight; when instant responses are needed, offer a \"first take\" and complete it later.",
  },
};
