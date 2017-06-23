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
};

NaruSecD3.prototype = function () {
	var resizeEvent = {};
	
	return {
		_init: function(){
			//console.log("_init");
			this._initValue();
			this._initEvent();
		},
		
		_initEvent: function(){
			d3.select(window).on('resize.one', function () {
				var eventTemp = Object.keys(resizeEvent);
				for(var i= 0; i<eventTemp.length; i++){
					resizeEvent[eventTemp[i]]();
				}
			});
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
				value: null,
				balloonText: null
			}];
			
			this.legend = {
				width: 0,
				height: 0,
				position: "right" //default
			};
			
			this.balloon = {
				radius:0
			};
		},
		
		//user option
		setOption: function(opt){
			
			try{
				if(!NaruSecD3.isObject(opt)){
					//throw "chart opt" + opt;
					//TODO
					throw new Error("chart opt", opt);
				}else{
					var graphOpt = opt.graph;
					var xAxisOpt = opt.xAxis;
					var yAxisOpt = opt.yAxis;
					var balloonOpt = opt.balloon;
					delete opt.graph;
					
					this._setDefaultOption(opt);
					this._setGraph(graphOpt);
					this._setXAxis(xAxisOpt);
					this._setYAxis(yAxisOpt);
					
					this._setBalloon(balloonOpt);
				}
				
			}catch(e){
				this._catchError(e);
				return false;
			}
			
			return true;
		},
		
		_setBalloon: function(balloonOpt){
			if(NaruSecD3.isObject(balloonOpt)){
				if(balloonOpt.hasOwnProperty("radius") || NaruSecD3.isNumber(balloonOpt.radius)){
					//max 5;
					var maxRadius = 5;
					this.balloon.radius = parseInt(balloonOpt.radius) > maxRadius ? maxRadius:parseInt(balloonOpt.radius);
				}
			}
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
			//console.log("----_setYAxis", defaultOpt);
			
			this.yAxis = [];
			var objThis = this;
			if(NaruSecD3.isArray(yAxisOpt)){
				for(var i = 0; i < yAxisOpt.length; i++){
					if(i > 1) break; //max 2 yAxis
					_setOption(yAxisOpt[i], i);
				}
				//console.log("result", this.yAxis)
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
				var className = xAxis.className.replace(/\s/g, ".");
				
				var transX = this._getXPosition();
				var transY = -1 * (this._getXTickSize()+ this._getXTickTitleSize());
				//console.log("transY", transY);
				
				this._getDrawer().select("."+className+".mark")
					.attr("transform", "translate("+ transX +"," + transY + ")")
					.call(xAxis.axisMark.tickFormat(""));
				
				this._getDrawer().select("."+className)
					.attr("transform", "translate("+ transX +"," + transY + ")")
					.call(xAxis.axis.tickPadding(7));
			}
		},
		
		_drawYAxis: function(){
			for(var i=0; i<this.yAxis.length; i++){
				if(i > 1) break;
				
				var yAxis = this.yAxis[i];
				//console.log("drawy....", yAxis);
				var className = yAxis.className.replace(/\s/g, ".");
				
				if(i === 0){
					yAxis.axis
						.tickSize(-1  * (this._getYTickSize() ))
						.tickPadding(7);
				}
				
				var transX = this._getXPosition();
				var transY = 0;
				
				this._getDrawer().select("."+className+".mark")
					.attr("transform", "translate("+ transX +"," + transY + ")")
					.call(yAxis.axisMark.tickFormat(""));
				
				this._getDrawer().select("."+className)
					.attr("transform", "translate("+ transX +"," + transY + ")")
					.call(yAxis.axis);
				
			}
			
			//if(opt.y.title){
			//	yAxis.select(".y.title").attr("y", objD3.yTextPos(yAxis));
			//}
		},
		
		getYMaxDomain: function(dataCount){
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
			
			if(result === 0) result = 10;
			
			return result;
			
		},
		
		_setXDomain: function(){
			var dateFormat = this.chart.dateFormat;
			var xValue = this._getXAxisValue();
			var data = this.chart.data.map(function(d){
				//console.log(dateFormat);
				if(dateFormat){
					return NaruSecD3.getTimeDate(dateFormat, d[xValue]);
				}
				return d[xValue];
			});
			 //console.log("_setXDomain", data);
			this.xAxis[0].scale.domain(data);
		},
		
		_setYDomain: function(){
			var yMinValue = 0; //default 0; //TODO 나중 -값 처리
			for(var i=0; i<this.yAxis.length; i++){
				if(i > 1) break;
				
				
				var maxValue = null;
				for(var j=0; j<this.graph.length; j++){
					var graph = this.graph[j];
					
					if(graph.yAxisIndex === undefined){
						graph.yAxisIndex = 0;
					}
					
					if(graph.yAxisIndex === j){
						var temp = d3.max(this.chart.data, function(d){
							return d[graph.value];
						});
						
						if(maxValue === null || maxValue < temp){
							maxValue = temp;
						}
					}
				}
				
				var yMaxValue = this.getYMaxDomain(maxValue);
				
				//var yMaxValue = this.getYMaxDomain(value);
				
				
				
				
				
				
				
				
				if(NaruSecD3.isNumber(yMinValue) && NaruSecD3.isNumber(yMaxValue)){
					//console.log(this.yAxis[i]);
					
					this.yAxis[i].scale.domain([yMinValue, yMaxValue]);
//					console.log("-- ", i, this.yAxis[i].scale(yMinValue));
				}
				
			}
			
			
		},
		
		//user data
		setData: function(data){
			if(this._validData(data)){
				this.chart.data = data;
				//var chartData = this.chart.data;
				
				// x축 svgWidth 설정
				//this.setAxisWidth(yMaxDomain, yOpt, objLegend);
				
				
				this._setXDomain();//set x domain
				this._setYDomain();//set y domain
				
				this._drawXAxis();
				this._drawYAxis();
				
				
				for(var i=0; i<this.graph.length; i++){
					//console.log("############ graph draw i", i);
					this.graph[i].draw.apply(this, arguments);
				}
			}
		},
		
		_validData: function(data){
			//TODO 조건 추가
			return data !== undefined;
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
			//console.log("----", defaultOpt);
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
				
				if(opt.hasOwnProperty("balloonText")) {
					tempOpt.balloonText = opt.balloonText;
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
			
			//console.log("multiFormat", date);
			return (
				d3.timeSecond(date) < date ?
					formatMillisecond : d3.timeMinute(date) < date ?
					formatSecond : d3.timeHour(date) < date ?
					formatMinute : d3.timeDay(date) < date ?
					formatHour : d3.timeMonth(date) < date ?
					(d3.timeWeek(date) < date ?  formatDay : formatWeek) : d3.timeYear(date) < date ?
					formatMonth : formatYear
			)(date);
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
					.attr("class", xAxisClass);
					//.attr("transform", "translate(0," + this._getSvgHeight() + ")");
				
				drawer.append("g")
					.attr("class", xAxisClass+" mark")
					//.attr("transform", "translate(0," + this._getSvgHeight() + ")")
				
				
			}
			
		},
		
		_setYTickTextSize: function(){
		
		},
		
		_getYTickTitleSize: function(){
			
			//
			//
			// var leftY = 100;
			// var rightY = 100;
			//TODO tickTitle에 따라 계산
			return 100;
		},
		
		_setLegendWidth: function(){
			//	this.legend.width = d3.select(".legend....")
			// d3.select(".legend....").node().getBoundingClientRect().width, height;
		},
		
		_setLegendHeight: function(){
		
		},
		
		_getLegendWidth: function(){
			return this.legend.width; //test
		},
		
		_getLegendHeight: function(){
			return this.legend.height; //test
		},
		
		/**
		 * draw start posX
		 * @private
		 */
		_getXPosition: function(){
			if(this.legend.position === "left"){
				return this._getYTickTitleSize();
			}else if(this.legend.position  === "right"){
				return this._getLegendWidth() + this._getYTickTitleSize();
			}else{//top, bottom
				return this._getLegendWidth() + this._getYTickTitleSize();
			}
		},
		
		/**
		 * draw start posY
		 * @private
		 */
		_getYPosition: function(){
			if(this.legend.position === "top"){
				return this._getLegendHeight();
			}else if(this.legend.position  === "bottom"){
				return this._getSvgHeight() - this._getXTickTitleSize() - this._getLegendHeight();
			}else{//left, right
				return this.chart.margin.top;
			}
		},
		
		_getXTickTitleSize: function(){
			return 0;
		},
		
		_getXTickSize: function(){
			//return this.getSvgHeight() - this.getLegendHeight();
			
			var height = this._getSvgHeight() -
					(this._getXTickTitleSize()
					 + this._getLegendHeight()
					 + this.chart.margin.top
					+ this.chart.margin.bottom);
			
			return -1 * height;
		},
		
		
		_getYTickSize: function(){
			//return this.getSvgWidth() - this.getLegendWidth() - this.axisX0;
			return (this._getSvgWidth() - this._getYTickTitleSize());
		},
		
		_createYAxis: function(){
			if(NaruSecD3.isArray(this.yAxis)){
				for(var i = 0; i < this.yAxis.length; i++){
					//console.log("_createYAxis", i);
					if(i > 1) break; //max 2 yAxis
					
					var yAxis = this.yAxis[i];
					//var chartOpt = this.chart;
					
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
						var yRange = -1 * this._getXTickSize();
						//console.log("yRange", yRange);
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
			
			// console.log("svg ---", width, height);
			// console.log(d3.select("#" + chartId).select("svg").size());
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
			var chartOpt = this.chart;
			var chartId = chartOpt.chartId;
			
			var graphLayer = d3.select("#" + chartId);
			var clientRect = graphLayer.node().getBoundingClientRect();
			
			graphLayer.select("svg").html("");
			var objSvg = graphLayer.append("svg").attr("class", "naru-d3-svg");
			//console.log("create svg size", graphLayer.size(), clientRect);
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
			//console.log(this.xAxis);
			return this.xAxis[0].value;
		},
		
		_getYAxisValue: function(i){
			return i > 1 ? this.yAxis[0].value:this.yAxis[i].value;
		},
		
		//TODO exception
		_getXAxisScale: function(){
			return this.xAxis[0].scale;
		},
		
		//TODO exception
		_getYAxisScale: function(i){
			if(NaruSecD3.isValid(this.yAxis[i])){
			
			}
			return this.yAxis[i].scale;
		},
		
		_createLine: function(objGraph, graphIndex, yAxisIndex){
			//console.log("_createLine    graphIndex", graphIndex, "yAxisIndex", yAxisIndex);
			var drawer = this._getDrawer();
			var lineLayer = drawer.select(".line-layer.g_"+graphIndex);
			
			if(lineLayer.size() === 0){
				lineLayer = drawer.append("g")
					.attr("class", "line-layer g_"+graphIndex)
					.attr("transform", "translate("+this._getYTickTitleSize()+"," + 0 + ")");
			}
			
			return function(){
				var dateFormat = this.chart.dateFormat;
				var xValue = this._getXAxisValue();
				var yValue = objGraph.value;//this._getYAxisValue(index);
				var color = objGraph.color;
				var balloonText = objGraph.balloonText;
				//console.log("-----create line---------xValue", xValue, "yValue",yValue, color);
				
				var objD3 = this;
				var line = d3.line()
					.x(function(d){
						var xData = d[xValue];
						if(dateFormat !== null){
							xData = NaruSecD3.getTimeDate(dateFormat, xData);
						}
						//console.log("line--------", objD3._getXAxisScale().bandwidth());
						return objD3._getXAxisScale()(xData) + (objD3._getXAxisScale().bandwidth() / 2);
					})
					.y(function(d){
						var yData = d[yValue];
						return objD3._getYAxisScale(yAxisIndex)(yData);
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
					
					objLine = lineLayer.select(".line");
				}
				
				var chartData = this.chart.data;
				objLine.datum(chartData).attr("d", line);
				
				var circleTemp = lineLayer.selectAll("circle").data(chartData);
				circleTemp.exit().remove();
				
				var circle = circleTemp.enter()
					.append("circle")
					.merge(circleTemp)
					.attr("class", "lineChart--circle")
					.attr("r", 2)
					//.style("stroke", objD3.getGraphColor(color))
					.style("stroke", color)
					.attr("fill", "#ff4365")
					.style("stroke-width", 1)
					.attr("cx", function(d) {
						var xData = d[xValue];
						if(dateFormat !== null){
//							console.log((dateFormat));//,",", d,",", xValue)
							xData = NaruSecD3.getTimeDate(dateFormat, xData);
						}
//						console.log(d, xData, objD3._getXAxisScale()(xData), objD3._getXAxisScale().bandwidth() / 2);
						return objD3._getXAxisScale()(xData) + (objD3._getXAxisScale().bandwidth() / 2);
					})
					.attr("cy", function(d) {
						var yData = d[yValue];
						return objD3._getYAxisScale(yAxisIndex)(yData);
					});
				
				//TODO balloonText로 체크 함
				if(balloonText !== null && circle !== null){
					this._createBalloon(circle, "circle", balloonText);
				}
				//if(balloonText !&& circle !== null){
				//   if(balloonText) opt.balloon.value = balloonText;
				//
				//   opt.balloon.dateFormat = dateFormat;
				//   opt.balloon.color = color;
				//   objD3._createBalloon(circle, opt.balloon, "circle");
				//}
				
			};
			
		},
		
		_createBar: function(objGraph, graphIndex, yAxisIndex){
			var drawer = this._getDrawer();
			var barLayer = drawer.select(".bar-layer.g_"+graphIndex);
			
			if(barLayer.size() === 0){
				barLayer = drawer.append("g")
					.attr("class", "bar-layer g_"+graphIndex)
					.attr("transform", "translate("+this._getYTickTitleSize()+"," + 0 + ")");
			}
			
			return function(){
				var dateFormat = this.chart.dateFormat;
				var xValue = this._getXAxisValue();
				var yValue = objGraph.value;//this._getYAxisValue(index);
				var color = objGraph.color;
				var balloonText = objGraph.balloonText;
				
				//TODO
				//var radius = objGraph.radius;
				//var animation = this.chart.animation;
				var animation = {
					"duration": 1000
				};
				
				var objD3 = this;
				var chartData = this.chart.data;
				var objBars = barLayer.selectAll(".bar")
					.data(chartData);
				
				objBars.exit().remove();
				
				objBars.enter()
					.append("rect")
					.merge(objBars)
					.attr("class", "bar");
				
				objBars = barLayer.selectAll(".bar");
				
				/*TODO
				radius = parseInt(radius);
				if(!isNaN(radius)){
					objBars.attr("rx", radius)
						.attr("ry", radius);
				}
				*/
				
				// objBars.attr("fill", function(d, i) {
				// 	var color = d.color;
				// 	//var parentNode = d3.select(this).node().parentNode;
				// 	//return "url(#"+objD3.getGradientColor(color ? color:i)+")";
				// 	return color;
				// });
				objBars.attr("fill", color);
				
				var barWidth = objD3._getXAxisScale().bandwidth() * 3 / 4;
				var outer = (objD3._getXAxisScale().bandwidth() - barWidth) / 2;
				
				objBars.attr("x", function(d){
					var xData = d[xValue];
					if(dateFormat !== null){
						xData = NaruSecD3.getTimeDate(dateFormat, xData);
					}
					console.log(xValue, xData, outer, objD3._getXAxisScale()(xData))
					return objD3._getXAxisScale()(xData) + outer;
				}).attr("width", barWidth);
				
				//console.log("animation", animation, Object.keys(animation).length)
				if(animation && Object.keys(animation).length > 0){
					//transition
					objBars
						.attr("y", function(d){
							var maxDomain = objD3._getYAxisScale(yAxisIndex).domain()[0];
							return objD3._getYAxisScale(yAxisIndex)(maxDomain);
						})
						.attr("height", 0)
						.transition().duration(isNaN(parseInt(animation.duration)) ? 1000:parseInt(animation.duration))
						.attr("y", function(d){
							var yData = d[yValue];
							return objD3._getYAxisScale(yAxisIndex)(yData);
						})
						.attr("height", function(d){
							var yData = d[yValue];
							var maxDomain = objD3._getYAxisScale(yAxisIndex).domain()[0];
							return objD3._getYAxisScale(yAxisIndex)(maxDomain) - objD3._getYAxisScale(yAxisIndex)(yData);
						});
				}else{
					objBars.attr("y", function(d){
						var yData = d[yValue];
						return objD3._getYAxisScale(yAxisIndex)(yData);
					})
					.attr("height", function(d){
						var yData = d[yValue];
						var maxDomain = objD3._getYAxisScale(yAxisIndex).domain()[0];
						return objD3._getYAxisScale(yAxisIndex)(maxDomain) - objD3._getYAxisScale(yAxisIndex)(yData);
					});
				}
				
				if(balloonText !== null && objBars !== null){
					this._createBalloon(objBars, "rect", balloonText);
				}
				
				
				
				
				
				
				
				
				
				
				
				
			}
			
		},
		
		_getGraphColor: function(color, index, gradientFlag){
			//console.log("_getGraphColor", color, index, gradientFlag);
			gradientFlag = false;
			var chartId = this.chart.chartId;
			
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
				var gradientUrl = "url(#gradient_" + chartId + "_";
				color = color.replace(gradientUrl, "").replace(')', "");
				if(color) resultColor = "#"+color;
			}
			
			return d3.rgb(resultColor);
		
		},
		
		
		_createBalloon: function(objOver, type, balloonText){
			//console.log("_createBalloon", objOver, type, balloonText)
			var objD3 = this;
			var chartId = this.chart.chartId;
			
			var divToolTip = createToolTipLayer();
			var drawer = this._getDrawer();
			
			drawer.on("mouseleave", function(){
				objD3.hideToolTip(divToolTip);
			});
			
			var regexp = /[\[]{2}([^\]]+)[\]]{2}/g;
			
			/**
			 * tooltip 좌표이동
			 * tooltip 왼쪽,오른쪽,위,아래인지 체크
			 * tooltip color변경(border)
			 * tooltip show
			 */
			objOver.on("mousemove.one", function() {//툴팁 좌표이동
				var clientPos = d3.select("#"+chartId).select("svg").node().getBoundingClientRect();
				objD3.hideToolTip(divToolTip);
				
				var arrowLine = divToolTip.select(".arrow-line");
				var arrowMiddle = divToolTip.select(".arrow-middle");
				
				
				var arrowLinePos = arrowLine.node().getBoundingClientRect();
				var divToolTipPos = divToolTip.node().getBoundingClientRect();
				var toolTipContentWidth = parseInt(divToolTipPos.width, 10);
				var toolTipContentHeight = parseInt(divToolTipPos.height, 10);
				var toolTipArrowWidth = parseInt(arrowLinePos.width, 10) / 2;
				var toolTipArrowHeight = parseInt(arrowLinePos.height, 10) / 2;
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
		
				arrowLine.style({
					"top": null,
					"right": null,
					"left": null,
					"bottom": null
				});
			
				arrowMiddle.style({
					"top": null,
					"right": null,
					"left": null,
					"bottom": null
				});

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
						
						arrowLine.style("top", (d3.event.clientY - clientPos.top - posY)+"px");
						arrowMiddle.style("top", (d3.event.clientY - clientPos.top - posY)+"px");
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
				
				//var arrowLine = divToolTip.select(".arrow-line");
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
			
			
			
			//var dateFormat = this.chart.dateFormat;
			var xValue = this._getXAxisValue();
			/**
			 * tooltip set text
			 * tooltip color변경(border)
			 */
			function mouseOverToolTip(fillColor, i, d){
				var toolTipMessage = balloonText.replace(regexp, function(match, p1){//match, p1, p2, p3, offset, string
					var dataMap = d.data === undefined ? d:d.data;
					
					//console.log(xValue, dataMap[p1]);
					/*
					if(xValue === p1 && timeFormat){
						if(dataMap[p1] instanceof Date){
							return NaruSecD3.getTimeString(timeFormat, dataMap[p1]);
						}
						return NaruSecD3.getTimeString(timeFormat, NaruSecD3.getTimeDate(dateFormat, dataMap[p1]));
					}
					*/
					return dataMap[p1] !== undefined && dataMap[p1] !== null ? dataMap[p1]:"";
				});
				//console.log("toolTipMessage", toolTipMessage);
				divToolTip.select(".content").html(toolTipMessage);
				
				// var borderColor = "";
				// if(!d.color){//TODO colorField
				// 	borderColor = objD3.getGraphColor(fillColor, i, true);
				// }else{
				// 	borderColor = objD3.getGraphColor(d.color, i);
				// }
				
				var borderColor = objD3._getGraphColor(fillColor, i).darker(0.5);
				divToolTip.style("border", "2px solid "+ borderColor);
				
				return borderColor;
			}
			
			if(type === "rect" || type === "pie"){
				objOver.on("mouseover.one", function(d, i){
					var obj = d3.select(this);
					var color = d.color;
					if(!color){
						color = obj.attr("fill");
						// var gradientUrl = "url(#gradient_"+chartId+"_";
						//
						// color = color.replace(gradientUrl, "").replace(')', "");
						//if(color) color = "#"+color;
					}
					mouseOverToolTip(color, i, d);
				});
			}else if(type === "circle"){
				//console.log("type", type);
				objOver.on("mouseout.one", function(){
					var obj = d3.select(this);
					if(objD3.rScale){
						obj.transition().duration(500)
							.attr("r", function(d){
								return objD3.rScale(d[xValue]);
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
								return objD3.rScale(d[xValue]) + 1;
							});
					}else{
						obj.transition().duration(100).attr("r", 3);
					}
				});
			}else if(type === "force"){
				objOver.on("mouseout.one", function(){
					var obj = d3.select(this);
					obj.transition().duration(500).attr("r", 2);
				})
				.on("mouseover.one", function(d, i){
					var obj = d3.select(this);
					var color = d.color;
					if(!color){
						color = obj.attr("fill");
						var gradientUrl = "url(#gradient_" + chartId + "_";
						
						color = color.replace(gradientUrl, "").replace(')', "");
						if(color) color = "#"+color;
					}
					mouseOverToolTip(color, i, d);
					obj.transition().duration(100).attr("r", 3);
				});
			}else if(type === "treemap") {
				//console.log("_createBalloon", type);
				objOver.on("mouseover.one", function (d, i) {
					var obj = d3.select(this);
					var color = d.color;
					if (!color) {
						color = obj.attr("fill");
						var gradientUrl = "url(#gradient_" + chartId + "_";
						
						color = color.replace(gradientUrl, "").replace(')', "");
						if (color) color = "#" + color;
					}
					mouseOverToolTip(color, i, d);
				});
			}
			
			function createToolTipLayer(){
				var objChart = d3.select("#"+chartId);
				var toolTipClassName = "naru-d3-tooltip";
				var divToolTip = objChart.select("." + toolTipClassName);
				if (divToolTip.size() === 0) {
					divToolTip = objChart.append("div").attr("class", toolTipClassName);
					divToolTip.append("span").attr("class", "content");
					divToolTip.append("span").attr("class", "arrow-line");
					divToolTip.append("span").attr("class", "arrow-middle");
				}
				
				divToolTip.style({
					"border-radius":objD3.legend.radius+"px"
				});
				
				return divToolTip;
			}
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
		
		resize: function(){
			//console.log("resize");
			var chartId = this.chart.chartId;
			var objChart = d3.select("#" + chartId);
			
			var clientRect = objChart.node().getBoundingClientRect();
			var width = clientRect.width;
			var height = clientRect.height;
			
			this._setSvgSize(width, height);
			
			//outputRange
			//x range
			if(NaruSecD3.isArray(this.xAxis)) {
				var xAxis = this.xAxis[0];
				
				if(xAxis.scale !== null){
					var xRange = this._getYTickSize();
					xAxis.scale.range([0, xRange]);
				}
				
				xAxis.axis.tickSize(this._getXTickSize());
			}
			
			if(NaruSecD3.isArray(this.yAxis)) {
				for (var i = 0; i < this.yAxis.length; i++) {
					if(i > 1) break; //max 2 yAxis
					
					var yAxis = this.yAxis[i];
					
					if(yAxis.scale !== null) {
						var yRange = -1 * this._getXTickSize();
						yAxis.scale.range([yRange, 0]);
					}
				}
			}
			
			this._drawXAxis();
			this._drawYAxis();
			
			//dateFormat  checkTickDateText
		},
		
		addWindowResizeEvent: function(objLegend){
			var chartId = this.chart.chartId;
			//console.log("addWindowResizeEvent", chartId);
			
			var objD3 = this;
			function test() {
				//console.log("test resize", objD3, chartId);
				var objChart = d3.select("#" + chartId);
				if (objChart.size() === 0) {
					objD3.removeWindowResizeEvent();
					return;
				}
				
				var clientRect = objChart.node().getBoundingClientRect();
				var width = clientRect.width;
				var height = clientRect.height;
				
				
				if (width > 0 && height > 0) {
					objD3.resize();
					
					
					for (var i = 0; i < objD3.graph.length; i++) {
						objD3.graph[i].draw.apply(objD3, arguments);
					}
					//
					// if(objLegend && objLegend.hasOwnProperty("resize")){
					// 	objLegend.resize();
					// }
				}
			}
			
			//resizeEvent[chartId] = test.apply(this, arguments);
			
			resizeEvent[chartId] = test;
			
		
		},
		
		removeWindowResizeEvent: function () {
			var chartId = this.chart.chartId;
			if(chartId){
				if(Object.keys(resizeEvent).length > 0 && resizeEvent[chartId]){
					delete resizeEvent[chartId];
				}
			}else{
				resizeEvent = [];
			}
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
			
			var objTSpan = textTemp.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
			var dateTemp = NaruSecD3.getTimeDate(x0DateFormat, word);
			var wordText = word;
			var replaceText = wordText;
			
			if(checkTickDateLength(x0DateFormat, width)){
				var parentNode = objTSpan.node().parentNode;
				if(beforeDate !== null){
					var check = false;
					if(beforeDate.getFullYear() < dateTemp.getFullYear()){
						replaceText = NaruSecD3.getTimeString("%Y", dateTemp); //full year
						
						check = true;
					}else if(beforeDate.getMonth() < dateTemp.getMonth()){
						replaceText = NaruSecD3.getTimeString("%b", dateTemp);//short month
						check = true;
					}else{
						replaceText = NaruSecD3.getTimeString("%e", dateTemp);
						if(checkTickDateLength("%e", width)){
							replaceText = "";
						}
					}
					d3.select(parentNode).classed("tickText", check);
				}else{//first
					replaceText = NaruSecD3.getTimeString("%b", dateTemp); //default first short month;
					if(checkTickDateLength("%b", width)){
						replaceText = "";
					}else {
						d3.select(parentNode).classed("tickText", true);
					}
					
				}
			}
			objTSpan.text(replaceText);
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
		var yAxisIndex = objGraph.yAxisIndex === undefined || objGraph.yAxisIndex === null? 0:objGraph.yAxisIndex;
		if(objGraph.type === "line"){
			objGraph.draw = objD3._createLine(objGraph, i, yAxisIndex);
		}else if(objGraph.type === "bar"){
			objGraph.draw = objD3._createBar(objGraph, i, yAxisIndex);
		}
	}
	
	if(data){
		//초기에 setData 할 경우
		this.setData(data);
	}
	objD3.addWindowResizeEvent();
	
	return {
		setData: function(){
			return objD3.setData.apply(objD3, arguments);
		}
	}
};

d3.selection.prototype.trigger = function(eventName, data) {
	this.on(eventName)(data);
};

NaruSecD3.isValid = function(param){
	return !!param;
};


NaruSecD3.isArray = function(data){
	return !!(data && Array.isArray(data) && data.length > 0);
};

NaruSecD3.isObject = function(data){
	return !!(data && Object.keys(data).length > 0);
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
	if(typeof(index) === "string") index = parseInt(index, 10);
	
	var basicColor = this.getCateColor();
	
	var colorLength = basicColor.length;
	return basicColor[index%colorLength];
};

NaruSecD3.getCateColor = function(){
	return ["#3499E5", "#60BA53", "#F0C609", "#F29037", "#D3361E", "#AF5ADD", "#ADACAC", "#40C9FA", "#A9D50B", "#E5E907", "#D26014", "#BD4579", "#8000FF", "#998979", "#013ADF", "#088A4B", "#FEB305", "#B77C24", "#C94949" , "#B4045F", "#6E6E6E"];//파초노주빨보은;
};

NaruSecD3.rgbToHex = function(rgb){
	var hex = /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i.exec(rgb);
	return hex ? '#' + (1 << 24 | hex[1] << 16 | hex[2] << 8 | hex[3]).toString(16).substr(1) : rgb;
	
};