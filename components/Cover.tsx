const Cover = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  return (
    <div className="absolute inset-0 h-screen flex justify-center items-center">
      {children}
    </div>
  );
};

export default Cover;
