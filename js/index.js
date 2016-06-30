$(document).ready(function() {
  var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json";
  
  var data = {},
      margin = {top: 20, bottom: 100, left: 150, right: 20},
      width = 1400.0 - margin.left - margin.right,
      height = 600.0 - margin.top - margin.bottom;
  
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  var x = d3.scale.linear()
    .range([0, width]);
  
  var y = d3.scale.ordinal()
    .rangeBands([height, 0]);
  
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(27, "d");
  
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
  
  var map = d3.select("#map")
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
   .append("g")
    .attr('transform', 'translate(' + margin.left + ', ' + margin.right + ')');
  
  $.getJSON(url, function(data) {
    var baseTemp = data.baseTemperature;
    
    x.domain([d3.min(data.monthlyVariance.map(function(d) {return d.year})),
              d3.max(data.monthlyVariance.map(function(d) {return d.year}))]);
    
    y.domain(months);
    
    map.append("g")
      .attr("class", "y axis")
      .call(yAxis);
    
    map.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0, " +  height + ")")
      .call(xAxis);
    
    map.selectAll('.rect')
      .data(data.monthlyVariance)
     .enter().append('rect')
      .attr('class', 'rect')
      .attr('width', width/data.monthlyVariance.length * 15)
      .attr('height', height/months.length)
      .attr('x', function(d) {return x(d.year);})
      .attr('y', function(d) {return y(months[d.month - 1]);})
      .attr('fill', function(d) {
        var temp = baseTemp + d.variance;
        if (temp >= 0 && temp < 2.7) return '#6600ff';
        if (temp >= 2.67 && temp < 3.9) return '#0099ff';
        if (temp >= 3.9 && temp < 5) return '#00ff99';
        if (temp >= 5 && temp < 6.1) return '#ccff66';
        if (temp >= 6.1 && temp < 7.2) return '#ffff99';
        if (temp >= 7.2 && temp < 8.3) return '#ffcc66'
        if (temp >= 8.3 && temp < 9.4) return '#ff9933';
        if (temp >= 9.4 && temp < 10.5) return '#ff6600';
        if (temp >= 10.5 && temp < 11.6) return '#ff0000';
        if (temp >= 11.6 && temp < 12.7) return '#800000';
        if (temp >= 12.7) return '#ff6600';
        return black;
      });
  });
});