"use client";
import { SearchCommandDialog } from "@/components/SearchCommand";
import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = ({initialStocks}:{initialStocks:StockWithWatchlistStatus[]}) => {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
      {NAV_ITEMS?.map(({ href, label }) => {
        if (href === "/search") {
          return (
            <li key='search-trigger'>
              <SearchCommandDialog
              label="Search"
              renderAs = "text"
              initialStocks={initialStocks}
              />
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
  );
};

export default NavItems;
