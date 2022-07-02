interface CoverProps {
  className?: string
  children?: React.ReactNode;
}

const Cover = ({ children, className }: CoverProps): JSX.Element => {
  return (
    <div className={`absolute inset-0 h-screen flex justify-center items-center ${className}`}>
      {children}
    </div>
  );
};

export default Cover;
