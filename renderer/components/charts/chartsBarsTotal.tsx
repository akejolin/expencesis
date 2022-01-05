

import React, {PureComponent} from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {selectYearData, pickAndSumData} from '../utils/dataHelper'
import { numberWithCommas } from '../../utils/thousendFormatter'


export enum metrics {
  costs = 2,
  usage = 3,
}
export interface Icolors {
  yearA: string,
  yearB: string,
  yearC: string,
}

interface Idata {
  gas: number[],
  elStatic: number[],
  elDynamic: number[],
  water: number[],
}

type Props = {
  stack?: Idata
  currentYear: number,
  unit?: string,
  metric?:metrics,
  colors?:Icolors,
  loop?:Array<Number>
  syncId?:string
}



export const Charts = (props: Props) => {
  

  const colors = {
    yearA: props.colors ? props.colors.yearA : '#8884d8',
    yearB: props.colors ? props.colors.yearB : '#50dacc',
    yearC: props.colors ? props.colors.yearC : '#c350c6'
  }

  const unit = props.unit ? props.unit : 'kr'

  const years:Array<Number> = [
    Number(props.currentYear),
    Number(props.currentYear-1),
    Number(props.currentYear-2),
  ]

  const data = [
    {
    name: `${props.currentYear}`,
    gas: pickAndSumData(selectYearData(props.stack.gas, props.currentYear), 2),
    elStatic: pickAndSumData(selectYearData(props.stack.elStatic, props.currentYear), 2),
    elDynamic: pickAndSumData(selectYearData(props.stack.elDynamic, props.currentYear), 2),
    water: pickAndSumData(selectYearData(props.stack.water, props.currentYear), 2),
  },
  {
    name: `${props.currentYear-1}`,
    gas: pickAndSumData(selectYearData(props.stack.gas, props.currentYear-1), 2),
    elStatic: pickAndSumData(selectYearData(props.stack.elStatic, props.currentYear-1), 2),
    elDynamic: pickAndSumData(selectYearData(props.stack.elDynamic, props.currentYear-1), 2),
    water: pickAndSumData(selectYearData(props.stack.water, props.currentYear-1), 2),
  },
  {
    name: `${props.currentYear-2}`,
    gas: pickAndSumData(selectYearData(props.stack.gas, props.currentYear-2), 2),
    elStatic: pickAndSumData(selectYearData(props.stack.elStatic, props.currentYear-2), 2),
    elDynamic: pickAndSumData(selectYearData(props.stack.elDynamic, props.currentYear-2), 2),
    water: pickAndSumData(selectYearData(props.stack.water, props.currentYear-2), 2),
  }
]

const RenderCustomBarLabel = (props) => {

  const { offset, x, y, width, height, value, unit='kr' } = props
  console.log('props: ', props)
  return (
  <g>
    <defs>
    <filter x="0" y="0" width="1" height="1" id="solid">
      <feFlood floodColor="rgba(33,33,33,.9)" result="bg" />
      <feMerge>
        <feMergeNode in="bg"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
    <text filter="url(#solid)" x={x + width / 2} y={y + height / 2} fill="#fff" textAnchor="middle" dy={-6}>{`${numberWithCommas(value)}${unit}`}</text>;
  </g>
)};

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
      <CartesianGrid horizontal={true} strokeDasharray="2 2 2" stroke="rgba(15,58,91,0.6)" />
      <XAxis
        dataKey="name" 
        stroke="#12456b"
        fontSize={11}
      />
      <YAxis
        stroke="#12456b"
        axisLine={false}
        unit={unit}
        name={unit}
        fontSize={11}
      />
    <Tooltip
      cursor={{fill: 'rgba(255,255,255,.03)'}}
      contentStyle={{
        border:'solid 1px rgba(33,33,33,1)',
        background:'rgba(33,33,33,.9)',
      }}
    />
    <Legend verticalAlign="top" height={36} />
    <Bar 
      dataKey="gas"
      stackId="a"
      name={`Gas`}
      fill={colors.yearA}
      barSize={30}
      label={<RenderCustomBarLabel />}
    />
    <Bar
      dataKey="elStatic"
      stackId="a"
      name={`Static Electricity`}
      fill={colors.yearB}
      label={<RenderCustomBarLabel />}
    />
    <Bar label={<RenderCustomBarLabel />} dataKey="elDynamic" stackId="a" name={`Dynamic Electricity`}  fill={colors.yearC} />
    <Bar label={<RenderCustomBarLabel />} dataKey="water" stackId="a" name={`Water`}  fill={'#ecc969'} />
  </BarChart>
  </ResponsiveContainer>

)}

export default Charts


