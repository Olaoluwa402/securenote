import type { AppProps } from "next/app";
import { wrapper } from "../redux/store";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "../components/Fallback/Fallback";
import { ErrorHandler } from "../components/Fallback/ErrorHandler";

import "../styles/globals.css";

const MyApp = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={Fallback} onError={ErrorHandler}>
        <Component {...props.pageProps} />
      </ErrorBoundary>
    </Provider>
  );
};

export default MyApp;
