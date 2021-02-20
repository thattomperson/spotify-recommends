import styles from './CircularProgress.module.css'

const SIZE = 44;

interface CircularProgressProps {
  className: string
  style: React.CSSProperties
  thickness: number
  size: number
}

export default function CircularProgress({
  thickness = 3.6,
  style = {},
  size = 40,
  className = ''
}: Partial<CircularProgressProps>) {

  return <div
    style={{width: size, height: size, ...style}}
    role="progressbar"
    className={`inline-block ${className}`}
  >
    <svg
      className={styles.svg}
      viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}
    >
      <circle
        className={styles.circle}
        stroke="currentColor"
        fill="none"
        cx={SIZE}
        cy={SIZE}
        r={(SIZE - thickness) / 2}
      />
    </svg>
  </div>
}