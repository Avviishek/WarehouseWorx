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

// @mui material components
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
// WarehouseWorx React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// WarehouseWorx React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";

// Data
import getChartData from "layouts/dashboard/data/reportsLineChartData";

function Sales_Prediction() {
  const [chartData, setChartData] = useState({ sales: null, tasks: null });
  const [selectedProduct, setSelectedProduct] = useState("");
  const products = [
    "Candles",
    "Chocolates",
    "Heaters",
    "Mobile Phone",
    "Shoes",
    "Sweatshirts",
    "T shirt",
    "Television",
  ];

  useEffect(() => {
    async function fetchData() {
      const data = await getChartData(selectedProduct);
      setChartData(data);
      //console.log(data);
    }

    fetchData();
  }, [selectedProduct]);

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  if (!chartData.sales || !chartData.tasks) return <div>Loading...</div>;

  const { sales, tasks } = chartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Sales Prediction
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <Grid container justifyContent="space-between">
                  <Grid item xs={2}>
                    <FormControl fullWidth variant="outlined" sx={{ height: "2.5rem" }}>
                      <InputLabel>Select Product</InputLabel>
                      <Select
                        value={selectedProduct}
                        onChange={handleProductChange}
                        label="Select Product"
                        sx={{ height: "100px" }}
                      >
                        {products.map((product) => (
                          <MenuItem key={product} value={product}>
                            {product}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </MDBox>
              {/* Data Analysis - (Graph, Chart, etc) component here */}

              <MDBox pt={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12} lg={12}>
                    <MDBox mb={3} pt={3}>
                      {selectedProduct && (
                        <ReportsLineChart
                          color="dark"
                          title={`${selectedProduct} Stocks Requirement`}
                          description={
                            <>
                              These are the predicted sales of <strong>{selectedProduct}</strong>.
                              Please maintain the Stocks according to the following report.
                            </>
                          }
                          date="updated just now"
                          chart={sales}
                        />
                      )}
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Sales_Prediction;
