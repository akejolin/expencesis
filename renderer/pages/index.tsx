import { useState, useEffect } from 'react'
import Link from 'next/link'
import MUILink from '@mui/material/Link';
import Layout from '../components/Layout'
import TotalCard from '../components/TotalCard'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FlexView from '../components/styledFlexView'
import {ChartCard, ChartCardTitle} from '../components/charts/cardDesign'
import ChartsMetricOverYears from '../components/charts/chartsMetricOverYears'
import ChartsComparisonMetrix from '../components/charts/chartsComparisonMetrix'
import ChartsBarsTotal from '../components/charts/chartsBarsTotal'
import ChartsBarsYearlyTotal from '../components/charts/chartsBarsYearlyTotal'
import YearPicker from '../components/yearPicker'

import {metrics as chartsMetricOverYearsMetric} from '../components/charts/chartsMetricOverYears'
import {PromiseYearData, selectYearData, pickAndSumData, sumArray} from '../components/utils/dataHelper'

import {numberWithCommas} from '../utils/thousendFormatter'

import { 
  faPlug,
  faBolt,
  faTint,
  faBurn,
  faWifi,
  faTrashAlt,
  faCashRegister,
  faDollarSign,
  faShieldAlt,
  faTools,
  faBroom,
  //faFire as faBurn,
  //faBurn as faBurn 
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch, useAppSelector } from "../redux/hooks";


const IndexPage = () => {

 
  const currentYear = useAppSelector((state) => state.yearPicker.value);



  const [gasData, _gasData] = useState([])
  const [electricityStaticData, _electricityStaticData] = useState([])
  const [electricityDynamicData, _electricityDynamicData] = useState([])
  const [trashData, _trashData] = useState([])
  const [waterData, _waterData] = useState([])
  const [broadbandData, _broadbandData] = useState([])
  const [securityData, _securityData] = useState([])
  const [reparationData, _reparationData] = useState([])
  const [cleaningData, _cleaningData] = useState([])
  const [loanData, _loanData] = useState([])
  const [insuranceData, _insuranceData] = useState([])
  const [otherData, _otherData] = useState([])
  //const [totalData, _totalData] = useState([])
  const [sumTotalData, _sumTotalData] = useState(0)

  //const [currentYear, _currentYear] = useState(getCurrentYear())
  const [currencyLabel, _currencyLabel] = useState('kr')
  
  useEffect(() => {
    global.ipcRenderer.addListener('DATA_RESPONSE_GAS', (_event, data) => _gasData(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_ELECTRICITY_STATIC', (_event, data) => _electricityStaticData(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_ELECTRICITY_DYNAMIC', (_event, data) => _electricityDynamicData(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_WATER', (_event, data) => _waterData(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_TRASH', (_event, data) => _trashData(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_BROADBAND', (_event, data) => _broadbandData(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_SECURITY', (_event, data) => _securityData(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_REPARATION', (_event, data) => _reparationData(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_CLEANING', (_event, data) => _cleaningData(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_LOAN', (_event, data) => _loanData(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_INSURANCE', (_event, data) => _insuranceData(data))
    global.ipcRenderer.addListener('DATA_RESPONSE_OTHER', (_event, data) => {
      return _otherData(data)
    })
  }, [])

  useEffect(() => {
    global.ipcRenderer.send('REQUEST_DATA', 'GAS')
    global.ipcRenderer.send('REQUEST_DATA', 'ELECTRICITY_STATIC')
    global.ipcRenderer.send('REQUEST_DATA', 'ELECTRICITY_DYNAMIC')
    global.ipcRenderer.send('REQUEST_DATA', 'WATER')
    global.ipcRenderer.send('REQUEST_DATA', 'TRASH')
    global.ipcRenderer.send('REQUEST_DATA', 'BROADBAND')
    global.ipcRenderer.send('REQUEST_DATA', 'SECURITY')
    global.ipcRenderer.send('REQUEST_DATA', 'REPARATION')
    global.ipcRenderer.send('REQUEST_DATA', 'CLEANING')
    global.ipcRenderer.send('REQUEST_DATA', 'LOAN')
    global.ipcRenderer.send('REQUEST_DATA', 'INSURANCE')
    global.ipcRenderer.send('REQUEST_DATA', 'OTHER')
  },[])
  
  const GridCon = Grid
  const StyledBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(1),
      paddingRight: theme.spacing(2)
    }
  }))
  const StyledText = styled(Typography)(({ theme }) => ({
    color: '#a1a1a1'
  }))

  const YellowText = styled('span')(({ theme }) => ({
    color: theme.palette['warning'].main
  }))
  const BlueText = styled('span')(({ theme }) => ({
    color: theme.palette['info'].main
  }))
  const PurpleText = styled('span')(({ theme }) => ({
    color: theme.palette['secondary'].main
  }))
  const GreenText = styled('span')(({ theme }) => ({
    color: '#25db23'
  }))

  

  const onOpenDevTools = () => {
    global.ipcRenderer.send('OPEN_DEV_TOOLS')
  }


  const allCosts = [
    pickAndSumData(selectYearData(gasData, currentYear), 2),
    pickAndSumData(selectYearData(electricityStaticData, currentYear), 2),
    pickAndSumData(selectYearData(electricityDynamicData, currentYear), 2),
    pickAndSumData(selectYearData(trashData, currentYear), 2),
    pickAndSumData(selectYearData(waterData, currentYear), 2),
    pickAndSumData(selectYearData(broadbandData, currentYear), 2),
    pickAndSumData(selectYearData(securityData, currentYear), 2),
    pickAndSumData(selectYearData(reparationData, currentYear), 2),
    pickAndSumData(selectYearData(cleaningData, currentYear), 2),
    pickAndSumData(selectYearData(loanData, currentYear), 2),
    pickAndSumData(selectYearData(insuranceData, currentYear), 2),
    pickAndSumData(selectYearData(otherData, currentYear), 2),
  ]

  const totalData = sumArray(allCosts)

  return (
    <Layout title="Settings | Expenses App">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={9}>
          <FlexView style={{alignItems: 'flex-start', flexDirection: 'column'}}>
            <StyledBox>
              <StyledText variant="body2">2021</StyledText>
              <h1 style={{marginBottom: 0, marginTop: -5,}}>
                  Expenses
              </h1>
            </StyledBox>
          </FlexView>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FlexView style={{alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row'}}>
            <div style={{width: '20%'}}>
              <YearPicker />
            </div>
          </FlexView>
        </Grid>
        <Grid item xs={12}>
          <GridCon container spacing={4}>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                faIcon={faBurn}
                iconColor="warning"
                primaryText={`Gas`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(gasData, currentYear), 2))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(gasData, currentYear), 3))}Kw`}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                faIcon={faBolt}
                iconColor="secondary"
                primaryText={`Electricty St`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(electricityStaticData, currentYear), 2))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(electricityStaticData, currentYear), 3))}Kw`}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                faIcon={faBolt}
                iconColor="secondary"
                primaryText={`Electricty Dy`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(electricityDynamicData, currentYear), 2))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(electricityDynamicData, currentYear), 3))}Kw`}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                faIcon={faTint}
                iconColor="info"
                primaryText={`Water & Drain`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(waterData, currentYear), 2))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(waterData, currentYear), 3))}Km3`}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                faIcon={faTrashAlt}
                iconColor="info"
                primaryText={`Waste`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(trashData, currentYear), 2))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(trashData, currentYear), 3))}Km3`}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                faIcon={faWifi}
                iconColor="#25db23"
                primaryText={`Broadband`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(broadbandData, currentYear), 2))}${currencyLabel}`}
                subberText={``}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                faIcon={faShieldAlt}
                iconColor="#25db23"
                primaryText={`Security alarm`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(securityData, currentYear), 2))}${currencyLabel}`}
                subberText={``}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                faIcon={faTools}
                iconColor="#ff6868"
                primaryText={`Reparation`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(reparationData, currentYear), 2))}${currencyLabel}`}
                subberText={``}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                faIcon={faBroom}
                iconColor="#ff6868"
                primaryText={`Cleaning`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(cleaningData, currentYear), 2))}${currencyLabel}`}
                subberText={``}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                faIcon={faDollarSign}
                iconColor="#5ae3c0"
                primaryText={`Loan`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(loanData, currentYear), 2))}${currencyLabel}`}
                subberText={``}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                faIcon={faDollarSign}
                iconColor="#5ae3c0"
                primaryText={`Insurance`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(insuranceData, currentYear), 2))}${currencyLabel}`}
                subberText={``}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                faIcon={faCashRegister}
                iconColor="#ffffff"
                primaryText={`Total`}
                secondaryText={`${numberWithCommas(totalData)}${currencyLabel}`}
                subberText={`${currentYear}`}
              />
            </Grid>
          </GridCon>
        </Grid>


        <Grid item xs={12} sm={12} md={6}>
          <ChartCard>
            <ChartCardTitle>
              <FlexView style={{ flexDirection:'column', alignItems: 'flex-start', }}>
                <span><YellowText><FontAwesomeIcon icon={faBurn} /></YellowText> Monthly gas costs over years </span>
              </FlexView>
            </ChartCardTitle>
            <FlexView style={{ flexDirection:'column', background: 'rgba(13,28,40,0.4)' }}>
              <div style={{paddingRight: 25, paddingBottom: 5, width: '100%', height:'100%'}}>
                <ChartsComparisonMetrix syncId={`compair-gas`} stack={gasData} currentYear={currentYear} metricA={chartsMetricOverYearsMetric.costs} metricB={chartsMetricOverYearsMetric.usage}/>
              </div>
            </FlexView>
          </ChartCard>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <ChartCard>
            <ChartCardTitle>
              <FlexView style={{ flexDirection:'column', alignItems: 'flex-start', }}>
              <span><YellowText><FontAwesomeIcon icon={faBurn} /></YellowText> Total gas costs over the years </span>
              </FlexView>
            </ChartCardTitle>
            <FlexView style={{ flexDirection:'column', background: 'rgba(13,28,40,0.4)' }}>
              <div style={{paddingRight: 25, paddingBottom: 5, width: '100%', height:'100%'}}>
                <ChartsBarsYearlyTotal syncId="gas-total-costs-over-years" stack={gasData} currentYear={currentYear} />
              </div>
            </FlexView>
          </ChartCard>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <ChartCard>
            <ChartCardTitle>
              <FlexView style={{ flexDirection:'column', alignItems: 'flex-start', }}>
                <span><PurpleText><FontAwesomeIcon icon={faPlug} /></PurpleText> Monthly static electricity costs over years </span>
              </FlexView>
            </ChartCardTitle>
            <FlexView style={{ flexDirection:'column', background: 'rgba(13,28,40,0.4)' }}>
              <div style={{paddingRight: 25, paddingBottom: 5, width: '100%', height:'100%'}}>
                <ChartsComparisonMetrix syncId={`compair-els`} stack={electricityStaticData} currentYear={currentYear} metricA={chartsMetricOverYearsMetric.costs} metricB={chartsMetricOverYearsMetric.usage}/>
              </div>
            </FlexView>
          </ChartCard>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <ChartCard>
            <ChartCardTitle>
              <FlexView style={{ flexDirection:'column', alignItems: 'flex-start', }}>
              <span><PurpleText><FontAwesomeIcon icon={faPlug} /></PurpleText> Total static electricity costs over the years </span>
              </FlexView>
            </ChartCardTitle>
            <FlexView style={{ flexDirection:'column', background: 'rgba(13,28,40,0.4)' }}>
              <div style={{paddingRight: 25, paddingBottom: 5, width: '100%', height:'100%'}}>
                <ChartsBarsYearlyTotal syncId="els-total-costs-over-years" stack={electricityStaticData} currentYear={currentYear} />
              </div>
            </FlexView>
          </ChartCard>
        </Grid>


        <Grid item xs={12} sm={12} md={6}>
          <ChartCard>
            <ChartCardTitle>
              <FlexView style={{ flexDirection:'column', alignItems: 'flex-start', }}>
                <span><PurpleText><FontAwesomeIcon icon={faBolt} /></PurpleText> Monthly dynamic electricity costs over years </span>
              </FlexView>
            </ChartCardTitle>
            <FlexView style={{ flexDirection:'column', background: 'rgba(13,28,40,0.4)' }}>
              <div style={{paddingRight: 25, paddingBottom: 5, width: '100%', height:'100%'}}>
                <ChartsComparisonMetrix syncId={`compair-eld`} stack={gasData} currentYear={electricityDynamicData} metricA={chartsMetricOverYearsMetric.costs} metricB={chartsMetricOverYearsMetric.usage}/>
              </div>
            </FlexView>
          </ChartCard>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <ChartCard>
            <ChartCardTitle>
              <FlexView style={{ flexDirection:'column', alignItems: 'flex-start', }}>
              <span><PurpleText><FontAwesomeIcon icon={faBolt} /></PurpleText> Total dynamic electricity costs over the years </span>
              </FlexView>
            </ChartCardTitle>
            <FlexView style={{ flexDirection:'column', background: 'rgba(13,28,40,0.4)' }}>
              <div style={{paddingRight: 25, paddingBottom: 5, width: '100%', height:'100%'}}>
                <ChartsBarsYearlyTotal syncId="els-total-costs-over-years" stack={electricityDynamicData} currentYear={currentYear} />
              </div>
            </FlexView>
          </ChartCard>
        </Grid>





        <Grid item xs={12} sm={12} md={6}>
          <ChartCard>
            <ChartCardTitle>
              <FlexView style={{ flexDirection:'column', alignItems: 'flex-start', }}>
                <span><BlueText><FontAwesomeIcon icon={faTint} /></BlueText> Monthly water & drain costs over years </span>
              </FlexView>
            </ChartCardTitle>
            <FlexView style={{ flexDirection:'column', background: 'rgba(13,28,40,0.4)' }}>
              <div style={{paddingRight: 25, paddingBottom: 5, width: '100%', height:'100%'}}>
                <ChartsComparisonMetrix syncId={`compair-water`} stack={waterData} currentYear={currentYear} metricA={chartsMetricOverYearsMetric.costs} metricB={chartsMetricOverYearsMetric.usage}/>
              </div>
            </FlexView>
          </ChartCard>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <ChartCard>
            <ChartCardTitle>
              <FlexView style={{ flexDirection:'column', alignItems: 'flex-start', }}>
              <span><BlueText><FontAwesomeIcon icon={faTint} /></BlueText> Total water & drain costs over the years </span>
              </FlexView>
            </ChartCardTitle>
            <FlexView style={{ flexDirection:'column', background: 'rgba(13,28,40,0.4)' }}>
              <div style={{paddingRight: 25, paddingBottom: 5, width: '100%', height:'100%'}}>
                <ChartsBarsYearlyTotal syncId="els-total-costs-over-years" stack={waterData} currentYear={currentYear} />
              </div>
            </FlexView>
          </ChartCard>
        </Grid>





        <Grid item xs={12} sm={12} md={6}>
          <ChartCard>
            <ChartCardTitle>
              <FlexView style={{ flexDirection:'column', alignItems: 'flex-start', }}>
                <span><PurpleText><FontAwesomeIcon icon={faTrashAlt} /></PurpleText> Monthly waste costs over years </span>
              </FlexView>
            </ChartCardTitle>
            <FlexView style={{ flexDirection:'column', background: 'rgba(13,28,40,0.4)' }}>
              <div style={{paddingRight: 25, paddingBottom: 5, width: '100%', height:'100%'}}>
                <ChartsComparisonMetrix syncId={`compair-waste`} stack={trashData} currentYear={currentYear} metricA={chartsMetricOverYearsMetric.costs} metricB={chartsMetricOverYearsMetric.usage}/>
              </div>
            </FlexView>
          </ChartCard>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <ChartCard>
            <ChartCardTitle>
              <FlexView style={{ flexDirection:'column', alignItems: 'flex-start', }}>
              <span><PurpleText><FontAwesomeIcon icon={faTrashAlt} /></PurpleText> Total waste costs over the years </span>
              </FlexView>
            </ChartCardTitle>
            <FlexView style={{ flexDirection:'column', background: 'rgba(13,28,40,0.4)' }}>
              <div style={{paddingRight: 25, paddingBottom: 5, width: '100%', height:'100%'}}>
                <ChartsBarsYearlyTotal syncId="els-total-costs-over-years" stack={trashData} currentYear={currentYear} />
              </div>
            </FlexView>
          </ChartCard>
        </Grid>


        <Grid item xs={12} sm={12} md={6}>
          <ChartCard>
            <ChartCardTitle>
              <FlexView style={{ flexDirection:'column', alignItems: 'flex-start', }}>
                <span><BlueText><FontAwesomeIcon icon={faWifi} /></BlueText> Monthly broad band costs over years </span>
              </FlexView>
            </ChartCardTitle>
            <FlexView style={{ flexDirection:'column', background: 'rgba(13,28,40,0.4)' }}>
              <div style={{paddingRight: 25, paddingBottom: 5, width: '100%', height:'100%'}}>
                <ChartsComparisonMetrix syncId={`compair-broadband`} stack={broadbandData} currentYear={currentYear} metricA={chartsMetricOverYearsMetric.costs} metricB={chartsMetricOverYearsMetric.usage}/>
              </div>
            </FlexView>
          </ChartCard>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <ChartCard>
            <ChartCardTitle>
              <FlexView style={{ flexDirection:'column', alignItems: 'flex-start', }}>
              <span><BlueText><FontAwesomeIcon icon={faWifi} /></BlueText> Total broad band costs over the years </span>
              </FlexView>
            </ChartCardTitle>
            <FlexView style={{ flexDirection:'column', background: 'rgba(13,28,40,0.4)' }}>
              <div style={{paddingRight: 25, paddingBottom: 5, width: '100%', height:'100%'}}>
                <ChartsBarsYearlyTotal syncId="els-total-costs-over-years" stack={broadbandData} currentYear={currentYear} />
              </div>
            </FlexView>
          </ChartCard>
        </Grid>


      </Grid>
  </Layout>
  )
}

export default IndexPage
