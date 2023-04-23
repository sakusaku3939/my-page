import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Router } from "next/router";

NProgress.configure({ showSpinner: false, speed: 300, minimum: 0.25 });

export default function App({ Component, pageProps }: AppProps) {
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());

  return <Component {...pageProps} />;
}
