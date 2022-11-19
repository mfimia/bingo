import { Box, Button, Paper, SxProps, Theme, Typography } from '@mui/material'
import { blue, green, pink, purple, red } from '@mui/material/colors'
import { FC, useContext, useEffect, useState } from 'react'
import GameContext from '../context/GameContext'
import { GameContextType } from '../types'

const textStyle: SxProps<Theme> = {
  fontFamily: 'Indie Flower',
  fontWeight: 600,
  textAlign: 'center',
  fontSize: { xs: '1rem', sm: '1.4rem' },
  px: 2,
  width: {
    xs: 200,
    sm: 300,
    md: 360,
  },
  height: {
    xs: 50,
    sm: 80,
  },
}
const buttonStyle: SxProps<Theme> = { fontSize: { xs: '0.7rem', sm: '1rem' } }
const containerStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  p: 1,
  m: {
    xs: 1,
    sm: 0,
  },
}
const textColors = [green[300], red[300], blue[300], pink[300], purple[300]]

const BingoScreen: FC = () => {
  const gameContext = useContext(GameContext) as GameContextType
  const { gameRunning, displaySentence, startGame, pauseGame, resetGame, startBingoRotation, clearCurrentRotation } =
    gameContext
  const [textColor, setTextColor] = useState('')
  useEffect(() => {
    setTextColor(textColors[Math.floor(Math.random() * textColors.length)])
  }, [displaySentence])

  const buttons = [
    { name: 'play', action: startGame },
    { name: 'pause', action: pauseGame },
    { name: 'reset', action: resetGame },
  ]

  const sentenceVisible = displaySentence ? 'visible' : 'hidden'
  const currentSentence = displaySentence.includes('*') ? displaySentence : `"${displaySentence}"`

  useEffect(() => {
    gameRunning ? startBingoRotation() : clearCurrentRotation()
    return () => clearCurrentRotation()
  }, [gameRunning])

  return (
    <Paper elevation={2} sx={containerStyle}>
      <Box>
        {buttons.map(({ name, action }) => (
          <Button key={name} size="small" sx={buttonStyle} onClick={action}>
            {name}
          </Button>
        ))}
      </Box>
      <Typography color={textColor} visibility={sentenceVisible} mt={2} sx={textStyle}>
        {currentSentence}
      </Typography>
    </Paper>
  )
}

export default BingoScreen
