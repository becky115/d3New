/**
 * Created by eunjilee on 2017. 6. 13..
 */


window.onload = function(){
	test();
};


function test(){
	var chartOpt = {
		"chartId":"multiLineGraph1",
		"dateFormat":"%Y-%m-%d",
		"graph":[{
			"type": "line",
			"color": "#7764E7",
			"value":"count1",
		},{
			"type": "line",
			"color":"#1DBC3D",
			"value":"count2",
		}],
		"xAxis":{
			"value":"date"
		},
		//"yAxis":[{
		//	"value":"count1",
		//	"title":"title1"
		//},{
		//	"value":"count2",
		//	"title":"title2"
		//}],
		"yAxis":[{
			"value":"count1",
			"title":"title1"
		}]
	};

	var chartData = [{
			"date": "2017-06-01",
			"count1": 5,
			"count2": 6
		},{
			"date": "2017-06-02",
			"count1": 5,
			"count2": 6
		},{
			"date": "2017-06-03",
			"count1": 5,
			"count2": 6
		},{
			"date": "2017-06-04",
			"count1": 5,
			"count2": 6
		},{
			"date": "2017-06-05",
			"count1": 5,
			"count2": 6
		},{
			"date": "2017-06-06",
			"count1": 5,
			"count2": 6
		},{
			"date": "2017-06-07",
			"count1": 5,
			"count2": 6
		}, {
			"date": "2017-06-08",
			"count1": 5,
			"count2": 6
		}
	];

	var chart = NaruSecD3.createGraph(chartOpt);
	chart.setData(chartData);
}