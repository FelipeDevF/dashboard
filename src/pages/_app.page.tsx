import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@/styles/global.css"
import Nav from "@/components/Nav";
import Header from "@/components/Header";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

export const App = ({
  Component,
  pageProps,
}: AppPropsWithLayout): ReactNode => {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <section className="flex flex-1">        
        <Nav />
        <section className="flex flex-col gap-6 w-full p-4 bg-zinc-100">
          <Header />
          <main>{page}</main>
        </section>        
      </section>
    ));

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>,
  );
};

export default App;
