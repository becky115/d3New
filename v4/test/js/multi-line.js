/**
 * Created by eunjilee on 2017. 6. 13..
 */


window.onload = function(){
	test();
};


function test(){
	var chartOpt = {
		"chartId":"multiLineGraph1",
		"graph":[{
			"type": "line",
			"color": "#7764E7"
		},{
			"type": "line",
			"color":"#1DBC3D"
		}],
		"xAxis":{

		},
		"yAxis":{

		}
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
	console.log(chart);
	chart.setData(chartData);
}