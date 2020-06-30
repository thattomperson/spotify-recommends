import { Provider } from 'react-redux'
import store from '../util/store'

import '../styles/global.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp