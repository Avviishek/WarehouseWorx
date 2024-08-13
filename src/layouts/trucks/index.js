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
import DataTable from "examples/Tables/DataTable";
import BASE_URL from "Baseurl";
// Data
import { useState, useEffect } from "react";

function Trucks() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch orders data from the API
    fetch(`${BASE_URL}/trucks`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network responses was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Define your columns here
        const columnsData = [
          { Header: "Registration Number", accessor: "regitration_no", align: "left" },
          { Header: "Volumn(m\u00B3)", accessor: "volumn", align: "center" },
          { Header: "Driver Contact", accessor: "contact", align: "center" },
          { Header: "Driver Name", accessor: "driver_name", align: "center" },
          { Header: "Status", accessor: "status", align: "center" },
        ];

        const rowsData = data.slice(1).map((trucks) => ({
          regitration_no: trucks["COL 1"],
          volumn: trucks["COL 2"],
          status: trucks["COL 3"] === "1" ? "Available" : "Not Available",
          contact: trucks["COL 4"],
          driver_name: trucks["COL 5"],
        }));

        setColumns(columnsData);
        setRows(rowsData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
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
                  Trucks Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Trucks;
