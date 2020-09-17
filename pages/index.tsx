import { signIn, useSession } from 'next-auth/client'

import RecentlyPlayedList from '../components/RecentlyPlayedList'
import RecommendList from '../components/RecommendList'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loginContainer: {
      height: '100vh'
    },
    loginModal: {
      position: 'relative',
      /* ↓ Push the element down 50% of the parent */
      top: '50%',
      /* ↓ Then adjust it by 50% of its own height */
      transform: 'translateY(-50%)',
      textAlign: 'center'
    }
  })
)

const IndexPage = () => {
  const [ session, loading ] = useSession()
  const [basedOn, setBasedOn] = useState(null)

  const styles = useStyles()
  
  return <>
    {!session &&
      <div class={styles.loginContainer}>
        <div class={styles.loginModal}>
          <Button variant="contained" onClick={signIn}>Sign in</Button>
        </div>
      </div>
    }
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

