/**
=========================================================
* WarehouseWorx React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import BASE_URL from "Baseurl";

export default async function getChartData(product) {
  const response = await fetch(`${BASE_URL}/predictedSales?address=delhi`);
  const data = await response.json();

  // Filter the data to include only the sales of "Shoes"
  const Data = data.filter((item) => item["COL 2"] === product);

  // Extract the months and sales values
  const monthOrder = {
    January: 1,
    Febuary: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  // Sort shoesData by month
  const sortedData = Data.sort((a, b) => {
    return monthOrder[a["COL 1"]] - monthOrder[b["COL 1"]];
  });
  const labels = sortedData.map((item) => item["COL 1"]);
  const sales = sortedData.map((item) => Math.floor(parseFloat(item["COL 3"])));

  // Assuming the API response has the same structure
  return {
    sales: {
      labels: labels,
      datasets: { label: `Predicted ${product} sales`, data: sales },
    },
    tasks: {
      labels: labels,
      datasets: { label: `Predicted ${product} sales`, data: sales },
    },
  };
}
