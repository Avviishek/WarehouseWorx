import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// WarehouseWorx React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// WarehouseWorx React examples
import DataTable from "examples/Tables/DataTable";
import BASE_URL from "Baseurl";
// Data

function Projects() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [menu, setMenu] = useState(null); // Initialized as null for the menu anchor
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);

    const url = `${BASE_URL}/recentorders`;

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

        // Assuming the first row is headers, skipping it by using slice(1)
        const rowsData = data.map((order) => ({
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

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Recent Orders
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}></MDBox>
        </MDBox>
        {renderMenu}
      </MDBox>
      <MDBox pt={3}>
        {loading ? (
          <MDBox p={3}>
            <MDTypography variant="h6" align="center">
              Loading...
            </MDTypography>
          </MDBox>
        ) : error ? (
          <MDBox p={3}>
            <MDTypography variant="h6" align="center" color="error">
              {`Error: ${error.message}`}
            </MDTypography>
          </MDBox>
        ) : rows.length > 0 ? (
          <DataTable
            table={{ columns, rows }}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
            noEndBorder
          />
        ) : (
          <MDBox p={3}>
            <MDTypography variant="h6" align="center">
              No recent orders.
            </MDTypography>
          </MDBox>
        )}
      </MDBox>
    </Card>
  );
}

export default Projects;
