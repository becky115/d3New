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
		}]
	};

	NaruSecD3.createGraph(chartOpt);
}