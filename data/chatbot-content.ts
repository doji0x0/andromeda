export const assistantHomeOptions = [
  { label: "I'm a Brand", view: "brand" },
  { label: "I'm a Creator", view: "creator" },
  { label: "Services", view: "services" },
  { label: "How It Works", view: "process" },
  { label: "Contact Us", view: "contact" },
  { label: "FAQ", view: "faq" },
] as const

export const brandAnswers = [
  {
    label: "Find creators",
    answer: "Andromeda helps brands find vetted, relevant creators — matched by audience, content style, engagement quality, and category, not just follower count.",
  },
  {
    label: "Start a campaign",
    answer: "Andromeda plans and runs the full campaign: briefing, content direction, publishing, contracts, payments, and reporting.",
  },
  {
    label: "Campaign process",
    answer: "Tell us about your brand, approve the matched creators, and Andromeda manages the campaign through to the final performance report.",
  },
  {
    label: "Services for brands",
    answer: "Creator sourcing, campaign management, livestreaming, hosting, UGC, social media management, contracts, payments, and reporting are available.",
  },
] as const

export const creatorAnswers = [
  {
    label: "Join Andromeda",
    answer: "Onboarding to the Andromeda creator network is completely free and takes just a few minutes.",
  },
  {
    label: "How matching works",
    answer: "Andromeda matches creators with paying brand campaigns that genuinely fit their niche, platform, and audience.",
  },
  {
    label: "Creator benefits",
    answer: "Creators receive fair, upfront terms and support with briefs, content direction, and timelines.",
  },
  {
    label: "Payment & campaigns",
    answer: "You create, Andromeda handles the contract, and you are paid on time for every completed campaign.",
  },
] as const

export const assistantServices = [
  "Creator (KOL) Sourcing & Management",
  "Campaign Management",
  "Livestream Management",
  "Event & Campaign Hosting",
  "UGC",
  "Social Media Management",
  "Contracts & Payments",
  "Reporting & Insights",
] as const

export const assistantProcesses = {
  brand: [
    "Tell us about your brand",
    "We shortlist matched creators",
    "You approve the match",
    "We manage the campaign",
    "You receive a performance report",
  ],
  creator: [
    "Join the network",
    "Tell us your niche, platform, and audience",
    "We match you with paying brand campaigns",
    "We support you with the brief and timeline",
    "You create, Andromeda handles the contract, and you are paid on time",
  ],
} as const

export const assistantFaqs = [
  {
    question: "Is there a cost to join as a creator?",
    answer: "No — onboarding to the Andromeda creator network is completely free.",
  },
  {
    question: "How are creators vetted?",
    answer: "We look beyond follower count — matching by audience quality, content style, engagement, and category fit for each specific brand.",
  },
  {
    question: "What if I don't have a large following yet?",
    answer: "We work with creators of any size. What matters most is a real, engaged audience in a relevant niche.",
  },
  {
    question: "How long does a typical campaign take?",
    answer: "It depends on scope — a single-post campaign can be ready in days, while a fully managed multi-creator campaign is planned over a few weeks. We'll confirm exact timelines during the discovery call.",
  },
  {
    question: "Do brands and creators deal with each other directly?",
    answer: "No — Andromeda manages the relationship end-to-end, including the contract, briefing, and payment, so neither side has to chase the other.",
  },
] as const

export type AssistantView =
  | "home"
  | "brand"
  | "creator"
  | "services"
  | "process"
  | "process-brand"
  | "process-creator"
  | "contact"
  | "faq"
  | `faq-${number}`
