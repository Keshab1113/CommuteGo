import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 7300,
    amt: 2100,
  },
  {
    name: 'Page H',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page I',
    uv: 3490,
    pv: 8300,
    amt: 2100,
  },
  {
    name: 'Page J',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page K',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page L',
    uv: 2390,
    pv: 7800,
    amt: 2500,
  },
  {
    name: 'Page M',
    uv: 4490,
    pv: 4800,
    amt: 2100,
  },
  
  
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/stacked-bar-chart-s47i2';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={300}
          height={200}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" stackId="a" fill="blue" />
          <Bar dataKey="uv" stackId="a" fill="rgb(234 179 8)" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
