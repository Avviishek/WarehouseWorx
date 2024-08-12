import React, { useState, useEffect } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import QrReader from "modern-react-qr-reader";
import dayjs from "dayjs";

function Orders() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showComponent, setShowComponent] = useState(false);
  const [webcamResult, setWebcamResult] = useState(null);

  const cities = [
    "Bangalore",
    "Delhi",
    "Hyderabad",
    "Silchar",
    "Pune",
    "Noida",
    "Chennai",
    "Mumbai",
    "Kolkata",
    "Guwahati",
  ];

  useEffect(() => {
    const fetchData = (city = "", startDate = null, endDate = null) => {
      setLoading(true);

      let url = "https://walmartworx-backend.onrender.com/orders";

      if (city) {
        url = `https://walmartworx-backend.onrender.com/orderaddress?address=${city}`;
      } else if (startDate && endDate) {
        url = `https://walmartworx-backend.onrender.com/orderdaterange?startDate=${startDate}&endDate=${endDate}`;
      }
      if (city && startDate && endDate) {
        url = `https://walmartworx-backend.onrender.com/orderdateaddress?startDate=${startDate}&endDate=${endDate}&address=${city}`;
      }

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const columnsData = [
            { Header: "Order ID", accessor: "Order_Id", align: "left" },
            { Header: "Date", accessor: "Date", align: "center" },
            { Header: "Category", accessor: "Category", align: "center" },
            { Header: "Volume(m\u00B3)", accessor: "Volume", align: "center" },
            { Header: "Address", accessor: "Address", align: "center" },
            { Header: "PIN", accessor: "PIN", align: "center" },
          ];
          const rowsData = data.slice(1).map((order) => ({
            Order_Id: order["COL 1"],
            Address: order["COL 2"],
            PIN: order["COL 3"],
            Date: order["COL 7"],
            Category: order["COL 5"],
            Volume: order["COL 6"],
          }));

          setColumns(columnsData);
          setRows(rowsData);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    };

    fetchData(
      selectedCity,
      startDate && dayjs(startDate).format("DD/MM/YYYY"),
      endDate && dayjs(endDate).format("DD/MM/YYYY")
    );
  }, [selectedCity, startDate, endDate]);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const handleUploadOrder = () => {
    setShowComponent(true);
  };

  const handleDialogClose = () => {
    setShowComponent(false);
  };

  const handleDataClose = () => {
    setWebcamResult(null);
  };

  const webcamError = (error) => {
    if (error) {
      console.log(error);
    }
  };

  const webcamScan = (result) => {
    if (result) {
      setWebcamResult(JSON.parse(result)); // Parse the JSON result
      setShowComponent(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error: {error.message}. Please try refreshing the page or check your network connection.
      </div>
    );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                    Orders Table
                  </MDTypography>
                </MDBox>
                <MDBox pt={3} px={2}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={2}>
                      <FormControl fullWidth variant="outlined" sx={{ height: "2.5rem" }}>
                        <InputLabel>Select City</InputLabel>
                        <Select
                          value={selectedCity}
                          onChange={handleCityChange}
                          label="Select City"
                          sx={{ height: "100px" }}
                        >
                          {cities.map((city) => (
                            <MenuItem key={city} value={city}>
                              {city}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs="auto">
                      <MDButton
                        variant="contained"
                        color="info"
                        onClick={handleUploadOrder}
                        fullWidth
                        startIcon={<AddIcon />}
                      >
                        Add order
                      </MDButton>
                    </Grid>

                    <Grid item xs={3}>
                      <DatePicker
                        label="Start Date"
                        inputFormat="DD/MM/YYYY"
                        value={startDate}
                        onChange={handleStartDateChange}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                    </Grid>

                    <Grid item xs={3}>
                      <DatePicker
                        label="End Date"
                        inputFormat="DD/MM/YYYY"
                        value={endDate}
                        onChange={handleEndDateChange}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                    </Grid>
                    <Grid item xs="auto">
                      <MDButton
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          setSelectedCity("");
                          setStartDate(null);
                          setEndDate(null);
                        }}
                      >
                        Reset Filters
                      </MDButton>
                    </Grid>
                  </Grid>
                </MDBox>
                <MDBox pt={3}>
                  {rows.length > 0 ? (
                    <DataTable
                      table={{ columns, rows }}
                      isSorted={false}
                      entriesPerPage={true}
                      showTotalEntries={true}
                      noEndBorder
                    />
                  ) : (
                    <MDBox p={3}>
                      <MDTypography variant="h6" align="center">
                        No orders found for the selected filters.
                      </MDTypography>
                    </MDBox>
                  )}
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </LocalizationProvider>

      {/* QR Scanner Dialog */}
      <Dialog open={showComponent} onClose={handleDialogClose}>
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="80vh"
          width="70vh"
        >
          <Card
            sx={{
              maxWidth: 500,
              width: "100%",
              boxShadow: "none", // Remove the shadow, effectively removing the border
              borderRadius: 0, // Remove any rounded corners if needed
              padding: 2,
            }}
          >
            <CardHeader
              title="Scan Order QR Code"
              titleTypographyProps={{ variant: "h5", align: "center" }}
              sx={{ paddingBottom: 0 }}
            />
            <CardContent sx={{ textAlign: "center" }}>
              <QrReader
                delay={300}
                onError={webcamError}
                onScan={webcamScan}
                style={{ width: "100%" }}
                facingMode={"user"}
              />
              <MDTypography variant="h6" color="textSecondary" sx={{ marginTop: 2 }}>
                {webcamResult ? `Order Details: ${webcamResult}` : "No QR Code Scanned"}
              </MDTypography>
            </CardContent>
          </Card>
        </MDBox>
      </Dialog>

      {/* Order Details Dialog */}
      <Dialog
        open={!showComponent && !!webcamResult}
        onClose={handleDataClose}
        maxWidth="sm"
        fullWidth
      >
        <MDBox
          sx={{
            backgroundColor: "#1A2035", // Dark background color
            color: "#fff", // White text color
            borderRadius: "6px",
          }}
        >
          <DialogTitle>
            <MDBox display="flex" justifyContent="space-between" alignItems="center">
              <MDTypography variant="h6" sx={{ color: "#fff" }}>
                Order Details
              </MDTypography>
              <IconButton
                aria-label="close"
                onClick={handleDataClose}
                sx={{ color: "#fff" }} // White color for the close icon
              >
                <CloseIcon />
              </IconButton>
            </MDBox>
          </DialogTitle>
          <DialogContent dividers sx={{ color: "#ddd", backgroundColor: "#1A2035" }}>
            {webcamResult && (
              <MDBox sx={{ p: 2 }}>
                <MDTypography variant="body1">
                  <strong>Order Id:</strong> {webcamResult["COL 1"]}
                </MDTypography>
                <MDTypography variant="body1">
                  <strong>Address:</strong> {webcamResult["COL 2"]}
                </MDTypography>
                <MDTypography variant="body1">
                  <strong>PIN:</strong> {webcamResult["COL 3"]}
                </MDTypography>
                <MDTypography variant="body1">
                  <strong>Quantity:</strong> {webcamResult["COL 4"]}
                </MDTypography>
                <MDTypography variant="body1">
                  <strong>Category:</strong> {webcamResult["COL 5"]}
                </MDTypography>
                <MDTypography variant="body1">
                  <strong>Volume:</strong> {webcamResult["COL 6"]}
                </MDTypography>
                <MDTypography variant="body1">
                  <strong>Date:</strong> {webcamResult["COL 7"]}
                </MDTypography>
              </MDBox>
            )}
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "#1A2035" }}>
            <MDBox display="flex" justifyContent="flex-end" width="100%" p={2}>
              <MDButton
                onClick={handleDataClose}
                variant="contained"
                sx={{
                  backgroundColor: "#338DED", // Darker button background
                  color: "#fff", // White text color for the button
                  "&:hover": {
                    backgroundColor: "#2a6bbf", // Dark blue on hover
                    color: "#fff", // White text on hover
                  },
                }}
              >
                Confirm
              </MDButton>
            </MDBox>
          </DialogActions>
        </MDBox>
      </Dialog>
    </DashboardLayout>
  );
}

export default Orders;
