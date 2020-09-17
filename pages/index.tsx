import { signIn, useSession } from 'next-auth/client'

import RecentlyPlayedList from '../components/RecentlyPlayedList'
import RecommendList from '../components/RecommendList'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useState } from 'react'


const IndexPage = () => {
  const [ session, loading ] = useSession()
  const [basedOn, setBasedOn] = useState(null)
  
  return <>
    {!session && <>
      Not signed in <br/>
      <button onClick={signIn}>Sign in</button>
    </>}
    {session && <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <RecentlyPlayedList onRecommend={setBasedOn}/>
        </Grid>
        <Grid item xs={6}>
          <RecommendList basedOn={basedOn} onRecommend={setBasedOn}/>
        </Grid>
      </Grid>
      <Typography variant="h4" align="center">made with ❤️ by ttp</Typography>
    </>}
  </>
}

export default IndexPage

