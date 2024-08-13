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
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// WarehouseWorx React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// WarehouseWorx React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import BASE_URL from "Baseurl";
// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { useState, useEffect } from "react";
import { Button, Stack, Box } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Assign() {
  // const { columns, rows } = authorsTableData();
  // const { columns: pColumns, rows: pRows } = projectsTableData();

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [allcities, setAllCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/address`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const allCities = data.slice(1).map((item) => item["COL 2"]);
        // console.log(allCities);

        setAllCities(allCities);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  useEffect(() => {
    const fetchData = (city = "") => {
      setLoading(true);
      let url = `${BASE_URL}/`;

      if (city) {
        url = `${BASE_URL}/assignedorder?address=${city}`;
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

    fetchData(selectedCity);
  }, [selectedCity]);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleCancle = () => {
    setSelectedCity("");
  };

  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    regNo: "",
    driverName: "",
    driverMobileNo: "",
    dateAssigned: "",
    volume: "",
  });

  useEffect(() => {
    if (open) {
      fetch(`${BASE_URL}/assigntruck?address=${selectedCity}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setData({
            regNo: data["vehicle reg no"],
            driverName: data["driver name"],
            driverMobileNo: data["mobile no"],
            dateAssigned: data["date assigned"],
            volume: data["volume"],
          });
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    // Handle form submission or any action
    setOpen(false);
    toast.success("Orders has been approved", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item sx={{ width: "20rem", mb: 2 }}>
            {" "}
            {/* Use the desired width */}
            <FormControl fullWidth variant="outlined" sx={{ height: "3.5rem" }}>
              <InputLabel>Select City</InputLabel>
              <Select
                value={selectedCity}
                onChange={handleCityChange}
                label="Select City"
                sx={{ height: "100px" }}
              >
                {allcities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {selectedCity && (
          <>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Card>
                  <MDBox
                    mx={2}
                    mt={8}
                    py={3}
                    px={2}
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                  >
                    <MDTypography variant="h6" color="white">
                      Orders Details
                    </MDTypography>
                  </MDBox>
                  <MDBox pt={3}>
                    <DataTable
                      table={{ columns, rows }}
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      noEndBorder
                    />
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={6} justifyContent="center">
              <Grid item>
                <Box display="flex" justifyContent="center" gap={2} mt={4}>
                  <Button
                    variant="outlined"
                    sx={{ color: "red", borderColor: "red" }}
                    onClick={handleCancle}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "navyblue",
                      color: "white !important",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "navyblue !important",
                        border: "1px solid navyblue",
                      },
                    }}
                    onClick={handleClickOpen}
                  >
                    Approve
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <Dialog
              open={open}
              onClose={handleClose}
              fullWidth
              maxWidth="sm"
              PaperProps={{
                sx: {
                  backgroundColor: (theme) => theme.palette.background.paper, // Ensure the background color fits both light and dark mode
                  overflow: "hidden", // Remove bottom scroll bar
                },
              }}
            >
              <DialogTitle
                sx={{
                  color: (theme) => theme.palette.text.primary, // Ensure title is visible
                  position: "relative", // For positioning the icons
                  display: "flex",
                  alignItems: "center",
                  fontSize: "2.1rem",
                  justifyContent: "space-between",
                  paddingRight: "64px", // Ensure space for the profile icon
                }}
              >
                Transport Details
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                  sx={{
                    position: "absolute",
                    right: 25,
                    top: 8,
                    color: "red", // Ensure icon color is visible
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="profile"
                  sx={{
                    position: "absolute",
                    right: 12,
                    top: 30,
                    fontSize: "15rem", // Adjust icon size
                    color: (theme) => theme.palette.text.primary, // Ensure icon color is visible
                  }}
                >
                  <PersonIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: (theme) => theme.palette.text.primary }}
                  >
                    <strong>Vehicle Reg No.:</strong> {data.regNo}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: (theme) => theme.palette.text.primary }}
                  >
                    <strong>Driver Name:</strong> {data.driverName}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: (theme) => theme.palette.text.primary }}
                  >
                    <strong>Driver Mobile no:</strong> {data.driverMobileNo}{" "}
                    {/* Ensure this is correct */}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: (theme) => theme.palette.text.primary }}
                  >
                    <strong>Date Assigned:</strong> {data.dateAssigned}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: (theme) => theme.palette.text.primary }}
                  >
                    <strong>Volume:</strong> {data.volume}
                  </Typography>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleOk}
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: "navyblue",
                    color: "white !important",
                    maxWidth: "200px", // Set a max width to make the button shorter
                    "&:hover": {
                      backgroundColor: "white",
                      color: "navyblue !important",
                      border: "1px solid navyblue",
                    },
                  }}
                >
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
        <ToastContainer />
      </MDBox>
    </DashboardLayout>
  );
}

export default Assign;
