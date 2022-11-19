import { useState } from 'react'
import { BINGO_PHRASES } from '../data/phrases'
import { IBingoBox } from '../types'
import { BingoSizes } from '../utils/constants'
import { initializeBingoBoxes, shuffle } from '../utils/helpers'

export const useBingo = () => {
  const [bingoSize, setBingoSize] = useState(BingoSizes.Medium)
  const bingoSizeNumber = parseInt(bingoSize)
  const [bingoBoxes, setBingoBoxes] = useState(initializeBingoBoxes(shuffle(BINGO_PHRASES, bingoSizeNumber)))
  const [winSequences, setWinSequences] = useState<IBingoBox[][]>([])
  const [completedSequences, setCompletedSequences] = useState<IBingoBox[][]>([])
  const [bingoFound, setBingoFound] = useState(false)

  const generateWinSequences = () => {
    const winSequences: IBingoBox[][] = []
    const firstDiagonal: IBingoBox[] = []
    const secondDiagonal: IBingoBox[] = []

    for (let i = 0; i < bingoSizeNumber; i++) {
      // rows
      winSequences.push(bingoBoxes.slice(i * bingoSizeNumber, i * bingoSizeNumber + bingoSizeNumber))
      // columns
      winSequences.push(bingoBoxes.filter((_, index) => index % bingoSizeNumber === i))

      firstDiagonal.push(bingoBoxes.find((_, index) => index === bingoSizeNumber * i + i) as IBingoBox)
      secondDiagonal.push(
        bingoBoxes.find((_, index) => index === bingoSizeNumber * i + (bingoSizeNumber - i - 1)) as IBingoBox,
      )
    }

    winSequences.push(firstDiagonal, secondDiagonal)

    setWinSequences(winSequences)
  }

  const toggleBox = (id: IBingoBox['id']) => {
    if (completedSequences.length > 0) {
      const revertedSequence = completedSequences.filter((sequence) => sequence.some((box) => box.id === id))
      if (revertedSequence.length > 0) {
        const revertedIndexes: number[] = []
        revertedSequence.forEach((sequence) => {
          setWinSequences((prev) => [...prev, sequence])
          const index = completedSequences.indexOf(sequence)
          revertedIndexes.push(index)
        })
        const filteredCompletedSequences = completedSequences.filter((_, i) => !revertedIndexes.includes(i))
        setCompletedSequences(filteredCompletedSequences)
      }
    }
    setBingoBoxes((prev) => prev.map((box) => (box.id === id ? { ...box, crossed: !box.crossed } : box)))
    setWinSequences((prev) =>
      prev.map((sequence) => sequence.map((b) => (b.id === id ? { ...b, crossed: !b.crossed } : b))),
    )
  }

  const initializeBingo = () => {
    setBingoBoxes(initializeBingoBoxes(shuffle(BINGO_PHRASES, bingoSizeNumber)))
    setCompletedSequences([])
  }

  const checkBingoFound = () => {
    const foundSequences = winSequences.filter((sequence) => sequence.every((box) => box.crossed))
    if (foundSequences.length > 0) {
      foundSequences.forEach((sequence) => {
        setCompletedSequences((prev) => [...prev, sequence])
      })
      setBingoFound(true)
      const leftSequences = winSequences.filter((sequence) => !sequence.every((box) => box.crossed))
      setWinSequences(leftSequences)
    }
    if (bingoFound) setBingoFound(false)
  }

  const midBoxLocation = Math.floor(Math.pow(bingoSizeNumber, 2) / 2)

  return {
    bingoSize,
    bingoBoxes,
    midBoxLocation,
    bingoSizeNumber,
    bingoFound,
    completedSequences,
    toggleBox,
    setBingoSize,
    checkBingoFound,
    initializeBingo,
    generateWinSequences,
  }
}
