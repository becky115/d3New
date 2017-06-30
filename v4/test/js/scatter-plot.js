/**
 * Created by eunjilee on 2017. 6. 29..
 */
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
	var chartData = [
		{
			"trust": "high",
			"src_ip_cnt": 2,
			"dayseen": 3,
			"sum_sbytes": 127488,
			"domain": "item.gl.kakao.com",
			"type": "messenger",
			"sum_dbytes": 932906,
			"dst_ip": "1.201.0.22",
			"pcr": -0.7595
		},
		{
			"trust": "low",
			"src_ip_cnt": 1,
			"dayseen": 6,
			"sum_sbytes": 273591,
			"domain": "api.liveicon.kr",
			"type": "pup/pua",
			"sum_dbytes": 546961,
			"dst_ip": "103.6.100.24",
			"pcr": -0.3332
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 2,
			"sum_sbytes": 50982,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 24340,
			"dst_ip": "103.6.174.12",
			"pcr": 0.3537
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 2,
			"sum_sbytes": 102306,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 772589,
			"dst_ip": "103.6.174.17",
			"pcr": -0.7661
		},
		{
			"trust": "neutral",
			"src_ip_cnt": 1,
			"dayseen": 6,
			"sum_sbytes": 70224,
			"domain": "2.android.pool.ntp.org",
			"type": "management",
			"sum_dbytes": 70224,
			"dst_ip": "106.247.248.106",
			"pcr": 0.0000
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 5,
			"sum_sbytes": 23814285,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 22264371,
			"dst_ip": "110.45.160.220",
			"pcr": 0.0336
		},
		{
			"trust": "high",
			"src_ip_cnt": 1,
			"dayseen": 1,
			"sum_sbytes": 43956,
			"domain": "item.kakao.com",
			"type": "messenger",
			"sum_dbytes": 261574,
			"dst_ip": "110.76.141.45",
			"pcr": -0.7123
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 2,
			"sum_sbytes": 15210,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 19370,
			"dst_ip": "111.221.29.101",
			"pcr": -0.1203
		},
		{
			"trust": "high",
			"src_ip_cnt": 1,
			"dayseen": 3,
			"sum_sbytes": 31442,
			"domain": "hk2sch130021923.wns.windows.com",
			"type": "os",
			"sum_dbytes": 39880,
			"dst_ip": "111.221.29.156",
			"pcr": -0.1183
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 1,
			"sum_sbytes": 91910,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 170454,
			"dst_ip": "111.221.29.253",
			"pcr": -0.2994
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 1,
			"sum_sbytes": 605364,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 590044,
			"dst_ip": "111.221.29.254",
			"pcr": 0.0128
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 3,
			"sum_sbytes": 69322,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 159174,
			"dst_ip": "111.221.29.89",
			"pcr": -0.3932
		},
		{
			"trust": "high",
			"src_ip_cnt": 1,
			"dayseen": 3,
			"sum_sbytes": 30590,
			"domain": "hk2sch130021017.wns.windows.com",
			"type": "os",
			"sum_dbytes": 38442,
			"dst_ip": "111.221.29.96",
			"pcr": -0.1137
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 3,
			"sum_sbytes": 223682,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 2106085,
			"dst_ip": "111.91.134.203",
			"pcr": -0.8080
		},
		{
			"trust": "neutral",
			"src_ip_cnt": 1,
			"dayseen": 3,
			"sum_sbytes": 61674,
			"domain": "not_available",
			"type": "financial",
			"sum_dbytes": 196330,
			"dst_ip": "121.129.49.94",
			"pcr": -0.5219
		},
		{
			"trust": "low",
			"src_ip_cnt": 1,
			"dayseen": 6,
			"sum_sbytes": 63404,
			"domain": "apix.liveicon.kr",
			"type": "pup/pua",
			"sum_dbytes": 40268,
			"dst_ip": "121.78.187.200",
			"pcr": 0.2232
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 2,
			"sum_sbytes": 57696,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 539958,
			"dst_ip": "125.209.210.75",
			"pcr": -0.8069
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 2,
			"sum_sbytes": 420804,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 1576887,
			"dst_ip": "125.209.226.239",
			"pcr": -0.5787
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 2,
			"sum_sbytes": 131918,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 791638,
			"dst_ip": "125.209.238.140",
			"pcr": -0.7143
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 1,
			"sum_sbytes": 125128,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 475640,
			"dst_ip": "13.112.181.55",
			"pcr": -0.5834
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 1,
			"sum_sbytes": 75008,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 36928,
			"dst_ip": "136.243.24.163",
			"pcr": 0.3402
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 2,
			"dayseen": 8,
			"sum_sbytes": 495392,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 2562518,
			"dst_ip": "168.126.63.1",
			"pcr": -0.6760
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 7,
			"sum_sbytes": 59388,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 31164,
			"dst_ip": "17.188.166.16",
			"pcr": 0.3117
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 5,
			"sum_sbytes": 185462,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 41494,
			"dst_ip": "17.252.157.19",
			"pcr": 0.6343
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 6,
			"sum_sbytes": 147314,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 48740,
			"dst_ip": "17.252.157.26",
			"pcr": 0.5028
		},
		{
			"trust": "high",
			"src_ip_cnt": 1,
			"dayseen": 9,
			"sum_sbytes": 166848,
			"domain": "time.apple.com",
			"type": "os",
			"sum_dbytes": 166560,
			"dst_ip": "17.253.68.253",
			"pcr": 0.0009
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 9,
			"sum_sbytes": 144816,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 144816,
			"dst_ip": "17.253.72.243",
			"pcr": 0.0000
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 2,
			"sum_sbytes": 1310578,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 2628194,
			"dst_ip": "172.217.24.142",
			"pcr": -0.3345
		},
		{
			"trust": "high",
			"src_ip_cnt": 1,
			"dayseen": 5,
			"sum_sbytes": 2675148,
			"domain": "safebrowsing.cache.l.google.com",
			"type": "portal",
			"sum_dbytes": 8409800,
			"dst_ip": "172.217.25.110",
			"pcr": -0.5173
		},
		{
			"trust": "high",
			"src_ip_cnt": 1,
			"dayseen": 3,
			"sum_sbytes": 1448656,
			"domain": "safebrowsing.cache.l.google.com",
			"type": "portal",
			"sum_dbytes": 8383052,
			"dst_ip": "172.217.25.206",
			"pcr": -0.7053
		},
		{
			"trust": "high",
			"src_ip_cnt": 1,
			"dayseen": 2,
			"sum_sbytes": 1683866,
			"domain": "safebrowsing-cache.google.com",
			"type": "portal",
			"sum_dbytes": 12493576,
			"dst_ip": "172.217.25.238",
			"pcr": -0.7625
		},
		{
			"trust": "high",
			"src_ip_cnt": 1,
			"dayseen": 3,
			"sum_sbytes": 7698546,
			"domain": "safebrowsing-cache.google.com",
			"type": "portal",
			"sum_dbytes": 35605910,
			"dst_ip": "172.217.25.78",
			"pcr": -0.6444
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 6,
			"sum_sbytes": 8595256,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 43204808,
			"dst_ip": "172.217.26.14",
			"pcr": -0.6681
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 7,
			"sum_sbytes": 3932220,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 11784852,
			"dst_ip": "172.217.26.46",
			"pcr": -0.4996
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 6,
			"sum_sbytes": 1987932,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 5137480,
			"dst_ip": "172.217.27.78",
			"pcr": -0.4420
		},
		{
			"trust": "high",
			"src_ip_cnt": 1,
			"dayseen": 2,
			"sum_sbytes": 180788,
			"domain": "lcs.naver.com.nheos.com",
			"type": "portal",
			"sum_dbytes": 367034,
			"dst_ip": "175.158.0.135",
			"pcr": -0.3400
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 2,
			"sum_sbytes": 164914,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 388376,
			"dst_ip": "182.162.202.180",
			"pcr": -0.4039
		},
		{
			"trust": "neutral",
			"src_ip_cnt": 1,
			"dayseen": 1,
			"sum_sbytes": 10830,
			"domain": "open.vcodec.co.kr",
			"type": "utility",
			"sum_dbytes": 1079408,
			"dst_ip": "183.110.217.122",
			"pcr": -0.9801
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 1,
			"sum_sbytes": 11606,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 142284,
			"dst_ip": "184.25.16.226",
			"pcr": -0.8492
		},
		{
			"trust": "neutral",
			"src_ip_cnt": 1,
			"dayseen": 8,
			"sum_sbytes": 25518,
			"domain": "g.root-servers.net",
			"type": "ddns",
			"sum_dbytes": 603928,
			"dst_ip": "192.112.36.4",
			"pcr": -0.9189
		},
		{
			"trust": "neutral",
			"src_ip_cnt": 1,
			"dayseen": 8,
			"sum_sbytes": 25052,
			"domain": "n/a",
			"type": "management",
			"sum_dbytes": 587779,
			"dst_ip": "192.203.230.10",
			"pcr": -0.9182
		},
		{
			"trust": "neutral",
			"src_ip_cnt": 1,
			"dayseen": 8,
			"sum_sbytes": 30052,
			"domain": "b.root-servers.net",
			"type": "ddns",
			"sum_dbytes": 678791,
			"dst_ip": "192.228.79.201",
			"pcr": -0.9152
		},
		{
			"trust": "neutral",
			"src_ip_cnt": 1,
			"dayseen": 8,
			"sum_sbytes": 26689,
			"domain": "c.root-servers.net",
			"type": "ddns",
			"sum_dbytes": 646062,
			"dst_ip": "192.33.4.12",
			"pcr": -0.9207
		},
		{
			"trust": "neutral",
			"src_ip_cnt": 1,
			"dayseen": 8,
			"sum_sbytes": 25978,
			"domain": "n/a",
			"type": "management",
			"sum_dbytes": 619120,
			"dst_ip": "192.36.148.17",
			"pcr": -0.9195
		},
		{
			"trust": "neutral",
			"src_ip_cnt": 1,
			"dayseen": 8,
			"sum_sbytes": 25610,
			"domain": "n/a",
			"type": "management",
			"sum_dbytes": 630136,
			"dst_ip": "192.5.5.241",
			"pcr": -0.9219
		},
		{
			"trust": "neutral",
			"src_ip_cnt": 1,
			"dayseen": 8,
			"sum_sbytes": 27248,
			"domain": "j.root-servers.net",
			"type": "ddns",
			"sum_dbytes": 637248,
			"dst_ip": "192.58.128.30",
			"pcr": -0.9180
		},
		{
			"trust": "neutral",
			"src_ip_cnt": 1,
			"dayseen": 8,
			"sum_sbytes": 26276,
			"domain": "k.root-servers.net",
			"type": "ddns",
			"sum_dbytes": 613968,
			"dst_ip": "193.0.14.129",
			"pcr": -0.9179
		},
		{
			"trust": "neutral",
			"src_ip_cnt": 1,
			"dayseen": 8,
			"sum_sbytes": 28480,
			"domain": "a.root-servers.net",
			"type": "ddns",
			"sum_dbytes": 667964,
			"dst_ip": "198.41.0.4",
			"pcr": -0.9182
		},
		{
			"trust": "neutral",
			"src_ip_cnt": 1,
			"dayseen": 8,
			"sum_sbytes": 26337,
			"domain": "h.root-servers.net",
			"type": "ddns",
			"sum_dbytes": 633659,
			"dst_ip": "198.97.190.53",
			"pcr": -0.9202
		},
		{
			"trust": "neutral",
			"src_ip_cnt": 1,
			"dayseen": 8,
			"sum_sbytes": 26211,
			"domain": "n/a",
			"type": "management",
			"sum_dbytes": 616544,
			"dst_ip": "199.7.83.42",
			"pcr": -0.9184
		},
		{
			"trust": "neutral",
			"src_ip_cnt": 1,
			"dayseen": 8,
			"sum_sbytes": 27706,
			"domain": "d.root-servers.net",
			"type": "ddns",
			"sum_dbytes": 643230,
			"dst_ip": "199.7.91.13",
			"pcr": -0.9174
		},
		{
			"trust": "neutral",
			"src_ip_cnt": 1,
			"dayseen": 8,
			"sum_sbytes": 25224,
			"domain": "m.root-servers.net",
			"type": "ddns",
			"sum_dbytes": 583292,
			"dst_ip": "202.12.27.33",
			"pcr": -0.9171
		},
		{
			"trust": "high",
			"src_ip_cnt": 1,
			"dayseen": 2,
			"sum_sbytes": 250223,
			"domain": "kr-lcs.naver.com.akadns.net",
			"type": "portal",
			"sum_dbytes": 481634,
			"dst_ip": "202.131.27.102",
			"pcr": -0.3162
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 2,
			"sum_sbytes": 336514,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 606739,
			"dst_ip": "202.179.179.108",
			"pcr": -0.2865
		},
		{
			"trust": "high",
			"src_ip_cnt": 2,
			"dayseen": 6,
			"sum_sbytes": 250704,
			"domain": "item.gl.kakao.com",
			"type": "messenger",
			"sum_dbytes": 1273026,
			"dst_ip": "210.103.240.15",
			"pcr": -0.6709
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 8,
			"sum_sbytes": 48864,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 48864,
			"dst_ip": "211.233.78.116",
			"pcr": 0.0000
		},
		{
			"trust": "high",
			"src_ip_cnt": 1,
			"dayseen": 3,
			"sum_sbytes": 1944270,
			"domain": "android.clients.google.com",
			"type": "portal",
			"sum_dbytes": 4203502,
			"dst_ip": "216.58.197.142",
			"pcr": -0.3675
		},
		{
			"trust": "high",
			"src_ip_cnt": 1,
			"dayseen": 3,
			"sum_sbytes": 3731830,
			"domain": "safebrowsing.cache.l.google.com",
			"type": "portal",
			"sum_dbytes": 24600646,
			"dst_ip": "216.58.197.174",
			"pcr": -0.7366
		},
		{
			"trust": "high",
			"src_ip_cnt": 1,
			"dayseen": 2,
			"sum_sbytes": 1389892,
			"domain": "safebrowsing-cache.google.com",
			"type": "portal",
			"sum_dbytes": 3546852,
			"dst_ip": "216.58.197.206",
			"pcr": -0.4369
		},
		{
			"trust": "high",
			"src_ip_cnt": 1,
			"dayseen": 4,
			"sum_sbytes": 7260299,
			"domain": "docs.google.com",
			"type": "portal",
			"sum_dbytes": 35845425,
			"dst_ip": "216.58.197.238",
			"pcr": -0.6631
		},
		{
			"trust": "high",
			"src_ip_cnt": 1,
			"dayseen": 5,
			"sum_sbytes": 5171778,
			"domain": "safebrowsing-cache.google.com",
			"type": "portal",
			"sum_dbytes": 9894122,
			"dst_ip": "216.58.200.174",
			"pcr": -0.3134
		},
		{
			"trust": "high",
			"src_ip_cnt": 1,
			"dayseen": 1,
			"sum_sbytes": 810126,
			"domain": "safebrowsing-cache.google.com",
			"type": "portal",
			"sum_dbytes": 2387946,
			"dst_ip": "216.58.200.206",
			"pcr": -0.4934
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 17,
			"dayseen": 17,
			"sum_sbytes": 7765144,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 0,
			"dst_ip": "224.0.0.251",
			"pcr": 1.0000
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 6,
			"dayseen": 9,
			"sum_sbytes": 531477,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 0,
			"dst_ip": "224.0.0.252",
			"pcr": 1.0000
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 1,
			"sum_sbytes": 125828,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 273530,
			"dst_ip": "23.99.125.126",
			"pcr": -0.3698
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 17,
			"dayseen": 17,
			"sum_sbytes": 35695641,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 0,
			"dst_ip": "239.255.255.250",
			"pcr": 1.0000
		},
		{
			"trust": "neutral",
			"src_ip_cnt": 1,
			"dayseen": 4,
			"sum_sbytes": 334599,
			"domain": "0-edge-chat.facebook.com",
			"type": "sns",
			"sum_dbytes": 1247350,
			"dst_ip": "31.13.68.12",
			"pcr": -0.5770
		},
		{
			"trust": "neutral",
			"src_ip_cnt": 1,
			"dayseen": 2,
			"sum_sbytes": 335772,
			"domain": "pixel.facebook.com",
			"type": "sns",
			"sum_dbytes": 9057768,
			"dst_ip": "31.13.68.35",
			"pcr": -0.9285
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 6,
			"dayseen": 11,
			"sum_sbytes": 10947985,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 21494964,
			"dst_ip": "35.186.213.138",
			"pcr": -0.3251
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 6,
			"sum_sbytes": 25410,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 122564,
			"dst_ip": "50.16.228.90",
			"pcr": -0.6566
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 6,
			"sum_sbytes": 111276,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 401644,
			"dst_ip": "52.0.217.44",
			"pcr": -0.5661
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 7,
			"sum_sbytes": 1204876,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 2468358,
			"dst_ip": "52.196.210.250",
			"pcr": -0.3440
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 1,
			"sum_sbytes": 115916,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 313730,
			"dst_ip": "52.197.86.192",
			"pcr": -0.4604
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 2,
			"sum_sbytes": 358684,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 1196510,
			"dst_ip": "52.198.10.4",
			"pcr": -0.5387
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 4,
			"sum_sbytes": 534130,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 1211312,
			"dst_ip": "52.198.181.119",
			"pcr": -0.3880
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 2,
			"dayseen": 5,
			"sum_sbytes": 498253,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 1544325,
			"dst_ip": "52.22.164.243",
			"pcr": -0.5121
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 1,
			"sum_sbytes": 363544,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 1222654,
			"dst_ip": "52.37.26.98",
			"pcr": -0.5416
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 2,
			"sum_sbytes": 19690,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 199066,
			"dst_ip": "52.6.43.173",
			"pcr": -0.8200
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 2,
			"sum_sbytes": 460750,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 740780,
			"dst_ip": "52.68.188.183",
			"pcr": -0.2331
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 1,
			"sum_sbytes": 380994,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 2198372,
			"dst_ip": "54.145.214.175",
			"pcr": -0.7046
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 8,
			"sum_sbytes": 1546500,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 2522688,
			"dst_ip": "54.178.186.199",
			"pcr": -0.2399
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 2,
			"dayseen": 4,
			"sum_sbytes": 258520,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 829450,
			"dst_ip": "54.210.192.224",
			"pcr": -0.5248
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 3,
			"sum_sbytes": 398524,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 1001512,
			"dst_ip": "54.239.186.216",
			"pcr": -0.4307
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 3,
			"sum_sbytes": 540524,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 895948,
			"dst_ip": "54.249.42.226",
			"pcr": -0.2474
		},
		{
			"trust": "low",
			"src_ip_cnt": 1,
			"dayseen": 4,
			"sum_sbytes": 137116,
			"domain": "my.jrebel.com",
			"type": "uncategorized",
			"sum_dbytes": 584928,
			"dst_ip": "54.84.195.230",
			"pcr": -0.6202
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 2,
			"sum_sbytes": 12600626,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 716017022,
			"dst_ip": "59.18.46.76",
			"pcr": -0.9654
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 2,
			"dayseen": 8,
			"sum_sbytes": 2125373,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 76655031,
			"dst_ip": "68.232.45.253",
			"pcr": -0.9460
		},
		{
			"trust": "high",
			"src_ip_cnt": 4,
			"dayseen": 9,
			"sum_sbytes": 7319568,
			"domain": "stylevi.com",
			"type": "portal",
			"sum_dbytes": 36892930,
			"dst_ip": "8.8.8.8",
			"pcr": -0.6689
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 4,
			"sum_sbytes": 1369330,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 2052882,
			"dst_ip": "81.161.59.94",
			"pcr": -0.1997
		},
		{
			"trust": "neutral",
			"src_ip_cnt": 1,
			"dayseen": 1,
			"sum_sbytes": 2208,
			"domain": "ntp.ubuntu.com",
			"type": "management",
			"sum_dbytes": 2112,
			"dst_ip": "91.189.89.199",
			"pcr": 0.0222
		},
		{
			"trust": "tbd",
			"src_ip_cnt": 1,
			"dayseen": 3,
			"sum_sbytes": 6240,
			"domain": "n/a",
			"type": null,
			"sum_dbytes": 5472,
			"dst_ip": "91.189.91.157",
			"pcr": 0.0656
		}
	];
	
	
	
	
	var chartOpt = {
		"chartId":"scatterPlotGraph1",
		"xAxis":{
			"value": "pcr",
			"title": "PCR"
		},
		"yAxis":{
			"title": "dayseen의 고유 카운트"
		},
		"graph":{
			"type": "scatter",
			"colorField": "color",
			"guideLine":{
				"color": "#5CA2D0",
				"value": 0
			},
			"value": "dayseen",
			"balloonText":getBalloonCss({
				"Domain": "<b>[[domain]]</b>",
				"Trust": "<b>[[trust]]</b>",
				"dayseen의 고유 카운트": "<b>[[dayseen]]</b>",
				"Nr.of sip": "<b>[[src_ip_cnt]]</b>",
				"Dbytes": "<b>[[sum_dbytes]]</b>",
				"Sbytes": "<b>[[sum_sbytes]]</b>",
				"PCR": "<b>[[pcr]]</b>"
			})
		},
		"balloon":{

		}
	};
	
	
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


