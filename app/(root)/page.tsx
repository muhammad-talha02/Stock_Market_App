import TradingWidgets from "@/components/TradingWidgets";
import { HEATMAP_WIDGET_CONFIG, MARKET_DATA_WIDGET_CONFIG, MARKET_OVERVIEW_WIDGET_CONFIG, TOP_STORIES_WIDGET_CONFIG } from "@/lib/constants";

const Page = () => {
  const scriptBaseUrl = "https://s3.tradingview.com/external-embedding/embed-widget"
  return (
    <div className="flex min-h-screen home-wrapper">
      <section className="grid w-full gap-8 home-section ">
        <div className="md:col-span-1 xl:col-span-1">
          <TradingWidgets
            title="Market Overview"
            scriptUrl={`${scriptBaseUrl}-market-overview.js`}
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            className="custom-chart"
            height={600}
          />
        </div>
        <div className="md:col-span-1 xl:col-span-2">
          <TradingWidgets
            title="Stock Headmap Overview"
            scriptUrl={`${scriptBaseUrl}-stock-heatmap.js`}
            config={HEATMAP_WIDGET_CONFIG}
            height={600}
          />
        </div>
      </section>
          <section className="grid w-full gap-8 home-section ">
        <div className="h-full md:col-span-1 xl:col-span-1">
          <TradingWidgets
            scriptUrl={`${scriptBaseUrl}-timeline.js`}
            config={TOP_STORIES_WIDGET_CONFIG}
            className="custom-chart"
            height={600}
          />
        </div>
        <div className="h-full md:col-span-1 xl:col-span-2">
          <TradingWidgets
            scriptUrl={`${scriptBaseUrl}-market-quotes.js`}
            config={MARKET_DATA_WIDGET_CONFIG}
            height={600}
          />
        </div>
      </section>
    </div>
  );
};

export default Page;
