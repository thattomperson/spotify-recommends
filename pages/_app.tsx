import './global.css'
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

import { pink } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container'
import { SkeletonTheme } from 'react-loading-skeleton'

const theme = createMuiTheme({
  direction: 'ltr',
  palette: {
    background: {
      default: pink['A400'],
    },
  },
  typography: {
    h1: {
      fontSize: '3rem',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 300,
      lineHeight: 1.167,
      letterSpacing: '-0.01562em',
    },
    h4: {
      fontWeight: 300,
    }
  }
});

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <SkeletonTheme>
        <Container>
          <Component {...pageProps} />
        </Container>
      </SkeletonTheme>
    </ThemeProvider>
  )
}

export default MyApp
