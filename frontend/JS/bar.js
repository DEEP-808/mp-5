var ctx = document.getElementById('myBarChart');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['January', 'February', 'March','April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
      label: 'Data',
      data: [12, 19, 13, 23, 15, 22, 10, 17, 20, 15, 25, 20],
      backgroundColor: [
        '#65338d',
        '#4770b3',
        '#d21f75',
        '#3b3689',
        '#50aed3',
        '#48b24f',
        '#e57438',
        '#569dd2',
        '#e4b031',
        '#84d257',
        '#cad93f',
        '#f5c8af'
      ],
      borderColor: [
        '#65338d',
        '#4770b3',
        '#d21f75',
        '#3b3689',
        '#50aed3',
        '#48b24f',
        '#e57438',
        '#569dd2',
        '#e4b031',
        '#84d257',
        '#cad93f',
        '#f5c8af'
      ],
      borderWidth: 1
    }]
  },
  options: {
  
  }
});