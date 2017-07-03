window.onload = function(){
	test();
};

function test(){
	var chartData = [
		{
			"src_ip": "192.168.1.144",
			"src_port": "25900",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "31683",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "53166",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "63005",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "42892",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "16746",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "52572",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "37982",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "27084",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "27084",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "57607",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "57607",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "10557",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "33196",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "59515",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "20754",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "8707",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "36305",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "33352",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "29136",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "53166",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "19098",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "42892",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "27928",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "46617",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "18459",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "18459",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "37982",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "31242",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "59515",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "41244",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "8792",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "31140",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "30396",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "8707",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "5869",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "34723",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "34723",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "19098",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "27928",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "40266",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "52572",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "17137",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "14422",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "14422",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "49449",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "6061",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "47758",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "31242",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "33196",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "14498",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "15744",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "15744",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "34994",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "22263",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "25900",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "40266",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "39198",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "17137",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "36208",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "36208",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "49449",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "6061",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "47758",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "35239",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "10557",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "41244",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "8792",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "55244",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "31140",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "34994",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "36305",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "22263",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "29136",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "9248",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "9248",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "31683",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "63005",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "16746",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "39198",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "46617",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "35239",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "14498",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "20754",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "55244",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "30396",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "5869",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		},
		{
			"src_ip": "192.168.1.144",
			"src_port": "33352",
			"dst_port": "123",
			"dst_ip": "91.189.89.198"
		}
	];
	
	
	var forceData = d3.nest()
		.key(function(d){ return d.dst_ip+":"+d.dst_port;})
		.key(function(d){
			var srcIp = d.src_ip;
			var cIndex = srcIp.lastIndexOf(".");
			if(cIndex > -1){
				srcIp = srcIp.substring(0, cIndex);
			}
			return srcIp;
		})
		.key(function(d){
			return d.src_ip;
		})
		.key(function(d){ return d.src_port;})
		.entries(chartData);
	
	var nodesData = [];
	var linksData = [];
	forceData.forEach(function(d, i){
		var key1 = d.key;
		var values1 = d.values;
		
		//TODO grpup
		var index = nodesData.length;
		nodesData.push({"id":index, "ip":key1, "group":(i), "size":30, "dx":"1.8em"});
		values1.forEach(function(d, i){
			var key2 = d.key;
			var values2 = d.values;
			
			var index2 = nodesData.length;
			nodesData.push({"id":index2, "ip":key2, "group":(i+1), "size":20, "dx":"1.5em"});
			linksData.push({"source":index, "target":index2}) ;
			var linkIndex = nodesData.length - 1;
			var parentNum = (i+1);
			
			values2.forEach(function(d, i){
//							var values3 = d.values;
				var key3 = d.key;
				var index3 = nodesData.length;
				nodesData.push({"id":index3, "ip":key3, "group":parentNum, "size":15, "dx":"1.3em"});
				linksData.push({"source":index2, "target":index3});
				
				// 포트 보여줄 경우 주석해제
//							var linkIndex2 = nodesData.length - 1;
//							values3.forEach(function(d, i){
//								var key4 = d.key;
//								nodesData.push({"id":,"ip":key4, "group":parentNum, "cSize":10, "dx":"1.3em"});
//								linksData.push({"source":linkIndex2, "target":key4});
//							});
			
			});
		});
	});
	
	
	console.log("forceData", forceData);
	//NaruSecD3.createForceGraph(forceOpt, nodesData, linksData);
}