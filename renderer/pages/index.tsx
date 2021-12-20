import { useState, useEffect } from 'react'
import Link from 'next/link'
import MUILink from '@mui/material/Link';
import Layout from '../components/Layout'
import Button from '@mui/material/Button';

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
    <Layout title="Home | Next.js + TypeScript + Electron Example">
      <Button onClick={onOpenDevTools} variant="contained">Open DevTools</Button>
      <p>
        <Link href="/about" passHref>
          <MUILink>About</MUILink>
        </Link>
      </p>
    </Layout>
  )
}

export default IndexPage
