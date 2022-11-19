import { Box, SxProps, Theme, Typography } from '@mui/material'
import { FC } from 'react'

const containerStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 64,
}

const MidBox: FC = () => (
  <Box sx={containerStyle}>
    <Typography textAlign={'center'} fontSize={{ xs: '2rem', sm: '4rem' }}>
      👨‍💻
    </Typography>
  </Box>
)

export default MidBox
