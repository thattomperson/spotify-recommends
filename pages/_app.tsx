import { Provider } from 'react-redux'
import store from '../util/store'
import {
  createMuiTheme,
  makeStyles,
  createStyles,
  ThemeProvider,
  Theme
} from '@material-ui/core/styles';

import { pink } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container'

const theme = createMuiTheme({
  direction: 'ltr',
  palette: {
    background: {
      default: pink['A400'],
    }
  }
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      margin: 0,
      padding: 0,
    },
    root: {
      backgroundColor: theme.palette.background.default,
    },
  }),
);


function AppContainer({ children }) {
  const classes = useStyles();
  document.body.className = classes.body
  return <div className={classes.root}>{children}</div>;
}


const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AppContainer>
          <Container>
            <Component {...pageProps} />
          </Container>
        </AppContainer>
      </Provider>
    </ThemeProvider>
  )
}

export default MyApp


