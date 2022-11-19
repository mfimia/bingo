import { IBingoBox } from '../types'

interface IBingoSentence {
  sentence: string
  id: number
}

export const shuffle = (sentences: string[], size: number): IBingoSentence[] => {
  let n = Math.pow(size, 2)
  const midBox = Math.floor(n / 2)
  const result: IBingoSentence[] = new Array(n)
  let len = sentences.length
  const taken: number[] = new Array(len)

  while (n--) {
    if (n === midBox) {
      result[n] = { sentence: '', id: midBox }
      const x = midBox
      taken[x] = --len in taken ? taken[len] : len
      continue
    }
    let x = Math.floor(Math.random() * len)
    while (x === midBox) x = Math.floor(Math.random() * len)
    result[n] = { sentence: sentences[x in taken ? taken[x] : x], id: x in taken ? taken[x] : x }
    taken[x] = --len in taken ? taken[len] : len
  }
  return result
}

export const initializeBingoBoxes = (sentences: IBingoSentence[]): IBingoBox[] =>
  sentences.map(({ sentence: text, id }) => ({
    text,
    crossed: id === Math.floor(sentences.length / 2),
    id: id + 1,
    completed: false,
  }))
