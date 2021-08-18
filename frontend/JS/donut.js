var a = '<%- JSON.stringify(plot_donut) %>';
// a=[53,23,0,116,169]
console.log(a);
var ctx = document.getElementById('myDoughnutChart').getContext('2d');
          var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: ['CodeChef', 'CodeForces','LeetCode', 'HackerRank', 'HackerEarth'],
              datasets: [{
                label: '# of Votes',
                data: a,
                backgroundColor: [
                  '#003f5c',
                  '#374c80',
                  '#bc5090',
                  '#ef5675',
                  '#ff764a'
                ],
                borderColor: [
                  '#003f5c',
                  '#374c80',
                  '#bc5090',
                  '#ef5675',
                  '#ff764a'
                ],
                borderWidth: 1
              }]
            },
            options: {
              plugins: {
                legend: {
                  position: 'left',
                }
              }
            }
          });