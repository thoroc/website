import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NextLink from 'next/link';

const navItems = {
  home: { label: 'Home', path: '/' },
  about: { label: 'About', path: '/about' },
};

interface ElevationScrollProps {
  title: string;
  children?: React.ReactElement<any>;
}

const ElevationScroll = (props: ElevationScrollProps) => {
  const { children } = props;

  return children
    ? React.cloneElement(children, {
        elevation: 0,
      })
    : null;
};

const ElevateAppBar = (props: ElevationScrollProps) => {
  return (
    <>
      <ElevationScroll {...props}>
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
      </ElevationScroll>
      <Toolbar />
    </>
  );
};

export default ElevateAppBar;
