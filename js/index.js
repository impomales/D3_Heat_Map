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
  
  var format = d3.format(',.3f');
  
  var tip = d3.tip()
    .attr('class', 'tip')
    .html(function(d) {
      var temp = 8.66 + d.variance;
      var month = new Array();
          month[1] = "January";
          month[2] = "February";
          month[3] = "March";
          month[4] = "April";
          month[5] = "May";
          month[6] = "June";
          month[7] = "July";
          month[8] = "August";
          month[9] = "September";
          month[10] = "October";
          month[11] = "November";
          month[12] = "December";
      return "<h3>" + d.year + " - " + month[d.month] + "</h3><p>" + format(temp) + " °C</p><p>" + d.variance + " °C</p>"
    })
  
  var map = d3.select("#map")
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
   .append("g")
    .attr('transform', 'translate(' + margin.left + ', ' + margin.right + ')');
  
  map.call(tip);
  
  $.getJSON(url, function(data) {
    var baseTemp = data.baseTemperature;
    
    x.domain([d3.min(data.monthlyVariance.map(function(d) {return d.year})),
              d3.max(data.monthlyVariance.map(function(d) {return d.year}))]);
    
    y.domain(months);
    
    map.append("g")
      .attr("class", "y axis")
      .call(yAxis)
     .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -90)
      .attr("x", -250)
      .style("font-size", "20px")
      .style("font-weight", "bold")
      .text("Months");
    
    map.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0, " +  height + ")")
      .call(xAxis)
     .append("text")
      .attr("y", 50)
      .attr("x", 550)
      .style("font-size", "20px")
      .style("font-weight", "bold")
      .text("Years");
    
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
      })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
  });
});