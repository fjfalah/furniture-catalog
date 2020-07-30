import { AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from '../components';
import CatalogProvider from '../provider/catalog';
import { theme } from '../themes';

const AppRoot: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <CatalogProvider>
        <Component {...pageProps} />
        <GlobalStyles />
      </CatalogProvider>
    </ThemeProvider>
  );
};

export default AppRoot;
