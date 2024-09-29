import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

export interface CopyrightProps {
  website?: string;
  url?: string;
}

const Copyright = (props: CopyrightProps) => {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: 'text.secondary',
      }}
    >
      {'Copyright © '}
      <MuiLink color="inherit" href={props.url ?? 'https://mui.com/'}>
        {props.website ?? 'Material-UI'}
      </MuiLink>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
};

export default Copyright;
