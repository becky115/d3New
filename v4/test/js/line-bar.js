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
			"type": "bar",
			"color":"#1DBC3D",
			"value":"count2",
			"balloonText": "[[date]]:[[count2]]"
		},{
			"type": "line",
			"color": "#7764E7",
			"value":"count1",
			"balloonText": "[[date]]:[[count1]]"
		}],
		"xAxis":{
			"value":"date"
		},
		"yAxis2":[{
			"value":"count1",
			"title":"title1"
		},{
			"value":"count2",
			"title":"title2"
		}]
		, "yAxis":[{
			"title":"title1"
		}]
		, "balloon":{
			//"value":"[[x]]:[[y]]"
		}
	};

	var chartData = [{
			"date": "2017-06-01",
			"count1": 35,
			"count2": 35
		},{
			"date": "2017-06-02",
			"count1": 15,
			"count2": 6
		},{
			"date": "2017-06-03",
			"count1": 5,
			"count2": 8
		},{
			"date": "2017-06-04",
			"count1": 9,
			"count2": 6
		},{
			"date": "2017-06-05",
			"count1": 5,
			"count2": 3
		},{
			"date": "2017-06-06",
			"count1": 1,
			"count2": 6
		},{
			"date": "2017-06-07",
			"count1": 5,
			"count2": 1
		}, {
			"date": "2017-06-08",
			"count1": 4,
			"count2": 10
		}
	];

	var chart = NaruSecD3.createGraph(chartOpt);
	chart.setData(chartData);
}