import { useState, useEffect } from 'react'
import Link from 'next/link'
import MUILink from '@mui/material/Link';
import Layout from '../components/Layout'
import TotalCard from '../components/TotalCard'
import TotalTotalCard from '../components/TotalTotalCard'
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
import {PromiseYearData, selectYearData, pickData, filterData, multiFilterData, multiFilterAndSelectOne, pickAndSumData, sumArray} from '../components/utils/dataHelper'

import {numberWithCommas} from '../utils/thousendFormatter'
import { getMonth } from './../utils/dateHelpers'
import { MonthlyDiffFromLastYear, totalDiffInProgressFromLastYear } from '../components/utils/calculations'

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
  const calcPicker = useAppSelector((state) => state.calcPicker.value);


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
    calcPicker.find(i => i === 'gas') || calcPicker.length < 1  ? pickAndSumData(selectYearData(gasData, currentYear), 'c') : 0,
    calcPicker.find(i => i === 'elst') || calcPicker.length < 1 ? pickAndSumData(selectYearData(electricityStaticData, currentYear), 'c'): 0,
    calcPicker.find(i => i === 'eldy') || calcPicker.length < 1 ? pickAndSumData(selectYearData(electricityDynamicData, currentYear), 'c'): 0,
    calcPicker.find(i => i === 'waste') || calcPicker.length < 1 ? pickAndSumData(selectYearData(trashData, currentYear), 'c'): 0,
    calcPicker.find(i => i === 'water') || calcPicker.length < 1 ? pickAndSumData(selectYearData(waterData, currentYear), 'c'): 0,
    calcPicker.find(i => i === 'broadband') || calcPicker.length < 1 ? pickAndSumData(selectYearData(broadbandData, currentYear), 'c'): 0,
    calcPicker.find(i => i === 'security') || calcPicker.length < 1 ? pickAndSumData(selectYearData(securityData, currentYear), 'c'): 0,
    calcPicker.find(i => i === 'reparation') || calcPicker.length < 1 ? pickAndSumData(selectYearData(reparationData, currentYear), 'c'): 0,
    calcPicker.find(i => i === 'cleaning') || calcPicker.length < 1 ? pickAndSumData(selectYearData(cleaningData, currentYear), 'c'): 0,
    calcPicker.find(i => i === 'loan') || calcPicker.length < 1 ? pickAndSumData(selectYearData(loanData, currentYear), 'c'): 0,
    calcPicker.find(i => i === 'insurance') || calcPicker.length < 1 ? pickAndSumData(selectYearData(insuranceData, currentYear), 'c'): 0,
    calcPicker.find(i => i === 'other') || calcPicker.length < 1 ? pickAndSumData(selectYearData(otherData, currentYear), 'c'): 0,
  ]

  const allCostsPrevYear = [
    calcPicker.find(i => i === 'gas') || calcPicker.length < 1  ? pickAndSumData(selectYearData(gasData, currentYear-1), 'c') : 0,
    calcPicker.find(i => i === 'elst') || calcPicker.length < 1 ? pickAndSumData(selectYearData(electricityStaticData, currentYear-1), 'c'): 0,
    calcPicker.find(i => i === 'eldy') || calcPicker.length < 1 ? pickAndSumData(selectYearData(electricityDynamicData, currentYear-1), 'c'): 0,
    calcPicker.find(i => i === 'waste') || calcPicker.length < 1 ? pickAndSumData(selectYearData(trashData, currentYear-1), 'c'): 0,
    calcPicker.find(i => i === 'water') || calcPicker.length < 1 ? pickAndSumData(selectYearData(waterData, currentYear-1), 'c'): 0,
    calcPicker.find(i => i === 'broadband') || calcPicker.length < 1 ? pickAndSumData(selectYearData(broadbandData, currentYear-1), 'c'): 0,
    calcPicker.find(i => i === 'security') || calcPicker.length < 1 ? pickAndSumData(selectYearData(securityData, currentYear-1), 'c'): 0,
    calcPicker.find(i => i === 'reparation') || calcPicker.length < 1 ? pickAndSumData(selectYearData(reparationData, currentYear-1), 'c'): 0,
    calcPicker.find(i => i === 'cleaning') || calcPicker.length < 1 ? pickAndSumData(selectYearData(cleaningData, currentYear-1), 'c'): 0,
    calcPicker.find(i => i === 'loan') || calcPicker.length < 1 ? pickAndSumData(selectYearData(loanData, currentYear-1), 'c'): 0,
    calcPicker.find(i => i === 'insurance') || calcPicker.length < 1 ? pickAndSumData(selectYearData(insuranceData, currentYear-1), 'c'): 0,
    calcPicker.find(i => i === 'other') || calcPicker.length < 1 ? pickAndSumData(selectYearData(otherData, currentYear-1), 'c'): 0,
  ]

  const totalData = sumArray(allCosts)
  const totalDataPrevYear = sumArray(allCostsPrevYear)  
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
                id={'gas'}
                faIcon={faBurn}
                iconColor="warning"
                primaryText={`Gas`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(gasData, currentYear), 'c'))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(gasData, currentYear), 'u'))}Kwh,`}
                diffText={totalDiffInProgressFromLastYear(gasData, currentYear)}
                diffUsage={totalDiffInProgressFromLastYear(gasData, currentYear, getMonth(),'u')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                id={'elst'}
                faIcon={faBolt}
                iconColor="secondary"
                primaryText={`Electricty Net`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(electricityStaticData, currentYear), 'c'))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(electricityStaticData, currentYear), 'u'))}Kwh`}
                diffText={totalDiffInProgressFromLastYear(electricityStaticData, currentYear)}
                diffUsage={totalDiffInProgressFromLastYear(electricityStaticData, currentYear, getMonth(),'u')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                id={'eldy'}
                faIcon={faBolt}
                iconColor="secondary"
                primaryText={`Electricty`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(electricityDynamicData, currentYear), 'c'))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(electricityDynamicData, currentYear), 'u'))}Kwh`}
                diffText={totalDiffInProgressFromLastYear(electricityDynamicData, currentYear)}
                diffUsage={totalDiffInProgressFromLastYear(electricityDynamicData, currentYear, getMonth(),'u')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                id={'water'}
                faIcon={faTint}
                iconColor="info"
                primaryText={`Water & Drain`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(waterData, currentYear), 'c'))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(waterData, currentYear), 'u'))}m3`}
                diffText={totalDiffInProgressFromLastYear(waterData, currentYear)}
                diffUsage={totalDiffInProgressFromLastYear(waterData, currentYear, getMonth(),'u')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                id={'waste'}
                faIcon={faTrashAlt}
                iconColor="info"
                primaryText={`Waste`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(trashData, currentYear), 'c'))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(trashData, currentYear), 'u'))}kg`}
                diffText={totalDiffInProgressFromLastYear(trashData, currentYear)}
                diffUsage={totalDiffInProgressFromLastYear(trashData, currentYear, getMonth(),'u')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                id={'broadband'}
                faIcon={faWifi}
                iconColor="#25db23"
                primaryText={`Broadband`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(broadbandData, currentYear), 'c'))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(broadbandData, currentYear), 'u'))}st`}
                diffText={totalDiffInProgressFromLastYear(broadbandData, currentYear)}
                diffUsage={totalDiffInProgressFromLastYear(broadbandData, currentYear, getMonth(),'u')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                id={'security'}
                faIcon={faShieldAlt}
                iconColor="#25db23"
                primaryText={`Security alarm`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(securityData, currentYear), 'c'))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(securityData, currentYear), 'u'))}st`}
                diffText={totalDiffInProgressFromLastYear(securityData, currentYear)}
                diffUsage={totalDiffInProgressFromLastYear(securityData, currentYear, getMonth(),'u')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                id={'reparation'}
                faIcon={faTools}
                iconColor="#ff6868"
                primaryText={`Maintenance`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(reparationData, currentYear), 'c'))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(reparationData, currentYear), 'u'))}st`}
                diffText={totalDiffInProgressFromLastYear(reparationData, currentYear)}
                diffUsage={totalDiffInProgressFromLastYear(reparationData, currentYear, getMonth(),'u')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                id={'cleaning'}
                faIcon={faBroom}
                iconColor="#ff6868"
                primaryText={`Cleaning`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(cleaningData, currentYear), 'c'))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(cleaningData, currentYear), 'u'))}st`}
                diffText={totalDiffInProgressFromLastYear(cleaningData, currentYear)}
                diffUsage={totalDiffInProgressFromLastYear(cleaningData, currentYear, getMonth(),'u')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                id={'loan'}
                faIcon={faDollarSign}
                iconColor="#5ae3c0"
                primaryText={`Loan`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(loanData, currentYear), 'c'))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(loanData, currentYear), 'u'))}st`}
                diffText={totalDiffInProgressFromLastYear(loanData, currentYear)}
                diffUsage={totalDiffInProgressFromLastYear(loanData, currentYear, getMonth(),'u')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TotalCard
                id={'insurance'}
                faIcon={faDollarSign}
                iconColor="#5ae3c0"
                primaryText={`Insurance`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(insuranceData, currentYear), 'c'))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(insuranceData, currentYear), 'u'))}st`}
                diffText={totalDiffInProgressFromLastYear(insuranceData, currentYear)}
                diffUsage={totalDiffInProgressFromLastYear(insuranceData, currentYear, getMonth(),'u')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
            <TotalCard
                id={'other'}
                faIcon={faTrashAlt}
                iconColor="#5ae3c0"
                primaryText={`Garden Waste`}
                secondaryText={`${numberWithCommas(pickAndSumData(selectYearData(otherData, currentYear), 'c'))}${currencyLabel}`}
                subberText={`${numberWithCommas(pickAndSumData(selectYearData(otherData, currentYear), 'u'))}st`}
                diffText={totalDiffInProgressFromLastYear(otherData, currentYear)}
                diffUsage={totalDiffInProgressFromLastYear(otherData, currentYear, getMonth(),'u')}
              />
            </Grid>
          </GridCon>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FlexView style={{flexDirection: 'row'}}>
              <TotalTotalCard  
                faIcon={faCashRegister}
                iconColor="#ffffff"
                primaryText={`Total`}
                secondaryText={`${numberWithCommas(totalData)}${currencyLabel}`}
                subberText={`${numberWithCommas(totalDataPrevYear)}kr`}
              />
          </FlexView>
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
                <ChartsComparisonMetrix syncId={`compair-eld`} stack={electricityDynamicData} currentYear={currentYear} metricA={chartsMetricOverYearsMetric.costs} metricB={chartsMetricOverYearsMetric.usage}/>
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
