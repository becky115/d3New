/**
 * Created by eunjilee on 2017. 6. 13..
 */
/**
 * Created by ejlee
 */

/**
 * D3.js (4.x.x)
 */
//TODO debugMode
var NaruSecD3 = function (){
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

	this.yMark = null; //보류.

	this.x0DateFormat = null; //format했던 값 (origin값아님)

	this.x0Value = null;//TODO NEW
	this.y0Value = null;//TODO NEW
	this.y1Value = null;//TODO NEW

	this.data = null;//TODO NEW
	this.graph = null; //

	/*	graph:[{
	 "type": "bar"
	 "color": NaruSecD3.getColor(1),
	 "balloonText":"[[date]]:[[value]]개" --> TODO 따로지정도 가능하게
	 }]*/;

	this.init();
};

NaruSecD3.NaruLegend = function(obj){
	this.events = {"clickItem":[]};

	this.objLegend = obj;

	this._init();

	return this;
};

NaruSecD3.NaruLegend.prototype = {
	_init: function(){
		this._initStyle();
	},

	_initStyle: function(){
		var obj = this.objLegend;
		obj.select("rect").style("cursor", "pointer");

		obj.on("mouseover.one", function(d){
			d3.select(this).attr("fill", d3.rgb(d.color).brighter(0.3));
		})
			.on("mouseout.one", function(d){
				d3.select(this).attr("fill", d.color);
			});
	},

	addListener: function (a, b){//a:eventName, b: handler
		switch(a){
			case "clickItem": {
				this.events.clickItem.push(b);
				this._addClickEvent();
			}
		}

	},

	_addClickEvent: function(){
		var objThis = this;
		this.objLegend.on("click", function(d){
			var obj = d3.select(this);
			if(obj.attr("opacity") === null || obj.attr("opacity") == 1){
				obj.attr("opacity", 0.4);
				d.visible = false;
			}else{
				obj.attr("opacity", 1);
				d.visible = true;
			}

			//TODO 그래프 존재시 opacity
			objThis.clickItem(d, this, objThis);
		});
	},

	/**
	 * a:data
	 * b:rect obj
	 * c:legend obj
	 */
	clickItem: function(a,b,c){
		var clickEvent = c.events.clickItem;

		if(clickEvent.length > 0){
			clickEvent.splice(0, clickEvent.length -1); //마지막 이벤트 적용

			var event = clickEvent[0];

			event.call(b, {
				"dataItem": a
			});
		}
	},

	update: function(obj){
		this.objLegend = obj;
		this._initStyle();

		var event = Object.keys(this.events);
		for(var i=0; i<event.length; i++){
			var eventName = event[i];
			var eventList = this.events[eventName];

			if(eventList.length > 0){
				if(eventName === "clickItem"){
					this._addClickEvent();
				}
			}

		}
	}
};


NaruSecD3.prototype = function () {
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

			this.x0DateFormat = null;

			this.x0Value = null;//TODO NEW
			this.y0Value = null;//TODO NEW
			this.y1Value = null;//TODO NEW

			this.data = null;//TODO NEW

			this.graph = [];
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

		setY1Value: function (value) {
			this.y1Value = value;
		},

		getY1Value: function () {
			return this.y1Value;
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
			if (margin !== null && margin !== undefined) {
				this.svgMargin.top = (margin.top === null || margin.top === undefined || isNaN(margin.top)) ? 0 : margin.top;
				this.svgMargin.right = (margin.right === null || margin.right === undefined || isNaN(margin.right)) ? 0 : margin.right;
				this.svgMargin.bottom = (margin.bottom === null || margin.bottom === undefined || isNaN(margin.bottom)) ? 0 : margin.bottom;
				this.svgMargin.left = (margin.left === null || margin.left === undefined || isNaN(margin.left)) ? 0 : margin.left;
			}
		},

		setSvgSize: function (width, height) {
			this.svgWidth = width - (this.svgMargin.left + this.svgMargin.right + this.axisX0);
			this.svgHeight = height - (this.svgMargin.top + this.svgMargin.bottom);
			//console.log("svg width", this.svgWidth);
			d3.select("#" + this.chartId).select("svg")
//				.attr("width", "100%")
//				.attr("height", "100%");
				.attr("width", width)
				.attr("height", height);
		},

		createSvg: function () {
			//console.log("createSvg...", this.chartId);
			var chartId = this.chartId;
			this.setSvgMargin();
			var graphLayer = d3.select("#" + chartId);
			var clientRect = graphLayer.node().getBoundingClientRect();

			graphLayer.select("svg").html("");

			//className = className ? className : "";

			var objSvg = graphLayer.append("svg").attr("class", "naru-d3-svg");
			//console.log(chartId, clientRect.width, clientRect.height);
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
			};
		},

		getSvgLayer: function(){
			return null;
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
			if (data === null || data === undefined) {
				return;
			}

			var xValue = this.getX0Value();
			this.x0Scale.domain(
				d3.extent(data, function(d) {
					return d[xValue];
				})
			).nice();

		},

		circleX0ScaleOutputRange: function(min, max){
			//console.log("min", min, max);
			var circleScale = this.getX0Scale().copy();
			circleScale.range([min, max]);
			return circleScale;
		},

		setX0Domain: function (dataMin, dataMax) {
			if (dataMin === null || dataMin === undefined) {
				return;
			}
			if (dataMax === null || dataMax === undefined) {
				return;
			}
			this.x0Scale.domain([dataMin, dataMax]);
		},

		setY0Domain: function (yMinValue, yMaxValue) {
			if (yMinValue === null || yMinValue === undefined || isNaN(yMinValue)) {
				return;
			}
			if (yMaxValue === null || yMaxValue === undefined || isNaN(yMaxValue)) {
				return;
			}
			this.y0Scale.domain([yMinValue, yMaxValue]);
		},

		setY1Domain: function (yMinValue, yMaxValue) {
			if (yMinValue === null || yMinValue === undefined || isNaN(yMinValue)) {
				return;
			}
			if (yMaxValue === null || yMaxValue === undefined || isNaN(yMaxValue)) {
				return;
			}
			this.y1Scale.domain([yMinValue, yMaxValue]);
		},

		//TODO aXIS OPTION
		createX0Axis: function () {
			var formatMillisecond = d3.timeFormat(".%L"),
				formatSecond = d3.timeFormat(":%S"),
				formatMinute = d3.timeFormat("%I:%M"),
				formatHour = d3.timeFormat("%I %p"),
				formatDay = d3.timeFormat("%a %d"),
				formatWeek = d3.timeFormat("%b %d"),
				formatMonth = d3.timeFormat("%B"),
				formatYear = d3.timeFormat("%Y");

			function multiFormat(date) {
				//console.log("multiFormat", date);
				return (d3.timeSecond(date) < date ? formatMillisecond
					: d3.timeMinute(date) < date ? formatSecond
					: d3.timeHour(date) < date ? formatMinute
					: d3.timeDay(date) < date ? formatHour
					: d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
					: d3.timeYear(date) < date ? formatMonth
					: formatYear)(date);
			}

			this.x0Axis = d3.axisBottom(this.x0Scale)
				.tickSize(-this.getXTickSize())
				.tickPadding(10)
				.tickFormat(multiFormat);
		},

		createX0Axis2: function (optX) {
			this.x0Axis = d3.axisBottom(this.x0Scale)
				.tickSize(-this.getXTickSize());

			if(optX.timeFormat){
				var timeFormat = d3.timeFormat(optX.timeFormat);
				this.x0Axis.tickFormat(function (d) {
					return timeFormat(d);
				});
			}
		},


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
					if (this.yMark !== null) this.y0Axis.orient("left");
				}
			}

			if (axisOption.outerTickSize) {
				var optV = parseInt(axisOption.outerTickSize);
				if (!isNaN(optV)) this.y0Axis.outerTickSize(optV);
			}

		},


		createY0Axis: function () {
			this.y0Axis = d3.axisLeft(this.y0Scale)
				.tickPadding(8)
				.tickSize(-1 * this.getYTickSize()) //TODO gridFlag --> gridAlpha?
				.tickFormat(d3.format("d"))
				.tickArguments([5]);

//			this.yMark = d3.axisLeft(this.y0Scale)
//				//.tickArguments([5])
//				.tickSizeOuter(10)
//				.tickFormat("");

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

		},

		drawY0Axis: function (objDraw, className, markFlag, yOpt) {
			if (!objDraw) return;
			if (!className) className = "y axis";

			var title = yOpt.title;
			var titleInner = yOpt.titleInner;

			var yAxisTemp = objDraw.append("g")
				.attr("class", className);

			this.yAxis.push(yAxisTemp);

			if(titleInner){
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
			}else{
				yAxisTemp
					.call(this.y0Axis)
					.append("text")
					.attr("class", "y title")
					.attr("x", -(this.getSvgHeight() / 2))
					.attr("y", this.yTextPos(yAxisTemp))
					.attr("dy", ".31em")
					.attr("transform", "rotate(-90)")
					.style("text-anchor", "middle")
					.style("font-weight", "bold")
					.style("font-size", "12px")
					.attr("fill", "#424242")
					.text(title === undefined ? "" : title);
			}

			if (markFlag) {
//				objDraw.append("g").attr("class", "y mark")
//					.call(this.yMark);
			}
		},

		updateX0Axis: function(){
			if(this.x0Axis){
				var xAxisLayer = this.getSvgLayer().select(".x.axis");
				var tickText = xAxisLayer
					.attr("transform", "translate(0," + this.getSvgHeight() + ")")
					.call(this.x0Axis)
					.selectAll(".tick text")
					.attr("x", 0)
					.attr("y", 5)
					.attr("dy", ".9em")
					.style("text-anchor", "middle")
					.attr("class", function (d) {//time
						if (d.textCss !== undefined && d.textCss) return "tickText";
					});

				if(this.x0DateFormat){
					tickText.call(this.xTicksDateWrap, this)
				}
			}
		},

		updateY0Axis: function(){
			if(this.y0Axis){
				var svgLayer = this.getSvgLayer();
				this.y0Axis.tickSize(-1  * this.getYTickSize());
				var yAxisLayer = svgLayer.select(".y.axis");
				yAxisLayer.call(this.y0Axis);

				var objYTitle = yAxisLayer.select(".y.title");
				if(objYTitle.size() > 0){
					yAxisLayer.append(function(){
						return objYTitle.remove().node();
					});
					//	objYTitle.attr("y", this.yTextPos(yAxisLayer));
				}
			}

			if(this.yMark){
				svgLayer.select(".y.mark").call(objD3.yMark);
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
				.text(title === undefined ? "" : title);
		},

		updateY1Axis: function(){
			if(this.y1Axis){
				var svgLayer = this.getSvgLayer();
				//this.y1Axis.tickSize(-1  * this.getYTickSize());
				var yAxisLayer = svgLayer.select(".y1.axis");
				yAxisLayer.call(this.y1Axis);

				var objYTitle = svgLayer.select(".y1.title");
				if(objYTitle.size() > 0){
					yAxisLayer.append(function(){
						return objYTitle.remove().node();
					});
					//	objYTitle.attr("y", this.yTextPos(yAxisLayer));
				}
			}
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

		setAxisWidth: function (dataCount, yOpt, objLegend) {
			var yTitle = yOpt.title;
			var yTitleInner = yOpt.titleInner;
			var yTextLength = dataCount.toString().length;

			var graphLayer = d3.select("#" + this.chartId);
			var clientRect = graphLayer.node().getBoundingClientRect();

			//y축 svgHeight 설정
			var left = 20; //2글자 기준으로
			if (yTitle && !yTitleInner) left = 30;
			var maxLength = 2;
			if (yTextLength > maxLength) {
				left += Math.ceil(this.svgMargin.left * yTextLength / (maxLength + 1));
				if (left > (clientRect.width / 2)) {
					left = clientRect.width / 4;
				}
			}

			this.axisX0 = left;
			this.resize();
			this.getSvgLayer().attr("transform", "translate(" + (this.svgMargin.left + this.axisX0 ) + "," + this.svgMargin.top + ")");

			if(objLegend && objLegend.hasOwnProperty("resize")){
				objLegend.resize();//axisX0 설정 때문에 resize필수
			}
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

				if(this.x0DateFormat){
					var objThis = this;

					var changeText = "";
					var beforeDate = null;

					var width = this.x0Scale.bandwidth();
					var x0DateFormat = this.x0DateFormat;
					var obj = this;

					objSvg.select(".x.axis").selectAll(".x.axis .tick text").each(function(d){
						var tSpan = d3.select(this);
						beforeDate = obj.checkTickDateText(tSpan, beforeDate, width, x0DateFormat);

					});
				}
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
			return this.getSvgWidth() - this.getLegendWidth() - this.axisX0;
		},

		getXTickSize: function(){
			return this.getSvgHeight() - this.getLegendHeight();
		},

		getYMaxDomain: function(){
			var data = this.data;
			var yValue = this.getY0Value();
			var dataCount = d3.max(data, function(d){
				return d[yValue];
			});

			dataCount = dataCount ? dataCount:0;
			//return dataCount + (10 - (dataCount % 10));

			var result = dataCount;

			if(!isNaN(parseInt(dataCount))){
				if(dataCount > 0 && dataCount < 1){
					result = 1;
				}else{
					var number = dataCount.toFixed(0);
					var length = number.length - 1;
					if(length === 0) length = 1;

					var temp = Math.pow(10, length);
					if(number%temp < (temp /2)){
						temp = temp / 2;
					}

					result = Number(number) + temp - (number%temp);
				}
			}else{
				result = 10;
			}

			if(result == 0) result = 10;

			return result;

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
			if (gradientDirection !== undefined && gradientDirection !== null) {
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

			if (index === undefined || index === null) index = 0;
			else if(!isNaN(parseInt(index, 10))) {
				index = parseInt(index, 10);
			}else{
				var hexRegexp = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
				if(!hexRegexp.test(index)) index = 0;
			}
//
			var color = isNaN(index) ? index:NaruSecD3.getColor(index);
			var color1 = d3.rgb(color).darker(0.3);
			var color2 = d3.rgb(color);
			var color3 = d3.rgb(color).brighter(0.3);
			var color4 = d3.rgb(color).brighter(0.7);
			//var linearGradientLen = d3.select("#" + chartId).selectAll(".linear_gradient").size();

			var gradientId = "gradient_" + chartId + "_" + color.replace("#", "");
			var objChart = d3.select("#" + chartId);

			var linearGradientLayer = objChart.select(".linear-gradient-layer");
			if(linearGradientLayer.size() === 0){
				linearGradientLayer = objChart.select("svg").append("svg:g").attr("class", "linear-gradient-layer");
			}

			if(linearGradientLayer.select("#"+gradientId).size() === 0){
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

		getGraphColor: function(color, index, gradientFlag){
			//this.graph = [];
			var gradientFlag = false;

			var resultColor = "#000";
			if(!gradientFlag){
				//color = color === undefined ? NaruSecD3.getColor(0):color;
				var hexRegexp = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
				if(!hexRegexp.test(color)){
					//TODO graph this.graph[0] this.graph[1] 여러개 있을 경우 index에해당하는
					color = NaruSecD3.getColor(index);
				}
				resultColor = color;
			}else{
				var gradientUrl = "url(#gradient_"+objD3.chartId+"_";
				color = color.replace(gradientUrl, "").replace(')', "");
				if(color) resultColor = "#"+color;
			}

			return d3.rgb(resultColor);
		},

		createToolTip: function (opt) {
			var objChart = d3.select("#"+this.chartId);
			var divToolTip = objChart.select(".naru-d3-tooltip");
			if (divToolTip.size() === 0) {
				divToolTip = objChart.append("div").attr("class", "naru-d3-tooltip");
				divToolTip.append("span").attr("class", "content");
				divToolTip.append("span").attr("class", "arrow-line");
				divToolTip.append("span").attr("class", "arrow-middle");
			}

			var radius = parseInt(opt.radius);
			if(!isNaN(radius)){
				divToolTip.style({
					"border-radius":radius > 10 ? 10+"px":radius+"px"
				});
			}

			return divToolTip;
		},

		showToolTip: function (objToolTip) {
			objToolTip.transition()
				.duration(100)
				.style("opacity", 0.9);
		},

		hideToolTip: function(objToolTip){
			objToolTip.transition()
				.duration(100)
				.style("opacity", 0);
		},

		xTicksDateWrap: function (text, obj) {
			var width = obj.x0Scale.bandwidth();
			var x0DateFormat = obj.x0DateFormat;

			var beforeDate = null;
			text.each(function () {
				var tSpan = d3.select(this);
				beforeDate = obj.checkTickDateText(tSpan, beforeDate, width, x0DateFormat);
			});
		},

		/**
		 * TODO %Y-%m-%d %H:%M:%L
		 */
		checkTickDateText: function(tSpan, beforeDate, width, x0DateFormat){
			var textTemp = tSpan;
			var word = textTemp.text();
			var x = textTemp.attr("x");
			var y = textTemp.attr("y");
			var dy = parseFloat(textTemp.attr("dy"));

			var objTspan = textTemp.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
			var dateTemp = NaruSecD3.getTimeDate(x0DateFormat, word);
			var wordText = word;
			var replaceText = wordText;

			if(checkTickDateLength(x0DateFormat, width)){
				if(beforeDate != null){
					if(beforeDate.getFullYear() < dateTemp.getFullYear()){
						replaceText = NaruSecD3.getTimeString("%Y", dateTemp); //full year
						var parentNode = objTspan.node().parentNode;
						d3.select(parentNode).classed("tickText", true);
					}else if(beforeDate.getMonth() < dateTemp.getMonth()){
						replaceText = NaruSecD3.getTimeString("%b", dateTemp);//short month
						var parentNode = objTspan.node().parentNode;
						d3.select(parentNode).classed("tickText", true);
					}else{
						replaceText = NaruSecD3.getTimeString("%e", dateTemp);
						if(checkTickDateLength("%e", width)){
							replaceText = "";
						}
						d3.select(parentNode).classed("tickText", false);
					}
				}else{//first
					replaceText = NaruSecD3.getTimeString("%b", dateTemp); //default first short month;
					if(checkTickDateLength("%b", width)){
						replaceText = "";
					}else{
						var parentNode = objTspan.node().parentNode;
						d3.select(parentNode).classed("tickText", true);
					}


				}
			}
			objTspan.text(replaceText);
			beforeDate = dateTemp;

			function checkTickDateLength(fmt, width){
				var result = false;
				if(fmt === '%e' && width < 16){//day 1,2,3,4,5
					result = true;
				}else if(fmt === '%b' && width < 17){//short month Jan, Feb
					result = true;
				}else if(fmt === '%Y-%m-%d' && width < 50){//2017-01-01
					result = true;
				}

				return result;
			}

			return beforeDate;
		},

		checkData: function(){
			if(this.data !== undefined && this.data !== null){
				return true;
			}
			return false;
		},

		catchError: function(e){
			console.log("error", this.chartId);
			console.log(e);
		}
	};
}();


d3.selection.prototype.trigger = function(eventName, data) {
	this.on(eventName)(data);
};


NaruSecD3.getTimeFormat = function(fmt){
	if(!fmt) fmt = "%Y-%m-%d";
	return d3.timeFormat(fmt);
};

NaruSecD3.rgbToHex = function(rgb){
	var hex = /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i.exec(rgb);
	return hex ? '#' + (1 << 24 | hex[1] << 16 | hex[2] << 8 | hex[3]).toString(16).substr(1) : rgb;

}

/**
 * fmt: format 형식
 * date: date
 * return: string
 */
NaruSecD3.getTimeString = function(fmt, date){
	if(arguments.length < 2) return null;
	var parseTime = this.getTimeFormat(fmt);

	if(!date) return date;
	return parseTime(date);
};


NaruSecD3.getTimeDayRange = function(stDate, endDate){
	if(arguments.length < 2) return null;
	if(!(stDate instanceof Date)) return null;
	if(!(endDate instanceof Date)) return null;

	return d3.timeDay.range(stDate, endDate);
};

NaruSecD3.getTimeDayOffset = function(date, num){
	if(!(date instanceof Date)) return null;
	if(isNaN(parseInt(num))) num = 0;

	return d3.timeDay.offset(date, num);
};


NaruSecD3.getTimeParse = function(fmt){
	if(!fmt) fmt = "%Y-%m-%d";
	return d3.timeParse(fmt);
};
/**
 * fmt: format 형식
 * date: string
 * return: date
 */
NaruSecD3.getTimeDate = function(fmt, date){
	if(arguments.length < 2) return null;
	var parseTime = this.getTimeParse(fmt);
	if(!date) return date;
	return parseTime(date);
};



NaruSecD3.getColor = function(index) {
	if(index === undefined || index === null || isNaN(index)) index = 0;
	if(typeof(index) == "string") index = parseInt(index, 10);

	var basicColor = this.getCateColor();

	var colorLength = basicColor.length;
	return basicColor[index%colorLength];
};

NaruSecD3.getCateColor = function(){
	return ["#3499E5", "#60BA53", "#F0C609", "#F29037", "#D3361E", "#AF5ADD", "#ADACAC", "#40C9FA", "#A9D50B", "#E5E907", "#D26014", "#BD4579", "#8000FF", "#998979", "#013ADF", "#088A4B", "#FEB305", "#B77C24", "#C94949" , "#B4045F", "#6E6E6E"];//파초노주빨보은;
};


/**
 *	1.bar 2.line순서로해야 정상동작 --> TODO 순서없이
 */
NaruSecD3.createGraph = function(opt, data){
	if(!opt.id){
		console.log("not select chartId:", opt.id);
		return;
	}
	var chartId = opt.id;
	var yOptTemp = opt.y;
	var objD3 = null;

	var updateFn = [];
	var resizeFn = [];

	var optLegend = opt.legend;

	var yOpt = [];
	if(yOpt && !Array.isArray(yOptTemp)){
		yOpt.push(yOptTemp);
	}else{
		yOpt = yOptTemp;
		//	dataMap = dataMapTemp;
	}

	var objLegend = null;
	function update(data){
		for(var i=0; i<updateFn.length; i++){
			updateFn[i](data);
		}

		if(objLegend && objLegend.hasOwnProperty("update")){
			for(var i=0; i<yAxisArray.length; i++){
				legendData[i].title = yAxisArray[i].select("text.title").text();
			}
			objLegend.update(legendData);
		}
	}

	function resizeGraph(){
		for(var i=0; i<resizeFn.length; i++){
			resizeFn[i](data);
		}

		if(objLegend && objLegend.hasOwnProperty("resize")){
			objLegend.resize();
		}
	}

	function setYTitle(){
		if(!arguments.length) return;
		if(Object.keys(arguments[0]).length > 0){
			var title = arguments[0].title;
			if(arguments[0].title){
				this.select("text.title").text(title ? title:"");

				if(objLegend && objLegend.hasOwnProperty("update")){
					for(var i=0; i<yAxisArray.length; i++){
						legendData[i].title = yAxisArray[i].select("text.title").text();
					}
				}
			}
		}
	}

	var legendData = [];
	if(yOpt && Array.isArray(yOpt)){
		delete opt.y;

		if(optLegend && optLegend.data) legendData = optLegend.data;
		//first draw legend
//		for(var i=0; i<yOpt.length; i++){// 2개까지만..
//			if(i > 1) break;
//			var yOption = yOpt[i];
//			var type = yOption.type;
//			var title = yOption.title;
//			var color = yOption.color;
//
//			if(optLegend && !optLegend.data) {
//				legendData.push({"title":title, "type":type, "color": color ? color:NaruSecD3.getColor(i)});//TODO value
//			}
//		}

		if(legendData.length > 0){
			//title, type
			opt.legend.data = legendData;
		}

		for(var i=0; i<yOpt.length; i++){// 2개까지만..
			if(i > 1) break;
			var yOption = yOpt[i];

			var type = yOption.type; //TODO graph에서 해결,  y축생성 따로하기
			var title = yOption.title;
			delete yOption.type;
			delete yOption.data;

			if(i > 0) delete opt.legend; //생성 안되게 createBarGraph or createLineGraph;
			opt.y = yOption;

			var result = null;
			if(type == "bar") {
				result = this.createBarGraph(opt, data, true, i);
				objD3 = result.objD3;
				objLegend = result.objLegend;
			}else if(type == "line") {
				if(objD3 !== null) {
					result = this.createLineGraph(opt, data, objD3, null, i); //line만 multi 현재 구현
				}else{
					//TODO
					result = this.createLineGraph(opt, data, null, true, i);
					objD3 = result.objD3;
				}
			}else if(type == "multiLine") {
				result = this.createMultiLineGraph(opt, data);
				objD3 = result.objD3;
			}

			if(result != null){
				updateFn.push(result.update);
				resizeFn.push(result.resize);
			}
		}

		var yAxisArray = objD3.yAxis;
		if(resizeFn.length > 0){
			objD3.addWindowResizeEvent(resizeGraph);
		}

		if(yAxisArray.length > 0){
			for(var i=0; i<yAxisArray.length; i++){
				yAxisArray[i].update = setYTitle;
			}
		}

		return {
			update: update,
			resize: resizeGraph,
			yAxis: yAxisArray
		};
	}

	return {
		update: null,
		resize: null,
		yAxis: null
	};

};


NaruSecD3.createMultiLineGraph = function(opt, data){
	if(!opt.id){
		console.log("not select chartId:", opt.id);
		return;
	}

	var chartId = opt.id;
	var dateFormat = opt.dateFormat;
	var xValue = opt.x.value;
	var yValue = opt.y.value;
	//var yTitle = opt.y.title;


	var objD3 = new NaruSecD3();
	objD3.chartId = chartId;
	objD3.graph = opt.graph;

	var objDraw = objD3.createSvg();

	objD3.setX0Value(xValue);
	objD3.setY0Value("value");

	objD3.setX0Scale("time");
	objD3.setY0Scale("linear");

	objD3.setX0OutputType("range");
	objD3.setY0OutputType("range");

	var objLegend = null;
	if(opt.legend){
		objLegend = NaruSecD3.createLegend(opt.legend, opt.legend.data, objD3);
	}

	objD3.setX0OutputRange();
	objD3.setY0OutputRange();

	objD3.createX0Axis();
	objD3.createY0Axis();

	objD3.drawX0Axis(objDraw, "x axis");
	objD3.drawY0Axis(objDraw, "y axis", true, opt.y);

	function setData(data){
		var dataList = [];
		data.forEach(function(d){
			var x_value = d[xValue];
			delete d[xValue];

			if(yValue.length > 0){
				//delete d[xValue];
				for(var i=0; i<yValue.length; i++){
					if(yValue[i]){
						var temp = {};
						var y_value = d[yValue[i]];

						delete d[yValue[i]];

						temp = JSON.parse(JSON.stringify(d));
						temp.key = yValue[i];
						temp.value = y_value
						//temp.color = NaruSecD3.getColor(i);
						temp.groupId = i;
						temp[xValue] = x_value;

						dataList.push(temp);
					}
				}
			}
		});
		objD3.data = dataList;

		var dataNest = d3.nest()
			.key(function(d) {return d.key;})
			.entries(objD3.data);
		var dataCount = data.length == 0 ? 0:d3.max(dataNest, function(d) {
			return d3.max(d.values, function (d) {
				return d.value;
			});
		});

		var yMaxDomain = dataCount + (10 - (dataCount % 10));
		var xMinDomain = data.length == 0 ? 0:d3.min(dataNest, function(d) {
			return d3.min(d.values, function (d) {
				if(dateFormat){
					return NaruSecD3.getTimeDate(dateFormat, d[xValue]);
				}

				return d[xValue];
			});
		});
		var xMaxDomain = data.length == 0 ? 10:d3.max(dataNest, function(d) {
			return d3.max(d.values, function (d) {
				if(dateFormat){
					return NaruSecD3.getTimeDate(dateFormat, d[xValue]);
				}

				return d[xValue];
			});
		});

		objD3.setX0Domain(xMinDomain, xMaxDomain);
		objD3.setY0Domain(0, yMaxDomain);

		drawFn();

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

			if(opt.y.title){
				yAxis.select(".y.title").attr("y", objD3.yTextPos(yAxis));
			}
		}

		if(objD3.yMark){
			objDraw.select(".y.mark").call(objD3.yMark);
		}

	}

	var createMultiLine = function(){
		//line
		var multiLineLayer = objDraw.select(".multi-line-layer");

		if(multiLineLayer.size() === 0){
			multiLineLayer = objDraw.append("g").attr("class", "multi-line-layer");
		}

		return function(){
			if(!objD3.checkData()){
				return null;
			}

			if(objD3.data.length === 0){
				multiLineLayer.selectAll(".line-layer").remove();
				multiLineLayer.selectAll(".lineChart--circle").remove();
				return null;
			}

			var line = d3.line()
				.x(function(d) {
					var xData = d[objD3.getX0Value()];
					if(dateFormat){
						xData = NaruSecD3.getTimeDate(dateFormat, xData);
					}
					return objD3.getX0Scale(xData);
				})
				.y(function(d){
					var yData = d[objD3.getY0Value()];
					return objD3.getY0Scale(yData);
				});

			var dataNest = d3.nest()
				.key(function(d) {return d.key;})
				.entries(objD3.data);

			var lineLayerTemp = multiLineLayer.selectAll(".line-layer")
				.data(dataNest, function(d){
					return d.key;
				});
			lineLayerTemp.exit().remove();

			var lineLayer = lineLayerTemp.enter()
				.append("g")
				.merge(lineLayerTemp)
				.attr("class", "line-layer")
				.attr("id", function(d){
					return "line_"+d.key;
				});

			lineLayer.selectAll("path").remove();
			lineLayer.selectAll("circle").remove();

			lineLayer.append("path")
				.attr("class", "line")
				.style("stroke", function(d, i){
					return objD3.getGraphColor(objD3.graph[i].color, i);
				})
				.style("stroke-width", function(d, i){
					var lineGraph = objD3.graph[i];
					var result = 1;
					if(lineGraph){
						var strokeWidth = parseInt(lineGraph["stroke-width"]);
						if(!isNaN(strokeWidth)){
							if(strokeWidth > 5){
								result = 5;
							}else if(strokeWidth > 0){
								result = strokeWidth;
							}
						}
					}

					return result;
				})
				.attr("d", function(d){
					return line(d.values);
				});

			var circleTemp = lineLayer.selectAll("circle")
				.data(function(d){
					return d.values;
				});
			circleTemp.exit().remove();

			var circle = circleTemp.enter()
				.append("circle")
				.merge(circleTemp)
				.attr('class', function(){
					return "lineChart--circle";
				})
				.attr("r", 2)
				.attr("fill", "#fff")
				.style("stroke-width", 1)
				.attr("cx", function(d) {
					var xData = d[xValue];
					if(dateFormat){
						xData = NaruSecD3.getTimeDate(dateFormat, d[xValue]);
					}
					return objD3.getX0Scale(xData);
				})
				.attr("cy", function(d) {
					return objD3.getY0Scale(d.value);
				});

			var tempLineLayer = multiLineLayer.selectAll(".line-layer");
			tempLineLayer.each(function(d, i){
				d3.select(this).selectAll("circle")
					.style("stroke", function(d){
						d.color = objD3.graph[i].color;
						return objD3.getGraphColor(objD3.graph[i].color, i)
					});

			});

			if(opt.balloon && circle !== null){
				//create balloon
				opt.balloon.dateFormat = dateFormat;
				objD3._createBalloon(circle, opt.balloon, "circle");
			}

			return circle;
		};
	};

	var drawFn = createMultiLine();
	if(drawFn === null){
		return;
	}

	setData(data);

	objD3.addWindowResizeEvent(redrawChart);
	function redrawChart(){
		var objChart = d3.select("#" + chartId);
		//console.log("redrawChart", chartId, objChart.size())
		if(objChart.size() === 0){
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
		obj:objDraw.node().parentNode,
		update: setData,
		resize: redrawChart,
		objD3: objD3
	};

};

NaruSecD3.createLineGraph = function(opt, data, objD3Temp, objD3Flag, graphIndex){
	if(!opt.id){
		console.log("not select chartId:", opt.id);
		return;
	}
	var chartId = opt.id;
	var dateFormat = opt.dateFormat;
	var yOpt = opt.y;
	var yTitle = yOpt.title;
	var balloonText = yOpt.balloonText;

	var objD3 = objD3Temp;
	console.log("objD3", objD3)
	var color = objD3.graph[graphIndex].color;
	var yMaxDomain = objD3.getYMaxDomain();
	var yAxisClass = "y";
	var objDraw = null;
	if(objD3 && objD3 instanceof NaruSecD3){
		objD3.setY1Value(opt.y.value);
		objD3.setY1Scale("linear");
		objD3.setY1OutputType("range");
		objD3.setY1OutputRange();
		objD3.createY1Axis();

		//drawAxis
		objD3.drawX0Axis(objDraw, "x axis");
		yAxisClass = "y1";
		objDraw = objD3.getSvgLayer();
		objD3.drawY1Axis(objDraw, yAxisClass+" axis", yTitle);

		objDraw = d3.select("#"+chartId).select("g");

	}else{
		//TODO
		//objDraw = objD3.createSvg();
	}


	var createLine = function(){
		var lineLayer = objDraw.select(".line-layer");
		if(lineLayer.size() === 0){
			lineLayer = objDraw.append("g").attr("class", "line-layer");
		}
		var lineColor = objD3.getGraphColor(color);

		return function(){
			if(!objD3.checkData()){
				return null;
			}

			if(objD3.data.length === 0){
				lineLayer.select(".line").remove();
				lineLayer.selectAll(".lineChart--circle").remove();
				return null;
			}

			var line = d3.line()
				.x(function(d){
					var xData = d[objD3.getX0Value()];
					if(dateFormat){
						xData = NaruSecD3.getTimeDate(dateFormat, xData);
					}
					return objD3.getX0Scale(xData) + (objD3.getX0Scale().bandwidth() / 2);
				})
				.y(function(d){
					var value = yAxisClass == 'y' ? d[objD3.getY0Value()]:d[objD3.getY1Value()];
					return yAxisClass == 'y' ? objD3.getY0Scale(value):objD3.getY1Scale(value);
				});


			var objLine = lineLayer.select(".line");
			if(objLine.size() === 0){
				lineLayer
					.append("path")
					.attr("class", "line")
					.style("stroke-width", 2)
					.style("stroke", objD3.getGraphColor(color));
				//d3.rgb(lineColor));

				objLine = lineLayer.select(".line")
			}
			objLine
				.datum(objD3.data)
				.attr("d", line);

			var circleTemp = lineLayer.selectAll("circle")
				.data(objD3.data);

			circleTemp.exit().remove();

			var circle = circleTemp.enter()
				.append("circle")
				.merge(circleTemp)
				.attr("class", "lineChart--circle")
				.attr("r", 2)
				.style("stroke", objD3.getGraphColor(color))
				.attr("fill", "#fff")
				.style("stroke-width", 1)
				.attr("cx", function(d) {
					return objD3.getX0Scale(d[objD3.getX0Value()]) + (objD3.getX0Scale().bandwidth() / 2);
				})
				.attr("cy", function(d) {
					return yAxisClass == 'y' ? objD3.getY0Scale(d[objD3.getY0Value()]):objD3.getY1Scale(d[objD3.getY1Value()]);
				});

			if(opt.balloon && circle !== null){
				if(balloonText) opt.balloon.value = balloonText;

				opt.balloon.dateFormat = dateFormat;
				opt.balloon.color = color;
				objD3._createBalloon(circle, opt.balloon, "circle");
			}

			return circle;
		};
	}

	var drawFn = createLine();
	if(drawFn === null){
		return;
	}

	setData(data);

	function redrawChart(){
		var objChart = d3.select("#" + chartId);
		if(objChart.size() === 0){
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
		var yMaxDomain = objD3.getYMaxDomain();
		var yTitle = yOpt.title;

		if(objD3 && objD3 instanceof NaruSecD3){
			//width가 변하면 (y축 텍스트가 길어질때 )
			//objD3.setAxis1Width(dataCount, yTitle);

			objD3.setY1Domain(0, yMaxDomain);
			objD3.updateY1Axis();
		}else{
			//width가 변하면 (y축 텍스트가 길어질때 )
			//objD3.setAxisWidth(dataCount, yTitle);

			objD3.getX0Scale().domain(objD3.data.map(function(d){
				return d[objD3.getX0Value()];
			}));
			objD3.setY0Domain(0, yMaxDomain);

			objD3.updateX0Axis();
			objD3.updateY0Axis();
		}

		drawFn(opt.animation);
	}

	return {
		obj:objDraw.node().parentNode,
		update: setData,
		resize: redrawChart,
		objD3: objD3Flag ? objD3:null
	};
};


NaruSecD3.prototype._createLine = function(objDraw, yAxisClass, color){
	//line생성


};


/**
 * TODO createDurationGraph name
 */
NaruSecD3.createDurationGraph = function(opt, data){
	if(!opt.id){
		console.log("not select chartId:", opt.id);
		return;
	}
	var chartId = opt.id;
	var objD3 = new NaruSecD3();

	objD3.chartId = chartId;
	objD3.data = data;

	var objDraw = objD3.createSvg();
	objD3.setX0Scale("time");
	objD3.setY0Scale("linear");

	objD3.setX0OutputType("range");
	objD3.setY0OutputType("range");

	objD3.setX0OutputRange();
	objD3.setY0OutputRange();

	var x1 = opt.x.x1;
	var x2 = opt.x.x2;
	var dx1 = opt.x.dx1;//st
	var dx2 = opt.x.dx2; //ed
	objD3.setX0Value(x1);
//	objD3.setY0Value(opt.y.value);

	var startDate = null;
	var endDate = null;
	var minDate = d3.min(objD3.data, function(d, i){
		if(i === 0) startDate = d[dx1];
		return d[x1];
	});

	var maxDate = d3.max(objD3.data, function(d, i){
		if(i === 0) endDate = d[dx2];
		return d[x2];
	});

	if(!startDate || !(startDate instanceof Date)){
		startDate = minDate;
	}
	if(!endDate || !(endDate instanceof Date)){
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
		var innerColor = !opt.x.innerColor? "#DF0101":opt.x.innerColor;
		var outerColor = !opt.x.outerColor ? "#BCBCBC":opt.x.outerColor;

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

			return objRects;
		};
	};

	var drawFn = createDuration();
	if(drawFn === null){
		return;
	}

	setData(data);

	//redraw
	objD3.addWindowResizeEvent(redrawChart);
	function redrawChart(){
		var objChart = d3.select("#" + chartId);
		if(objChart.size() === 0){
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
		//update data
		objD3.data = data;
		//update
		var startDate = null;
		var endDate = null;
		var minDate = d3.min(objD3.data, function(d, i){
			if(i === 0) startDate = d[dx1];
			return d[x1];
		});

		var maxDate = d3.max(objD3.data, function(d, i){
			if(i === 0) endDate = d[dx2];
			return d[x2];
		});

		if(!startDate || !(startDate instanceof Date)){
			startDate = minDate;
		}
		if(!endDate || !(endDate instanceof Date)){
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
		var objRects = drawFn();
		console.log(opt.balloon);
		console.log(objRects);
		if(opt.balloon && objRects != null){
			//create balloon
			//objRects = objDraw.select("g.rect-layer").selectAll("rect.bar");
			console.log("objRects", objRects.size())
			objD3._createBalloon(objRects, opt.balloon, "rect");
		}

		//update xAxis;
		objD3.updateX0Axis();
//		if(objD3.x0Axis){
//			objDraw.select(".x.axis")
//				.attr("transform", "translate(0," + objD3.getSvgHeight() + ")")
//				.call(objD3.x0Axis)
//				.selectAll(".tick text")
//				.attr("x", 0)
//				.attr("y", 5)
//				.attr("dy", ".9em")
//				.style("text-anchor", "middle")
//				.attr("class", function (d) {//time
//					if (d.textCss !== undefined && d.textCss) return "tickText";
//				});
//		}
	}

	return {
		"resize": redrawChart,
		"update": setData
	};
};

/**
 * position:"left", "bottom" - default, TODO: "right", "top"
 */
NaruSecD3.createLegend = function(opt, legendData, objD3Temp){
	var objD3 = null;
	if(objD3Temp && objD3Temp instanceof NaruSecD3){
		objD3 = objD3Temp;
		objD3.legend.data = legendData ? legendData: objD3.data;
	}else{
		if(!opt || !opt.id){
			console.log("not select opt:", !opt ? opt:opt.id);
			return;
		}
		var chartId = opt.id;

		objD3 = new NaruSecD3();
		objD3.chartId = chartId;
		objD3.legend.data = legendData; //TODO --> legend.data
		objD3.setX0Value(opt.title);
		objD3.setY0Value(opt.value);

		objD3.createSvg();
	}

	var colorField = opt.colorField === undefined ? "color":opt.colorField;
	var position = opt.position;
	if(!position) position = "bottom";

	//legend position
	//position에 따른 legend maxHeight;
	//position에 따른 legend maxWidth;
	var objLegend = null;
	if(position == "right"){
		objD3.setLegendSize({
			"right":100
		});
		objLegend = objD3._createLegendRight(colorField);
	}else if(position == "top"){

	}else if(position == "left"){

	}else{
		objD3.setLegendSize({
			"bottom":20
		});
		objLegend = objD3._createLegendBottom(colorField);
	}
	return objLegend;

};

NaruSecD3.createBarGraph = function(opt, data, objD3Flag, graphIndex){
	if(!opt.id){
		console.log("not select chartId:", opt.id);
		return;
	}
	var chartId = opt.id;

	var objD3 = new NaruSecD3();
	objD3.chartId = chartId;
	objD3.graph = opt.graph;

	var objDraw = objD3.createSvg();

	var xOpt = !opt.x ? {"value":"value", "title":"", "guideLine":null, "timeFormat":null}:opt.x;
	var yOpt = !opt.y ? {"value":"value", "title":""}:opt.y;

	objD3.x0DateFormat = xOpt.timeFormat;
	objD3.setX0Value(xOpt.value);
	objD3.setY0Value(yOpt.value);

	objD3.setX0Scale("ordinal");
	objD3.setY0Scale("linear");

	objD3.setX0OutputType("rangeBands");
	objD3.setY0OutputType("range");

	var objLegend = null;
	if(opt.legend){
		objLegend = NaruSecD3.createLegend(opt.legend, opt.legend.data, objD3);
	}

	objD3.setX0OutputRange();
	objD3.setY0OutputRange();

	objD3.createX0Axis2(opt.x); //TODO
	objD3.createY0Axis(); //TODO

	objD3.drawX0Axis(objDraw, "x axis");

//	var yTitle = yOpt.title;

	var color = objD3.graph ? objD3.graph[graphIndex].color: null;
	var balloonText = yOpt.balloonText;

	objD3.drawY0Axis(objDraw, "y axis", true, opt.y);
//	if(yOpt.titleInner){
//		objD3.drawY0Axis(objDraw, "y axis", true, yTitle);
//	}else{
//		objD3.drawY0Axis3(objDraw, "y axis", true, yTitle);
//	}

	var drawFn = objD3._createBarRect(objDraw, opt.radius, color);
	if(drawFn === null){
		return;
	}

	setData(data);

	function redrawChart(){
		var objChart = d3.select("#" + chartId);
		if(objChart.size() === 0){
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

		var yMaxDomain = objD3.getYMaxDomain();

		// x축 svgWidth 설정
		objD3.setAxisWidth(yMaxDomain, yOpt, objLegend);

		//scale set Domain
		objD3.getX0Scale().domain(objD3.data.map(function(d){
			return d[objD3.getX0Value()];
		}));
		objD3.setY0Domain(0, yMaxDomain);

		var objBars = drawFn(opt.animation);
		if(opt.balloon && objBars !== null){
			if(balloonText) opt.balloon.value = balloonText;
			objD3._createBalloon(objBars, opt.balloon, "rect");
		}

		//update xAxis;
		objD3.updateX0Axis();
		//update yAxis
		objD3.updateY0Axis();

	}

	return {
		obj:objDraw.node().parentNode,
		update: setData,
		resize: redrawChart,
		objD3: objD3Flag ? objD3:null,
		objLegend: objLegend
	};

};

NaruSecD3.prototype._createBalloon = function (objOver, optBalloon, type){
	var objD3 = this;
	//tooltip
	var divToolTip = objD3.createToolTip(optBalloon);

	var fmtText = optBalloon.value;
	var dateFormat = optBalloon.dateFormat; //date origin format
	var timeFormat = optBalloon.timeFormat; // change format
	var regexp = /[\[]{2}([^\]]+)[\]]{2}/g;

	objD3.getSvgLayer().on("mouseleave", function(){
		objD3.hideToolTip(divToolTip);
	})

	/**
	 * tooltip 좌표이동
	 * tooltip 왼쪽,오른쪽,위,아래인지 체크
	 * tooltip color변경(border)
	 * tooltip show
	 */
	objOver.on("mousemove.one", function() {//툴팁 좌표이동
		var clientPos = d3.select("#"+objD3.chartId).select("svg").node().getBoundingClientRect();
		objD3.hideToolTip(divToolTip);

		var toolTipContentWidth = parseInt(divToolTip.style("width"), 10);
		var toolTipContentHeight = parseInt(divToolTip.style("height"), 10);
		var toolTipArrowWidth = parseInt(divToolTip.select(".arrow-line").style("width"), 10) / 2;
		var toolTipArrowHeight = parseInt(divToolTip.select(".arrow-line").style("height"), 10) / 2;
		var toolTipWidth = toolTipContentWidth;// width는 toolTipArrowWidth 영향 없음
		var toolTipHeight = toolTipContentHeight + toolTipArrowHeight;

		var limitMinX = 0;
		var limitMaxX = clientPos.width - toolTipWidth;
		var limitMinY = 0;
		var limitMaxY = clientPos.height - toolTipHeight;

		var posX = d3.event.clientX - clientPos.left - (toolTipWidth / 2);
		var posY = d3.event.clientY - clientPos.top - (toolTipHeight);

		divToolTip.classed("top", false);
		divToolTip.classed("bottom", false);
		divToolTip.classed("left", false);
		divToolTip.classed("right", false);

		divToolTip.select(".arrow-line").style("top", null);
		divToolTip.select(".arrow-line").style("right", null);
		divToolTip.select(".arrow-line").style("left", null);
		divToolTip.select(".arrow-line").style("bottom", null);
		divToolTip.select(".arrow-middle").style("top", null);
		divToolTip.select(".arrow-middle").style("right", null);
		divToolTip.select(".arrow-middle").style("left", null);
		divToolTip.select(".arrow-middle").style("bottom", null);

		//check posX
		if(posX > limitMaxX){
			posX = posX - ((toolTipWidth + toolTipArrowWidth)/ 2);
			divToolTip.classed("left", true);
		}else if(posX < limitMinX){
			posX = d3.event.clientX - clientPos.left + (toolTipArrowWidth / 2);

			divToolTip.classed("right", true);
		}

		if(divToolTip.classed("left") || divToolTip.classed("right")){
			posY = d3.event.clientY - clientPos.top - (toolTipContentHeight / 2);

			if(posY > limitMaxY){
				posY = limitMaxY;

				divToolTip.select(".arrow-line").style("top", (d3.event.clientY - clientPos.top - posY)+"px");
				divToolTip.select(".arrow-middle").style("top", (d3.event.clientY - clientPos.top - posY)+"px");
			}
		}


		if(!divToolTip.classed("left") && !divToolTip.classed("right")){
			//check posY
			if(posY < limitMinY){
				posY = limitMinY;

				if(toolTipHeight > (d3.event.clientY - clientPos.top)){
					posY = d3.event.clientY - clientPos.top + (toolTipArrowHeight);// + (toolTipHeight + toolTipArrowHeight + 10);
					divToolTip.classed("bottom", true);
				}else{
					divToolTip.classed("top", true);
				}
			}else{
				divToolTip.classed("top", true);
			}
		}

		var arrowLine = divToolTip.select(".arrow-line");
		var borderColor = divToolTip.style("border-color");
		var heightMarginSize = 2;
		var widthMarginSize = 5;
		if(divToolTip.classed("bottom")){
			arrowLine.style("border-top-color", "transparent");
			arrowLine.style("border-right-color", "transparent");
			arrowLine.style("border-bottom-color", borderColor);
			arrowLine.style("border-left-color", "transparent");

			posY = posY + heightMarginSize;
		}else if(divToolTip.classed("left")){
			arrowLine.style("border-top-color", "transparent");
			arrowLine.style("border-right-color", "transparent");
			arrowLine.style("border-bottom-color", "transparent");
			arrowLine.style("border-left-color", borderColor);

			posX = posX - widthMarginSize;
		}else if(divToolTip.classed("right")){
			arrowLine.style("border-top-color", "transparent");
			arrowLine.style("border-right-color", borderColor);
			arrowLine.style("border-bottom-color", "transparent");
			arrowLine.style("border-left-color", "transparent");

			posX = posX + widthMarginSize;
		}else{//basic top
			arrowLine.style("border-top-color", borderColor);
			arrowLine.style("border-right-color", "transparent");
			arrowLine.style("border-bottom-color", "transparent");
			arrowLine.style("border-left-color", "transparent");

			posY = posY - heightMarginSize;
		}

		divToolTip.style("left", posX + "px")
			.style("top", posY + "px");

		objD3.showToolTip(divToolTip);
	});

	/**
	 * tooltip set text
	 * tooltip color변경(border)
	 */
	function mouseOverToolTip(fillColor, i, d){
		var toolTipMessage = fmtText.replace(regexp, function(match, p1){//match, p1, p2, p3, offset, string
			var dataMap = d.data === undefined ? d:d.data;
			if(objD3.getX0Value() === p1 && timeFormat){
				if(dataMap[p1] instanceof Date){
					return NaruSecD3.getTimeString(timeFormat, dataMap[p1]);
				}
				return NaruSecD3.getTimeString(timeFormat, NaruSecD3.getTimeDate(dateFormat, dataMap[p1]));
			}
			return dataMap[p1] !== undefined && dataMap[p1] !== null ? dataMap[p1]:"";
		});

		divToolTip.select(".content").html(toolTipMessage);

		var borderColor = "";
		if(!d.color){//TODO colorField
			borderColor = objD3.getGraphColor(fillColor, i, true);
		}else{
			borderColor = objD3.getGraphColor(d.color, i);
		}

		borderColor = objD3.getGraphColor(fillColor, i).darker(0.5);
		divToolTip.style("border", "2px solid "+ borderColor);

		return borderColor;
	}

	if(type == "rect" || type == "pie"){
		objOver.on("mouseover.one", function(d, i){
			var obj = d3.select(this);
			var color = d.color;
			if(!color){
				color = obj.attr("fill");
				var gradientUrl = "url(#gradient_"+objD3.chartId+"_";

				color = color.replace(gradientUrl, "").replace(')', "");
				if(color) color = "#"+color;
			}
			mouseOverToolTip(color, i, d);
		});
	}else if(type == "circle"){
		objOver.on("mouseout.one", function(){
			var obj = d3.select(this);
			if(objD3.rScale){
				obj.transition().duration(500)
					.attr("r", function(d){
						return objD3.rScale(d[objD3.getX0Value()]);
					});
			}else{
				obj.transition().duration(500).attr("r", 2);
			}
		})
			.on("mouseover.one", function(d, i){
				var obj = d3.select(this);
				var color = d.color ? d.color:NaruSecD3.rgbToHex(d3.select(this).style("stroke"));

				mouseOverToolTip(color, i, d);

				if(objD3.rScale){
					obj.transition().duration(100)
						.attr("r", function(d){
							return objD3.rScale(d[objD3.getX0Value()]) + 1;
						});
				}else{
					obj.transition().duration(100).attr("r", 3);
				}
			});
	}else if(type == "force"){
		objOver.on("mouseout.one", function(){
			var obj = d3.select(this);
			obj.transition().duration(500).attr("r", 2);
		})
			.on("mouseover.one", function(d, i){
				var obj = d3.select(this);
				var color = d.color;
				if(!color){
					color = obj.attr("fill");
					var gradientUrl = "url(#gradient_"+objD3.chartId+"_";

					color = color.replace(gradientUrl, "").replace(')', "");
					if(color) color = "#"+color;
				}
				mouseOverToolTip(color, i, d);
				obj.transition().duration(100).attr("r", 3);
			});
	}else if(type == "treemap"){
		console.log("_createBalloon", type);
		objOver.on("mouseover.one", function(d, i){
			var obj = d3.select(this);
			var color = d.color;
			if(!color){
				color = obj.attr("fill");
				var gradientUrl = "url(#gradient_"+objD3.chartId+"_";

				color = color.replace(gradientUrl, "").replace(')', "");
				if(color) color = "#"+color;
			}
			mouseOverToolTip(color, i, d);
		});
	}

};

NaruSecD3.prototype._createBarRect = function(objDraw, radius, color){
	var objD3 = this;
	//bar
	var barLayer = objDraw.select(".bar-layer");
	if(barLayer.size() === 0){
		barLayer = objDraw.append("g").attr("class", "bar-layer");
	}

	return (function (animation){
		if(!objD3.checkData()){
			return null;
		}

		if(objD3.data.length === 0){
			barLayer.selectAll(".bar").remove();
			return null;
		}

		var objBarsTemp = barLayer.selectAll(".bar")
			.data(objD3.data);

		objBarsTemp.exit().remove();

		var objBars = objBarsTemp.enter()
			.append("rect")
			.merge(objBarsTemp)
			.attr("class", "bar");

		radius = parseInt(radius);
		if(!isNaN(radius)){
			objBars.attr("rx", radius)
				.attr("ry", radius);
		}

		objBars.attr("fill", function(d, i) {
			return "url(#"+objD3.getGradientColor(color ? color:i)+")";
		});

		var barWidth = objD3.getX0Scale().bandwidth() * 3 / 4;
		var outer = (objD3.getX0Scale().bandwidth() - barWidth) / 2;

		objBars.attr("x", function(d){
			return objD3.getX0Scale(d[objD3.getX0Value()]) + outer;
		})
			.attr("width", barWidth);

		if(animation && Object.keys(animation).length > 0){
			//transition
			objBars.attr("y", objD3.getSvgHeight())
				.attr("height", 0)
				.transition().duration(isNaN(parseInt(animation.duration)) ? 1000:parseInt(animation.duration))
				.attr("y", function(d){
					var value = d[objD3.getY0Value()];
					return objD3.getY0Scale(value);
				})
				.attr("height", function(d){
					return objD3.getSvgHeight() - objD3.getY0Scale(d[objD3.getY0Value()]);
				});
		}else{
			objBars.attr("y", function(d){
				var value = d[objD3.getY0Value()];
				return objD3.getY0Scale(value);
			})
				.attr("height", function(d){
					return objD3.getSvgHeight() - objD3.getY0Scale(d[objD3.getY0Value()]);
				});
		}

		return objBars;
	});
};


NaruSecD3.prototype._createLegendBottom = function(colorField){
	var objD3 = this;
	var objDraw = this.getSvgLayer();

	var legendMaxRow = 3;
	var legendMaxHeight = legendMaxRow * 20;
	var legendPosX = 0;
	//TODO TEST
	var legendPosY = objD3.getSvgHeight() > legendMaxHeight ? objD3.getSvgHeight() - legendMaxHeight:0;

	var legendLayer = objDraw.append("g")
		.attr("class", "legend-layer")
		.attr("transform", "translate("+legendPosX+", "+ legendPosY+")");

	function setData(legendData){
		if(!legendData && legendData.length === 0) return;

		objD3.legend.data = legendData;

		var lableMaxLength = d3.max(objD3.legend.data, function(d){
			return d[objD3.getX0Value()].length; //get
		});

		var legendWidth = 8 * lableMaxLength;
		var svgWidth = objD3.getSvgWidth();
		var legendCount = Math.floor(svgWidth / legendWidth);
		var legendStPos = (svgWidth - (legendCount * legendWidth))/2;


		var legendTemp = legendLayer.selectAll(".legend")
			.data(objD3.legend.data);

		legendTemp.exit().remove();

		var legend = legendTemp.enter()
			.append("g")
			.merge(legendTemp)
			.attr("class", "legend");

		legend.selectAll("rect").remove();
		legend.selectAll("text").remove();

		legend
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
			.attr("x", 0)
			.attr("width", 18)
			.attr("height", 18)
			.attr("fill", function(d, i){
				return objD3.getGraphColor(d[colorField], i);
			});

		legend
			.append("text")
			.attr("x", 23)
			.attr("y", 14)
			.style("text-anchor", "start")
			.attr("fill", function(d, i) {
				return objD3.getGraphColor(d[colorField], i);
			})
			.text(function(d) {
				return d[objD3.getX0Value()];
			});

		return legendLayer.selectAll(".legend");
	}

	var naruLegend = new NaruSecD3.NaruLegend(setData(objD3.legend.data));

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
			if(data && Array.isArray(data) && data.length > 0){
				naruLegend.update(setData(data));
			}
		},
		"legend": naruLegend
	};
};


NaruSecD3.prototype._createLegendRight = function(colorField){
	var objDraw = this.getSvgLayer();
	var objD3 = this;
	var legendLayer = objDraw.append("g")
		.attr("class", "legend-layer")
		.attr("transform", "translate("+(objD3.getYTickSize() + 30)+", "+0+")");

	function setData(legendData){
		if(!legendData && legendData.length === 0) return;

		objD3.legend.data = legendData;

		var legendTemp = legendLayer.selectAll(".legend")
			.data(objD3.legend.data);

		legendTemp.exit().remove();

		var legend = legendTemp.enter()
			.append("g")
			.merge(legendTemp)
			.attr("class", "legend");

		legend.selectAll("rect").remove();
		legend.selectAll("text").remove();
		legend.selectAll("path").remove();

		//TODO NaruLegend
		legend
			.attr("transform", function(d, i) { return "translate(0," + ((i * 20)+10) + ")"; })
			.each(function(d){
				var g = d3.select(this);
				var legendType = d.type;
				var graphId = d.graph; //TODO undefined
				//var legendColor = d.color;
				var legendColor =  objD3.getGraphColor(d[colorField]);

				if(!legendType || legendType == "bar"){
					var objRect = g.append("rect");
					objRect.attr("x", 0)
						.attr("width", 20)
						.attr("height", 10)
						.attr("fill", legendColor)
						.style("cursor", "pointer");

					objRect.on("mouseover.one", function(d){
						d3.select(this).attr("fill", legendColor.brighter(0.3));
					})
						.on("mouseout.one", function(d){
							d3.select(this).attr("fill", legendColor);
						});

					objRect.on("click", function(d, i){
						var obj = d3.select(this);
						var visible = true;
						if(obj.attr("opacity") === null || obj.attr("opacity") == 1){
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
						.attr('style', 'stroke-width:2px; stroke:'+ legendColor);

					objPath.on("mouseover.one", function(d){
						d3.select(this).style("stroke",  legendColor.brighter(0.3));
					})
						.on("mouseout.one", function(d){
							d3.select(this).style("stroke", legendColor);
						});

					lineLegend.append("circle")
						.attr("class", "legend--circle")
						.attr("r", 1)
						.attr("cx", 10)
						.attr("cy", 5)
						.style("stroke", legendColor)
						.attr("fill", "#fff")
						.style("stroke-width", 1);

					lineLegend.on("click", function(d, i){
						var obj = d3.select(this);
						var visible = true;
						if(obj.attr("opacity") === null || obj.attr("opacity") == 1){
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
			.append("text")
			.attr("x", 30)
			.attr("y", 8)
			.style("text-anchor", "start")
			.text(function(d) {
				return d.title;
			});

		return legendLayer.selectAll(".legend");
	}

	setData(objD3.legend.data);


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
	};
};


NaruSecD3.createPieGraph = function(opt, data){
	if(!opt.id){
		console.log("not select chartId:", opt.id);
		return;
	}
	var chartId = opt.id;
	var objD3 = new NaruSecD3();

	objD3.chartId = chartId;
	objD3.data = data;

	objD3.setX0Value(opt.x.value);
	objD3.setY0Value(opt.y.value);

	var objDraw = objD3.createSvg();

	var objLegend = null;
	if(opt.legend){
		objLegend = NaruSecD3.createLegend(opt.legend, opt.legend.data, objD3);
	}

	var total = d3.sum(data, function(d) {
		return d[objD3.getY0Value()];
	});

	var percentageFormat = d3.format(".0%");
	data.forEach(function(d) {
		d.percentage = percentageFormat(d[objD3.getY0Value()] / total);
	});

	var drawFn = objD3._createPie(objDraw);
	var objPies = drawFn();

	if(opt.balloon){
		objD3._createBalloon(objPies, opt.balloon, "pie");
	}

	//redraw
	objD3.addWindowResizeEvent(redrawChart);
	function redrawChart(){
		var objChart = d3.select("#" + chartId);
		if(objChart.size() === 0){
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

NaruSecD3.prototype._createPie = function(objDraw){
	var objD3 = this;
	//pie
	var pieLayer = objDraw.select(".pie-layer");
	if(pieLayer.size() === 0){
		pieLayer = objDraw.append("g").attr("class", "pie-layer");
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
		.attr("fill", function(d, i) { return d3.rgb(NaruSecD3.getColor(i)).brighter(2); });

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
			};
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
				if(check === 0){
					objArc.selectAll(".pie-text")
						.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
						.filter(function(d){ //TODO	hide label opt
							var hideLabelPercent = 5;
							var value = Number(d.data.percentage.replace("%",	""));
							if(value >= hideLabelPercent) return value;
						})
						.text(function(d) {
							return d.data.percentage;
						});
				}
			})
			.attrTween('d', tweenPie);

		return objArc.selectAll('.pie');
	});


};


NaruSecD3.createForceGraph = function(opt, nodesData, linksData){
	if(!opt.id){
		console.log("not select chartId:", opt.id);
		return;
	}
	var chartId = opt.id;
	var objD3 = new NaruSecD3();
	objD3.chartId = chartId;
	objD3.data = {
		"nodesData": nodesData,
		"linksData": linksData
	};

	var nodeOpt = opt.node;
	var objDraw = objD3.createSvg();

	var drawFn = objD3._createForce(objDraw, nodeOpt);
	var objForce = drawFn();

	if(opt.balloon){
		objD3._createBalloon(objForce, opt.balloon, "force");
	}

	//redraw
	objD3.addWindowResizeEvent(redrawChart);
	function redrawChart(){
		var objChart = d3.select("#" + chartId);
		if(objChart.size() === 0){
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

NaruSecD3.prototype._createForce = function(objDraw, nodeOpt){
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
		.style("stroke", function(d) { return d3.rgb(NaruSecD3.getColor(d[nodeOpt.color])); });

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

NaruSecD3.createTreemap = function(opt, data){
	if(!opt.id){
		console.log("not select chartId:", opt.id);
		return;
	}
	var chartId = opt.id;
	var objD3 = new NaruSecD3();
	objD3.chartId = chartId;

	objD3.setX0Value(opt.node.name);
	objD3.setY0Value(opt.node.value);

	var nodeText = opt.node.text;

	var objLegend = null;
	if(opt.legend){
		objLegend = NaruSecD3.createLegend(opt.legend, opt.legend.data, objD3);
	}

	var treemap = d3.treemap()
		.tile(d3.treemapResquarify)
		.round(true)
		.paddingInner(0);

	var objDraw = objD3.createSvg();
	var nodeColorField = opt.node.colorField;

	var createTreemap = function(){
		var treeLayer = objDraw.select(".tree-layer");

		if(treeLayer.size() === 0){
			treeLayer = objDraw.append("g").attr("class", "tree-layer");
		}

		return function(){
			if(!objD3.checkData()){
				return null;
			}

			if(objD3.data.length === 0){
				treeLayer.selectAll(".tree").remove();
				return null;
			}
			var dataNest = d3.nest()
				.key(function(d){
					return d[objD3.getX0Value()];
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
					return sort && sort == "desc" ? (b.value - a.value):(a.value - b.value);
				});

			treemap.size([objD3.getSvgWidth(), objD3.getSvgHeight()]);
			//var treeData = treemap(root).leaves();
			var treeData = treemap(root).descendants();
			var objTempTrees = treeLayer.selectAll(".tree")
				.data(treeData);
			objTempTrees.exit().remove();

			var objTrees = objTempTrees.enter()
				.append("g")
				.merge(objTempTrees)
				.attr("class", "tree")
				.attr("fill", function(d, i) {
					var color = d.data[nodeColorField];
					return "url(#"+objD3.getGradientColor(color ? color:i)+")";
				});

			objTrees.selectAll("rect").remove();
			objTrees.selectAll("clipPath").remove();
			objTrees.selectAll("text").remove();

			objTrees
				.append("rect")
				.attr("id", function(d, i) {
					return "tree-rect-" + i;
				})
				.attr("fill", function(d, i) {
					var color = d.data[nodeColorField];
					return "url(#"+objD3.getGradientColor(color ? color:i)+")";
				})
				.attr("class", function(d) {
					return "node level-" + d.depth;
				})

			objTrees
				.append("clipPath")
				.attr("id", function(d, i) {
					return "clip-" + "tree-"+i;
				})
				.append("use")
				.attr("xlink:href", function(d,i) {
					return "#tree-rect-" + i;
				})

			objTrees
				.append("text")
				.attr("clip-path", function(d, i) {
					return "url(#clip-tree-" +i+ ")";
				});

			objTrees
				.attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
				.select("rect")
				.attr("width", function(d, i) {
					return d.x1 - d.x0;
				})
				.attr("height", function(d) {
					return d.y1 - d.y0;
				});

			objTrees
				.select("text")
				.call(function(text, width){
					text.each(function (d) {
						var nodeTemp = d3.select(this);
						var rectWidth = d.x1 - d.x0;

						if(nodeText && Array.isArray(nodeText) && nodeText.length > 0){
							for(var j=0; j<nodeText.length; j++){
								nodeTemp.append("tspan")
									.text(function(d) {
										return d.data[nodeText[j]];
									})
									.attr("x", 4)
									.attr("y", function(){
										return 10*(j+1);
									});

								if(rectWidth < nodeTemp.node().getComputedTextLength()){
									nodeTemp.style("opacity", 0);
								}

							}

						}else{
							nodeTemp.append("tspan")
								.text(function(d) {
									return d.data[objD3.getX0Value()];
								})
								.attr("x", 4)
								.attr("y", 10);

							if(rectWidth < nodeTemp.node().getComputedTextLength()){
								nodeTemp.style("opacity", 0);
							}
						}
					});
				});

			return objTrees;//.select("rect");
		};
	};

	var drawFn = createTreemap();

	if(drawFn === null){
		console.error("error data");
		return;
	}

	setData(data);

	//redraw
	objD3.addWindowResizeEvent(redrawChart);
	function redrawChart(){
		var objChart = d3.select("#" + chartId);
		if(objChart.size() === 0){
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

	function setData(data){
		//update data;
		objD3.data = data;

		try{
			var objTreesTemp = drawFn();

			console.log(opt.balloon )
			console.log(objTreesTemp)
			if(opt.balloon && objTreesTemp != null){
				objD3._createBalloon(objTreesTemp, opt.balloon, "treemap");
			}
		}catch(e){
			console.log("error....");
			objD3.catchError(e);
		}
	}

	return {
		obj:objDraw.node().parentNode,
		resize: redrawChart,
		update: setData,
	};
};

NaruSecD3.createScatterPlotGraph = function(opt, data){
	if(!opt.id){
		console.log("not select chartId:", opt.id);
		return;
	}
	var chartId = opt.id;
	var objD3 = new NaruSecD3();
	objD3.chartId = chartId;

	var objDraw = objD3.createSvg();

	var xOpt = !opt.x  ? {"value":"value", "title":"", "guideLine":null, "domain":{"min":null, "max":null}}:opt.x;
	var yOpt = !opt.y  ? {"value":"value", "title":""}:opt.y;
	objD3.setX0Value(xOpt.value);
	objD3.setY0Value(yOpt.value);

	objD3.setX0Scale("linear");
	objD3.setY0Scale("linear");

	objD3.setX0OutputType("range");
	objD3.setY0OutputType("range");

	var objLegend = null;
	if(opt.legend){
		objLegend = NaruSecD3.createLegend(opt.legend, opt.legend.data, objD3);
	}

	objD3.setX0OutputRange();
	objD3.setY0OutputRange();

	objD3.createX0Axis2(xOpt); //TODO
	objD3.createY0Axis(); //TODO

	objD3.drawX0Axis(objDraw, "x axis");
	objD3.drawY0Axis(objDraw, "y axis", true, opt.y);
//	var yTitle = yOpt.title;
//	if(opt.y.titleInner){
//		objD3.drawY0Axis(objDraw, "y axis", true, opt.y);// yTitle);
//	}else{
//		objD3.drawY0Axis3(objDraw, "y axis", true, yTitle);
//	}

	var createScatter = function (){
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

		var scatterLayer = objDraw.select(".scatter-layer");
		if(scatterLayer.size() === 0){
			scatterLayer = objDraw.append("g").attr("class", "scatter-layer");
		}

		return function(){//drawFn
			if(!objD3.checkData()){
				return null;
			}

			if(objD3.data.length === 0){
				scatterLayer.selectAll(".scatter-circle").remove();
				return null;
			}

			if(guideLine !== null){
				var guideX = guideOpt.value; //isNaN(parseInt(guideOpt.value)) ? 1:parseInt(guideOpt.value);
				if(guideX !== undefined && guideX !== null){
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

			var objCirclesTemp = scatterLayer.selectAll(".scatter-circle")
				.data(objD3.data);

			objCirclesTemp.exit().remove();

			var objCircles = objCirclesTemp.enter()
				.append("circle")
				.merge(objCirclesTemp)
				.attr("class", "scatter-circle");

			objCircles.attr("fill", function(d, i) {
				var color = d.color;
				//var parentNode = d3.select(this).node().parentNode;
				return "url(#"+objD3.getGradientColor(color ? color:i)+")";
			});

			objCircles.attr('r', 0)
				.transition()
				.duration(100)
				.attr("r", function(d){
//					console.log(d[objD3.getX0Value()], objD3.rScale(d[objD3.getX0Value()]));
					return objD3.rScale(d[objD3.getX0Value()]);
				})
				.attr("cx", function(d) {
//					console.log(d[objD3.getX0Value()], objD3.getX0Scale(d[objD3.getX0Value()]));
					return objD3.getX0Scale(d[objD3.getX0Value()]);// + (objD3.getX0Scale().bandwidth() / 2);
				})
				.attr("cy", function(d) {
//					console.log(d[objD3.getY0Value()], objD3.getY0Scale(d[objD3.getY0Value()]));
					return objD3.getY0Scale(d[objD3.getY0Value()]);
				});

			return objCircles;
		};

	};

	var drawFn = createScatter();
	if(drawFn === null){
		console.error("error data");
		return;
	}

	setData(data);

	//redraw
	objD3.addWindowResizeEvent(redrawChart);
	function redrawChart(){
		var objChart = d3.select("#" + chartId);
		if(objChart.size() === 0){
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

	function setData(data){
		//update data
		objD3.data = data;

		try{
			var yMaxDomain = objD3.getYMaxDomain();

			objD3.setAxisWidth(yMaxDomain, yOpt, objLegend);

			//scale set domain
//			var xDomain = xOpt.domain;
//			if(xDomain){
//				var xMin = isNaN(Number(xDomain.min)) ? null:Number(xDomain.min);
//				var xMax = isNaN(Number(xDomain.max)) ? null:Number(xDomain.max);
//				console.log("xMin", xMin, "xMax", xMax)
//				var dataXMin = d3.min(objD3.data, function(d, i){
//					return d[objD3.getX0Value()];
//				});
//				var dataXMax = d3.min(objD3.data, function(d, i){
//					return d[objD3.getX0Value()];
//				});
//				if(xMin){
//					if(xMin < dataXMin){
//						xMin = dataXMin;
//					}
//				}
//				if(xMin){
//					if(xMax < dataXMax){
//						xMax = dataXMax;
//					}
//				}
//				objD3.setX0Domain(xMin, xMax, true);
//			}else{
//
//			}

			objD3.setX0DomainExtent(objD3.data);
			objD3.setY0Domain(0, yMaxDomain);

			//r scale change
			var minRCircle = 3;
			var maxRCircle = 10;
			objD3.rScale = objD3.circleX0ScaleOutputRange(minRCircle, maxRCircle);

			//update drawFn
			var objCircles = drawFn();
			if(opt.balloon && objCircles != null){
				objD3._createBalloon(objCircles, opt.balloon, "circle");
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

				if(opt.y.title){
					yAxis.select(".y.title").attr("y", objD3.yTextPos(yAxis));
				}
			}
		}catch(e){
			console.log("error....");
			objD3.catchError(e);
		}

	}

	return {
		obj:objDraw.node().parentNode,
		update: setData,
		resize: redrawChart
		//objD3: objD3Flag ? objD3:null
	};

};


//TODO style class
//TODO x0,x1, y0, y1배열
//TODO setData //legend, balloon 안에서
//enter()전 remove after enter --> merge