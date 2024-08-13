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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// WarehouseWorx React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// WarehouseWorx React context
import { useMaterialUIController } from "context";
import { TextField } from "@mui/material";

function BatchCard({ batchId, assignedTo, vehicleRegNo, mobileNo, volume, status, noGutter }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-200"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
      sx={{
        border: "1px solid", // Adding a border
        borderColor: darkMode ? "grey-600" : "grey-300", // Border color based on dark mode
        boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.1)", // Adding a shadow
      }}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            Batch ID : {batchId}
          </MDTypography>

          <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
            {/* <MDBox mr={1}>
              <MDButton variant="text" color="error">
                <Icon>delete</Icon>&nbsp;delete
              </MDButton>
            </MDBox> */}
            <MDButton variant="text" color={darkMode ? "white" : "dark"}>
              <Icon>visibility</Icon>&nbsp;Show Batch Orders
            </MDButton>
          </MDBox>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Assigned To:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {assignedTo}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Vehical Reg No. :&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {vehicleRegNo}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Mobile Number:&nbsp;&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {mobileNo}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Volume cubic m:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {volume}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Status:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {status}
            </MDTypography>
          </MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Bill
BatchCard.defaultProps = {
  noGutter: false,
};

// Typechecking props for the BatchCard
BatchCard.propTypes = {
  batchId: PropTypes.string.isRequired,
  assignedTo: PropTypes.string.isRequired,
  vehicleRegNo: PropTypes.string.isRequired,
  mobileNo: PropTypes.string.isRequired,
  volume: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  status: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};
export default BatchCard;
