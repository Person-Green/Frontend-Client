interface headerProps {
  icon: string;
  children: React.ReactNode;
}

const Header = ({ icon, children } : headerProps) => {
  return(
  	<header className="flex items-center gap-6 px-24 h-[3.75rem]">
			<span className="icon-m text-primary">{icon}</span>
      <h1 className="title-m text-primary">{children}</h1>
		</header>
  );
}

export default Header;