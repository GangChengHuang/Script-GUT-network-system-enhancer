// ==UserScript==
// @name         桂林理工大学校园网认证系统增强
// @namespace    https://github.com/GangChengHuang
// @version      1.1
// @description  桂林理工大学校园网认证信息不够全面，故开发此插件！自动认证，界面美化，屏蔽学校官网转跳，多账号自动认证，显示全面的认证信息。
// @author       Peterg
// @match        http://172.16.2.2/*
// @match        https://www.glut.edu.cn/
// @icon         http://172.16.2.2:801/eportal/extern/x7lLGb1653967538/FzJLgH1653967572/492b2e5e5fe31aff1a697c88b4bc0ac8.png
// @run-at       document-body
// @license      GPL3.0
// ==/UserScript==
(function () {
	var youruids = ["你的账号", "123456890"]; //多个账号用","隔开
	var yourpwds = ["你的密码", "123456890"];
	var yourtypes = [0, 3]; //运营商,校园网填0  电信宽带填1  移动宽带填2  联通宽带填3

	function replaceLink() {
		if (rebackLink && rebackLink == "http://172.16.2.2/a79.htm") {
			rebackLink = "http://172.16.2.2/";
		}
		if (redirectLink && redirectLink == "https://www.glut.edu.cn/") {
			redirectLink = "http://172.16.2.2/";
		}
	}

	function showLoggedInfo() {
		var str = `认证信息为：\n工号/学号/账号：${uid}\nIPv4地址：${v4ip}\n认证时间：${stime}\n账号名称：${NID}\n已用流量：${
			flow1 / 1024 + flow3 + flow0 / 1024
		}MByte`;
		var loggedInfo = document.querySelector(
			"#edit_body > div:nth-child(2) > div.edit_loginBox.ui-resizable-autohide > form > div"
		);
		if (loggedInfo && loggedInfo.innerText == "您已经成功登录。") {
			loggedInfo.innerText = str;
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
		var btLogged = document.querySelector(
			"#edit_body > div:nth-child(2) > div.edit_loginBox.ui-resizable-autohide > form > input"
		);
		var imglogo = document.querySelector(
			"#edit_body > div:nth-child(1) > div > a > img"
		);
		var topvlaue = page.kind == "pc_1" ? "168px" : "178px";
		var leftvlaue = page.kind == "pc_1" ? "55px" : "85px";
		var newbtleftvlaue = page.kind == "pc_1" ? "255px" : "365px";
		if (btLogged) {
			if (btLogged.style.top != topvlaue) {
				btLogged.style.top = topvlaue;
				btLogged.style.left = leftvlaue;
			}
			if (btLogged.value == "注  销" && !addBtReLogin) {
				var newbtrelogin = document.createElement("input");
				newbtrelogin.class = "edit_lobo_cell";
				newbtrelogin.name = "relogin";
				newbtrelogin.type = "button";
				newbtrelogin.onclick = autoCheckLogin;
				newbtrelogin.value = "重新认证";
				newbtrelogin.style.cssText = btLogged.style.cssText;
				newbtrelogin.style.left = newbtleftvlaue;
				document
					.querySelector(
						"#edit_body > div:nth-child(2) > div.edit_loginBox.ui-resizable-autohide > form"
					)
					.appendChild(newbtrelogin);
				addBtReLogin = true;
			}
		}

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
			document.querySelector(
				"body"
			).style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0, 0.5)), url("https://www.guanyujiang.com/api/bingapi.php") no-repeat`;
			if (imglogo) imglogo.style.opacity = 0.4;
			fixbackground = true;
		}
	}

	autoCheckLogin = function () {
		for (i = 0; i < youruids.length; i++) {
			if (youruids[i] == "你的账号") {
				_alert(lang("首次使用请在油猴-脚本中填写账号信息！"));
				break;
			}
			if (!checkAcc(youruids[i])) {
				_alert(lang("正在登录：" + youruids[i]));
				autoPortalLogin(youruids[i], yourpwds[i], yourtypes[i]);
				break;
			}
		}
	};

	checkAcc = function (account) {
		util._jsonp({
			url: page.portal_api + "mac/find?user_account=" + account,
			success: function (succObj) {
				if (succObj.result == 0) {
					return false;
				} else if (succObj.result == 1) {
					return true;
				}
			},
			error: function (error) {
				_alert(lang("获取MAC异常，请重试！"));
			},
		});
	};

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
			tips.innerHTML = `自动登入功能使用：<br/>&nbsp; &nbsp; &nbsp; &nbsp; ①首次使用请在油猴脚本中填写账号信息<br/>&nbsp; &nbsp; &nbsp; &nbsp; ②在本界面账号编辑框中输入"pg"<br/>&nbsp; &nbsp; &nbsp; &nbsp; ③按下登录按钮/回车键即可`;
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
				if (form.DDDDD.value == "pg") {
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

	function pageMutation() {
		var targetNode = document.getElementsByTagName("head")[0];
		var config = { attributes: true, childList: true, subtree: true };
		var callback = function (mutationsList) {
			mutationsList.forEach(function (item, index) {
				checkPageTitle();
				replaceLink();
			});
		};
		var observer = new MutationObserver(callback);
		observer.observe(targetNode, config);
	}
	pageMutation();
})();
