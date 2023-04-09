import { randomIdeas } from '../constants'

export const getRandomPrompt = (prompt: string): string => {
  const randomIdx = Math.floor(Math.random() * randomIdeas.length)
  const randomPrompt = randomIdeas[randomIdx]

  if (randomPrompt === prompt) {
    return getRandomPrompt(prompt)
  }
  return randomPrompt
}
