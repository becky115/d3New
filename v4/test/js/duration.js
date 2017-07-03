/**
 * Created by eunjilee on 2017. 7. 3..
 */

window.onload = function(){
	test();
};

function test(){
	
	
	
	var chartData = [
		{
			"reportStartTime": new Date("2017-06-30T01:15:38"),
			"reportEndTime": new Date("2017-06-30T09:18:41"),
			"duration": 28983.412094
		},
		{
			"reportStartTime": new Date("2017-06-30T01:15:38"),
			"reportEndTime": new Date("2017-06-30T09:18:41"),
			"duration": 28983.412094
		},
		{
			"reportStartTime": new Date("2017-06-29T00:31:32"),
			"reportEndTime": new Date("2017-06-29T09:00:35"),
			"duration": 30543.039348
		},
		{
			"reportStartTime": new Date("2017-06-29T00:31:32"),
			"reportEndTime": new Date("2017-06-29T09:00:35"),
			"duration": 30543.039348
		},
		{
			"reportStartTime": new Date("2017-06-28T03:20:46"),
			"reportEndTime": new Date("2017-06-28T09:05:03"),
			"duration": 20657.13323
		},
		{
			"reportStartTime": new Date("2017-06-28T03:20:46"),
			"reportEndTime": new Date("2017-06-28T09:05:03"),
			"duration": 20657.13323
		},
		{
			"reportStartTime": new Date("2017-06-27T00:19:34"),
			"reportEndTime": new Date("2017-06-27T00:31:29"),
			"duration": 715.075275
		},
		{
			"reportStartTime": new Date("2017-06-27T03:36:08"),
			"reportEndTime": new Date("2017-06-27T04:27:53"),
			"duration": 3105.992113
		},
		{
			"reportStartTime": new Date("2017-06-27T01:44:57"),
			"reportEndTime": new Date("2017-06-27T02:18:26"),
			"duration": 2009.387807
		},
		{
			"reportStartTime": new Date("2017-06-27T05:35:05"),
			"reportEndTime": new Date("2017-06-27T09:09:04"),
			"duration": 12839.721288
		},
		{
			"reportStartTime": new Date("2017-06-27T03:36:08"),
			"reportEndTime": new Date("2017-06-27T04:27:53"),
			"duration": 3105.992113
		},
		{
			"reportStartTime": new Date("2017-06-27T05:35:05"),
			"reportEndTime": new Date("2017-06-27T09:09:04"),
			"duration": 12839.721288
		},
		{
			"reportStartTime": new Date("2017-06-27T01:44:57"),
			"reportEndTime": new Date("2017-06-27T02:18:26"),
			"duration": 2009.387807
		},
		{
			"reportStartTime": new Date("2017-06-27T00:19:34"),
			"reportEndTime": new Date("2017-06-27T00:31:29"),
			"duration": 715.075275
		},
		{
			"reportStartTime": new Date("2017-06-26T00:56:13"),
			"reportEndTime": new Date("2017-06-26T09:01:59"),
			"duration": 29146.505009
		},
		{
			"reportStartTime": new Date("2017-06-26T00:56:13"),
			"reportEndTime": new Date("2017-06-26T09:01:59"),
			"duration": 29146.505009
		}
	];
	
	var searchStartTime = "2017-06-26T00:00:00";
	var searchEndTime = "2017-07-02T23:59:59";
	console.log(new Date(searchStartTime), new Date(searchEndTime));
	
	var chartId = "durationGraph1";
	var chartOpt = {
		"chartId": chartId,
		graph:{
			"type": "duration",
			"startField": "reportStartTime",
			"endField": "reportEndTime",
			"minStart": new Date(searchStartTime),
			"maxEnd": new Date(searchEndTime),
			"innerColor":"#DF0101",
			"outerColor":"#BCBCBC",
			"balloonText": "[[reportStartTime]]:[[duration]]"
		},
		balloon:{
			"dateFormat": "%Y-%m-%d %H:%M:%S"
		}
	};
	
	var chart = NaruSecD3.createGraph(chartOpt);
	chart.setData(chartData);
	
}