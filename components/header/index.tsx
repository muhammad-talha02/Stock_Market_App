import { searchStocks } from "@/lib/actions/finnhub.actions";
import Navbar from "./navbar";

const Header = async ({ user }: { user: User }) => {
  const initialStocks = await searchStocks();
  return (
    <header className="header sticky top-0">
      <div className="container header-wrapper">
        <Navbar user={user} initialStocks={initialStocks} />
      </div>
    </header>
  );
};

export default Header;
