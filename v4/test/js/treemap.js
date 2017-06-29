window.onload = function(){
	test();
};


function getBalloonCss (balloonData){
	var resultLayer = "";
	if(balloonData){
		var temp = Object.keys(balloonData);
		if(temp.length > 0){
			var keyLayer = "<div class='dashboard-balloon-key'>";
			var valueLayer = "<div class='dashboard-balloon-value'>";
			for(var i=0; i<temp.length; i++){
				var key = temp[i];
				var value = balloonData[key];
				keyLayer += key;
				valueLayer += value;
				
				if(i < temp.length -1) {
					keyLayer += ": <br/>";
					valueLayer += "<br/>";
				}
			}
			
			keyLayer += ": </div>";
			valueLayer += "</div>";
			
			resultLayer += keyLayer;
			resultLayer += valueLayer;
		}
		
	}
	return resultLayer;
}

function test(){
	var chartOpt = {
		"chartId": "treemapGraph1",
		"graph":{
			"type":"treemap",
			"node":{
				"name":"trust",
				"value": "sum_duration",
				"sort":"desc",
				"text": ["trust", "domain"]
			},
			colorField: "color",
			"balloonText":getBalloonCss({
				"Domain": "<b>[[domain]]</b>",
					"Dst Ip": "<b>[[dst_ip]]</b>",
					"Trust": "<b>[[trust]]</b>",
					"dayseen의 고유 카운트": "<b>[[dayseen]]</b>",
					"Duration": "<b>[[sum_duration]]</b>"
			})
		},
		 "balloon":{
		// 	"Domain": "<b>[[domain]]</b>",
		// 	"Dst Ip": "<b>[[dst_ip]]</b>",
		// 	"Trust": "<b>[[trust]]</b>",
		// 	"dayseen의 고유 카운트": "<b>[[dayseen]]</b>",
		// 	"Duration": "<b>[[sum_duration]]</b>"
		 }
	};
	
	
	var chartData = [
		{
			"trust": "high",
			"dayseen": 2,
			"domain": "item.gl.kakao.com",
			"sum_duration": 14.151070,
			"type": "messenger",
			"dst_ip": "1.201.0.22"
		},
		{
			"trust": "low",
			"dayseen": 4,
			"domain": "api.liveicon.kr",
			"sum_duration": 43201.072326,
			"type": "pup/pua",
			"dst_ip": "103.6.100.24"
		},
		{
			"trust": "tbd",
			"dayseen": 2,
			"domain": "n/a",
			"sum_duration": 392.578697,
			"type": null,
			"dst_ip": "103.6.174.12"
		},
		{
			"trust": "tbd",
			"dayseen": 2,
			"domain": "n/a",
			"sum_duration": 6032.507890,
			"type": null,
			"dst_ip": "103.6.174.17"
		},
		{
			"trust": "neutral",
			"dayseen": 6,
			"domain": "2.android.pool.ntp.org",
			"sum_duration": 6.537071,
			"type": "management",
			"dst_ip": "106.247.248.106"
		},
		{
			"trust": "tbd",
			"dayseen": 3,
			"domain": "n/a",
			"sum_duration": 40835.470764,
			"type": null,
			"dst_ip": "110.45.160.220"
		},
		{
			"trust": "tbd",
			"dayseen": 2,
			"domain": "n/a",
			"sum_duration": 8.061888,
			"type": null,
			"dst_ip": "111.221.29.101"
		},
		{
			"trust": "high",
			"dayseen": 3,
			"domain": "hk2sch130021923.wns.windows.com",
			"sum_duration": 42.433702,
			"type": "os",
			"dst_ip": "111.221.29.156"
		},
		{
			"trust": "tbd",
			"dayseen": 1,
			"domain": "n/a",
			"sum_duration": 2453.327332,
			"type": null,
			"dst_ip": "111.221.29.253"
		},
		{
			"trust": "tbd",
			"dayseen": 1,
			"domain": "n/a",
			"sum_duration": 8640.905816,
			"type": null,
			"dst_ip": "111.221.29.254"
		},
		{
			"trust": "tbd",
			"dayseen": 3,
			"domain": "n/a",
			"sum_duration": 42987.486260,
			"type": null,
			"dst_ip": "111.221.29.89"
		},
		{
			"trust": "high",
			"dayseen": 3,
			"domain": "hk2sch130021017.wns.windows.com",
			"sum_duration": 25.433292,
			"type": "os",
			"dst_ip": "111.221.29.96"
		},
		{
			"trust": "tbd",
			"dayseen": 3,
			"domain": "n/a",
			"sum_duration": 13021.344767,
			"type": null,
			"dst_ip": "111.91.134.203"
		},
		{
			"trust": "neutral",
			"dayseen": 3,
			"domain": "not_available",
			"sum_duration": 2443.796559,
			"type": "financial",
			"dst_ip": "121.129.49.94"
		},
		{
			"trust": "low",
			"dayseen": 4,
			"domain": "apix.liveicon.kr",
			"sum_duration": 2.396604,
			"type": "pup/pua",
			"dst_ip": "121.78.187.200"
		},
		{
			"trust": "tbd",
			"dayseen": 2,
			"domain": "n/a",
			"sum_duration": 7.509796,
			"type": null,
			"dst_ip": "125.209.210.75"
		},
		{
			"trust": "tbd",
			"dayseen": 2,
			"domain": "n/a",
			"sum_duration": 8904.032382,
			"type": null,
			"dst_ip": "125.209.226.239"
		},
		{
			"trust": "tbd",
			"dayseen": 2,
			"domain": "n/a",
			"sum_duration": 1013.603184,
			"type": null,
			"dst_ip": "125.209.238.140"
		},
		{
			"trust": "tbd",
			"dayseen": 1,
			"domain": "n/a",
			"sum_duration": 48.987000,
			"type": null,
			"dst_ip": "136.243.24.163"
		},
		{
			"trust": "tbd",
			"dayseen": 6,
			"domain": "n/a",
			"sum_duration": 22398.020858,
			"type": null,
			"dst_ip": "168.126.63.1"
		},
		{
			"trust": "tbd",
			"dayseen": 7,
			"domain": "n/a",
			"sum_duration": 151.743308,
			"type": null,
			"dst_ip": "17.188.166.16"
		},
		{
			"trust": "tbd",
			"dayseen": 5,
			"domain": "n/a",
			"sum_duration": 13930.726914,
			"type": null,
			"dst_ip": "17.252.157.19"
		},
		{
			"trust": "tbd",
			"dayseen": 6,
			"domain": "n/a",
			"sum_duration": 10734.320180,
			"type": null,
			"dst_ip": "17.252.157.26"
		},
		{
			"trust": "high",
			"dayseen": 9,
			"domain": "time.apple.com",
			"sum_duration": 1038.625178,
			"type": "os",
			"dst_ip": "17.253.68.253"
		},
		{
			"trust": "tbd",
			"dayseen": 9,
			"domain": "n/a",
			"sum_duration": 50.165460,
			"type": null,
			"dst_ip": "17.253.72.243"
		},
		{
			"trust": "tbd",
			"dayseen": 2,
			"domain": "n/a",
			"sum_duration": 7448.003556,
			"type": null,
			"dst_ip": "172.217.24.142"
		},
		{
			"trust": "high",
			"dayseen": 5,
			"domain": "safebrowsing.cache.l.google.com",
			"sum_duration": 8672.989194,
			"type": "portal",
			"dst_ip": "172.217.25.110"
		},
		{
			"trust": "high",
			"dayseen": 3,
			"domain": "safebrowsing.cache.l.google.com",
			"sum_duration": 6449.121594,
			"type": "portal",
			"dst_ip": "172.217.25.206"
		},
		{
			"trust": "high",
			"dayseen": 2,
			"domain": "safebrowsing-cache.google.com",
			"sum_duration": 7196.996296,
			"type": "portal",
			"dst_ip": "172.217.25.238"
		},
		{
			"trust": "high",
			"dayseen": 3,
			"domain": "safebrowsing-cache.google.com",
			"sum_duration": 54511.222636,
			"type": "portal",
			"dst_ip": "172.217.25.78"
		},
		{
			"trust": "tbd",
			"dayseen": 6,
			"domain": "n/a",
			"sum_duration": 46543.651730,
			"type": null,
			"dst_ip": "172.217.26.14"
		},
		{
			"trust": "tbd",
			"dayseen": 7,
			"domain": "n/a",
			"sum_duration": 16616.381202,
			"type": null,
			"dst_ip": "172.217.26.46"
		},
		{
			"trust": "tbd",
			"dayseen": 6,
			"domain": "n/a",
			"sum_duration": 10750.252644,
			"type": null,
			"dst_ip": "172.217.27.78"
		},
		{
			"trust": "high",
			"dayseen": 2,
			"domain": "lcs.naver.com.nheos.com",
			"sum_duration": 780.661244,
			"type": "portal",
			"dst_ip": "175.158.0.135"
		},
		{
			"trust": "tbd",
			"dayseen": 2,
			"domain": "n/a",
			"sum_duration": 488.835644,
			"type": null,
			"dst_ip": "182.162.202.180"
		},
		{
			"trust": "neutral",
			"dayseen": 1,
			"domain": "open.vcodec.co.kr",
			"sum_duration": 6.304042,
			"type": "utility",
			"dst_ip": "183.110.217.122"
		},
		{
			"trust": "neutral",
			"dayseen": 6,
			"domain": "g.root-servers.net",
			"sum_duration": 1.541472,
			"type": "ddns",
			"dst_ip": "192.112.36.4"
		},
		{
			"trust": "neutral",
			"dayseen": 6,
			"domain": "n/a",
			"sum_duration": 0.286506,
			"type": "management",
			"dst_ip": "192.203.230.10"
		},
		{
			"trust": "neutral",
			"dayseen": 6,
			"domain": "b.root-servers.net",
			"sum_duration": 0.628829,
			"type": "ddns",
			"dst_ip": "192.228.79.201"
		},
		{
			"trust": "neutral",
			"dayseen": 6,
			"domain": "c.root-servers.net",
			"sum_duration": 0.279770,
			"type": "ddns",
			"dst_ip": "192.33.4.12"
		},
		{
			"trust": "neutral",
			"dayseen": 6,
			"domain": "n/a",
			"sum_duration": 0.253568,
			"type": "management",
			"dst_ip": "192.36.148.17"
		},
		{
			"trust": "neutral",
			"dayseen": 6,
			"domain": "n/a",
			"sum_duration": 0.556578,
			"type": "management",
			"dst_ip": "192.5.5.241"
		},
		{
			"trust": "neutral",
			"dayseen": 6,
			"domain": "j.root-servers.net",
			"sum_duration": 0.271676,
			"type": "ddns",
			"dst_ip": "192.58.128.30"
		},
		{
			"trust": "neutral",
			"dayseen": 6,
			"domain": "k.root-servers.net",
			"sum_duration": 0.254434,
			"type": "ddns",
			"dst_ip": "193.0.14.129"
		},
		{
			"trust": "neutral",
			"dayseen": 6,
			"domain": "a.root-servers.net",
			"sum_duration": 0.580639,
			"type": "ddns",
			"dst_ip": "198.41.0.4"
		},
		{
			"trust": "neutral",
			"dayseen": 6,
			"domain": "h.root-servers.net",
			"sum_duration": 0.411542,
			"type": "ddns",
			"dst_ip": "198.97.190.53"
		},
		{
			"trust": "neutral",
			"dayseen": 6,
			"domain": "n/a",
			"sum_duration": 0.252978,
			"type": "management",
			"dst_ip": "199.7.83.42"
		},
		{
			"trust": "neutral",
			"dayseen": 6,
			"domain": "d.root-servers.net",
			"sum_duration": 0.495946,
			"type": "ddns",
			"dst_ip": "199.7.91.13"
		},
		{
			"trust": "neutral",
			"dayseen": 6,
			"domain": "m.root-servers.net",
			"sum_duration": 0.309584,
			"type": "ddns",
			"dst_ip": "202.12.27.33"
		},
		{
			"trust": "high",
			"dayseen": 2,
			"domain": "kr-lcs.naver.com.akadns.net",
			"sum_duration": 1499.343775,
			"type": "portal",
			"dst_ip": "202.131.27.102"
		},
		{
			"trust": "tbd",
			"dayseen": 2,
			"domain": "n/a",
			"sum_duration": 9685.721737,
			"type": null,
			"dst_ip": "202.179.179.108"
		},
		{
			"trust": "high",
			"dayseen": 5,
			"domain": "item.gl.kakao.com",
			"sum_duration": 29587.034338,
			"type": "messenger",
			"dst_ip": "210.103.240.15"
		},
		{
			"trust": "tbd",
			"dayseen": 6,
			"domain": "n/a",
			"sum_duration": 1.861790,
			"type": null,
			"dst_ip": "211.233.78.116"
		},
		{
			"trust": "high",
			"dayseen": 3,
			"domain": "android.clients.google.com",
			"sum_duration": 13828.717362,
			"type": "portal",
			"dst_ip": "216.58.197.142"
		},
		{
			"trust": "high",
			"dayseen": 3,
			"domain": "safebrowsing.cache.l.google.com",
			"sum_duration": 22464.446878,
			"type": "portal",
			"dst_ip": "216.58.197.174"
		},
		{
			"trust": "high",
			"dayseen": 2,
			"domain": "safebrowsing-cache.google.com",
			"sum_duration": 7878.018924,
			"type": "portal",
			"dst_ip": "216.58.197.206"
		},
		{
			"trust": "high",
			"dayseen": 4,
			"domain": "docs.google.com",
			"sum_duration": 47625.607589,
			"type": "portal",
			"dst_ip": "216.58.197.238"
		},
		{
			"trust": "high",
			"dayseen": 5,
			"domain": "safebrowsing-cache.google.com",
			"sum_duration": 48631.681006,
			"type": "portal",
			"dst_ip": "216.58.200.174"
		},
		{
			"trust": "high",
			"dayseen": 1,
			"domain": "safebrowsing-cache.google.com",
			"sum_duration": 2878.953192,
			"type": "portal",
			"dst_ip": "216.58.200.206"
		},
		{
			"trust": "tbd",
			"dayseen": 15,
			"domain": "n/a",
			"sum_duration": 196733.147324,
			"type": null,
			"dst_ip": "224.0.0.251"
		},
		{
			"trust": "tbd",
			"dayseen": 7,
			"domain": "n/a",
			"sum_duration": 2791.325031,
			"type": null,
			"dst_ip": "224.0.0.252"
		},
		{
			"trust": "tbd",
			"dayseen": 1,
			"domain": "n/a",
			"sum_duration": 3712.653360,
			"type": null,
			"dst_ip": "23.99.125.126"
		},
		{
			"trust": "tbd",
			"dayseen": 15,
			"domain": "n/a",
			"sum_duration": 144685.924881,
			"type": null,
			"dst_ip": "239.255.255.250"
		},
		{
			"trust": "neutral",
			"dayseen": 4,
			"domain": "0-edge-chat.facebook.com",
			"sum_duration": 32511.687960,
			"type": "sns",
			"dst_ip": "31.13.68.12"
		},
		{
			"trust": "neutral",
			"dayseen": 2,
			"domain": "pixel.facebook.com",
			"sum_duration": 6311.169246,
			"type": "sns",
			"dst_ip": "31.13.68.35"
		},
		{
			"trust": "tbd",
			"dayseen": 9,
			"domain": "n/a",
			"sum_duration": 230979.810734,
			"type": null,
			"dst_ip": "35.186.213.138"
		},
		{
			"trust": "tbd",
			"dayseen": 6,
			"domain": "n/a",
			"sum_duration": 67711.401239,
			"type": null,
			"dst_ip": "50.16.228.90"
		},
		{
			"trust": "tbd",
			"dayseen": 4,
			"domain": "n/a",
			"sum_duration": 110250.227376,
			"type": null,
			"dst_ip": "52.0.217.44"
		},
		{
			"trust": "tbd",
			"dayseen": 7,
			"domain": "n/a",
			"sum_duration": 32237.834302,
			"type": null,
			"dst_ip": "52.196.210.250"
		},
		{
			"trust": "tbd",
			"dayseen": 1,
			"domain": "n/a",
			"sum_duration": 1308.662524,
			"type": null,
			"dst_ip": "52.197.86.192"
		},
		{
			"trust": "tbd",
			"dayseen": 1,
			"domain": "n/a",
			"sum_duration": 20819.004928,
			"type": null,
			"dst_ip": "52.198.10.4"
		},
		{
			"trust": "tbd",
			"dayseen": 4,
			"domain": "n/a",
			"sum_duration": 13762.895582,
			"type": null,
			"dst_ip": "52.198.181.119"
		},
		{
			"trust": "tbd",
			"dayseen": 4,
			"domain": "n/a",
			"sum_duration": 61262.882669,
			"type": null,
			"dst_ip": "52.22.164.243"
		},
		{
			"trust": "tbd",
			"dayseen": 1,
			"domain": "n/a",
			"sum_duration": 9787.078274,
			"type": null,
			"dst_ip": "52.37.26.98"
		},
		{
			"trust": "tbd",
			"dayseen": 2,
			"domain": "n/a",
			"sum_duration": 2659.870920,
			"type": null,
			"dst_ip": "52.6.43.173"
		},
		{
			"trust": "tbd",
			"dayseen": 2,
			"domain": "n/a",
			"sum_duration": 13510.562526,
			"type": null,
			"dst_ip": "52.68.188.183"
		},
		{
			"trust": "tbd",
			"dayseen": 1,
			"domain": "n/a",
			"sum_duration": 22289.351908,
			"type": null,
			"dst_ip": "54.145.214.175"
		},
		{
			"trust": "tbd",
			"dayseen": 8,
			"domain": "n/a",
			"sum_duration": 49256.756528,
			"type": null,
			"dst_ip": "54.178.186.199"
		},
		{
			"trust": "tbd",
			"dayseen": 4,
			"domain": "n/a",
			"sum_duration": 35347.208459,
			"type": null,
			"dst_ip": "54.210.192.224"
		},
		{
			"trust": "tbd",
			"dayseen": 1,
			"domain": "n/a",
			"sum_duration": 2233.510610,
			"type": null,
			"dst_ip": "54.239.186.216"
		},
		{
			"trust": "tbd",
			"dayseen": 3,
			"domain": "n/a",
			"sum_duration": 16441.113566,
			"type": null,
			"dst_ip": "54.249.42.226"
		},
		{
			"trust": "low",
			"dayseen": 3,
			"domain": "my.jrebel.com",
			"sum_duration": 129.446516,
			"type": "uncategorized",
			"dst_ip": "54.84.195.230"
		},
		{
			"trust": "tbd",
			"dayseen": 6,
			"domain": "n/a",
			"sum_duration": 3056.631385,
			"type": null,
			"dst_ip": "68.232.45.253"
		},
		{
			"trust": "high",
			"dayseen": 9,
			"domain": "stylevi.com",
			"sum_duration": 5794.183696,
			"type": "portal",
			"dst_ip": "8.8.8.8"
		},
		{
			"trust": "tbd",
			"dayseen": 4,
			"domain": "n/a",
			"sum_duration": 289590.351894,
			"type": null,
			"dst_ip": "81.161.59.94"
		},
		{
			"trust": "neutral",
			"dayseen": 1,
			"domain": "ntp.ubuntu.com",
			"sum_duration": 77.312614,
			"type": "management",
			"dst_ip": "91.189.89.199"
		},
		{
			"trust": "tbd",
			"dayseen": 3,
			"domain": "n/a",
			"sum_duration": 412.732242,
			"type": null,
			"dst_ip": "91.189.91.157"
		}
	];
	
	var chartColor = {
		"high":"#D03749", //빨강
			"low":"#fdae6b", //주황
			"neutral":"#11D00A", //초록
			"bad":"#d6616b", //빨강
			"suspicious":"#9c9ede", //? 연보라
			"internal":"#6FC1D0", //하늘
			"none":"#FFBDE0", //분홍
			"tbd":"#BDBDBD"//회색
	};
	
	for(var i=0; i<chartData.length; i++){
		var dataMap = chartData[i];
		var trust = dataMap.trust;
		var color = chartColor[trust];
		dataMap.color = color ? color:"#fff";
	}
	
	var chart = NaruSecD3.createGraph(chartOpt);
	chart.setData(chartData);

}