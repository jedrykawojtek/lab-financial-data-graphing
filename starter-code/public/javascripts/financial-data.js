function getDataRange() {
    let startDate = document.getElementById("start-date").value
    let endDate =  document.getElementById("end-date").value
    return [startDate, endDate]
}

window.onload = function() {
    document.getElementById("get-graph").onclick = function() {
        let range = getDataRange()
        let start = range[0];
        let end = range[1];
       
        axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${$('#currency').val()}&start=${start}&end=${end}`)
        .then(function(response) {
          let dates = Object.keys(response.data.bpi)
          let bitcoinPrices = Object.values(response.data.bpi)
          drawGraph(dates, bitcoinPrices)
         
          $('#min').append(Math.min.apply(Math, bitcoinPrices));
          $('#max').append(Math.max.apply(Math, bitcoinPrices));
  
        })
        .catch(function(error) {
           
            console.log(error);
          })

       
    }
}

var ctx = document.getElementById('myChart').getContext('2d');

function drawGraph(dates, bitcoinPrices) {
    debugger
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: dates,
            datasets: [{
                label: 'Bitcoin Price index chart',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: bitcoinPrices
            }]
        },
        // Configuration options go here
        options: {}
    });
}