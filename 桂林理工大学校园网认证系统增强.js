// ==UserScript==
// @name         桂林理工大学校园网认证系统增强
// @namespace    GCH
// @version      0.1
// @description  个人认为认证界面反馈信息不够全面，故开发此插件！
// @author       Peterg
// @match        http://172.16.2.2/*
// @match        https://www.glut.edu.cn/
// @icon         http://172.16.2.2:801/eportal/extern/x7lLGb1653967538/FzJLgH1653967572/492b2e5e5fe31aff1a697c88b4bc0ac8.png
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @run-at       document-body
// @license      GPL3.0
// ==/UserScript==
(function () {

    var text_account = GM_getValue("text_account", "");
    var text_password = GM_getValue("text_password", "");
    var text_operator = GM_getValue("text_operator", "0");

    if (location.href.startsWith('http://172.16.2.2/a79.htm')) {
        location.replace('http://172.16.2.2/');
    }
    if (location.href.startsWith('https://www.glut.edu.cn/')) {
        location.replace('http://172.16.2.2/');
    }

    function hoverTreeClearMark(input) {
        input = input.replace(/[\t]*\/\/[^\n]*/g, "").replace(/\/\*[\s\S]*?\*\//gi, "").replace(/\s+/g, "").replace(/(,|;)/g, ",\"").replace(/=/g, "\":").replace(/'/g, "\"").trim();
        return "{\"" + input.substring(0, input.lastIndexOf(",\"olmm")) + "}";
    }

    function formatDate(time) {
        let date = new Date(time.replace(/(\d{4})-(\d{2})-(\d{2})(\d{2}):(\d{2}):(\d{2})/, '$1/$2/$3 $4:$5:$6'));
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }

    function showLoggedInfo() {
        if (!checkLoginStatus()) return;
        var data_script = document.querySelector("head > script:nth-child(7)");
        if (!data_script) location.replace('http://172.16.2.2/');
        var result_json = JSON.parse(hoverTreeClearMark(data_script.innerText));
        var str = `\n认证信息为：\n工号/学号/账号：${result_json.uid}\nIPv4地址：${result_json.v4ip}\n认证时间：${formatDate(result_json.stime)}\n账号名称：${result_json.NID}`;
        document.querySelector("#edit_body > div:nth-child(2) > div.edit_loginBox.ui-resizable-autohide > form > div").innerText += str;
    }

    // 创建悬浮窗
    function createFloatingWindow() {
        // 创建窗口容器
        var windowContainer = document.createElement('div');
        windowContainer.id = 'floating-window';
        windowContainer.innerHTML = `
            <div class="title-bar">
    <div class="title-bar-buttons">
        <button class="maximize-button"></button>
        <button class="minimize-button"></button>
        <button class="close-button"></button>
    </div>
    <div class="title-bar-text">桂林理工大学增强工具</div>
</div>
<p class="tips-text" id="text-tips"></p>
<div class="floating-window-content" id="div-floating-window">
    <div id="div-floating-window-account">
        <p id="text-account">工号/学号/账号:</p>
        <input class="floating-window-input" type="text" placeholder="1" id="input-text-account">
    </div>
    <div id="div-floating-window-password">
        <p id="text-password">密码:</p>
        <input class="floating-window-input" type="text" placeholder="1" id="input-text-password">
    </div>
    <div id="div-floating-window-operator">
        <p id="text-operator">运营商:</p>
        <div class="td-floating-window-operator">
            <div id="radio-operator">
                <label><input class="floating-window-radio" name="operator" value="0" type="radio"
                        id="radio-operator-0">校园网</label>
                <label><input class="floating-window-radio" name="operator" value="1" type="radio"
                        id="radio-operator-1">电信</label>
                <label><input class="floating-window-radio" name="operator" value="2" type="radio"
                        id="radio-operator-2">移动</label>
                <label><input class="floating-window-radio" name="operator" value="3" type="radio"
                        id="radio-operator-3">联通</label>
            </div>
        </div>
    </div>
    <button class="floating-window-button" type="button" id="login-button">一键认证(免注销)</button>
</div>
        `;

        // 添加窗口容器到页面
        document.body.appendChild(windowContainer);

        // 获取窗口元素
        var floatingWindow = document.getElementById('floating-window');

        // 添加拖动功能
        var isDragging = false;
        var offsetX = 0;
        var offsetY = 0;

        var inputAccountt = document.getElementById("input-text-account");
        var inputPassword = document.getElementById("input-text-password");
        var inputOperator = document.getElementsByName("operator");

        inputAccountt.value = text_account;
        inputPassword.value = text_password;
        inputOperator[parseInt(text_operator)].click();

        document.getElementById("text-tips").textContent = document.querySelector("#edit_body > div:nth-child(2) > div.edit_loginBox.ui-resizable-autohide > form > div").innerText;

        document.getElementById("login-button").addEventListener("click", function () {
            var inputAccountt = document.getElementById("input-text-account").value;
            var inputPassword = document.getElementById("input-text-password").value;
            var operators = document.getElementsByName("operator");
            var inputOperator = 0;
            var text_tips = document.getElementById("text-tips");
            for (var i = 0; i < operators.length; i++) {
                if (document.getElementsByName("operator")[i].checked) {
                    inputOperator = i;
                    continue;
                }
            }
            if (inputAccountt == "") {
                text_tips.textContent = `请输入账号！！`;
                return;
            }
            if (inputPassword == "") {
                text_tips.textContent = `请输入密码！！`;
                return;
            }
            getLogin(inputAccountt, inputPassword, inputOperator);
        });

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
            showMinimizedIcon();
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

        // 添加最小化图标
        var minimizedIcon = document.createElement('div');
        minimizedIcon.id = 'minimized-icon';
        minimizedIcon.title = '打开悬浮窗';
        minimizedIcon.addEventListener('click', handleMinimizedIconClick);

        function showMinimizedIcon() {
            document.body.appendChild(minimizedIcon);
        }

        function removeMinimizedIcon() {
            minimizedIcon.remove();
        }

        function handleMinimizedIconClick() {
            floatingWindow.style.display = 'block';
            removeMinimizedIcon();
        }
    }

    function getLogin(uid, pwd, opt) {
        var login_url = "http://172.16.2.233/drcom/login";
        // GM_xmlhttpRequest({
        //     url: login_url,
        //     method: "GET",
        //     data: `callback=dr1003&DDDDD=${uid}&upass=${pwd}&0MKKey=123456&R1=0&R2=&R3=${opt}&R6=1&para=00&v6ip=&terminal_type=2`,
        //     onload: function (xhr) {
        //         console.log(xhr.responseText);
        //     }
        // });
    }

    function checkLoginStatus() {
        return document.querySelector("div.edit_loginBox > form > input") ? document.querySelector("div.edit_loginBox > form > input").value.includes("注") : false;
    }

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

        .floating-window-radio {
            margin-bottom: 8px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
            background-color: #f2f2f2;
            color: #333;
        }

        .td-floating-window-operator {
            text-align: center;
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
            bottom: 20px;
            left: 20px;
            width: 32px;
            height: 32px;
            background-color: #9e9e9e;
            border-radius: 50%;
            cursor: pointer;
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
    `);

    setTimeout(function () {
        showLoggedInfo();
        createFloatingWindow();
    }, 200);
})();
