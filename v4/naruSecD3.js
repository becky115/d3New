/**
 * Created by eunjilee on 2017. 6. 13..
 */
/**
 * D3.js (4.x.x)
 */

var NaruSecD3 = function (){
	this.chart = null;
	this.xAxis = null;
	this.yAxis = null;
	this.graph = null;
	this.legend = null;
	this.balloon = null;

	this._init();
	console.log(this)
};


NaruSecD3.prototype = function () {

	return {

		_init: function(){
			console.log("_init");
			this._initValue();
		},

		_initValue: function(){
			/**
			 * basic info
			 * @type {{chartId: null, width: number, height: number, margin: {top: number, left: number, right: number, bottom: number}, dateFormat: null, data: null}}
			 */
			this.chart = {
				chartId: null,
				width: 0,
				height: 0,
				margin: {
					top: 20,
					left: 20,
					right: 20,
					bottom: 20
				},
				dateFormat: null,
				data: null,
				debugMode: true
			};

			this.xAxis = [{
				position: "bottom",
				type: "linear",
				value: null,
				axis: null,
				axisMark: null,
				scale: null,
				className: "x axis"
			}];

			this.yAxis = [{
				position: "left",
				type: "linear",
				axis: null,
				axisMark: null,
				scale: null,
				className: "y axis"
			},{
				position: "right",
				type: "linear",
				axis: null,
				scale: null,
				className: "y1 axis"
			}];

			this.graph = [{
				type: "bar",//default
				color: NaruSecD3.getColor(0),
				value: null
			}];

			this.legend = null;
			this.balloon = null;
		},

		//user option
		setOption: function(opt){
			try{
				if(!NaruSecD3.isObject(opt)){
					throw new Error("chart opt", opt);
				}
				var graphOpt = opt.graph;
				var xAxisOpt = opt.xAxis;
				var yAxisOpt = opt.yAxis;
				delete opt.graph;

				this._setDefaultOption(opt);
				this._setGraph(graphOpt);
				this._setXAxis(xAxisOpt);
				this._setYAxis(yAxisOpt);
			}catch(e){
				this._catchError(e);
				return false;
			}

			return true;
		},

		_setXAxis: function(xAxisOpt){
			var defaultOpt = this.xAxis[0];

			this.xAxis = [];
			var objThis = this;
			if(NaruSecD3.isArray(xAxisOpt)){

				for(var i = 0; i < xAxisOpt.length; i++){
					_setOption(xAxisOpt[i]);
					if(i > 0) break; //max 1 xAxis
				}
			//	console.log("result", this.xAxis);
			}else if(NaruSecD3.isObject(xAxisOpt)){
				_setOption(xAxisOpt);

			}else{
				// default xAxis only 1;
				this.xAxis.push(defaultOpt[0]);
				//throw new Error("xAxis option error", xAxisOpt);
			}

			function _setOption(opt){

				var tempOpt =  JSON.parse(JSON.stringify(defaultOpt));


				if(opt.hasOwnProperty("position")){
					tempOpt.position = opt.position;
				}

				if(opt.hasOwnProperty("value")){
					tempOpt.value = opt.value;
				}

				objThis.xAxis.push(tempOpt);

			}
		},

		_setYAxis: function(yAxisOpt){
			var defaultOpt = [];
			defaultOpt.push(this.yAxis[0]);
			defaultOpt.push(this.yAxis[1]);
			console.log("----_setYAxis", defaultOpt);

			this.yAxis = [];
			var objThis = this;
			if(NaruSecD3.isArray(yAxisOpt)){
				for(var i = 0; i < yAxisOpt.length; i++){
					_setOption(yAxisOpt[i], i);
					if(i > 1) break; //max 2 yAxis
				}
				console.log("result", this.yAxis)
			}else if(NaruSecD3.isObject(yAxisOpt)){
				_setOption(yAxisOpt);
			}else{
				// default yAxis only 1;
				this.yAxis.push(defaultOpt[0]);
				//throw new Error("yAxis option error", yAxisOpt);
			}

			function _setOption(opt, index){
				//console.log("defaultOpt", defaultOpt)
				var tempOpt =  JSON.parse(JSON.stringify(defaultOpt[index]));


				if(opt.hasOwnProperty("position")){
					tempOpt.position = opt.position;
				}

				objThis.yAxis.push(tempOpt);
			}
		},

		_drawXAxis: function(){
			var xAxis = this.xAxis[0];
			if(xAxis.axis){
				console.log(xAxis.axis)
				var className = xAxis.className.replace(/\s/g, ".");

				this._getDrawer().select("."+className+".mark")
					.attr("transform", "translate("+this._getYTickTitleSize()+"," + -1 *this._getXTickSize() + ")")
					.call(xAxis.axisMark.tickFormat(""));

				this._getDrawer().select("."+className)
					.attr("transform", "translate("+this._getYTickTitleSize()+"," + -1 *this._getXTickSize() + ")")
					.call(xAxis.axis.tickPadding(7));
			}
		},

		_drawYAxis: function(){
			for(var i=0; i<this.yAxis.length; i++){

				var yAxis = this.yAxis[i];
				var className = yAxis.className.replace(/\s/g, ".");

				if(i == 0){


					yAxis.axis
						//.tickSizeInner(5)
						//.tickSizeOuter(-1  * (this._getYTickSize() ))
						.tickSize(-1  * (this._getYTickSize() ))
						.tickPadding(7);
				}
				//


				this._getDrawer().select("."+className+".mark")
					.attr("transform", "translate("+this._getYTickTitleSize()+"," + 0 + ")")
					.call(yAxis.axisMark.tickFormat(""));

				this._getDrawer().select("."+className)
					.attr("transform", "translate("+this._getYTickTitleSize()+"," + 0 + ")")
					.call(yAxis.axis);

				if(i > 0) break;
			}


			//yAxis.call(objD3.y0Axis);

			//if(opt.y.title){
			//	yAxis.select(".y.title").attr("y", objD3.yTextPos(yAxis));
			//}
		},

		getYMaxDomain: function(index){
			var data = this.chart.data;
			var yValue = this._getYAxisValue(index);
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

		_setXDomain: function(){
			var dateFormat = this.chart.dateFormat;
			var xValue = this._getXAxisValue();
			var data = this.chart.data.map(function(d){
				if(dateFormat){
					return NaruSecD3.getTimeDate(dateFormat, d[xValue]);
				}
				return d[xValue];
			});
			console.log("_setXdomain", data);
			this.xAxis[0].scale.domain(data);
		},

		_setYDomain: function(){
			var yMinValue = 0; //default 0; //TODO 나중 -값 처리
			for(var i=0; i<this.yAxis.length; i++){
				var yMaxValue = this.getYMaxDomain(i);
				if(NaruSecD3.isNumber(yMinValue) && NaruSecD3.isNumber(yMaxValue)){
					//console.log(this.yAxis[i]);
					console.log("set y  domain", yMinValue, yMaxValue)
					this.yAxis[i].scale.domain([yMinValue, yMaxValue]);
				}

			}


		},

		//user data
		setData: function(data){
			console.log("setData", data);
			if(this._validData(data)){
				this.chart.data = data;
				//var chartData = this.chart.data;

				// x축 svgWidth 설정
				//this.setAxisWidth(yMaxDomain, yOpt, objLegend);

				//set x domain
				this._setXDomain();

				//set y domain
				this._setYDomain();


				this._drawXAxis();
				this._drawYAxis();


				for(var i=0; i<this.graph.length; i++){
					//this.graph[i].draw();
					//this.graph[i].draw.apply(this, arguments);
				}
			}
		},

		_validData: function(data){
			if(data !== undefined){ //TODO 조건 추가
				return true;
			}
			return false;
		},

		_setDefaultOption: function(opt){
			if(NaruSecD3.isObject(opt)){
				if(!NaruSecD3.isValid(opt.chartId) || d3.select("#"+opt.chartId).size() === 0){
					throw new Error("invalid chartId", opt.chartId);
				}else{
					this.chart.chartId = opt.chartId;
					this.chart.dateFormat = NaruSecD3.isValid(opt.dateFormat) ? opt.dateFormat:null;

					this._setSvgMargin(opt.margin);
				}

			}else{
				throw new Error("basic option error");
			}
		},

		_setGraph: function(graphOpt){
			var defaultOpt = this.graph[0];
			console.log("----", defaultOpt);
			this.graph = [];

			var objThis = this;
			if(NaruSecD3.isArray(graphOpt)){
				for(var i = 0; i < graphOpt.length; i++){
					_setOption(graphOpt[i]);
				}
			}else if(NaruSecD3.isObject(graphOpt)){
				_setOption(graphOpt);
			}else{
				throw new Error("graph option error");
			}

			function _setOption(opt){
				//console.log("defaultOpt", defaultOpt)
				var tempOpt = JSON.parse(JSON.stringify(defaultOpt));

				if(opt.hasOwnProperty("type")){
					tempOpt.type = opt.type;
				}

				if(opt.hasOwnProperty("color")){
					tempOpt.color = opt.color;
				}

				if(opt.hasOwnProperty("value")) {
					tempOpt.value = opt.value;
				}

				objThis.graph.push(tempOpt);

			}
		},

		_getMultiFormat: function(date){
			var formatMillisecond = d3.timeFormat(".%L"),
				formatSecond = d3.timeFormat(":%S"),
				formatMinute = d3.timeFormat("%I:%M"),
				formatHour = d3.timeFormat("%I %p"),
				formatDay = d3.timeFormat("%a %d"),
				formatWeek = d3.timeFormat("%b %d"),
				formatMonth = d3.timeFormat("%B"),
				formatYear = d3.timeFormat("%Y");

			console.log("multiFormat", date);
			return (d3.timeSecond(date) < date ? formatMillisecond
				: d3.timeMinute(date) < date ? formatSecond
				: d3.timeHour(date) < date ? formatMinute
				: d3.timeDay(date) < date ? formatHour
				: d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
				: d3.timeYear(date) < date ? formatMonth
				: formatYear)(date);
		},

		_createXAxis: function(){
			//position: "bottom",
			//type: "linear"
			if(NaruSecD3.isArray(this.xAxis)){
				var xAxis = this.xAxis[0];
				var chartOpt = this.chart;

				//set scale
				if(chartOpt.dateFormat !== null){
					//xAxis.scale = d3.scaleTime();
					xAxis.scale = d3.scaleBand();
				}else if(xAxis.type === "ordinal"){
					//xAxis.scale = d3.scaleBand();
				}else if(xAxis.type === "linear"){
					//xAxis.scale = d3.scaleLinear();
				}


				console.log("xRange", xRange)
				if(xAxis.scale !== null){
					var xRange = this._getYTickSize();
					xAxis.scale.range([0, xRange]);
				}

				//position
				if(xAxis.position === "top"){
					xAxis.axis = d3.axisTop(xAxis.scale);
					xAxis.axisMark = d3.axisTop(xAxis.scale);
				}else if(xAxis.position === "right"){
					xAxis.axis = d3.axisRight(xAxis.scale);
					xAxis.axisMark = d3.axisRight(xAxis.scale);
				}else if(xAxis.position === "left"){
					xAxis.axis = d3.axisLeft(xAxis.scale);
					xAxis.axisMark = d3.axisLeft(xAxis.scale);
				}else if(xAxis.position === "bottom"){
					xAxis.axis = d3.axisBottom(xAxis.scale);
					xAxis.axisMark = d3.axisBottom(xAxis.scale);
				}

				if(xAxis.axis === null){
					throw new Error("error x axis");
				}

				xAxis.axis.tickSize(this._getXTickSize());

				if(chartOpt.dateFormat !== null){
					xAxis.axis.tickFormat(this._getMultiFormat);
				}


				var drawer = this._getDrawer();
				var xAxisClass = xAxis.className;
				drawer.append("g")
					.attr("class", xAxisClass)
					.attr("transform", "translate(0," + this._getSvgHeight() + ")");

				drawer.append("g")
					.attr("class", xAxisClass+" mark")
					.attr("transform", "translate(0," + this._getSvgHeight() + ")")


			}

		},

		_setYTickTextSize: function(){

		},

		_getYTickTitleSize: function(){
			return 100;
		},

		_setXTickTitleSize: function(){

		},

		_getXTickTitleSize: function(){
			return 0;
		},


		_getXTickSize: function(){
			//return this.getSvgHeight() - this.getLegendHeight();
			return - (this._getSvgHeight() - this._getXTickTitleSize());
		},


		_getYTickSize: function(){
			//return this.getSvgWidth() - this.getLegendWidth() - this.axisX0;
			return (this._getSvgWidth() - this._getYTickTitleSize());
		},

		_createYAxis: function(){
			if(NaruSecD3.isArray(this.yAxis)){
				for(var i = 0; i < this.yAxis.length; i++){
					if(i > 1) break; //max 2 yAxis

					var yAxis = this.yAxis[i];
					var chartOpt = this.chart;

					//set scale
					//if(chartOpt.dateFormat !== null){
					//	//yAxis.scale = d3.scaleTime();
					//}else

					if(yAxis.type === "ordinal"){
						//yAxis.scale = d3.scaleBand();
					}else if(yAxis.type === "linear"){
						yAxis.scale = d3.scaleLinear();
					}

					if(yAxis.scale !== null) {
						var yRange = this._getSvgHeight();
						console.log("yRange", yRange)
						yAxis.scale.range([yRange, 0]);
					}

					//position
					if(yAxis.position === "top"){
						yAxis.axis = d3.axisTop(yAxis.scale);
						yAxis.axisMark = d3.axisTop(yAxis.scale);
					}else if(yAxis.position === "right"){
						yAxis.axis = d3.axisRight(yAxis.scale);
						yAxis.axisMark = d3.axisRight(yAxis.scale);
					}else if(yAxis.position === "left"){
						yAxis.axis = d3.axisLeft(yAxis.scale);
						yAxis.axisMark = d3.axisLeft(yAxis.scale);
					}else if(yAxis.position === "bottom"){
						yAxis.axis = d3.axisBottom(yAxis.scale);
						yAxis.axisMark = d3.axisBottom(yAxis.scale);
					}

					if(yAxis.axis === null){
						throw new Error("error y axis");
					}

					//yAxis.axis.tickSize(-this._getXTickSize());

					//if(chartOpt.dateFormat !== null){
					//	yAxis.axis.tickFormat(this._getMultiFormat);
					//}


					var drawer = this._getDrawer();
					var yAxisClass = yAxis.className;
					drawer.append("g")
						.attr("class", yAxisClass);

					drawer.append("g")
						.attr("class", yAxisClass+" mark");



				}

				
			}
		},

		//_updateXAxis: function(){
		//
		//},
		//
		//_updateYAxis: function(){
		//
		//},

		_getSvgWidth: function(){
			return this.chart.width;
		},

		_getSvgHeight: function(){
			return this.chart.height;
		},


		_setSvgSize: function(width, height){
			var chartOpt = this.chart;
			var chartId = chartOpt.chartId;

			//this.svgWidth = width - (chartOpt.margin.left + chartOpt.margin.right + this.axisX0);
			chartOpt.width = width - (chartOpt.margin.left + chartOpt.margin.right);
			chartOpt.height = height - (chartOpt.margin.top + chartOpt.margin.bottom);

			console.log("svg ---", width, height);
			console.log(d3.select("#" + chartId).select("svg").size());
			d3.select("#" + chartId).select("svg")
//				.attr("width", "100%")
//				.attr("height", "100%");
				.attr("width", width)
				.attr("height", height);
		},

		/**
		 * user margin
		 * @param margin
		 * @private
		 */
		_setSvgMargin: function(margin){
			var chartOpt = this.chart;
			if (margin !== null && margin !== undefined) {
				chartOpt.margin.top = NaruSecD3.isNumber(margin.top) ? 0 : Number(margin.top);
				chartOpt.margin.right = NaruSecD3.isNumber(margin.right) ? 0 : Number(margin.right);
				chartOpt.margin.bottom = NaruSecD3.isNumber(margin.bottom) ? 0 : Number(margin.bottom);
				chartOpt.margin.left = NaruSecD3.isNumber(margin.left) ? 0 : Number(margin.left);
			}
		},

		_createSvg: function(){
			//this.chart = {
			//	chartId: null,
			//	width: 0,
			//	height: 0,
			//	margin:{
			//		top: 0,
			//		left: 0,
			//		right: 0,
			//		bottom: 0
			//	},
			//	dateFormat: null,
			//	data: null,
			//	debugMode: true
			//};
			//
			var chartOpt = this.chart;
			var chartId = chartOpt.chartId;

			var graphLayer = d3.select("#" + chartId);
			var clientRect = graphLayer.node().getBoundingClientRect();

			graphLayer.select("svg").html("");
			var objSvg = graphLayer.append("svg").attr("class", "naru-d3-svg");
			console.log("create svg size", graphLayer.size(), clientRect);
			this._setSvgSize(clientRect.width, clientRect.height);

			//var objTemp = objSvg.append("g").attr("class", "naru-graph").attr("transform", "translate(" + (chartOpt.margin.left + this.axisX0 ) + "," + chartOpt.margin.top + ")");
			var drawer = objSvg.append("g").attr("class", "naru-graph")
							.attr("transform", "translate(" + (chartOpt.margin.left) + "," + chartOpt.margin.top + ")");
			this._setDrawer(drawer);
		},

		_setDrawer: function(drawer){
			this._getDrawer = function(){
				return drawer ? drawer:null;
			};
		},

		_getDrawer: function(){
			return null;
		},

		_catchError: function(e){
			if (this.chart.debugMode) {
				console.log("[chartId: "+this.chart.chartId+"] - d3 " + e);
			}
		},

		_getXAxisValue: function(){
			console.log(this.xAxis);
			return this.xAxis[0].value;
		},

		_getYAxisValue: function(i){
			return i > 1 ? null:this.yAxis[i].value;
		},

		//TODO exception
		_getXAxisScale: function(){
			return this.xAxis[0].scale;
		},

		//TODO exception
		_getYAxisScale: function(i){
			return this.yAxis[i].scale;
		},

		_createLine: function(objGraph, index){
			var drawer = this._getDrawer();
			var lineLayer = drawer.select(".line-layer.g_"+index);

			if(lineLayer.size() === 0){
				lineLayer = drawer.append("g").attr("class", "line-layer g_"+index);
			}

			return function(){
				var dateFormat = this.chart.dateFormat;
				var xValue = this._getXAxisValue();
				var yValue = objGraph.value;//this._getYAxisValue(index);
				var color = objGraph.color;
				console.log("--------------xValue", xValue, "yValue",yValue, color);

				var objD3 = this;
				var line = d3.line()
					.x(function(d){
						var xData = d[xValue];
						if(dateFormat !== null){
							xData = NaruSecD3.getTimeDate(dateFormat, xData);
						}
						console.log("line--------", objD3._getXAxisScale().bandwidth());
						return objD3._getXAxisScale()(xData) + (objD3._getXAxisScale().bandwidth() / 2);
					})
					.y(function(d){
						var yData = d[yValue];
						return objD3._getYAxisScale(index)(yData);
					});

				var objLine = lineLayer.select(".line");
				if(objLine.size() === 0){
					lineLayer
						.append("path")
						.attr("class", "line")
						.style("stroke-width", 2)
						.style("stroke", color);
					//.style("stroke", objD3.getGraphColor(color));
					//d3.rgb(lineColor));

					//objLine = lineLayer.select(".line");
				}




				var chartData = this.chart.data;

				 objLine
					 .datum(chartData)
					 .attr("d", line);

				 var circleTemp = lineLayer.selectAll("circle").data(chartData);

				 circleTemp.exit().remove();

				 var circle = circleTemp.enter()
					 .append("circle")
					 .merge(circleTemp)
					 .attr("class", "lineChart--circle")
					 .attr("r", 2)
					 //.style("stroke", objD3.getGraphColor(color))
					 .style("stroke", color)
					 .attr("fill", "#fff")
					 .style("stroke-width", 1)
					 .attr("cx", function(d) {
						 var xData = d[xValue];
						 if(dateFormat !== null){
							 console.log((dateFormat));//,",", d,",", xValue)
							 xData = NaruSecD3.getTimeDate(dateFormat, xData);
						 }
						 console.log(d, xData, objD3._getXAxisScale()(xData), objD3._getXAxisScale().bandwidth() / 2)
						 return objD3._getXAxisScale()(xData) + (objD3._getXAxisScale().bandwidth() / 2);
					 })
					 .attr("cy", function(d) {
						 var yData = d[yValue];
						 return objD3._getYAxisScale(index)(yData);
					 });

					 //if(opt.balloon && circle !== null){
					 //   if(balloonText) opt.balloon.value = balloonText;
					 //
					 //   opt.balloon.dateFormat = dateFormat;
					 //   opt.balloon.color = color;
					 //   objD3._createBalloon(circle, opt.balloon, "circle");
					 //}

			};

		}
	};
}();


NaruSecD3.createGraph = function(opt, data){
	var objD3 = new NaruSecD3();
	if(!objD3.setOption(opt)) return;

	objD3._createSvg();
	objD3._createXAxis();
	objD3._createYAxis();

	for(var i = 0; i < objD3.graph.length; i++){
		var objGraph = objD3.graph[i];
		if(objGraph.type === "line"){
			objGraph.draw = objD3._createLine(objGraph, i);
		}
	}

	if(data){
		this.setData(data);
	}

	return {
		setData: function(){
			return objD3.setData.apply(objD3, arguments);
		}
	}
};


NaruSecD3.isValid = function(param){
	return param ? true:false;
};


NaruSecD3.isArray = function(data){
	return data && Array.isArray(data) && data.length > 0 ? true:false;
};

NaruSecD3.isObject = function(data){
	return data && Object.keys(data).length > 0 ? true:false;
};

NaruSecD3.isNumber = function(data){
	return !(data === null || data === undefined || isNaN(data));
};


NaruSecD3.getTimeFormat = function(fmt){
	if(!fmt) fmt = "%Y-%m-%d";
	return d3.timeFormat(fmt);
};

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