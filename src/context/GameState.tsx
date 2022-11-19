import { useState, ReactNode, useEffect } from 'react'
import { FC } from 'react'
import { BINGO_PHRASES } from '../data/phrases'
import { useBingo } from '../hooks/useBingo'
import GameContext from './GameContext'

interface IProps {
  children: ReactNode
}

const GameState: FC<IProps> = ({ children }) => {
  const [gameRunning, setGameRunning] = useState(false)
  const [bingoRestarted, setBingoRestarted] = useState(false)
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null)
  const [sentencesPool, setSentencesPool] = useState(BINGO_PHRASES)
  const [displaySentence, setDisplaySentence] = useState('')

  const {
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
  } = useBingo()

  const rotateSentences = () => {
    if (sentencesPool.length > 0) {
      const randomSentence = sentencesPool[Math.floor(Math.random() * sentencesPool.length)]
      setDisplaySentence(randomSentence)
      setSentencesPool((prev) => prev.filter((sentence) => sentence !== randomSentence))
    } else {
      // restart rotation
      resetGame()
      startGame()
    }
  }

  const startGame = () => {
    if (!gameRunning) rotateSentences()
    setGameRunning(true)
  }

  const pauseGame = () => {
    setGameRunning(false)
  }

  const resetGame = () => {
    setGameRunning(false)
    setSentencesPool(BINGO_PHRASES)
    setDisplaySentence('')
    initializeBingo()
    setBingoRestarted(true)
  }

  const startBingoRotation = () => {
    const currentInterval = setInterval(() => {
      rotateSentences()
    }, 3000)
    setIntervalId(currentInterval)
  }

  const clearCurrentRotation = () => {
    if (intervalId) clearInterval(intervalId)
  }

  useEffect(() => {
    if (bingoRestarted) {
      generateWinSequences()
      setBingoRestarted(false)
    }
  }, [bingoRestarted])

  return (
    <GameContext.Provider
      value={{
        bingoSize,
        bingoBoxes,
        midBoxLocation,
        bingoSizeNumber,
        bingoFound,
        completedSequences,
        gameRunning,
        displaySentence,
        startGame,
        pauseGame,
        resetGame,
        startBingoRotation,
        clearCurrentRotation,
        toggleBox,
        setBingoSize,
        checkBingoFound,
        generateWinSequences,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export default GameState
