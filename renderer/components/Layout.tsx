import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

import MUILink from '@mui/material/Link';

type Props = {
  children: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          background: {
            //default: 'rgb(0, 30, 60)',
            default: 'rgb(10, 25, 41)',
          },
          //divider: 'rgb(0, 60, 90)',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <header>
            <nav>
              <Link href="/" passHref>
                <MUILink >Dashboard</MUILink>
              </Link>
              {' '}|{' '}
              <Link href="/settings" passHref>
                <MUILink>Settings</MUILink>
              </Link>
            </nav>
          </header>
        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
        <Grid item xs={12}>
          <footer>
            <Divider />
            <span>I'm here to stay (Footer)</span>
          </footer>
        </Grid>
      </Grid>
    
    </ThemeProvider>
  )
}

export default Layout
