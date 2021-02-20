interface SkeletonProps {
  width: number|string
  height: number|string
  count: number
  className: string
}

export default function Skeleton({
  width = '100%',
  height = 24,
  count = 1,
  className = ''
}: Partial<SkeletonProps>) {
  return count > 0
  ? <span
    className={`skeleton dark:skeleton ${className}`}
    style={{
      width,
      height,
    }}
  />
  : <span className="block space-y-1">
    {Array(count).fill(null).map((item, index) => <span
      key={index}
      className={`skeleton dark:skeleton ${className}`}
      style={{
        width,
        height,
      }}
    />)}
  </span>
}