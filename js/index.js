//用$("")获取id
function $(id) {
	return document.getElementById(id);
}
//点击切换
var divs = $("main").getElementsByTagName("div");
var dls = $("footer").getElementsByTagName("dl");
for(i = 0; i < dls.length; i++) {
	dls[i].index = i;
	dls[i].onclick = function() {
		show(this.index);
	}
}

function show(t) {
	for(n = 0; n < divs.length; n++) {
		divs[n].className = "dis_none";
		divs[t].className = "dis_block";
		dls[n].style.color = "#666";
		dls[t].style.color = "#35B3E4";
	}
}
show(0);
var xhr = new XMLHttpRequest();
xhr.open("get", "food.json?r=" + Math.random());
xhr.send(null);
xhr.onreadystatechange = function() {
	if(xhr.readyState == 4 && xhr.status == 200) {
		//客户端接收服务端发送过来的数据（string），这个数据形如JSON
		var jsonobject = xhr.responseText;
		//把形如JSON的字符串转化为JSON
		var arr = JSON.parse(jsonobject);
		//解析JSON
		for(var t = 0; t < arr.length; t++) {
			var dl = document.createElement("dl");
			var dt = document.createElement("dt");
			var dd1 = document.createElement("dd");
			var dd2 = document.createElement("dd");
			var dd3 = document.createElement("dd");
			var hr = document.createElement("hr");
			var fImage = arr[t]["fImage"];
			var a = document.createElement("a");
			dd1.className = "tit";
			dd3.className = "price";
			dt.innerHTML = "<img src='img/" + fImage + "'/>";
			dd1.innerHTML = arr[t]["fName"];
			dd2.innerHTML = arr[t]["fDescription"];
			dd3.innerHTML = "￥" + parseInt(arr[t]["fPrice"]) + "元";
			dl.appendChild(dt);
			dl.appendChild(dd1);
			a.href = "javascript:tianjia(" + t + ");";
			a.innerHTML = "来一份";
			dd1.appendChild(a);
			dl.appendChild(dd2);
			dl.appendChild(dd3);
			var one = document.getElementById("one");
			one.appendChild(dl);
			one.appendChild(hr);
		}
	}
}

function tianjia(t) {
	if(xhr.readyState == 4 && xhr.status == 200) {
		//客户端接收服务端发送过来的数据（string），这个数据形如JSON
		var arr2 = xhr.responseText;
		//把形如JSON的字符串转化为JSON
		var arr = JSON.parse(arr2);
		//解析JSON
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		var td2 = document.createElement("td");
		var td3 = document.createElement("td");
		var btn1 = document.createElement("button");
		var inp = document.createElement("input");
		var btn2 = document.createElement("button");
		td1.innerHTML = arr[t]["fName"];
		td2.innerHTML = parseInt(arr[t]["fPrice"]);
		td2.className = "jiage";
		btn1.innerHTML = "-";
		btn1.className = "jian";
		btn2.innerHTML = "+";
		btn2.className = "jia";
		inp.className = "shuliang";
		inp.value = 1;
		td3.appendChild(btn1);
		td3.appendChild(inp);
		td3.appendChild(btn2);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		table.appendChild(tr);
	}
	dianji();
	jisuan();
}

var heji = document.getElementById("hejinum");
heji.innerHTML = "0";

function jisuan() {
	var jg = 0;
	var sum = 0;
	var jgs = document.getElementsByClassName("jiage");
	var sls = document.getElementsByClassName("shuliang");
	for(j = 0; j < jgs.length; j++) {
		jg = parseInt(jgs[j].innerHTML);
		sl = parseInt(sls[j].value);
		sum = sum + jg * sl;
	}
	heji.innerHTML = sum;
}
jisuan();

function dianji() {
	var jias = document.getElementsByClassName("jia");
	var jians = document.getElementsByClassName("jian");
	var shuliangs = document.getElementsByClassName("shuliang");
	for(i = 0; i < jias.length; i++) {
		jias[i].index = i;
		jians[i].index = i;
		shuliangs[i].index = i;
		jias[i].onclick = function() {
			shuliangs[this.index].value++;
			jisuan();
		}
		jians[i].onclick = function() {
			shuliangs[this.index].value--;
			if(shuliangs[this.index].value <= 0) {
				var conf = confirm("确定删除此商品吗？");
				if(conf) {
					$("table").deleteRow(this.index);
					dianji();
				} else {
					shuliangs[this.index].value++;
				}
			}
			jisuan();
		}
	}
}
function qingkong(){
	var conf = confirm("确定删除所有商品吗？");
	if(conf) {
		qk();
	}
}
function qk() {
	var len = $("table").rows.length;
	for(n = 0; n < len; n++) {
		$("table").deleteRow(n);
		len--;
		n--;
	}
	jisuan();
}
var username = document.getElementsByName("username");
var phone = document.getElementsByName("phone");
var address = document.getElementsByName("address");
var username2 = document.getElementsByName("username2");
var phone2 = document.getElementsByName("phone2");
var address2 = document.getElementsByName("address2");
$("xiadan").onclick = function() {
	var len = $("table").rows;
	var article2 = document.createElement("article");
	var date1 = new Date;
	var year = date1.getFullYear();
	var month = date1.getMonth() + 1;
	var day = date1.getDate();
	var h = date1.getHours();
	var m = date1.getMinutes();
	var s = date1.getSeconds();
	if(m <= 9) {
		m = "0" + m;
	}
	if(s <= 9) {
		s = "0" + s;
	}
	var str = year + "-" + month + "-" + day + " " + " " + h + ":" + m + ":" + s;
	$("time").innerHTML = str;
	for(n = 0; n < len.length; n++) {
		$("neirong").innerHTML = $("neirong").innerHTML + len[n].childNodes.item(0).innerHTML + "(" + len[n].childNodes.item(2).childNodes.item(1).value + ")";
		$("client").innerHTML =username2[0].value+","+phone2[0].value+","+address2[0].value;
		$("jiner").innerHTML = $("hejinum").innerHTML;
		article2.innerHTML = $("article").innerHTML;
	}
	$("three").appendChild(article2);
	qk();
	alert("下单成功！");
}
var xhr2 = new XMLHttpRequest();
xhr2.open("get", "user.json?r=" + Math.random());
xhr2.send(null);
xhr2.onreadystatechange = function() {
	if(xhr2.readyState == 4 && xhr2.status == 200) {
		//客户端接收服务端发送过来的数据（string），这个数据形如JSON
		var jsonobject2 = xhr2.responseText;
		//把形如JSON的字符串转化为JSON
		var arr2 = JSON.parse(jsonobject2);
		//解析JSON
		for(t = 0; t < arr2.length; t++) {
			username[0].value = arr2[t]["fName"];
			phone[0].value = arr2[t]["fPhoneNumber"];
			address[0].value = arr2[t]["fAddress"];
		}
		xinxi();
	}
}
$("baocun").onclick=function(){
	xinxi();
	alert("保存成功！");
}
function xinxi(){
	username2[0].value=username[0].value;
	phone2[0].value=phone[0].value;
	address2[0].value=address[0].value
}
