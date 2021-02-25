import CircularProgress from "../CircularProgress"

function Stepper({ value, progress, steps }: StepperProps): JSX.Element {
  return <div className="flex justify-between relative min-w-max w-1/2 mx-auto">
    <div className="absolute h-1 bg-gray-300 top-3 left-4 right-5"></div>
    {steps.map((step, index) => {
      return <Step key={index} content={index + 1} {...step} active={value > index} progress={value == index ? progress : undefined} />
    })}
  </div>
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

export default Stepper