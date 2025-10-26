"use client";
import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = ({ onClickSearch }: { onClickSearch: () => void }) => {
  const pathname = usePathname();

  return (
    <>
      <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
        {NAV_ITEMS?.map(({ href, label }) => {
          if (href === "/search") {
            return (
              <li key="search-trigger" onClick={onClickSearch}>
                <span className="search-text">{label}</span>
              </li>
            );
          }
          return (
            <li key={label}>
              <Link
                href={href}
                className={`hover:text-yellow-500 transition-colors ${
                  pathname === href ? "text-gray-100" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default NavItems;
