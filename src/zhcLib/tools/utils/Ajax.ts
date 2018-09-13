/**
 * @author seacole *
 * Ajax异步请求
 */
class Ajax {
	static callNet(url: string, params: any = null, method: string = "get", header: any[] = null, onSuccess: Function = null, onError: Function = null, responseType: string = "text"): void {
		var request: Laya.HttpRequest = new Laya.HttpRequest();
		request.on(Laya.Event.COMPLETE, this, function (event: Laya.Event): void {
			if (onSuccess) {
				onSuccess(request.data);
			}
		});
		request.on(Laya.Event.ERROR, this, function (event: Laya.Event): void {
			if (onError) {
				onError(request.data);
			}
		});
		request.on(Laya.Event.PROGRESS, this, function (event: Laya.Event): void {
		});

		if (!header)
			header = [];
		var data: any;
		if (method == "get") {
			header.push("Content-Type", "application/x-www-form-urlencoded");
			data = Utils.obj2query(params);
			if (data)
				url += "?" + data;
			request.send(url, null, method, responseType, header);
			log(method + " " + url);
		}
		else {
			if (params)
				data = JSON.stringify(params);
			header.push("Content-Type", "application/json");
			request.send(url, data, method, responseType, header);
			log(method + " " + url + "?" + data);
		}
	}
	static callPHPNet(url: string, params: any = null, method: string = "get", header: any[] = null, onSuccess: Function = null, onError: Function = null, responseType: string = "text"): void {
		var request: Laya.HttpRequest = new Laya.HttpRequest();
		request.on(Laya.Event.COMPLETE, this, function (event: Laya.Event): void {
			if (onSuccess) {
				onSuccess(request.data);
			}
		});
		request.on(Laya.Event.ERROR, this, function (event: Laya.Event): void {
			if (onError) {
				onError(request.data);
			}
		});
		request.on(Laya.Event.PROGRESS, this, function (event: Laya.Event): void {
		});

		if (!header)
			header = [];
		var data: any;
		if (method == "get") {
			header.push("Content-Type", "application/x-www-form-urlencoded");
			data = Utils.obj2query(params);
			url += "?" + data;
			request.send(url, null, method, responseType, header);
			log(method + " " + url);
		}
		else {
			let data2
			if (params){
				data = Utils.obj2query(params);
			 	data2 =JSON.stringify(params);
			}
			//cid:GameConfig.CID,channel:GameConfig.CHANNEL
			let urldata = "?"+"cid="+GameConfig.CID+"&channel="+GameConfig.CHANNEL

				
			header.push("Content-Type", "application/json");
			request.send(url+urldata, data2, method, responseType, header);
			log(method + " " + url+urldata);
			log(method + " data:"+data2);
		}
	
		//post请求
		// var xhr = new XMLHttpRequest();
		// var data = { name: "ccb", pass: "123" };
		// xhr.open("post", "example.php", true);
		// // 不支持FormData的浏览器的处理 
		// if (typeof FormData == "undefined") {
		// 	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		// }
		// xhr.send(this.postDataFormat(data));

	}
	// post请求
	//格式化post 传递的数据
	static postDataFormat(obj) {
		if (typeof obj != "object") {
			alert("输入的参数必须是对象");
			return;
		}

		// 支持有FormData的浏览器（Firefox 4+ , Safari 5+, Chrome和Android 3+版的Webkit）
		if (typeof FormData == "function") {
			var data = new FormData();
			for (var attr in obj) {
				data.append(attr, obj[attr]);
			}
			return data;
		} else {
			// 不支持FormData的浏览器的处理 
			var arr = new Array();
			var i = 0;
			for (var attr in obj) {
				arr[i] = encodeURIComponent(attr) + "=" + encodeURIComponent(obj[attr]);
				i++;
			}
			return arr.join("&");
		}
	}

	static GET(url: string, params: any = null, onSuccess: Function = null, onError: Function = null, header: any = null): void {
		this.callNet(url, params, 'get', header, onSuccess, onError);
	}

	static POST(url: string, params: any = null, onSuccess: Function = null, onError: Function = null, header: any = null): void {
		this.callNet(url, params, 'post', header, onSuccess, onError);
	}
	//调用商城，充值等服务时
	static PHP_GET(url: string, params: any = null, onSuccess: Function = null, onError: Function = null, header: any = null): void {
		this.callPHPNet(url, params, 'get', header, onSuccess, onError);
	}

	static PHP_POST(url: string, params: any = null, onSuccess: Function = null, onError: Function = null, header: any = null): void {
		this.callPHPNet(url, params, 'post', header, onSuccess, onError);
	}
}