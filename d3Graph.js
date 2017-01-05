/**
 * D3.js
 */


var NaruSecD3Js = function (){
	this.svgWidth = 0;
	this.svgHeight = 0;
	this.svgMargin = {
		top: 20,
		right: 20,
		bottom: 20,
		left: 20
	};
	
	this.legendWidth = 0;
	//this.legendHeidht = 0;
	
	this.xScale = null;
	this.yScale = null;
	this.y2Scale = null;

	this.xOutputType = null;
	this.yOutputType = null;
	this.y2OutputType = null;
	
	this.xAxis = null;
	this.yAxis = null;
	this.y2Axis = null;
	this.yMark = null;
	
	//this.basicColor = null; 

	this.init();
	
};


NaruSecD3Js.getColor = function(index) {
	if(index == undefined || index == null || isNaN(index)) index = 0;
	if(typeof(index) == "string") index = parseInt(index, 10);
	
	var basicColor = ["#3499E5", "#60BA53", "#F0C609", "#F29037", "#D3361E", "#AF5ADD", "#ADACAC", "#40C9FA", "#A9D50B", "#E5E907", "#D26014", "#BD4579", "#8000FF", "#998979", "#013ADF", "#088A4B", "#FEB305", "#B77C24", "#C94949" , "#B4045F", "#6E6E6E"];//파초노주빨보은;
	var colorLength = basicColor.length;
	return basicColor[index%colorLength];
};



NaruSecD3Js.prototype = (function() {
	var resizeEvent = [];

	return {
		init: function() {
			this.initValue();
		},
		
		initValue: function(){//변수 초기화
			this.svgWidth = 0;
			this.svgHeight = 0;
			this.svgMargin = {
				top: 20,
				right: 20,
				bottom: 20,
				left: 20
			};
			
			this.legendWidth = 0;
			//this.legendHeidht = 0;
			
			this.xScale = null;
			this.yScale = null;
			this.y2Scale = null;

			this.xOutputType = null;
			this.yOutputType = null;
			this.y2OutputType = null;
			
			this.xAxis = null;
			this.yAxis = null;
			this.y2Axis = null;
			this.yMark = null; 
		},
		
		addWindowResizeEvent: function(objFn){
			resizeEvent[resizeEvent.length] = objFn;
			d3.select(window).on('resize.one', function() {
				for(var i = 0; i < resizeEvent.length; i++){
					resizeEvent[i]();
				}
			});
		},
		
		removeWindowResizeEvent: function() {
			resizeEvent = [];
		},
		
		svgMarginSet: function(margin) {
			if(margin != null && margin != undefined){
				this.svgMargin.top = (margin.top == null || margin.top == undefined || isNaN(margin.top)) ? 0:margin.top;
				this.svgMargin.right = (margin.right == null || margin.right == undefined || isNaN(margin.right)) ? 0:margin.right;
				this.svgMargin.bottom = (margin.bottom == null || margin.bottom == undefined || isNaN(margin.bottom)) ? 0:margin.bottom;
				this.svgMargin.left = (margin.left == null || margin.left == undefined || isNaN(margin.left)) ? 0:margin.left;
				
			}
		},
		
		setSvgSize: function(chartId, width, height) {
			this.svgWidth = width - (this.svgMargin.left + this.svgMargin.right);
			this.svgHeight = height - (this.svgMargin.top + this.svgMargin.bottom);
			
			d3.select("#" + chartId).select("svg")
				.attr("width", "100%")
				.attr("height", "100%");
		},

		createGraph: function(chartId, svgMargin, className) {
			if(chartId == null || chartId == undefined) return;
			this.svgMarginSet(svgMargin);
		
			var graphLayer = d3.select("#"+chartId);
			
			var clientRect = graphLayer.node().getBoundingClientRect();
			
			graphLayer.select("svg").html("");
			
			className =  className ? className : "";
			
			var objSvg = graphLayer.append("svg");
			//				.attr("viewBox", "0 0 " + width + " " + height)
			//				.attr("perserveaspectratio", "xMinYMid");
			this.setSvgSize(chartId, clientRect.width, clientRect.height);
			
			var objTemp = objSvg.append("g").attr("class", className).attr("transform", "translate(" + this.svgMargin.left + "," + this.svgMargin.top + ")");
			return objTemp;
		},
		
		getSvgWidth: function() {
			return this.svgWidth;
		},
		
		getSvgHeight: function() {
			return this.svgHeight;
		},
		
		setXOutputType: function(v) {
			if(!arguments.length) return;
			this.xOutputType = v;
		},
		
		setYOutputType: function(v) {
			if(!arguments.length) return;
			this.yOutputType = v;
		},
		
		setY2OutputType:function(v) {
			if(!arguments.length) return;
			this.y2OutputType = v;
		},
		
		getXScale: function(v) {
			if(!arguments.length){
				return this.xScale;
			}
			return this.xScale(v);
		},
		
		getYScale: function(v) {
			if(!arguments.length) return this.yScale;
			return this.yScale(v);
		},
		
		getY2Scale: function(v) {
			if(!arguments.length) return this.y2Scale;
			return this.y2Scale(v);
		},
		
		//TODO SCALE 종류
		setXScale: function(v) {
			if(!arguments.length) return;
			var xScaleType = v;
			
			if(xScaleType == "time"){
				this.xScale = d3.time.scale();
			}else if(xScaleType == "ordinal"){
				this.xScale = d3.scale.ordinal();
			};
		},
		
		setYScale: function(v) {
			if(!arguments.length) return;
			var yScaleType = v;
			
			if(yScaleType == "linear"){
				this.yScale = d3.scale.linear().range([this.svgHeight, 0]);
			};
		},
		
		setY2Scale: function(v) {
			if(!arguments.length) return;
			var y2ScaleType = v;
			
			if(y2ScaleType == "linear"){
				this.y2Scale = d3.scale.linear().range([this.svgHeight, 0]);
			};
		},
		
		setXOutputRange: function() {
			if(this.xScale){
				if(this.xOutputType == "range") this.xScale.range([0, this.svgWidth - this.legendWidth]);
				else if(this.xOutputType == "rangeRoundBands") this.xScale.rangeRoundBands([0, this.svgWidth - this.legendWidth], 0.1);
				else if(this.xOutputType == "rangeBands") this.xScale.rangeBands([0, this.svgWidth - this.legendWidth]);
			}
		},
		
		setYOutputRange: function() {
			if(this.yScale){
				if(this.yOutputType == "range") this.yScale.range([this.svgHeight, 0]);
			}
		},
		
		setY2OutputRange: function() {
			if(this.y2Scale){
				if(this.y2OutputType == "range") this.y2Scale.range([this.svgHeight, 0]);
			}
		},
		
		setXDomain: function(dataMin, dataMax) {
			if(dataMin == null || dataMin == undefined){
				return;
			}
			if(dataMax == null || dataMax == undefined){
				return;
			}
			
			this.xScale.domain([dataMin, dataMax]);
		},
		
		setYDomain: function(yMinValue, yMaxValue) {
			if(yMinValue == null || yMinValue == undefined || isNaN(yMinValue)){
				return;
			}
			if(yMaxValue == null || yMaxValue == undefined || isNaN(yMaxValue)){
				return;
			}
			this.yScale.domain([yMinValue, yMaxValue]);
		},
		
		setY2Domain: function(yMinValue, yMaxValue) {
			if(yMinValue == null || yMinValue == undefined || isNaN(yMinValue)){
				return;
			}
			if(yMaxValue == null || yMaxValue == undefined || isNaN(yMaxValue)){
				return;
			}
			this.y2Scale.domain([yMinValue, yMaxValue]);
		},
		
		//TODO aXIS OPTION
		createXAxis: function() {
			//TODO timeFormat
			var timeFormat = d3.time.format.multi(
					[[".%L", function(d) { return d.getMilliseconds(); }],
					[":%S", function(d) { return d.getSeconds(); }],
					["%I:%M", function(d) { return d.getMinutes(); }],
					["%I %p", function(d) { return d.getHours(); }],
					["%a %d", function(d) { d.textCss = true; return d.getDay() && d.getDate() != 1; }],
					["%b %d", function(d) { d.textCss = true; return d.getDate() != 1; }],
					["%B", function(d) { d.textCss = true; return d.getMonth(); }],
					["%Y", function(d) { d.textCss = true; return true; }]]);
			
			this.xAxis = d3.svg.axis()
						.scale(this.xScale)
						.tickSize(-this.svgHeight)
						.tickPadding(10)
						.tickSubdivide(true)
						.tickFormat(timeFormat)
						.orient("bottom");
		},
		
		createXAxis2: function() {
			this.xAxis = d3.svg.axis()
						.scale(this.xScale)
						.tickSize(-this.svgHeight)
						.tickPadding(10)
						.tickSubdivide(true)
						.orient("bottom");
		},
		
		createXAxis3: function() {
			var timeFormat = d3.time.format("%Y-%m-%d");
			this.xAxis = d3.svg.axis()
						.scale(this.xScale)
						.tickFormat(function(d){
							return timeFormat(d);
						})
						.orient("bottom");
		},
		
		createXAxis4: function() {
			var timeFormat = d3.time.format("%m-%d");
			this.xAxis = d3.svg.axis()
							.scale(this.xScale)
//							.tickFormat(timeFormat)
//							.ticks(d3.time.day, 1)
							.orient("bottom");
		},
		
		createYAxisTest: function(axisOption) {
			if(!axisOption) return;
			
			this.yAxis = d3.svg.axis().scale(this.yScale);
			
			if(axisOption.markFlag) {
				this.yMark = d3.svg.axis().scale(this.yScale)
				.tickSubdivide(true)
				.tickFormat("");
			}
			
			if(axisOption.tickPadding) {
				var optV = parseInt(axisOption.tickPadding);
				if(!isNaN(optV)) this.yAxis.tickPadding(optV);
			}
			
			if(axisOption.gridFlag) {//TODO alpha or flag
				this.yAxis.tickSize(-(this.svgWidth - this.legendWidth)); 
			}
			
			if(axisOption.tickFormat) {//TODO else if 추가
				if(axisOption.tickFormat == "number") this.yAxis.tickFormat(d3.format("d"));
				else this.yAxis.tickFormat("");
			}
			
			if(axisOption.orient) { //TODO 추가 
				if(axisOption.orient == "left"){
					this.yAxis.orient("left");
					if(this.yMark != null) this.yAxis.orient("left");
				}
			}
			
			if(axisOption.outerTickSize) { 
				var optV = parseInt(axisOption.outerTickSize);
				if(!isNaN(optV)) this.yAxis.outerTickSize(optV);
			}
			
		},
		
		createYAxis: function() {
			this.yAxis = d3.svg.axis()
						.scale(yScale)
						.tickPadding(10)
						.tickSize(-(this.svgWidth - this.legendWidth))
						.tickSubdivide(true)
						.orient("left");
		},
		
		createYAxis2: function() {
			this.yAxis = d3.svg.axis()
						.scale(this.yScale)
						.tickPadding(10)
						.tickSize(-(this.svgWidth - this.legendWidth)) //TODO gridFlag --> gridAlpha?
						.tickSubdivide(true)
						.tickFormat(d3.format("d"))
						.orient("left");
			
			this.yMark = d3.svg.axis()
						.scale(this.yScale)
						.tickSubdivide(true)
						.tickFormat("")
						.orient("left");
		},
		
		createYAxis3: function() {
			this.yAxis = d3.svg.axis()
						.scale(this.yScale)
						.tickPadding(10)
						.tickSize(-(this.svgWidth - this.legendWidth))
						.tickSubdivide(true)
						.tickFormat(d3.format("d"))
						.orient("left")
						.outerTickSize(0);
			
			this.yMark = d3.svg.axis()
						.scale(this.yScale)
						.tickSubdivide(true)
						.tickFormat("")
						.orient("left");
		},
		
		createY2Axis: function() {
			this.y2Axis = d3.svg.axis()
						.scale(this.y2Scale)
						.tickSubdivide(true)
						.tickFormat(d3.format("d"))
						.orient("right");
		},

		//TODO TEXT OPTION
		drawXAxis: function(objDraw, className) {
			if(!objDraw) return;
			if(!className) className = "x axis";
			objDraw.append("g").attr("class", className)
							.attr("transform", "translate(0,"+ this.svgHeight+")")
							.call(this.xAxis);
			
			d3.selectAll("g.x.axis g.tick text").attr("class", function(d){
				if(d.textCss != undefined && d.textCss) return "tickText";
			});
		},
		
		drawXAxis2: function(objDraw, className) {
			if(!objDraw) return;
			if(!className) className = "x axis";
			objDraw.append("g").attr("class", className)
							.attr("transform", "translate(0,"+ this.svgHeight+")")
							.call(this.xAxis)
							.selectAll("text")
							.attr("x", 0)
							.attr("y", 5)
							.attr("dy", ".9em")
							.style("text-anchor", "middle");
		},
		
		drawYAxis: function(objDraw, className) {
			if(!objDraw) return;
			if(!className) className = "y axis";
			
			objDraw.append("g").attr("class", className)
							.call(this.yAxis)
							.selectAll("text")
							.attr("x", -2) //TODO text 길이에 따라..
							.attr("y", 0)
							.style("text-anchor", "end");
		},
		
		drawYAxis2: function(objDraw, className, markFlag, title) {
			if(!objDraw) return;
			if(!className) className = "y axis";

			objDraw.append("g").attr("class", className)
							.call(this.yAxis)
							.append("text")
							.attr("transform", "rotate(-90)")
							.attr("x", -3)
							.attr("y", 8)
							.attr("dy", ".31em")
							.style("text-anchor", "end")
							.text(title == undefined ? "": title);
			
			if(markFlag) {
				objDraw.append("g").attr("class", "y mark")
				.call(this.yMark);
			}
			
		},
		
		drawY2Axis: function(objDraw, className, title) {
			if(!objDraw) return;
			if(!className) className = "y2 axis";
			
			objDraw.append("g").attr("class", className)
					.attr("transform", "translate(" +( this.svgWidth - this.legendWidth)+ ", 0)")
					.call(this.y2Axis)
					.append("text")
					.attr("transform", "rotate(270)")
					.attr("x", -3) 
					.attr("y", -8)
					//.attr("dy", ".31em")
					.style("text-anchor", "end")
					.text(title == undefined ? "": title);

		},
		
		resize: function(chartId) {
			var graphLayer = d3.select("#"+chartId);
			var objSvg = graphLayer.select("svg");
			
			var clientRect = graphLayer.node().getBoundingClientRect();
			var width = clientRect.width;
			var height = clientRect.height;

			this.setSvgSize(chartId, width, height);
			this.setXOutputRange();
			this.setYOutputRange();
			this.setY2OutputRange();
			
			if(this.xAxis){
				this.xAxis.tickSize(-this.svgHeight);
				objSvg.select(".x.axis")
					.attr("transform", "translate(0," + this.svgHeight + ")")
					.call(this.xAxis)
			}

			if(this.yAxis){
				this.yAxis.tickSize(-(this.svgWidth - this.legendWidth));
				objSvg.select(".y.axis").call(this.yAxis);
			}
			
			if(this.y2Axis){
				//yAxis or y2Axis 둘중에 하나 
				//this.y2Axis.tickSize(-(this.svgWidth - this.legendWidth));
				objSvg.select(".y2.axis")
					.attr("transform", "translate("+(this.svgWidth - this.legendWidth)+", "+0+")")
					.call(this.y2Axis);
			}
			
			if(this.yMark){
				objSvg.select(".y.mark").call(this.yMark);
			}
			
		

		},
		
		setLegendWidth: function(width){
			this.legendWidth = width;
		},
		
		getLegendWidth: function(){
			return this.legendWidth;
		},
		
		getGradientColor: function(chartId, objParent, index, gradientDirection) {
			var minX = "0%";
			var maxX = "100%";
			var minY = "0%";
			var maxY = "100%";
			
			gradientDirection = "vertical";
			if(gradientDirection != undefined && gradientDirection != null){
				if(gradientDirection == "vertical"){
					minX = "0%";
					maxX = "0%";
					minY = "0%";
					maxY = "100%";
				}else if(gradientDirection == "horizontal"){
					minX = "0%";
					maxX = "100%";
					minY = "0%";
					maxY = "0%";
				}
			}

			if(index == undefined || index == null || isNaN(index)) index = 0;
			if(typeof(index) == "string") index = parseInt(index, 10);

			var color = NaruSecD3Js.getColor(index);
			var color1 = d3.rgb(color).darker(0.3);
			var color2 = d3.rgb(color);
			var color3 = d3.rgb(color).brighter(0.3);
			var color4 = d3.rgb(color).brighter(0.7);
			var linearGradientLen = d3.select("#"+chartId).selectAll(".linear_gradient")[0].length;
		
			var gradientId = "gradient_"+chartId+"_"+linearGradientLen;
			var objGradient = d3.select(objParent).append("svg:linearGradient")
								.attr("class", "linear_gradient")
								.attr("x1", minX)
								.attr("x2", maxX)
								.attr("y1", minY)
								.attr("y2", maxY)
								.attr("id", gradientId);
			
			objGradient.append("stop")
					.attr("offset", "0")
					.attr("stop-color", color1);
			
			objGradient.append("stop")
					.attr("offset", "25%")
					.attr("stop-color", color2);
			
			objGradient.append("stop")
					.attr("offset", "50%")
					.attr("stop-color", color3);
			
			objGradient.append("stop")
					.attr("offset", "100%")
					.attr("stop-color", color4);

			return gradientId;
		},
		
		createToolTip: function(chartId, obj){
			//d3.select("body").select(".toolTip").remove();
			var objChart = d3.select("#"+chartId);//.select(".test");
			var toolTipDiv = objChart.select(".toolTip");
			if(toolTipDiv.size() == 0){
				toolTipDiv = objChart.append("div").attr("class", "toolTip");
			}
		
			var svgMarginLeft = this.svgMargin.left;
			var svgMarginRight = this.svgMargin.right;
			var svgMarginTop = this.svgMargin.top;
			var svgMarginBottom = this.svgMargin.bottom;
			obj.on("mousemove.one", function() {
				var clientPos = d3.select("#"+chartId).select("svg").node().getBoundingClientRect();
			
				var toolTipWidth = parseInt(toolTipDiv.style("width"), 10);
				var limitWidth = clientPos.width - svgMarginRight;//clientPos.right - svgMarginRight;
				
				var toolTipHeight = parseInt(toolTipDiv.style("height"), 10);
				var limitHeight = clientPos.height - svgMarginBottom;
				
				var posX = d3.event.clientX - clientPos.left + 10;
				var posY = d3.event.clientY - clientPos.top + 10;
				
				if(posX + toolTipWidth > limitWidth){
					posX =  posX - toolTipWidth - 20;
				}
	
				if(posY + toolTipHeight > limitHeight){
					posY =  posY - toolTipHeight;
				}
				
				toolTipDiv.style("left", posX + "px")
						.style("top", posY + "px");
				
			})
			.on("mouseout.one", function(d){
				toolTipDiv.transition()
					.duration(100)
					.style("opacity", 0);
			});
			
			return toolTipDiv;
		},
		
		showToolTip: function(objToolTip, toolTipMessage){
			objToolTip.html(toolTipMessage)
					.transition()
					.duration(100)
					.style("opacity", 0.9);
		},
		
		xTicksDateWrap: function(text, width, height) {
			var changeText = "";
			var format = d3.time.format("%Y-%m-%d");

			var change = false;
			var count = 0;
			text.each(function(data, k){
				var textTemp = d3.select(this);
				var word = textTemp.text();
				var x = textTemp.attr("x");
				var y = textTemp.attr("y");
				var dy = parseFloat(textTemp.attr("dy"));
				var tspan = textTemp.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
				
				var dateTemp = format.parse(word);;
				var wordText = format(dateTemp);
				var replaceText = wordText;

				tspan.text(wordText);
				
				//var formatYear = d3.time.format("%Y");
				var formatYearMonth = d3.time.format("%y-%m");
				var formatMonth = d3.time.format("%m");
				var formatMonthDay = d3.time.format("%m-%d");
				var formatDay = d3.time.format("%d");
				
				if(checkTspanTextLength(tspan, width)){
					replaceText = formatMonthDay(dateTemp);
					tspan.text(replaceText);
					change = true;
					
					if(checkTspanTextLength(tspan, width)){
						replaceText = formatMonth(dateTemp);
						tspan.text(replaceText);
						change = true;
						
						if(checkTspanTextLength(tspan, width)){
							replaceText = formatYearMonth(dateTemp);

							if(count == 0 && Number(formatDay(dateTemp) > 15)){
								change = false;
							}else{
								change = true;
								count++;
							}
						}
					}
					//console.log("replaceText: ", replaceText+","+change);
				}else{
					change = true;
				}
				
				if(change && replaceText != changeText){
					changeText = replaceText;
					tspan.text(replaceText);
				}else{
					tspan.text("");
				}

			});
			
			function checkTspanTextLength(tspan, width){
				//console.log("###: "+ (tspan.node().getComputedTextLength())+"," + width);
				return Math.floor(tspan.node().getComputedTextLength()) > width;
			}
		},
		
		
		
		checkTspanText: function(objTspan, width, replaceText){
			var formatYear = d3.time.format("%Y");
			var formatMonth = d3.time.format("%m");
		
			if(Math.floor(objTspan.node().getComputedTextLength()) > width){
				replaceText = formatYear(dateTemp);
				objTspan.text(replaceText);
				
				if(this.checkTspanText(tspan, width, replaceText)){
					replaceText = formatMonth(dateTemp);
					tspan.text(replaceText);
					if(this.checkTspanText(tspan, width, replaceText)){
						replaceText = "";
					}
				}
			}
		},
		
		dateFormat: function(){
			var format = d3.time.format.multi(
						[[".%L", function(d) { return d.getMilliseconds(); }]
						,[":%S", function(d) { return d.getSeconds(); }],
						,["%I:%M", function(d) { return d.getMinutes(); }],
						,["%I %p", function(d) { return d.getHours(); }],
						,["%a %d", function(d) { return d.getDay() && d.getDate() != 1; }],
						,["%b %d", function(d) { return d.getDate() != 1; }],
						,["%B", function(d) { return d.getMonth(); }],
						,["%Y", function() { return true; }]
						]);
			
			return format;
		}
		
	};
	
}());


d3.selection.prototype.trigger = function(eventName, data) {
	this.on(eventName)(data);
}
