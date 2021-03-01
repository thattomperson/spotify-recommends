import styles from './SquareProgress.module.css'

const SIZE = 44;

interface SquareProgressProps {
  className: string
  style: React.CSSProperties
  thickness: number
  size: number|string
  progress?: number|false
}

function SquareProgress({
  thickness = 3,
  style = {},
  size = '1em',
  className = '',
  progress = false
}: Partial<SquareProgressProps>) {
  let circleStyles = {};
  if (progress !== false) {
    const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
    circleStyles['strokeDasharray'] = circumference.toFixed(3);
    circleStyles['strokeDashoffset'] = `${(((100 - progress) / 100) * circumference).toFixed(3)}px`;
    circleStyles['transform'] = `rotate(45, ${SIZE / 2}, ${SIZE / 2})`
  }

  return <div
    style={{width: size, height: size, ...style}}
    role="progressbar"
    className={`inline-block ${className} ${progress === false ? styles.indeterminate : styles.determinate}`}
  >
    <svg
      className={styles.svg}
      viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}
    >
      <mask id="myMask">
        <rect
          fill="black"
          rx={SIZE * .19}
          ry={SIZE * .19}
          x={(SIZE / 2) + thickness}
          y={(SIZE / 2) + thickness}
          width={SIZE - (thickness * 2)}
          height={SIZE - (thickness * 2)}
          stroke="white"
          strokeWidth={thickness}
        />
      </mask>
      <g mask="url(#myMask)">
        <circle
          className={`${styles.circle}`}
          style={circleStyles}
          cx={SIZE}
          cy={SIZE}
          r={(SIZE - thickness) / 2}
          fill="none"
          stroke="currentColor"
          strokeWidth={20}
        />
      </g>
    </svg>
  </div>
}

function Stepper({ value, progress, steps }: StepperProps): JSX.Element {
  const whatsUp = {
    0: 'Waiting in the queue',
    1: 'Collecting all of your data',
    2: 'Processing your data',
    3: 'Creating your output formats',
  }

  return <div className="flex w-1/2 mx-auto space-x-4">
    <div className="flex-grow" style={{fontFamily: 'Titillium Web'}}>
      <div className="font-bold" style={{color: 'rgb(101, 101, 101)'}}>Generating Report</div>
      <div className="font-slim" style={{color: 'rgb(101, 101, 101)'}}>Please wait...</div>
      <div className="flex  mt-4 justify-between relative">
        <div className="absolute bg-gray-300 left-4 right-5" style={{height: '2px', top: '16px'}}></div>
        {steps.map((step, index) => {
          return <Step key={index} content={index + 1} {...step} active={value > index} progress={value == index ? progress : undefined} />
        })}
      </div>
      <div className="mt-2 text-xs lowercase" style={{color: 'rgb(101, 101, 101)'}}>{whatsUp[value]}</div>
    </div>
  </div>
}

function Step({label, content, active, progress}: StepProps) {
  return <div className="flex  space-y-2 flex-col items-center" style={{fontFamily: 'Titillium Web'}}>
    <div className={`border-accent ${active ? 'bg-accent text-white' : 'bg-white text-black'} border-2 font-bold rounded-md w-8 h-8 flex justify-center items-center z-10 relative`}>
      {content}
      { progress
        ? <div className="-inset-2 absolute text-accent">
          <SquareProgress size={44} progress={progress} />
        </div>
        : null
      }
    </div>
    <span style={{color: 'rgb(101, 101, 101)'}}>{label}</span>
  </div>


}

export default Stepper