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
				margin:{
					top: 0,
					left: 0,
					right: 0,
					bottom: 0
				},
				dateFormat: null,
				data: null,
				debugMode: true
			};

			this.xAxis = [{
				position: "bottom",
				type: "linear"
			}];

			this.yAxis = [{
				position: "left",
				type: "linear"
			},{
				position: "right",
				type: "linear"
			}];

			this.graph = [{
				type: "bar",//default
				color: NaruSecD3.getColor(0)
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
			console.log("----_setXAxis", defaultOpt)

			this.xAxis = [];
			var objThis = this;
			if(NaruSecD3.isArray(xAxisOpt)){

				for(var i = 0; i < xAxisOpt.length; i++){
					_setOption(xAxisOpt[i]);
					if(i > 0) break; //max 1 xAxis
				}
				console.log("result", this.xAxis);
			}else if(NaruSecD3.isObject(xAxisOpt)){
				_setOption(xAxisOpt);

			}else{
				// default xAxis only 1;
				this.xAxis.push(defaultOpt[0]);
				//throw new Error("xAxis option error", xAxisOpt);
			}

			function _setOption(opt){
				//console.log("defaultOpt", defaultOpt)
				var tempOpt =  JSON.parse(JSON.stringify(defaultOpt));


				if(opt.hasOwnProperty("position")){
					tempOpt.position = opt.position;
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

		//user data
		setData: function(data){
			console.log("setData", data)
			if(this._validData(data)){
				this.chart.data = data;
			}

		},

		_validData: function(data){
			console.log(this)
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
				}

			}else{
				throw new Error("basic option error");
			}
		},

		_setGraph: function(graphOpt){
			var defaultOpt = this.graph[0];
			console.log("----", defaultOpt)
			this.graph = [];

			var objThis = this;
			if(NaruSecD3.isArray(graphOpt)){
				for(var i = 0; i < graphOpt.length; i++){
					_setOption(graphOpt[i]);
				}
				console.log("result", this.graph)
			}else if(NaruSecD3.isObject(graphOpt)){
				_setOption(graphOpt);

			}else{
				throw new Error("graph option error");
			}

			function _setOption(opt){
				//console.log("defaultOpt", defaultOpt)
				var tempOpt =  JSON.parse(JSON.stringify(defaultOpt));

				if(opt.hasOwnProperty("type")){
					tempOpt.type = opt.type;
				}

				if(opt.hasOwnProperty("color")){
					tempOpt.color = opt.color;
				}

				objThis.graph.push(tempOpt);

			}
		},

		_catchError: function(e) {
			if (this.chart.debugMode) {
				console.log("[chartId: "+this.chart.chartId+"] - d3 " + e);
			}
		}
	};
}();


NaruSecD3.createGraph = function(opt, data){
	console.log(this);
	//this.setOption(opt);
	//this.setData(data);

	var objD3 = new NaruSecD3();
	if(!objD3.setOption(opt)) return;
	console.log(objD3);
	console.log(objD3.setData)
	return {
		setData: function(){
			return objD3.setData.apply(objD3, arguments);
		}
	}

};


NaruSecD3.isValid = function(param){
	if(param){
		return true;
	}
	return false;
};


NaruSecD3.isArray = function(data){
	if(data && Array.isArray(data) && data.length > 0){
		return true;
	}
	return false;
};

NaruSecD3.isObject = function(data){
	if(data && Object.keys(data).length > 0){
		return true;
	}
	return false;
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