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
    <Pagi page={1} first />
    </div>
    <div className="h-screen relative border-t-2 border-gray-400" id="l2">
    <Cover className="bg-white"><Segmented {...props} steps={segmentedSteps} /></Cover>
    <Pagi page={2} />
    </div>
    <div className="h-screen relative border-t-2 border-gray-400" id="l3">
    <Cover className="bg-white"><Segmented2 {...props} steps={segmentedSteps} /></Cover>
    <Pagi page={3} />
    </div>
    <div className="h-screen relative border-t-2 border-gray-400" id="l4">
    <Cover className="bg-white"><Segmented3 {...props} steps={segmentedSteps} /></Cover>
    <Pagi page={4} last />
    </div>
  </div>
}

export default LoaderPage

function Pagi({ page, first, last }: { page: number, first?: boolean, last?: boolean }) {
  return <div className="text-center absolute bottom-0 right-0 left-0 mx-auto z-10">
    { first
      ? <span className="text-gray-200 inline-block p-2 m-1 border-gray-100 border-solid border-2">Prev</span>
      : <a href={`#l${page - 1}`} className="text-gray-500 inline-block p-2 m-1 border-gray-100 border-solid border-2">Prev</a>}
    <span className="text-gray-500 inline-block p-2 m-1 border-gray-100 border-solid border-2">{page}</span>
    { last
      ? <span className="text-gray-200 inline-block p-2 m-1 border-gray-100 border-solid border-2">Next</span>
      : <a href={`#l${page + 1}`}  className="text-gray-500 inline-block p-2 m-1 border-gray-100 border-solid border-2">Next</a>}
  </div>
}
