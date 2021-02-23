import Cover from "../components/Cover"
import CircularProgress from "../components/CircularProgress"
import { useEffect, useState } from "react"

interface StepperProps {
  value: number,
  progress: number,
  steps: StepProps[]
}

function Stepper({ value, progress, steps }: StepperProps): JSX.Element {
  return <div className="flex justify-between relative min-w-max w-1/2">
    <div className="absolute h-1 bg-black top-3 left-4 right-5"></div>
    {steps.map((step, index) => {
      return <Step content={index + 1} {...step} active={value >= index} progress={value == index ? progress : undefined} />
    })}
  </div>
}

interface StepProps {
  label: string,
  content?: number|string|JSX.Element
  progress?: number
  active?: boolean
}

function Step({label, content, active, progress}: StepProps) {
  return <div className="flex flex-col items-center">
    <div className={`border-accent ${active ? 'bg-accent text-white' : 'bg-white text-black'} border-2 font-bold rounded-full w-8 h-8 flex justify-center items-center z-10 relative`}>
      {content}
      { progress
        ? <div className="-inset-2 absolute text-accent">
          <CircularProgress size={44} progress={progress} />
        </div>
        : null
      }
    </div>
    {label}
  </div>
}


enum State {
  "Pending",
  "Collecting",
  "Processing",
  "Outputing",
  "Complete",
}

const LoaderPage = () => {
  const steps: StepProps[] = [
    { label: State[0] },
    { label: State[1] },
    { label: State[2] },
    { label: State[3] },
    { label: State[4] },
  ]

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (progress >= 100) {
        setProgress(0)
      } else {
        setProgress(progress + 10)
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [progress]);


  console.log({progress})
  return <Cover className="bg-white">
    <Stepper value={2} progress={progress} steps={steps} />
  </Cover>
}

export default LoaderPage