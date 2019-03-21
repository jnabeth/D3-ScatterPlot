document.addEventListener('DOMContentLoaded',function(){
    req=new XMLHttpRequest();
    req.open("GET",'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json',true);
    req.send();
    req.onload=function(){
      dataset=JSON.parse(req.responseText);

      var margin = {top: 20, right: 40, bottom: 20, left: 40},
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

      const minX = d3.min(dataset, (d) => d.Year);
      const maxX = d3.max(dataset, (d) => d.Year);
      const minY = d3.min(dataset, (d) => d.Seconds);
      const maxY = d3.max(dataset, (d) => d.Seconds);

      const xScale = d3.scaleLinear()
                       .domain([minX, maxX])
                       .range([0, width]);

      const yScale = d3.scaleLinear()
                       .domain([minY, maxY])
                       .range([0, height]);

      let time = dataset.map(d => d.Time);
      
      const xAxis = d3.axisBottom(xScale)
                      .tickFormat(d3.format(""));
      
      const yAxis = d3.axisLeft(yScale)
                      .tickFormat((d,i) => time[i]);

      const svg = d3.select("body")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => xScale(d.Year))
      .attr("cy", (d, i) => yScale(d.Seconds))
      .attr("r", 5)
      .on("mouseover", function(d) {
         div.transition()
             .duration(200)
             .style("opacity", .9);
         div.html(d.Name + ": " + d.Nationality + "<br/>Year: " + d.Year + ", Time: " + d.Time + "<br/>" +  d.Doping)
             .style("left", d3.event.pageX+ "px")
             .style("top", d3.event.pageY + "px")
         })
     .on("mouseout", function(d) {
         div.transition()
             .duration(500)
             .style("opacity", 0);
     });

     var div = d3.select("body").append("div")
     .attr("class", "tooltip")
     .attr("id", "tooltip")
     .style("opacity", 0);

      // Display x-axis
     svg.append("g")
        .attr("id", "x-axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(xAxis)

      // Display y-axis
      svg.append("g")
       .attr("id", "y-axis")
       .call(yAxis);
  };
});
