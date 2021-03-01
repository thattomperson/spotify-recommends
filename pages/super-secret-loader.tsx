import Cover from "../components/Cover"
import { useEffect, useState } from "react"
import { FourSquare, Segmented, Segmented2 } from "../components/loaders"



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
    <div className="h-screen relative">
    <Cover className="bg-white"><FourSquare {...props} /></Cover>
    </div>
    <div className="h-screen relative">
    <Cover className="bg-white"><Segmented {...props} steps={segmentedSteps} /></Cover>
    </div>
    <div className="h-screen relative">
    <Cover className="bg-white"><Segmented2 {...props} steps={segmentedSteps} /></Cover>
    </div>
  </div>
}

export default LoaderPage