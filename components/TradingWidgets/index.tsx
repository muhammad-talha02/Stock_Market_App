"use client";
import useTradingView from "@/hooks/useTradingView";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface TradingViewWidgetProps {
  title?: string;
  scriptUrl: string;
  height?: number;
  config: Record<string, unknown>;
  className?: string;
}
function TradingViewWidget({
  scriptUrl,
  height,
  title,
  config,
  className,
}: TradingViewWidgetProps) {
  const container = useTradingView(scriptUrl, config, height);

  return (
    <div className="w-full">
      {title && (
        <h3 className="font-semibold text-2xl text-gray-100 mb-5">{title}</h3>
      )}
      <div
        className={cn("tradingview-widget-container", className)}
        ref={container}
        style={{ height: "100%", width: "100%" }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "calc(100% - 32px)", width: "100%" }}
        ></div>
        <div className="tradingview-widget-copyright">
          <a
            href="https://www.tradingview.com/symbols/NASDAQ-AAPL/"
            rel="noopener nofollow"
            target="_blank"
          >
            <span className="blue-text">AAPL stock chart</span>
          </a>
          <span className="trademark"> by TradingView</span>
        </div>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
