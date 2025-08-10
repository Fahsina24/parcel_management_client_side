import axios from "axios";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const Statistics = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      xaxis: {
        BookingDates: [],
      },
    },
  });

  const getData = async () => {
    const res = await fetch(`http://localhost:3000/allParcels`);
    const data = await res.json();
    console.log(data);
    setChartData({
      series: [{ name: "Date", data: data.BookingDate }],
      options: {
        ...chartData.options,
        xaxis: { BookingDates: data.BookingDate },
      },
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default Statistics;
