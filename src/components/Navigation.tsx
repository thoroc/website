import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NextLink from 'next/link';

interface NavigationScrollProps {
  title: string;
  children?: React.ReactElement<any>;
  navItems: Record<string, { label: string; path: string }>;
}

const NavigationScroll = (props: NavigationScrollProps) => {
  const { children } = props;

  return children
    ? React.cloneElement(children, {
        elevation: 0,
      })
    : null;
};

const Navigation = (props: NavigationScrollProps) => {
  const { navItems } = props;

  return (
    <>
      <NavigationScroll {...props}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div">
              {props.title}
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {Object.entries(navItems).map(([key, { label, path }]) => (
                <Button key={key} sx={{ color: '#fff' }} component={NextLink} href={path}>
                  {label}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </NavigationScroll>
      <Toolbar />
    </>
  );
};

export default Navigation;
