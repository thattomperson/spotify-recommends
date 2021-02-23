import styles from './CircularProgress.module.css'

const SIZE = 44;

interface CircularProgressProps {
  className: string
  style: React.CSSProperties
  thickness: number
  size: number|string
  progress?: number|false
}

export default function CircularProgress({
  thickness = 3.6,
  style = {},
  size = '1em',
  className = '',
  progress = false
}: Partial<CircularProgressProps>) {
  let circleStyles = {};
  if (progress !== false) {
    const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
    circleStyles['strokeDasharray'] = circumference.toFixed(3);
    circleStyles['strokeDashoffset'] = `${(((100 - progress) / 100) * circumference).toFixed(3)}px`;

    console.log({circleStyles})
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
      <circle
        className={`${styles.circle}`}
        style={circleStyles}
        stroke="currentColor"
        fill="none"
        cx={SIZE}
        cy={SIZE}
        r={(SIZE - thickness) / 2}
        strokeWidth={thickness}
      />
    </svg>
  </div>
}