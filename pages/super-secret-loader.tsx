import Cover from "../components/Cover"
import { useEffect, useState } from "react"
import { PinkSpinner, FourSquare } from "../components/loaders"



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
    { label: State[4] },
  ]

  const [progress, setProgress] = useState(0);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (progress >= 100) {
        if (value === 4) {
          setValue(0)
        } else {
          setValue(value + 1)
        }
        setProgress(0)
      } else {
        setProgress(progress + 5)
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [progress, value]);


  console.log({progress})
  return <Cover className="bg-white">
    <div className="flex flex-col space-y-5 w-full mx-auto">
      <PinkSpinner value={value} progress={progress} steps={steps} />
      <FourSquare value={value} progress={progress} steps={steps} />
    </div>
  </Cover>
}

export default LoaderPage