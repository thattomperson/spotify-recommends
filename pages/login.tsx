import Head from 'next/head'
import { useState } from 'react';
import { useInterval } from '../util/hooks'


const Home = () => {
  const [loading, setLoading] = useState(false)

  useInterval(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, 15000)

  return <>
    <Head>
      <title>Login</title>
    </Head>
    
  </>
}

export default Home
