import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import BatchCard from "./batchCard";
import PropTypes from "prop-types";
import BASE_URL from "Baseurl";

function Batchformation({ setBatchCity }) {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await fetch(`${BASE_URL}/batch`);
        const data = await response.json();

        const rowsData = data.map((batch) => ({
          batchId: Math.floor(100000 + Math.random() * 900000),
          driver_name: batch["COL 1"],
          vechicle_reg_no: batch["COL 2"],
          mobile_no: batch["COL 3"],
          volume: batch["COL 4"],
          status: batch["COL 5"],
          address: batch["COL 6"],
        }));

        setBatches(rowsData);
      } catch (error) {
        console.error("Error fetching batch data:", error);
      }
    };

    fetchBatches();
  }, []);

  return (
    <Card id="batch-information">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Batch Information
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {batches.map((batch) => (
            <BatchCard
              key={batch.batchId}
              batchId={batch.batchId}
              assignedTo={batch.driver_name}
              vehicleRegNo={batch.vechicle_reg_no}
              mobileNo={batch.mobile_no}
              volume={batch.volume}
              status={batch.status}
              address={batch.address}
              setBatchCity={setBatchCity}
            />
          ))}
        </MDBox>
      </MDBox>
    </Card>
  );
}

Batchformation.propTypes = {
  setBatchCity: PropTypes.func.isRequired,
};

export default Batchformation;
