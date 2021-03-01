import Cog from "./cog"
import styles from './Segmented.module.css'

const Segment = ({ progress }: StepProps) => {
  return <div className="bg-gray-300 flex-grow justify-between h-4">
    <div className="bg-green-500 h-4" style={{width: `${progress}%`} }></div>
  </div>
}

export default function Segmented({ steps, progress, value }: StepperProps) {
  const whatsUp = {
    0: 'Waiting in the queue',
    1: 'Collecting all of your data',
    2: 'Processing your data',
    3: 'Creating your output formats',
  }


  return <>
    <div className="flex w-1/2 mx-auto space-x-4">
      <div className="w-20">
        <Cog className={styles.rotate}/>
      </div>
      <div className="flex-grow" style={{fontFamily: 'Titillium Web'}}>
        <div className="font-bold" style={{color: 'rgb(101, 101, 101)'}}>Generating Report</div>
        <div className="font-slim" style={{color: 'rgb(101, 101, 101)'}}>Please wait...</div>
        <div className="flex space-x-2 mt-4">
        {steps.map((props, index) => <Segment progress={value > index ? 100 : value === index ? progress : 0} {...props}/>)}
        </div>
        <div className="text-back mt-2 text-xs"><span className="text-green-500 font-bold">{steps[value].label}</span><span className="lowercase text-gray-500">: {whatsUp[value]}</span></div>
      </div>
    </div>
  </>
}