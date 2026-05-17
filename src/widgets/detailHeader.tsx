interface detailHeaderProps {
  children : React.ReactNode;
}

const DetailHeader = ({ children } : detailHeaderProps) => {
  return(
    <header className="flex items-center px-16 h-[3.75rem]">
        <span className="icon-l p-8 text-text-30">keyboard_arrow_left</span>
        <h1 className="body-m text-text-20 absolute left-1/2 -translate-x-1/2">{children}</h1>
    </header>
  );
}

export default DetailHeader;
