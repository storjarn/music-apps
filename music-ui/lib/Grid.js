(function() {
    window.addEventListener('load', function() {
        //Width and height
        var w = 800;
        var h = 600;
        var padding = 20;
        var border = 1;
        var bordercolor = 'black';

        var dataset = [
            [5, 20],
            [480, 90],
            [250, 50],
            [100, 33],
            [330, 95],
            [-50, -100],
            [50, -45],
            [410, 12],
            [475, 44],
            [25, 67],
            [85, 21],
            [220, 88],
            [-480, -467],
            [3, -90],
            [468, 481]
        ];

        // create scale functions
        var xScale = d3.scale.linear()
            .domain([d3.min(dataset, function (d) {
            return d[0];
        }), d3.max(dataset, function (d) {
            return d[0];
        })])
            .range([padding, w - padding * 2]);

        var yScale = d3.scale.linear()
            .domain([d3.min(dataset, function (d) {
            return d[0];
        }), d3.max(dataset, function (d) {
            return d[1];
        })])
            .range([h - padding, padding]);

        var rScale = d3.scale.linear()
            .domain([-100, d3.max(dataset, function (d) {
            return d[1];
        })])
            .range([2, 5]);

        //Create SVG element
        var svg = d3.select('#pianoRoll')
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("border", border);

        //define X axis
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom")
            .ticks(1)
            .tickSize(-h, 0, 0); //Set rough # of ticks

        //Define Y axis
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .ticks(1)
            .tickSize(-w, 0, 0);

        //   draw axes here
        svg.append("g")
            .attr("class", "axis") //assign "axis" class
        .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "axis") //assign "axis" class
        .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);

        //Draw a grid
        var numberOfTicks = 30;

        var yAxisGrid = yAxis.ticks(numberOfTicks)
            .tickSize(w, 0)
            .tickFormat("")
            .orient("right");

        var xAxisGrid = xAxis.ticks(numberOfTicks)
            .tickSize(-h, 0)
            .tickFormat("")
            .orient("top");

        svg.append("g")
            .classed('y', true)
            .classed('grid', true)
            .call(yAxisGrid);

        svg.append("g")
            .classed('x', true)
            .classed('grid', true)
            .call(xAxisGrid);

        //create the circles
        svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return xScale(d[0]);
            })
            .attr("cy", function (d) {
                return yScale(d[1]);
            })
            .attr("r", 3);
    });
})();
