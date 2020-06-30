import { useDispatch } from 'react-redux'
import useInterval from '../util/hooks/useInterval'

import { refresh } from '../util/store/slices/songs'

import RecentlyPlayedList from '../components/RecentlyPlayedList'


const IndexPage = () => {
  const dispatch = useDispatch()

  dispatch(refresh())
  useInterval(() => {
    dispatch(refresh())
  }, 10000)

  return (
    <>
      <RecentlyPlayedList />
    </>
  )
}

export default IndexPage

