import Chart from 'chart.js/auto';

export class Dashboard {
    constructor() {
        console.log('DASHBOARD');
        // this.initLayoutLogic();
        this.createPlaceholderCharts();
    }

    createPlaceholderCharts() {
        const pieColors = ['red', 'orange', 'yellow', 'green', 'blue'];
        const commonOptions = {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1,
            radius: '90%',
            plugins: {
                legend: {
                    position: 'top',
                    align: 'center',
                    fullSize: true,
                    labels: {
                        usePointStyle: false,

                        boxWidth: 35,
                        boxHeight: 10,
                        padding: 15,
                        font: {
                            size: 12,
                            family: 'Roboto',
                            weight: 500
                        },
                    },
                    tooltip: {
                        enabled: true
                    }
                },
            }
        }
        const inChart = document.getElementById('incomeChart');
        if (inChart) {
            new Chart(inChart, {
                type: 'pie',
                data: {
                    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
                    datasets: [{
                        data: [10, 20, 15, 30, 25],
                        backgroundColor: pieColors,
                        borderWidth: 1
                    }]
                },
                options: commonOptions
            });
        }
        const exChart = document.getElementById('expenseChart');
        if (exChart) {
            new Chart(exChart, {
                type: 'pie',
                data: {
                    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
                    datasets: [{
                        data: [30, 10, 20, 15, 25],
                        backgroundColor: pieColors,
                        borderWidth: 1
                    }]
                },
                options: commonOptions
            });
        }
    }
}