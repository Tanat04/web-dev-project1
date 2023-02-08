import * as React from "react"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js"

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler)

function LineChart({ sortedLabels, sortedSemGpas }) {
  const data = {
    labels: sortedLabels,
    datasets: [
      {
        data: sortedSemGpas,
        label: "Test",
        backgroundColor: "transparent",
        borderColor: "black",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
        fill: true,
      },
    ],
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  }

  return <Line data={data} options={options}></Line>
}

export default LineChart
