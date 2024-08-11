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
import Card from "@mui/material/Card";

// WarehouseWorx React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import BatchCard from "./batchCard";

function Batchformation() {
  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Batch Information
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {/* batchId, assignedTo, vehicleRegNo, mobileNo, toatalOrders, status  */}
          <BatchCard
            batchId="oliver liam"
            assignedTo="viking burrito"
            vehicleRegNo="oliver@burrito.com"
            mobileNo="FRB1235476"
            toatalOrders="343"
            status="dispatched"
          />
          <BatchCard
            batchId="oliver liam"
            assignedTo="viking burrito"
            vehicleRegNo="oliver@burrito.com"
            mobileNo="FRB1235476"
            toatalOrders="343"
            status="dispatched"
          />
          <BatchCard
            batchId="oliver liam"
            assignedTo="viking burrito"
            vehicleRegNo="oliver@burrito.com"
            mobileNo="FRB1235476"
            toatalOrders="343"
            status="dispatched"
            noGutter
          />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Batchformation;
