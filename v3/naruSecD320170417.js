/**
 * Created by eunjilee on 2017. 4. 17..
 */
/**
 * Created by ejlee
 */

/**
 * D3.js (4.x.x)
 */

//TODO debugMode
var NaruSecD3Js = function (){
	this.svgWidth = 0;
	this.svgHeight = 0;
	this.svgMargin = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};

	this.chartId = null;//TODO NEW

	this.legend = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};

	this.axisX0 = 0; //NEW
	this.x0Scale = null; //bottom
	//this.x1Scale = null; //top
	this.y0Scale = null; //left
	this.y1Scale = null; //right

	this.x0OutputType = null;
	//this.x1OutputType = null;
	//this.y0OutputType = null;
	this.y1OutputType = null;

	this.x0Axis = null;
	//this.x1Axis = null;
	this.y0Axis = null;
	this.y1Axis = null;
	this.yAxis = []; //return []

	this.yMark = null;

	this.x0Value = null;//TODO NEW
	this.y0Value = null;//TODO NEW

	this.data = null;//TODO NEW

	this.init();
};

NaruSecD3Js.prototype = function () {
	var resizeEvent = {};

	return {
		init: function () {
			this.initValue();
		},

		initValue: function () {//변수 초기화
			this.svgWidth = 0;
			this.svgHeight = 0;
			this.svgMargin = {
				top: 20,
				right: 20,
				bottom: 30,
				left: 20
			};

			this.chartId = null;//TODO NEW

			this.legend = {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			};

			this.axisX0 = 0; //NEW
			this.x0Scale = null; //bottom
			//this.x1Scale = null; //top
			this.y0Scale = null; //left
			this.y1Scale = null; //right

			this.x0OutputType = null;
			//this.x1OutputType = null;
			//this.y0OutputType = null;
			this.y1OutputType = null;

			this.x0Axis = null;
			//this.x1Axis = null;
			this.y0Axis = null;
			this.y1Axis = null;

			this.yMark = null;

			this.x0Value = null;//TODO NEW
			this.y0Value = null;//TODO NEW

			this.data = null;//TODO NEW
		},

		setX0Value: function (value) {
			this.x0Value = value;
		},

		getX0Value: function () {
			return this.x0Value;
		},

		setY0Value: function (value) {
			this.y0Value = value;
		},

		getY0Value: function () {
			return this.y0Value;
		},

		addWindowResizeEvent: function (objFn) {
			resizeEvent[this.chartId] = objFn;
			d3.select(window).on('resize.one', function () {
				var eventTemp = Object.keys(resizeEvent);
				for(var i= 0; i<eventTemp.length; i++){
					resizeEvent[eventTemp[i]]();
				}

			});
		},

		removeWindowResizeEvent: function () {
			if(this.chartId){
				if(Object.keys(resizeEvent).length > 0 && resizeEvent[this.chartId]){
					delete resizeEvent[this.chartId];
				}
			}else{
				resizeEvent = [];
			}
		},

		setSvgMargin: function (margin) {
			if (margin != null && margin != undefined) {
				this.svgMargin.top = (margin.top == null || margin.top == undefined || isNaN(margin.top)) ? 0 : margin.top;
				this.svgMargin.right = (margin.right == null || margin.right == undefined || isNaN(margin.right)) ? 0 : margin.right;
				this.svgMargin.bottom = (margin.bottom == null || margin.bottom == undefined || isNaN(margin.bottom)) ? 0 : margin.bottom;
				this.svgMargin.left = (margin.left == null || margin.left == undefined || isNaN(margin.left)) ? 0 : margin.left;
			}
		},

		setSvgSize: function (width, height) {
			this.svgWidth = width - (this.svgMargin.left + this.svgMargin.right + this.axisX0);
			this.svgHeight = height - (this.svgMargin.top + this.svgMargin.bottom);

			d3.select("#" + this.chartId).select("svg")
//				.attr("width", "100%")
//				.attr("height", "100%");
				.attr("width", width)
				.attr("height", height);
		},

		createSvg: function () {
			var chartId = this.chartId;
			this.setSvgMargin();
			var graphLayer = d3.select("#" + chartId);
			var clientRect = graphLayer.node().getBoundingClientRect();

			graphLayer.select("svg").html("");

			//className = className ? className : "";

			var objSvg = graphLayer.append("svg");

			this.setSvgSize(clientRect.width, clientRect.height);
			//				.attr("viewBox", "0 0 " + width + " " + height)
			//				.attr("preserveaspectratio", "xMinYMid");
			var objTemp = objSvg.append("g").attr("class", "naru-graph").attr("transform", "translate(" + (this.svgMargin.left + this.axisX0 ) + "," + this.svgMargin.top + ")");
			this.setSvgLayer(objTemp);

			return objTemp;
		},

		setSvgLayer: function(objTemp){
			this.getSvgLayer = function(){
				return objTemp ? objTemp:null;
			}
		},

		getSvgWidth: function () {
			return this.svgWidth;
		},

		getSvgHeight: function () {
			return this.svgHeight;
		},

		setX0OutputType: function (v) {
			if (!arguments.length) return;
			this.x0OutputType = v;
		},

		setY0OutputType: function (v) {
			if (!arguments.length) return;
			this.yOutputType = v;
		},

		setY1OutputType: function (v) {
			if (!arguments.length) return;
			this.y1OutputType = v;
		},

		getX0Scale: function (v) {
			if (!arguments.length) {
				return this.x0Scale;
			}
			return this.x0Scale(v);
		},

		getY0Scale: function (v) {
			if (!arguments.length) return this.y0Scale;
			return this.y0Scale(v);
		},

		getY1Scale: function (v) {
			if (!arguments.length) return this.y1Scale;
			return this.y1Scale(v);
		},

		//TODO SCALE 종류
		setX0Scale: function (v) {
			if (!arguments.length) return;
			var x0ScaleType = v;

			if (x0ScaleType == "time") {
				this.x0Scale = d3.scaleTime();
			} else if (x0ScaleType == "ordinal") {
//				if(this.x0OutputType == "rangeRoundBands" || this.x0OutputType == "rangeBands"){
//					this.x0Scale = d3.scaleBand();
//				}else{
//					this.x0Scale = d3.scaleOrdinal();
//				}
				this.x0Scale = d3.scaleBand();
			} else if(x0ScaleType == "linear"){
				this.x0Scale = d3.scaleLinear();
			}
		},

		setY0Scale: function (v) {
			if (!arguments.length) return;

			if (v == "linear") {
				this.y0Scale = d3.scaleLinear();
			}
		},

		setY1Scale: function (v) {
			if (!arguments.length) return;

			if (v == "linear") {
				this.y1Scale = d3.scaleLinear();
			}
		},

		setX0OutputRange: function () {
			if (this.x0Scale) {
				var xRange = this.getYTickSize();
				if (this.x0OutputType == "range") this.x0Scale.range([0, xRange]);
				else if (this.x0OutputType == "rangeRoundBands") this.x0Scale.range([0, xRange], 0.1);
				else if (this.x0OutputType == "rangeBands") this.x0Scale.range([0, xRange]);
			}
		},

		setY0OutputRange: function () {
			if (this.y0Scale) {
				if (this.yOutputType == "range") this.y0Scale.range([this.getSvgHeight(), 0]);
			}
		},

		setY1OutputRange: function () {
			if (this.y1Scale) {
				if (this.y1OutputType == "range") this.y1Scale.range([this.getSvgHeight(), 0]);
			}
		},

		setX0DomainExtent: function(data){
			if (data == null || data == undefined) {
				return;
			}

			var xValue = this.getX0Value();
			this.x0Scale.domain(
				d3.extent(data, function(d) {
					return	d[xValue];
				})
			).nice();
		},

		circleX0ScaleOutputRange: function(min, max){
			var circleScale = this.getX0Scale().copy();
			circleScale.range([min, max]);
			return circleScale;
		},


		setX0Domain: function (dataMin, dataMax) {
			if (dataMin == null || dataMin == undefined) {
				return;
			}
			if (dataMax == null || dataMax == undefined) {
				return;
			}
			this.x0Scale.domain([dataMin, dataMax]);
		},

		setY0Domain: function (yMinValue, yMaxValue) {
			if (yMinValue == null || yMinValue == undefined || isNaN(yMinValue)) {
				return;
			}
			if (yMaxValue == null || yMaxValue == undefined || isNaN(yMaxValue)) {
				return;
			}
			this.y0Scale.domain([yMinValue, yMaxValue]);
		},

		setY1Domain: function (yMinValue, yMaxValue) {
			if (yMinValue == null || yMinValue == undefined || isNaN(yMinValue)) {
				return;
			}
			if (yMaxValue == null || yMaxValue == undefined || isNaN(yMaxValue)) {
				return;
			}
			this.y1Scale.domain([yMinValue, yMaxValue]);
		},

		//TODO aXIS OPTION
		createX0Axis: function () {
			//TODO timeFormat
//			var timeFormat = d3.timeFormat.multi(
//				[[".%L", function (d) {
//					return d.getMilliseconds();
//				}],
//					[":%S", function (d) {
//						return d.getSeconds();
//					}],
//					["%I:%M", function (d) {
//						return d.getMinutes();
//					}],
//					["%I %p", function (d) {
//						return d.getHours();
//					}],
//					["%a %d", function (d) {
//						d.textCss = true;
//						return d.getDay() && d.getDate() != 1;
//					}],
//					["%b %d", function (d) {
//						d.textCss = true;
//						return d.getDate() != 1;
//					}],
//					["%B", function (d) {
//						d.textCss = true;
//						return d.getMonth();
//					}],
//					["%Y", function (d) {
//						d.textCss = true;
//						return true;
//					}]]);


			var formatMillisecond = d3.timeFormat(".%L"),
				formatSecond = d3.timeFormat(":%S"),
				formatMinute = d3.timeFormat("%I:%M"),
				formatHour = d3.timeFormat("%I %p"),
				formatDay = d3.timeFormat("%a %d"),
				formatWeek = d3.timeFormat("%b %d"),
				formatMonth = d3.timeFormat("%B"),
				formatYear = d3.timeFormat("%Y");

			function multiFormat(date) {
				//			console.log("multiFormat", date);
				return (d3.timeSecond(date) < date ? formatMillisecond
					: d3.timeMinute(date) < date ? formatSecond
					: d3.timeHour(date) < date ? formatMinute
					: d3.timeDay(date) < date ? formatHour
					: d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
					: d3.timeYear(date) < date ? formatMonth
					: formatYear)(date);
			}

			this.x0Axis = d3.axisBottom(this.x0Scale)
				.tickSize(-this.getSvgHeight())
				.tickPadding(10)
//				.tickSubdivide(true)
				.tickFormat(multiFormat)
		},

		createX0Axis2: function (optX) {
			this.x0Axis = d3.axisBottom(this.x0Scale)
				.tickSize(-this.getSvgHeight())
				.tickPadding(10);
//				.tickSubdivide(true)

			if(optX.timeFormat){
				var timeFormat = d3.timeFormat(optX.timeFormat);
				this.x0Axis.tickFormat(function (d) {
					return timeFormat(d);
				})
			}
		},

		createX0Axis4: function () {
			//var timeFormat = d3.timeFormat("%m-%d");
			this.x0Axis = d3.axisBottom(this.x0Scale);
			//.tickFormat(timeFormat)
			//.ticks(d3.time.day, 1)
		},

		/*
		 createY0AxisTest: function (axisOption) {
		 if (!axisOption) return;

		 this.y0Axis = d3.axisBottom(this.x0Scale)

		 if (axisOption.markFlag) {
		 this.yMark = d3.axisBottom(this.y0Scale)
		 .tickSubdivide(true)
		 .tickFormat("");
		 }

		 if (axisOption.tickPadding) {
		 var optV = parseInt(axisOption.tickPadding);
		 if (!isNaN(optV)) this.y0Axis.tickPadding(optV);
		 }

		 if (axisOption.gridFlag) {//TODO alpha or flag
		 this.y0Axis.tickSize(-(this.svgWidth - this.legendWidth));
		 }

		 if (axisOption.tickFormat) {//TODO else if 추가
		 if (axisOption.tickFormat == "number") this.y0Axis.tickFormat(d3.format("d"));
		 else this.y0Axis.tickFormat("");
		 }

		 if (axisOption.orient) { //TODO 추가
		 if (axisOption.orient == "left") {
		 this.y0Axis.orient("left");
		 if (this.yMark != null) this.y0Axis.orient("left");
		 }
		 }

		 if (axisOption.outerTickSize) {
		 var optV = parseInt(axisOption.outerTickSize);
		 if (!isNaN(optV)) this.y0Axis.outerTickSize(optV);
		 }

		 },
		 */

		createY0Axis: function () {
			this.y0Axis = d3.axisLeft(this.y0Scale)
				.tickPadding(10)
				.tickSize(-1 * this.getYTickSize())
				.tickArguments([5]);
			//.tickSubdivide(true)
		},

		createY0Axis2: function () {
			this.y0Axis = d3.axisLeft(this.y0Scale)
				.tickPadding(8)
				.tickSize(-1 * this.getYTickSize()) //TODO gridFlag --> gridAlpha?
				.tickFormat(d3.format("d"))
				.tickArguments([5]);

			this.yMark = d3.axisLeft(this.y0Scale)
				.tickArguments([5])
				.tickFormat("");
		},

		createY0Axis3: function () {
			this.y0Axis = d3.axisLeft(this.y0Scale)
				.tickPadding(10)
				.tickSize(-1 * this.getYTickSize())
				.tickArguments([5])
				.tickFormat(d3.format("d"))
				.tickSizeOuter(0);

			this.yMark = d3.axisLeft(this.y0Scale)
				.tickArguments([5])
				.tickFormat("");
		},

		createY1Axis: function () {
			this.y1Axis = d3.axisRight(this.y1Scale)
				.tickFormat(d3.format("d"))
				.tickArguments([5]);
		},

		//TODO TEXT OPTION
		drawX0Axis: function (objDraw, className) {
			if (!objDraw) return;
			if (!className) className = "x axis";

			objDraw
				.append("g")
				.attr("class", className)
				.attr("transform", "translate(0," + this.getSvgHeight() + ")")
				.call(this.x0Axis);

			d3.selectAll("g.x.axis g.tick text").attr("class", function (d) {//time
				if (d.textCss != undefined && d.textCss) return "tickText";
			});
		},

		drawX0Axis2: function (objDraw, className) {
			if (!objDraw) return;
			if (!className) className = "x axis";

			objDraw
				.append("g")
				.attr("class", className)
				.attr("transform", "translate(0," + this.getSvgHeight() + ")")
				.call(this.x0Axis)
				.selectAll("text")
				.attr("x", 0)
				.attr("y", 5)
				.attr("dy", ".9em")
				.style("text-anchor", "middle");
		},

		drawY0Axis: function (objDraw, className) {
			if (!objDraw) return;
			if (!className) className = "y axis";

			var yAxisTemp = objDraw.append("g")
				.attr("class", className);

			this.yAxis.push(yAxisTemp);

			yAxisTemp
				.call(this.y0Axis)
				.selectAll("text")
				.attr("class", "title")
				.attr("x", -2) //TODO text 길이에 따라..
				.attr("y", 0)
				.style("text-anchor", "end");
		},

		drawY0Axis2: function (objDraw, className, markFlag, title) {
			if (!objDraw) return;
			if (!className) className = "y axis";

			var yAxisTemp = objDraw.append("g")
				.attr("class", className);

			this.yAxis.push(yAxisTemp);

			yAxisTemp
				.call(this.y0Axis)
				.append("text")
				.attr("class", "title")
				.attr("transform", "rotate(-90)")
				.attr("x", -3)
				.attr("y", 8)
				.attr("dy", ".31em")
				.style("text-anchor", "end")
				.attr("fill", "#424242")
				.text(title == undefined ? "":title);

			if (markFlag) {
				objDraw.append("g").attr("class", "y mark")
					.call(this.yMark);
			}

		},
		drawY0Axis3: function (objDraw, className, markFlag, title) {
			if (!objDraw) return;
			if (!className) className = "y axis";

			var yAxisTemp = objDraw.append("g")
				.attr("class", className);

			this.yAxis.push(yAxisTemp);

			yAxisTemp
				.call(this.y0Axis)
				.append("text")
				.attr("class", "title")
				.attr("x", -(this.getSvgHeight() / 2))
				.attr("y", this.yTextPos(yAxisTemp))
				.attr("dy", ".31em")
				.attr("transform", "rotate(-90)")
				.style("text-anchor", "middle")
				.style("font-weight", "bold")
				.style("font-size", "12px")
				.attr("fill", "#424242")
				.text(title == undefined ? "" : title);

			if (markFlag) {
				objDraw
					.append("g")
					.attr("class", "y mark")
					.call(this.yMark);
			}

		},

		drawY1Axis: function (objDraw, className, title) {
			if (!objDraw) return;
			if (!className) className = "y1 axis";

			var yAxisTemp = objDraw.append("g")
				.attr("class", className)
				.attr("transform", "translate(" + ( this.getYTickSize()) + ", 0)");

			this.yAxis.push(yAxisTemp);

			yAxisTemp
				.call(this.y1Axis)
				.append("text")
				.attr("class", "title")
				.attr("transform", "rotate(270)")
				.attr("x", -3)
				.attr("y", -8)
				//.attr("dy", ".31em")
				.style("text-anchor", "end")
				.attr("fill", "#424242")
				.text(title == undefined ? "" : title);
		},


		yTextPos: function (yAxis) {
			var ticks = yAxis.selectAll(".tick");
			var ticksArray = [];
			ticks.each(function (d) {
				ticksArray.push(d.toString().length);
			});
			var ticksLength = d3.max(ticksArray);

			var yTextPos = -30;
			if (ticksLength > 2) {
				yTextPos = yTextPos - (ticksLength - 2) * 6;
			}
			return yTextPos;
		},

		setAxisWidth: function (dataCount, yTitle) {
			var yTextLength = dataCount.toString().length;

			var graphLayer = d3.select("#" + this.chartId);
			var clientRect = graphLayer.node().getBoundingClientRect();

			//y축 svgHeight 설정
			var left = 0; //2글자 기준으로

			if (yTitle) left = 30;
			var maxLength = 2;
			if (yTextLength > maxLength) {
				left += Math.ceil(this.svgMargin.left * yTextLength / (maxLength + 1));
				if (left > (clientRect.width / 2)) {
					left = clientRect.width / 4;
				}
			}
			this.axisX0 = left;
		},

		resize: function () {
			var chartId = this.chartId;
			var objChart = d3.select("#" + chartId);

			var clientRect = objChart.node().getBoundingClientRect();
			var width = clientRect.width;
			var height = clientRect.height;

			this.setSvgSize(width, height);
			this.setX0OutputRange();
			this.setY0OutputRange();
			this.setY1OutputRange();

			var objSvg = objChart.select("svg");
			if (this.x0Axis) {
				this.x0Axis.tickSize(-this.getSvgHeight());
				objSvg.select(".x.axis")
					.attr("transform", "translate(0," + this.getSvgHeight() + ")")
					.call(this.x0Axis);
			}

			if (this.y0Axis) {
				this.y0Axis.tickSize(-1 * this.getYTickSize());
				objSvg.select(".y.axis").call(this.y0Axis);
			}

			if (this.y1Axis) {
				//tickSize는 yAxis or y0Axis 둘중에 하나
				//this.y1Axis.tickSize(-(this.getSvgWidth() - this.getLegendWidth()));

				objSvg.select(".y1.axis")
					.attr("transform", "translate("+this.getYTickSize()+", "+0+")")
					.call(this.y1Axis);
			}

			if (this.yMark) {
				objSvg.select(".y.mark").call(this.yMark);
			}

		},


		setLegendSize: function (position) {
			if(position && typeof position == "object"){
				this.legend.left = isNaN(parseInt(position.left, 10)) ?  0:parseInt(position.left, 10);
				this.legend.right = isNaN(parseInt(position.right, 10)) ?  0:parseInt(position.right, 10);
				this.legend.top = isNaN(parseInt(position.top, 10)) ?  0:parseInt(position.top, 10);
				this.legend.bottom = isNaN(parseInt(position.bottom, 10)) ?  0:parseInt(position.bottom, 10);
			}
		},

		getLegendWidth: function () {
			return this.legend.left + this.legend.right;
		},

		getLegendHeight: function() {
			return this.legend.top + this.legend.bottom;
		},

		getYTickSize: function(){
			return this.getSvgWidth() - this.getLegendWidth();
		},

		getXTickSize: function(){
			return this.getSvgHeight() - this.getLegendHeight();
		},



		/**
		 * index: number or hex color
		 */
		getGradientColor: function (index, gradientDirection) {
			var chartId = this.chartId;
			var minX = "0%";
			var maxX = "100%";
			var minY = "0%";
			var maxY = "100%";

			gradientDirection = "vertical";
			if (gradientDirection != undefined && gradientDirection != null) {
				if (gradientDirection == "vertical") {
					minX = "0%";
					maxX = "0%";
					minY = "0%";
					maxY = "100%";
				} else if (gradientDirection == "horizontal") {
					minX = "0%";
					maxX = "100%";
					minY = "0%";
					maxY = "0%";
				}
			}

			if (index == undefined || index == null) index = 0;
			else if(!isNaN(parseInt(index, 10))) {
				index = parseInt(index, 10);
			}else{
				var hexRegexp = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
				if(!hexRegexp.test(index)) index = 0;
			}
//			console.log("index", index)
			var color = isNaN(index) ? index:NaruSecD3Js.getColor(index);
			var color1 = d3.rgb(color).darker(0.3);
			var color2 = d3.rgb(color);
			var color3 = d3.rgb(color).brighter(0.3);
			var color4 = d3.rgb(color).brighter(0.7);
			//var linearGradientLen = d3.select("#" + chartId).selectAll(".linear_gradient").size();

			var gradientId = "gradient_" + chartId + "_" + color.replace("#", "");
			var objChart = d3.select("#" + chartId);

			var linearGradientLayer = objChart.select(".linear-gradient-layer");
			if(linearGradientLayer.size() == 0){
				linearGradientLayer = objChart.select("svg").append("svg:g").attr("class", "linear-gradient-layer");
			}

			if(linearGradientLayer.select("#"+gradientId).size() == 0){
				var objGradient = linearGradientLayer.append("linearGradient")
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
			}

			return gradientId;
		},

		createToolTip: function () {
			var objChart = d3.select("#"+this.chartId);
			var divToolTip = objChart.select(".toolTip");
			if (divToolTip.size() == 0) {
				divToolTip = objChart.append("div").attr("class", "toolTip");
			}

			return divToolTip;
		},

		showToolTip: function (objToolTip, toolTipMessage) {
			objToolTip.html(toolTipMessage)
				.transition()
				.duration(100)
				.style("opacity", 0.9);
		},

		xTicksDateWrap: function (text, width) {//text, width, height
			var changeText = "";
			var format = d3.timeFormat("%Y-%m-%d");

			var change = false;
			var count = 0;
			text.each(function () {
				var textTemp = d3.select(this);
				var word = textTemp.text();
				var x = textTemp.attr("x");
				var y = textTemp.attr("y");
				var dy = parseFloat(textTemp.attr("dy"));

				var objTspan = textTemp.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

				var dateTemp = format.parse(word);

				var wordText = format(dateTemp);
				var replaceText = wordText;

				objTspan.text(wordText);

				//var formatYear = d3.timeFormat("%Y");
				var formatYearMonth = d3.timeFormat("%y-%m");
				var formatMonth = d3.timeFormat("%m");
				var formatMonthDay = d3.timeFormat("%m-%d");
				var formatDay = d3.timeFormat("%d");

				if (checkTspanLength(objTspan, width)) {
					replaceText = formatMonthDay(dateTemp);
					objTspan.text(replaceText);
					change = true;

					if (checkTspanLength(objTspan, width)) {
						replaceText = formatMonth(dateTemp);
						objTspan.text(replaceText);
						change = true;

						if (checkTspanLength(objTspan, width)) {
							replaceText = formatYearMonth(dateTemp);

							if (count == 0 && Number(formatDay(dateTemp) > 15)) {
								change = false;
							} else {
								change = true;
								count++;
							}
						}
					}
					//console.log("replaceText: ", replaceText+","+change);
				} else {
					change = true;
				}

				if (change && replaceText != changeText) {
					changeText = replaceText;
					objTspan.text(replaceText);
				} else {
					objTspan.text("");
				}

			});

			function checkTspanLength(tspan, width){
				return width < Math.floor(tspan.node().getComputedTextLength());
			}

		}
	}

}();


d3.selection.prototype.trigger = function(eventName, data) {
	this.on(eventName)(data);
};


NaruSecD3Js.getTimeFormat = function(fmt){
	if(!fmt) fmt = "%Y-%m-%d";
	return d3.timeFormat(fmt);
};

//NaruSecD3Js.rgbToHex = function(rgb){
//	var hex = /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i.exec(rgb);
//	return hex ? '#' + (1 << 24 | hex[1] << 16 | hex[2] << 8 | hex[3]).toString(16).substr(1) : rgb;
//
//}

/**
 * fmt: format 형식
 * date: date
 * return: string
 */
NaruSecD3Js.getTimeString = function(fmt, date){
	if(arguments.length < 2) return null;
	var parseTime = this.getTimeFormat(fmt);

	if(!date) return date;
	return parseTime(date);
};


NaruSecD3Js.getTimeDayRange = function(stDate, endDate){
	if(arguments.length < 2) return null;
	if(!stDate instanceof Date) return null;
	if(!endDate instanceof Date) return null;

	return d3.timeDay.range(stDate, endDate);
};

NaruSecD3Js.getTimeDayOffset = function(date, num){
	if(!date instanceof Date) return null;
	if(isNaN(parseInt(num))) num = 0;

	return d3.timeDay.offset(date, num);
};


NaruSecD3Js.getTimeParse = function(fmt){
	if(!fmt) fmt = "%Y-%m-%d";
	return d3.timeParse(fmt);
};
/**
 * fmt: format 형식
 * date: string
 * return: date
 */
NaruSecD3Js.getTimeDate = function(fmt, date){
	if(arguments.length < 2) return null;
	var parseTime = this.getTimeParse(fmt);

	if(!date) return date;
	return parseTime(date);
};



NaruSecD3Js.getColor = function(index) {
	if(index == undefined || index == null || isNaN(index)) index = 0;
	if(typeof(index) == "string") index = parseInt(index, 10);

	var basicColor = this.getCateColor();

	var colorLength = basicColor.length;
	return basicColor[index%colorLength];
};

NaruSecD3Js.getCateColor = function(){
	return ["#3499E5", "#60BA53", "#F0C609", "#F29037", "#D3361E", "#AF5ADD", "#ADACAC", "#40C9FA", "#A9D50B", "#E5E907", "#D26014", "#BD4579", "#8000FF", "#998979", "#013ADF", "#088A4B", "#FEB305", "#B77C24", "#C94949" , "#B4045F", "#6E6E6E"];//파초노주빨보은;;
};

/*
 NaruSecD3Js.createTodoGraph = function(opt, dataMap){
 //	var chartOpt = {
 //			id: chartId,
 //			x:{
 //				"value": "date",
 //				"timeFormat":"%Y-%m-%d"
 //			},
 //			y:{
 //				"position":"left",//TODO
 //				//"title": "CQ 수",
 //				//"titleInner":true,
 //			},
 //			graph:[
 //				{
 //				//	"dataKey": "dateList", -->option data가 object이면.
 //					"type": "line",
 //					"value": "count",
 //					"color": NaruSecD3Js.getColor(0)//-->지정했을때 지정안했을때
 //				},{
 //				//	"dataKey": "confirmList", -->option
 //					"type": "line",
 //					"value": "count",
 //					"color":NaruSecD3Js.getColor(1)
 //				}
 //			],
 ////			balloon:{
 ////				"timeFormat":"%Y-%m-%d",
 ////				"value":"[[date]]: [[count]]개"
 ////			},
 //			animation:{
 //				duration: 1000,
 //			},
 //			legend:{
 //
 //			}
 //		};

 if(!opt.id){

 return;
 }
 var chartId = opt.id;
 var yOpt = opt.y;

 if(yOpt && Array.isArray(yOpt)){ //y축 설정
 for(var i=0; i<yOpt.length; i++){// 2개까지만..
 if(i > 1) break;
 }
 }else{//y Object

 }


 //graph 그리기
 var graph = opt.graph;
 if(graph && Array.isArray(graph)){
 for(var i=0; i<graph.length; i++){
 //var graphOption = graphOpt[i];

 }

 }else{

 }

 };
 */

/**
 *	1.bar 2.line순서로해야 정상동작 --> TODO 순서없이
 */
NaruSecD3Js.createGraph = function(opt, dataMapTemp){
	if(!opt.id){
		console.log("not select chartId:", opt.id);
		return;
	}
	var chartId = opt.id;
	var yOptTemp = opt.y;
	var objD3 = null;

	var updateFn = {};
	var resizeFn = {};

	var optLegend = opt.legend;

	var yOpt = [];
	var dataMap = {};
	if(yOpt && !Array.isArray(yOpt)){
		yOptTemp.dataKey = "resultList";
		dataMap[yOptTemp.dataKey] = dataMapTemp;
		yOpt.push(yOpt);
	}else{
		yOpt = yOptTemp;
		dataMap = dataMapTemp;
	}

	var yAxisArray = objD3.yAxis;//[]

	if(yOpt && Array.isArray(yOpt)){
		delete opt.y;
		var legendData = [];
		for(var i=0; i<yOpt.length; i++){// 2개까지만..
			if(i > 1) break;
			var yOption = yOpt[i];
			var dataKey = yOption.dataKey;
			var type = yOption.type;
			var title = yOption.title;
			//var value = yOption.value;
			var color = yOption.color;

			delete yOption.type;
			delete yOption.data;
			delete yOption.color;
			delete opt.legend; //생성 안되게 createBarGraph or createLineGraph;
			opt.y = yOption;


			var result = null;
			if(type == "bar") {
				result = this.createBarGraph(opt, dataMap[dataKey], true);
				objD3 = result.objD3;

				updateFn[dataKey] = result.update;
				resizeFn[dataKey] = result.resize;
			}else if(type == "line") {
				if(objD3 != null) {
					result = this.createLineGraph(opt, dataMap[dataKey], objD3); //line만 multi 현재 구현
				}else{
					result = this.createLineGraph(opt, dataMap[dataKey], null, true);
				}
				updateFn[dataKey] = result.update;
				resizeFn[dataKey] = result.resize;
			}else if(type == "multiLine") {
				result = this.createMultiLineGraph(opt, dataMap[dataKey]);

				updateFn[dataKey] = result.update;//TODO
				resizeFn[dataKey] = result.resize;
			}

			if(optLegend && !optLegend.data) {
				legendData.push({"title":title, "type":type, "color": color ? color:NaruSecD3Js.getColor(i)});//TODO value
			}
		}

		var objLegend = null;
		if(optLegend.data) legendData = optLegend.data;
		console.log(optLegend);


		if(legendData.length > 0){
			//title, type
			objLegend = NaruSecD3Js.createLegend(optLegend, legendData, objD3);
		}

		function update(data){
			var dataKeys = Object.keys(data);
			var dataKeysLength = dataKeys.length;
			if(dataKeysLength> 0){
				for(var i=0; i<dataKeysLength; i++){
					if(updateFn.hasOwnProperty(dataKeys[i])){
						updateFn[dataKeys[i]](data[dataKeys[i]]);
					}
				}
			}

			if(objLegend && objLegend.hasOwnProperty("update")){
				for(var i=0; i<yAxisArray.length; i++){
					legendData[i]["title"] = yAxisArray[i].select("text.title").text();
				}
				objLegend.update(legendData);
			}
		}

		var dataKeys = Object.keys(resizeFn);
		if(dataKeys.length > 0){
			function resizeGraph(){
				for(var i=0; i<dataKeys.length; i++){
					var dataKey = dataKeys[i];
					resizeFn[dataKey]();
				}

				if(objLegend && objLegend.hasOwnProperty("resize")){
					objLegend.resize();
				}

			}

			//redraw
			objD3.addWindowResizeEvent(resizeGraph);
			resizeGraph();
		}

		if(yAxisArray.length > 0){
			for(var i=0; i<yAxisArray.length; i++){
				yAxisArray[i].update = function(){
					if(!arguments.length) return;
					if(Object.keys(arguments[0]).length > 0){
						var title = arguments[0].title;
						if(arguments[0].title){
							this.select("text.title").text(title ? title:"");
						}
					}
				}
			}
		}

		return {
			update: update,
			yAxis: yAxisArray
		}
	}

	//
	//else{
	//	var yOption = yOpt;
	//	var type = yOption.type;
	//	var title = yOption.title;
	//	//var value = yOption.value;
	//	var color = yOption.color;
	//
	//	var result = null;
	//	if(type == "bar"){
	//		result = this.createBarGraph(opt, dataMap, true);
	//	}else if(type == "line"){
	//		//result = this.createLineGraph(opt, dataMap, null, true);//TODO TEST;
	//	}else if(type == "multiLine"){
	//		result = this.createMultiLineGraph(opt, dataMap);
	//	}
	//
	//	var objD3 = result.objD3;
	//	if(objD3 && objD3 instanceof NaruSecD3Js){
	//		if(result && result.hasOwnProperty("resize")){
	//			//redraw
	//			objD3.addWindowResizeEvent(result.resize);
	//			result.resize();
	//		}
	//	}
	//
	//	return {
	//		//obj:result.obj,
	//		update: result.update,
	//		//resize: result.resize,
	//		yAxis: result.yAxis
	//	};
	//
	//}

};

NaruSecD3Js.prototype.createLegendRight = function(){
	var objDraw = this.getSvgLayer();
	var objD3 = this;
	var legendLayer = objDraw.append("g")
		.attr("class", "legend-layer")
		.attr("transform", "translate("+(objD3.getYTickSize() + 30)+", "+0+")");
	//.attr("transform", "translate("+(objD3.getSvgWidth() - (objD3.getLegendWidth() - 30))+", "+0+")");

	function setData(legendData){
		if(!legendData && legendData.length == 0) return;
		var legend = legendLayer.selectAll(".legend")
			.data(legendData);

		legend.exit().remove();

		legend
			.enter().append("g")
			.merge(legend)
			.attr("class", "legend")
			.attr("transform", function(d, i) { return "translate(0," + ((i * 20)+10) + ")"; })
			.each(function(d){
				var g = d3.select(this);
				var legendType = d.type;
				var graphId = d.graph; //TODO undefined
				var legendColor = d.color;

				if(!legendType || legendType == "bar"){
					var objRect = g.append("rect");
					objRect.attr("x", 0)
						.attr("width", 20)
						.attr("height", 10)
						.attr("fill", legendColor)
						.style("cursor", "pointer");

					objRect.on("mouseover.one", function(d){
						d3.select(this).attr("fill", d3.rgb(d.color).brighter(0.3));
					})
						.on("mouseout.one", function(d){
							d3.select(this).attr("fill", d.color);
						});

					objRect.on("click", function(d, i){
						var obj = d3.select(this);
						var visible = true;
						if(obj.attr("opacity") == null || obj.attr("opacity") == 1){
							obj.attr("opacity", 0.4);
							visible = false;
						}else{
							obj.attr("opacity", 1);
							visible = true;
						}

						var opacity = visible ? 1 : 0;
						objDraw.selectAll(".bar").style("opacity", opacity);
						if(!d.graph){
							var objBarLayer = objDraw.selectAll(".bar-layer");
							if(objBarLayer.size() > 0){
								if(objBarLayer[i]){
									objBarLayer[i].selectAll(".bar").style("opacity", opacity);
								}
							}
						}else{//id select TODO bar multi
							objDraw.select("#bar_"+d.graph).style("opacity", opacity);
						}


					});
				}else if(legendType == "line"){
					var lineLegend = g.append("g").style("cursor", "pointer");

					var objPath = lineLegend.append("path");
					objPath.attr('d', 'M 0 5 L 20 5')
						.attr('style', 'stroke-width:2px; stroke:'+d.color);

					objPath.on("mouseover.one", function(d){
						d3.select(this).style("stroke", d3.rgb(d.color).brighter(0.3));
					})
						.on("mouseout.one", function(d){
							d3.select(this).style("stroke", d.color);
						});

					lineLegend.append("circle")
						.attr("class", "legend--circle")
						.attr("r", 1)
						.attr("cx", 10)
						.attr("cy", 5)
						.style("stroke", d.color)
						.attr("fill", "#fff")
						.style("stroke-width", 1);

					lineLegend.on("click", function(d, i){
						var obj = d3.select(this);
						var visible = true;
						if(obj.attr("opacity") == null || obj.attr("opacity") == 1){
							obj.attr("opacity", 0.4);
							visible = false;
						}else{
							obj.attr("opacity", 1);
							visible = true;
						}

						var opacity = visible ? 1 : 0;
						var objLineLayer = null;

						if(!graphId){
							objLineLayer = objDraw.selectAll(".line-layer");
							if(objLineLayer.size() > 0 && objLineLayer){
								objLineLayer = objLineLayer.filter(function(d, index){
									return i == index;
								});

								objLineLayer.select(".line").style("opacity", opacity);
							}
						}else{//id select
							objLineLayer = objDraw.select("#line_"+graphId);
							if(objLineLayer.size() > 0 && objLineLayer){
								objLineLayer.select(".line").style("opacity", opacity);
							}
						}

						if(objLineLayer.size() > 0){
							var objLineCircleLayer = objLineLayer.selectAll(".lineChart--circle");
							if(objLineCircleLayer.size() > 0 && objLineCircleLayer){
								objLineCircleLayer.style("opacity", opacity);
							}
						}
					});
				}
			});

		legend
			.select("text")
			.text(function(d) {
				return d.title;
			});

		return legendLayer.selectAll(".legend");
	}

	var legendTemp = setData(objD3.legend.data);
	legendTemp
		.append("text")
		.attr("x", 30)
		.attr("y", 8)
		//.filter(function(d, i){
		//var yPosition = (i+1) * 20 + 10;
		//if(yPosition <= objD3.getSvgHeight())
		//return d;
		//})
		//.attr("dy", ".35em")
		.style("text-anchor", "start")
		.text(function(d) {
			return d.title;
		});

	return {
		resize: function(){
			objDraw.select(".legend-layer")
				.attr("transform", "translate("+(objD3.getYTickSize() + 30)+", "+0+")");
		},
		update: function(data){
			//title, //추후 value, remove 후 redraw?
			if(data && Array.isArray(data) && data.length > 0){
				setData(data);
			}

		}
	}
};

NaruSecD3Js.createMultiLineGraph = function(opt, data){
	if(!opt.id){
		console.log("not select chartId:", opt.id);
		return;
	}
	var chartId = opt.id;
	var xValue = opt.x.value;
	var yValue = opt.y.value;
	var yTitle = opt.y.title;

	var dataList = [];
	data.forEach(function(d){
		if(yValue.length > 0){
			for(var i=0; i<yValue.length; i++){
				if(yValue[i]){
					var temp = {"key":yValue[i], "value":d[yValue[i]], "color":NaruSecD3Js.getColor(i), "groupId":i};
					temp[xValue] = d[xValue];

					dataList.push(temp);
				}
			}
		}
	});

	var dataNest = d3.nest()
		.key(function(d) {return d.key;})
		.entries(dataList);

	var dataCount = d3.max(dataNest, function(d) {
		return d3.max(d.values, function (d) {
			return d.value;
		});
	});
	var yMaxDomain = dataCount + (10 - (dataCount % 10));

	var xMinDomain = d3.min(dataNest, function(d) {
		return d3.min(d.values, function (d) {
			return d[xValue];
		});
	});

	var xMaxDomain = d3.max(dataNest, function(d) {
		return d3.max(d.values, function (d) {
			return d[xValue];
		});
	});


	var objD3 = new NaruSecD3Js();
	objD3.data = data;
	objD3.chartId = chartId;

	objD3.setX0Value(opt.x.value);
	objD3.setY0Value("value");

	//Todo title 글자 수
	var objDraw = objD3.createSvg(opt);

	//"position": "right"

	var objLegend = null;
	if(opt.legend){
		objLegend = NaruSecD3Js.createLegend(opt.legend, opt.legend.data, objD3);
	}

	objD3.setX0Scale("time");
	objD3.setY0Scale("linear");

	objD3.setX0OutputType("range");
	objD3.setY0OutputType("range");



	objD3.setX0OutputRange();
	objD3.setY0OutputRange();


	objD3.setX0Domain(xMinDomain, xMaxDomain);
	objD3.setY0Domain(0, yMaxDomain);

	objD3.createX0Axis();
	objD3.createY0Axis2();
	objD3.drawX0Axis2(objDraw, "x axis");
	objD3.drawY0Axis2(objDraw, "y axis", true, yTitle);

	var createMultiLine = function(){
		var line = d3.line()
			.x(function(d) {
				return objD3.getX0Scale(d[xValue]);
			})
			.y(function(d){
				return objD3.getY0Scale(d["value"]);
			});

		var lineLayer = objDraw.append("g")
			.selectAll(".line-layer")
			.data(dataNest, function(d){
				return d.key;
			})
			.enter().append("g")
			.attr("class", "line-layer")
			.attr("id", function(d){
				return "line_"+d.key;
			});

		lineLayer.append("path")
			.attr("class", "line")
			.style("stroke", function(d){
				return d.values[d.values.length - 1].color;
			});

		var circle = lineLayer.selectAll("circle")
			.data(function(d){
				return d.values;
			})
			.enter()
			.append("circle")
			.attr('class', function(){
				return "lineChart--circle";
			})
			.attr("fill", function(d){
				return d.color;
			})
			.attr("r", 2)
			.style("stroke", function(d){
				return d.color;
			})
			.attr("fill", "#fff")
			.style("stroke-width", 1);

		return function(){
			objDraw
				.selectAll('.line')
				.attr("d", function(d){
					return line(d.values);
				});

			circle.attr("cx", function(d) {
				return objD3.getX0Scale(d[xValue]);
			})
				.attr("cy", function(d) {
					return objD3.getY0Scale(d["value"]);
				});
			return circle;
		};
	};

	var drawFn = createMultiLine();
	var circle = drawFn();
	//TODO setData 위치 변경 balloon, legend;
	if(opt.balloon){
		//create balloon
		objD3.createBalloon(circle, opt.balloon, "circle");
	}


	function redrawChart(){
		var objChart = d3.select("#" + chartId);
		if(objChart.size() == 0){
			objD3.removeWindowResizeEvent();
			return;
		}

		var clientRect = objChart.node().getBoundingClientRect();
		var clientWidth = clientRect.width;
		var clientHeight = clientRect.height;

		if(clientWidth > 0 && clientHeight > 0){
			objD3.resize();
			drawFn();

			if(objLegend && objLegend.hasOwnProperty("resize")){
				objLegend.resize();
			}
		}
	}

//option
//	objDraw.selectAll(".line-layer").filter(function(d, i){
//		if(i >= legendCount){
//			objDraw.selectAll(".lineChart--circle."+("_"+d.values[d.values.length - 1].groupId)).style("opacity", 0);
//			objDraw.select("#line_"+d.values[d.values.length - 1].groupId).style("opacity", 0);
//		}
//	});

	return {
		obj:objDraw.node().parentNode,
		update: function(){}, //TODO
		resize: redrawChart,
		objD3: objD3
	}

};

NaruSecD3Js.createLineGraph = function(opt, data, objD3Temp, objD3Flag){
	if(!opt.id){
		console.log("not select chartId:", opt.id);
		return;
	}
	var chartId = opt.id;
	var objD3 = objD3Temp;

	var dataCount = d3.max(data, function(d){
		return d[opt.y.value];
	});
	var yMaxDomain = dataCount + (10 - (dataCount % 10));
	var yTitle = opt.y.title;


	var yAxisClass = "y";
	if(objD3 && objD3 instanceof NaruSecD3Js){
		objD3.data = data;
		objD3.setY1Scale("linear");
		objD3.setY1OutputType("range");
		objD3.setY1OutputRange();

		objD3.setY1Domain(0, yMaxDomain);
		objD3.createY1Axis();

		var objDraw = d3.select("#"+chartId).select("g");
		yAxisClass = "y1";
		objD3.drawY1Axis(objDraw, yAxisClass+" axis", yTitle);
	}else{
		//TODO
	}


	var drawFn = objD3.createLineGraph(objDraw, yAxisClass);
	var circle = drawFn();

	if(opt.balloon){
		//create balloon
		objD3.createBalloon(circle, opt.balloon, "circle");
	}



	function redrawChart(){
		var objChart = d3.select("#" + chartId);
		if(objChart.size() == 0){
			objD3.removeWindowResizeEvent();
			return;
		}

		var clientRect = objChart.node().getBoundingClientRect();
		var clientWidth = clientRect.width;
		var clientHeight = clientRect.height;

		if(clientWidth > 0 && clientHeight > 0){
			objD3.resize();
			drawFn(opt.animation); //drawBarRect
		}
	}

	function setData(data){//TODO TEST
		objD3.data = data;

		//update data
		var dataCount = d3.max(data, function(d){
			return d[opt.y.value];
		});
		var yMaxDomain = dataCount + (10 - (dataCount % 10));

		//width가 변하면 (y축 텍스트가 길어질때 )
		//objD3.setAxisWidth(dataCount, yTitle);

//		var graphLayer = d3.select("#"+chartId);
//		var clientRect = graphLayer.node().getBoundingClientRect();
//		objD3.setSvgSize(clientRect.width, clientRect.height);
//		objD3.setX0OutputRange();

		//scale set Domain
//		objD3.getX0Scale().domain(objD3.data.map(function(d){
//			return d[objD3.getX0Value()];
//		}));
		objD3.setY0Domain(0, yMaxDomain);

		//update line
		drawFn(opt.animation);

		//update xAxis;
		//update yAxis
		var yAxis = null;
		if(yAxisClass == 'y'){
			if(objD3.x0Axis){
//				objDraw.select(".x.axis")
//				.attr("transform", "translate(0," + objD3.getSvgHeight() + ")")
//				.call(objD3.x0Axis);
			}

			yAxis = objD3.y0Axis;

		}else{
			yAxis = objD3.y1Axis;
		}

		if(yAxis){
			//yAxis.tickSize(-(objD3.getSvgWidth() - objD3.getLegendWidth()));
			var temp = objDraw.select("."+yAxisClass+".axis");
			temp.call(yAxis);

			if(yTitle){
				objDraw.select("."+yAxisClass+".title").attr("y", objD3.yTextPos(temp));
			}
		}


		if(objD3.yMark){
			objDraw.select("."+yAxisClass+".mark").call(objD3.yMark);
		}


	}

	return {
		obj:objDraw.node().parentNode,
		update: setData,
		resize: redrawChart,
		objD3: objD3Flag ? objD3:null
	};
};


NaruSecD3Js.prototype.createLineGraph = function(objDraw, yAxisClass){
	//line생성
	var objD3 = this;
	var line = d3.line()
		.x(function(d){
			return objD3.getX0Scale(d[objD3.getX0Value()]) + (objD3.getX0Scale().bandwidth() / 2);
		})
		.y(function(d){
			return yAxisClass == 'y' ? objD3.getY0Scale(d[objD3.getY0Value()]):objD3.getY1Scale(d[objD3.getY0Value()]);
		});


	var lineLayer = objDraw.append("g").attr("class", "line-layer");
	lineLayer.append("path")
		.datum(objD3.data)
		.attr("class", "line")
		.style("stroke-width", 2)
		.style("stroke", NaruSecD3Js.getColor(0));

	var circle = lineLayer.selectAll("circle")
		.data(objD3.data)
		.enter()
		.append("circle")
		.attr("class", "lineChart--circle")
		.attr("r", 2)
		.style("stroke", function(d){
			return d.color;
		})
		.attr("fill", "#fff")
		.style("stroke-width", 1);

	return (function (){
		objDraw
			.selectAll('.line')
			.attr("d", line);

		circle.attr("cx", function(d) {
			return objD3.getX0Scale(d[objD3.getX0Value()]) + (objD3.getX0Scale().bandwidth() / 2);
		})
			.attr("cy", function(d) {
				return yAxisClass == 'y' ? objD3.getY0Scale(d[objD3.getY0Value()]):objD3.getY1Scale(d[objD3.getY0Value()]);
			});
		return circle;
	});

};


/**
 * TODO createDurationGraph name
 */
NaruSecD3Js.createDurationGraph = function(opt, data){
	if(!opt.id){
		console.log("not select chartId:", opt.id);
		return;
	}
	var chartId = opt.id;
	var objD3 = new NaruSecD3Js();

	objD3.chartId = chartId;
	objD3.data = data;

	var objDraw = objD3.createSvg();
	objD3.setX0Scale("time");
	objD3.setY0Scale("linear");

	objD3.setX0OutputType("range");
	objD3.setY0OutputType("range");

	objD3.setX0OutputRange();
	objD3.setY0OutputRange();


	var x1 = opt.x["x1"];
	var x2 = opt.x["x2"];
	var dx1 = opt.x["dx1"];//st
	var dx2 = opt.x["dx2"]; //ed
	objD3.setX0Value(x1);
//	objD3.setY0Value(opt.y.value);


	var startDate = null;
	var endDate = null;
	var minDate = d3.min(objD3.data, function(d, i){
		if(i == 0) startDate = d[dx1];
		return d[x1];
	});

	var maxDate = d3.max(objD3.data, function(d, i){
		if(i == 0) endDate = d[dx2];
		return d[x2];
	});


	if(!startDate || !startDate instanceof Date){
		startDate = minDate;
	}
	if(!endDate || !endDate instanceof Date){
		endDate = maxDate;
	}

	//domain
	objD3.setX0Domain(startDate, endDate);
	objD3.setY0Domain(0, objD3.data.length);

	//axis
	objD3.createX0Axis();
	objD3.drawX0Axis(objDraw, "x axis");

	var createDuration = function(){//objD3, objDraw
		var rectHeight = 30;
		var innerColor = !opt.x["innerColor"] ? "#DF0101":opt.x["innerColor"];
		var outerColor = !opt.x["outerColor"] ? "#BCBCBC":opt.x["outerColor"];

		objDraw.append("g")
			.append("rect")
			.attr("class", "background")
			.attr("fill", function(){
				//var obj = d3.select(this);
				//var parentNode = obj.node().parentNode;
				return "url(#"+objD3.getGradientColor(outerColor)+")";
			})
			.attr("fill-opacity", 0.7);

		objDraw.append("g").attr("class", "rect-layer");


		return function(){
			var dataCount = objD3.data.length;
			var domain = objD3.getX0Scale().domain();

			objDraw.select("rect.background")
				.attr("x", objD3.getX0Scale(domain[0]))
				.attr("y", objD3.getY0Scale(dataCount))
				.attr("width", objD3.getSvgWidth())
				.attr("height", rectHeight);

			var objRects = objDraw.select("g.rect-layer")
				.selectAll("rect.bar")
				.data(objD3.data);

			objRects.exit().remove();

			objRects.enter().append("rect")
				.merge(objRects)
				.attr("class", "bar")
				.attr("fill", function(){
					//var obj = d3.select(this);
					//var parentNode = obj.node().parentNode;
					return "url(#"+objD3.getGradientColor(innerColor)+")";
				})
				.attr("x", function(d){
					return objD3.getX0Scale(d[x1]);
				})
				.attr("y", function(){
					return objD3.getY0Scale(dataCount) + (rectHeight / 4);
				})
				.attr("width", function(d){
					var temp1 = objD3.getX0Scale(d[x2]); //end
					var temp2 = objD3.getX0Scale(d[dx2]);
					var temp = temp1 > temp2 ? temp2:temp1;
					return temp - objD3.getX0Scale(d[x1]);//start;
				})
				.attr("height", function(){
					return rectHeight / 2;
				});

			if(opt.balloon){
				//create balloon
				objRects = objDraw.select("g.rect-layer").selectAll("rect.bar");
				objD3.createBalloon(objRects, opt.balloon, "rect");
			}

			return objRects;

		};
	};

	var drawFn = createDuration();
	drawFn();

	//redraw
	objD3.addWindowResizeEvent(redrawChart);
	function redrawChart(){
		var objChart = d3.select("#" + chartId);
		if(objChart.size() == 0){
			objD3.removeWindowResizeEvent();
			return;
		}

		var clientRect = objChart.node().getBoundingClientRect();
		var clientWidth = clientRect.width;
		var clientHeight = clientRect.height;

		if(clientWidth > 0 && clientHeight > 0){
			objD3.resize();
			drawFn();
		}
	}



	function setData(data){
		objD3.data = data;
		//update
		var startDate = null;
		var endDate = null;
		var minDate = d3.min(objD3.data, function(d, i){
			if(i == 0) startDate = d[dx1];
			return d[x1];
		});

		var maxDate = d3.max(objD3.data, function(d, i){
			if(i == 0) endDate = d[dx2];
			return d[x2];
		});


		if(!startDate || !startDate instanceof Date){
			startDate = minDate;
		}
		if(!endDate || !endDate instanceof Date){
			endDate = maxDate;
		}


		//update width;
		var graphLayer = d3.select("#"+chartId);
		var clientRect = graphLayer.node().getBoundingClientRect();
		objD3.setSvgSize(clientRect.width, clientRect.height);
		objD3.setX0OutputRange();

		//update domain
		//domain
		objD3.setX0Domain(startDate, endDate);
		objD3.setY0Domain(0, objD3.data.length);

		//update drawFn
		drawFn();

		//update xAxis;
		if(objD3.x0Axis){
			objDraw.select(".x.axis")
				.attr("transform", "translate(0," + objD3.svgHeight + ")")
				.call(objD3.x0Axis);
		}



	}

	return {
		"resize": redrawChart,
		"update": setData
	}
};

/**
 * position:"left", "bottom" - default, TODO: "right", "top"
 */
NaruSecD3Js.createLegend = function(opt, legendData, objD3Temp){
	var objD3 = null;
	if(objD3Temp && objD3Temp instanceof NaruSecD3Js){
		objD3 = objD3Temp;
		objD3.legend.data = legendData ? legendData: objD3.data;
	}else{
		if(!opt || !opt.id){
			console.log("not select opt:", !opt ? opt:opt.id);
			return;
		}
		var chartId = opt.id;


		objD3 = new NaruSecD3Js();
		objD3.chartId = chartId;
		objD3.legend.data = legendData; //TODO --> legend.data
		objD3.setX0Value(opt.title);
		objD3.setY0Value(opt.value);
	}


	var position = opt.position;
	if(!position) position = "bottom";


//	var legendWidth = objD3.getSvgWidth();
//	var legendHeight = objD3.getSvgHeight();
	//legend position
	//position에 따른 legend maxHeight;
	//position에 따른 legend maxWidth;

	var objLegend = null;
	if(position == "right"){
		objD3.setLegendSize({
			"right":100
		});
		objLegend = objD3.createLegendRight();
	}else if(position == "top"){

	}else if(position == "left"){

	}else{
		objD3.setLegendSize({
			"bottom":20
		});
		objLegend = objD3.createLegendBottom();
	}

	return objLegend;

};

NaruSecD3Js.createBarGraph = function(opt, data, objD3Flag){
	if(!opt.id){
		console.log("not select chartId:", opt.id);
		return;
	}
	var chartId = opt.id;
	var objD3 = new NaruSecD3Js();

	objD3.chartId = chartId;
	objD3.data = data;

	objD3.setX0Value(opt.x.value);
	objD3.setY0Value(opt.y.value);

	var objLegend = null;
	if(opt.legend){
		objLegend = NaruSecD3Js.createLegend(opt.legend, opt.legend.data, objD3);
	}

	var objDraw = objD3.createSvg();

	objD3.setX0Scale("ordinal");
	objD3.setY0Scale("linear");

	objD3.setX0OutputType("rangeBands");
	objD3.setY0OutputType("range");

	objD3.setX0OutputRange();
	objD3.setY0OutputRange();

	var dataCount = d3.max(data, function(d){
		return d[objD3.getY0Value()];
	});

	var yMaxDomain = dataCount + (10 - (dataCount % 10));
	// x축 svgWidth 설정
	var yTitle = opt.y.title;
	objD3.setAxisWidth(yMaxDomain, yTitle);

	//domain x,y
	//TODO 함수
	objD3.getX0Scale().domain(objD3.data.map(function(d){
		return d[objD3.getX0Value()];
	}));

	objD3.setY0Domain(0, yMaxDomain);

	objD3.createX0Axis2(opt.x); //TODO
	objD3.createY0Axis2(); //TODO

	objD3.drawX0Axis(objDraw, "x axis");
	if(opt.y.titleInner){
		objD3.drawY0Axis2(objDraw, "y axis", true, yTitle);
	}else{
		objD3.drawY0Axis3(objDraw, "y axis", true, yTitle);
	}

	var drawFn = objD3.createBarRect(objDraw, opt.radius);
	var objBars = drawFn(opt.animation);
	if(opt.balloon){
		objD3.createBalloon(objBars, opt.balloon, "rect");
	}

	function redrawChart(){
		var objChart = d3.select("#" + chartId);
		if(objChart.size() == 0){
			objD3.removeWindowResizeEvent();
			return;
		}

		var clientRect = objChart.node().getBoundingClientRect();
		var clientWidth = clientRect.width;
		var clientHeight = clientRect.height;

		if(clientWidth > 0 && clientHeight > 0){
			objD3.resize();
			drawFn(opt.animation); //drawBarRect

			if(objLegend && objLegend.hasOwnProperty("resize")){
				objLegend.resize();
			}
		}
	}

	function setData(data){
		objD3.data = data;

		//update data
		var dataCount = d3.max(data, function(d){
			return d[opt.y.value];
		});
		var yMaxDomain = dataCount + (10 - (dataCount % 10));

		//width가 변하면 (y축 텍스트가 길어질때 )
		objD3.setAxisWidth(dataCount, yTitle);

		//update width;
		var graphLayer = d3.select("#"+chartId);
		var clientRect = graphLayer.node().getBoundingClientRect();
		objD3.setSvgSize(clientRect.width, clientRect.height);
		objD3.setX0OutputRange();

		//scale set Domain
		objD3.getX0Scale().domain(objD3.data.map(function(d){
			return d[objD3.getX0Value()];
		}));
		objD3.setY0Domain(0, yMaxDomain);

		//update rect
		drawFn(opt.animation);
		var objBars = drawFn(opt.animation);
		if(opt.balloon){
			//create balloon
			objD3.createBalloon(objBars, opt.balloon, "rect");
		}

		//update xAxis;
		if(objD3.x0Axis){
			objDraw.select(".x.axis")
				.attr("transform", "translate(0," + objD3.getSvgHeight() + ")")
				.call(objD3.x0Axis);
		}
		//update yAxis
		if(objD3.y0Axis){
			objD3.y0Axis.tickSize(-1  * objD3.getYTickSize());
			var yAxis = objDraw.select(".y.axis");
			yAxis.call(objD3.y0Axis);

			if(yTitle){
				yAxis.select(".y.title").attr("y", objD3.yTextPos(yAxis));
			}
		}

		if(objD3.yMark){
			objDraw.select(".y.mark").call(objD3.yMark);
		}

	}

	return {
		obj:objDraw.node().parentNode,
		update: setData,
		resize: redrawChart,
		objD3: objD3Flag ? objD3:null
	};

};

NaruSecD3Js.prototype.createBalloon = function (objOver, optBalloon, type){
	var objD3 = this;
	//tooltip
	var divToolTip = objD3.createToolTip();

	var fmtText = optBalloon.value;
	var timeFormat = optBalloon.timeFormat;
	var regexp = /[\[]{2}([^\]])+[\]]{2}/g;

	//var svgMarginLeft = objD3.svgMargin.left;
	var svgMarginRight = objD3.svgMargin.right;
	//var svgMarginTop = objD3.svgMargin.top;
	var svgMarginBottom = objD3.svgMargin.bottom;

	objOver.on("mousemove.one", function() {//툴팁 좌표이동
		var clientPos = d3.select("#"+objD3.chartId).select("svg").node().getBoundingClientRect();

		var toolTipWidth = parseInt(divToolTip.style("width"), 10);
		var limitWidth = clientPos.width - svgMarginRight;//clientPos.right - svgMarginRight;

		var toolTipHeight = parseInt(divToolTip.style("height"), 10);
		var limitHeight = clientPos.height - svgMarginBottom;

		var posX = d3.event.clientX - clientPos.left + 10;
		var posY = d3.event.clientY - clientPos.top + 10;

		if(posX + toolTipWidth > limitWidth){
			posX =	posX - toolTipWidth - 20;
		}

		if(posY + toolTipHeight > limitHeight){
			posY =	posY - toolTipHeight;
		}

		if(posX + toolTipWidth > limitWidth){
			posX = limitWidth - toolTipWidth - 10;//posX - ((posX + toolTipWidth) - limitWidth) - 20;
		}

		divToolTip.style("left", posX + "px")
			.style("top", posY + "px");
	});

	if(type == "rect" || type == "pie"){
		objOver.on("mouseout.one", function(){
			divToolTip.transition()
				.duration(100)
				.style("opacity", 0);

			var obj = d3.select(this);
			obj.style('fill', null);
		})
			.on("mouseover.one", function(d, i){
				var toolTipMessage = fmtText.replace(regexp, function(match, p1){//match, p1, p2, p3, offset, string
					var dataMap = d.data === undefined ? d:d.data;
					if(objD3.getX0Value() === p1 && timeFormat){
						return NaruSecD3Js.getTimeString(timeFormat, dataMap[p1]);
					}

					return dataMap[p1] ? dataMap[p1]:"";
				});

				objD3.showToolTip(divToolTip, toolTipMessage);

				var color = d.color;
				if(!color){
					color = d3.select(this).attr("fill");
					var gradientUrl = "url(#gradient_"+objD3.chartId+"_";

					color = color.replace(gradientUrl, "").replace(')', "");
					if(color) color = "#"+color;
				}
				divToolTip.style("border", "2px solid "+ d3.rgb(color ? color:NaruSecD3Js.getColor(i)).darker(0.5));

				var obj = d3.select(this);
				obj.style("fill", d3.rgb(color == undefined ? NaruSecD3Js.getColor(i):color).brighter(0.3));
			});
	}else if(type == "circle"){
		objOver.on("mouseout.one", function(){
			divToolTip.transition()
				.duration(100)
				.style("opacity", 0);

			var obj = d3.select(this);
			if(objD3.rScale){
				obj.transition().duration(500)
					.attr("r", function(d){
						return objD3.rScale(d[objD3.getX0Value()]);
					});
			}else{
				obj.transition().duration(500).attr("r", 2)
			}
		})
			.on("mouseover.one", function(d){
				var toolTipMessage = fmtText.replace(regexp, function(match, p1){//match, p1, p2, p3, offset, string
					var dataMap = d.data === undefined ? d:d.data;
					if(objD3.getX0Value() === p1 && timeFormat){
						return NaruSecD3Js.getTimeString(timeFormat, dataMap[p1]);
					}

					return dataMap[p1] ? dataMap[p1]:"";
				});

				objD3.showToolTip(divToolTip, toolTipMessage);

				var color = d3.color(d3.select(this).style("stroke"));
				if(!color){
					color = d3.select(this).attr("fill");
					var gradientUrl = "url(#gradient_"+objD3.chartId+"_";

					color = color.replace(gradientUrl, "").replace(')', "");
					if(color) color = "#"+color;
				}
				divToolTip.style("border", "2px solid "+ d3.rgb(color).darker(0.5));

				var obj = d3.select(this);
				if(objD3.rScale){
					obj.transition().duration(100)
						.attr("r", function(d){
							return objD3.rScale(d[objD3.getX0Value()]) + 1;
						});
				}else{
					obj.transition().duration(100).attr("r", 3)
				}
			});
	}else if(type == "force"){
		objOver.on("mouseout.one", function(){
			divToolTip.transition()
				.duration(100)
				.style("opacity", 0);

			var obj = d3.select(this);
			obj.transition().duration(500).attr("r", 2);
		})
			.on("mouseover.one", function(d, i){
				var toolTipMessage = fmtText.replace(regexp, function(match, p1){//match, p1, p2, p3, offset, string
					var dataMap = d.data === undefined ? d:d.data;

					if(objD3.getX0Value() === p1 && timeFormat){
						return NaruSecD3Js.getTimeString(timeFormat, dataMap[p1]);
					}

					return dataMap[p1] ? dataMap[p1]:"";
				});

				objD3.showToolTip(divToolTip, toolTipMessage);
				divToolTip.style("border", "2px solid "+ d3.rgb(NaruSecD3Js.getColor(i)).darker(0.5));

				var obj = d3.select(this);
				obj.transition().duration(100).attr("r", 3);
			});
	}else if(type == "treemap"){
		objOver.on("mouseout.one", function(){
			divToolTip.transition()
				.duration(100)
				.style("opacity", 0);

			var obj = d3.select(this);
			obj.transition().duration(500).attr("r", 2);
		})
			.on("mouseover.one", function(d, i){
				var toolTipMessage = fmtText.replace(regexp, function(match, p1){//match, p1, p2, p3, offset, string
					var dataMap = d.data === undefined ? d:d.data;

					if(objD3.getX0Value() === p1 && timeFormat){
						return NaruSecD3Js.getTimeString(timeFormat, dataMap[p1]);
					}
					return dataMap[p1] ? dataMap[p1]:"";
				});
				objD3.showToolTip(divToolTip, toolTipMessage);


				var color = d.color;
				if(!color){
					color = d3.select(this).attr("fill");
					var gradientUrl = "url(#gradient_"+objD3.chartId+"_";

					color = color.replace(gradientUrl, "").replace(')', "");
					if(color) color = "#"+color;
				}
				divToolTip.style("border", "2px solid "+ d3.rgb(color ? color:NaruSecD3Js.getColor(i)).darker(0.5));
			});
	}


};

NaruSecD3Js.prototype.createBarRect = function(objDraw, radius){
	var objD3 = this;
	//bar
	var barLayer = objDraw.select(".bar-layer");

	if(barLayer.size() == 0){
		barLayer = objDraw.append("g").attr("class", "bar-layer");
	}

	var objBars = barLayer.selectAll(".bar")
		.data(objD3.data);

	objBars.exit().remove();

	objBars.enter()
		.append("rect")
		.merge(objBars)
		.attr("class", "bar");

	objBars = barLayer.selectAll(".bar");

	radius = parseInt(radius);
	if(!isNaN(radius)){
		objBars.attr("rx", radius)
			.attr("ry", radius);
	}

	objBars.attr("fill", function(d, i) {
		var color = d.color;
		//var parentNode = d3.select(this).node().parentNode;
		return "url(#"+objD3.getGradientColor(color ? color:i)+")";
	});

	return (function (animation){
			var barWidth = objD3.getX0Scale().bandwidth() * 3 / 4;
			var outer = (objD3.getX0Scale().bandwidth() - barWidth) / 2;

			objBars.attr("x", function(d){
				return objD3.getX0Scale(d[objD3.getX0Value()]) + outer;
			}).attr("width", barWidth);

			if(animation && Object.keys(animation).length > 0){
				//transition
				objBars.attr("y", objD3.getSvgHeight())
					.attr("height", 0)
					.transition().duration(isNaN(parseInt(animation.duration)) ? 1000:parseInt(animation.duration))
					.attr("y", function(d){
						return objD3.getY0Scale(d[objD3.getY0Value()]);
					})
					.attr("height", function(d){
						return objD3.getSvgHeight() - objD3.getY0Scale(d[objD3.getY0Value()]);
					});
			}else{
				objBars.attr("y", function(d){
					return objD3.getY0Scale(d[objD3.getY0Value()]);
				})
					.attr("height", function(d){
						return objD3.getSvgHeight() - objD3.getY0Scale(d[objD3.getY0Value()]);
					});
			}
			return objBars;
		}
	);
};


NaruSecD3Js.prototype.createLegendBottom = function(){
	var objD3 = this;
	var objDraw = this.getSvgLayer();

	var legendMaxRow = 3;
	var legendMaxHeight = legendMaxRow * 20;

	var legendPosX = 0;
	var legendPosY = objD3.getSvgHeight() - legendMaxHeight;
	var legendLayer = objDraw.append("g")
		.attr("class", "legend-layer")
		.attr("transform", "translate("+legendPosX+", "+ legendPosY+")");

	var lableMaxLength = d3.max(objD3.data, function(){
		return d[objD3.getX0Value()].length; //get
	});

	var legendWidth = 8 * lableMaxLength;

	function setData(legendData){
		if(!legendData && legendData.length == 0) return;

		var svgWidth = objD3.getSvgWidth();
		var legendCount = Math.floor(svgWidth / legendWidth);
		//console.log("svgWidth:" + svgWidth+" legendCount: " + legendCount)

		var legendStPos = (svgWidth - (legendCount * legendWidth))/2;

		var legend = legendLayer.selectAll("legend")
			.data(legendData);

		legend.exit().remove();

		legend
			.enter().append("g")
			.merge(legend)
			.attr("class", "legend")
			.attr("style", function(d, i){
				var y = Math.floor(i/legendCount) * 20;

				if(y > legendMaxHeight){
					return "display:none";
				}else{
					return"display:block";
				}
			})
			.attr("transform", function(d, i) {
				var x = (i%legendCount)* legendWidth + legendStPos;
				var y = Math.floor(i/legendCount) * 20;
				//.attr("transform", function(d, i) { return "translate("+0+","+(i * 20) +")"; }); --> 수직
				return "translate("+x+","+y+")";
			})
			.append("rect")
			//		.filter(function(d, i){
			//			if(Math.floor(i/legendCount) < maxRow){
			//				return d;
			//			}
			////			if(수직 ){
			////				var yPosition = i * 20;
			////				if(yPosition <= legendHeight) return d;
			////			}
			//			//수평
			//			//if(yPosition <= legendHeight) return d;
			//
			//		})
			.attr("x", 0)
			.attr("width", 18)
			.attr("height", 18)
			.attr("fill", function(d, i){
				return NaruSecD3Js.getColor(i);
			});


		legend
			.select("text")
			.text(function(d) {
				return d[objD3.getX0Value()];
			});


		return legendLayer.selectAll(".legend");
	}

	var legendTemp = setData(objD3.legend.data);
	legendTemp
		.append("text")
		.attr("x", 23)
		.attr("y", 14)
		.style("text-anchor", "start")
		.attr("fill", function(d, i) { return d3.rgb(NaruSecD3Js.getColor(i)); })
//		.filter(function(d, i){
//			//console.log("filter....: " + maxRow)
//			if(Math.floor(i/legendCount) < maxRow){
//				return d;
//			}
////			var yPosition = i * 20;
////			if(yPosition <= legendHeight) return d;
//		})
		.text(function(d) {
			return d[objD3.getX0Value()];
		});

	return {
		"resize": function(){
			var svgWidth = objD3.getSvgWidth();

			var legendCount = Math.floor(svgWidth / legendWidth);
			var legendStPos = (svgWidth - (legendCount * legendWidth))/2;

			legendTemp.attr("transform", function(d, i) {
				var x = (i%legendCount) * legendWidth + legendStPos;
				var y = Math.floor(i/legendCount) * 20;
				return "translate("+x+","+y+")";
			})
				.attr("style", function(d, i){
					var y = Math.floor(i/legendCount) * 20;
					if(y > legendMaxHeight){
						return "display:none";
					}else{
						return"display:block";
					}
				});
		},

		"update": function(data){

		}
	};
};


NaruSecD3Js.createPieGraph = function(opt, data){
	if(!opt.id){
		console.log("not select chartId:", opt.id);
		return;
	}
	var chartId = opt.id;
	var objD3 = new NaruSecD3Js();

	objD3.chartId = chartId;
	objD3.data = data;

	objD3.setX0Value(opt.x.value);
	objD3.setY0Value(opt.y.value);

	var objDraw = objD3.createSvg();

	var objLegend = null;
	if(opt.legend){
		objLegend = NaruSecD3Js.createLegend(opt.legend, opt.legend.data, objD3);
	}

	var total = d3.sum(data, function(d) {
		return d[objD3.getY0Value()];
	});

	var percentageFormat = d3.format(".0%");
	data.forEach(function(d) {
		d.percentage = percentageFormat(d[objD3.getY0Value()] / total);
	});




	var drawFn = objD3.createPie(objDraw);
	var objPies = drawFn();

	if(opt.balloon){
		objD3.createBalloon(objPies, opt.balloon, "pie");
	}

	//redraw
	objD3.addWindowResizeEvent(redrawChart);
	function redrawChart(){
		var objChart = d3.select("#" + chartId);
		if(objChart.size() == 0){
			objD3.removeWindowResizeEvent();
			return;
		}

		var clientRect = objChart.node().getBoundingClientRect();
		var width = clientRect.width;
		var height = clientRect.height;

		if(width > 0 && height > 0){
			objD3.resize();

			drawFn(opt.animation);

			if(objLegend && objLegend.hasOwnProperty("resize")){
				objLegend.resize();
			}
		}

	}

	return {
		resize: redrawChart
	};

};

NaruSecD3Js.prototype.createPie = function(objDraw){
	var objD3 = this;
	//pie
	var pieLayer = objDraw.select(".pie-layer");
	if(pieLayer.size() == 0){
		pieLayer = objDraw.append("g").attr("class", "pie-layer")
	}

	var pie = d3.pie()
		.sort(null)
		.value(function(d) {
			return d[objD3.getY0Value()];
		});


	var objArc = pieLayer.selectAll(".arc")
		.data(pie(objD3.data)) //TODO setData
		.enter()
		.append("g")
		.attr("class", "arc");

	objArc.append("path")
		.attr("class", "pie")
		.attr("fill", function(d, i) {
			//var parentNode = d3.select(this).node().parentNode;
			return "url(#"+objD3.getGradientColor(i)+")";
		});

	objArc.append("text")
		.attr("class", "pie-text")
		.attr("dy", ".35em")
		.style("text-anchor", "middle")
		.attr("fill", function(d, i) { return d3.rgb(NaruSecD3Js.getColor(i)).brighter(2); });

	return (function(){//animation
		var width = objD3.getSvgWidth();
		var height = objD3.getSvgHeight();

		//TODO
		var legendHeight = 60;
		pieLayer.attr("transform", "translate(" + width / 2 + "," + (height - legendHeight) / 2 + ")");

		var radius = Math.min(width, height) / 3;

		var arc = d3.arc()
			.outerRadius(radius - 10)
			.innerRadius(0);

		function tweenPie(finish) {//finish, a, b
			var start = {
				startAngle: 0,
				endAngle: 0
			};
			var i = d3.interpolate(start, finish);
			return function(d) {
				return arc(i(d));
			}
		}

		var check = 0;
		objArc.selectAll('.pie')
			.attr("d", arc)
			.transition()
			.on("start",function(){
				check++;
			})
			.duration(1000)
			.on("end", function(){
				check--;
				if(check == 0){
					objArc.selectAll(".pie-text")
						.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
						.filter(function(d){ //TODO	hide label opt
							var hideLabelPercent = 5;
							var value = Number(d.data["percentage"].replace("%",	""));
							if(value >= hideLabelPercent) return value;
						})
						.text(function(d) {
							return d.data["percentage"];
						});
				}
			})
			.attrTween('d', tweenPie);

		return objArc.selectAll('.pie');
	});


};


NaruSecD3Js.createForceGraph = function(opt, nodesData, linksData){
	if(!opt.id){
		console.log("not select chartId:", opt.id);
		return;
	}
	var chartId = opt.id;
	var objD3 = new NaruSecD3Js();
	objD3.chartId = chartId;
	objD3.data = {
		"nodesData": nodesData,
		"linksData": linksData
	};


	var nodeOpt = opt.node;
	//var l = opt.node.id;




	var objDraw = objD3.createSvg();

	var drawFn = objD3.createForce(objDraw, nodeOpt);
	var objForce = drawFn();

	if(opt.balloon){
		objD3.createBalloon(objForce, opt.balloon, "force");
	}

	//redraw
	objD3.addWindowResizeEvent(redrawChart);
	function redrawChart(){
		var objChart = d3.select("#" + chartId);
		if(objChart.size() == 0){
			objD3.removeWindowResizeEvent();
			return;
		}

		var clientRect = objChart.node().getBoundingClientRect();
		var clientWidth = clientRect.width;
		var clientHeight = clientRect.height;

		if(clientWidth > 0 && clientHeight > 0){
			objD3.resize();
			drawFn(opt.animation);
		}
	}

	return {
		resize: redrawChart
	};

};

NaruSecD3Js.prototype.createForce = function(objDraw, nodeOpt){
	var objD3 = this;
	var nodesData = objD3.data.nodesData;
	var linksData = objD3.data.linksData;
	var sizeMax = d3.max(nodesData, function(d){
		return d[nodeOpt.size];
	});
	var sizeMin = d3.min(nodesData, function(d){
		return d[nodeOpt.size];
	});

	sizeMin = sizeMin ? sizeMin:10;
	sizeMax = sizeMax ? sizeMax:50;

	var radius = d3.scaleSqrt().domain([sizeMin, sizeMax]).range([20, 100]);

	var simulation = d3.forceSimulation()
		.force("link", d3.forceLink().id(function(d) {
			return d[nodeOpt.id];
		}).distance(function(d){
			var radiusTemp = radius(d.target[nodeOpt.size]);
			var distance = radiusTemp*2+ 20;
			return distance ? distance:20;
		}))
		.force("charge", d3.forceManyBody());

	var link = objDraw.append("svg:g")
		.attr("class", "links")
		.selectAll("line")
		.data(linksData)
		.enter()
		.append("line")
		.attr("stroke", "black");

	var node = objDraw.append("svg:g")
		.selectAll(".node")
		.data(nodesData)
		.enter()
		.append("g")
		.attr("class", "node")
		.on("mouseover", function(d){
			var size = d[nodeOpt.size] ? d[nodeOpt.size]:10;
			d3.select(this).select("circle")
				.transition()
				.duration(750)
				.attr("r", size+ parseInt(size/2, 10));
		})
		.on("mouseout", function(d){
			var size = d[nodeOpt.size] ? d[nodeOpt.size]:10;
			d3.select(this).select("circle")
				.transition()
				.duration(750)
				.attr("r", size);
		})
		.call(d3.drag()
			.on("start", dragstarted)
			.on("drag", dragged)
			.on("end", dragended));

	node.append("circle")
		.attr("r", function(d){
			return d[nodeOpt.size] ? d[nodeOpt.size]:10;
		})
		.attr("fill", function(d) {
			//var parentNode = d3.select(this).node().parentNode;
			return "url(#"+objD3.getGradientColor(d[nodeOpt.color])+")";
		});

	//node text
	node.append("text")
		.attr("dx", function(d) {return d.dx;})
		.attr("dy", ".35em")
		.attr("class", "circle-text")
		.text(function(d) {
			return d[nodeOpt.value];
		})
		.style("stroke", function(d) { return d3.rgb(NaruSecD3Js.getColor(d[nodeOpt.color])); });

	var ticked = function() {
		link
			.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

		node
			.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });
	};


	simulation
		.nodes(nodesData)
		.on("tick", ticked);

	simulation.force("link")
		.links(linksData);

	function dragstarted(d) {
		if (!d3.event.active) simulation.alphaTarget(0.3).restart();
		d.fx = d.x;
		d.fy = d.y;
	}

	function dragged(d) {
		d.fx = d3.event.x;
		d.fy = d3.event.y;
	}

	function dragended(d) {
		if (!d3.event.active) simulation.alphaTarget(0);
		d.fx = null;
		d.fy = null;
	}

	return function(){
		var width = objD3.getSvgWidth();
		var height = objD3.getSvgHeight();

		simulation
			.force("center", d3.forceCenter(width / 2, height / 2)).alphaTarget(0.3).restart();

		return objDraw.selectAll(".node").selectAll("circle");
	};

};

NaruSecD3Js.createTreemap = function(opt, data){
	if(!opt.id){
		console.log("not select chartId:", opt.id);
		return;
	}
	var chartId = opt.id;
	var objD3 = new NaruSecD3Js();
	objD3.chartId = chartId;
	objD3.data = data;

	//if(opt.legend) objD3.setLegendWidth(100);//Todo title 글자 수
	objD3.setX0Value(opt.node.name);
	objD3.setY0Value(opt.node.value);


	var objLegend = null;
	if(opt.legend){
		objLegend = NaruSecD3Js.createLegend(opt.legend, opt.legend.data, objD3);
	}






	var dataNest = d3.nest()
		.key(function(d){
			return d[objD3.getX0Value()];//== null ? "null":d[objD3.getX0Value()];
		});



	var dataTemp = dataNest.entries(objD3.data);
	var nodeOpt = !opt.node ? {"colorField":null, "sort":null}:opt.node;
	var nodeColorField = nodeOpt.colorField;
	var sort = nodeOpt.sort;

		var root = d3.hierarchy({"values":dataTemp}, function(d) {
			return d.values;
		})
		.sum(function(d){
			return d[objD3.getY0Value()];
		})
		.sort(function(a, b) {
			//console.log(a.value, b.value)
			//return a.value - b.value;
			return sort && sort == "desc" ? (b.value - a.value):(a.value - b.value);
		});

	var treemap = d3.treemap()
		.tile(d3.treemapResquarify)
		.round(true)
		.paddingInner(1);

	var objDraw = objD3.createSvg();

	var createTreemap = function(){
		var treeLayer = objDraw.select(".tree-layer");

		if(treeLayer.size() == 0){
			treeLayer = objDraw.append("g").attr("class", "tree-layer");
		}

		var objTrees = treeLayer.selectAll(".tree")
			.data(treemap(root).leaves());

//		console.log("descendants");
//		var desc = treemap(root).descendants();
//		console.log(desc.length, desc);
//		var leaves = treemap(root).leaves();
//		console.log("leaves");
//		console.log(leaves.length, leaves);

		objTrees.exit().remove();
		objTrees.enter()
			.append("g")
			.merge(objTrees)
			.attr("class", "tree");
		//.on("click", function(d) { return zoom(node == d.parent ? root : d.parent); });

		objTrees = treeLayer.selectAll(".tree");

		objTrees.append("rect")
			.attr("id", function(d, i) {
//				console.log(d.data.trust, d)
				return "tree-rect-" + i;
			})
			.attr("fill", function(d, i) {
//				var obj = d3.select(this);
//				var parentNode = obj.node().parentNode;
//				var gradientColor = "url(#"+objD3.getGradientColor(parentNode, i)+")";
//				return NaruSecD3Js.getColor(i);

				var color = d.data[nodeColorField];
//				console.log(nodeColorField, color, objD3.getGradientColor(color ? color:i));

				return "url(#"+objD3.getGradientColor(color ? color:i)+")";
				//return d.data[objD3.getX0Value()] == "neutral" ? "red":"transparent";
			});

		objTrees.append("clipPath")
			.attr("id", function(d, i) {
				return "clip-" + "tree-"+i;
			})
			.append("use")
			.attr("xlink:href", function(d,i) {
				return "#tree-rect-" + i;
			});

		objTrees
			.append("text")
			.attr("clip-path", function(d, i) {
				return "url(#clip-tree-" +i+ ")";
			})
			.append("tspan")
			.text(function(d) {
				//console.log(objD3.getX0Value(), d.data)
				return d.data[objD3.getX0Value()];
			})
			.attr("x", 4)
			.attr("y", 10);

		return function(){
			//console.log("----------", objTrees.size(), objD3.getSvgWidth(), objD3.getSvgHeight());
			treemap.size([objD3.getSvgWidth(), objD3.getSvgHeight()]);
//
			treemap(root);

			objTrees
				.transition()
				.duration(500)
				.attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
				.select("rect")
				.attr("width", function(d) {
					return d.x1 - d.x0;
				})
				.attr("height", function(d) {
					return d.y1 - d.y0;
				});


			return objTrees.select("rect");
		};
	};

	var drawFn = createTreemap();
	var objTreesTemp = drawFn();

	if(opt.balloon){
		console.log(objD3);
		objD3.createBalloon(objTreesTemp, opt.balloon, "treemap");
	}

	//redraw
	objD3.addWindowResizeEvent(redrawChart);
	function redrawChart(){
		var objChart = d3.select("#" + chartId);
		if(objChart.size() == 0){
			objD3.removeWindowResizeEvent();
			return;
		}

		var clientRect = objChart.node().getBoundingClientRect();
		var clientWidth = clientRect.width;
		var clientHeight = clientRect.height;

		if(clientWidth > 0 && clientHeight > 0){
			objD3.resize();
			drawFn();

			if(objLegend && objLegend.hasOwnProperty("resize")){
				objLegend.resize();
			}
		}

	}

	return {
		resize: redrawChart
	};
};

NaruSecD3Js.createScatterPlotGraph = function(opt, data){
	if(!opt.id){
		console.log("not select chartId:", opt.id);
		return;
	}
	var chartId = opt.id;
	var objD3 = new NaruSecD3Js();

	//if(opt.legend) objD3.setLegendWidth(100);//Todo title 글자 수

	objD3.chartId = chartId;
	objD3.data = data;

	var xOpt = !opt.x  ? {"value":"value", "title":"", "guideLine":null}:opt.x;
	var yOpt = !opt.y  ? {"value":"value", "title":""}:opt.y;
	objD3.setX0Value(xOpt.value);
	objD3.setY0Value(xOpt.value);

	var objLegend = null;
	if(opt.legend){
		objLegend = NaruSecD3Js.createLegend(opt.legend, opt.legend.data, objD3);
	}

	objD3.setX0Scale("linear");
	objD3.setY0Scale("linear");

	objD3.setX0OutputType("range");
	objD3.setY0OutputType("range");



	var dataCount = d3.max(data, function(d){
		return d[objD3.getY0Value()];
	});

	var yMaxDomain = dataCount + (10 - (dataCount % 10));
	// x축 svgWidth 설정
	var yTitle = yOpt.title;
	objD3.setAxisWidth(yMaxDomain, yTitle);

	var objDraw = objD3.createSvg();

	objD3.setX0OutputRange();
	objD3.setY0OutputRange();

	//domain x,y
	objD3.setX0DomainExtent(objD3.data);
	objD3.setY0Domain(0, yMaxDomain);

	objD3.createX0Axis2(xOpt); //TODO
	objD3.createY0Axis2(); //TODO

	objD3.drawX0Axis(objDraw, "x axis");
	if(opt.y.titleInner){
		objD3.drawY0Axis2(objDraw, "y axis", true, yTitle);
	}else{
		objD3.drawY0Axis3(objDraw, "y axis", true, yTitle);
	}

	//TODO
	var minRCircle = 5;
	var maxRCircle = 20;
	objD3.rScale = objD3.circleX0ScaleOutputRange(minRCircle, maxRCircle);

	var createScatter = function (){
		var scatterLayer = objDraw.select(".scatter-layer");

		if(scatterLayer.size() == 0){
			scatterLayer = objDraw.append("g").attr("class", "scatter-layer");
		}

		var objCircles = scatterLayer.selectAll(".scatter-circle")
			.data(objD3.data);

		objCircles.exit().remove();

		objCircles.enter()
			.append("circle")
			.merge(objCircles)
			.attr("class", "scatter-circle");

		objCircles = scatterLayer.selectAll(".scatter-circle");

		objCircles.attr("fill", function(d, i) {
			var color = d.color;
			//var parentNode = d3.select(this).node().parentNode;
			return "url(#"+objD3.getGradientColor(color ? color:i)+")";
		});


		//var maxValue = d3.max(objD3.data, function(d){
		//	return d[objD3.getY0Value()];
		//});
		//console.log(maxValue, objD3.getY0Scale().range(), objD3.getY0Scale(maxValue));
//		objDraw.append("rect")
//			.attr("class", "guide-line")
//			.attr("fill", "red")
//			.attr("x", objD3.getX0Scale(0))
//			.attr("y", objD3.getY0Scale(0))
//			.attr("width", 1)
//			.attr("height", objD3.getY0Scale(maxValue));
//

		var guideOpt = xOpt.guideLine;
		var guideLine = null;
		if(guideOpt){
			var guideBorder = guideOpt.color ? guideOpt.color:"#FF0000";
			guideLine = objDraw.append("line")
				.attr("class", "guide-line")
				.attr("stroke-width", 1)
				.attr("stroke-dasharray", 2)
				.attr("stroke", guideBorder);
		}


		return function(){
			objCircles.attr('r', 0)
				.transition()
				.duration(2000)
				.attr("r", function(d){
					return objD3.rScale(d[objD3.getX0Value()]);
				})
				.attr("cx", function(d) {
					return objD3.getX0Scale(d[objD3.getX0Value()]);// + (objD3.getX0Scale().bandwidth() / 2);
				})
				.attr("cy", function(d) {
					return objD3.getY0Scale(d[objD3.getY0Value()]);
				});

			if(guideLine != null){
				var guideX = guideOpt.value; //isNaN(parseInt(guideOpt.value)) ? 1:parseInt(guideOpt.value);
				if(guideX != undefined && guideX != null){
					guideLine.attr("x1", objD3.getX0Scale(guideX))
						.attr("y1", objD3.getY0Scale(0))
						.attr("x2", objD3.getX0Scale(guideX))
						.attr("y2", objD3.getY0Scale()[0]);

					objDraw.select(".x.axis").selectAll(".tick")
						.filter(function (d) { return d === 0;})
						.select("line")
						.attr("opacity", 0);

				}

			}


			return objCircles;
		};

	};

	var drawFn = createScatter();
	var objCircles = drawFn();

	if(opt.balloon){
		objD3.createBalloon(objCircles, opt.balloon, "circle");
	}


	//redraw
	objD3.addWindowResizeEvent(redrawChart);
	function redrawChart(){
		var objChart = d3.select("#" + chartId);
		if(objChart.size() == 0){
			objD3.removeWindowResizeEvent();
			return;
		}

		var clientRect = objChart.node().getBoundingClientRect();
		var width = clientRect.width;
		var height = clientRect.height;

		if(width > 0 && height > 0){
			objD3.resize();
			drawFn();

			if(objLegend && objLegend.hasOwnProperty("resize")){
				objLegend.resize();
			}
		}

	}

	return {
		obj:objDraw.node().parentNode,
		//update: setData,
		resize: redrawChart
		//objD3: objD3Flag ? objD3:null
	};

};




//TODO style class
//TODO x0,x1, y0, y1배열
//TODO setData //legend, balloon 안에서
//enter()전 remove after enter --> merge