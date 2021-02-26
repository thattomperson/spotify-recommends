

const Segment = ({ progress }: StepProps) => {
  return <div className="h-2 bg-gray-300 flex-grow justify-between">
    <div className="bg-green-500 h-2" style={{width: `${progress}%`} }></div>
  </div>
}

export default function Segmented({ steps, progress, value }: StepperProps) {
  return <div className="w-1/2 mx-auto">
    <div className="flex space-x-2 ">
    {steps.map((props, index) => <Segment progress={value > index ? 100 : value === index ? progress : 0} {...props}/>)}
    </div>
    <div className="text-black mt-2 text-xs">{steps[value].label}</div>
  </div>
}