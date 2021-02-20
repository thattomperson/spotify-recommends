import { useState } from "react";
import CircularProgress from './CircularProgress'

interface IconButtonProps {
  color?: string,
  className?: string
  style?: React.CSSProperties,
  'aria-label'?: string
  children: JSX.Element
  onClick?: () => Promise<any>
}


const IconButton = (props: IconButtonProps) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    try {
      await props.onClick()
    } finally {
      setLoading(false);
    }
  }

  return <button style={props.style} className={`p-3 flex flex-grow-0 flex-shrink-0 text-2xl rounded-full text-center ${props.className}`} onClick={onClick}>
    { loading
      ? <CircularProgress size={20} />
      : props.children
    }
  </button>
}

export default IconButton;