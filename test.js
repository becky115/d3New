/**
 * Created by eunjilee on 2017. 1. 5..
 */
function callData(){
	var data = {};
	data.dateList = [{"count":4, "date": "20161230"},
		{"count":5, "date":"20171231"},
		{"count":10, "date":"20170101"},
		{"count":2, "date":"20170102"},
		{"count":1, "date":"20170103"},
		{"count":100, "date":"20170104"},
		{"count":3, "date":"20170105"},
		{"count":20, "date":"20170106"},
		{"count":30, "date":"20170107"}
	];
	return data;
}

$(function() {
	console.log( "ready!" );
	var data = callData();
	temp.drawBarChart(data);
	temp.drawLineChart(data);
});

var temp = {
	chartId:"aa",
	chartId2:"bb",
	drawBarChart: function(dataSet){
		var dataList = dataSet.dateList;

		var chartOpt = {
			id: this.chartId,
			x:{
				"value": "date",
			},
			y:{
				"title": "CQ 수",
				"value": "count",
			},
			balloon:{
					"value":"[[date]]: [[count]]개"
			},
			animation:{
				duration: 1000
			},
			legend:{
				position: "bottom"
			},
			radius:3
		};

		var objD3 = NaruSecD3Js.createBarGraph(chartOpt, dataList);

	},
	drawLineChart: function(dataSet){
		var dataList = dataSet.dateList;

		var chartOpt = {
			id: this.chartId2,
			x:{
				"value": "date",
			},
			y:{
				"title": "CQ 수",
				"value": "count",
			},
			balloon:{
				"value":"[[date]]: [[count]]개"
			},
			animation:{
				duration: 1000,
			},
			legend:{
				position: "bottom"
			}
		};

		var objD3 = NaruSecD3Js.createLineGraph(chartOpt, dataList);
	}
}
