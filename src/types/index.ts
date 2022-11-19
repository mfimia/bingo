import { BingoSizes } from '../utils/constants'

export interface IBingoBox {
  text: string
  crossed: boolean
  id: number
}

export type GameContextType = {
  bingoSize: BingoSizes
  bingoBoxes: IBingoBox[]
  midBoxLocation: number
  bingoSizeNumber: number
  bingoFound: boolean
  gameRunning: boolean
  displaySentence: string
  completedSequences: IBingoBox[][]
  toggleBox: (id: IBingoBox['id']) => void
  setBingoSize: React.Dispatch<React.SetStateAction<BingoSizes>>
  checkBingoFound: () => void
  generateWinSequences: () => void
  startGame: () => void
  pauseGame: () => void
  resetGame: () => void
  clearCurrentRotation: () => void
  startBingoRotation: () => void
}

export type AppModesType = 'light' | 'dark'
