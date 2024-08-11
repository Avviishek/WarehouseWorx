import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";

function BatchOrderTable({ batchId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://walmartworx-backend.onrender.com/orders?batchId=${batchId}`)
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((order) => ({
          orderId: order["COL 1"],
          volume: order["COL 6"],
          status: order["COL 5"],
          id: order["COL 1"], // Ensure each row has a unique id
        }));
        setOrders(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, [batchId]);

  const columns = [
    { field: "orderId", headerName: "Order ID", width: 150 },
    { field: "volume", headerName: "Volume (m³)", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
  ];

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Batch Id - {batchId}
        </MDTypography>
      </MDBox>
      <MDBox pt={3} px={2}>
        <DataGrid
          rows={orders}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          loading={loading}
          autoHeight
          getRowId={(row) => row.id} // Ensure each row has a unique id
        />
      </MDBox>
    </Card>
  );
}

BatchOrderTable.propTypes = {
  batchId: PropTypes.string.isRequired,
};

export default BatchOrderTable;
