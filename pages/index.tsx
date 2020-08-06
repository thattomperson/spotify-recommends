import { useDispatch } from 'react-redux'
import useInterval from '../util/hooks/useInterval'
import { signIn, signOut, useSession } from 'next-auth/client'

import { refresh } from '../util/store/slices/songs'

import RecentlyPlayedList from '../components/RecentlyPlayedList'
import Grid from '@material-ui/core/Grid'


const IndexPage = () => {
  const [ session, loading ] = useSession()

  const dispatch = useDispatch()

  dispatch(refresh())
  useInterval(() => {
    dispatch(refresh())
  }, 10e3)
  return <>
    {!session && <>
      Not signed in <br/>
      <button onClick={signIn}>Sign in</button>
    </>}
    {session && <>
      <Grid container spacing={5}>
        <Grid item>
          <RecentlyPlayedList />
        </Grid>
        <Grid item>
          <RecentlyPlayedList />
        </Grid>
      </Grid>
    </>}
  </>



  // return (
  //   <>
  //     <RecentlyPlayedList />
  //   </>
  // )
}

export default IndexPage

