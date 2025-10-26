import TradingWidgets from "@/components/TradingWidgets";
import { BASELINE_WIDGET_CONFIG, CANDLE_CHART_WIDGET_CONFIG, COMPANY_FINANCIALS_WIDGET_CONFIG, COMPANY_PROFILE_WIDGET_CONFIG, SYMBOL_INFO_WIDGET_CONFIG, TECHNICAL_ANALYSIS_WIDGET_CONFIG } from "@/lib/constants";

const StockDetails =async ({params}:StockDetailsPageProps) => {
    const { symbol } = await params;

  const scriptBaseUrl = "https://s3.tradingview.com/external-embedding/embed-widget"
  return (
    <div className="flex min-h-screen">
       <section className="grid grid-cols-1 md:grid-cols-3 w-full gap-8  ">
             <div className="md:col-span-2 col-span-1 flex flex-col gap-6">
               <TradingWidgets
                 scriptUrl={`${scriptBaseUrl}-symbol-info.js`}
                 config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
                 height={170}
               />
               <TradingWidgets
                 scriptUrl={`${scriptBaseUrl}-advanced-chart.js`}
                 config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
                 height={600}
                 className="custom-chart"
               />
               <TradingWidgets
                 scriptUrl={`${scriptBaseUrl}-advanced-chart.js`}
                 config={BASELINE_WIDGET_CONFIG(symbol)}
                 height={600}
               />

             </div>
             <div className="col-span-1 flex flex-col gap-6">
               <TradingWidgets
                 scriptUrl={`${scriptBaseUrl}-technical-analysis.js`}
                 config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
                 height={400}
               />
               <TradingWidgets
                 scriptUrl={`${scriptBaseUrl}-symbol-profile.js`}
                 config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
                 height={400}
               />
               <TradingWidgets
                 scriptUrl={`${scriptBaseUrl}-financials.js`}
                 config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
                 height={400}
               />
             </div>
           </section>
          {/* <section className="grid w-full gap-8 home-section ">
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
      </section> */}
    </div>
  );
};

export default StockDetails;
