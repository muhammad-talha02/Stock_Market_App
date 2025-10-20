import TradingWidgets from "@/components/TradingWidgets";
import { MARKET_OVERVIEW_WIDGET_CONFIG } from "@/lib/constants";

const Page = () => {
  return (
    <div className="flex min-h-screen home-wrapper">
      <section className="grid w-full gap-8 home-section ">
        <div className="md:col-span-1 xl:col-span-1">
          <TradingWidgets
            title="Market Overview"
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            className="custom-chart"
          />
        </div>
      </section>
    </div>
  );
};

export default Page;
