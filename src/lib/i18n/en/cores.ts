import type { CoreProfile } from "../../profiles/cores";

/** English versions of the 16 core profiles. Structure mirrors cores.ts. */
export const CORE_PROFILES_EN: Record<string, CoreProfile> = {
  ISTJ: {
    code: "ISTJ",
    name: "Bedrock Steward",
    enName: "The Bedrock Steward",
    summary:
      "You tend to build on reliable facts and proven experience, delivering on commitments one by one. You value order, detail and responsibility, and prefer doing things properly over doing them loudly. To you, stability isn't dull — it's the foundation that keeps a life or a team running for the long haul.",
    strengths: [
      "Highly responsible with commitments and deadlines — what you say, you do",
      "Skilled at building and maintaining clear processes and rules",
      "Sharp eye for detail; catches oversights early",
      "Keeps output steady even in the middle of chaos",
    ],
    blindspots: [
      "May over-rely on what has worked before and warm to new methods slowly",
      "Sometimes weighs \"correct\" over \"felt\", coming across as stern",
      "Rapid change can be genuinely draining",
      "Tends to quietly shoulder too much instead of asking for help",
    ],
    workStyle:
      "You do best where goals are clear and rules are transparent. You like to understand requirements and scope first, then advance methodically; your delivery quality is consistent, and you're good at systematising repetitive work.",
    collaboration:
      "You are the person a team can rest on. You value clear division of labour and solid information; with fast-changing partners, agreeing early on \"what may change and what may not\" makes the collaboration smoother.",
    stress:
      "Stress tends to come from ignored rules, overturned plans and fuzzy responsibility boundaries. Under strain you may grip details harder. Taking time to sort \"must finish\" from \"can let go\" works better than pushing through.",
    growth:
      "Practise separating \"not yet proven\" from \"not feasible\", and allow small experiments; adding one sentence at the level of feeling — \"I see where you stand\" — makes your reliability easier to receive.",
    misconception:
      "Often read as rigid or change-averse. In truth you don't oppose the new — you simply want it to earn trust first.",
    motto: "Do what must be done, and do it properly.",
    reflectionQuestions: [
      "The last time you held to the old way, did hindsight say you protected quality or missed an opening?",
      "Which responsibilities could actually be shared, yet you habitually carry alone?",
      "How would you like others to understand the way you show care?",
    ],
  },
  ISFJ: {
    code: "ISFJ",
    name: "Hearth Warden",
    enName: "The Hearth Warden",
    summary:
      "You tend to look after people and things quietly and reliably, remembering what others need and the details of what matters. You rarely stand in the spotlight, yet you're often the reason everything keeps running. To you, giving is a natural expression, not a trade.",
    strengths: [
      "Attentive and considerate; notices needs left unspoken",
      "Grounded and thorough — your work can be trusted",
      "Patient; good at sustaining relationships and systems long-term",
      "Extremely dependable within familiar territory",
    ],
    blindspots: [
      "Easily puts others' needs first and accumulates fatigue",
      "Uncomfortable refusing, so requests can pile past capacity",
      "Tends to endure conflict silently, deferring problems",
      "Sensitive to criticism and takes it to heart",
    ],
    workStyle:
      "You prefer stable, well-defined work that genuinely helps people. You excel at operations, support and quality care, improving the existing way step by step rather than tearing things down.",
    collaboration:
      "You're often the team's glue — the one who remembers who needs what and what's due when. It's worth practising voicing your load and your views earlier: your observations are usually accurate, just under-shared.",
    stress:
      "Stress tends to come from interpersonal tension and being taken for granted. Under strain you may keep giving while resentment quietly grows. Caring for yourself first isn't selfish — it's what makes caring for others sustainable.",
    growth:
      "Practise checking your own capacity before accepting a request; and treat differing opinions as investment in the matter, not rejection of you.",
    misconception:
      "Often read as having no opinions. You have clear judgement — you simply protect the relationship first and state your position second.",
    motto: "Keep people in mind; keep things in order.",
    reflectionQuestions: [
      "The last time you wanted to refuse but said yes — what made the \"no\" hard to say?",
      "Of what you give, how much is truly needed, and how much is habit?",
      "If three hours a week were entirely yours, what would you do with them?",
    ],
  },
  INFJ: {
    code: "INFJ",
    name: "Stillwater Guide",
    enName: "The Stillwater Guide",
    summary:
      "You tend to observe the undercurrents of people and situations quietly, sensing others' circumstances keenly while holding your own sense of where things should go. You don't rush to speak, but when you do, it carries distilled insight and warmth.",
    strengths: [
      "Sees both people's feelings and the long arc of a situation",
      "Deep listener — people feel understood around you",
      "Holds clearly to values and first intentions",
      "Turns complex interpersonal or conceptual tangles into plain language",
    ],
    blindspots: [
      "High ideals invite disappointment with reality and with yourself",
      "Processes alone and lets others know too late that you're overloaded",
      "Sensitive to inconsistency between words and deeds; may conclude too early",
      "Deep engagement demands long recovery time",
    ],
    workStyle:
      "You prefer meaningful work you can sink into. You excel at long-range thinking and synthesis — incubating ideas in quiet until they're ready to bring to the team.",
    collaboration:
      "You do best in small, high-trust collaborations, often voicing the concerns others won't say. Remember to let partners see your needs too — not only you catching everyone else.",
    stress:
      "Stress tends to come from violated values, chronic overload and absorbing too much of others' emotion. Under strain you may suddenly withdraw. Speaking or writing feelings out regularly beats stockpiling them to a breaking point.",
    growth:
      "Practise splitting the ideal into steps that can start today, accepting that \"good enough\" is also progress; and state boundaries earlier in relationships.",
    misconception:
      "Often read as distant or overthinking. In truth most of your thinking simply stays inside, shared selectively.",
    motto: "Seeing deeply is how I walk clearly.",
    reflectionQuestions: [
      "When did you last feel truly understood? Have you given someone that moment lately?",
      "Which small piece of your ideal could turn into action this week?",
      "While you're holding space for everyone — who is holding it for you?",
    ],
  },
  INTJ: {
    code: "INTJ",
    name: "Starchart Drafter",
    enName: "The Starchart Drafter",
    summary:
      "You tend to look at things from the long view and the system view, organising scattered information into clear structure and charting routes into the future. You value competence and efficiency, habitually asking \"why this way?\" and rarely settling for surface answers.",
    strengths: [
      "Strong long-range planning and systems thinking",
      "Independent; keeps advancing with little supervision",
      "Willing to question the status quo and propose better ways",
      "Picks up new fields quickly and goes deep",
    ],
    blindspots: [
      "May underweight emotion and relationships in collaboration",
      "The insistence on efficiency can read as pressure",
      "Thinks everything through before speaking, leaving others outside the process",
      "Loses patience quickly with repetitive tasks",
    ],
    workStyle:
      "You prefer goal-driven environments with high autonomy. You build the blueprint first and land it step by step, holding quality and logical consistency to a high bar — suited to owning problems that need deep thought.",
    collaboration:
      "You respect capable, reasonable partners. Sharing the blueprint in your head early — even unfinished — earns more trust than presenting only conclusions.",
    stress:
      "Stress tends to come from inefficient process, uncontrollable variables and forced socialising. Under strain you may turn more detached and sharper-edged. Watch the body's signals and schedule genuinely offline rest.",
    growth:
      "Practise putting people into the system diagram too — listening is information gathering, not time lost; showing uncertainty occasionally increases rather than decreases your influence.",
    misconception:
      "Often read as cold or arrogant. In truth you invest deeply in what you care about — your expression just favours action and results.",
    motto: "See the whole board, then place each step.",
    reflectionQuestions: [
      "The last time you changed an important view — what persuaded you?",
      "Does your long-term plan leave room for the unexpected good?",
      "Who deserves to hear your unfinished thoughts?",
    ],
  },
  ISTP: {
    code: "ISTP",
    name: "Trail Mechanic",
    enName: "The Trail Mechanic",
    summary:
      "You tend to understand the world with hands and mind together: take it apart, try it, find how it really works. Calm and practical, you say little but react fast when it counts. The best answers, to you, come from doing rather than from long discussion.",
    strengths: [
      "Fast on-the-spot reactions; especially calm in a crisis",
      "Strong hands-on problem solving",
      "Pragmatic and efficient, unbound by formality and process",
      "Intuitive grasp of tools, systems and mechanisms",
    ],
    blindspots: [
      "Low tolerance for long meetings and abstract discussion",
      "Minimal emotional expression can unsettle people who care about you",
      "Prefers solo work; rarely syncs progress proactively",
      "Long-term commitments and plans keep getting deferred",
    ],
    workStyle:
      "You prefer hands-on work with plenty of freedom. You're most motivated when something is genuinely broken and needs fixing — quick to locate the crux and solve it with the least force.",
    collaboration:
      "You like a mode where everyone does their part and meets only when needed. Letting partners know that \"quiet doesn't mean idle\" — a brief progress ping — saves a lot of misunderstanding.",
    stress:
      "Stress tends to come from micromanagement and tedious interpersonal procedure. Under strain you may simply vanish into your own work. Saying \"I need space, will reply later\" beats going silently offline.",
    growth:
      "Practise occasionally putting observations and care into words, not only actions; long-term goals hold better when cut into a chain of interesting next steps.",
    misconception:
      "Often read as detached or hard to read. In truth you speak through action — the things you fix and the problems you solve are your language.",
    motto: "Say less. Fix it.",
    reflectionQuestions: [
      "The last time you showed care through action — did it land?",
      "Which long-deferred decision already has enough information?",
      "If you turned your repair skills on your own life, what would you fix first?",
    ],
  },
  ISFP: {
    code: "ISFP",
    name: "Grove Wanderer",
    enName: "The Grove Wanderer",
    summary:
      "You tend to take the world in slowly through the senses and the heart, keenly aware of beauty, atmosphere and the feeling of the present moment. Quiet but not cold, gentle but with firm bottom lines — you dislike being defined, preferring to live your days into your own shape at your own pace.",
    strengths: [
      "Fine aesthetic sense; notices beauty others miss",
      "Gentle and accepting — easy to be around",
      "True to your own values; doesn't drift with the crowd",
      "Quietly effective at practical care and companionship",
    ],
    blindspots: [
      "Avoids conflict, so important discontent may go unsaid",
      "Tends to dodge long-term planning and abstract goals",
      "When criticised, may quietly retreat far away",
      "Underestimates yourself; rarely steps up to claim things",
    ],
    workStyle:
      "You prefer work that's hands-on, aesthetic or genuinely helpful to people. You do best where you're trusted and the pace is humane; rigid systems and high-pressure competition drain you fast.",
    collaboration:
      "You're a gentle collaborator, willing to accommodate and fill gaps. Practise stating your preferences and limits at the start, so partners don't assume you're \"fine with anything\".",
    stress:
      "Stress tends to come from being forced to take public positions, having values trampled, or being scheduled by others for too long. Under strain you may look calm while churning inside. Find one safe person or a creative outlet — don't let feelings loop only in your head.",
    growth:
      "Practise saying \"I don't like this\" gently and clearly; your sense of worth doesn't need anyone's approval to stand — and showing your work opens doors you don't expect.",
    misconception:
      "Often read as shy or opinion-less. Your inner world is rich and firm — you simply reserve it for people who deserve it.",
    motto: "Walk your own road, at your own pace.",
    reflectionQuestions: [
      "The last time you bent yourself to accommodate someone — was it worth it?",
      "Of the things you've made or arranged, which represents you best?",
      "If no one could judge you, what would you try?",
    ],
  },
  INFP: {
    code: "INFP",
    name: "Lantern Seeker",
    enName: "The Lantern Seeker",
    summary:
      "You tend to navigate by inner values, seeking the people, work and directions that genuinely mean something to you. Rich in imagination, deeply attuned to others' pain, you often run whole worlds inside your head. You may not move fastest — but you care about moving true.",
    strengths: [
      "Deep empathy; understands subtle, complicated feelings",
      "Abundant imaginative and creative energy",
      "Loyal to values and first intentions; doesn't compromise easily",
      "Sees the potential in people and situations",
    ],
    blindspots: [
      "Self-doubt grows where ideal and reality diverge",
      "Procrastinates, especially on dull but necessary work",
      "Over-introspection can amplify emotions inwardly",
      "In conflict, tends to yield or leave rather than speak",
    ],
    workStyle:
      "You prefer work with meaning and creative room, producing best where you're understood and trusted. Cutting the grand vision into segments with delivery points helps your inspiration land.",
    collaboration:
      "You value sincerity over efficiency. You rarely argue, but you keep clear internal judgements; practise speaking while issues are small, rather than letting disappointment accumulate into an exit.",
    stress:
      "Stress tends to come from value conflicts, forced surface performance, and long stretches of being misunderstood. Under strain you may sink into your own world. Write it, say it, or walk it out — any of these beats staying stuck in your head.",
    growth:
      "Practise accepting that finishing conveys your values better than perfecting; and treat sensitivity as an antenna, not a weakness — it tells you where light is needed.",
    misconception:
      "Often read as dreamy and impractical. In truth you simply refuse to use \"reality\" as an excuse for abandoning meaning.",
    motto: "Take what you believe in seriously.",
    reflectionQuestions: [
      "How far is what you're doing now from what you believe in?",
      "Which \"not good enough yet\" piece of work is actually ready to be seen?",
      "Who understands you without explanation?",
    ],
  },
  INTP: {
    code: "INTP",
    name: "Principle Prospector",
    enName: "The Principle Prospector",
    summary:
      "You tend to treat the world as a system that can be understood, always asking what principle lies underneath. Independent in thought and rigorous in standards, you value intellectual honesty over saving face. Your curiosity rarely goes out — it just tends to burn too many fires at once.",
    strengths: [
      "Strong analysis and abstraction; sees through to the core of problems",
      "Intellectually honest; admits errors and updates views",
      "Full of ideas from unusual angles",
      "Powerful self-learner who goes deep into new fields fast",
    ],
    blindspots: [
      "Thinks much, finishes less — projects stall at eighty percent",
      "Everyday admin and routine slip through the cracks",
      "Focusing purely on logic in discussion can miss the person",
      "Defines the problem perfectly but delays taking the shot",
    ],
    workStyle:
      "You prefer research-like, conceptual, high-freedom work — best suited to questions nobody knows the answer to yet. Pair with a strong finisher and your output multiplies.",
    collaboration:
      "You enjoy high-quality debate about ideas, not people. Remember most people feel \"refuted\" as \"rejected\" — affirm first, question second, and your insight lands better.",
    stress:
      "Stress tends to come from meaningless rules, compressed timelines and social overload. Under strain you may procrastinate down a rabbit hole of interests. Cutting the task absurdly small is your restart switch.",
    growth:
      "Practise treating \"publish\" as part of the experiment rather than a final verdict; real-world feedback feeds your theories better than mental simulation.",
    misconception:
      "Often read as absent-minded or difficult. In truth your compute is simply allocated to the problem currently running in your head.",
    motto: "Understand it first. Everything else can wait.",
    reflectionQuestions: [
      "Which long-pondered plan could ship an ugly first version today?",
      "Last time you adjusted your delivery for someone's feelings — how did it go?",
      "Where has your curiosity taken you lately, and is there anything worth staying for?",
    ],
  },
  ESTP: {
    code: "ESTP",
    name: "Rapids Pilot",
    enName: "The Rapids Pilot",
    summary:
      "You tend to live in the present and act directly, reacting to change faster than most people can discuss it. Practical, bold and infectious, you find the one movable step in a chaotic scene. Waiting and empty talk are the two things you can least stand.",
    strengths: [
      "Exceptional drive and improvisation under pressure",
      "Practical and direct; gets to the point fast",
      "Stress-resistant — calmest at the scene of the crisis",
      "Infectious energy that gets a room moving",
    ],
    blindspots: [
      "May discount long-term consequences — act first, see later",
      "Patience runs out on details and follow-up maintenance",
      "Straight talk sometimes wounds without your noticing",
      "When bored, may manufacture stimulation",
    ],
    workStyle:
      "You prefer fast, varied work with immediate results. You learn fastest on-site; being chained to a desk writing long documents drains you rapidly.",
    collaboration:
      "You can push a team into motion and hold the front line. Pair with partners who mind the long game and the details, and your momentum becomes finished work instead of fireworks.",
    stress:
      "Stress tends to come from restricted movement, drawn-out process and invisible progress. Under strain you may turn impulsive or thrill-seeking. A small task you can start right now is your best pressure valve.",
    growth:
      "Practise giving big decisions a 24-hour buffer; and remember some results — trust, mastery, relationships — only compound with time.",
    misconception:
      "Often read as impulsive or unthinking. You think fast and concretely — you just answer with action instead of explanation.",
    motto: "Rather than imagine it, try it.",
    reflectionQuestions: [
      "Your last \"act first\" — did it bring an opening or a cleanup?",
      "Which slow-growing thing deserves a fixed block of your time?",
      "Your directness — to whom is it a gift, and to whom a weight?",
    ],
  },
  ESFP: {
    code: "ESFP",
    name: "Bonfire Kindler",
    enName: "The Bonfire Kindler",
    summary:
      "You tend to carry energy into a crowd and light the place up. Sincere with people and passionate about life, you read the room quickly and look after everyone's mood. To you, joy isn't escapism — it's one of the serious ways of living.",
    strengths: [
      "Naturally magnetic; draws people together",
      "Reads others' feelings keenly; cares in practical ways",
      "Adaptable and happy to embrace change",
      "Turns ordinary days into something with flavour",
    ],
    blindspots: [
      "May use busyness and liveliness to sidestep heavy topics",
      "Finances and long-term planning drift with the mood",
      "Cares about others' opinions; criticism cuts deep",
      "Dull but necessary tasks get postponed again and again",
    ],
    workStyle:
      "You prefer people-facing, lively work with instant feedback. In a good-vibes team your output doubles; isolated, rigid environments waste your strengths entirely.",
    collaboration:
      "You're the team's warm-up act and lubricant — first to notice someone off balance. Practise seeing \"everyone happy\" and \"things on schedule\" as two sides of the same job, and you become a fuller partner.",
    stress:
      "Stress tends to come from isolation, harsh criticism and long dull stretches. Under strain you may fill yourself with more activity. Stopping to face the thing you keep circling is usually less scary than imagined.",
    growth:
      "Practise sitting with boredom for fifteen minutes — many important things (saving, checkups, hard conversations) hide behind it; your joy stands steadier on that ground.",
    misconception:
      "Often read as not serious. Your investment in people and in life is thoroughly serious — it just looks like shining.",
    motto: "Living this moment well is a skill.",
    reflectionQuestions: [
      "When were you last quietly alone? How did it feel?",
      "Which avoided task could begin with just five minutes?",
      "Of the joy you give others — is a share kept for you?",
    ],
  },
  ENFP: {
    code: "ENFP",
    name: "Wildfield Sparker",
    enName: "The Wildfield Sparker",
    summary:
      "You tend to see connections and possibilities between people and ideas that others miss. Your enthusiasm is sincere and contagious — you can light a room quickly and genuinely see what makes each person distinct. Your challenge was never starting; it's choosing, and staying.",
    strengths: [
      "Endless flow of ideas and possibilities",
      "Sincere enthusiasm that inspires and connects",
      "Keen sense of people's potential — a born encourager",
      "Strong at cross-domain association and starting from zero",
    ],
    blindspots: [
      "Interests shift fast; commitments overload easily",
      "Visibly low energy for routine and finishing work",
      "Mood rides the waves of inspiration; energy management is hard",
      "Fear of constraint can mean avoiding necessary structure",
    ],
    workStyle:
      "You prefer varied, meaningful, co-creative work — best owning the zero-to-one phase. Hand maintenance to people who love it, and set yourself a guardrail of no more than three concurrent projects.",
    collaboration:
      "You make teams believe \"we can\". Remember: your \"it could be even better\" is a change-cost for whoever is mid-execution — ask \"is changing now worth it?\" before proposing.",
    stress:
      "Stress tends to come from repetitive chores, unappreciated enthusiasm, or too many options. Under strain you may open even more new fronts as escape. Return to the body — walk, exercise, sleep — before opening another project.",
    growth:
      "Practise savouring the completion of one small thing until it's as addictive as starting a new one; your imagination deserves the discipline that makes it real.",
    misconception:
      "Often read as three-minute passion. Your core concerns — people, meaning, possibility — never changed; only the vehicles do.",
    motto: "Possibilities exist to be realised.",
    reflectionQuestions: [
      "Of everything in flight right now, which three most deserve to stay?",
      "Which idea have you told three times but not yet started?",
      "You've encouraged so many people — which sentence do you most need to hear?",
    ],
  },
  ENTP: {
    code: "ENTP",
    name: "Crossroads Venturer",
    enName: "The Crossroads Venturer",
    summary:
      "You tend to flip every \"of course\" over for inspection, delighting in debate, brainstorms and routes around convention. Quick-witted and fast to learn, your favourite moment is when ideas grow stronger through collision. Rules, to you, are reference answers — not the answer key.",
    strengths: [
      "Agile mind; excels at debate and improvisation",
      "Reframes problems from entirely new angles",
      "Learns fast and transfers knowledge across domains",
      "Unafraid to challenge authority and convention",
    ],
    blindspots: [
      "Debating for its own sake can wear down relationships",
      "Broad interests, weak endings — results scatter",
      "Underestimates the difficulty of execution details",
      "Attending to others' feelings tends to lag half a beat",
    ],
    workStyle:
      "You prefer open, fast, challenge-friendly environments — built for trailblazing new products, strategies, markets. Let structure and detail pass to partners suited to them, and respect how they work.",
    collaboration:
      "Your questioning makes the team think deeper — but label it: \"I'm strengthening this idea, not opposing you.\" Give consensus time to land; don't rush to overturn yesterday's agreement.",
    stress:
      "Stress tends to come from repetition, rigidity, and places where questions aren't allowed. Under strain you may turn caustic or light fires everywhere. Find someone who'll genuinely spar with you, and channel the energy back into the problem.",
    growth:
      "Practise choosing one battlefield worth going deep on: influence compounds from ideas plus delivery, not from cleverness scattered everywhere.",
    misconception:
      "Often read as argumentative. In truth you test ideas through collision — the people you debate seriously are the people you take seriously.",
    motto: "Good ideas deserve to be challenged.",
    reflectionQuestions: [
      "In your last debate, were you after the better answer — or the win?",
      "Which started project would be worth more delivered than shelved?",
      "Whose steadiness and follow-through quietly enables your flexibility?",
    ],
  },
  ESTJ: {
    code: "ESTJ",
    name: "Basecamp Marshal",
    enName: "The Basecamp Marshal",
    summary:
      "You tend to break goals into plans, plans into assignments, and push assignments to done. You value efficiency, order and keeping your word, and you willingly carry decisions and responsibility. Organising things well isn't a need for control — it's respect for everyone's time.",
    strengths: [
      "Strong organisation and execution; turns chaos into process",
      "Decides quickly and owns the responsibility",
      "Clear standards people can rely on",
      "Grounded and reliable, focused on real results",
    ],
    blindspots: [
      "May treat your own standard as the only standard",
      "In haste, can run past others' feelings and objections",
      "Limited patience for fuzzy, experimental phases",
      "Used to being in control; delegating is hard",
    ],
    workStyle:
      "You prefer clear goals and clear accountability. You excel at building systems and ensuring delivery; leave a lane for creativity and exceptions so the system doesn't become the ceiling.",
    collaboration:
      "You instinctively supply the order no one owns. Asking \"how do you plan to do it?\" before issuing instructions turns your leadership from obeyed into trusted.",
    stress:
      "Stress tends to come from disorder, inefficiency and broken promises. Under strain you may get louder and grip tighter. The most effective move is a ten-minute pause to separate \"important\" from \"merely irritating\".",
    growth:
      "Practise separating \"a different way\" from \"the wrong way\"; the highest form of efficiency is people giving their best willingly.",
    misconception:
      "Often read as domineering. In truth you were simply first to see the unhandled problem — and willing to be the one who handles it.",
    motto: "If you say it, deliver it.",
    reflectionQuestions: [
      "The last time you \"took over\" — necessity, or distrust?",
      "Whose different method on the team actually turned out fine?",
      "Besides results, what else do people thank you for?",
    ],
  },
  ESFJ: {
    code: "ESFJ",
    name: "Bridgeside Connector",
    enName: "The Bridgeside Connector",
    summary:
      "You tend to actively knit people together: remembering birthdays, noticing who's left out, organising every gathering. You express care through practical acts and value harmony and belonging. Where you are, people are less likely to drift apart.",
    strengths: [
      "Strong at organising people and occasions",
      "Thoughtful in practical, concrete ways",
      "Keeps promises; people feel safe with you",
      "Sensitive to shifts in group atmosphere",
    ],
    blindspots: [
      "Over-invested in others' opinions; wounds easily",
      "May put harmony ahead of necessary conflict",
      "Accumulates grievance towards the ungrateful",
      "Harder to adapt when familiar ways are challenged",
    ],
    workStyle:
      "You prefer people-centred work with direct feedback — coordinating, serving, holding teams together. Clear appreciation matters to you, and it's worth asking for directly.",
    collaboration:
      "You're often the team's social hub. Practise accepting that some people are slow to warm or solitary by nature — it isn't against you; and keep one seat of care reserved for yourself.",
    stress:
      "Stress tends to come from criticism, exclusion, or unseen effort. Under strain you may give even harder, hoping to be affirmed. Stop first and ask: what do I need right now?",
    growth:
      "Practise putting your own needs on the to-do list too; and learn to voice disagreement without breaking the relationship — the bonds you've built can bear honest words.",
    misconception:
      "Often read as face-conscious or gossipy. In truth you simply treat the web of relationships as a home that needs tending.",
    motto: "Bringing people together is a real skill.",
    reflectionQuestions: [
      "What's one thing you did for yourself recently?",
      "Which relationship runs one-way from you — is it time to renegotiate?",
      "If you needed no one's approval, how would you spend next weekend?",
    ],
  },
  ENFJ: {
    code: "ENFJ",
    name: "Ridgeline Convener",
    enName: "The Ridgeline Convener",
    summary:
      "You tend to see each person's potential and find ways to gather people towards a shared direction. Warm and persuasive, you naturally sense the emotional currents of a group. Nothing satisfies you more than watching someone grow into themselves because you backed them.",
    strengths: [
      "Strong at uniting hearts and leading teams",
      "Genuine care that sees and lights up potential",
      "Communication with both warmth and structure",
      "Willing to carry and give for the group",
    ],
    blindspots: [
      "Carries too many people's expectations and emotions",
      "May over-involve yourself in others' lessons to learn",
      "Addicted to being needed; hard to say \"I need help too\"",
      "Highly sensitive to criticism and discord",
    ],
    workStyle:
      "You prefer people-centred work: leading teams, teaching, aligning groups. You're skilled at moving many people in one direction — watch whether \"the team's goal\" is quietly covering your own voice.",
    collaboration:
      "You give collaboration both direction and warmth. Practise letting the team have its necessary friction — some consensus only sets after an argument, and you needn't always be the extinguisher.",
    stress:
      "Stress tends to come from interpersonal rupture, fear of disappointing, and emotional overload. Under strain you may smile while breaking. A standing block of time that serves no one is your necessity, not a luxury.",
    growth:
      "Practise separating \"supporting them\" from \"walking for them\"; and ask for help from those you trust — letting others care for you completes the relationship.",
    misconception:
      "Often read as flawless or needing no help. In truth you're simply used to placing your own needs last in line.",
    motto: "We go far by going together.",
    reflectionQuestions: [
      "When did you last ask for help?",
      "Who that you're helping actually needs their own stumble?",
      "With everyone's expectations removed — where do you want to go?",
    ],
  },
  ENTJ: {
    code: "ENTJ",
    name: "Expedition Trailblazer",
    enName: "The Expedition Trailblazer",
    summary:
      "You tend to see the farther goal and mobilise resources and people towards it. Decisive, high-standarded and unafraid of responsibility, you naturally turn \"want\" into \"plan\" and \"plan\" into \"progress\". You respect competence — and expect yourself to deserve that respect.",
    strengths: [
      "Strong strategic vision and mobilising execution",
      "High decisiveness; will make the call at the key moment",
      "Clear sense of purpose that carries teams through uncertainty",
      "Faces problems head-on, including hard conversations",
    ],
    blindspots: [
      "At full speed, may roll over others' feelings",
      "Can let efficiency outrank relationships",
      "Low tolerance for mediocrity; the bar can crush partners",
      "Unused to showing weakness; pushes through to overload",
    ],
    workStyle:
      "You prefer challenge and decision space — setting direction, integrating resources, driving change. Remember: great goals need people willing to follow, and people aren't resources; they're the reason.",
    collaboration:
      "You treat the team like an expedition: goal, route, supplies all in place. Practise one extra round of listening before the verdict — not for politeness, but because the front line holds the information.",
    stress:
      "Stress tends to come from loss of control, inefficiency and powerless situations. Under strain you may turn more forceful and impatient. Admitting \"I get tired too\" doesn't diminish your leadership — it makes people more willing to walk with you.",
    growth:
      "Practise valuing what doesn't win by speed: trust, consolidation, timing; the strongest trailblazer also learns to wait for the team to catch up.",
    misconception:
      "Often read as cold or controlling. In truth your investment in the team runs deep — you push hard because you truly believe the destination is worth it.",
    motto: "The goal is there — so the road gets opened.",
    reflectionQuestions: [
      "Is your team keeping up right now — or is it just you out front?",
      "The last time someone told you the truth, did your reaction leave them daring to do it again?",
      "When you reach the goal, who do you want to celebrate with?",
    ],
  },
};
