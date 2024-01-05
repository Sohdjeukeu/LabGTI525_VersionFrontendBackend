
// Source: https://leimao.github.io/blog/JavaScript-ChartJS-Histogram/,   https://www.youtube.com/watch?v=SykYjzXI3tU&ab_channel=ChartJS
export function updateChart(passages, periode, typePeriode) {
    const barCanvas = document.getElementById("barCanvas");

    // Solution: https://stackoverflow.com/questions/40056555/destroy-chart-js-bar-graph-to-redraw-other-graph-in-same-canvas
    if (window.barChart) {
        window.barChart.destroy();
    }
    window.barChart = new Chart(barCanvas, {
        type: "bar",
        data: {
            labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
            datasets: [{
                data: passages,
                backgroundColor: 'lightgreen',
                borderColor: 'green',
                borderWidth: 1,
                barPercentage: 1,
                categoryPercentage: 1,
                borderRadius: 5,
            }],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    // grid: { offset: false },
                    ticks: { stepSize: 1, suggestedMin: 1 },
                    title: {
                        display: true,
                        text: 'Période',
                        font: { size: 14 }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Passages',
                        font: { size: 14 }
                    }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        title: (items) => {
                            if (!items.length) { return ''; }
                            const item = items[0];
                            const y = item.parsed.y;
                            const x = item.parsed.x;
                            return `${y} passages \nJour ${x}`;
                        }
                    }
                }
            }
        }
    });
}