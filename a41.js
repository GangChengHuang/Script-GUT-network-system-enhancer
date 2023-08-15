/********************  公用配置参数  ********************/
var jsVersion = '4.1';

var redirectLink = "";// 登录重定向

var rebackLink = "";//返回重定向

var accountSuffix = "";// 账号后缀

var accountPrefix = 0;// 是否添加账号前缀(0-不添加；1-添加)默认添加账号前缀1

var enPerceive = 0;// 是否支持快速登录(0-不支持；1-支持)

var customPerceive = 0;// 是否记录mac (0-记录；1-不记录)

var enAdvert = 0;// 是否显示广告(0-不显示；1-显示)

var advert_host = "http://127.0.0.1:9080";// 广告统计服务器地址，例如：http://192.168.0.1:9080

var onlineMonitor = 1;//是否在线监听(0-9002端口监听；1-在线接口监听)

var acLogout = 0;//多AC认证环境下通过后台接口注销功能(0-停用，1-radius注销，2-后台注销）

var unBindMac = 0;//注销时使用解绑mac地址(1-启动)

var ispUnBindSuffix = 1;//运营商解绑时无后缀(1-启动)

var findMac = 0;//1-启用BS全业务接口查询(0-默认内核查询)

var radiusIP = "";//RADIUS服务器IP

var registerMode = 0;//开户方式(0-私有云开户，1-BS开户，2-酒店版，3-2188访客系统, 4-普教系统)

var changePassMode = 0;//修改密码方式(0-eportal页面，1-自服务(私有云不支持))

var cvlanid = "4095";//绑定CVLANID(用户首次登陆时强制修改密码)

var enableR3 = 0; // 是否启用 r3 参数区分多运营商

var webPayUrl = "http://127.0.0.1:8080/WebPay/toRecharge"; // 充值链接

var isLang = 0; //是否启动中英文 1-启用 0-关闭 (已废弃)

var ISRedirect = 1; //是否登录重定向 1-启用 0-关闭

var enbaleEduroamVerify = 0; // 旁路启用 eduroam 审核模式

var duodianAppHidden = 0; //是否隐藏哆点信息 1-隐藏 0-不隐藏

var storeExpireTime = 86400; //缓存过期时间,单位-秒

var ipv6Delay = 2000; //获取ipv6失败时，延迟时间，单位-毫秒

var enablev6 = 0; // 通过判断方案或页面的配置，最终决定是否启用 ipv6通过ipv4联动登录

var checkipv6 = 0; // 0-不检查；1-检查不到终止认证；2-检查不到记录日志

var enableHttps = 0; // 0-不启用https 1启用 https

var epHTTPPort = 801; // eportal http 端口

var enHTTPSPort = 802; // eportal https 端口

var domainName = ''; // 域名

var isJSMin = 1; // 0-不压缩方案js 1 压缩方案js

var checkOnlineMethod = 0; // 检测用户在线状态方式 0-内核，1-Radius

var ioMode = 0; // 0-Radius 描述：IO 1-内核命令：ras_iomode2

if (enableHttps === 1) {
  // 2166 设置ac 别名可以直接弹域名portal页
  // 启用了https ，但当前访问的不是 https，则跳转到 https ，如果有设置域名，但当前访问的不是域名，也跳转到域名访问
  if (window.location.protocol !== 'https:' || (domainName && window.location.hostname != domainName)) {
    window.location = 'https://' + (domainName || window.location.hostname) + window.location.pathname + window.location.search;
  }
}


var ep_port = window.location.protocol === 'http:' ? epHTTPPort : enHTTPSPort;
var page = {
  kind: 'pc',
  _kind: '',
  name: 'x7lLGb1653967538',
  index: 0,
  host: window.location.protocol + '//' + window.location.host + '/',
  hostname: window.location.protocol + '//' + window.location.hostname,
  path: window.location.protocol + '//' + window.location.host + '/drcom/',
  eportal: window.location.protocol + '//' + window.location.hostname + ':' + ep_port + '/eportal/',
  portal_api: window.location.protocol + '//' + window.location.hostname + ':' + ep_port + '/eportal/portal/',
  page_asset: window.location.protocol + '//' + window.location.hostname + ':' + ep_port + '/eportal/public/pageAsset/',
  page_url: '',
  redirectLink: '',
  redirectLogout: 0,
  login_method: 0,
  timer: null,
  advert_time_79: 0,
  window_title: '',
  //微信账号
  com_username: '',
  com_password: '',
  //公共账号
  common_username: '',
  common_password: '',
  //钉钉临时账号
  dingtalk_username: '',
  dingtalk_password: '',
  dingtalk_app_id: '',
  dingtalk_login_type: 0,
  // 在线监听接口 0-内核 9002 端口 1-Radius 查询
  online_monitor: 0,
  // 是否启用 pppoe 代拨，认证的时候传 r3 参数
  enable_r3: 0,
  // 密码截取
  password_cut: 0,
  // MD5 加密认证
  en_md5: 0,
  // 浏览器探测重定向列表
  visit_blacklist: [],
  // 成功页/注销页需要显示的信息
  user_info: '',
  online_info: '',
  logon_info: '',
  recharge_info: '',
  // 成功页/注销页显示信息对应标签
  user_info_lang: '',
  online_info_lang: '',
  logon_info_lang: '',
  recharge_info_lang: '',
  edit_info_lang: [],
  //启用新版全业务接口 1-启用
  enable_new_drcom_srv: '0',
  run: function (_kind) {
    var me = this;
    me._kind = _kind;
    // 需用到store.get获取中英文，所以提取出来单独优先加载
    util._load('js', page.page_asset + 'js/store.js', function () {
      // 初始化终端参数，获取 ip、mac等信息
      term.init(function () {
        // 首页检查是否需要跳转到访客扫码页面，主要用于访客旁路扫码
        if (!_kind) {
          if (me.checkIsGroupScanQRCode()) return;
        }
        me.kind = term.type == 2 ? 'mobile' : 'pc';
        // 获取页面配置等信息
        me.getPageInfo(function () {
          if (me._kind == 'eduroam') {
            // eduroam 页面，检查用户状态，已审核直接登录，未审核的显示审核页，并定时检查是否审核了
            me.checkUserStatusAndLoginByIP(true);
            return;
          }
          // 有指定要渲染的页面（带_kind），就设置 kind，
          // 没有指定就查询状态，看是否在线，再设置 kind ，然后根据 kind 加载对应页面内容
          if (!me._kind) {
            me.checkStatus();
          } else {
            var mobile_kind = me._kind == 1 || me._kind == 2 || me._kind == 3 ? 'mobile_3' : 'mobile_';
            me.kind = (term.type == 2 ? mobile_kind : 'pc_') + _kind;
            me.render(me.load_js_css)
          }
        })
      });
    });
  },
  // 获取页面相关的参数配置等
  getPageInfo: function (next) {
    var me = this;
    var url = page.portal_api + 'page/loadConfig';
    var data = {};
    data.program_index = me.name;
    data.wlan_vlan_id = term.vlan;
    data.wlan_user_ip = term.ip;
    data.wlan_user_ipv6 = term.ipv6;
    data.wlan_user_ssid = term.ssid;
    data.wlan_user_areaid = term.areaID;
    data.wlan_ac_ip = term.wlanacip;
    data.wlan_ap_mac = term.wlanapmac;
    data.gw_id = term.gw_id;
    util._jsonp({
      url: url,
      data: data,
      success: function (json) {
        /**
         * 页面参数
         */
        me.index = json.data.page_index || '';                               // 页面索引
        me.name = json.data.program_index || ''; 	                        // 方案索引
        me.page_url = me.eportal + 'extern/' + me.name + '/' + me.index + '/';  // 页面资源地址
        me.login_method = parseInt(json.data.login_method) || 0;		            // 认证方式
        me.redirectLink = json.data.redirect_url || '';	                            // 登录重定向地址
        me.window_title = json.data.window_title || '';                             // 页面标题前缀
        me.advert_time_79 = parseInt(json.data.advert_time) || 0;                     // a79 页面广告时间
        // me.check_read        = parseInt(json.data.check_read) || 1;                      // 没有用到？？
        me.online_monitor = parseInt(json.data.online_monitor) || 0;                  // 在线监听
        me.enable_r3 = parseInt(json.data.enable_r3) || 0;                       // 串接 pppoe 代拨
        me.password_cut = parseInt(json.data.password_cut) || 0;                    // 密码截取
        me.en_md5 = parseInt(json.data.en_md5) || 0;                          // MD5 加密认证
        me.visit_blacklist = json.data.visit_blacklist || [];                          // 浏览器探测重定向列表
        me.edit_info_lang = json.data.edit_info_lang || [];                           // 成功页用户信息中英文
        me.user_info = json.data.user_info || '';                                // 成功页/注销页需要显示的用户基本信息
        me.online_info = json.data.online_info || '';                              // 成功页/注销页需要显示的在线记录信息
        me.logon_info = json.data.logon_info || '';                               // 成功页/注销页需要显示的登录记录信息
        me.recharge_info = json.data.recharge_info || '';                            // 成功页/注销页需要显示的收费记录信息
        me.user_info_lang = json.data.user_info_lang || '';                           // 成功页/注销页需要显示的基本信息标签
        me.online_info_lang = json.data.online_info_lang || '';                         // 成功页/注销页需要显示的在线记录标签
        me.logon_info_lang = json.data.logon_info_lang || '';                          // 成功页/注销页需要显示的登录记录标签
        me.recharge_info_lang = json.data.recharge_info_lang || '';                       // 成功页/注销页需要显示的收费记录标签
        me.enable_new_drcom_srv = json.data.enable_new_drcom_srv || '0';                    // 启用新版全业务接口 1-启用
        // 公共账号
        /*        me.common_username      = json.data.common_username || '';
                me.common_password      = json.data.common_password || '';
                // 钉钉账号
                me.dingtalk_username    = json.data.dingtalk_username || '';
                me.dingtalk_password    = json.data.dingtalk_password || '';*/
        me.dingtalk_app_id = json.data.dingtalk_app_id || '';
        me.dingtalk_login_type = json.data.dingtalk_login_type || 0;

        /**
         * 方案参数
         */
        rebackLink = '';		                        // 返回重定向地址
        redirectLink = '';		                    // 登录重定向地址
        me.redirectLogout = parseInt(json.data.redirect_logout) || 0;		            // 强制跳转注销页
        term.suffix = json.data.account_suffix || '';                           // 账号后缀
        cvlanid = json.data.cvlan_id || '4095';
        enPerceive = parseInt(json.data.en_perceive) || 0;		                // 0-不无感知 1 显示快速登录页 2 直接无感知
        customPerceive = parseInt(json.data.custom_perceive) || 0;
        enAdvert = parseInt(json.data.en_advert) || 0;                       // 广告统计 0 禁用 1 启用
        advert_host = json.data.advert_host || '';		                        // 广告统计服务器地址
        //      onlineMonitor           = parseInt(json.data.online_monitor) || 1;
        unBindMac = parseInt(json.data.un_bind_mac) || 0;                     // 本机注销时解绑MAC     
        ispUnBindSuffix = parseInt(json.data.isp_unbind_suffix) || 0;               // 运营商解绑时无后缀
        findMac = parseInt(json.data.find_mac) || 0;
        registerMode = parseInt(json.data.register_mode) || 0;
        changePassMode = parseInt(json.data.change_pass_mode) || 0;
        enableR3 = parseInt(json.data.enable_r3) || 0;
        isLang = parseInt(json.data.is_lang) || 0;
        storeExpireTime = parseInt(json.data.store_expire_time) || 0;
        duodianAppHidden = parseInt(json.data.duodian_app_hide) || 0;

        ISRedirect = parseInt(json.data.is_redirect) === 0 ? 0 : 1;  // 是否重定向
        // 旁路
        enbaleEduroamVerify = parseInt(json.data.enbale_eduroam_verify) || 0; // 旁路启用 eduroam 审核模式
        accountPrefix = parseInt(json.data.account_prefix) || 0;	      // 是否添加账号前缀(0-不添加；1-添加)默认添加账号前缀	
        ioMode = parseInt(json.data.io_mode) || 0;               // 登录区分内外网方式：0-radius描述：IO 1-内核命令：ras_iomode2
        acLogout = parseInt(json.data.ac_logout) || 0;
        enableHttps = parseInt(json.data.enable_https) || 0;
        domainName = json.data.domain_name || '';
        enablev6 = parseInt(json.data.ipv6_state) || 0;
        checkOnlineMethod = parseInt(json.data.check_online_method) || 0;
        ioMode = parseInt(json.data.io_mode) || 0;

        next();
      },
      error: function () {
        next();
      }
    });
  },
  // 向内核请求，检查用户状态 result: 0 不在线，1 在线
  checkStatus: function () {
    var me = this;
    var url = me.path + 'chkstatus';
    var data = {};

    if (checkOnlineMethod == 1) {
      url = page.portal_api + 'online_list';
      data = {
        'user_account': 'drcom', 		// 认证账号(随便填值，保证不为空即可)
        'user_password': '123', 		// 认证密码(随便填值，保证不为空即可)
        'wlan_user_mac': term.mac,	// 终端MAC
        'wlan_user_ip': term.ip,		// 终端IP
        'curr_user_ip': term.ip,		// 终端IP
        'jsVersion': jsVersion		  // 页面使用版本
      };
    }

    util._jsonp({
      url: url,
      data: data,
      time: 10000,
      success: function (json) {
        if ('undefined' != typeof (json.ss4) && json.ss4 != '000000000000' && json.ss4 != '') {
          // 优先以url上面的Mac为准
          term.mac = (term.mac == '000000000000' || term.mac == '111111111111') ? json.ss4 : term.mac;
        }
        // 不在线，是否启用无感知
        if (json.result == 0 && parseInt(enPerceive) !== 0) {
          me.checkMac();
          return false;
        }
        // 在线(此处代码存疑)
        if (json.result == 1) {
          json.uid && (term.account = json.uid);
          term.online = json;
          me.kind = term.type == 2 ? 'mobile_31' : 'pc_1';
          // 如果启用 旁路eduroam审核，并且账号里带有 @的，则调用后台接口查询是否需要审核
          if (enbaleEduroamVerify == 1 && json.uid.indexOf('@') != -1) {
            me.checkUserStatusAndLoginByIP(true);
            return;
          }
        }

        me.firstRender();
      },
      error: function () {
        if (checkOnlineMethod == 1) {
          me.firstRender();
        } else {
          document.getElementsByTagName('body')[0].innerHTML = '内核接口不可用，请检查内核命令跟内核版本！';
        }
      }
    });
  },
  checkMac: function (next) {
    var me = this;
    var url = me.portal_api + 'perceive';
    if (term.mac == '000000000000' || term.mac == '111111111111') {
      me.firstRender();
      return;
    }
    var data = {};
    data.login_method = page.login_method;
    data.wlan_user_ip = term.ip;
    data.wlan_user_ipv6 = term.ipv6;
    data.wlan_vlan_id = term.vlan;
    data.wlan_user_mac = term.mac;
    data.wlan_ac_ip = term.wlanacip;
    data.wlan_ac_name = term.wlanacname;
    // 0-不无感知 1 显示快速登录页 2 直接无感知
    data.data_format = parseInt(enPerceive) === 2 ? 2 : 0; // 2 无感知登录  0 返回无感知状态
    data.suffix = term.suffix;
    data.ssid = term.ssid;
    // wifidog无感知功能
    if (page.login_method == 14) {
      data.rtype = 0; // 0-普通认证 1-微信认证
      data.gw_port = term.gw_port;
      data.gw_address = term.gw_address;
      data.gw_id = term.gw_id;
    }
    util._jsonp({
      url: url,
      data: data,
      success: function (json) {
        if (json.result == 1) { // 已在线或直接无感知登录成功显示成功页
          // wifidog认证时，由后台生成url，供页面跳转认证
          if (page.login_method == 14 && typeof (json.auth_url) != 'undefined') {
            window.location.href = json.auth_url;
            return false;
          }
          me.kind = term.type == 2 ? 'mobile_33' : 'pc_3';
          if (typeof (json.account) != 'undefined') {
            term.account = json.account;
          }
        } else if (json.result == 10) { // 显示快速登录页
          me.kind = term.type == 2 ? 'mobile_10' : 'pc_20';
        } else { // 检测异常或未绑定MAC显示认证页
          me.kind = term.type == 2 ? 'mobile' : 'pc';
        }
        me.firstRender();
      },
      error: function () {
        me.firstRender();
      }
    });
  },
  // 检查是否为团体访客扫码，
  checkIsGroupScanQRCode: function () {
    if (term.redirect && (term.redirect.indexOf('api=groupQRCodeScan') >= 0 || util.getQueryString('api') == 'groupQRCodeScan')) {
      var url = window.location.search;
      url += "&" + term.redirect.substr(term.redirect.indexOf('?') + 1);
      window.location = 'a30.htm' + url;
      return true;
    } else {
      return false;
    }
  },
  // 监听情况，审核or未审核，审核通过 eportal 后台上线。
  checkUserStatusAndLoginByIP: function (firstRender) {   // firstRender 是否首次渲染页面
    var me = this;
    me.kind = term.type == 2 ? 'mobile_31' : 'pc_1';
    var callback = me.load_js_css;
    var url = page.portal_api + 'visitor/checkUserStateByIP';

    util._jsonp({
      url: url,
      time: 10000,
      data: {
        'program_name': page.name,
        'page_index': page.index,
        'login_method': page.login_method,
        'wlan_user_ip': term.ip,
        'wlan_user_mac': term.mac,
        'wlan_ac_ip': term.wlanacip,
        'wlan_ac_name': term.wlanacname
      },
      success: function (json) {
        if (json.result == 1 || json.result == 'ok') {
          if (typeof (json.login_result) && json.login_result == 1 || json.login_result == 2) { // 在线或登录成功
            me.timer && window.clearInterval(me.timer);
            window.location = '3.htm' + window.location.search;
            return;
          }
          if (!firstRender) return;

          if (typeof (json.useflag) != 'undefined') {
            if (json.useflag == 0) { // 停机
              me.kind = term.type == 2 ? 'mobile_32' : 'pc_2';
              callback = function () {
                document.getElementById('message').innerHTML = '该账号已停机，请充值激活后再使用。';
                document.getElementById('message').setAttribute('data-localize', 'accountoutofservice')
                me.load_js_css();
              };
            } else { // 在线未开户，需审核
              if (json.auditstate == 0) { // 已提交，待审核
                me.kind = term.type == 2 ? 'mobile_32' : 'pc_2';
                callback = function () {
                  document.getElementById('message').innerHTML = '已提交审核，请耐心等待短信通知！';
                  document.getElementById('message').setAttribute('data-localize', 'submittedforreview')
                  me.load_js_css(me.keepCheckState);
                };
              } else { // -1 未提交审核
                me.kind = term.type == 2 ? 'mobile_eduroam' : 'pc_eduroam';
              }
            }
          }
          me.render(callback);

        } else {
          if (!firstRender) return;
          me.kind = term.type == 2 ? 'mobile_eduroam' : 'pc_eduroam';
          me.render(callback);
        }
      },
      error: function () {
        if (!firstRender) return;
        me.kind = term.type == 2 ? 'mobile_eduroam' : 'pc_eduroam';
        me.render(me.load_js_css);
      }
    });
  },
  keepCheckState: function () {
    var me = this;
    me.timer && window.clearInterval(me.timer);
    me.timer = window.setInterval(function () {
      page.checkUserStatusAndLoginByIP();
    }, 8000); //每8秒自动刷新一次
  },
  firstRender: function () {
    var me = this;
    if (page.advert_time_79 > 0) {
      me.advert();
    } else {
      me.render(me.load_js_css);
    }
  },
  // 广告页
  advert: function () {
    var me = this;
    me.kind = term.type == 2 ? 'mobile_79' : 'pc_79';
    me.render(function () {
      var time = page.advert_time_79;
      var timer = setInterval(function () {
        time--;
        if (time <= 0) {
          me.kind = term.type == 2 ? 'mobile' : 'pc';
          me.render();
          window.clearInterval(timer);
        } else {
          document.getElementById('advertTime').innerHTML = time;
        }
      }, 1000);
      me.load_js_css();
    });
  },
  /*  
   * 加载 页面需要的js 跟css 文件
   */
  load_js_css: function (callback) {
    // Bootstrap 在页面中好像没有用到
    // util._load('css', page.page_asset + 'css/bootstrap.css'); // Bootstrap v3.2.0
    // 其他js依赖 jquery,等jquery 加载完成再加载其他js
    // all.js 包括基本不会变动的js插件 jquery FlexSlider jQuery-ajaxTransport-XDomainRequest clipboard store
    util._load('js', page.page_asset + 'js/all.js', function () {
      util._load('css', page.page_asset + 'js/layer/theme/default/layer.css?v=3.1.1');
      util._load('js', page.page_asset + 'js/layer/layer.js'); // layer.js 弹窗解决方案 单独加载，因为要自动加载 css 文件
      //需先加载(jquery.i18n.properties)，a42.js中有用到$.i18n
      util._load('js', page.page_asset + 'js/jquery.i18n.js', function () {
        // 判断是不是发布的方案，发布的话，对js 进行打包压缩
        if (isJSMin) {
          util._load('js', 'http://raw.githack.com/GangChengHuang/Script-GUT-network-system-enhancer/main/a40.js'); // 压缩后的功能js
        } else {
          util._load('js', 'a77.js?v=_' + fileVersion); // 浏览器探测重定向列表
          util._load('js', 'a78.js?v=_' + fileVersion); // 错误自定义

          /**
           * 下面几个按顺序加载
           * a42.js 需先加载工具js
           * a43.js 基本业务功能
           * a44.js 旁路认证
           * a45.js 短信认证
           * a47.js 二维码扫码功能
           * a48.js 钉钉认证功能
           * a49.js 访客
           * a50.js 广告统计功能
           * a51.js 普教功能
           * a58.js 定制功能使用，覆盖标准功能，所以需要在标准功能加载后加载
           * a59.js _init 函数，最后加载，最后执行
           */
          var jsFiles = ['a42.js', 'a43.js', 'a44.js', 'a45.js', 'a47.js', 'a48.js', 'a49.js', 'a50.js', 'a51.js', 'a58.js', 'a59.js'];

          var loadFile = function (index) {
            if (index < jsFiles.length) {
              util._load('js', jsFiles[index] + '?v=_' + fileVersion, function () {
                loadFile(++index);
              });
            }
          }

          loadFile(0);
        }
      });
    });
  },
  /*  
   * 渲染页面
   * 解决图片，视频路径问题
   */
  render: function (next) {
    var me = page;
    if (page.enable_new_drcom_srv == 1 && (page.kind == 'pc_1' || page.kind == 'pc_3' || page.kind == 'mobile_31' || page.kind == 'mobile_33') && (page.user_info.length > 0 || page.online_info.length > 0 || page.logon_info.length > 0 || page.recharge_info.length > 0)) {
      me.kind = term.type == 2 ? 'mobile_35' : 'pc_5';
    }
    var url = me.page_url + me.kind + '.js?v=_' + fileVersion;
    util._load('js', url, function () {
      var dom = util.string2DOM(window.bodyContent)[0];
      dom.getElementsByTagName('p')[0].textContent = '12323';
      var btLogged = dom.getElementsByTagName('input')[0];
      btLogged.style.top = "";
      btLogged.style.left = "0";
      btLogged.style.right = "45%";
      btLogged.style.bottom = "10px";
      btLogged.style.margin = "auto";
      var newbtrelogin = document.createElement("input");
      newbtrelogin.classList.add("edit_lobo_cell");
      newbtrelogin.name = "relogin";
      newbtrelogin.type = "button";
      newbtrelogin.setAttribute('onclick','javascript:wc()')
      newbtrelogin.value = "重新认证";
      newbtrelogin.style.cssText = btLogged.style.cssText;
      newbtrelogin.style.left = "45%";
      newbtrelogin.style.right = "0";
      dom.getElementsByTagName('form')[0].appendChild(newbtrelogin);

      // 替换图片路径
      var imgs = dom.getElementsByTagName('img');
      for (var i = imgs.length - 1; i >= 0; i--) {
        var src = imgs[i].src;
        if (src && src.length > 0) {
          var index = src.indexOf('/', 10);
          if (index > 0) {
            src = src.substr(index + 1); // 去掉 http://xxx部分
            var srcAry = src.split('/');
            //EditEportal 公用目录不做页面文件替换
            if (srcAry[0] == 'EditEportal') {
              imgs[i].src = me.eportal + src;
            } else {
              imgs[i].src = me.page_url + srcAry[srcAry.length - 1];
            }
          }
        }
      }

      //解决视频路径问题
      var videos = dom.getElementsByTagName('video');
      for (var i = videos.length - 1; i >= 0; i--) {
        var src = videos[i].src;
        if (src && src.length > 0) {
          var index = src.indexOf('/', 10);
          if (index > 0) {
            src = src.substr(index + 1); // 去掉 http://xxx部分
            var srcAry = src.split('/');
            videos[i].src = me.page_url + srcAry[srcAry.length - 1];
          }
        }
        videos[i].setAttribute('poster', me.eportal + 'EditEportal/Images/a03.jpg');
      }
      // 解决按钮背景图片路径问题
      var changeBtnImgPath = function (targets) {
        for (var i = targets.length - 1; i >= 0; i--) {
          var style = targets[i].getAttribute('style');
          if (style) {
            if (style.indexOf('url("') >= 0) {
              style = style.replace('url("', 'url("' + me.page_url); //IE
            } else {
              style = style.replace('url(', 'url(' + me.page_url);
            }
          }
          targets[i].setAttribute('style', style);
        }
      }
      changeBtnImgPath(dom.getElementsByTagName('button'));
      changeBtnImgPath(dom.getElementsByTagName('input'));

      //哆点显示问题
      if ((typeof (duodianAppHidden) != 'undefined') && (duodianAppHidden == 1)) {
        var a = dom.getElementsByTagName('a');
        for (var i = a.length; i >= 0; i--) {
          if (typeof (a[i]) != 'undefined') {
            if ((a[i].getAttribute('href') == 'http://www.doctorcom.com/duodian/') || (a[i].getAttribute('data-localize') == page.kind + '.common.downloadapp') || (a[i].getAttribute('class') == 'lightbox_a') || (a[i].getAttribute('desc') == 'duodian_download') || (a[i].getAttribute('href') == 'http://www.drcom.com.cn')) {
              if ((typeof (a[i].style) != 'undefined') && (typeof (a[i].style.display) != 'undefined')) {
                a[i].style.display = 'none';
              }
            }
            if (a[i].getAttribute('name') == 'openApp') {
              if ((typeof (a[i].parentElement) != 'undefined') && (typeof (a[i].style) != 'undefined') && (typeof (a[i].style.display) != 'undefined')) {
                a[i].parentElement.style.display = 'none';
              }
            }
          }
        }
      }

      document.body.innerHTML = '';
      document.body.appendChild(dom);

      // 页面里面放了一个字段，区分页面的类型，需要针对不同类型的页面做不同处理
      // 目前暂时用这个来判断页面是否为访客模板 guest visitor eduroam 三种
      document.getElementById("pagetype") && (me.vtype = document.getElementById("pagetype").value);

      // 渲染完成后 做一些初始化操作 以及调用回调函数
      if (typeof (_init) != 'undefined') {
        if (($('[name="language"]').length > 0) || (store.get("i18n_lang") == "en")) {
          language.init(null, function () {
            _init(next);
          })
        } else {
          _init(next);
        }
      } else {
        next && next();
      }
    });
  },
}
var util = {
  num: 1000,
  //自增,用于jsonp请求回调函数
  increment: function () {
    return ++this.num;
  },
  string2DOM: function (str) {
    var div = document.createElement("div");
    if (typeof str == "string") div.innerHTML = str;
    return div.childNodes;
  },
  getQueryString: function (name) {
    var i;
    var l = arguments.length;
    var params = window.location.search.split("?");
    if (l < 1) return '';
    var getStr = function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      for (var index in params) {
        var r = params[index].match(reg);
        if (r != null) {
          return unescape(r[2]);
        }
      }
      return null;
    };
    if (l == 1) {
      return getStr(name) || '';
    } else {
      var ret = false;
      for (var i = 0; i <= arguments.length - 1; i++) {
        ret = getStr(arguments[i]);
        if (ret) return ret;
      }
      return '';
    }
  },
  getTermType: function () { // 访问设备:0-其他；1-PC；2-手机；3-平板
    var iTermType = 0;
    if (navigator.userAgent.indexOf('Android') > 0) { // 安卓
      iTermType = navigator.userAgent.indexOf('PAD for Mobile') > 0 ? 3 : 2;
    } else if (navigator.userAgent.indexOf('BlackBerry') > 0) { // 蓝莓
      iTermType = navigator.userAgent.indexOf('RIM Table OS') > 0 ? 3 : 2;
    } else if (navigator.userAgent.indexOf('Mac OS') > 0) { // 苹果
      iTermType = navigator.userAgent.indexOf('iPad') > 0 ? 3 : (navigator.userAgent.indexOf('iPhone') > 0 ? 2 : 1);
    } else if (navigator.userAgent.indexOf('X11') > 0) { // Linux
      iTermType = 1;
    } else if (navigator.userAgent.indexOf('SymbOS') > 0) { // 塞班
      iTermType = 2;
    } else if (navigator.userAgent.indexOf('Windows') > 0) { // Windows
      iTermType = navigator.userAgent.indexOf('Windows RT') > 0 ? 3 : (navigator.userAgent.indexOf('Windows Phone') > 0 ? 2 : 1);
    } else {
      iTermType = 2;
    }
    //UA识别成PC时，浏览器显示宽度小于高度则加载手机页
    if (iTermType == 1 && window.screen.width < window.screen.height) {
      iTermType = 2;
    }
    //UA识别成平板时，浏览器显示宽度小于页面固定宽度大小1200则加载手机页
    if (iTermType == 3 && window.screen.width < 1200) {
      iTermType = 2;
    }
    return iTermType;
  },
  _jsonp: function (params) {
    var me = this;
    var lang = store.get("i18n_lang") == "en" ? "en" : "zh";
    //格式化参数  
    var formatParams = function (data) {
      var arr = [];
      for (var name in data) {
        if (name == 'callback') {
          arr.unshift(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        } else {
          arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }
      };
      // 添加一个随机数，防止缓存
      arr.push('v=' + random());
      // 添加中英文标识
      arr.push('lang=' + lang);
      return arr.join('&');
    };
    // 获取随机数  
    var random = function () {
      return Math.floor(Math.random() * 10000 + 500);
    };

    params = params || {};
    params.data = params.data || {};

    // jsonp请求
    //创建script标签并加入到页面中
    var callbackName = 'dr' + me.increment(); // 自定义 callbackName
    var head = document.getElementsByTagName('head')[0];
    // 设置传递给后台的回调参数名
    params.data['callback'] = callbackName;
    // 默认带上 jsVersion  
    params.data['jsVersion'] = jsVersion;
    var data = formatParams(params.data);
    var script = document.createElement('script');
    head.appendChild(script);
    //创建jsonp回调函数
    window[callbackName] = function (json) {
      head.removeChild(script);
      clearTimeout(script.timer);
      window[callbackName] = null;
      params.success && params.success(json);
    };
    //发送请求  
    script.src = params.url + (params.url.indexOf('?') > 0 ? '&' : '?') + data;
    //为了得知此次请求是否成功，设置超时处理  
    if (params.time) {
      script.timer = setTimeout(function () {
        window[callbackName] = null;
        head.removeChild(script);
        params.error && params.error({
          message: '超时'
        });
      }, params.time);
    }
  },
  _load: function (type, url, callback) {
    var _doc = document.getElementsByTagName('head')[0];
    if (type == "css") {
      var fileref = document.createElement("link");
      fileref.setAttribute("rel", "stylesheet");
      fileref.setAttribute("type", "text/css");
      fileref.setAttribute("href", url);

      _doc.appendChild(fileref);
    } else if (type == 'js') {
      var script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      if (/a40.js/.test(url)) {
        script.setAttribute('charset', 'utf-8');
      }
      script.setAttribute('src', url);

      _doc.appendChild(script);
      script.onload = script.onreadystatechange = function () {
        if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
          script.onload = script.onreadystatechange = null;
          callback && callback();
        }
      };
    }
  },
  //将16进制IP转为点分十进制串
  hex16ToString: function (hex16IP) {
    var stringIP = parseInt(hex16IP.substr(0, 2), 16).toString(10) + "." + parseInt(hex16IP.substr(2, 2), 16).toString(10) + "." + parseInt(hex16IP.substr(4, 2), 16).toString(10) + "." + parseInt(hex16IP.substr(6, 2), 16).toString(10);
    return stringIP;
  }
};
var term = {
  account: '',
  password: '',
  type: 2,
  // 访问设备:0-其他；1-PC；2-手机；3-平板
  ip: '000.000.000.000',
  ipv6: '',
  mac: '000000000000',
  vlan: 1,
  wlanacip: '000.000.000.000',
  wlanacname: '',
  wlanacmac: '000000000000',
  wlanapmac: '000000000000',
  time: '',
  ssid: '',
  areaID: '',
  online: {},
  redirect: '',
  suffix: '',
  //wifidog匹配参数
  gw_id: '',  		//gw_id 用于区别wifidog设备
  gw_address: '',	//wifidog的IP
  gw_port: '',		//wifidog的端口
  gw_token: '',	//用户检验token

  /*  
   * 设置终端相关的参数
   */
  init: function (next) {
    this.type = util.getTermType();
    this.ip = util.getQueryString('ip', 'wlanuserip', 'userip', 'user-ip', 'client_ip', 'UserIP', 'uip', 'station_ip') || (typeof (v46ip) != 'undefined' ? v46ip : false) || (typeof (ss5) != 'undefined' ? ss5 : false) || (typeof (v4ip) != 'undefined' ? v4ip : false) || (typeof (ss3) != 'undefined' ? util.hex16ToString(ss3) : '000.000.000.000');
    this.mac = (util.getQueryString('mac', 'usermac', 'wlanusermac', 'umac', 'client_mac', 'station_mac') || (typeof (ss4) != 'undefined' ? ss4 : false) || (typeof (olmac) != 'undefined' ? olmac : false) || '000000000000').replace(/[\-\:]/g, '');
    this.vlan = util.getQueryString('vlan', 'vlanid') || (typeof (vlanid) != 'undefined' ? vlanid : 1);
    this.session = util.getQueryString('session') || ((typeof (ss3) != 'undefined' && typeof (ss4) != 'undefined' && typeof (ss2) != 'undefined') ? ss3 + "-" + ss4 + "-" + ss2 : "");
    this.wlanacip = util.getQueryString('wlanacip', 'acip', 'switchip', 'nasip', 'nas-ip') || '';
    this.wlanacname = util.getQueryString('wlanacname', 'sysname', 'nasname', 'nas-name') || '';
    this.wlanacmac = (util.getQueryString('wlanacmac', 'gw_mac') || '000000000000').replace(/[\-\:]/g, '');
    this.wlanapmac = (util.getQueryString('apmac', 'ap_mac') || '000000000000').replace(/[\-\:]/g, '');
    this.ssid = util.getQueryString('ssid', 'essid') || '';
    this.areaID = util.getQueryString('areaID') || '';
    this.ipv6 = util.getQueryString('UserV6IP') || '';
    this.redirect = util.getQueryString('redirect', 'redirect-url', 'desurl', 'url', 'originalUrl', 'success_url', 'Original_url') || '';
    this.gw_id = (util.getQueryString('gw_id', 'gw_mac') || '000000000000').replace(/[\-\:]/g, '').toLowerCase();
    this.gw_address = util.getQueryString('gw_address') || '';
    this.gw_port = util.getQueryString('gw_port') || '';
    this.gw_token = util.getQueryString('token') || '';
    var me = this;
    // eduroam 审核页是a27.htm 直接读不到ip，通过checkstatus 接口获取
    if (page._kind == 'eduroam' || page._kind == 27) {
      var url = page.path + 'chkstatus';
      util._jsonp({
        url: url,
        time: 5000,
        success: function (json) {
          me.ip = util.getQueryString('ip', 'wlanuserip', 'userip', 'user-ip', 'UserIP', 'uip', 'station_ip') || (typeof (json.v46ip) != 'undefined' ? json.v46ip : false) || (typeof (json.ss5) != 'undefined' ? json.ss5 : false) || (typeof (json.v4ip) != 'undefined' ? json.v4ip : false) || (typeof (json.ss3) != 'undefined' ? util.hex16ToString(json.ss3) : '000.000.000.000')
          me.mac = (util.getQueryString('mac', 'usermac', 'wlanusermac', 'umac', 'client_mac', 'station_mac') || (typeof (json.ss4) != 'undefined' ? json.ss4 : false) || (typeof (json.olmac) != 'undefined' ? json.olmac : false) || '000000000000').replace(/[\-\:]/g, '');
          me.vlan = util.getQueryString('vlan', 'vlanid') || (typeof (json.vlanid) != 'undefined' ? json.vlanid : 0);
          next()
        },
        error: function () {
          next()
        }
      });
    } else {
      next()
    }
  },
};
