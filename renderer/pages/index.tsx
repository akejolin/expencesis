import { useState, useEffect } from 'react'
import Link from 'next/link'
import MUILink from '@mui/material/Link';
import Layout from '../components/Layout'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FlexView from '../components/flexView'

const IndexPage = () => {
  const [gasData, _gasData] = useState([])
  const [electricityStaticData, _electricityStaticData] = useState([])
  const [electricityDynamicData, _electricityDynamicData] = useState([])
  const [waterDrainTrashData, _waterDrainTrashData] = useState([])
  useEffect(() => {
    global.ipcRenderer.addListener('DATA_RESPONSE_GAS', (_event, data) => _gasData(data))
    global.ipcRenderer.send('REQUEST_DATA', 'GAS')

    global.ipcRenderer.addListener('DATA_RESPONSE_ELECTRICITY_STATIC', (_event, data) => _electricityStaticData(data))
    global.ipcRenderer.send('REQUEST_DATA', 'ELECTRICITY_STATIC')

    global.ipcRenderer.addListener('DATA_RESPONSE_ELECTRICITY_DYNAMIC', (_event, data) => _electricityDynamicData(data))
    global.ipcRenderer.send('REQUEST_DATA', 'ELECTRICITY_DYNAMIC')

    global.ipcRenderer.addListener('DATA_RESPONSE_WATER_DRAIN_TRASH', (_event, data) => _waterDrainTrashData(data))
    global.ipcRenderer.send('REQUEST_DATA', 'WATER_DRAIN_TRASH')

  }, [])

  const onOpenDevTools = () => {
    global.ipcRenderer.send('OPEN_DEV_TOOLS')
  }
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
  )
}

export default IndexPage
