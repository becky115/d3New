/**
 * Created by ejlee on 2016. 5. 26..
 */

/**
 * D3.js
 */

//TODO debugMode
var NaruSecD3Js = function (){
	this._graphWidth = null;
	this._graphHeight = null;
	this._legendWidth = null;
	this._legendHeight = null;
	this.svgMargin = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};

	this.chartId = null;//TODO NEW



	this.axisX0 = 0; //NEW
	this.x0Scale = null; //bottom
	this.x1Scale = null; //top
	this.y0Scale = null; //leftlib
	this.y1Scale = null; //right

	this.x0OutputType = null;
	this.x1OutputType = null;
	this.y0OutputType = null;
	this.y1OutputType = null;

	this.x0Axis = null;
	this.x1Axis = null;
	this.y0Axis = null;
	this.y1Axis = null;

	this.yMark = null;

	this.x0Value = null;//TODO NEW
	this.y0Value = null;//TODO NEW

	this.data = null;//TODO NEW

	this.init();

};

NaruSecD3Js.getColor = function(index) {
	if(index == undefined || index == null || isNaN(index)) index = 0;
	if(typeof(index) == "string") index = parseInt(index, 10);

	var basicColor = ["#3499E5", "#60BA53", "#F0C609", "#F29037", "#D3361E", "#AF5ADD", "#ADACAC", "#40C9FA", "#A9D50B", "#E5E907", "#D26014", "#BD4579", "#8000FF", "#998979", "#013ADF", "#088A4B", "#FEB305", "#B77C24", "#C94949" , "#B4045F", "#6E6E6E"];//파초노주빨보은;
	var colorLength = basicColor.length;
	return basicColor[index%colorLength];
};

NaruSecD3Js.createLineGraph = function(opt, data){
	var chartId = opt.id;
	if(!chartId){
		console.log("not select chartId:", chartId);
		return;
	}
	var objD3 = new NaruSecD3Js();
	
	objD3.chartId = chartId;
	objD3.data = data;
	
	objD3.setX0Scale("ordinal");
	objD3.setY0Scale("linear");
	
	objD3.setX0OutputType("rangeBands");
	objD3.setY0OutputType("range");
	
	objD3.setX0Value(opt.x.value);
	objD3.setY0Value(opt.y.value);

	var dataCount = d3.max(data, function(d){
		return d[opt.y.value];
	});
	
	var yMaxDomain = dataCount + (10 - (dataCount % 10));

	var objDraw = objD3.createGraph(chartId, objD3.svgMargin);

	objD3.setX0OutputRange();
	objD3.setY0OutputRange();
	
	objD3.getX0Scale().domain(objD3.data.map(function(d){
		return d[objD3.getX0Value()];
	}));
	objD3.setY0Domain(0, yMaxDomain);

	objD3.createX0Axis2(opt.x); //TODO
	objD3.createY0Axis2(); //TODO

	objD3.drawX0Axis(objDraw, "x axis");


	var yTitle = opt.y.title;
	objD3.drawY0Axis(objDraw, "y axis", yTitle);
	
	//		objDraw.select(".x.axis")
	//.selectAll(".tick text")
	//.call(objD3.xTicksDateWrap, objD3.getXScale().rangeBand());

	//line Graph
	var drawFn = createLine(objD3, objDraw);
};

function createLine(objD3, objDraw){
	//line Graph
	var line = d3.svg.line()
				.interpolate("linear")
				.x(function(d){
					return objD3.getX0Scale(d[objD3.getX0Value()]) + (objD3.getX0Scale().rangeBand() / 2);
				})
				.y(function(d){
					return objD3.getY0Scale(d[objD3.getY0Value()]);
				});

	var lineLayer = objDraw.append("g").attr("class", "lineLayer");
	lineLayer.append("path")
			.datum(objD3.data)
			.attr("class", "line")
			.style("stroke-width", 2)
			.attr("d", line)
			.style("stroke", NaruSecD3Js.getColor(0));

	var objCircles = lineLayer.selectAll("circle")
		.data(objD3.data);

	objCircles.enter()
			.append("circle")
			.attr("class", "lineChart-circle")
			.attr("r", 2)
			.attr("cx", function(d) {
				return objD3.getX0Scale(d[objD3.getX0Value()]) + (objD3.getX0Scale().rangeBand() / 2);
			})
			.attr("cy", function(d) {
				return objD3.getY0Scale(d[objD3.getY0Value()]);
			})
			.style("stroke", NaruSecD3Js.getColor(0))//function(d){return d.color};
			.style("fill", "#fff")
			.style("stroke-width", 1);

}


NaruSecD3Js.createBarGraph = function(opt, data){
	var chartId = opt.id;
	//console.log("chartId", chartId);

	if(!chartId){
		console.log("not select chartId:", chartId);
		return;
	}
	var objD3 = new NaruSecD3Js();

	objD3.chartId = chartId;
	objD3.data = data;
	objD3.setX0Scale("ordinal");
	objD3.setY0Scale("linear");

	objD3.setX0OutputType("rangeBands");
	objD3.setY0OutputType("range");

	objD3.setX0Value(opt.x.value);
	objD3.setY0Value(opt.y.value);

	var dataCount = d3.max(data, function(d){
		return d[opt.y.value];
	});
	
	var yMaxDomain = dataCount + (10 - (dataCount % 10));
	// x축 _graphWidth 설정
	var yTitle = opt.y.title;
	objD3.setAxisWidth(yMaxDomain, yTitle);

	var objDraw = objD3.createGraph(chartId, objD3.svgMargin, opt);

	objD3.setX0OutputRange();
	objD3.setY0OutputRange();

	//domain x,y
	//TODO 함수
	objD3.getX0Scale().domain(objD3.data.map(function(d){
		return d[objD3.getX0Value()];
	}));
	objD3.setY0Domain(0, yMaxDomain);

	objD3.createX0Axis2(opt.x); //TODO
	objD3.createY0Axis2(); //TODO

	objD3.drawX0Axis(objDraw, "x axis");
	objD3.drawY0Axis3(objDraw, "y axis", true, yTitle);

	var drawFn = createBarRect(objD3, objDraw, opt.radius);
	var objBars = drawFn(opt.animation);

	if(opt.balloon){
		//create balloon
		createBalloon(objD3, objBars, opt.balloon);
	}

	var objLegendDraw = null;
	if(opt.legend){
		//create legend
		objLegendDraw = createLegend2(objDraw, objD3, objBars, opt.balloon)
	}

	resizeGraph();

	function resizeGraph(){
		var objFn = function(){
			redrawChart();
		};

		objD3.addWindowResizeEvent(objFn);
	}

	function redrawChart(){ 
		var objChart = d3.select("#" + chartId);
		var clientRect = objChart.node().getBoundingClientRect();
		var clientWidth = clientRect.width;
		var clientHeight = clientRect.height;
		
		if(clientWidth > 0 && clientHeight > 0){
			objD3.resize();

			drawFn(opt.animation); //drawBarRect
			if(objLegendDraw) objLegendDraw();
		}
	}

	function setData(data){
		objD3.data = data;

		//update data
		var dataCount = d3.max(data, function(d){
			return d[opt.y.value];
		});

		//	width가 변하면 (y축 텍스트가 길어질때 )
		objD3.setAxisWidth(dataCount, yTitle);

		var graphLayer = d3.select("#"+chartId);
		var clientRect = graphLayer.node().getBoundingClientRect();

		objD3.setSvgSize(objD3.chartId, clientRect.width, clientRect.height);
		objD3.setX0OutputRange();

		//scale set Domain
		objD3.getX0Scale().domain(objD3.data.map(function(d){
			return d[objD3.getX0Value()];
		}));
		objD3.setY0Domain(0, dataCount + (10 - (dataCount % 10)));

		//update rect
		var drawFn = createBarRect(objD3, objDraw, opt.radius);
		drawFn(opt.animation);

		//update xAxis;
		//update yAxis

		if(objD3.x0Axis){
			objDraw.select(".x.axis")
				.attr("transform", "translate(0," + objD3.getGraphHeight() + ")")
				.call(objD3.x0Axis);
		}

		if(objD3.y0Axis){
			objD3.y0Axis.tickSize(-(objD3.getGraphWidth() - objD3.getLegendWidth()));
			var yAxis = objDraw.select(".y.axis");
			yAxis.call(objD3.y0Axis);

			if(yTitle){
				yAxis.select(".y.title").attr("y", objD3.yTextPos(yAxis));
			}
		}

		if(objD3.yMark){
			objDraw.select(".y.mark").call(objD3.yMark);
		}

	}

	return {
		obj:objDraw.node().parentNode,
		update: setData,
		resize: redrawChart
	};

};

function createBalloon(objD3, objRect, optBalloon){
	//tooltip
	var divToolTip = objD3.createToolTip(objD3.chartId);

	var fmtText = optBalloon.value;
	var regxp = /\[{2}([^\]]+)\]{2}/g;

	//var svgMarginLeft = objD3.svgMargin.left;
	var svgMarginRight = objD3.svgMargin.right;
	//var svgMarginTop = objD3.svgMargin.top;
	var svgMarginBottom = objD3.svgMargin.bottom;
	var timeFormat = d3.time.format("%Y-%m-%d");
	
	objRect.on("mousemove.one", function() {//툴팁 좌표이동
		var clientPos = d3.select("#"+objD3.chartId).select(".naru-chart-graph").select("svg").node().getBoundingClientRect();
		
		var toolTipWidth = parseInt(divToolTip.style("width"), 10);
		var limitWidth = clientPos.width - svgMarginRight;//clientPos.right - svgMarginRight;
		
		var toolTipHeight = parseInt(divToolTip.style("height"), 10);
		var limitHeight = clientPos.height - svgMarginBottom;
		
		var posX = d3.event.clientX - clientPos.left + 10;
		var posY = d3.event.clientY - clientPos.top + 10;
		
		if(posX + toolTipWidth > limitWidth){
			posX =  posX - toolTipWidth - 20;
		}

		if(posY + toolTipHeight > limitHeight){
			posY =  posY - toolTipHeight;
		}
	
		if(posX + toolTipWidth > limitWidth){
			posX = limitWidth - toolTipWidth - 10;//posX - ((posX + toolTipWidth) - limitWidth) - 20;
		}
		
		divToolTip.style("left", posX + "px")
				.style("top", posY + "px");
	})
	.on("mouseout.one", function(d, i){
		divToolTip.transition()
			.duration(100)
			.style("opacity", 0);

		var obj = d3.select(this);
		var parentNode = obj.node().parentNode;
		obj.style("fill", "url(#"+objD3.getGradientColor(objD3.chartId, parentNode, i)+")");
	})
	.on("mouseover.one", function(d, i){
		var toolTipMessage = fmtText.replace(regxp, function(match, p1, p2, p3, offset, string){
			var dataMap = d.data === undefined ? d:d.data;
			if(objD3.getX0Value() === p1 && optBalloon.timeFormat){
				return timeFormat(dataMap[p1]);
			}
		
			return dataMap[p1];
		});

		objD3.showToolTip(divToolTip, toolTipMessage);
		divToolTip.style("border", "2px solid "+ d3.rgb(NaruSecD3Js.getColor(i)).darker(0.5));

		var obj = d3.select(this);
		obj.style("fill", d3.rgb(NaruSecD3Js.getColor(i)).brighter(0.3));//darker
	});

}

function createBarRect(objD3, objDraw, radius){
	//bar
	var barLayer = objDraw.select(".barLayer");
	if(barLayer[0][0] == null){
		barLayer = objDraw.append("g").attr("class", "barLayer");
	}

	var objBars = barLayer.selectAll(".bar")
		.data(objD3.data);

	objBars.enter()
		.append("rect")
		.attr("class", "bar");
	
	radius = parseInt(radius);
	if(!isNaN(radius)){
		objBars.attr("rx", radius)
			.attr("ry", radius);
	}
	
	objBars.style("fill", function(d, i) {
		return "url(#"+objD3.getGradientColor(objD3.chartId, d3.select(".barLayer").node(), i)+")";
	});

	objBars.exit().remove();

	return (function drawBarRect(animation){
			var barWidth = objD3.getX0Scale().rangeBand() * 3 / 4;
			var outer = (objD3.getX0Scale().rangeBand() - barWidth) / 2;

			objBars.attr("x", function(d, i){
					return objD3.getX0Scale(d[objD3.getX0Value()]) + outer;
				})
				.attr("width", barWidth)
				

			if(animation && Object.keys(animation).length > 0){
				//transition
				objBars
					.attr("y", objD3.getGraphHeight())
					.attr("height", 0)
					.transition().duration(isNaN(parseInt(animation.duration)) ? 1000:parseInt(animation.duration))
					.attr("y", function(d){
						return objD3.getY0Scale(d[objD3.getY0Value()]);
					})
					.attr("height", function(d){
						//console.log( objD3.getGraphHeight() - objD3.getY0Scale(d[objD3.getY0Value()]));
						return objD3.getGraphHeight() - objD3.getY0Scale(d[objD3.getY0Value()]);
					});
			}else{
				objBars.attr("y", function(d){
						return objD3.getY0Scale(d[objD3.getY0Value()]);
					})
					.attr("height", function(d){
						return objD3.getGraphHeight() - objD3.getY0Scale(d[objD3.getY0Value()]);
					});
			}
			return objBars;
		}
	);
}

function createLegend2(objDraw, objD3, objBars, optLegend){
	//naru-chart-legend

	var legendWidth = objD3.getLegendWidth();
	var legendHeight = objD3.getLegendHeight();

	var rowHeight = 20;
	var rowMaxCount = 3;

	var basicWidth = 60;
	//var legendMaxHeight = legendMaxRow * 10;

	var labelMaxLength = d3.max(objD3.data, function(d){
		return d[objD3.getX0Value()].length; //get
	});

	var maxWidth = (labelMaxLength * 8) + 18;//18: rect size

	if(maxWidth < basicWidth) maxWidth = basicWidth;

	var rowCount =  Math.floor(legendWidth / maxWidth);

	if(rowCount > objD3.data.length) rowCount = objD3.data.length;


	//var legendPosX = 0;
	//var legendPosY = objD3.getGraphHeight() - legendMaxHeight;


	var legendLayer = d3.select(".naru-chart-legend").select("svg").select("g.legendLayer");
	//	.attr("transform", "translate("+legendPosX+", "+ legendPosY+")");


	var legendStPos = (legendWidth - (rowCount * maxWidth))/2; //가운데로
	console.log("legendWidth", legendWidth);
	console.log("rowCount", rowCount);
	console.log("maxWidth", maxWidth);
	console.log("legendStPos", legendStPos);

	var objLegends = legendLayer.selectAll("legend")
		.data(objD3.data);

	objLegends.enter()
		.append("g")
		.attr("class", "legend")
		.attr("style", function(d, i){
			/*
			var y = Math.floor(i/legendCount) * 20;

			if(y > legendMaxHeight){
				return "display:none";
			}else{
				return"display:block";
			}
			*/
			return "block";
		})
		.attr("transform", function(d, i) {
			console.log(maxWidth, legendStPos);
			var x = (i % rowCount) * maxWidth + legendStPos;
			var y = Math.floor(i / rowCount) * rowHeight;
			//.attr("transform", function(d, i) { return "translate("+0+","+(i * 20) +")"; }); --> 수직
			return "translate("+x+","+y+")";
		});

	objLegends.append("rect")
//		.filter(function(d, i){
//			if(Math.floor(i/legendCount) < maxRow){
//				return d;
//			}
////			if(수직 ){
////				var yPosition = i * 20;
////				if(yPosition <= _legendHeight) return d;
////			}
//			//수평
//			//if(yPosition <= _legendHeight) return d;
//
//		})
		.attr("x", 0)
		.attr("width", 18)
		.attr("height", 10)
		.style("fill", function(d, i){
			return NaruSecD3Js.getColor(i);
		});

	objLegends.append("text")
//		.filter(function(d, i){
//			console.log("filter....: " + maxRow)
//			if(Math.floor(i/legendCount) < maxRow){
//				return d;
//			}
////			var yPosition = i * 20;
////			if(yPosition <= _legendHeight) return d;
//		})
		.attr("x", 20)
		.attr("y", 10)
		//.attr("dy", ".35em")
		.attr("class", "legend-text")
		.style("text-anchor", "start")
		.style("fill", function(d, i) { return d3.rgb(NaruSecD3Js.getColor(i)); })
		.text(function(d) {
			console.log(d)
			return d[objD3.getX0Value()];
		});


}


function createLegend(objDraw, objD3, objRect, optLegend){
	//legend position
	//position에 따른 legend maxHeight;
	//position에 따른 legend maxWidth;
	//default Option
	
	//TODO
//	if(optLegend.position === undefined) optLegend.position = "bottom";
//	
//	var legendWidth = objD3.getGraphWidth();
//	var legendHeight = objD3.getGraphHeight();
//	
//	if(optLegend.position === "bottom"){
//		_legendHeight = 20;
//	}else if(optLegend.position === "left"){
//		
//	}else if(optLegend.position === "right"){
//		
//	}else if(optLegend.position === "top"){
//		
//	}
	var legendMaxRow = 3;
	var legendMaxHeight = legendMaxRow * 10;
	
	var legendPosX = 0;
	var legendPosY = objD3.getGraphHeight() - legendMaxHeight;

	var legend = objDraw.append("g")
						.attr("class", "legendLayer")
						.attr("transform", "translate("+legendPosX+", "+ legendPosY+")");

	var labelMaxLength = d3.max(objD3.data, function(d){
		return d[objD3.getX0Value()].length; //get
	});
	
	var graphWidth = objD3.getGraphWidth();
	var legendWidth = 8 * labelMaxLength;
	var legendCount = Math.floor(graphWidth / legendWidth);

	
	var legendStPos = (graphWidth - (legendCount * legendWidth))/2;

	var legendSub = legend.selectAll("legend")
						.data(objD3.data);

	legendSub.enter()
			.append("g")
			.attr("class", "legend")
			.attr("style", function(d, i){
				var y = Math.floor(i/legendCount) * 20;
				
				if(y > legendMaxHeight){
					return "display:none";
				}else{
					return"display:block";
				}
			})
			.attr("transform", function(d, i) {
				var x = (i%legendCount)* legendWidth + legendStPos;
				var y = Math.floor(i/legendCount) * 10;
				//.attr("transform", function(d, i) { return "translate("+0+","+(i * 20) +")"; }); --> 수직 
				return "translate("+x+","+y+")"; 
			});


	legendSub.append("rect")
//		.filter(function(d, i){
//			if(Math.floor(i/legendCount) < maxRow){
//				return d; 
//			}
////			if(수직 ){
////				var yPosition = i * 20;
////				if(yPosition <= _legendHeight) return d;
////			}
//			//수평 
//			//if(yPosition <= _legendHeight) return d;
//			
//		})
		.attr("x", 0)
		.attr("width", 18)
		.attr("height", 10)
		.style("fill", function(d, i){
			return NaruSecD3Js.getColor(i);
		});
	
	legendSub.append("text")
//		.filter(function(d, i){
//			console.log("filter....: " + maxRow)
//			if(Math.floor(i/legendCount) < maxRow){
//				return d;
//			}
////			var yPosition = i * 20;
////			if(yPosition <= _legendHeight) return d;
//		})
		.attr("x", 23)
		.attr("y", 14)
		//.attr("dy", ".35em")
		.attr("class", "legend-text")
		.style("text-anchor", "start")
		.style("fill", function(d, i) { return d3.rgb(NaruSecD3Js.getColor(i)); })
		.text(function(d) {
			return d.key;
		});
	
	
	return (function(){
		var graphWidth = objD3.getGraphWidth();
		
		var legendCount = Math.floor(graphWidth / legendWidth);
		var legendStPos = (graphWidth - (legendCount * legendWidth))/2;

		legendSub.attr("transform", function(d, i) {
			var x = (i%legendCount)* legendWidth + legendStPos;
			var y = Math.floor(i/legendCount) * 20;
			return "translate("+x+","+y+")"; 
		})
		.attr("style", function(d, i){
			var y = Math.floor(i/legendCount) * 20;
			if(y > legendMaxHeight){
				return "display:none";
			}else{
				return"display:block";
			}
		})
		
	});
}


NaruSecD3Js.createPieGraph = function(opt, data){
	var chartId = opt.id;
	//console.log("chartId", chartId);

	if(!chartId){
		console.log("not select chartId:", chartId);
		return;
	}
	var objD3 = new NaruSecD3Js();

	var total = d3.sum(data, function(d) { 
		return d.values; 
	});
	
	var percentageFormat = d3.format("%");
	data.forEach(function(d) {
		d.percentage = percentageFormat(d.values / total);
	});
	
	objD3.chartId = chartId;
	objD3.data = data;
	
	objD3.setX0Value(opt.x.value);
	objD3.setY0Value(opt.y.value);

	var objDraw = objD3.createGraph(chartId, objD3.svgMargin);
	
	var drawFn = createPie(objD3, objDraw);
	var objPies = drawFn();

	if(opt.balloon){
		createBalloon(objD3, objPies, opt.balloon);
	}

	var objLegendDraw = null;
	if(opt.legend){
		objLegendDraw = createLegend(objDraw, objD3, objPies, opt.balloon)
	}
	
	resizeGraph();
	
	function resizeGraph(){
		var objFn = function(){
			redrawChart();
		};

		objD3.addWindowResizeEvent(objFn);
	}
	
	function redrawChart(){
		var objChart = d3.select("#" + chartId);
		var clientRect = objChart.node().getBoundingClientRect();
		var clientWidth = clientRect.width;
		var clientHeight = clientRect.height;
		
		if(clientWidth > 0 && clientHeight > 0){
			objD3.resize();
			
			drawFn(opt.animation);
			if(objLegendDraw) objLegendDraw();
			
		}
		
	}
	
	return {
		resize: redrawChart
	};
	
}

function createPie(objD3, objDraw){
	//pie
	var pieLayer = objDraw.select(".pieLayer");
	if(pieLayer[0][0] == null){
		pieLayer = objDraw.append("g").attr("class", "pieLayer")
	}
	
	var pie = d3.layout.pie()
				.sort(null)
				.value(function(d) {
					return d[objD3.getY0Value()];
				});
	
	
	var objArc = pieLayer.selectAll(".arc")
						.data(pie(objD3.data));
	
	objArc.enter()
		.append("g")
		.attr("class", "arc");

	objArc.append("path")
		.attr("class", "pie")
		.style("fill", function(d, i) {
			var parentNode = d3.select(this).node().parentNode; 
			return "url(#"+objD3.getGradientColor(objD3.chartId, parentNode, i)+")";
		});
	objArc.append("text")
			.attr("class", "pie-text")
			.attr("dy", ".35em")
			.style("text-anchor", "middle")
			.style("fill", function(d, i) { return d3.rgb(NaruSecD3Js.getColor(i)).brighter(2); })
		
	
	objArc.on("mouseover.two", function(d, i){
		d3.select(this).select(".pie").style("fill", d3.rgb(NaruSecD3Js.getColor(i)).brighter(0.3));
	});
	
	objArc.on("mouseout.two", function(d, i){
		var linearGradient = d3.select(this).select(".linear_gradient");
		var linearGradientId = linearGradient.property("id");
		if(linearGradientId != null) d3.select(this).select(".pie").style("fill", "url(#"+linearGradientId+")");
	});

	
	return (function(animation){
		var width = objD3.getGraphWidth();
		var height = objD3.getGraphHeight();
	
		//TODO 
		var legendHeight = 60;
		pieLayer.attr("transform", "translate(" + width / 2 + "," + (height - legendHeight) / 2 + ")");
		
		var radius = Math.min(width, height) / 3;
		
		var arc = d3.svg.arc()
					.outerRadius(radius - 10)
					.innerRadius(0);
		
		function tweenPie(finish, a, b) {
			var start = {
				startAngle: 0,
				endAngle: 0
			};
			var i = d3.interpolate(start, finish);
			return function(d) {
				return arc(i(d)); 
			}
		}

		var percentageFormat = d3.format("%");
		var check = 0;
		objArc.selectAll('.pie')
			.attr("d", arc)
			.each(function() {
				check++;
			})
			.transition()
			.duration(1000)
			.each("end", function(i){
				check--;
				if(check == 0){
					objArc.selectAll(".pie-text")
					.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
					.filter(function(d, i){ //TODO	hide label opt
						var hideLabelPercent = 5;
						var value = Number(d.data["percentage"].replace("%",	""));
						if(value >= hideLabelPercent) return value;
					})
					.text(function(d) { 
						return d.data["percentage"];
					});
				
				}
				
			})
			.attrTween('d', tweenPie);
		
		return objArc;
	});
	

}


NaruSecD3Js.createForceGraph = function(opt, nodesData, linksData){
	var chartId = opt.id;
	//console.log("chartId", chartId);

	if(!chartId){
		console.log("not select chartId:", chartId);
		return;
	}
	var objD3 = new NaruSecD3Js();
	objD3.chartId = chartId;
	objD3.data = {
		"nodesData": nodesData,
		"linksData": linksData
	};
	
	objD3.setX0Value(opt.x.value);
	//objD3.setY0Value(opt.y.value);
	
	var objDraw = objD3.createGraph(chartId, objD3.svgMargin);
	
	var drawFn = createForce(objD3, objDraw);
	var objForce = drawFn();
	
	if(opt.balloon){
	//	createBalloon(objD3, objForce, opt.balloon);
	}
	
	resizeGraph();
	
	function resizeGraph(){
		var objFn = function(){
			redrawChart();
		};

		objD3.addWindowResizeEvent(objFn);
	}
	
	function redrawChart(){
		var objChart = d3.select("#" + chartId);
		var clientRect = objChart.node().getBoundingClientRect();
		var clientWidth = clientRect.width;
		var clientHeight = clientRect.height;
		
		if(clientWidth > 0 && clientHeight > 0){
			objD3.resize();
			drawFn(opt.animation);
		}
	}
	
	return {
		resize: redrawChart
	};
	
}

function createForce(objD3, objDraw){
	var cSizeMax = 30;
	var cSizeMin = 15;//포트 주석풀면 10
	var radius = d3.scale.sqrt().domain([cSizeMin, cSizeMax]).range([0, 100]);
		
	var force = d3.layout.force()
				.size([objD3.getGraphWidth(), objD3.getGraphHeight()])
				.charge(-100)
				.linkDistance(function(d) {
					var distance = (radius(d.source.cSize) + radius(d.target.cSize) + 20);
					return distance;
				})
				//.friction(0.5)
				//.gravity(0.1)
				.linkStrength(0.5);
					

//	var drag = force.drag()
//				.on("dragstart", function(d) {
//					//d3.event.sourceEvent.stopPropagation();
//					 //force.stop();
//				});
	

	var objTemp = objDraw.append("g");
	/*
	 * zoom 기능
		
		objTemp.call(d3.behavior.zoom().on("zoom", zoomed));
		
		function zoomed(){
			objTemp.attr("transform",
				"translate(" + d3.event.translate + ")"
				+ " scale(" + d3.event.scale + ")");
		};
	*/
	
	var nodesData = objD3.data.nodesData;
	var linksData = objD3.data.linksData;
	
//	var link = objTemp.selectAll(".link")
//					.data(linksData)
//					.enter()
//					.append("line")
//					.attr("class", "link")
//					.style("stroke-width", 1);
//	
//	console.log("---link---")


	force.nodes(nodesData)
		.links(linksData)
		.start();
	
	/*화살표 test--ing
	objTemp.append("svg:defs")
		.selectAll("marker")
		.data(["end"])
		.enter().append("svg:marker")
		.attr("id", String)
		.attr("viewBox", "-5 -5 10 10")
		.attr('markerHeight', 10)
		.attr('markerWidth', 10)
		.attr('markerUnits', 'strokeWidth')
		.attr('orient', 'auto')
		.attr('refX', -5)
		.attr('refY', 0)
		.append("svg:path")
		.attr("d", "M0,0L10,-5L10,5")
		.attr('fill', function(d,i) {
			 return "red";	
		});
	*/

	var path = objTemp.append("svg:g").selectAll("path")
		.data(force.links())
		.enter().append("svg:path")
		.attr("class", "link");
	
	 var node = objTemp.selectAll(".node")
	 				.data(force.nodes())
					.enter()
					.append("g")
					.attr("class", "node")
					.on("mouseover", function(d){
						d3.select(this).select("circle").transition()
						.duration(750)
						.attr("r", d.cSize+ parseInt(d.cSize/2, 10));
					})
					.on("mouseout", function(d){
						d3.select(this).select("circle").transition()
						.duration(750)
						.attr("r", d.cSize);
					})
					.call(force.drag);

		
	node.append("circle")
		.attr("r", function(d) {
			return d.cSize;
		})
		.style("fill", function(d, i) { 
			var parentNode = d3.select(this).node().parentNode;
			return "url(#"+objD3.getGradientColor(objD3.chartId, parentNode, i)+")";
		});
	
	node.append("text")
		.attr("dx", function(d) {return d.dx;})
		.attr("dy", ".35em")
		.attr("class", "circle-text")
		.text(function(d) { 
			return d[objD3.getX0Value()]; 
		})//TODO 
		.style("stroke", function(d) { return d3.rgb(NaruSecD3Js.getColor(d.group)); });
	
	force.on("tick", function() {
//		link.attr("x1", function(d) { return d.source.x; })
//			.attr("y1", function(d) { return d.source.y; })
//			.attr("x2", function(d) { return d.target.x; })
//			.attr("y2", function(d) { return d.target.y; });
		
		 path.attr("d", function(d) {
			 var dx = d.target.x - d.source.x,
				 dy = d.target.y - d.source.y,
				 dr = Math.sqrt(dx * dx + dy * dy);
			 return "M" + 
				 d.source.x + "," + 
				 d.source.y + "A" + 
				 dr + "," + dr + " 0 0,1 " + 
				 d.target.x + "," + 
				 d.target.y;
		});
		
		node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
		node.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });
	});
	
	return (function(){
		var width = objD3.getGraphWidth();
		var height = objD3.getGraphHeight();
		force.size([width, height]).resume();
	});
}


NaruSecD3Js.prototype = function () {
	var resizeEvent = [];

	return {
		init: function () {
			this.initValue();
		},

		initValue: function () {//변수 초기화
			this._graphWidth = 0;
			this._graphHeight = 0;
			this.svgMargin = {
				top: 20,
				right: 20,
				bottom: 30,
				left: 20
			};

			this.chartId = null;//TODO NEW

			this._legendWidth = 0;
			this._legendHeight = 0;

			this.axisX0 = 0; //NEW
			this.x0Scale = null; //bottom
			this.x1Scale = null; //top
			this.y0Scale = null; //left
			this.y1Scale = null; //right

			this.x0OutputType = null;
			this.x1OutputType = null;
			this.y0OutputType = null;
			this.y1OutputType = null;

			this.x0Axis = null;
			this.x1Axis = null;
			this.y0Axis = null;
			this.y1Axis = null;

			this.yMark = null;

			this.x0Value = null;//TODO NEW
			this.y0Value = null;//TODO NEW

			this.data = null;//TODO NEW
		},

		setX0Value: function (value) {
			this.x0Value = value;
		},
		
		getX0Value: function () {
			return this.x0Value;
		},

		setY0Value: function (value) {
			this.y0Value = value;
		},

		getY0Value: function () {
			return this.y0Value;
		},

		addWindowResizeEvent: function (objFn) {
			resizeEvent[resizeEvent.length] = objFn;
			d3.select(window).on('resize.one', function () {
				for (var i = 0; i < resizeEvent.length; i++) {
					resizeEvent[i]();
				}
			});
		},

		removeWindowResizeEvent: function () {
			resizeEvent = [];
		},

		svgMarginSet: function (margin) {
			if (margin != null && margin != undefined) {
				this.svgMargin.top = (margin.top == null || margin.top == undefined || isNaN(margin.top)) ? 0 : margin.top;
				this.svgMargin.right = (margin.right == null || margin.right == undefined || isNaN(margin.right)) ? 0 : margin.right;
				this.svgMargin.bottom = (margin.bottom == null || margin.bottom == undefined || isNaN(margin.bottom)) ? 0 : margin.bottom;
				this.svgMargin.left = (margin.left == null || margin.left == undefined || isNaN(margin.left)) ? 0 : margin.left;
			}
		},

		setSvgSize: function (chartId, width, height) {
			this._graphWidth = width - (this.svgMargin.left + this.svgMargin.right + this.axisX0);
			this._graphHeight = height - (this.svgMargin.top + this.svgMargin.bottom);
			
			d3.select("#" + chartId).select(".naru-chart-graph").select("svg")
//				.attr("width", "100%")
//				.attr("height", "100%");
				.attr("width", width)
				.attr("height", height);
		},

		createGraph: function (chartId, svgMargin, opt) {
			console.log(svgMargin)
			this.svgMarginSet(svgMargin);
			var graphLayer = d3.select("#" + chartId);
			var clientRect = graphLayer.node().getBoundingClientRect();
			var clientWidth = clientRect.width;
			var clientHeight = clientRect.height;
			var graphHeight = clientHeight;


			graphLayer.select(".naru-chart-graph").select("svg").html("");


			var wrapper = graphLayer.append("div")
									.attr("class", "naru-chart-wrapper");

			var chartGraph = wrapper.append("div")
					.attr("class", "naru-chart-graph");


			var chartLegend = wrapper.append("div")
				.attr("class", "naru-chart-legend");



			var objGraphSvg = chartGraph.append("svg");
			var objLegendSvg = chartLegend.append("svg");
			var legendWidth = clientRect.width;
			var legendHeight = 0;//TODO
			if(opt && opt.legend){
				//legend.position bottom일때
				this._legendWidth = legendWidth;
				this._legendHeight = 60;
				graphHeight = clientHeight - this.getLegendHeight();
				chartLegend.style("width", this.getLegendWidth()+"px")
							.style("height", this.getLegendHeight()+"px")
							.style("top", graphHeight+"px");


				objLegendSvg.attr("width", this.getLegendWidth())
							.attr("height", this.getLegendHeight());

				objLegendSvg.append("g").attr("class", "legendLayer").attr("transform", "translate(" + this.svgMargin.left+ "," + 0+ ")");
			}


			chartGraph.style("width", clientWidth+"px")
						.style("height", clientHeight+"px");

			this.setSvgSize(chartId, clientWidth, graphHeight);

			//				.attr("viewBox", "0 0 " + width + " " + height)
			//				.attr("perserveaspectratio", "xMinYMid");
			var objTemp = objGraphSvg.append("g").attr("transform", "translate(" + (this.svgMargin.left + this.axisX0 ) + "," + this.svgMargin.top + ")");
			return objTemp;
		},

		getGraphWidth: function () {
			return this._graphWidth;
		},

		getGraphHeight: function () {
			return this._graphHeight;
		},

		getLegendWidth: function(){
			return this._legendWidth;
		},

		getLegendHeight: function(){
			return this._legendHeight;
		},

		setX0OutputType: function (v) {
			if (!arguments.length) return;
			this.x0OutputType = v;
		},

		setY0OutputType: function (v) {
			if (!arguments.length) return;
			this.yOutputType = v;
		},

		setY1OutputType: function (v) {
			if (!arguments.length) return;
			this.y1OutputType = v;
		},

		getX0Scale: function (v) {
			if (!arguments.length) {
				return this.x0Scale;
			}
			return this.x0Scale(v);
		},

		getY0Scale: function (v) {
			if (!arguments.length) return this.y0Scale;
			return this.y0Scale(v);
		},

		getY1Scale: function (v) {
			if (!arguments.length) return this.y1Scale;
			return this.y1Scale(v);
		},

		//TODO SCALE 종류
		setX0Scale: function (v) {
			if (!arguments.length) return;
			var x0ScaleType = v;

			if (x0ScaleType == "time") {
				this.x0Scale = d3.time.scale();
			} else if (x0ScaleType == "ordinal") {
				this.x0Scale = d3.scale.ordinal();
			}
		},

		setY0Scale: function (v) {
			if (!arguments.length) return;
			var y0ScaleType = v;

			if (y0ScaleType == "linear") {
				this.y0Scale = d3.scale.linear();
			}
		},

		setY1Scale: function (v) {
			if (!arguments.length) return;
			var y1ScaleType = v;

			if (y1ScaleType == "linear") {
				this.y1Scale = d3.scale.linear();
			}
		},

		setX0OutputRange: function () {
			if (this.x0Scale) {
				if (this.x0OutputType == "range") this.x0Scale.range([0, this.getGraphWidth()]);
				else if (this.x0OutputType == "rangeRoundBands") this.x0Scale.rangeRoundBands([0, this.getGraphWidth()], 0.1);
				else if (this.x0OutputType == "rangeBands") this.x0Scale.rangeBands([0, this.getGraphWidth()]);
			}
		},

		setY0OutputRange: function () {
			if (this.y0Scale) {
				if (this.yOutputType == "range") this.y0Scale.range([this.getGraphHeight(), 0]);
			}
		},

		setY1OutputRange: function () {
			if (this.y1Scale) {
				if (this.y1OutputType == "range") this.y1Scale.range([this.getGraphHeight(), 0]);
			}
		},

		setX0Domain: function (dataMin, dataMax) {
			if (dataMin == null || dataMin == undefined) {
				return;
			}
			if (dataMax == null || dataMax == undefined) {
				return;
			}
			this.x0Scale.domain([dataMin, dataMax]);
		},

		setY0Domain: function (yMinValue, yMaxValue) {
			if (yMinValue == null || yMinValue == undefined || isNaN(yMinValue)) {
				return;
			}
			if (yMaxValue == null || yMaxValue == undefined || isNaN(yMaxValue)) {
				return;
			}
			this.y0Scale.domain([yMinValue, yMaxValue]);
		},

		setY1Domain: function (yMinValue, yMaxValue) {
			if (yMinValue == null || yMinValue == undefined || isNaN(yMinValue)) {
				return;
			}
			if (yMaxValue == null || yMaxValue == undefined || isNaN(yMaxValue)) {
				return;
			}
			this.y1Scale.domain([yMinValue, yMaxValue]);
		},

		//TODO aXIS OPTION
		createX0Axis: function () {
			//TODO timeFormat
			var timeFormat = d3.time.format.multi(
				[[".%L", function (d) {
					return d.getMilliseconds();
				}],
					[":%S", function (d) {
						return d.getSeconds();
					}],
					["%I:%M", function (d) {
						return d.getMinutes();
					}],
					["%I %p", function (d) {
						return d.getHours();
					}],
					["%a %d", function (d) {
						d.textCss = true;
						return d.getDay() && d.getDate() != 1;
					}],
					["%b %d", function (d) {
						d.textCss = true;
						return d.getDate() != 1;
					}],
					["%B", function (d) {
						d.textCss = true;
						return d.getMonth();
					}],
					["%Y", function (d) {
						d.textCss = true;
						return true;
					}]]);

			this.x0Axis = d3.svg.axis()
				.scale(this.x0Scale)
				.tickSize(-this.getGraphHeight())
				.tickPadding(10)
				.tickSubdivide(true)
				.tickFormat(timeFormat)
				.orient("bottom");
		},

		createX0Axis2: function (optX) {
			this.x0Axis = d3.svg.axis()
				.scale(this.x0Scale)
				.tickSize(-this.getGraphHeight())
				.tickPadding(10)
				.tickSubdivide(true)
				.orient("bottom");
			
			if(optX.timeFormat){
				var timeFormat = d3.time.format("%Y-%m-%d");
				this.x0Axis.tickFormat(function (d) {
					return timeFormat(d);
				})
			}
		},

		createX0Axis4: function () {
			var timeFormat = d3.time.format("%m-%d");
			this.x0Axis = d3.svg.axis()
				.scale(this.x0Scale)
				//.tickFormat(timeFormat)
				//.ticks(d3.time.day, 1)
				.orient("bottom");
		},

		/*
		 createY0AxisTest: function (axisOption) {
			if (!axisOption) return;
			
			this.y0Axis = d3.svg.axis().scale(this.y0Scale);
	
			 if (axisOption.markFlag) {
			 this.yMark = d3.svg.axis().scale(this.y0Scale)
			 .tickSubdivide(true)
			 .tickFormat("");
			 }
	
			 if (axisOption.tickPadding) {
			 var optV = parseInt(axisOption.tickPadding);
			 if (!isNaN(optV)) this.y0Axis.tickPadding(optV);
			 }
	
			 if (axisOption.gridFlag) {//TODO alpha or flag
			 this.y0Axis.tickSize(-(this.getGraphWidth()));
			 }
	
			 if (axisOption.tickFormat) {//TODO else if 추가
			 if (axisOption.tickFormat == "number") this.y0Axis.tickFormat(d3.format("d"));
			 else this.y0Axis.tickFormat("");
			 }
	
			 if (axisOption.orient) { //TODO 추가
			 if (axisOption.orient == "left") {
			 this.y0Axis.orient("left");
			 if (this.yMark != null) this.y0Axis.orient("left");
			 }
			 }
	
			 if (axisOption.outerTickSize) {
			 var optV = parseInt(axisOption.outerTickSize);
			 if (!isNaN(optV)) this.y0Axis.outerTickSize(optV);
			 }

		 },
		 */

		createY0Axis: function () {
			this.y0Axis = d3.svg.axis()
				.scale(this.y0Scale)
				.tickPadding(10)
				.tickSize(-(this.getGraphWidth()))
				.tickSubdivide(true)
				.orient("left");
		},

		createY0Axis2: function () {
			this.y0Axis = d3.svg.axis()
				.scale(this.y0Scale)
				.tickPadding(8)
				.tickSize(-(this.getGraphWidth())) //TODO gridFlag --> gridAlpha?
				.tickSubdivide(true)
				.tickFormat(d3.format("d"))
				.orient("left");

			this.yMark = d3.svg.axis()
				.scale(this.y0Scale)
				.tickSubdivide(true)
				.tickFormat("")
				.orient("left");
		},

		createY0Axis3: function () {
			this.y0Axis = d3.svg.axis()
				.scale(this.y0Scale)
				.tickPadding(10)
				.tickSize(-(this.getGraphWidth()))
				.tickSubdivide(true)
				.tickFormat(d3.format("d"))
				.orient("left")
				.outerTickSize(0);

			this.yMark = d3.svg.axis()
				.scale(this.y0Scale)
				.tickSubdivide(true)
				.tickFormat("")
				.orient("left");
		},

		createY1Axis: function () {
			this.y1Axis = d3.svg.axis()
				.scale(this.y1Scale)
				.tickSubdivide(true)
				.tickFormat(d3.format("d"))
				.orient("right");
		},

		//TODO TEXT OPTION
		drawX0Axis: function (objDraw, className) {
			if (!objDraw) return;
			if (!className) className = "x axis";
			
			objDraw.append("g").attr("class", className)
				.attr("transform", "translate(0," + this.getGraphHeight() + ")")
				.call(this.x0Axis);

			d3.selectAll("g.x.axis g.tick text").attr("class", function (d) {
				if (d.textCss != undefined && d.textCss) return "tickText";
			});
		},

		drawX0Axis2: function (objDraw, className) {
			if (!objDraw) return;
			if (!className) className = "x axis";
			
			objDraw.append("g").attr("class", className)
				.attr("transform", "translate(0," + this.getGraphHeight() + ")")
				.call(this.x0Axis)
				.selectAll("text")
				.attr("x", 0)
				.attr("y", 5)
				.attr("dy", ".9em")
				.style("text-anchor", "middle");
		},

		drawY0Axis: function (objDraw, className) {
			if (!objDraw) return;
			if (!className) className = "y axis";

			objDraw.append("g").attr("class", className)
				.call(this.y0Axis)
				.selectAll("text")
				.attr("x", -2) //TODO text 길이에 따라..
				.attr("y", 0)
				.style("text-anchor", "end");
		},

		drawY0Axis2: function (objDraw, className, markFlag, title) {
			if (!objDraw) return;
			if (!className) className = "y axis";

			objDraw.append("g")
				.attr("class", className)
				.call(this.y0Axis)
				.append("text")
				.attr("transform", "rotate(-90)")
				.attr("x", -3)
				.attr("y", 8)
				.attr("dy", ".31em")
				.style("text-anchor", "end")
				.text(title == undefined ? "" : title);

			if (markFlag) {
				objDraw.append("g").attr("class", "y mark")
					.call(this.yMark);
			}

		},
		drawY0Axis3: function (objDraw, className, markFlag, title) {
			if (!objDraw) return;
			if (!className) className = "y axis";


			var yAxis = objDraw.append("g")
							.attr("class", className)
							.call(this.y0Axis);

			yAxis.append("text")
				.attr("class", "y title")
				.attr("x", -(this.getGraphHeight() / 2))
				.attr("y", this.yTextPos(yAxis))
				.attr("dy", ".31em")
				.attr("transform", "rotate(-90)")
				.style("text-anchor", "middle")
				.style("font-weight", "bold")
				.style("font-size", "12px")
				.text(title == undefined ? "" : title);

			if (markFlag) {
				objDraw.append("g")
					.attr("class", "y mark")
					.call(this.yMark);
			}

		},

		yTextPos: function (yAxis) {
			var ticks = yAxis.selectAll(".tick");
			var ticksArray = [];
			ticks.each(function (d) {
				ticksArray.push(d.toString().length);
			});
			var ticksLength = d3.max(ticksArray);

			var yTextPos = -30;
			if (ticksLength > 2) {
				yTextPos = yTextPos - (ticksLength - 2) * 6;
			}
			return yTextPos;
		},

		drawY1Axis: function (objDraw, className, title) {
			if (!objDraw) return;
			if (!className) className = "y2 axis";

			objDraw.append("g")
				.attr("class", className)
				.attr("transform", "translate(" + ( this.getGraphWidth()) + ", 0)")
				.call(this.y1Axis)
				.append("text")
				.attr("transform", "rotate(270)")
				.attr("x", -3)
				.attr("y", -8)
				//.attr("dy", ".31em")
				.style("text-anchor", "end")
				.text(title == undefined ? "" : title);

		},

		setAxisWidth: function (dataCount, yTitle) {
			var yTextLength = dataCount.toString().length;

			var graphLayer = d3.select("#" + this.chartId);
			var clientRect = graphLayer.node().getBoundingClientRect();

			//y축 graphHeight 설정
			var left = 0; //2글자 기준으로

			if (yTitle) left = 30;
			var maxLength = 2;
			if (yTextLength > maxLength) {
				left += Math.ceil(this.svgMargin.left * yTextLength / (maxLength + 1));
				if (left > (clientRect.width / 2)) {
					left = clientRect.width / 4;
				}
			}
			this.axisX0 = left;
		},

		resize: function () {
			var chartId = this.chartId;
			var objChart = d3.select("#" + chartId);

			var clientRect = objChart.node().getBoundingClientRect();
			var width = clientRect.width;
			var height = clientRect.height;

			this.setSvgSize(chartId, width, height);
			this.setX0OutputRange();
			this.setY0OutputRange();
			this.setY1OutputRange();

			var objSvg = objChart.select(".naru-chart-graph").select("svg");
			if (this.x0Axis) {
				this.x0Axis.tickSize(-this.getGraphHeight());
				objSvg.select(".x.axis")
					.attr("transform", "translate(0," + this.getGraphHeight() + ")")
					.call(this.x0Axis);
			}

			if (this.y0Axis) {
				this.y0Axis.tickSize(-(this.getGraphWidth()));
				objSvg.select(".y.axis").call(this.y0Axis);
			}
			
			if (this.y1Axis) {
				this.y1Axis.tickSize(-(this.getGraphWidth()));
				objSvg.select(".y1.axis").call(this.y1Axis);
			}

			if (this.yMark) {
				objSvg.select(".y.mark").call(this.yMark);
			}

		},

		//setLegendWidth: function (width) {
		//	this.getLegendWidth() = width;
		//},
		//
		//getLegendWidth: function () {
		//	return this.getLegendWidth();
		//},

		getGradientColor: function (chartId, objParent, index, gradientDirection) {
			var minX = "0%";
			var maxX = "100%";
			var minY = "0%";
			var maxY = "100%";

			gradientDirection = "vertical";
			if (gradientDirection != undefined && gradientDirection != null) {
				if (gradientDirection == "vertical") {
					minX = "0%";
					maxX = "0%";
					minY = "0%";
					maxY = "100%";
				} else if (gradientDirection == "horizontal") {
					minX = "0%";
					maxX = "100%";
					minY = "0%";
					maxY = "0%";
				}
			}

			if (index == undefined || index == null || isNaN(index)) index = 0;
			if (typeof(index) == "string") index = parseInt(index, 10);

			var color = NaruSecD3Js.getColor(index);
			var color1 = d3.rgb(color).darker(0.3);
			var color2 = d3.rgb(color);
			var color3 = d3.rgb(color).brighter(0.3);
			var color4 = d3.rgb(color).brighter(0.7);
			var linearGradientLen = d3.select("#" + chartId).selectAll(".linear_gradient")[0].length;

			var gradientId = "gradient_" + chartId + "_" + linearGradientLen;
			var objGradient = d3.select(objParent).append("svg:linearGradient")
				.attr("class", "linear_gradient")
				.attr("x1", minX)
				.attr("x2", maxX)
				.attr("y1", minY)
				.attr("y2", maxY)
				.attr("id", gradientId);

			objGradient.append("stop")
				.attr("offset", "0")
				.attr("stop-color", color1);

			objGradient.append("stop")
				.attr("offset", "25%")
				.attr("stop-color", color2);

			objGradient.append("stop")
				.attr("offset", "50%")
				.attr("stop-color", color3);

			objGradient.append("stop")
				.attr("offset", "100%")
				.attr("stop-color", color4);

			return gradientId;
		},

		createToolTip: function (chartId) {
			var objChart = d3.select("#"+chartId);
			var divToolTip = objChart.select(".toolTip");
			if (divToolTip.size() == 0) {
				divToolTip = objChart.append("div").attr("class", "toolTip");
			}
			
			return divToolTip;
		},

		showToolTip: function (objToolTip, toolTipMessage) {
			objToolTip.html(toolTipMessage)
				.transition()
				.duration(100)
				.style("opacity", 0.9);
		},

		xTicksDateWrap: function (text, width, height) {
			var changeText = "";
			var format = d3.time.format("%Y-%m-%d");

			var change = false;
			var count = 0;
			text.each(function (data, k) {
				var textTemp = d3.select(this);
				var word = textTemp.text();
				var x = textTemp.attr("x");
				var y = textTemp.attr("y");
				var dy = parseFloat(textTemp.attr("dy"));

				var tspan = textTemp.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

				var dateTemp = format.parse(word);
				
				var wordText = format(dateTemp);
				var replaceText = wordText;

				tspan.text(wordText);

				//var formatYear = d3.time.format("%Y");
				var formatYearMonth = d3.time.format("%y-%m");
				var formatMonth = d3.time.format("%m");
				var formatMonthDay = d3.time.format("%m-%d");
				var formatDay = d3.time.format("%d");

				if (checkTspanLength(tspan, width)) {
					replaceText = formatMonthDay(dateTemp);
					tspan.text(replaceText);
					change = true;

					if (checkTspanLength(tspan, width)) {
						replaceText = formatMonth(dateTemp);
						tspan.text(replaceText);
						change = true;

						if (checkTspanLength(tspan, width)) {
							replaceText = formatYearMonth(dateTemp);

							if (count == 0 && Number(formatDay(dateTemp) > 15)) {
								change = false;
							} else {
								change = true;
								count++;
							}
						}
					}
					//console.log("replaceText: ", replaceText+","+change);
				} else {
					change = true;
				}

				if (change && replaceText != changeText) {
					changeText = replaceText;
					tspan.text(replaceText);
				} else {
					tspan.text("");
				}

			});

			function checkTspanLength(tspan, width){
				if(width < Math.floor(tspan.node().getComputedTextLength())) return true;
				else return false;
			}

		},

		dateFormat: function () {
			var format = d3.time.format.multi([
				[".%L", function (d) {
					return d.getMilliseconds();
				}], [":%S", function (d) {
					return d.getSeconds();
				}], ["%I:%M", function (d) {
					return d.getMinutes();
				}], ["%I %p", function (d) {
					return d.getHours();
				}], ["%a %d", function (d) {
					return d.getDay() && d.getDate() != 1;
				}], ["%b %d", function (d) {
					return d.getDate() != 1;
				}], ["%B", function (d) {
					return d.getMonth();
				}], ["%Y", function () {
					return true;
				}]
			]);
			return format;
		}

	};

}();


d3.selection.prototype.trigger = function(eventName, data) {
	this.on(eventName)(data);
}