$(function () { //data in global variable json
  if (typeof json !== 'undefined') {
    Kostal.draw(json);
  }
});

  function getPoint(){
    
   return [(new Date()).getTime(), Math.random() * 300];
  }
  
var Kostal = {
  Data: {},
  Chart: false,
  parse: function(lines){
    Kostal.Data = {Power: [], Efficiency: [], Voltage:[]};
    $.each(lines, function(i, line){
      var l = Kostal.parse_line(line);
      if (!l || !l.p) return true; //next line
      Kostal.Data.Power.push([ l.t, l.p ]);
      Kostal.Data.Voltage.push([ l.t, l.u1 ]);
      Kostal.Data.Efficiency.push([ l.t, l.eff ]);
    });
  },
  parse_line: function(line){
    if (!line) return false;
    var items = line.split(';');
    if (!items || items.length !== 11) return false;
    var utc = new Date(items[0].substring(0,19));//silly ISOString
    var t = new Date(utc.getTime() - utc.getTimezoneOffset() * 60000);
    return {
      t: t.getTime(),
      p: parseInt(items[4]),
      u1: parseInt(items[5]),
      eff: 100 * parseInt(items[4]) / (parseFloat(items[6].replace(',', '.')) * parseInt(items[5]))
    };
  },
  update: function(line){
    var l = Kostal.parse_line(line);
    if (!l || !l.p) return;
    Kostal.Chart.series[0].addPoint([l.t, l.u1],false);
    Kostal.Chart.series[1].addPoint([l.t, l.eff],false);
    Kostal.Chart.series[2].addPoint([l.t, l.p],true);
  }
  
};

Kostal.draw = function draw(lines){
  if (Kostal.Chart) Kostal.Chart.destroy();
  if(lines) Kostal.parse(lines);


  $('#highchart').highcharts({
  chart: {
      type: 'spline',
      zoomType: 'x',
      height: '700'//,
      //animation: false //until addPoint is working
  },
  colors: [
    '#0000ff', //blue for voltage
    '#999999', //grey for efficiency
    '#ff0000'  //red for power
  ],
  title: {
    text: ''
  },
  xAxis: {
      type: 'datetime'
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
      text: 'Power [W]',
      style: {
        color: '#ff0000'
      }
    }
  },{ // Efficiency
    labels: {
      format: '{value} %',
      style: {
        color: '#89A54E'
      }
    },
    //min: 0,
    max: 100,
    title: {
      text: 'Efficiency',
      style: {
        color: '#ff00ff'
      }
    },
    opposite: true
  },{ // Secondary yAxis
    title: {
      text: 'Voltage [V]',
      style: {
          color: '#4572A7'
      }
    },
    labels: {
      format: '{value} V',
      style: {
          color: '#0000ff'
      }
    },
    opposite: true
  }],
  tooltip: {
    shared: true
  },

  series: [{
      name: 'Voltage',
      data: Kostal.Data.Voltage,
      yAxis: 2
    },{
      name: 'Efficiency [%]',
      data: Kostal.Data.Efficiency,
      yAxis: 1
    },{
      name: 'AC-Power',
      data: Kostal.Data.Power,
      lineWidth: 3
    }]
  });
  Kostal.Chart = $('#highchart').highcharts();
};

