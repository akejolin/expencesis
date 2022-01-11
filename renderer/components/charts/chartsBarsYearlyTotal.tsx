

import React, {PureComponent} from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {selectYearData, pickAndSumData} from '../utils/dataHelper'
import { numberWithCommas } from '../../utils/thousendFormatter'


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
  stack?: number[]
  currentYear: number,
  unit?: string,
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

  const data = [
    {
    name: `${props.currentYear}`,
    d1: pickAndSumData(selectYearData(props.stack, props.currentYear), 'c'),
 
  },
  {
    name: `${props.currentYear-1}`,

    d2: pickAndSumData(selectYearData(props.stack, props.currentYear-1), 'c'),

  },
  {
    name: `${props.currentYear-2}`,
    d3: pickAndSumData(selectYearData(props.stack, props.currentYear-2), 'c'),
  }
]

const RenderCustomBarLabel = (props) => {

  const { x, y, width, height, value, unit='kr' } = props
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
    <text filter="url(#solid)" x={x + width / 2} y={y - 5 } fill="#fff" textAnchor="middle" dy={-6}>{`${numberWithCommas(value)}${unit}`}</text>;
  </g>
)};
    //label={<RenderCustomBarLabel />}
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        syncId={props.syncId}
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
      <CartesianGrid horizontal={true} strokeDasharray="2 2 2" stroke="rgba(15,58,91,0.6)" />
      <XAxis dataKey="name" stroke="#12456b" fontSize={11} />
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
    <Bar stackId={`${props.syncId}-s1`} dataKey="d1" label={<RenderCustomBarLabel />}  name={`${props.currentYear-0}`} fill={colors.yearA} />
    <Bar stackId={`${props.syncId}-s1`} dataKey="d2" label={<RenderCustomBarLabel />} name={`${props.currentYear-1}`} fill={colors.yearB} />
    <Bar stackId={`${props.syncId}-s1`} dataKey="d3" label={<RenderCustomBarLabel />} name={`${props.currentYear-2}`}  fill={colors.yearC} />

  </BarChart>
  </ResponsiveContainer>

)}

export default Charts


