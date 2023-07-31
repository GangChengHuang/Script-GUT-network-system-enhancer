// ==UserScript==
// @name         桂林理工大学校园网认证系统增强
// @namespace    https://github.com/GangChengHuang
// @version      1.3
// @description  桂林理工大学校园网认证信息不够全面，故开发此插件！自动认证，界面美化，屏蔽学校官网转跳，多账号自动认证，显示全面的认证信息。
// @author       Peterg
// @match        http://172.16.2.2/*
// @icon         https://cas.glut.edu.cn/favicon.ico
// @run-at       document-body
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
// @license      GPL3.0
// ==/UserScript==
(function () {

	// 添加样式
	GM_addStyle(`
	#floating-window {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #f9f9f9;
		border: 1px solid #ccc;
		border-radius: 8px;
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
		width: 400px;
		min-height: 300px;
		overflow: hidden;
		z-index: 9999;
	}
	
	.title-bar {
		display: flex;
		align-items: center;
		background-color: #f9f9f9;
		height: 40px;
		padding: 0 16px;
		border-bottom: 1px solid #ccc;
	}
	
	.title-bar-text {
		flex-grow: 1;
		font-size: 14px;
		font-weight: bold;
		text-align: center;
	}
	
	.title-bar-buttons {
		display: flex;
		align-items: center;
	}
	
	.tips-text {
		font-weight: bold;
		text-align: center;
	}
	
	.title-bar-buttons button {
		width: 14px;
		height: 14px;
		margin-left: 4px;
		border: none;
		border-radius: 50%;
		cursor: pointer;
	}
	
	.minimize-button {
		background-color: #ffb900;
	}
	
	.maximize-button {
		background-color: #ff3b30;
	}
	
	.close-button {
		background-color: #34c759;
	}
	
	.floating-window-content {
		padding: 16px;
	}
	
	.floating-window-input {
		display: block;
		margin-bottom: 8px;
		width: 100%;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 14px;
		background-color: #f2f2f2;
		color: #333;
	}
	
	.floating-window-textarea {
		display: block;
		margin-bottom: 8px;
		width: 95%;
		padding: 10px 10px 50px 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 14px;
		background-color: #f2f2f2;
		color: #333;
	}
	
	
	.floating-window-checkbox {
		margin-bottom: 10px;
	}
	
	.floating-window-button {
		display: block;
		margin-bottom: 8px;
		width: 100%;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 14px;
		background-color: #f2f2f2;
		color: #333;
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
	
	#minimized-icon {
		position: fixed;
		bottom: 10%;
		left: 20px;
		font-size: xxx-large;
		z-index: initial;
	}
	
	#floating-window.maximized {
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: auto;
		height: auto;
		border-radius: 0;
		box-shadow: none;
	}
	
	
	.tilink {
		position: fixed;
		padding: 1%;
		text-align: right;
		font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	}
	
	.tilink ul {
		list-style: none;
		padding: 10;
		margin: 0;
	}
	
	
	.tilink img {
		width: 15%;
	}
`);

	var loginInfo = GM_getValue('loginInfo', '');
	var loginInfoJson = "";

	if (isJSON(loginInfo)) {
		loginInfoJson = JSON.parse(loginInfo).as
	} else {

	}

	function isJSON(str) {
		if (typeof str == 'string') {
			try {
				var obj = JSON.parse(str);
				if (typeof obj == 'object' && obj)
					return true;
				else
					return false;
			} catch (e) {
				console.log('error：' + str + '!!!' + e);
				return false;
			}
		}
		console.log('It is not a string!')
		return false;
	}

	function replaceLink() {
		if (ISRedirect && ISRedirect == 1) ISRedirect = 0;
		if (rebackLink && rebackLink == "http://172.16.2.2/a79.htm") {
			rebackLink = "http://172.16.2.2/";
		}
		if (redirectLink && redirectLink == "https://www.glut.edu.cn/") {
			redirectLink = "http://172.16.2.2/";
		}
		if (location.href.startsWith('http://172.16.2.2/a79.htm')) {
			location.replace('http://172.16.2.2/');
		}
	}

	function showLoggedInfo() {
		var str = "认证信息为：<br/>"
		if (GM_getValue("account", false)) str += `工号/学号/账号：${term.account}<br/>`
		if (GM_getValue("ipaddress", false)) str += `IPv4地址：${term.ip}<br/>`
		if (GM_getValue("macaddress", false)) str += `MAC地址：${term.mac.toUpperCase()}<br/>`
		if (GM_getValue("devicetype", false)) str += `设备类型：${["其他", "PC", "手机", "平板"][term.type]}<br/>`
		if (GM_getValue("accountname", false)) str += `账号名称：${NID}<br/>`
		if (GM_getValue("logintime", false)) str += `认证时间：${stime}<br/>`
		if (GM_getValue("logouttime", false)) str += `过期时间：${etime}<br/>`
		if (GM_getValue("usedflow", false)) str += `已用流量：${flow1 / 1024 + flow3 + flow0 / 1024}MByte<br/>`
		var loginBox = document.querySelector("#edit_body > div:nth-child(2) > div.edit_loginBox.ui-resizable-autohide");
		var loginBox2 = document.querySelector("#edit_body > div:nth-child(2) > div.edit_loginBox.ui-resizable-autohide > form > div");
		if (str == "认证信息为：<br/>") {
			$('[name=PageTips]').html(lang('您已经成功登录。'));
			if (loginBox2 && loginBox2.style.height != "60%") {
				loginBox2.style.height = "60%";
			}
		} else {
			try {
				$("[name=PageTips]").html(lang(str));
			} catch (error) { }
			if (loginBox) {
				if (loginBox.style.height == "225px") {
					loginBox.style.height = "270px";
				}
				if (loginBox.style.height == "233px") {
					loginBox.style.height = "305px";
				}
			}
			if (loginBox2 && loginBox2.style.height != "") {
				loginBox2.style.height = "";
			}
		}
	}

	var pageStr = "";
	function checkPageTitle() {
		switch (page.kind) {
			case "pc":
			case "mobile":
				pageStr = "上网登录页";
				fixLoginLayout();
				hookCheckForm();
				break;
			case "pc_1":
			case "mobile_31":
				pageStr = "注销页";
				showLoggedInfo();
				fixLoggedLayout();
				hookwc();
				break;
			case "pc_3":
			case "mobile_33":
				pageStr = "登录成功页";
				break;
			case "pc_2":
			case "mobile_32":
				pageStr = "信息页";
				break;
			case "pc_26":
			case "mobile_26":
				pageStr = "微信认证页";
				break;
			case "pc_27":
			case "mobile_27":
				pageStr = "扫描认证页";
				break;
			case "pc_09":
			case "mobile_09":
				pageStr = "免责声明";
				break;
			case "pc_20":
			case "mobile_10":
				pageStr = "快速登录页";
				break;
			case "pc_29":
			case "mobile_29":
				pageStr = "修改密码页";
				break;
			case "pc_5":
			case "mobile_35":
				pageStr = "用户信息页";
				break;
			case "pc_38":
			case "mobile_38":
				break;
			case "pc_signup":
			case "mobile_signup":
				break;
			case "pc_eduroam":
			case "mobile_eduroam":
				break;
			default:
				break;
		}
	}

	var fixbackground = false;
	var addBtReLogin = false;
	function fixLoggedLayout() {
		if (GM_getValue('addrelogin', false)) {
			var btLogged = document.querySelector(
				"#edit_body > div:nth-child(2) > div.edit_loginBox.ui-resizable-autohide > form > input"
			);
			if (btLogged) {
				btLogged.style.top = "";
				btLogged.style.left = "0";
				btLogged.style.right = "45%";
				btLogged.style.bottom = "10px";
				btLogged.style.margin = "auto";
				if (btLogged.value.includes("注") && !document.getElementById('newbtrelogin')) {
					var newbtrelogin = document.createElement("input");
					newbtrelogin.classList.add("edit_lobo_cell");
					newbtrelogin.id = "newbtrelogin";
					newbtrelogin.name = "relogin";
					newbtrelogin.type = "button";
					newbtrelogin.onclick = autoCheckLogin;
					newbtrelogin.value = "重新认证";
					newbtrelogin.style.cssText = btLogged.style.cssText;
					newbtrelogin.style.left = "45%";
					newbtrelogin.style.right = "0";
					document
						.querySelector(
							"#edit_body > div:nth-child(2) > div.edit_loginBox.ui-resizable-autohide > form"
						)
						.appendChild(newbtrelogin);
				}
			}
		} else {
			var btLogged = document.querySelector(
				"#edit_body > div:nth-child(2) > div.edit_loginBox.ui-resizable-autohide > form > input"
			);
			var newbtrelogin = document.getElementById('newbtrelogin');
			if (newbtrelogin) {
				newbtrelogin.remove();
			}
			if (btLogged) {
				btLogged.style.top = "";
				btLogged.style.left = "0";
				btLogged.style.right = "0";
				btLogged.style.bottom = "10px";
				btLogged.style.margin = "auto";
			}
		}
		var imglogo = document.querySelector(
			"#edit_body > div:nth-child(1) > div > a > img"
		);
		if (imglogo && imglogo.src != "https://cas.glut.edu.cn/portal/image/showImage/logo/1") {
			imglogo.src = "https://cas.glut.edu.cn/portal/image/showImage/logo/1";
			imglogo.style.width = "100%";
		}
		if (GM_getValue('fixbg', false)) {
			var info = document.querySelector(
				"#edit_body > div:nth-child(2) > div.edit_loginBox.ui-resizable-autohide > form > div"
			);
			if (info && info.style.color != "") info.style.color = "";
			var bordbg = document.querySelector(
				"#edit_body > div:nth-child(2) > div.edit_loginBox.ui-resizable-autohide > form"
			);
			if (bordbg && bordbg.style.backgroundColor != "rgb(255, 255, 255)")
				bordbg.style.backgroundColor = "rgb(255, 255, 255)";
			if (!fixbackground) {
				var bgurl = GM_getValue('bgurl', null);
				if (bgurl) {
					document.querySelector(
						"body"
					).style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0, 0.5)), url("${bgurl}") no-repeat`;
					//if (imglogo) imglogo.style.opacity = 0.4;
					fixbackground = true;
				}
			}
		} else {
			fixbackground = false;
			document.querySelector("body").style.background = "";
			//if (imglogo) imglogo.style.opacity = 1;
		}
		if (GM_getValue('addlinks', '')) {
			addlinks();
		} else {
			var hotlinks = document.getElementById('hotlinks');
			if (hotlinks) {
				hotlinks.remove();
			}
		}
	}


	function autoCheckLogin() {
		var index = 0;
		loop(index);
	}

	function loop(index) {
		if (index < loginInfoJson.length) {
			if (!loginInfoJson[index]) {
				_alert(lang("首次使用请在油猴-脚本中填写账号信息！"));
			} else {
				util._jsonp({
					url:
						page.portal_api +
						"mac/find?user_account=" +
						loginInfoJson[index].a,
					success: function (succObj) {
						if (succObj.result == 0) {
							_alert(lang("正在登录：" + loginInfoJson[index].a));
							autoPortalLogin(
								loginInfoJson[index].a,
								loginInfoJson[index].p,
								loginInfoJson[index].t
							);
						} else {
							loop(++index);
						}
					},
				});
			}
		} else {
			if (!GM_getValue('loginInfo', '')) {
				document.getElementById('minimized-icon').click();
				_alert(lang("请填写账号信息！"));
				return;
			}
			_alert(lang("请稍后重试！"));
		}
	}

	var fixrdys = false;
	function fixLoginLayout() {
		var bodyHeight = document.querySelector(
			"#edit_body > div:nth-child(3)"
		);
		var rdys = document.querySelector(
			"#edit_body > div:nth-child(3) > div.edit_loginBox.normal_box.random.loginuse.loginuse_pc.ui-resizable-autohide > div.edit_lobo_cell.edit_radio > label:nth-child(4) > input"
		);
		var tips = document.querySelector(
			"#edit_body > div:nth-child(3) > div.edit_loginBox.normal_box.random.loginuse.loginuse_pc.ui-resizable-autohide > div:nth-child(9) > p:nth-child(2) > span"
		);
		if (bodyHeight && bodyHeight.style.height != "500px") {
			bodyHeight.style.height = "500px";
		}
		if (tips) {
			tips.innerHTML = `自动登入功能使用：<br/>&nbsp; &nbsp; &nbsp; &nbsp; ①首次使用请在左下角设置中填写账号信息<br/>&nbsp; &nbsp; &nbsp; &nbsp; ②在本界面账号编辑框中输入自定义的口令<br/>&nbsp; &nbsp; &nbsp; &nbsp; ③按下登录按钮/回车键即可`;
		}
		if (rdys && !fixrdys) {
			rdys.style = document.querySelector(
				"#edit_body > div:nth-child(3) > div.edit_loginBox.normal_box.random.loginuse.loginuse_pc.ui-resizable-autohide > div.edit_lobo_cell.edit_radio > label:nth-child(5) > input"
			).style;
			fixrdys = true;
		}
	}

	function hookCheckForm() {
		try {
			var backups_login_checkForm = login.checkForm;
			login.checkForm = function (form) {
				if (form.DDDDD.value == GM_getValue('command', '')) {
					autoCheckLogin();
					return false;
				} else {
					return backups_login_checkForm(form);
				}
			};
		} catch (e) {
			return;
		}
	}

	function autoPortalLogin(account, upass, type) {
		var data = {
			DDDDD: account,
			upass: upass,
			"0MKKey": 123456,
			R1: 0,
			R2: "",
			R3: type,
			R6: 1,
			para: "00",
			v6ip: "",
		};
		data.terminal_type = term.type;
		data.lang = language.lang.toLowerCase();
		var url =
			(page.login_method == 0 ? page.path : page.portal_api) + "login";
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
	}

	function hookwc() {
		try {
			wc = function () {
				user.unbind_mac("", "", 1);
				logout.init();
				window.location = rebackLink;
				return true;
			};
		} catch (e) {
			return;
		}
	}

	function fixLayout() {
		var title = document.querySelector(
			"#edit_body > div:nth-child(2) > div.edit_cell.edit_prog.ui-resizable-autohide > p"
		);
		if (title) {
			title.style.color = "rgb(255,0,0)";
			title.innerHTML = "上网认证系统(增强💪)";
		}
	}

	// 创建菜单项
	//GM_registerMenuCommand('设置', openCustomMenu);

	function createCheckbox(labelText, value, todoFun) {
		var checkboxContainer = document.createElement('div');
		var floatingWindowCheckbox = document.createElement('input');
		floatingWindowCheckbox.classList.add('floating-window-checkbox');
		floatingWindowCheckbox.type = "checkbox";
		floatingWindowCheckbox.id = value;
		floatingWindowCheckbox.checked = GM_getValue(value, false);
		floatingWindowCheckbox.addEventListener('change', function () {
			GM_setValue(value, floatingWindowCheckbox.checked);
			todoFun();
		});
		checkboxContainer.appendChild(floatingWindowCheckbox);
		var label = document.createElement('label');
		label.htmlFor = value;
		label.textContent = labelText;
		checkboxContainer.appendChild(label);
		return checkboxContainer;
	}

	// 打开自定义菜单
	function openCustomMenu() {
		// 创建菜单容器
		var windowContainer = document.createElement('div');
		windowContainer.id = 'floating-window';

		var titleBar = document.createElement('div');
		titleBar.classList.add('title-bar');

		var titleBarButtons = document.createElement('div');
		titleBarButtons.classList.add('title-bar-buttons');

		var maximizeButton = document.createElement('button');
		maximizeButton.classList.add('maximize-button');
		titleBarButtons.appendChild(maximizeButton);

		var minimizeButton = document.createElement('button');
		minimizeButton.classList.add('minimize-button');
		titleBarButtons.appendChild(minimizeButton);

		var closeButton = document.createElement('button');
		closeButton.classList.add('close-button');
		titleBarButtons.appendChild(closeButton);

		titleBar.appendChild(titleBarButtons);

		var titleBarText = document.createElement('div');
		titleBarText.textContent = "上网助手设置";
		titleBarText.classList.add('title-bar-text');
		titleBar.appendChild(titleBarText);

		windowContainer.appendChild(titleBar);

		var floatingWindowContent = document.createElement('div');
		floatingWindowContent.classList.add('floating-window-content');

		var floatingWindowInputP = document.createElement('p');
		floatingWindowInputP.textContent = "自定义登录口令:";
		var floatingWindowInput = document.createElement('input');
		floatingWindowInput.classList.add('floating-window-input');
		floatingWindowInput.type = "text";
		floatingWindowInput.value = GM_getValue('command', '');
		floatingWindowInput.addEventListener('input', function () {
			GM_setValue('command', floatingWindowInput.value);
		});
		floatingWindowInputP.appendChild(floatingWindowInput);

		floatingWindowContent.appendChild(floatingWindowInputP);

		var floatingWindowCheckboxP = document.createElement('p');
		floatingWindowCheckboxP.textContent = "认证信息显示内容:";
		floatingWindowContent.appendChild(floatingWindowCheckboxP);

		var values = ["account", "ipaddress", "macaddress", "logintime", "logouttime", "devicetype", "usedflow", "accountname"];
		var textContents = ["账号", "ip地址", "MAC地址", "认证时间", "过期时间", "访问设备类型", "已用流量", "账号名称"];


		var accountCheckbox = createCheckbox(textContents[0], values[0], showLoggedInfo);
		floatingWindowContent.appendChild(accountCheckbox);

		var ipAddressCheckbox = createCheckbox(textContents[1], values[1], showLoggedInfo);
		floatingWindowContent.appendChild(ipAddressCheckbox);

		var macAddressCheckbox = createCheckbox(textContents[2], values[2], showLoggedInfo);
		floatingWindowContent.appendChild(macAddressCheckbox);

		var loginTimeCheckbox = createCheckbox(textContents[3], values[3], showLoggedInfo);
		floatingWindowContent.appendChild(loginTimeCheckbox);

		var logoutTimeCheckbox = createCheckbox(textContents[4], values[4], showLoggedInfo);
		floatingWindowContent.appendChild(logoutTimeCheckbox);

		var deviceTypeCheckbox = createCheckbox(textContents[5], values[5], showLoggedInfo);
		floatingWindowContent.appendChild(deviceTypeCheckbox);

		var usedFlowCheckbox = createCheckbox(textContents[6], values[6], showLoggedInfo);
		floatingWindowContent.appendChild(usedFlowCheckbox);

		var accountNameCheckbox = createCheckbox(textContents[7], values[7], showLoggedInfo);
		floatingWindowContent.appendChild(accountNameCheckbox);

		var floatingWindowCheckboxP2 = document.createElement('p');
		floatingWindowCheckboxP2.textContent = "页面布局美化:";
		floatingWindowContent.appendChild(floatingWindowCheckboxP2);

		var values2 = ["addrelogin", "fixbg", "addlinks"];
		var textContents2 = ["添加重新认证按钮", "美化信息页面背景", "显示常用链接"];

		var accountCheckbox = createCheckbox(textContents2[0], values2[0], fixLoggedLayout);
		floatingWindowContent.appendChild(accountCheckbox);

		var accountCheckbox = createCheckbox(textContents2[1], values2[1], fixLoggedLayout);
		floatingWindowContent.appendChild(accountCheckbox);

		var accountCheckbox = createCheckbox(textContents2[2], values2[2], fixLoggedLayout);
		floatingWindowContent.appendChild(accountCheckbox);

		var floatingWindowInputP2 = document.createElement('p');
		floatingWindowInputP2.textContent = "自定义壁纸接口:";
		var floatingWindowInput2 = document.createElement('input');
		floatingWindowInput2.classList.add('floating-window-input');
		floatingWindowInput2.type = "text";
		floatingWindowInput2.value = GM_getValue('bgurl', '');
		floatingWindowInput2.addEventListener('input', function () {
			GM_setValue('bgurl', floatingWindowInput2.value);
		});
		floatingWindowInputP2.appendChild(floatingWindowInput2);

		floatingWindowContent.appendChild(floatingWindowInputP2);

		var floatingWindowTextareaP = document.createElement('p');
		floatingWindowTextareaP.textContent = "多账号登录信息:";
		var floatingWindowTextarea = document.createElement('textarea');
		floatingWindowTextarea.classList.add('floating-window-textarea');
		floatingWindowTextarea.placeholder = `JSON格式\n例如：{"as":[{"a":"123","p":"123","t":1},{"a":"456","p":"456","t":2}]}\na为账号、p为密码、t为运营商\n注：运营商0-校园网，1-电信，2-移动，3-联通`;
		floatingWindowTextarea.value = GM_getValue('loginInfo', '');
		floatingWindowTextarea.addEventListener('input', function () {
			GM_setValue('loginInfo', floatingWindowTextarea.value);
		});
		floatingWindowTextareaP.appendChild(floatingWindowTextarea);

		floatingWindowContent.appendChild(floatingWindowTextareaP);

		// 创建页脚
		var footer = document.createElement('div');
		footer.style = "text-align: center;font-size: 1em;"
		footer.innerHTML = 'Powered by <a href="https://github.com/GangChengHuang">PeterG</a>';
		floatingWindowContent.appendChild(footer);

		windowContainer.appendChild(floatingWindowContent);

		// 添加窗口容器到页面
		document.body.appendChild(windowContainer);
		initFloatingWindowFunction();
	}

	function addlinks() {
		var windowContainer = document.createElement('div');
		windowContainer.id = 'hotlinks';
		windowContainer.innerHTML = `<div class="tilink">
		<ul>
			<li><a href="http://jw.glut.edu.cn/academic/common/security/login.jsp" target="_blank"><img
						src="https://jwc.glut.edu.cn/images/19/03/08/1wq5g7gs4d/xt_link1.jpg"></a>
				<a href="https://cas.glut.edu.cn" target="_blank"><img
						src="https://jwc.glut.edu.cn/images/19/03/08/1wq5g7gs4d/xt_link2.jpg"></a>
				<a href="http://meol.glut.edu.cn/meol/homepage/common/" target="_blank"><img
						src="https://jwc.glut.edu.cn/images/19/03/08/1wq5g7gs4d/xt_link3.jpg"></a>
			</li>
			<li class="other-links">
				<span class="other-link-tips">其他系统与平台链接</span>
				<div class="down-none">
					<a class="other-link" href="https://glut.yzkaola.com" target="_blank" title="">考试全流程管理平台</a>
					<a class="other-link" href="http://www.chsi.com.cn/xlcx/" target="_blank" title="毕业证书查询">毕业证书查询</a>
					<a class="other-link" href="http://xjxl.chsi.com.cn/index.action" target="_blank"
						title="新生学籍查询">新生学籍查询</a>
					<a class="other-link" href="http://bylw.glut.edu.cn/Index.aspx" target="_blank"
						title="毕业设计（论文）管理及质量评价系统">毕业设计（论文）管理及质量评价系统</a>
					<a class="other-link" href="glut.gstar-info.com:6060" target="_blank" title="">机控学院智慧实验室</a>
					<a class="other-link" href="http://lse.glut.edu.cn/wz" target="_blank" title="">实验室安全准入考试平台</a>
					<a class="other-link" href="http://hainan.gxjcy.cn/" target="_blank" title="">高校教材管理云平台</a>
					<a class="other-link" href="https://glut.yuketang.cn/pro/portal/home" target="_blank"
						title="">雨课堂一体化平台</a>
					<a class="other-link" href="http://bgxt.fanya.chaoxing.com/portal" target="_blank" title="">八桂学堂</a>
					<a class="other-link" href="http://glut.xuetangx.com" target="_blank" title="桂工慕课">桂工慕课</a>
					<a class="other-link" href="http://portals.zhihuishu.com/glut/shareCourse" target="_blank"
						title="">智慧树</a>
				</div>
			</li>
		</ul>
	</div>`;
		var hotlinks = document.querySelectorAll("#hotlinks");
		if (hotlinks.length > 1) {
			for (var i = 1; i < hotlinks.length; i++) {
				hotlinks[i].remove();
			}
		} else if (hotlinks.length < 1) {
			document.body.appendChild(windowContainer);
		}
	}
	function initFloatingWindowFunction() {
		// 获取窗口元素
		var floatingWindow = document.getElementById('floating-window');

		// 添加拖动功能
		var isDragging = false;
		var offsetX = 0;
		var offsetY = 0;

		function handleMouseDown(event) {
			isDragging = true;
			offsetX = event.clientX - floatingWindow.offsetLeft;
			offsetY = event.clientY - floatingWindow.offsetTop;
		}

		function handleMouseUp() {
			isDragging = false;
		}

		function handleMouseMove(event) {
			if (isDragging) {
				floatingWindow.style.left = event.clientX - offsetX + 'px';
				floatingWindow.style.top = event.clientY - offsetY + 'px';
			}
		}

		floatingWindow.querySelector('.title-bar').addEventListener('mousedown', handleMouseDown);
		window.addEventListener('mouseup', handleMouseUp);
		window.addEventListener('mousemove', handleMouseMove);

		// 添加调整大小功能
		var isResizing = false;
		var originalWidth = floatingWindow.offsetWidth;
		var originalHeight = floatingWindow.offsetHeight;
		var resizeHandle = document.createElement('div');
		resizeHandle.className = 'resize-handle';

		function handleResizeMouseDown(event) {
			isResizing = true;
			originalWidth = floatingWindow.offsetWidth;
			originalHeight = floatingWindow.offsetHeight;
			offsetX = event.clientX;
			offsetY = event.clientY;
		}

		function handleResizeMouseUp() {
			isResizing = false;
		}

		function handleResizeMouseMove(event) {
			if (isResizing) {
				var width = originalWidth + (event.clientX - offsetX);
				var height = originalHeight + (event.clientY - offsetY);
				floatingWindow.style.width = width + 'px';
				floatingWindow.style.height = height + 'px';
			}
		}

		resizeHandle.addEventListener('mousedown', handleResizeMouseDown);
		window.addEventListener('mouseup', handleResizeMouseUp);
		window.addEventListener('mousemove', handleResizeMouseMove);
		floatingWindow.appendChild(resizeHandle);

		// 添加最小化和关闭功能
		var minimizeButton = floatingWindow.querySelector('.minimize-button');
		var maximizeButton = floatingWindow.querySelector('.maximize-button');
		var closeButton = floatingWindow.querySelector('.close-button');

		function handleMinimizeClick() {
			floatingWindow.style.display = 'none';
			//showMinimizedIcon();
		}

		function handleMaximizeClick() {
			floatingWindow.classList.toggle('maximized');
		}

		function handleCloseClick() {
			floatingWindow.remove();
			removeMinimizedIcon();
		}

		minimizeButton.addEventListener('click', handleMinimizeClick);
		maximizeButton.addEventListener('click', handleMaximizeClick);
		closeButton.addEventListener('click', handleCloseClick);
	}

	function addMinimizeIcon() {
		// 添加最小化图标
		var minimizedIcon = document.createElement('div');
		minimizedIcon.id = 'minimized-icon';
		minimizedIcon.title = '打开悬浮窗';
		minimizedIcon.textContent = '⚙️';
		minimizedIcon.addEventListener('click', handleMinimizedIconClick);

		function showMinimizedIcon() {
			var minimizedIcons = document.querySelectorAll("#minimized-icon");
			if (minimizedIcons.length > 1) {
				for (var i = 1; i < minimizedIcons.length; i++) {
					minimizedIcons[i].remove();
				}
			} else if (minimizedIcons.length < 1) {
				document.body.appendChild(minimizedIcon);
			}
		}

		function removeMinimizedIcon() {
			if (document.body.contains(minimizedIcon))
				minimizedIcon.remove();
			//minimizedIcon.remove();
		}
		function handleMinimizedIconClick() {
			var floatingWindows = document.querySelectorAll("#floating-window");
			for (var i = 1; i < floatingWindows.length; i++) {
				floatingWindows[i].remove();
			}
			var floatingWindow = document.getElementById('floating-window');
			if (!floatingWindow) {
				openCustomMenu();
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
			//removeMinimizedIcon();
		}
		showMinimizedIcon();
	}
	function hook_alert() {
		try {
			var _alert_ = _alert;
			_alert = function (msg) {
				if (msg == "获取用户在线信息数据为空！") {
					location.reload();
					return;
				}
				return _alert_(msg);
			}
		} catch (error) {
		}
	}

	function pageMutation() {
		var targetNode = document.getElementsByTagName("head")[0];
		var config = { attributes: true, childList: true, subtree: true };
		var callback = function (mutationsList) {
			mutationsList.forEach(function (item, index) {
				checkPageTitle();
				replaceLink();
				fixLayout();
				addMinimizeIcon();
				if (!document.getElementById('hotlinks') && GM_getValue('addlinks', '')) {
					addlinks();
				}
				hook_alert();
			});
		};
		var observer = new MutationObserver(callback);
		observer.observe(targetNode, config);
	}
	pageMutation();
})();
