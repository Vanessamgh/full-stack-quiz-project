/**
 * lib/data.js
 * Shared content for the VibeCheck quiz — migrated from the original data.js.
 * No `window.X` assignments needed here: in Next.js we just `import` these
 * directly wherever they're used.
 */

export const QUIZ_QUESTIONS = [
  {
    text: "In a group, you are usually:",
    options: [
      { label: "A", text: "Leader", type: "wolf" },
      { label: "B", text: "Quiet observer", type: "cat" },
      { label: "C", text: "Social connector", type: "dog" },
      { label: "D", text: "Supportive friend", type: "eagle" },
      { label: "E", text: "Deep thinker", type: "owl" },
      { label: "F", text: "Wild card", type: "dolphin" },
    ],
  },
  {
    text: "Your ideal weekend is:",
    options: [
      { label: "A", text: "Adventure outdoors", type: "wolf" },
      { label: "B", text: "Staying home alone", type: "cat" },
      { label: "C", text: "Hanging out with friends", type: "dog" },
      { label: "D", text: "Working on your goals", type: "eagle" },
      { label: "E", text: "Reading or learning something new", type: "owl" },
      { label: "F", text: "Random, unplanned fun", type: "dolphin" },
    ],
  },
  {
    text: "People describe you as:",
    options: [
      { label: "A", text: "Strong", type: "wolf" },
      { label: "B", text: "Mysterious", type: "cat" },
      { label: "C", text: "Friendly", type: "dog" },
      { label: "D", text: "Driven", type: "eagle" },
      { label: "E", text: "Smart", type: "owl" },
      { label: "F", text: "Funny", type: "dolphin" },
    ],
  },
  {
    text: "Your energy level is:",
    options: [
      { label: "A", text: "High and intense", type: "wolf" },
      { label: "B", text: "Calm and steady", type: "cat" },
      { label: "C", text: "Social and warm", type: "dog" },
      { label: "D", text: "Focused and controlled", type: "eagle" },
      { label: "E", text: "Thoughtful and quiet", type: "owl" },
      { label: "F", text: "Unpredictable", type: "dolphin" },
    ],
  },
  {
    text: "In conflict, you:",
    options: [
      { label: "A", text: "Confront it head-on", type: "wolf" },
      { label: "B", text: "Walk away", type: "cat" },
      { label: "C", text: "Talk it out", type: "dog" },
      { label: "D", text: "Analyze it first", type: "eagle" },
      { label: "E", text: "Observe before speaking", type: "owl" },
      { label: "F", text: "Joke about it", type: "dolphin" },
    ],
  },
  {
    text: "Your biggest strength is:",
    options: [
      { label: "A", text: "Leadership", type: "wolf" },
      { label: "B", text: "Independence", type: "cat" },
      { label: "C", text: "Loyalty", type: "dog" },
      { label: "D", text: "Ambition", type: "eagle" },
      { label: "E", text: "Intelligence", type: "owl" },
      { label: "F", text: "Creativity", type: "dolphin" },
    ],
  },
  {
    text: "Your biggest weakness is:",
    options: [
      { label: "A", text: "Impatience", type: "wolf" },
      { label: "B", text: "Overthinking", type: "cat" },
      { label: "C", text: "Trusting too easily", type: "dog" },
      { label: "D", text: "Work obsession", type: "eagle" },
      { label: "E", text: "Overanalyzing", type: "owl" },
      { label: "F", text: "Getting distracted easily", type: "dolphin" },
    ],
  },
  {
    text: "Your communication style is:",
    options: [
      { label: "A", text: "Direct", type: "wolf" },
      { label: "B", text: "Minimal", type: "cat" },
      { label: "C", text: "Warm", type: "dog" },
      { label: "D", text: "Structured", type: "eagle" },
      { label: "E", text: "Thoughtful", type: "owl" },
      { label: "F", text: "Random", type: "dolphin" },
    ],
  },
  {
    text: "Pick a time of day:",
    options: [
      { label: "A", text: "Sunrise", type: "wolf" },
      { label: "B", text: "Night", type: "cat" },
      { label: "C", text: "Afternoon with friends", type: "dog" },
      { label: "D", text: "Early morning, already productive", type: "eagle" },
      { label: "E", text: "Late night thinking", type: "owl" },
      { label: "F", text: "Whatever, time is a construct", type: "dolphin" },
    ],
  },
  {
    text: "Your dream environment is:",
    options: [
      { label: "A", text: "Mountains / wild nature", type: "wolf" },
      { label: "B", text: "Cozy quiet room", type: "cat" },
      { label: "C", text: "Busy social place", type: "dog" },
      { label: "D", text: "Office with a skyline view", type: "eagle" },
      { label: "E", text: "Library", type: "owl" },
      { label: "F", text: "Theme park", type: "dolphin" },
    ],
  },
  {
    text: "Your decision style is:",
    options: [
      { label: "A", text: "Fast instincts", type: "wolf" },
      { label: "B", text: "Slow and careful", type: "cat" },
      { label: "C", text: "Based on how it feels", type: "dog" },
      { label: "D", text: "Logical planning", type: "eagle" },
      { label: "E", text: "Deep analysis", type: "owl" },
      { label: "F", text: "Impulsive", type: "dolphin" },
    ],
  },
  {
    text: "What motivates you most?",
    options: [
      { label: "A", text: "Freedom", type: "wolf" },
      { label: "B", text: "Peace", type: "cat" },
      { label: "C", text: "Connection", type: "dog" },
      { label: "D", text: "Success", type: "eagle" },
      { label: "E", text: "Knowledge", type: "owl" },
      { label: "F", text: "Fun", type: "dolphin" },
    ],
  },
  {
    text: "In your friend group, you're the:",
    options: [
      { label: "A", text: "Protector", type: "wolf" },
      { label: "B", text: "Lone wolf (ironically)", type: "cat" },
      { label: "C", text: "Social glue", type: "dog" },
      { label: "D", text: "Goal setter", type: "eagle" },
      { label: "E", text: "Advisor", type: "owl" },
      { label: "F", text: "Entertainer", type: "dolphin" },
    ],
  },
  {
    text: "Your reaction to stress is to:",
    options: [
      { label: "A", text: "Fight through it", type: "wolf" },
      { label: "B", text: "Withdraw", type: "cat" },
      { label: "C", text: "Seek support", type: "dog" },
      { label: "D", text: "Work harder", type: "eagle" },
      { label: "E", text: "Think it through", type: "owl" },
      { label: "F", text: "Laugh it off", type: "dolphin" },
    ],
  },
  {
    text: "Pick a motto:",
    options: [
      { label: "A", text: "\u201cStay strong.\u201d", type: "wolf" },
      { label: "B", text: "\u201cStay calm.\u201d", type: "cat" },
      { label: "C", text: "\u201cStay connected.\u201d", type: "dog" },
      { label: "D", text: "\u201cStay focused.\u201d", type: "eagle" },
      { label: "E", text: "\u201cStay curious.\u201d", type: "owl" },
      { label: "F", text: "\u201cStay weird.\u201d", type: "dolphin" },
    ],
  },
];

export const ARCHETYPES = {
  wolf: {
    id: "wolf",
    name: "Wolf",
    emoji: "\ud83d\udc3a",
    color: "#5b6b8c",
    tagline: "Independent, loyal, strategic.",
    description:
      "You lead from the front but never forget your pack. You're fiercely protective of the people you've let in, and you'd rather move fast and directly than dance around a problem.",
    strengths: ["Natural leadership", "Loyalty", "Direct communication", "Endurance under pressure"],
    apiQuery: "wolf",
    facts: [
      "Wolves live and hunt in tightly-knit packs, usually led by a breeding pair rather than the single strongest individual.",
      "A wolf's howl can carry for several kilometers across open terrain, letting a pack coordinate without ever meeting up.",
      "Wolves can sustain a trotting pace for hours and sprint in short bursts around 50\u201360 km/h (30\u201337 mph) when chasing prey.",
    ],
  },
  cat: {
    id: "cat",
    name: "Cat",
    emoji: "\ud83d\udc31",
    color: "#b5578f",
    tagline: "Calm, selective, independent.",
    description:
      "You don't perform for anyone. You take your time deciding who's worth your energy, but once someone earns your trust, you're far warmer than your \"mysterious\" reputation lets on.",
    strengths: ["Independence", "Emotional composure", "Sharp observation", "Selective loyalty"],
    apiQuery: "cat",
    facts: [
      "Domestic cats spend roughly 12\u201316 hours a day asleep \u2014 close to 70% of their lives.",
      "A cat's purr sits in a low-frequency range that some researchers associate with promoting tissue and bone healing.",
      "Cats can rotate each ear independently, up to about 180 degrees, to pinpoint a sound without moving their head.",
    ],
  },
  dog: {
    id: "dog",
    name: "Dog",
    emoji: "\ud83d\udc36",
    color: "#e0964f",
    tagline: "Friendly, loyal, socially warm.",
    description:
      "You're the reason group chats stay alive. People trust you almost instantly, and you genuinely mean it when you check in on them \u2014 loyalty isn't a performance for you, it's just how you operate.",
    strengths: ["Warmth", "Trustworthiness", "Team energy", "Reading a room"],
    apiQuery: "dog",
    facts: [
      "A dog's sense of smell is estimated to be tens of thousands of times more sensitive than a human's.",
      "Every dog's nose print is unique \u2014 no two are exactly alike, similar to a human fingerprint.",
      "Canine cognition research suggests the average dog can learn around 165 words and gestures, with top performers learning 250+.",
    ],
  },
  eagle: {
    id: "eagle",
    name: "Eagle",
    emoji: "\ud83e\udd85",
    color: "#3d8bcf",
    tagline: "Ambitious, focused, visionary.",
    description:
      "You think in long-term plans while everyone else is still on step one. You spot opportunity before it's obvious, and once you commit to a goal, you don't circle back \u2014 you go get it.",
    strengths: ["Big-picture thinking", "Focus", "Ambition", "Decisiveness"],
    apiQuery: "eagle",
    facts: [
      "Bald eagles have eyesight estimated at 4\u20138 times sharper than a human's, letting them spot prey from remarkable distances.",
      "Eagles build some of the largest nests of any bird; the biggest on record weighed close to a ton.",
      "Golden eagles are among the fastest divers in the animal kingdom, reaching over 150 mph (240 km/h) during a hunting stoop.",
    ],
  },
  owl: {
    id: "owl",
    name: "Owl",
    emoji: "\ud83e\udd89",
    color: "#4b3f8c",
    tagline: "Wise, observant, analytical.",
    description:
      "You'd rather understand something fully than be first to react to it. You notice details other people miss, and when you finally speak up, people tend to actually stop and listen.",
    strengths: ["Deep analysis", "Patience", "Pattern recognition", "Calm under pressure"],
    apiQuery: "owl",
    facts: [
      "Owls can rotate their heads up to about 270 degrees, thanks to extra vertebrae and a specialized blood-vessel structure.",
      "Most owl species fly almost silently \u2014 their feathers have soft, fringed edges that break up turbulence.",
      "An owl's eyes are fixed in their sockets, which is exactly why they evolved that extreme head rotation in the first place.",
    ],
  },
  dolphin: {
    id: "dolphin",
    name: "Dolphin",
    emoji: "\ud83d\udc2c",
    color: "#2fa39a",
    tagline: "Social, playful, creative.",
    description:
      "You bring the fun into every room without even trying. You solve problems sideways instead of head-on, and you genuinely can't stand doing things the boring, expected way.",
    strengths: ["Creativity", "Social intelligence", "Adaptability", "Playfulness under pressure"],
    apiQuery: "bottlenose dolphin",
    facts: [
      "Dolphins sleep with one half of their brain at a time, so they can keep surfacing to breathe even while resting.",
      "Each dolphin develops its own unique signature whistle, which other dolphins use almost like a name.",
      "Bottlenose dolphins have been recorded diving several hundred meters deep, even though most of their day-to-day dives are far shallower.",
    ],
  },
};

export const FAQ_DATA = [
  {
    q: "What does this quiz measure?",
    a: "It measures your personality tendencies based on your answers, not real psychology or diagnosis. It's for entertainment and self-reflection.",
  },
  {
    q: "How is my result calculated?",
    a: "Each answer gives points to different archetypes. The archetype with the highest score becomes your result.",
  },
  {
    q: "Can I get more than one result?",
    a: "Yes. If two archetypes are close in score, you may be a hybrid personality \u2014 for example, Wolf + Owl.",
  },
  {
    q: "Is this scientifically accurate?",
    a: "No. It's inspired by psychology concepts but simplified for fun and engagement.",
  },
  {
    q: "Why did I get this result?",
    a: "Because your answers matched the traits associated with that archetype most strongly.",
  },
  {
    q: "Can I retake the quiz?",
    a: "Yes. Your result may change depending on your mood or choices.",
  },
  {
    q: "What are archetypes?",
    a: 'Archetypes are symbolic personality patterns \u2014 like "Leader," "Observer," or "Explorer" \u2014 used to describe behavior styles.',
  },
  {
    q: "Are there right or wrong answers?",
    a: "No. Every answer reflects a different personality trait.",
  },
  {
    q: "Why do results feel so accurate?",
    a: "Because the questions are designed around common human behavior patterns \u2014 it's the Barnum effect doing its thing, honestly.",
  },
  {
    q: "Can I share my result?",
    a: "Yes! This quiz is designed for sharing on social media.",
  },
];
