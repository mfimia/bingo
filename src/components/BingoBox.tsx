import { createTheme, ThemeProvider } from '@mui/material'
import { FC, useContext } from 'react'
import GameContext from '../context/GameContext'
import { GameContextType, IBingoBox } from '../types'
import MidBox from './MidBox'
import { experimentalStyled as styled, SxProps, Theme } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { blueGrey, green, grey, yellow } from '@mui/material/colors'

interface IProps {
  text: IBingoBox['text']
  crossed?: IBingoBox['crossed']
  id: IBingoBox['id']
  index: number
}

const bingoBoxStyle: SxProps<Theme> = {
  cursor: 'pointer',
  height: '100%',
  ':hover': {},
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: {
    xs: 64,
    sm: 96,
    md: 102,
  },
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  transition: theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.complex,
    easing: theme.transitions.easing.easeInOut,
  }),
}))

const fontTheme = createTheme()
fontTheme.typography.body2 = {
  fontFamily: 'Indie Flower',
  fontWeight: 600,
  fontSize: '0.6em',
  textAlign: 'center',
  [fontTheme.breakpoints.up('sm')]: {
    fontSize: '1em',
  },
  [fontTheme.breakpoints.up('md')]: {
    fontSize: '1.2em',
  },
}

const BingoBox: FC<IProps> = ({ text, crossed, id, index }) => {
  const gameContext = useContext(GameContext) as GameContextType
  const { toggleBox, midBoxLocation, completedSequences } = gameContext

  let backgroundColor: string = index % 2 === 0 ? yellow[50] : yellow[100]

  if (index === midBoxLocation) return <MidBox />

  bingoBoxStyle.textDecoration = crossed ? 'line-through' : 'normal'
  bingoBoxStyle.opacity = crossed ? 0.4 : 1
  bingoBoxStyle[':hover'] = { transform: crossed ? 'scale(1)' : 'scale(1.05)' }
  bingoBoxStyle.color = index % 2 === 0 ? blueGrey[300] : blueGrey[600]

  if (crossed) backgroundColor = grey[300]
  if (completedSequences.some((sequence) => sequence.some((box) => box.id === id))) backgroundColor = green[300]

  bingoBoxStyle.backgroundColor = backgroundColor

  return (
    <ThemeProvider theme={fontTheme}>
      <Item sx={bingoBoxStyle} onClick={() => toggleBox(id)} elevation={4}>
        {text}
      </Item>
    </ThemeProvider>
  )
}

export default BingoBox
