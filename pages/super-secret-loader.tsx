import Cover from "../components/Cover"
import { useEffect, useState } from "react"
import { FourSquare, Segmented, Segmented2, Segmented3 } from "../components/loaders"



enum State {
  "Pending",
  "Collecting",
  "Processing",
  "Outputing",
  "Complete",
}

const LoaderPage = () => {
  const steps = [
    { label: State[0] },
    { label: State[1] },
    { label: State[2] },
    { label: State[3] },
  ]

  const segmentedSteps = [
    { label: State[0] },
    { label: State[1] },
    { label: State[2] },
    { label: State[3] },
  ]

  const [progress, setProgress] = useState(50);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (progress >= 100) {
        if (value === 3) {
          setValue(0)
        } else {
          setValue(value + 1)
        }
        setProgress(0)
      } else {
        setProgress(Math.min(progress + (Math.random() * 20), 100))
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [progress]);
  const props = {value, progress, steps}

  return <div>
    {/* <div className="h-screen relative">
      <Cover className="bg-white"><PinkSpinner {...props} /></Cover>
    </div> */}
    <div className="h-screen relative" id="l1">
    <Cover className="bg-white"><FourSquare {...props} /></Cover>
    <Next to="#l2" />
    </div>
    <div className="h-screen relative border-t-2 border-gray-400" id="l2">
    <Prev to="#l1" />
    <Cover className="bg-white"><Segmented {...props} steps={segmentedSteps} /></Cover>
    <Next to="#l3" />
    </div>
    <div className="h-screen relative border-t-2 border-gray-400" id="l3">
    <Prev to="#l2" />
    <Cover className="bg-white"><Segmented2 {...props} steps={segmentedSteps} /></Cover>
    <Next to="#l4" />
    </div>
    <div className="h-screen relative border-t-2 border-gray-400" id="l4">
    <Prev to="#l3" />
    <Cover className="bg-white"><Segmented3 {...props} steps={segmentedSteps} /></Cover>
    </div>
  </div>
}

export default LoaderPage

function Prev({ to }) {
  return <div className="text-center absolute top-0 right-0 left-0 mx-auto z-10">
    <a href={to} className="text-gray-500 inline-block p-2 m-1 border-gray-100 border-solid border-2">Prev</a>
  </div>
}
function Next({ to }) {
  return <div className="text-center absolute bottom-0 right-0 left-0 mx-auto z-10">
    <a href={to} className="text-gray-500 inline-block p-2 m-1 border-gray-100 border-solid border-2">Next</a>
  </div>
}