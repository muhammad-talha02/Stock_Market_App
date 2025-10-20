import Image from "next/image";
import Link from "next/link";
import NavItems from "./navItems";
import UserDropdown from "./userDropdown";

const Header = () => {
  return (
    <header className="header sticky top-0">
      <div className="container header-wrapper">
        <Link href="/">
          <Image
            src={"/assets/icons/logo.svg"}
            alt="Signalist Logo"
            width={140}
            height={32}
            className="h-8 w-auto cursor-pointer"
            />
            </Link>
          <nav className="hidden sm:block">
            <NavItems/>
          </nav>
          <UserDropdown/>
      </div>
    </header>
  );
};

export default Header;
