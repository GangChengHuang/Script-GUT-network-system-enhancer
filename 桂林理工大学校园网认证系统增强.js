// ==UserScript==
// @name         桂林理工大学校园网认证系统增强&&支持移动端&IOS
// @namespace    https://github.com/GangChengHuang
// @version      2.0.0
// @description  桂林理工大学校园网认证信息不够全面，故开发此插件！自动认证，界面美化，屏蔽学校官网转跳，多账号自动认证，显示全面的认证信息。
// @author       Peterg
// @match        http://172.16.2.2/*
// @icon         https://cas.glut.edu.cn/favicon.ico
// @run-at       document-start
// @grant        none
// @grant        GM_setValue
// @grant        GM.setValue
// @grant        GM_getValue
// @grant        GM.getValue
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
// @connect      githubusercontent.com
// @connect      ghproxy.com
// @license      GPL3.0
// ==/UserScript==
(function () {
	const _GM = {
		supportGM: typeof GM_getValue == "function" && typeof GM_getValue("a", "b") != "undefined",
		supportGMPromise: typeof GM != "undefined" && typeof GM.getValue == "function" && typeof GM.getValue("a", "b") != "undefined" && typeof GM.getValue("a", "b").then == "function",
		supportCrossSave: function () {
			return this.supportGM || this.supportGMPromise;
		},
		mxAppStorage: (function () {
			try {
				return window.external.mxGetRuntime().storage;
			} catch (e) { }
		})(),
		operaUJSStorage: (function () {
			try {
				return window.opera.scriptStorage;
			} catch (e) { }
		})(),
		setValue: function (key, value) {
			if (this.supportGMPromise) {
				GM.setValue(key, value);
				if (value === "" && typeof GM != "undefined" && typeof GM.deleteValue != "undefined") {
					GM.deleteValue(key);
				}
			} else if (this.supportGM) {
				GM_setValue(key, value);
				if (value === "" && typeof GM_deleteValue != "undefined") {
					GM_deleteValue(key);
				}
			} else if (this.operaUJSStorage) {
				this.operaUJSStorage.setItem(key, value);
			} else if (this.mxAppStorage) {
				this.mxAppStorage.setConfig(key, value);
			} else if (window.localStorage) {
				window.localStorage.setItem(key, value);
			}
		},
		getValue: function (key, cb) {
			var value;
			if (this.supportGMPromise) {
				value = GM.getValue(key).then((v) => {
					cb(v);
				});
				return;
			} else if (this.supportGM) {
				value = GM_getValue(key);
			} else if (this.operaUJSStorage) {
				value = this.operaUJSStorage.getItem(key);
			} else if (this.mxAppStorage) {
				value = this.mxAppStorage.getConfig(key);
			} else if (window.localStorage) {
				value = window.localStorage.getItem(key);
			}
			cb(value);
		},
		addStyle: function (css) {
			var myStyle = document.createElement("style");
			myStyle.textContent = css;
			var doc = document.head || document.documentElement;
			doc.appendChild(myStyle);
		},
		addScript: function (type, script, callback) {
			var myscript = document.createElement("script");
			myscript.setAttribute("type", "text/javascript");
			if (type == 'url') {
				myscript.setAttribute("src", script);
			} else if (type == 'js') {
				myscript.textContent = script;
			}
			var doc = document.head || document.documentElement;
			doc.appendChild(myscript);
			myscript.onload = myscript.onreadystatechange = function () {
				if (
					!this.readyState ||
					this.readyState == "loaded" ||
					this.readyState == "complete"
				) {
					myscript.onload = myscript.onreadystatechange = null;
					callback && callback();
				}
			};
			if (type == 'js') {
				callback && callback();
			}
		},
	};
	var _GM_xmlhttpRequest;
	if (typeof GM_xmlhttpRequest != 'undefined') {
		_GM_xmlhttpRequest = GM_xmlhttpRequest;
	} else if (typeof GM != 'undefined' && typeof GM.xmlHttpRequest != 'undefined') {
		_GM_xmlhttpRequest = GM.xmlHttpRequest;
	} else {
		_GM_xmlhttpRequest = (f) => { fetch(f.url).then(response => response.text()).then(data => { let res = { response: data }; f.onload(res); }).catch(e => f.onerror(e)); };
	}
	const value_setting = {
		_init: function () {
			const css = `
						#floating-window {
							position: fixed;
							top: 50%;
							left: 70%;
							transform: translate(-50%, -50%);
							background-color: #f9f9f9;
							border: 1px solid #ccc;
							border-radius: 0.5rem;
							box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
							overflow: hidden;
							z-index: 9999;
						}
						.div-checkbox {
							flex-wrap: wrap;
							display: flex;
						}
						.title-bar {
							flex-grow: 1;
							font-weight: bold;
							text-align: center;
							border-bottom: 1px solid #ccc;
						}
						.floating-window-content {
							padding: 10px;
						}
						.floating-window-input {
							width: 100%;
							border: 1px solid #ccc;
							border-radius: 4px;
							background-color: #f2f2f2;
							font-size: 70%;
							height: 1.5rem;
						}
						.resize-handle {
							position: absolute;
							bottom: 0;
							right: 0;
							width: 16px;
							height: 16px;
							background-color: #9e9e9e;
							cursor: nwse-resize;
						}
						`;
			const pc_1 = `var bodyContent = '<body><div id="center"><div id="edit_body" style="position: absolute; width : 100%; height : 100%;"><div style="height: 20%; display: flex; justify-content: center; align-items: center;"><img src="492b2e5e5fe31aff1a697c88b4bc0ac8.png" style="width: 25rem;"></div><div style="display: flex; justify-content: center; font-size: 1.5rem;"><p>上网认证系统（增强）</p><div id="settings" onclick="javascript:settings()">⚙️</div></div><div style="height: 50%; display: flex; justify-content: center;align-items: center;"><div style="z-index: 100;height: 15rem;width: 25rem;border-radius: 2rem;position: absolute;box-shadow: rgb(50, 47, 47) 0px 0px 6px;background-color: rgb(255, 255, 255);"><form name="f1" method="post" action="" style="display: flex; justify-content: center;"><div name="PageTips" style="top: 12%;width: 85%;height: 68%;border-radius: 1rem;padding: 0.2rem;position: absolute;text-align: center;font-size: 0.9rem;box-shadow: rgb(50, 47, 47) 0px 0px 2px;">已使用时间 Used time : 1234567890 Min<br> 已使用流量 Used flux : 1205632.705 MByte </div><div style="bottom: 0; position: absolute; display: flex; justify-content: center;"><input name="logout" type="button" onclick="javascript:wc()" value="一键注销" style="margin: 5% 10%;color: rgb(255, 255, 255);border-radius: 1rem;text-align: center;height: 50%;padding: 0.3rem 2rem;font-size: 1rem;border: 1px solid rgb(0, 0, 0);background-color: rgb(54, 96, 146);"><input name="relogin" type="button" onclick="javascript:re()" value="重新认证" style="margin: 5% 10%;color: rgb(255, 255, 255);border-radius: 1rem;text-align: center;height: 50%;padding: 0.3rem 2rem;font-size: 1rem;border: 1px solid rgb(0, 0, 0);background-color: rgb(54, 96, 146);"></div></div></div></div></body>';`;
			const pc = `var bodyContent = '<body><div id="center"><div id="edit_body" style="position: absolute; width: 100%; height: 100%;"><div style="height: 20%; display: flex; justify-content: center; align-items: center;"><img src="492b2e5e5fe31aff1a697c88b4bc0ac8.png"></div><div style="display: flex; justify-content: center; font-size: 1.5rem;"><p>上网认证系统（增强）</p><div id="settings" onclick="javascript:settings()">⚙️</div></div><div style="height: 70%;display: flex;justify-content: center; align-items: center;"><div style="z-index: 100; height: 25rem; width: 20rem; border-radius: 2rem; position: absolute; box-shadow: rgb(50, 47, 47) 0px 0px 6px;background-color: rgb(255, 255, 255);"><form name="f1" method="post" action="" onsubmit="return ee(1)"style="display: flex; justify-content: center;"><input class="edit_lobo_cell" type="text" name="DDDDD" placeholder="工号/学号/账号" autocomplete="off"style="top: 10%; height: 40px;width: 70%;border-bottom: 1px solid rgb(184, 184, 184); text-align: left; color: rgb(127, 127, 127); padding-left: 24px; background-image: url(f28541edf8b2c29525428b9b07944ab8.png); background-color: rgb(255, 255, 255); cursor: auto; border-top-color: rgb(184, 184, 184); border-right-color: rgb(184, 184, 184); border-left-color: rgb(184, 184, 184);"><input class="edit_lobo_cell" type="password" name="upass" placeholder="密码" autocomplete="off" style="top: 25%; height: 40px; width: 70%;border-bottom: 1px solid rgb(184, 184, 184); text-align: left; color: rgb(127, 127, 127); padding-left: 24px; background-image: url(bfb7688761f8c9d9df01d123567ecf3f.png); background-color: rgb(255, 255, 255); cursor: auto; border-top-color: rgb(184, 184, 184); border-right-color: rgb(184, 184, 184); border-left-color: rgb(184, 184, 184);"><div name="ISP_radio" style="position: absolute;top: 38%;"><label><font><input name="network" type="radio" value="0">校园网</font></label><label><font><input name="network" type="radio" value="1">电信宽带</font></label><label><font><input name="network" type="radio" value="2">移动宽带</font></label><label><font><input name="network" type="radio" value="3">联通宽带</font></label></div><div style="top: 47%;position: absolute;display: flex;justify-content: center;"><input  type="button" name="login" onclick="javascript:eee()" value="一键" style="margin: 0.5em 1em;color: rgb(255, 255, 255);border-radius: 1em;text-align: center;height: 2.5em;padding: 0.5em 3em;font-size: 1.2em;border: 1px solid rgb(0, 0, 0);background-color: rgb(54, 96, 146);" ><input type="submit" name="0MKKey" value="登录"style="margin: 0.5em 1em;color: rgb(255, 255, 255);border-radius: 1em;text-align: center;height: 2.5em;padding: 0.5em 3em;font-size: 1.2em;border: 1px solid rgb(0, 0, 0);background-color: rgb(54, 96, 146);"></div><div style="top: 65%;position: absolute;display: flex;justify-content: center;"><a href="http://xxfw.glut.edu.cn/Centre/front/forgetpasswordOnline" target="_blank" style="margin: 0.5em;">忘记密码</a><a href="http://uss.glut.edu.cn/Self" target="_blank" style="margin: 0.5em;">绑定运营商</a><a href="http://xjzx.glut.edu.cn/net/index.htm" target="_blank" style="margin: 0.5em;">学生公寓上网帮助</a></div></form><div style="bottom: 5%;padding: 0 10%;width: auto;font-size: 0.1em;position: absolute;"><span>温馨提示：&nbsp; &nbsp; &nbsp; &nbsp;校园网出口带宽有限，为避免拥堵，已办理运营商宽带的请优先使用运营商帐号。具体方法为：绑定运营商帐号到校园网帐号中 --&gt;本登录页面输入校园网帐号密码，选择电信/移动/联通宽带，登录</span> </div></div></div></div></div></body>';`;
			const mobile = `var bodyContent='<body><div id="center"><div id="edit_body" style="position: absolute; width : 100%; height : 100%;"><div style="height: 20%; display: flex; justify-content: center; align-items: center;"><img src="492b2e5e5fe31aff1a697c88b4bc0ac8.png" style="width: 25rem;"></div><div style="display: flex; justify-content: center; font-size: 1.5rem;"><p>上网认证系统（增强）</p><div id="settings" onclick="javascript:settings()">⚙️</div></div><div style="height: 70%;display: flex;justify-content: center; align-items: center;"><div style="z-index: 100; height: 25rem; width: 20rem; border-radius: 2rem; position: absolute; box-shadow: rgb(50, 47, 47) 0px 0px 6px;background-color: rgb(255, 255, 255);"><form name="f1" method="post" action="" onsubmit="return ee(1)" style="display: flex; justify-content: center;"><input class="edit_lobo_cell" type="text" name="DDDDD" placeholder="工号/学号/账号" autocomplete="off"style="top: 10%; height: 40px;width: 70%;border-bottom: 1px solid rgb(184, 184, 184); text-align: left; color: rgb(127, 127, 127); padding-left: 24px; background-image: url(f28541edf8b2c29525428b9b07944ab8.png); background-color: rgb(255, 255, 255); cursor: auto; border-top-color: rgb(184, 184, 184); border-right-color: rgb(184, 184, 184); border-left-color: rgb(184, 184, 184);"><input class="edit_lobo_cell" type="password" name="upass" placeholder="密码" autocomplete="off" style="top: 25%; height: 40px; width: 70%;border-bottom: 1px solid rgb(184, 184, 184); text-align: left; color: rgb(127, 127, 127); padding-left: 24px; background-image: url(bfb7688761f8c9d9df01d123567ecf3f.png); background-color: rgb(255, 255, 255); cursor: auto; border-top-color: rgb(184, 184, 184); border-right-color: rgb(184, 184, 184); border-left-color: rgb(184, 184, 184);"><div name="ISP_radio" style="position: absolute;top: 38%;"><label><font><input name="network" type="radio" value="0">校园网</font></label><label><font><input name="network" type="radio" value="1">电信宽带</font></label><label><font><input name="network" type="radio" value="2">移动宽带</font></label><label><font><input name="network" type="radio" value="3">联通宽带</font></label></div><div style="top: 47%;position: absolute;display: flex;justify-content: center;"><input  type="button" name="login" onclick="javascript:eee()" value="一键" style="margin: 0.5em 1em;color: rgb(255, 255, 255);border-radius: 1em;text-align: center;height: 2.5em;padding: 0.5em 3em;font-size: 1.2em;border: 1px solid rgb(0, 0, 0);background-color: rgb(54, 96, 146);" ><input type="submit" name="0MKKey" value="登录"style="margin: 0.5em 1em;color: rgb(255, 255, 255);border-radius: 1em;text-align: center;height: 2.5em;padding: 0.5em 3em;font-size: 1.2em;border: 1px solid rgb(0, 0, 0);background-color: rgb(54, 96, 146);"></div><div class="edit_cell edit_image codediv ui-resizable-autohide" style="display: none; top: 312px; left: 276px; height: 40px; width: 111px; right: auto; bottom: auto; color: rgb(51, 51, 51); background-color: rgba(0, 0, 0, 0);"><a target="_blank"><img id="captcha_img" style="width: 100%;"></a></div><div style="top: 65%;position: absolute;display: flex;justify-content: center;"><a href="http://xxfw.glut.edu.cn/Centre/front/forgetpasswordOnline" target="_blank" style="margin: 0.5em;">忘记密码</a><a href="http://uss.glut.edu.cn/Self" target="_blank" style="margin: 0.5em;">绑定运营商</a><a href="http://xjzx.glut.edu.cn/net/index.htm" target="_blank" style="margin: 0.5em;">学生公寓上网帮助</a></div></form><div style="bottom: 5%;padding: 0 10%;width: auto;font-size: 0.1em;position: absolute;"><span>温馨提示：&nbsp; &nbsp; &nbsp; &nbsp;校园网出口带宽有限，为避免拥堵，已办理运营商宽带的请优先使用运营商帐号。具体方法为：绑定运营商帐号到校园网帐号中 --&gt;本登录页面输入校园网帐号密码，选择电信/移动/联通宽带，登录</span> </div></div></div></div></body>';`;
			const mobile_31 = `var bodyContent = '<body><div id="center"><div id="edit_body" style="position: absolute; width : 100%; height : 100%;"><div style="height: 20%; display: flex; justify-content: center; align-items: center;"><img src="492b2e5e5fe31aff1a697c88b4bc0ac8.png" style="width: 25rem;"></div><div  style="display: flex; justify-content: center; font-size: 1.5rem;"><p>上网认证系统（增强）</p><div id="settings" onclick="javascript:settings()">⚙️</div></div><div style="height: 50%; display: flex; justify-content: center;align-items: center;"><div style="z-index: 100;height: 15rem;width: 25rem;border-radius: 2rem;position: absolute;box-shadow: rgb(50, 47, 47) 0px 0px 6px;background-color: rgb(255, 255, 255);"><form name="f1" method="post" action="" style="display: flex; justify-content: center;"><div  name="PageTips" style="top: 12%;width: 85%;height: 68%;border-radius: 1rem;padding: 0.2rem;position: absolute;text-align: center;font-size: 0.9rem;box-shadow: rgb(50, 47, 47) 0px 0px 2px;">已使用时间 Used time : 1234567890 Min<br> 已使用流量 Used flux : 1205632.705 MByte </div><div style="bottom: 0; position: absolute; display: flex; justify-content: center;"><input name="logout" type="button" onclick="javascript:wc()" value="一键注销" style="margin: 5% 10%;color: rgb(255, 255, 255);border-radius: 1rem;text-align: center;height: 50%;padding: 0.3rem 2rem;font-size: 1rem;border: 1px solid rgb(0, 0, 0);background-color: rgb(54, 96, 146);"><input name="relogin" type="button" onclick="javascript:re()" value="重新认证" style="margin: 5% 10%;color: rgb(255, 255, 255);border-radius: 1rem;text-align: center;height: 50%;padding: 0.3rem 2rem;font-size: 1rem;border: 1px solid rgb(0, 0, 0);background-color: rgb(54, 96, 146);"></div></form></div></div></div></div></body>';`;
			const bg_url = 'https://api.cyrilstudio.top/bing/image.php';
			const logo_url = 'https://cas.glut.edu.cn/portal/image/showImage/logo/1';
			const host_url = 'https://ghproxy.net/https://raw.githubusercontent.com';
			_GM.setValue("css", css);
			_GM.setValue("pc_1", pc_1);
			_GM.setValue("pc", pc);
			_GM.setValue("mobile", mobile);
			_GM.setValue("mobile_31", mobile_31);
			_GM.setValue("value-壁纸接口", bg_url);
			_GM.setValue("value-LOGO链接", logo_url);
			_GM.setValue("value-Github代理", host_url);
			_GM.setValue("value-上次更新", new Date().toLocaleString());
		},
		initValue: function () {
			_GM.getValue("init", (init) => {
				if (!init) {
					this._init();
					_GM.setValue("init", true);
				}
			});
			_GM.getValue("css", (css) => {
				css && _GM.addStyle(css);
			});
		},
		geturl: function (host, name, type) {
			if (host.charAt(host.length - 1) != '/') {
				host += '/';
			}
			var url = 'GangChengHuang/Script-GUT-network-system-enhancer/main/';
			_GM_xmlhttpRequest({
				url: host + url + name + '.' + type,
				method: 'GET',
				onload: function (res) {
					let resText = res.response || res.responseText;
					if (resText.length > 100) {
						_GM.setValue(name, resText);
					}
					_alert(lang(name + '.' + type + "更新成功"));
				}
			});
			_GM.setValue("value-上次更新", new Date().toLocaleString());
		},
		updateValue: function () {
			_GM.getValue("value-Github代理", (content) => {
				if (content) {
					this.geturl(content, "css", "css");
					this.geturl(content, "pc_1", "js");
					this.geturl(content, "pc", "js");
					this.geturl(content, "mobile", "js");
					this.geturl(content, "mobile_31", "js");
				}
			});
		},
		show_setting_modal: function () {
			function create_checkbox(value, callback) {
				var div = document.createElement('div');
				var input = document.createElement('input');
				input.type = "checkbox";
				_GM.getValue(value, (content) => {
					if (content && (content == true || content == "true")) {
						input.checked = true;
					} else if (!content) {
						input.checked = true;
					} else {
						input.checked = false;
					}
				});
				input.addEventListener('change', function () {
					_GM.setValue(value, input.checked);
					callback && callback();
				});
				div.appendChild(input);
				var label = create_label('label', value.split('-')[1]);
				div.appendChild(label);
				return div;
			}
			function create_input(value, placeholder, callback) {
				var p = create_label('p', value.split('-')[1]);
				var input = document.createElement('input');
				input.classList.add('floating-window-input');
				input.type = "text";
				input.placeholder = placeholder;
				_GM.getValue(value, (content) => {
					if (content) {
						input.value = content;
					}
				});
				input.addEventListener('input', function () {
					_GM.setValue(value, input.value);
					callback && callback();
				});
				p.appendChild(input);
				return p;
			}
			function create_range(value, callback) {
				var p = create_label('p', value.split('-')[1]);
				var input = document.createElement('input');
				input.classList.add('floating-window-input');
				input.type = "range";
				_GM.getValue(value, (content) => {
					if (content) {
						input.value = content;
					}
				});
				input.addEventListener('change', function () {
					_GM.setValue(value, input.value);
					callback && callback();
				});
				p.appendChild(input);
				return p;
			}
			function create_label(type, textContent, attr_key, attr_value) {
				var p = document.createElement(type);
				p.textContent = textContent;
				attr_key && p.setAttribute(attr_key, attr_value);
				return p;
			}
			function create_floating_window() {
				const floating_window = `<div id="floating-window" style="display: none;"><div class="title-bar">设置</div><div id="window-content" class="floating-window-content"></div><div style="display: flex;align-items: center;justify-content: center;"><button onclick="javascript:close_settings()" style="margin: 0 2%;">关闭设置</button><button onclick="javascript:update_settings()" style="margin: 0 2%;">更新配置</button><button onclick="javascript:init_settings()" style="margin: 0 2%;">初始化配置</button></div><div style="text-align: center; padding: 5px;"><a href="https://github.com/GangChengHuang">Powered by PeterG</a></div></div>`;
				document.body.insertAdjacentHTML('beforeend', floating_window);
				var window_content = document.getElementById('window-content');
				window_content.appendChild(create_input("value-登录口令", "账号中输入登录口令，点击登录，即可自动登录"));

				var textContents = ['工号/学号', 'IPv4地址', 'MAC地址', '设备类型', '账号名称', '认证时间', '过期时间', '已用流量'];
				var fieldset = document.createElement('fieldset');
				fieldset.setAttribute('style', "border-radius: 10px;border: 1px solid #ccc;");
				fieldset.appendChild(create_label('legend', "信息显示"));
				var divVideoPart = document.createElement('div');
				divVideoPart.classList.add('div-checkbox');
				for (const textContent of textContents) {
					var accountCheckbox = create_checkbox('show-' + textContent, show_Info_PageTips);
					divVideoPart.appendChild(accountCheckbox);
				}
				fieldset.appendChild(divVideoPart);
				window_content.appendChild(fieldset);
				var textContents = ['自定义壁纸', '自定义LOGO'];
				var fieldset = document.createElement('fieldset');
				fieldset.setAttribute('style', "border-radius: 10px;border: 1px solid #ccc;");
				fieldset.appendChild(create_label('legend', "页面美化"));
				var divVideoPart = document.createElement('div');
				divVideoPart.classList.add('div-checkbox');
				for (const textContent of textContents) {
					var accountCheckbox = create_checkbox('lay-' + textContent, fix_Layout);
					divVideoPart.appendChild(accountCheckbox);
				}
				fieldset.appendChild(divVideoPart);
				window_content.appendChild(fieldset);
				window_content.appendChild(create_input("value-壁纸接口", "信息页所显示的背景图片，推荐使用必应接口"));
				window_content.appendChild(create_input("value-LOGO链接", "修改顶部的图片"));
				window_content.appendChild(create_input("value-多账号信息", `格式如:{"as":[{"a":"123","p":"123","t":1},{"a":"456","p":"456","t":2}]}`));
				window_content.appendChild(create_label('p', `注：a为账号、p为密码、t为运营商`, 'style', 'font-size: 50%;color: #00000088;'));
				window_content.appendChild(create_label('p', `运营商 0-校园网，1-电信，2-移动，3-联通`, 'style', 'font-size: 50%;color: #00000088;'));
				window_content.appendChild(create_input("value-Github代理", "用于更新配置"));
				_GM.getValue("value-上次更新", (time) => {
					if (time) {
						window_content.appendChild(create_label('p', "上次更新时间\t\t" + time));
					}
				});
			}

			var floatingWindow = document.getElementById('floating-window');
			if (!floatingWindow) {
				create_floating_window();
				floatingWindow = document.getElementById('floating-window');
			}
			try {
				if (floatingWindow.style.display == 'block') {
					floatingWindow.style.display = 'none';
				} else {
					floatingWindow.style.display = 'block';
				}
			} catch (error) {

			}
		},
	};
	function hook_document_createElement() {
		var loaded_a41 = false;
		var _create = document.createElement;
		document.createElement = function (tag, flag) {
			if (!loaded_a41) {
				console.log("create创建的节点:" + tag, flag);
				hook_a41.initHookA41();
				loaded_a41 = true;
			}
			return _create.apply(this, arguments);
		};
	}
	function replace_loadConfig_Json(json) {
		json.data.window_title = "增强-"; // 页面标题前缀
		json.data.reback_link = "http://172.16.2.2/"; // 返回重定向地址
		json.data.redirect_link = "http://172.16.2.2/"; // 登录重定向地址
		// json.data.un_bind_mac = 1; // 本机注销时解绑MAC
		// json.data.is_redirect = 1; // 是否重定向
		return json;
	}
	function fix_Layout() {
		_GM.getValue("lay-自定义壁纸", (flag) => {
			if (!flag || (flag && (flag == true || flag == 'true'))) {
				_GM.getValue("value-壁纸接口", (url) => {
					if (url)
						document.querySelector(
							"body"
						).style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0, 0.5)), url("${url}") no-repeat`;
				});
			} else {
				document.querySelector(
					"body"
				).style.background = ``;
			}
		});
		_GM.getValue("lay-自定义LOGO", (flag) => {
			if (!flag || (flag && (flag == true || flag == 'true'))) {
				_GM.getValue("value-LOGO链接", (url) => {
					if (url)
						document.querySelector("#edit_body > div > img").src = url;
				});
			} else {
				document.querySelector("#edit_body > div > img").src = `http://172.16.2.2:801/eportal/extern/x7lLGb1653967538/FzJLgH1653967572/492b2e5e5fe31aff1a697c88b4bc0ac8.png`;
			}
		});
	}
	function show_Info_PageTips() {
		const user_info = ['工号/学号', 'IPv4地址', 'MAC地址', '设备类型', '账号名称', '认证时间', '过期时间', '已用流量'];
		const user_info_value = [term.account, term.ip, term.mac.toUpperCase(), ["其他", "PC", "手机", "平板"][term.type], NID, stime, etime, (flow1 / 1024 + flow3 + flow0 / 1024) + 'MByte'];
		var user_info_str = '';
		for (var i = 0; i < user_info.length; i++) {
			_GM.getValue('show-' + user_info[i], (content) => {
				if ((!content) || (content && (content == 'true' || content == true))) {
					user_info_str += `<tr><td align="right">\t${user_info[i]}\t:\t</td><td align="left">\t${user_info_value[i]}</td></tr>`;
				}
			});
		}
		var str = `<table align="center"><tbody>${user_info_str}</tbody></table>`;
		try { $("[name=PageTips]").html(lang(str)); } catch (error) { }
	}
	const hook_a40 = {
		add_re: function () {
			const re_fun = ``;
			_GM.addScript('js', re_fun);
		},
		hook_wc: function () {
			var _wc = wc;
			wc = function () {
				user.unbind_mac("", "", 1);
				logout.init();
				window.location = rebackLink;
				return true;
			};
		},
		initHookA40: function () {
			this.hook_wc();
		},
	};
	const hook_a41 = {
		hook_page_render: function () {
			var _render = page.render;
			page.render = function (next) {
				var me = page;
				if (page.enable_new_drcom_srv == 1 && (
					page.kind == "pc_1" ||
					page.kind == "pc_3" ||
					page.kind == "mobile_31" ||
					page.kind == "mobile_33") &&
					(page.user_info.length > 0 ||
						page.online_info.length > 0 ||
						page.logon_info.length > 0 ||
						page.recharge_info.length > 0)
				) {
					me.kind = term.type == 2 ? "mobile_35" : "pc_5";
				}
				var url = me.page_url + me.kind + ".js?v=_" + fileVersion;
				_GM.getValue(me.kind, (content) => {
					var callback = function () {
						var dom = util.string2DOM(bodyContent)[0];
						// 替换图片路径
						var imgs = dom.getElementsByTagName("img");
						for (var i = imgs.length - 1; i >= 0; i--) {
							var src = imgs[i].src;
							if (src && src.length > 0) {
								var index = src.indexOf("/", 10);
								if (index > 0) {
									src = src.substr(index + 1); // 去掉 http://xxx部分
									var srcAry = src.split("/");
									//EditEportal 公用目录不做页面文件替换
									if (srcAry[0] == "EditEportal") {
										imgs[i].src = me.eportal + src;
									} else {
										imgs[i].src =
											me.page_url + srcAry[srcAry.length - 1];
									}
								}
							}
						}

						//解决视频路径问题
						var videos = dom.getElementsByTagName("video");
						for (var i = videos.length - 1; i >= 0; i--) {
							var src = videos[i].src;
							if (src && src.length > 0) {
								var index = src.indexOf("/", 10);
								if (index > 0) {
									src = src.substr(index + 1); // 去掉 http://xxx部分
									var srcAry = src.split("/");
									videos[i].src = me.page_url + srcAry[srcAry.length - 1];
								}
							}
							videos[i].setAttribute(
								"poster",
								me.eportal + "EditEportal/Images/a03.jpg"
							);
						}
						// 解决按钮背景图片路径问题
						var changeBtnImgPath = function (targets) {
							for (var i = targets.length - 1; i >= 0; i--) {
								var style = targets[i].getAttribute("style");
								if (style) {
									if (style.indexOf('url("') >= 0) {
										style = style.replace(
											'url("',
											'url("' + me.page_url
										); //IE
									} else {
										style = style.replace("url(", "url(" + me.page_url);
									}
								}
								targets[i].setAttribute("style", style);
							}
						};
						changeBtnImgPath(dom.getElementsByTagName("button"));
						changeBtnImgPath(dom.getElementsByTagName("input"));

						//哆点显示问题
						if (
							typeof duodianAppHidden != "undefined" &&
							duodianAppHidden == 1
						) {
							var a = dom.getElementsByTagName("a");
							for (var i = a.length; i >= 0; i--) {
								if (typeof a[i] != "undefined") {
									if (
										a[i].getAttribute("href") ==
										"http://www.doctorcom.com/duodian/" ||
										a[i].getAttribute("data-localize") ==
										page.kind + ".common.downloadapp" ||
										a[i].getAttribute("class") == "lightbox_a" ||
										a[i].getAttribute("desc") == "duodian_download" ||
										a[i].getAttribute("href") ==
										"http://www.drcom.com.cn"
									) {
										if (
											typeof a[i].style != "undefined" &&
											typeof a[i].style.display != "undefined"
										) {
											a[i].style.display = "none";
										}
									}
									if (a[i].getAttribute("name") == "openApp") {
										if (
											typeof a[i].parentElement != "undefined" &&
											typeof a[i].style != "undefined" &&
											typeof a[i].style.display != "undefined"
										) {
											a[i].parentElement.style.display = "none";
										}
									}
								}
							}
						}

						document.body.innerHTML = "";
						document.body.appendChild(dom);
						_GM.getValue("lay-自定义壁纸", (flag) => {
							if (!flag || (flag && (flag == true || flag == 'true'))) {
								_GM.getValue("value-壁纸接口", (url) => {
									if (url)
										document.querySelector(
											"body"
										).style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0, 0.5)), url("${url}") no-repeat`;
								});
							}
						});
						_GM.getValue("lay-自定义LOGO", (flag) => {
							if (!flag || (flag && (flag == true || flag == 'true'))) {
								_GM.getValue("value-LOGO链接", (url) => {
									if (url)
										document.querySelector("#edit_body > div > img").src = url;
								});
							}
						});
						// 页面里面放了一个字段，区分页面的类型，需要针对不同类型的页面做不同处理
						// 目前暂时用这个来判断页面是否为访客模板 guest visitor eduroam 三种
						document.getElementById("pagetype") &&
							(me.vtype = document.getElementById("pagetype").value);

						// 渲染完成后 做一些初始化操作 以及调用回调函数
						if (typeof _init != "undefined") {
							if (
								$('[name="language"]').length > 0 ||
								store.get("i18n_lang") == "en"
							) {
								language.init(null, function () {
									_init(next);
								});
							} else {
								_init(next);
							}
						} else {
							next && next();
						}
					};
					if (!content) {
						_GM.addScript('url', url, callback);
					} else {
						_GM.addScript('js', content, callback);
					}
				});
			};
		},
		hook_util_load: function () {
			var _util_load = util._load;
			util._load = function (type, url, callback) {
				if (url.includes("a40.js")) {
					console.log("a40.js:" + type, callback);
					callback = function () {
						hook_a40.initHookA40();
					};
				}
				return _util_load(type, url, callback);
			};
		},
		hook_util_jsonp: function () {
			var _util_jsonp = util._jsonp;
			util._jsonp = function (params) {
				var me = util;
				var lang = store.get("i18n_lang") == "en" ? "en" : "zh";
				//格式化参数
				var formatParams = function (data) {
					var arr = [];
					for (var name in data) {
						if (name == "callback") {
							arr.unshift(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
						} else {
							arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
						}
					}
					// 添加一个随机数，防止缓存
					arr.push("v=" + random());
					// 添加中英文标识
					arr.push("lang=" + lang);
					return arr.join("&");
				};
				// 获取随机数
				var random = function () {
					return Math.floor(Math.random() * 10000 + 500);
				};

				params = params || {};
				params.data = params.data || {};

				// jsonp请求
				//创建script标签并加入到页面中
				var callbackName = "dr" + me.increment(); // 自定义 callbackName
				var head = document.getElementsByTagName("head")[0];
				// 设置传递给后台的回调参数名
				params.data["callback"] = callbackName;
				// 默认带上 jsVersion
				params.data["jsVersion"] = jsVersion;
				var data = formatParams(params.data);
				var script = document.createElement("script");
				head.appendChild(script);
				//创建jsonp回调函数
				window[callbackName] = function (json) {
					if (params.url.includes("loadConfig")) {
						json = replace_loadConfig_Json(json);
						// login_fun.autoCheckLogin();
					}
					if (params.url.includes("find")) {
						var success_hook = params.success;
						params.success = function (succObj) {
							var flag = success_hook(succObj);
							show_Info_PageTips();
							return flag;
						};
					}
					head.removeChild(script);
					clearTimeout(script.timer);
					window[callbackName] = null;
					params.success && params.success(json);
				};
				//发送请求
				script.src = params.url + (params.url.indexOf("?") > 0 ? "&" : "?") + data;
				//为了得知此次请求是否成功，设置超时处理
				if (params.time) {
					script.timer = setTimeout(function () {
						window[callbackName] = null;
						head.removeChild(script);
						params.error && params.error({ message: "超时" });
					}, params.time);
				}
			};
		},
		initHookA41: function () {
			this.hook_page_render();
			this.hook_util_load();
			this.hook_util_jsonp();
			window.re = function () {
				login_fun.check_user_loop(0);
			};
			window.eee = function () {
				login_fun.check_user_loop(0);
			};
			window.settings = function () {
				value_setting.show_setting_modal();
			};
			window.close_settings = function () {
				document.getElementById('floating-window').style.display = 'none';
			};
			window.update_settings = function () {
				value_setting.updateValue();
			};
			window.init_settings = function () {
				value_setting._init();
			};
		},
	};
	const login_fun = {
		num: 0,
		user_info: '',
		increment: function () {
			return ++this.num;
		},
		get_user_info: function () {
			var t = this;
			_GM.getValue('value-多账号信息', (content) => {
				if (!content) {
					_alert(lang("首次使用请点击齿轮设置账号！"));
				} else {
					t.user_info = JSON.parse(content).as;
				}
			});
		},
		check_user_loop: function (num) {
			var t = this;
			if (this.user_info == '') {
				this.get_user_info();
			}
			var user = {
				DDDDD: this.user_info[num].a,
				upass: this.user_info[num].p,
				R3: this.user_info[num].t,
			};
			this.find_mac(user.DDDDD, function (json) {
				console.log(json);
				if (json.result == 0) {
					t.PortalLogin(user);
				} else {
					t.check_user_loop(t.increment());
				}
			});
		},
		find_mac: function (account, callback) {
			const url = page.portal_api + "mac/find?user_account=" + account;
			util._jsonp({
				url: url,
				success: function (succObj) {
					callback && callback(succObj);
				},
			});
		},
		PortalLogin: function (user) {
			var data = {
				DDDDD: user.DDDDD,
				upass: user.upass,
				"0MKKey": 123456,
				R1: 0,
				R2: "",
				R3: user.R3,
				R6: 1,
				para: "00",
				v6ip: "",
			};
			data.terminal_type = term.type;
			data.lang = language.lang.toLowerCase();
			var url = (page.login_method == 0 ? page.path : page.portal_api) + "login";
			util._jsonp({
				url: url,
				data: data,
				success: function (json) {
					if (json.result == 1 || json.result == "ok") {
						if (!login.redirect(window.m, json.UL)) {
							page.kind = term.type == 2 ? "mobile_33" : "pc_3";
							page.render();
						}
					}
				},
				error: function (error) {
					_alert(lang("认证方法调用出现异常，请刷新页面重试！"));
				},
			});
		},
	};
	value_setting.initValue();
	hook_document_createElement();

})();
