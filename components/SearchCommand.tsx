"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Star, TrendingUp } from "lucide-react";
import { searchStocks } from "@/lib/actions/finnhub.actions";
import { useDebounce } from "@/hooks/useDebounce";

export function SearchCommandDialog({
  initialStocks,
  open,
  setOpen,
}: SearchCommandProps) {
  const [loading, setLoading] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [stocks, setStocks] =
    useState<StockWithWatchlistStatus[]>(initialStocks);

  const isSearchMode = !!searchItem.trim();
  const displayStock = isSearchMode ? stocks : initialStocks;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  const handleStockSelected = () => {
    setOpen(false);
    setSearchItem("");
    setStocks(initialStocks);
  };

  const handleSearch = async (value: string) => {
    if (!value) return setStocks(initialStocks);
    setLoading(true);
    try {
      const results = await searchStocks(value.trim());
      setStocks(results);
    } catch {
      setStocks([]);
    } finally {
      setLoading(false);
    }
  };
  const debounceSearch = useDebounce((value) => {
    handleSearch(value as string);
  }, 300);

  return (
    <>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="search-dialog"
      >
        <div className="search-field">
          <CommandInput
            value={searchItem}
            onValueChange={(value) => {
              setSearchItem(value);
              debounceSearch(value);
            }}
            className="search-input"
            placeholder="Type a command or search..."
          />
          {loading && <Loader2 className="search-loader" />}
        </div>

        <CommandList className="search-list scrollbar-hide-default">
          {loading ? (
            <CommandEmpty>Loading....</CommandEmpty>
          ) : displayStock.length === 0 ? (
            <div className="search-list-indicator">
              {isSearchMode ? "No results found" : "No stocks available"}
            </div>
          ) : (
            <ul>
              <div className="search-count">
                {isSearchMode ? "Search Results" : "Popular Stocks"} (
                {displayStock?.length || 0})
              </div>
              {displayStock?.map((stock) => (
                <li key={stock.symbol} className="search-item">
                  <Link
                    href={`/stocks/${stock.symbol}`}
                    onClick={handleStockSelected}
                    className="search-item-link"
                  >
                    <TrendingUp className="h-4 w-4 text-gray-500" />
                    <div className="flex-1">
                      <div className="search-item-name">{stock.name}</div>
                      <div className="text-sm text-gray-500">
                        {stock.symbol} | {stock.exchange} | {stock.type}
                      </div>
                    </div>
                    <Star />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
