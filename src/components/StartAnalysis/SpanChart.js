import * as d3 from "d3";

const getElement = (data, color) => {
    var node = document.createElement("div");

    var margin = { top: 50, right: 50, bottom: 50, left: 100 },
        width = 430 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var y = d3.scale.ordinal().rangeRoundBands([0, height], 0.08);

    var x = d3.scale.linear().range([0, width]);

    y.domain(
        data.map(function(d) {
            return d.variable;
        })
    );

    x.domain([
        d3.min(data, function(d) {
            return d.from;
        }),
        d3.max(data, function(d) {
            return d.to * 1.1;
        })
    ]);

    var xAxis = d3.svg
        .axis()
        .scale(x)
        .orient("bottom")
        .ticks(15);

    var yAxis = d3.svg
        .axis()
        .scale(y)
        .orient("left");

    var svg = d3
        .select(node)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("x", width - 75)
        .attr("dx", ".71em")
        .attr("dy", "-.71em")

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("y", function(d) {
            return y(d.variable);
        })
        .attr("height", y.rangeBand())
        .attr("x", function(d) {
            return x(d.from);
        })
        .attr("width", function(d) {
            // Changed to abs value!
            return Math.abs(x(d.to) - x(d.from));
        })
        .style("fill", color)

    svg.selectAll(".point")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "point")
        .attr("cx", function(d) {
            return Math.abs(x(d.point));
        })
        .attr("cy", function(d) {
            return y(d.variable) + (y.rangeBand() / 2);
        })
        .attr("r", 7)
        .attr("width", 7)
        .attr("height", y.rangeBand())
        .style("fill", "#006BBD");
        

    // add legend
    var legend = svg.append("g").attr("class", "legend");
    var pointLegend = svg.append("g").attr("class", "legend");

    legend
        .append("rect")
        .attr("x", width - margin.left)
        .attr("y", -10)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", color);

    legend
        .append("text")
        .attr("x", width - margin.left + 15)
        .attr("y", 0)
        .text("Min - Max")
        .attr("x", width - margin.left + 15)
        .attr("y", 0)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", color);

    pointLegend
        .append("circle")
        .attr("cx", width - margin.left + 5)
        .attr("cy", -21)
        .attr("r", 5)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function(d) {
            return "#006BBD";
        });

    pointLegend
        .append("text")
        .attr("x", width - margin.left + 15)
        .attr("y", 0)
        .text("Current")
        .attr("x", width - margin.left + 15)
        .attr("y", -15)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function(d) {
            return "#006BBD";
        });

    var tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip");

    tooltip.append("div").attr("class", "variable");
    tooltip.append("div").attr("class", "varRange");

    svg.selectAll(".bar,.point")
        .on("mouseover", function(d) {
            tooltip.select(".variable").html("<b>" + d.variable + "</b>");
            tooltip
                .select(".varRange")
                .html(d.from + " to " + d.to + (" (current: " + d.point + ")"));

            tooltip.style("display", "block");
            tooltip.style("opacity", 2);
        })
        .on("mousemove", function(d) {
            tooltip
                .style("background-color", "rgba(128,123,110,0.75)")
                .style("padding", "10px")
                .style("border-radius", "10px")
                .style("top", d3.event.layerY + 100 + "px")
                .style("left", d3.event.layerX + 10 + "px");
        })
        .on("mouseout", function() {
            tooltip.style("display", "none");
            tooltip.style("opacity", 0);
        });

    return node
};

export default getElement;
