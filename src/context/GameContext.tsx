import { createContext } from 'react'
import { GameContextType as GameContextType } from '../types'

const GameContext = createContext<GameContextType | null>(null)

export default GameContext
