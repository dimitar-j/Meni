import { type AppType } from "next/app";
import { Abril_Fatface, Montserrat } from "next/font/google";
import { GoogleAnalytics } from "nextjs-google-analytics";

import { Analytics } from "@vercel/analytics/react";

import "~/styles/globals.css";
import { api } from "~/utils/api";

const body = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
});

const header = Abril_Fatface({
  subsets: ["latin"],
  variable: "--font-header",
  weight: "400",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main
      className={`min-h-screen bg-backdrop ${body.variable} font-body ${header.variable} font-header`}
    >
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
      <Analytics />
    </main>
  );
};

export default api.withTRPC(MyApp);
