import { useDispatch } from 'react-redux'

import Clock from '../components/Clock'
import Counter from '../components/Counter'
import { tick } from '../util/store/slices/clock'
import useInterval from '../util/hooks/useInterval'

const IndexPage = () => {
  const dispatch = useDispatch()
  // Tick the time every second
  useInterval(() => {
    dispatch(tick({ light: true, lastUpdate: Date.now() }))
  }, 1000)

  return (
    <>
      <Clock />
      <Counter />
    </>
  )
}

export default IndexPage

