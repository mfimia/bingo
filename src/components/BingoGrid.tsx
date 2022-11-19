import { Dispatch, FC, SetStateAction, useContext, useEffect, useRef } from 'react'
import Grid from '@mui/material/Grid'
import BingoBox from './BingoBox'
import GameContext from '../context/GameContext'
import { GameContextType } from '../types'

interface IProps {
  setWinAlert: Dispatch<SetStateAction<boolean>>
}

const BingoGrid: FC<IProps> = ({ setWinAlert }) => {
  const gameContext = useContext(GameContext) as GameContextType
  const { bingoBoxes, bingoSize, bingoSizeNumber, bingoFound, resetGame, checkBingoFound, generateWinSequences } =
    gameContext

  const isFirstRender = useRef(true)

  useEffect(() => {
    if (!isFirstRender.current) checkBingoFound()
  }, [bingoBoxes])

  useEffect(() => {
    isFirstRender.current ? (isFirstRender.current = false) : resetGame()
  }, [bingoSize])

  useEffect(() => {
    generateWinSequences()
  }, [bingoBoxes.length])

  useEffect(() => {
    if (bingoFound) setWinAlert(true)
  }, [bingoFound])

  return (
    <Grid
      spacing={{
        xs: 0,
        sm: 1,
      }}
      container
    >
      {bingoBoxes.map((box, index) => (
        <Grid key={box.id} item xs={12 / bingoSizeNumber}>
          <BingoBox {...box} index={index} />
        </Grid>
      ))}
    </Grid>
  )
}

export default BingoGrid
