// Get the form, table, and chart elements
const form = document.getElementById('usageForm');
const tableBody = document.getElementById('usageTable').querySelector('tbody');
const ctx = document.getElementById('energyChart').getContext('2d');

// Variables to store data for chart
const appliances = [];
const energyConsumption = [];

// Handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get values from form fields
    const appliance = document.getElementById('appliance').value;
    const consumption = parseFloat(document.getElementById('consumption').value);
    const hours = parseFloat(document.getElementById('hours').value);

    // Add new row to the table
    const newRow = tableBody.insertRow();
    newRow.insertCell(0).textContent = appliance;
    newRow.insertCell(1).textContent = `${consumption} kWh`;
    newRow.insertCell(2).textContent = `${hours} hours`;

    // Update data for the chart
    appliances.push(appliance);
    energyConsumption.push(consumption * hours);

    // Reset the form fields
    form.reset();

    // Update the chart
    updateChart();
});

// Function to create/update the chart
let energyChart;
function updateChart() {
    if (energyChart) {
        energyChart.destroy(); // Clear the existing chart if it exists
    }
    energyChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: appliances,
            datasets: [{
                data: energyConsumption,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            let value = context.raw || 0;
                            return `${label}: ${value} kWh`;
                        }
                    }
                }
            }
        }
    });
}
