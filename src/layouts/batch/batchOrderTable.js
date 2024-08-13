import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import BASE_URL from "Baseurl";
import { useMaterialUIController } from "context";

function BatchOrderTable({ batchcity }) {
  const [orders, setOrders] = useState([]);
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  useEffect(() => {
    if (batchcity) {
      fetch(`${BASE_URL}/batchorder?address=${batchcity}`)
        .then((response) => response.json())
        .then((data) => {
          const formattedData = data.map((order) => ({
            orderId: order["COL 1"],
            volume: order["COL 6"],
            status: "Approved",
            id: order["COL 1"], // Ensure each row has a unique id
          }));
          setOrders(formattedData);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }
  }, [batchcity]);

  const columns = [
    { field: "orderId", headerName: "Order ID", width: 150 },
    { field: "volume", headerName: "Volume (m³)", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <MDBox
          sx={{
            background: "linear-gradient(90deg, #43a047 0%, #66bb6a 100%)", // Green gradient background
            borderRadius: "8px", // Slightly rounded corners
            padding: "2px 6px", // Compact padding
            textAlign: "center",
            color: "white !important", // Correctly applied white text color
            fontWeight: "bold",
            fontSize: "0.75rem", // Smaller font size for button-like appearance
            display: "inline-block", // Keeps the box tight around the text
            minWidth: "60px", // Consistent button width
            height: "24px", // Vertically short button
            lineHeight: "20px", // Align text vertically in the middle
            cursor: "default", // Pointer cursor to mimic a button (optional)
          }}
        >
          {params.value}
        </MDBox>
      ),
    },
  ];

  return (
    <Card sx={{ height: "100%", backgroundColor: "transparent" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography
          variant="h6"
          fontWeight="medium"
          textTransform="capitalize"
          color={darkMode ? "white" : "black"} // Adjusted for dark mode
        >
          Batch Orders
        </MDTypography>
      </MDBox>
      <MDBox pt={3} px={2}>
        <DataGrid
          rows={orders}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          autoHeight
          sx={{
            "& .MuiDataGrid-cell": {
              color: darkMode ? "#fff" : "#000", // Changing the text color of cells
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "transparent", // Keep header background transparent
              color: darkMode ? "#fff" : "#000", // Header text color
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "transparent", // Keep footer background transparent
              color: darkMode ? "#fff" : "#000", // Footer text color
            },
            "& .MuiTablePagination-root": {
              color: darkMode ? "#fff" : "#000", // Pagination text color
            },
            "& .MuiDataGrid-row": {
              backgroundColor: "transparent", // Keep row background transparent
            },
          }}
          getRowId={(row) => row.id}
        />
      </MDBox>
    </Card>
  );
}

BatchOrderTable.propTypes = {
  batchcity: PropTypes.string.isRequired,
};

export default BatchOrderTable;
