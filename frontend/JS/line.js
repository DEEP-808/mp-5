var ctx = document.getElementById('myLineChart');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March','April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Data',
            data: [12, 19, 13, 23, 15, 22, 27, 17, 20, 23, 25, 30, 21],
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
            borderWidth: 3,
            pointBorderWidth:5,
        }]
    },
    options: {
    }
});