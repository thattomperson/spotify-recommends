import { useRef } from 'react';
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
  const pathEl = useRef(null)

  let circleStyles = {};
  if (progress !== false) {
      const perimiter = 131
      circleStyles['strokeDasharray'] = perimiter.toFixed(3);
      circleStyles['strokeDashoffset'] = `${(((100 - progress) / 100) * perimiter).toFixed(3)}px`;

  }

  console.log(styles)

  return <div
    style={{width: size, height: size, ...style}}
    role="progressbar"
    className={`inline-block ${className} ${progress === false ? styles.indeterminate : styles.determinate}`}
  >
    <svg
      className={styles.svg}
      viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}
    >
      <rect
        ref={pathEl}
        className={`${styles.circle}`}
        style={circleStyles}
        stroke="currentColor"
        fill="none"
        rx={SIZE * .19}
        ry={SIZE * .19}
        // cx={SIZE}
        // cy={SIZE}
        x={(SIZE / 2) + thickness}
        y={(SIZE / 2) + thickness}
        width={SIZE - (thickness * 2)}
        height={SIZE - (thickness * 2)}
        strokeWidth={thickness}
      />
    </svg>
  </div>
}

function Stepper({ value, progress, steps }: StepperProps): JSX.Element {
  return <div className="flex justify-between relative min-w-max w-1/2  mx-auto">
    <div className="absolute h-1 bg-gray-300 top-3 left-4 right-5"></div>
    {steps.map((step, index) => {
      return <Step key={index} content={index + 1} {...step} active={value > index} progress={value == index ? progress : undefined} />
    })}
  </div>
}

function Step({label, content, active, progress}: StepProps) {
  return <div className="flex flex-col items-center">
    <div className={`border-accent ${active ? 'bg-accent text-white' : 'bg-white text-black'} border-2 font-bold rounded-md w-8 h-8 flex justify-center items-center z-10 relative`}>
      {content}
      { progress
        ? <div className="-inset-2 absolute text-accent">
          <SquareProgress size={44} progress={progress} />
        </div>
        : null
      }
    </div>
    {label}
  </div>
}

export default Stepper