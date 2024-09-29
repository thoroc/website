import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface ElevationScrollProps {
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
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div">
              Scroll to elevate App bar
            </Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </>
  );
};

export default ElevateAppBar;
