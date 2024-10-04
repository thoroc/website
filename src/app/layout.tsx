import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Navigation from '@/components/Navigation';
import * as React from 'react';
import theme from '@/theme';
import Copyright from '@/components/Copyright';

const navItems = {
  home: { label: 'Home', path: '/' },
  about: { label: 'About', path: '/about' },
  civitas: { label: 'Civitas', path: '/civitas' },
  infographics: { label: 'Infographics', path: '/infographics' },
};

const RootLayout = (props: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <SpeedInsights />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Navigation title="Russel-Roche" navItems={navItems} />
            {props.children}
            <Copyright website="Russell-Roche" url="http://localhost:3000" />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
