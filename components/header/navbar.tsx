"use client";
import { useState } from "react";
import { SearchCommandDialog } from "../SearchCommand";
import NavItems from "./navItems";
import UserDropdown from "./userDropdown";
import Link from "next/link";
import Image from "next/image";

const Navbar = ({
  user,
  initialStocks,
}: {
  user: User;
  initialStocks: StockWithWatchlistStatus[];
}) => {
  const [openSearch, setOpenSearch] = useState(false);
  const handleOpenSearch = () => {
    setOpenSearch(true);
  };

  return (
    <>
      <Link href="/">
        <Image
          src={"/assets/images/logo.png"}
          alt="Stockverse Logo"
          width={140}
          height={32}
          className="h-8 w-auto cursor-pointer"
        />
      </Link>
      <nav className="hidden sm:block">
        <NavItems onClickSearch={handleOpenSearch} />
      </nav>
      <UserDropdown user={user}>
        <nav className="sm:hidden">
          <NavItems onClickSearch={handleOpenSearch} />
        </nav>
      </UserDropdown>
      <SearchCommandDialog
        open={openSearch}
        setOpen={setOpenSearch}
        initialStocks={initialStocks}
      />
    </>
  );
};

export default Navbar;
