import { assistantServices } from './chatbot-content'

// Set only after Andromeda's official recipient has been confirmed.
export const intakeConfig = { recipient: '' }
export type Role = 'brand' | 'creator'
export type Answers = Record<string, string | string[]>
export type Question = { id: string; label: string; question: string; options?: readonly string[]; multiple?: boolean; optional?: boolean }
export const chatFlows: Record<Role, Question[]> = {
  brand: [
    { id: 'name', label: 'Brand Name', question: 'What’s your brand name?' },
    { id: 'category', label: 'Category', question: 'What category is your brand in?', options: ['Food & Beverage', 'Beauty & Personal Care', 'Fashion & Retail', 'E-commerce', 'Real Estate', 'Lifestyle', 'Other'] },
    { id: 'goal', label: 'Goal', question: 'What’s your main goal?', options: ['Brand awareness', 'Product launch', 'Sales & conversions', 'Ongoing content', 'Other'] },
    { id: 'services', label: 'Selected Services', question: 'Which services are you interested in?', options: assistantServices, multiple: true },
    { id: 'creators', label: 'Number of Creators', question: 'How many creators are you thinking?', options: ['Just one', 'A few', 'A full campaign', 'Not sure yet'] },
    { id: 'notes', label: 'Additional Notes', question: 'Anything else you’d like us to know?', optional: true },
  ],
  creator: [
    { id: 'name', label: 'Name', question: 'What’s your name?' },
    { id: 'platform', label: 'Platform', question: 'What’s your main platform?', options: ['Instagram', 'TikTok', 'Snapchat', 'More than one'] },
    { id: 'niche', label: 'Niche', question: 'What’s your content niche?', options: ['Food', 'Beauty', 'Fashion', 'Lifestyle', 'Other'] },
    { id: 'followers', label: 'Follower Range', question: 'What’s your follower range?', options: ['Under 5K', '5K–20K', '20K–100K', '100K+'] },
    { id: 'notes', label: 'Additional Notes', question: 'Anything else you’d like us to know?', optional: true },
  ],
}
export const displayAnswer = (value: string | string[] | undefined) => Array.isArray(value) ? value.join(', ') : value || 'Not provided'
export function prepareEmail(role: Role, answers: Answers, recipient = intakeConfig.recipient) {
  const name = displayAnswer(answers.name)
  const subject = role === 'brand' ? `Campaign Enquiry — ${name}` : `Creator Application — ${name}`
  const notes = displayAnswer(answers.notes)
  const body = role === 'brand'
    ? `Hi Andromeda Team,\n\nI’d like to discuss a campaign with Andromeda.\n\nBrand Name: ${name}\nCategory: ${displayAnswer(answers.category)}\nCampaign Goal: ${displayAnswer(answers.goal)}\n\nServices I’m interested in:\n${(Array.isArray(answers.services) ? answers.services : []).map(s => `- ${s}`).join('\n')}\n\nNumber of Creators: ${displayAnswer(answers.creators)}\n\nAdditional Notes:\n${notes}\n\nBest,`
    : `Hi Andromeda Team,\n\nName: ${name}\nPlatform: ${displayAnswer(answers.platform)}\nNiche: ${displayAnswer(answers.niche)}\nFollower Range: ${displayAnswer(answers.followers)}\n\nAdditional Notes:\n${notes}\n\nBest,\n${name}`
  return { subject, body, href: `mailto:${encodeURIComponent(recipient.trim())}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` }
}
