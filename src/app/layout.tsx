import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { SpeedInsights } from '@vercel/speed-insights/next';
import ElevatedAppBar from '@/components/NavBar';
import * as React from 'react';
import theme from '@/theme';

const RootLayout = (props: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <SpeedInsights />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <ElevatedAppBar />
            {props.children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
