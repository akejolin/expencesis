import Link from 'next/link'
import Layout from '../components/Layout'
import FlexView from '../components/flexView'
import Grid from '@mui/material/Grid';




const SettingsPage = () => {




  return (
  <Layout title="Settings | Expenses App">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FlexView style={{background:'green'}}>
          <h1 style={{marginBottom: 5, marginTop: 5,}}>
              Settings
          </h1>
          </FlexView>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FlexView style={{background:'red'}}>
            col1
          </FlexView>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FlexView style={{background:'blue'}}>
            col2
          </FlexView>
        </Grid>
      </Grid>
  </Layout>
)}

export default SettingsPage
