import { Box, Paper, ThemeProvider, SxProps, Theme } from '@mui/material'
import { Container } from '@mui/system'
import { FC } from 'react'
import BingoGrid from './components/BingoGrid'
import BingoSizeSelect from './components/BingoSizeSelect'
import ModeToggler from './components/ModeToggler'
import GameState from './context/GameState'
import CssBaseline from '@mui/material/CssBaseline'
import { useDarkMode } from './hooks/useDarkMode'
import { useWinAlert } from './hooks/useWinAlert'
import BingoAlert from './components/BingoAlert'
import BingoScreen from './components/BingoScreen'

const panelStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: {
    xs: 'space-around',
  },
  mb: 4,
  alignItems: 'center',
  flexDirection: {
    xs: 'column-reverse',
    sm: 'row',
  },
}

const paperStyle: SxProps<Theme> = {
  p: 4,
  maxWidth: 'md',
  m: 'auto',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'light',
}

const App: FC = () => {
  const { mode, theme, toggleColorMode } = useDarkMode()
  const { winAlert, setWinAlert, handleClose } = useWinAlert()

  paperStyle.backgroundColor = mode === 'light' ? 'rgba(255,253,231,0.5)' : ''

  return (
    <GameState>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container sx={{ p: 4, backgroundColor: theme.palette.background.paper }}>
          <BingoAlert winAlert={winAlert} handleClose={handleClose} />
          <Paper sx={paperStyle} elevation={12}>
            <Box sx={panelStyle}>
              <BingoSizeSelect />
              <BingoScreen />
              <ModeToggler mode={mode} toggleColorMode={toggleColorMode} />
            </Box>
            <BingoGrid setWinAlert={setWinAlert} />
          </Paper>
        </Container>
      </ThemeProvider>
    </GameState>
  )
}

export default App
