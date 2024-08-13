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

// WarehouseWorx React components
import MDBox from "components/MDBox";

// WarehouseWorx React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Batchformation from "./batchInfo";
import BatchOrderTable from "./batchOrderTable";

import { useState } from "react";

function Batch() {
  const [batchcity, setBatchCity] = useState(null);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Batchformation setBatchCity={setBatchCity} />
            </Grid>
            <Grid item xs={12} md={5}>
              <BatchOrderTable batchcity={batchcity} />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Batch;
