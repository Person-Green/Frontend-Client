interface DimProps {
  onClick?: () => void;
}

const Dim = ({ onClick }: DimProps) => {
  return (
    <div
      onClick={onClick}
      className="h-full w-full fixed bottom-0 bg-surface-30/40 backdrop-blur-[4px] z-1000"
    />
  );
};

export default Dim;
