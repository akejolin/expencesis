import React, { ReactNode } from 'react'

import Head from 'next/head'
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import SideMenu from './sideMenu'
import FlexView from '../components/flexView'


type Props = {
  children: ReactNode
  title?: string
}

const Layout = ({ children, title = 'Expenses App' }: Props) => {
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
          primary: {

            main: 'rgb(10, 25, 41)',
          },
          secondary: {

            main: 'rgb(10, 25, 41)',
          },
          //divider: 'rgb(0, 60, 90)',
        },
      }),
    [prefersDarkMode],
  );

  const PaddingRightGrid = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(2)
    }
  }))

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
          <FlexView style={{background:'purple'}}>
                Logo
          </FlexView>
        </Grid>
        <Grid item xs={12} sm={3} md={2} lg={2} xl={2}>
          <SideMenu />
        </Grid>
        <PaddingRightGrid item xs={12} sm={9} md={10} lg={10} xl={10}>
            {children}
        </PaddingRightGrid>
        <Grid item xs={12} sm={3} md={2} lg={2} xl={2} />
        <PaddingRightGrid item xs={12} sm={9} md={10} lg={10} xl={10}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Divider />
              <span>Some footer</span>
            </Grid>
          </Grid>
        </PaddingRightGrid>
      </Grid>
    </ThemeProvider>
  )
}

export default Layout
