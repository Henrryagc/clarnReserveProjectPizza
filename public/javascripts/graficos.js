var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["ventas s/.", "compras s/.", "clientes", "empleados", "pedidos", "perdidas"],
    datasets: [
      {
        label: "Datos de la Empresa",
        data: [92, 19,173, 5, 52, 23],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 12, 192, 0.2)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 12, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});
