import React from 'react'
import { Table } from "react-bootstrap";
import { NutritionChartData } from "./NutritionChartComponent";

const planCellStyle = {
  backgroundColor: "#8884d8"
};
const targetCellStyle = {
  backgroundColor: "#82ca9d"
};

export const NutritionInfoTable = ({macroData, calorieData}: NutritionChartData) => {
  const rows = macroData.map((d) => {
    return (
      <tr key={d.name}>
        <td>{d.name}</td>
        <td style={planCellStyle}>{d.plan}g</td>
        <td style={targetCellStyle}>{d.target}g</td>
        <td>{d.diff}g</td>
      </tr>
    )
  })
  rows.push(
    <tr>
      <td>{calorieData[0].name}</td>
      <td style={planCellStyle}>{calorieData[0].plan} kCal</td>
      <td style={targetCellStyle}>{calorieData[0].target} kCal</td>
      <td>{calorieData[0].diff} kCal</td>
    </tr>
  )

  return (
    <Table style={{width: 450}} responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Unit</th>
                    <th>Plan</th>
                    <th>Target</th>
                    <th>Diff</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
  )
}
