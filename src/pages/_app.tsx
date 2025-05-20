import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import MarketDataProvider from "@/components/trading/MarketDataProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        <MarketDataProvider>
          <Component {...pageProps} />
        </MarketDataProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}
