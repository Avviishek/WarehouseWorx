function configs(labels, datasets) {
  return {
    data: {
      labels, // The labels for the x-axis
      datasets: [
        {
          label: datasets.label, // Dataset label (e.g., "Sales")
          tension: 0.4, // Slightly increase the tension for smoother lines
          pointRadius: 5,
          pointBorderColor: "transparent",
          pointBackgroundColor: "rgba(255, 255, 255, .8)",
          borderColor: "rgba(75, 192, 192, 1)", // Updated color for better visibility
          borderWidth: 4,
          backgroundColor: "rgba(75, 192, 192, 0.2)", // Add background color to the line chart area
          fill: true,
          data: datasets.data, // Data points for each label
          maxBarThickness: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true, // Enable legend display if you have multiple datasets
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.dataset.label}: ${context.parsed.y}`; // Customize tooltip labels
            },
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
            color: "rgba(255, 255, 255, .2)",
          },
          ticks: {
            display: true,
            color: "#f8f9fa",
            padding: 10,
            font: {
              size: 14,
              weight: 300,
              family: "Roboto",
              style: "normal",
              lineHeight: 2,
            },
            stepSize: 10, // Reduced step size for more y-axis labels
            callback: function (value) {
              return value; // Customize y-axis tick labels if needed
            },
          },
          beginAtZero: true, // Ensure y-axis starts at zero
          suggestedMax: Math.ceil(Math.max(...datasets.data) / 50) * 50, // Adjusted for the new step size
        },
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            color: "#f8f9fa",
            padding: 10,
            font: {
              size: 14,
              weight: 300,
              family: "Roboto",
              style: "normal",
              lineHeight: 2,
            },
            autoSkip: false, // Ensure all labels are displayed
            maxRotation: 45, // Rotate labels by 45 degrees
            minRotation: 45, // Minimum rotation of 45 degrees
          },
        },
      },
    },
  };
}

export default configs;
