MapHelper = new function (){
	//地图加载完成事件
	this.initMapData = function(func){
		map.addEventListener("tilesloaded", func);
	};
	this.clear = function(){
		map.clearOverlays(); 
	};
	//加点
	this.addPoint = function(point){
		var p = new BMap.Point(point.lng, point.lat);
		var c = null;
		if(point.url){
			var myIcon = new BMap.Icon(point.url, new BMap.Size(point.h,point.w));
			marker = new BMap.Marker(point,{  
				icon: myIcon  
			});
		}
		else{
			marker = new BMap.Marker(point);
		}
		map.addOverlay(marker);
		return marker;
	};
	//加线
	this.addLine = function(points,style){
		var li = [];
		for(var i=0;i<points.length;i++){
			var p = BMap.Point(points[i].lng, points[i].lat)
		}
		if(!style)
			style = {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5}
		var polyline = new BMap.Polyline(li, style);   //创建折线
		map.addOverlay(polyline);          //增加折线
		return polyline;
	};
	//加面：圆形，矩形，自定义面（行政区分）
	this.addPolygon = function(points,style){
		var li = [];
		for(var i=0;i<points.length;i++){
			var p = BMap.Point(points[i].lng, points[i].lat)
		}
		if(!style)
			style = {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5}
		var polygon = new BMap.Polygon(li, style);   //创建折线
		map.addOverlay(polygon);          //增加折线
		return polygon;
	};
	this.addCircle = function(point,style){
		var p = new BMap.Point(point.lng, point.lat);
		if(!style)
			style = {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5}
		var circle = new BMap.Circle(point,500,style); //创建圆
		map.addOverlay(circle);
		return circle;
	};
	this.addRectangle = function(pointStart,pointEnd,style){
		if(!style)
			style = {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5}
		var rectangle = new BMap.Polygon([
			new BMap.Point(pointStart.lng,pointStart.lat),
			new BMap.Point(pointEnd.lng,pointStart.lat),
			new BMap.Point(pointEnd.lng,pointEnd.lat),
			new BMap.Point(pointStart.lng,pointEnd.lat)
		], style);  //创建矩形
		map.addOverlay(rectangle);         //增加矩形
		return rectangle;
	};
	//信息窗
	this.createInfoWindow = function(html){
		return new BMap.InfoWindow(html);
	}
	//事件
	this.addMarkerEvent = function(marker,eventName,func){
		marker.addEventListener(eventName, func);
	};
	this.addMapEvent = function(eventName,func){
		map.addEventListener(eventName, func);
	};
}();