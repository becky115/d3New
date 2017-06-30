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
			
			//_setGraph
			this.graph = [{
				type: "bar",//default
				color: NaruSecD3.getColor(0),
				value: null,
				balloonText: null,
				node: null,
				colorField: null,
				guideLine: null
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
					
					if((NaruSecD3.isObject(graphOpt) && graphOpt.type === "treemap")){
						this.xAxis = null;
						this.yAxis = null;
					}
					
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
			if(this.xAxis === null) return;
			var defaultOpt = [];
			defaultOpt.push(this.xAxis[0]);
			
			this.xAxis = [];
			var objThis = this;
			if(NaruSecD3.isArray(xAxisOpt)){
				for(var i = 0; i < xAxisOpt.length; i++){
					_setOption(xAxisOpt[i]);
					if(i > 0) break; //max 1 xAxis
				}
				//	console.log("result", this.xAxis);
			}else if(NaruSecD3.isObject(xAxisOpt)){
				console.log("xAxisOpt", xAxisOpt);
				_setOption(xAxisOpt, 0);
			}else{
				// default xAxis only 1;
				this.xAxis.push(defaultOpt[0]);
				//throw new Error("xAxis option error", xAxisOpt);
			}
			
			function _setOption(opt, index){
				var tempOpt = JSON.parse(JSON.stringify(defaultOpt[index]));
				
				if(opt.hasOwnProperty("position")){
					tempOpt.position = opt.position;
				}

				if(opt.hasOwnProperty("value")){
					tempOpt.value = opt.value;
				}

				
				//console.log(tempOpt);
				
				//return;
				objThis.xAxis.push(tempOpt);
				console.log(objThis.xAxis);
				
			}
		},
		
		_setYAxis: function(yAxisOpt){
			if(this.yAxis === null) return;
			
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
				_setOption(yAxisOpt, 0);
			}else{
				// default yAxis only 1;
				this.yAxis.push(defaultOpt[0]);
				//throw new Error("yAxis option error", yAxisOpt);
			}
			
			function _setOption(opt, index){
				//console.log("defaultOpt", defaultOpt)
				var tempOpt = JSON.parse(JSON.stringify(defaultOpt[index]));
				
				if(opt.hasOwnProperty("position")){
					tempOpt.position = opt.position;
				}
				//
				// if(opt.hasOwnProperty("value")){ -->graph
				// 	tempOpt.value = opt.value;
				// }
				
				objThis.yAxis.push(tempOpt);
			}
		},
		
		_drawXAxis: function(){
			if(this.xAxis === null) return;
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
			if(this.yAxis === null) return;
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
			if(this.xAxis !== null) {
				var dateFormat = this.chart.dateFormat;
				var xValue = this._getXAxisValue();
				var chartData = this.chart.data;
		
				if(this.xAxis[0].type === "linear"){
					this.xAxis[0].scale.domain(
						d3.extent(chartData, function(d) {
							return d[xValue];
						})
					).nice();
				}else{
					var data = chartData.map(function (d) {
						//console.log(dateFormat);
						if (dateFormat) {
							return NaruSecD3.getTimeDate(dateFormat, d[xValue]);
						}
						return d[xValue];
					});
					this.xAxis[0].scale.domain(data);
				}
				
				
		
				console.log("_setXDomain", chartData);
				//
				
		
				
				console.log("========>>>>>" + this.xAxis[0].scale.domain()[0], this.xAxis[0].scale.domain()[1]);
			}
		},
		
		_setYDomain: function(){
			var yMinValue = 0; //default 0; //TODO 나중 -값 처리
			
			if(this.yAxis !== null){
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
					
					console.log(i, "yMinValue, yMaxValue", yMinValue, yMaxValue);
					if(NaruSecD3.isNumber(yMinValue) && NaruSecD3.isNumber(yMaxValue)){
						//console.log(this.yAxis[i]);
						
						this.yAxis[i].scale.domain([yMinValue, yMaxValue]);
//					console.log("-- ", i, this.yAxis[i].scale(yMinValue));
					}
					
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
					
					// var graphFunction = this.graph[i].setData;
					// if(graphFunction !== null && typeof graphFunction === "function"){
					//
					// }
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
				
				if(opt.hasOwnProperty("node")) {
					tempOpt.node = opt.node;
				}
				
				
				if(opt.hasOwnProperty("colorField")) {
					tempOpt.colorField = opt.colorField;
				}
				
				if(opt.hasOwnProperty("guideLine")){
					tempOpt.guideLine = opt.guideLine;
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
			
			console.log("===", this.xAxis, NaruSecD3.isArray(this.xAxis));
			if(NaruSecD3.isArray(this.xAxis)){
				var xAxis = this.xAxis[0];
				var chartOpt = this.chart;
				//console.log(this.xAxis[0]);
				
				//set scale
				if(chartOpt.dateFormat !== null){
					xAxis.type = "ordinal";
				}
				
				if(xAxis.type === "ordinal"){
					xAxis.scale = d3.scaleBand();
				}else if(xAxis.type === "linear"){
					xAxis.scale = d3.scaleLinear();
				}
				
				
				if(xAxis.scale !== null){
					var xRange = this._getYTickSize();
					// console.log(xAxis.scale)
					 console.log("xRange", xRange);
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
		
		// _setYTickTextSize: function(){
		//
		// },
		
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
				console.log("[chartId: "+this.chart.chartId+"] - d3 " + e.stack);
			}
		},
		
		_getXAxisValue: function(){
			//console.log(this.xAxis);
			return this.xAxis[0].value;
		},
		
		// _getYAxisValue: function(i){
		// 	return !NaruSecD3.isNumber(i) || i > 1 ? this.yAxis[0].value:this.yAxis[i].value;
		// },
		//
		//TODO exception
		_getXAxisScale: function(){
			return this.xAxis[0].scale;
		},
		
		//TODO exception
		_getYAxisScale: function(i){
			return !NaruSecD3.isNumber(i) || i > 1 ? this.yAxis[0].scale:this.yAxis[i].scale;
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
					var balloonOpt = {
						"type": "circle",
						"value": balloonText
					};
					this._createBalloon(circle, balloonOpt);
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
				var yValue = objGraph.value;
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
				var barClassName = "bar";
				if(chartData.length === 0){
					barLayer.selectAll("." + barClassName).remove();
					//	return null;
				}
				
				var objBars = barLayer.selectAll("." + barClassName)
					.data(chartData);
				
				objBars.exit().remove();
				
				objBars.enter()
					.append("rect")
					.merge(objBars)
					.attr("class", barClassName);
				
				objBars = barLayer.selectAll("." + barClassName);
				
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
					console.log(xValue, xData, outer, objD3._getXAxisScale()(xData));
					return objD3._getXAxisScale()(xData) + outer;
				}).attr("width", barWidth);
				
				//console.log("animation", animation, Object.keys(animation).length)
				if(animation && Object.keys(animation).length > 0){
					//transition
					objBars
						.attr("y", function(){
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
					var balloonOpt = {
						"type": "treemap",
						"value": balloonText
					};
					this._createBalloon(objBars, balloonOpt);
				}
				
			};
			
		},
		
		_createTreeMap: function(objGraph){
			var drawer = this._getDrawer();
			var treeLayer = drawer.select(".tree-layer");
			
			if(treeLayer.size() === 0) {
				treeLayer = drawer.append("g")
					.attr("class", "tree-layer");
			}
			
			var treemap = d3.treemap()
				.tile(d3.treemapResquarify)
				.round(true)
				.paddingInner(0);
			
			return function() {
				var nodeName = objGraph.node.name;
				var nodeValue = objGraph.node.value;
				var nodeSort = objGraph.node.sort;
				var nodeText = objGraph.node.text;
				var colorField = objGraph.colorField;
				var color = objGraph.color;
				var balloonText = objGraph.balloonText;
				
				
				var chartData = this.chart.data;
				
				if(chartData.length === 0){
					treeLayer.selectAll(".tree").remove();
					//return null;
				}
				
				
				var dataNest = d3.nest()
					.key(function(d){
						//console.log(d, d[nodeName]);
						return d[nodeName];
					});
				
				var dataTemp = dataNest.entries(chartData);
				
				var root = d3.hierarchy({"values":dataTemp}, function(d) {
					return d.values;
				})
				.sum(function(d){
					return d[nodeValue];
				})
				.sort(function(a, b) {
					return nodeSort && nodeSort === "desc" ? (b.value - a.value):(a.value - b.value);
				});
				
				treemap.size([this._getSvgWidth(), this._getSvgHeight()]);
				//var treeData = treemap(root).leaves();
				var treeData = treemap(root).descendants();
				var objTempTrees = treeLayer.selectAll(".tree")
					.data(treeData);
				objTempTrees.exit().remove();
				
				var objTrees = objTempTrees.enter()
					.append("g")
					.merge(objTempTrees)
					.attr("class", "tree")
					.attr("fill", function(d) { //tooltip에서 사용
						if(colorField !== null && NaruSecD3.isValid(d.data[colorField])){
							color = d.data[colorField];
						}
						//console.log(colorField, d.data[colorField]);
						
						return color;
					});
				
				objTrees.selectAll("rect").remove();
				objTrees.selectAll("clipPath").remove();
				objTrees.selectAll("text").remove();
				
				objTrees
					.append("rect")
					.attr("id", function(d, i) {
						return "tree-rect-" + i;
					})
					.attr("fill", function(d) {
						if(colorField !== null && NaruSecD3.isValid(d.data[colorField])){
							color = d.data[colorField];
						}
						//console.log(colorField, d.data[colorField]);
						
						return color;
					})
					.attr("class", function(d) {
						return "node level-" + d.depth;
					});
				
				objTrees
					.append("clipPath")
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
					});
				
				objTrees
					.attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
					.select("rect")
					.attr("width", function(d) {
						return d.x1 - d.x0;
					})
					.attr("height", function(d) {
						return d.y1 - d.y0;
					});
				
				
				var xTspanPos = 2;
				objTrees
					.select("text")
					.call(function(text){
					//.call(function(text, width){
						text.each(function (d) {
							var textTemp = d3.select(this);
							//console.log("nodeTemp", d);
							
							var rectWidth = d.x1 - d.x0;
							var rectHeight = d.y1 - d.y0;
							
							var firstOpacity = 1;
							if(nodeText && Array.isArray(nodeText) && nodeText.length > 0){
								for(var j=0; j<nodeText.length; j++){
									var tspan = textTemp.append("tspan")
										.text(function(d) {
											return d.data[nodeText[j]];
										})
										.attr("x", xTspanPos)
										.attr("y", function(){
											//var clientRect = d3.select(this).node().getBoundingClientRect();
											return 10 * (j + 1);
										});
									
									//console.log(j, tspan.size());
									firstOpacity = setTspanStyle(tspan, rectWidth, rectHeight, firstOpacity);
										
								
								}
								
							}else{
								textTemp.append("tspan")
									.text(function(d) {
										return d.data[nodeValue];
									})
									.attr("x", xTspanPos)
									.attr("y", 10);
								
								setTspanStyle(textTemp, rectWidth, rectHeight, firstOpacity);
							}
							
						});
					});
				
					function setTspanStyle(tspan, rectWidth, rectHeight, firstOpacity){
						tspan.attr("fill", function(d) {
							//console.log("fill1", d.data)
							if(colorField !== null){
								color = d.data[colorField];
							}
							
							return "#000";//d3.rgb(color).darker(0.9)
						})
						.style("opacity", function(){
							// var test = d3.select(this).node().parentNode;
							// var test2 = d3.select(test).node().parentNode;
							// var rect = d3.select(test2).select("rect");
							//
							// console.log(rect.attr("id") )
							// if(rect.attr("id") === "tree-rect-34"){
							// 	//console.log(d3.select(test2).select("rect").attr("id"));
							// 	console.log("rectHeight", rectHeight);
							//
							// 	console.log("y",d3.select(this).attr("y"),
							// 		"height",d3.select(this).node().getBoundingClientRect().height,
							// 		"rectHeight",d3.select(this).node().getBoundingClientRect().height,
							// 		"text", d3.select(this).text(),
							// 		"rectWidth", rectWidth,
							// 		"comu", d3.select(this).node().getComputedTextLength())
							// }
							//x위치 빼기
							
							if((firstOpacity === 0 ) || //첫번쨰 tspan이 0이거나
								(rectWidth - xTspanPos < d3.select(this).node().getComputedTextLength()) || //text길이체크
								(rectHeight <= d3.select(this).attr("y") )){ //y축 길이 체크
								firstOpacity = 0;
								return 0;
							}else{
								return 1;
							}
						});
						
						return firstOpacity;
						// if(rectWidth < nodeTemp.node().getComputedTextLength()){
						// 	nodeTemp.style("opacity", 0);
						// }
						
					}
				
				console.log("balloonText", balloonText);
				if(balloonText !== null && objTrees !== null){
					var balloonOpt = {
						"type": "treemap",
						"value": balloonText
					};
					this._createBalloon(objTrees, balloonOpt);
				}
				
			};
		},
		
		
		_createScatterPlot: function(objGraph){
			var drawer = this._getDrawer();
			
			var scatterLayer = drawer.select(".scatter-layer");
			if(scatterLayer.size() === 0){
				scatterLayer = drawer.append("g")
					.attr("class", "scatter-layer")
					.attr("transform", "translate("+this._getYTickTitleSize()+"," + 0 + ")");
			}
			
			var guideLine = objGraph.guideLine;
			if(guideLine !== null){
				var guideBorder = guideLine.color ? guideLine.color:"#FF0000";
				drawer.append("line")
					.attr("class", "guide-line")
					.attr("stroke-width", 1)
					.attr("stroke-dasharray", 2)
					.attr("stroke", guideBorder);
			}
			
			return function(){
				var colorField = objGraph.colorField;
				var color = objGraph.color;
				var xValue = this._getXAxisValue();
				var yValue = objGraph.value;
				var balloonText = objGraph.balloonText;
				
				var objD3 = this;
				var chartData = this.chart.data;
				var scatterClassName = "scatter-circle";
				if(chartData.length === 0){
					scatterLayer.selectAll("." + scatterClassName).remove();
				//	return null;
				}
				
				console.log("guideLine", guideLine);
				if(guideLine !== null){
					console.log("###")
					var guideX = guideLine.value;
				
					if(NaruSecD3.isNumber(guideX) && chartData.length > 0){
						drawer.select(".guide-line").attr("x1", objD3._getXAxisScale()(guideX))
							.attr("y1", objD3._getYAxisScale()(0))
							.attr("x2", objD3._getXAxisScale()(guideX))
							.attr("y2", objD3._getYAxisScale()(0));
						
						
						//TODO ????
						// drawer.select(".x.axis").selectAll(".tick")
						// 	.filter(function (d) {
						// 		return d === 0;
						// 	})
						// 	.select("line")
						// 	.attr("opacity", 0);
					}
				}
				
				
				var objCircles = scatterLayer.selectAll("." + scatterClassName)
					.data(chartData);
				
				objCircles.exit().remove();
				
				objCircles.enter()
					.append("circle")
					.merge(objCircles)
					.attr("class", scatterClassName);
				
				objCircles = scatterLayer.selectAll("." + scatterClassName);
				
				objCircles.attr("fill", function(d){
					//console.log("colorField", colorField, d)
					if(colorField !== null && NaruSecD3.isValid(d[colorField])){
						color = d[colorField];
					}
					//console.log(colorField, d.data[colorField]);
					
					return color;
				});
				
				console.log("xValue", xValue, "yValue", yValue);
				
				var minRCircle = 3;
				var maxRCircle = 10;
				//objD3.rScale = objD3.circleX0ScaleOutputRange(minRCircle, maxRCircle);
				
				var rScale = objD3._getXAxisScale().copy().range([minRCircle, maxRCircle]);
				objCircles.attr('r', 0)
					.transition()
					.duration(100)
					.attr("r", function(d){
					//	console.log("rScale(d[xValue])", rScale(d[xValue]));
						return rScale(d[xValue]);
						
					})
					.attr("cx", function(d) {
						//console.log("_getXAxisScale", d[xValue], objD3._getXAxisScale()(d[xValue]));
						return objD3._getXAxisScale()(d[xValue]);
					})
					.attr("cy", function(d) {
						//console.log("_getYAxisScale", d[yValue], objD3._getYAxisScale()(d[yValue]));
						return objD3._getYAxisScale()(d[yValue]);
					});
				
				
//				console.log(balloonText, objCircles);
				if(balloonText !== null && objCircles !== null){
					var balloonOpt = {
						"type": "circle",
						"value": balloonText
					};
					this._createBalloon(objCircles, balloonOpt);
				}
			
			};
			
			
			
			
			
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
		
		createToolTip: function(optBalloon){
			var chartId = this.chart.chartId;
			var objChart = d3.select("#"+chartId);
			var divToolTip = objChart.select(".naru-d3-tooltip");
			if (divToolTip.size() === 0) {
				divToolTip = objChart.append("div").attr("class", "naru-d3-tooltip");
				divToolTip.append("span").attr("class", "content");
				divToolTip.append("span").attr("class", "arrow-line");
				divToolTip.append("span").attr("class", "arrow-middle");
			}
			
			var radius = parseInt(optBalloon.radius);
			if(!isNaN(radius)){
				divToolTip.style({
					"border-radius":radius > 10 ? 10+"px":radius+"px"
				});
			}
			
			return divToolTip;
		},
		
		_createBalloon: function(objOver, optBalloon){
			var objD3 = this;
			var chartId = this.chart.chartId;
			//tooltip
			var divToolTip = objD3.createToolTip(optBalloon);
			
			
			var type = optBalloon.type;
			var fmtText = optBalloon.value;
			//var dateFormat = optBalloon.dateFormat; //date origin format
			//var timeFormat = optBalloon.timeFormat; // change format
			var regexp = /[\[]{2}([^\]]+)[\]]{2}/g;
			
			objD3._getDrawer().on("mouseleave", function(){
				objD3.hideToolTip(divToolTip);
			});
			
			/**
			 * tooltip 좌표이동
			 * tooltip 왼쪽,오른쪽,위,아래인지 체크
			 * tooltip color변경(border)
			 * tooltip show
			 */
			objOver.on("mousemove.one", function() {//툴팁 좌표이동
				var clientPos = d3.select("#"+chartId).select("svg").node().getBoundingClientRect();
				console.log(d3.select(divToolTip));
				objD3.hideToolTip(divToolTip);
				
				var arrowLine = divToolTip.select(".arrow-line");
				var arrowClientRect = arrowLine.node().getBoundingClientRect();
				console.log("arrowClientRect", arrowClientRect.width, arrowClientRect.height);
				var toolTipContentWidth = parseInt(divToolTip.style("width"), 10);
				var toolTipContentHeight = parseInt(divToolTip.style("height"), 10);
				var toolTipArrowWidth = parseInt(arrowClientRect.width, 10) / 2;
				var toolTipArrowHeight = parseInt(arrowClientRect.height, 10) / 2;
				var toolTipWidth = toolTipContentWidth;
				var toolTipHeight = toolTipContentHeight + toolTipArrowHeight;
				
			
				
				console.log("toolTipArrowHeight", toolTipArrowWidth, toolTipArrowHeight);
				
				var limitMinX = 0;
				var limitMaxX = clientPos.width - toolTipWidth;
				var limitMinY = 0;
				var limitMaxY = clientPos.height - toolTipHeight;
				
				var posX = d3.event.clientX - clientPos.left - (toolTipWidth / 2);
				var posY = d3.event.clientY - clientPos.top - (toolTipHeight);
				
				console.log(d3.event.clientY, clientPos.top, (toolTipHeight));
				
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
					// if(objD3.getX0Value() === p1 && timeFormat){
					// 	if(dataMap[p1] instanceof Date){
					// 		return NaruSecD3.getTimeString(timeFormat, dataMap[p1]);
					// 	}
					// 	return NaruSecD3.getTimeString(timeFormat, NaruSecD3.getTimeDate(dateFormat, dataMap[p1]));
					// }
					return dataMap[p1] !== undefined && dataMap[p1] !== null ? dataMap[p1]:"";
				});
				
				divToolTip.select(".content").html(toolTipMessage);
				
				// var borderColor = "";
				// if(!d.color){//TODO colorField
				// 	borderColor = objD3.getGraphColor(fillColor, i, true);
				// }else{
				// 	borderColor = objD3.getGraphColor(d.color, i);
				// }
				//
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
				objOver.on("mouseout.one", function(){
					var obj = d3.select(this);
					// if(objD3.rScale){
					// 	obj.transition().duration(500)
					// 		.attr("r", function(d){
					// 			return objD3.rScale(d[objD3.getX0Value()]);
					// 		});
					// }else{
					// 	obj.transition().duration(500).attr("r", 2);
					// }
					
					var rSize = obj.attr("r");
					if(rSize === undefined) rSize = 2;
					obj.transition().duration(500).attr("r", rSize - 1);
				})
				.on("mouseover.one", function(d, i){
					var obj = d3.select(this);
					var color = d.color ? d.color:NaruSecD3.rgbToHex(d3.select(this).style("stroke"));
					
					mouseOverToolTip(color, i, d);
					
					// if(objD3.rScale){
					// 	obj.transition().duration(100)
					// 		.attr("r", function(d){
					// 			return objD3.rScale(d[objD3.getX0Value()]) + 1;
					// 		});
					// }else{
					// 	obj.transition().duration(100).attr("r", 3);
					// }
					
					var rSize = obj.attr("r");
					if(rSize === undefined) rSize = 3;
					obj.transition().duration(500).attr("r", rSize + 1);
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
						// var gradientUrl = "url(#gradient_"+objD3.chartId+"_";
						//
						// color = color.replace(gradientUrl, "").replace(')', "");
						// if(color) color = "#"+color;
					}
					mouseOverToolTip(color, i, d);
					obj.transition().duration(100).attr("r", 3);
				});
			}else if(type === "treemap"){
				//console.log("_createBalloon", type);
				objOver.on("mouseover.one", function(d, i){
					var obj = d3.select(this);
					var color = d.color;
					if(!color){
						color = obj.attr("fill");
						// var gradientUrl = "url(#gradient_"+objD3.chartId+"_";
						//
						// color = color.replace(gradientUrl, "").replace(')', "");
						// if(color) color = "#"+color;
					}
					mouseOverToolTip(color, i, d);
				});
			}
		},
		
		
		_createBalloonBBBB: function(objOver, type, balloonText){
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
				
				console.log("toolTipHeight", toolTipHeight);
				
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
			//var wordText = word;
			var replaceText = word;
			
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
		var yAxisIndex = objGraph.yAxisIndex === undefined || objGraph.yAxisIndex === null? 0:objGraph.yAxisIndex;
		if(objGraph.type === "line"){
			objGraph.draw = objD3._createLine(objGraph, i, yAxisIndex);
		}else if(objGraph.type === "bar"){
			objGraph.draw = objD3._createBar(objGraph, i, yAxisIndex);
		}else if(i === 0 && objGraph.type === "treemap"){
			objGraph.draw = objD3._createTreeMap(objGraph);
			break;
		}else if(i === 0 && objGraph.type === "scatter"){
			objGraph.draw = objD3._createScatterPlot(objGraph);
			break;
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