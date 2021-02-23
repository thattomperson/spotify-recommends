interface CoverProps {
  className: string
}

const Cover = ({ children, className }: JSX.ElementChildrenAttribute & CoverProps): JSX.Element => {
  return (
    <div className={`absolute inset-0 h-screen flex justify-center items-center ${className}`}>
      {children}
    </div>
  );
};

export default Cover;
