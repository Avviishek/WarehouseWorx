import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

function Orders() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
                          sx={{ height: "100px" }} // Adjust the height here
                        >
                          {cities.map((city) => (
                            <MenuItem key={city} value={city}>
                              {city}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
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
                  </Grid>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={true}
                    showTotalEntries={true}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </LocalizationProvider>
    </DashboardLayout>
  );
}

export default Orders;
