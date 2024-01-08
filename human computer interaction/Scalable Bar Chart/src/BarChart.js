class BarChart {
	constructor(_data){
	 this.margin = {top: 20, right: 20, bottom: 110, left: 40};
        this.width = 600 - this.margin.left - this.margin.right;
        this.height = 600 - this.margin.top - this.margin.bottom;

        this.data = _data;

        this.initVis();

	}

	initVis() {
		let vis = this;

		// Select HTML tag with a specific id ``bar", add a SVG container, and set the corresponding attributes.
		//Then add a group and make a translation (e.g., width and height).(5pts)
		
		// To DO
		vis.svg = d3.select("#bar")
			.append("svg")
			  .attr("width", vis.width + vis.margin.left + vis.margin.right)
			  .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
			.append("g")
			  .attr("transform", `translate(${vis.margin.left}, ${vis.margin.top})`);


		// Create scales for x any y (15pts)
		
		// To DO
		vis.xScaleFocus = d3.scaleLinear()
			.range([0, vis.width]);

		vis.yScaleFocus = d3.scaleLinear()
			.range([vis.height, 0]);

		vis.xScaleInvertFocus = d3.scaleLinear()
			.range([0, d3.max(vis.data, function(d) { return d.kWhDelivered; })])
			.domain([0, vis.width]);
	

		// Place Axis (i.e., x-axis on the bottom and y-axis on the left)

		vis.xAxisFocus = d3.axisBottom(vis.xScaleFocus);

		vis.yAxisFocus = d3.axisLeft(vis.yScaleFocus);

		// Create a container in svg for drawing bar chart
		vis.focus = vis.svg.append("g")
		               .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");
					

		vis.focus.attr('id','focus')
		         .append("rect")
		         .attr("width",vis.width)
		         .attr("height",vis.height)

		// Create Axis


		vis.xAxisFocusG = vis.focus.append('g')
		                     .attr('class', 'axis x-axis')
		                     .attr('transform', `translate(0,${vis.height})`);

		vis.yAxisFocusG = vis.focus.append('g')
		.attr('class', 'axis y-axis');

        // Create a bursh variable (5pts). The "bursh" variable will call brushed function
        // To determine whether a brush action is trigger, we can use d3.event.selection to judge
        //so remember to pass this variable into the brushed function
		
        // To DO
		vis.brushG = vis.focus
					  .attr('class', 'brush');

		vis.brush = d3.brushX()
					  .extent([[0,0], [vis.width, vis.height]])
					  .on('end', function() {
							if (d3.event.selection) vis.brushed(d3.event.selection)
						})


        // Add label for y-axis

        vis.svg.append("text")
               .attr("class", "ylabel")
               .attr("y", 0 - vis.margin.left+15)
               .attr("x", 0 - (vis.height/2))
               .attr("dy", "1em")
               .attr("transform", "rotate(-90)")
               .style("text-anchor", "middle")
               .text("Number of kWhDelivered");


	}

	updateVis(){
		let vis = this;

		// Create a higtogram (5pts) hint: D3.histogram()
		// To DO
		vis.histogram = d3.histogram()
			.value(function(d) { return d.kWhDelivered; })
			.domain([0, d3.max(vis.data, function(d) { return d.kWhDelivered; })])
			.thresholds(270);

		// Create bins from the histogram (5pts)

		// To DO
		vis.bins = vis.histogram(vis.data);

		// Set the domains for x and y axis (8pts).

		// To DO
		vis.xScaleFocus.domain([0, d3.max(vis.data, function(d) { return d.kWhDelivered; })]);
		vis.yScaleFocus.domain([0, d3.max(vis.bins, function(d) { return d.length; })]);

		vis.renderVis();
		
		
	}


	renderVis(){
		let vis = this;

		// draw the bar chart from the generated bins (10 pts)

		// To DO
		vis.focus.selectAll("rect")
				.data(vis.bins)
				.enter()
				.append("rect")
				.attr("x", 0)
			.attr("transform", function(d) { return `translate(${vis.xScaleFocus(d.x0)} , ${vis.yScaleFocus(d.length)})`})
				.attr("width", function(d) { return vis.xScaleFocus(d.x1) - vis.xScaleFocus(d.x0) - 1})
				.attr("height", function(d) { return vis.height - vis.yScaleFocus(d.length); })
				.style("fill", "#69b3a2")

		// Place x and y axis on the bottom and left, respectively
        vis.xAxisFocusG.call(vis.xAxisFocus);
        vis.yAxisFocusG.call(vis.yAxisFocus);

        // call the brush function

        vis.brushG
        .call(vis.brush)
	}

	brushed(selection){
		let vis = this;



		if (selection) {

			//Convert given pixel coordinates (range: [x0,x1]) into a kw (domain: [number,number]) (10pts)
			// To DO
			var x0 = selection[0];
			var x1 = selection[1];
			var num1 = vis.xScaleInvertFocus(x0);
			var num2 = vis.xScaleInvertFocus(x1);
			
			
			// Update x-axis  accordingly (4pts)
			// To DO
			vis.xScaleFocus.domain([num1, num2]);
			
			// Based on the selected region to filter the bins (5pts) Hint: use filter() function
			// To Do
			var filtered_bins = vis.bins.filter(function(d) { return d.x0 >= num1 && d.x1 <= num2; });


			// Update y-axis accordingly (5pts)
			// To DO
			vis.yScaleFocus.domain([0, d3.max(filtered_bins, function(d) { return d.length; })]);
			
			//Redraw the bar chart (10pts)
			// To DO
			vis.focus.selectAll("rect")
					.data(filtered_bins)
					.join("rect")
					.attr("x", 0)
				.attr("transform", function(d) { return `translate(${vis.xScaleFocus(d.x0)} , ${vis.yScaleFocus(d.length)})`})
					.attr("width", function(d) { return vis.xScaleFocus(d.x1) - vis.xScaleFocus(d.x0) - 1})
					.attr("height", function(d) { return vis.height - vis.yScaleFocus(d.length); })
					.style("fill", "#69b3a2")   

			
			vis.xAxisFocusG.call(vis.xAxisFocus);
			vis.yAxisFocusG.call(vis.yAxisFocus);

		}
  	}
}