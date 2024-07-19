import React from "react";
import { useEffect } from "react";
import "@/styles/gsk.scss";
import "@/styles/globals.scss";
import "@/../react-graph-vis/node_modules/vis-network/styles/vis-network.css";

import NoSSR from "../../components/NoSSR";

React.useLayoutEffect = React.useEffect;

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <NoSSR>
      <Component {...pageProps} />
    </NoSSR>
  );
}
