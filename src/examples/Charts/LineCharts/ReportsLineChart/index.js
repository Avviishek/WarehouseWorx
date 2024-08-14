import { useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import DataTable from "examples/Tables/DataTable";

// WarehouseWorx React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// ReportsLineChart configurations
import configs from "examples/Charts/LineCharts/ReportsLineChart/configs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function ReportsLineChart({ color, title, description, date, chart }) {
  const { data, options } = configs(
    (
      chart.labels || [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]
    ).map((label) => label.substring(0, 3)), // Ensure labels are up to 3 characters
    chart.datasets || {
      label: "Sales",
      data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200],
    }
  );

  // Define the columns for the DataTable
  const columnsData = [
    { Header: "Month", accessor: "month", align: "center" },
    { Header: "Sales Predicted", accessor: "sales", align: "center" },
  ];

  // Debugging: log the structure of the chart object
  //console.log("Chart Labels:", chart.labels);
  //console.log("Chart Data:", chart.datasets.data);

  // Create rows data by mapping labels to corresponding sales data
  const rowsData = chart.labels.map((label, index) => ({
    month: label,
    sales: chart.datasets.data[index],
  }));

  // Debugging: log the rowsData to ensure it is correctly structured

  return (
    <Card sx={{ height: "100%", boxShadow: "none" }}>
      <MDBox padding="1rem">
        {useMemo(
          () => (
            <MDBox
              variant="gradient"
              bgColor={color}
              borderRadius="lg"
              coloredShadow={color}
              py={2}
              pr={0.5}
              mt={-5}
              height="25rem"
            >
              <Line data={data} options={options} redraw />
            </MDBox>
          ),
          [chart, color]
        )}
        <MDBox pt={3} pb={1} px={1}>
          <MDTypography variant="h6" textTransform="capitalize">
            {title}
          </MDTypography>
          <MDTypography component="div" variant="button" color="text" fontWeight="light">
            {description}

            <MDBox pt={3}>
              <DataTable
                table={{ columns: columnsData, rows: rowsData }} // Corrected prop structure
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </MDBox>
          </MDTypography>

          <Divider />
          <MDBox display="flex" alignItems="center">
            <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
              <Icon>schedule</Icon>
            </MDTypography>
            <MDTypography variant="button" color="text" fontWeight="light">
              {date}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of ReportsLineChart
ReportsLineChart.defaultProps = {
  color: "info",
  description: "",
};

// Typechecking props for the ReportsLineChart
ReportsLineChart.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  date: PropTypes.string.isRequired,
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default ReportsLineChart;
