$(function () { //data in global variable json
  if (typeof json !== 'undefined') {
    Kostal.draw(json);
  }
});

var Kostal = {
  Data: {},
  Chart: false,
  parse: function(lines){
    Kostal.Data = {Power: [], Voltage:[]};
    $.each(lines, Kostal.parse_line);
  },
  parse_line: function(i, line){
    var items = line.split(';');
    var t = new Date(items[0].substring(0,19)).getTime();//silly ISOString
    var p = parseInt(items[4]);
    var u1 = parseInt(items[5]);
    if (p){
      Kostal.Data.Power.push([ t, p ]);
      Kostal.Data.Voltage.push([ t, u1 ]);
    }
  },
  update: function(line){
    Kostal.parse_line(0, line);
    Kostal.draw(); //addPoint is not working
   // Kostal.Chart.series[0].addPoint(Kostal.Data.Power[Kostal.Data.Power.length-1], true, false);
   // Kostal.Chart.series[1].addPoint(Kostal.Data.Voltage[Kostal.Data.Voltage.length-1], true, false);
  }
  
};

Kostal.draw = function draw(lines){
  if (Kostal.Chart) Kostal.Chart.destroy();
  if(lines) Kostal.parse(lines);


  var chart = $('#highchart').highcharts({
  chart: {
      type: 'spline',
      zoomType: 'x',
      height: '700',
      animation: false //until addPoint is working
  },
  title: {
      text: 'Graph'
  },
  xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { // Only show day?
      }
  },
  yAxis: [{ // Primary yAxis POWER
      labels: {
          format: '{value} W',
          style: {
              color: '#89A54E'
          }
      },
      min: 0,
      title: {
          text: 'Power',
          style: {
              color: '#89A54E'
          }
      }
    }, { // Secondary yAxis
      title: {
          text: 'Voltage',
          style: {
              color: '#4572A7'
          }
      },
      labels: {
          format: '{value} V',
          style: {
              color: '#4572A7'
          }
      },
      opposite: true
  }],
  tooltip: {
    shared: true
   /*   formatter: function() {
              return '<b>'+ this.series.name +'</b><br/>'+
              Highcharts.dateFormat('%e. %b', this.x) +': '+ this.y +' m';
      }*/
  },

  series: [{
      name: 'Power',
      data: Kostal.Data.Power
    },
    {
      name: 'Voltage',
      data: Kostal.Data.Voltage,
      yAxis: 1
    }]
  });
  Kostal.Chart = Highcharts.charts[chart.data('highchartsChart')];
  
  

};

