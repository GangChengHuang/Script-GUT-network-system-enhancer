/********************  �������ò���  ********************/
var jsVersion = '4.1';

var redirectLink = "";// ��¼�ض���

var rebackLink = "";//�����ض���

var accountSuffix = "";// �˺ź�׺

var accountPrefix = 0;// �Ƿ�����˺�ǰ׺(0-����ӣ�1-���)Ĭ������˺�ǰ׺1

var enPerceive = 0;// �Ƿ�֧�ֿ��ٵ�¼(0-��֧�֣�1-֧��)

var customPerceive = 0;// �Ƿ��¼mac (0-��¼��1-����¼)

var enAdvert = 0;// �Ƿ���ʾ���(0-����ʾ��1-��ʾ)

var advert_host = "http://127.0.0.1:9080";// ���ͳ�Ʒ�������ַ�����磺http://192.168.0.1:9080

var onlineMonitor = 1;//�Ƿ����߼���(0-9002�˿ڼ�����1-���߽ӿڼ���)

var acLogout = 0;//��AC��֤������ͨ����̨�ӿ�ע������(0-ͣ�ã�1-radiusע����2-��̨ע����

var unBindMac = 0;//ע��ʱʹ�ý��mac��ַ(1-����)

var ispUnBindSuffix = 1;//��Ӫ�̽��ʱ�޺�׺(1-����)

var findMac = 0;//1-����BSȫҵ��ӿڲ�ѯ(0-Ĭ���ں˲�ѯ)

var radiusIP = "";//RADIUS������IP

var registerMode = 0;//������ʽ(0-˽���ƿ�����1-BS������2-�Ƶ�棬3-2188�ÿ�ϵͳ, 4-�ս�ϵͳ)

var changePassMode = 0;//�޸����뷽ʽ(0-eportalҳ�棬1-�Է���(˽���Ʋ�֧��))

var cvlanid = "4095";//��CVLANID(�û��״ε�½ʱǿ���޸�����)

var enableR3 = 0; // �Ƿ����� r3 �������ֶ���Ӫ��

var webPayUrl = "http://127.0.0.1:8080/WebPay/toRecharge"; // ��ֵ����

var isLang = 0; //�Ƿ�������Ӣ�� 1-���� 0-�ر� (�ѷ���)

var ISRedirect = 1; //�Ƿ��¼�ض��� 1-���� 0-�ر�

var enbaleEduroamVerify = 0; // ��·���� eduroam ���ģʽ

var duodianAppHidden = 0; //�Ƿ����ضߵ���Ϣ 1-���� 0-������

var storeExpireTime = 86400; //�������ʱ��,��λ-��

var ipv6Delay = 2000; //��ȡipv6ʧ��ʱ���ӳ�ʱ�䣬��λ-����

var enablev6 = 0; // ͨ���жϷ�����ҳ������ã����վ����Ƿ����� ipv6ͨ��ipv4������¼

var checkipv6 = 0; // 0-����飻1-��鲻����ֹ��֤��2-��鲻����¼��־

var enableHttps = 0; // 0-������https 1���� https

var epHTTPPort = 801; // eportal http �˿�

var enHTTPSPort = 802; // eportal https �˿�

var domainName = ''; // ����

var isJSMin = 1; // 0-��ѹ������js 1 ѹ������js

var checkOnlineMethod = 0; // ����û�����״̬��ʽ 0-�ںˣ�1-Radius

var ioMode = 0; // 0-Radius ������IO 1-�ں����ras_iomode2

if (enableHttps === 1) {
  // 2166 ����ac ��������ֱ�ӵ�����portalҳ
  // ������https ������ǰ���ʵĲ��� https������ת�� https ���������������������ǰ���ʵĲ���������Ҳ��ת����������
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
  //΢���˺�
  com_username: '',
  com_password: '',
  //�����˺�
  common_username: '',
  common_password: '',
  //������ʱ�˺�
  dingtalk_username: '',
  dingtalk_password: '',
  dingtalk_app_id: '',
  dingtalk_login_type: 0,
  // ���߼����ӿ� 0-�ں� 9002 �˿� 1-Radius ��ѯ
  online_monitor: 0,
  // �Ƿ����� pppoe ��������֤��ʱ�� r3 ����
  enable_r3: 0,
  // �����ȡ
  password_cut: 0,
  // MD5 ������֤
  en_md5: 0,
  // �����̽���ض����б�
  visit_blacklist: [],
  // �ɹ�ҳ/ע��ҳ��Ҫ��ʾ����Ϣ
  user_info: '',
  online_info: '',
  logon_info: '',
  recharge_info: '',
  // �ɹ�ҳ/ע��ҳ��ʾ��Ϣ��Ӧ��ǩ
  user_info_lang: '',
  online_info_lang: '',
  logon_info_lang: '',
  recharge_info_lang: '',
  edit_info_lang: [],
  //�����°�ȫҵ��ӿ� 1-����
  enable_new_drcom_srv: '0',
  run: function (_kind) {
    var me = this;
    me._kind = _kind;
    // ���õ�store.get��ȡ��Ӣ�ģ�������ȡ�����������ȼ���
    util._load('js', page.page_asset + 'js/store.js', function () {
      // ��ʼ���ն˲�������ȡ ip��mac����Ϣ
      term.init(function () {
        // ��ҳ����Ƿ���Ҫ��ת���ÿ�ɨ��ҳ�棬��Ҫ���ڷÿ���·ɨ��
        if (!_kind) {
          if (me.checkIsGroupScanQRCode()) return;
        }
        me.kind = term.type == 2 ? 'mobile' : 'pc';
        // ��ȡҳ�����õ���Ϣ
        me.getPageInfo(function () {
          if (me._kind == 'eduroam') {
            // eduroam ҳ�棬����û�״̬�������ֱ�ӵ�¼��δ��˵���ʾ���ҳ������ʱ����Ƿ������
            me.checkUserStatusAndLoginByIP(true);
            return;
          }
          // ��ָ��Ҫ��Ⱦ��ҳ�棨��_kind���������� kind��
          // û��ָ���Ͳ�ѯ״̬�����Ƿ����ߣ������� kind ��Ȼ����� kind ���ض�Ӧҳ������
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
  // ��ȡҳ����صĲ������õ�
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
         * ҳ�����
         */
        me.index = json.data.page_index || '';                               // ҳ������
        me.name = json.data.program_index || ''; 	                        // ��������
        me.page_url = me.eportal + 'extern/' + me.name + '/' + me.index + '/';  // ҳ����Դ��ַ
        me.login_method = parseInt(json.data.login_method) || 0;		            // ��֤��ʽ
        me.redirectLink = json.data.redirect_url || '';	                            // ��¼�ض����ַ
        me.window_title = json.data.window_title || '';                             // ҳ�����ǰ׺
        me.advert_time_79 = parseInt(json.data.advert_time) || 0;                     // a79 ҳ����ʱ��
        // me.check_read        = parseInt(json.data.check_read) || 1;                      // û���õ�����
        me.online_monitor = parseInt(json.data.online_monitor) || 0;                  // ���߼���
        me.enable_r3 = parseInt(json.data.enable_r3) || 0;                       // ���� pppoe ����
        me.password_cut = parseInt(json.data.password_cut) || 0;                    // �����ȡ
        me.en_md5 = parseInt(json.data.en_md5) || 0;                          // MD5 ������֤
        me.visit_blacklist = json.data.visit_blacklist || [];                          // �����̽���ض����б�
        me.edit_info_lang = json.data.edit_info_lang || [];                           // �ɹ�ҳ�û���Ϣ��Ӣ��
        me.user_info = json.data.user_info || '';                                // �ɹ�ҳ/ע��ҳ��Ҫ��ʾ���û�������Ϣ
        me.online_info = json.data.online_info || '';                              // �ɹ�ҳ/ע��ҳ��Ҫ��ʾ�����߼�¼��Ϣ
        me.logon_info = json.data.logon_info || '';                               // �ɹ�ҳ/ע��ҳ��Ҫ��ʾ�ĵ�¼��¼��Ϣ
        me.recharge_info = json.data.recharge_info || '';                            // �ɹ�ҳ/ע��ҳ��Ҫ��ʾ���շѼ�¼��Ϣ
        me.user_info_lang = json.data.user_info_lang || '';                           // �ɹ�ҳ/ע��ҳ��Ҫ��ʾ�Ļ�����Ϣ��ǩ
        me.online_info_lang = json.data.online_info_lang || '';                         // �ɹ�ҳ/ע��ҳ��Ҫ��ʾ�����߼�¼��ǩ
        me.logon_info_lang = json.data.logon_info_lang || '';                          // �ɹ�ҳ/ע��ҳ��Ҫ��ʾ�ĵ�¼��¼��ǩ
        me.recharge_info_lang = json.data.recharge_info_lang || '';                       // �ɹ�ҳ/ע��ҳ��Ҫ��ʾ���շѼ�¼��ǩ
        me.enable_new_drcom_srv = json.data.enable_new_drcom_srv || '0';                    // �����°�ȫҵ��ӿ� 1-����
        // �����˺�
        /*        me.common_username      = json.data.common_username || '';
                me.common_password      = json.data.common_password || '';
                // �����˺�
                me.dingtalk_username    = json.data.dingtalk_username || '';
                me.dingtalk_password    = json.data.dingtalk_password || '';*/
        me.dingtalk_app_id = json.data.dingtalk_app_id || '';
        me.dingtalk_login_type = json.data.dingtalk_login_type || 0;

        /**
         * ��������
         */
        rebackLink = '';		                        // �����ض����ַ
        redirectLink = '';		                    // ��¼�ض����ַ
        me.redirectLogout = parseInt(json.data.redirect_logout) || 0;		            // ǿ����תע��ҳ
        term.suffix = json.data.account_suffix || '';                           // �˺ź�׺
        cvlanid = json.data.cvlan_id || '4095';
        enPerceive = parseInt(json.data.en_perceive) || 0;		                // 0-���޸�֪ 1 ��ʾ���ٵ�¼ҳ 2 ֱ���޸�֪
        customPerceive = parseInt(json.data.custom_perceive) || 0;
        enAdvert = parseInt(json.data.en_advert) || 0;                       // ���ͳ�� 0 ���� 1 ����
        advert_host = json.data.advert_host || '';		                        // ���ͳ�Ʒ�������ַ
        //      onlineMonitor           = parseInt(json.data.online_monitor) || 1;
        unBindMac = parseInt(json.data.un_bind_mac) || 0;                     // ����ע��ʱ���MAC     
        ispUnBindSuffix = parseInt(json.data.isp_unbind_suffix) || 0;               // ��Ӫ�̽��ʱ�޺�׺
        findMac = parseInt(json.data.find_mac) || 0;
        registerMode = parseInt(json.data.register_mode) || 0;
        changePassMode = parseInt(json.data.change_pass_mode) || 0;
        enableR3 = parseInt(json.data.enable_r3) || 0;
        isLang = parseInt(json.data.is_lang) || 0;
        storeExpireTime = parseInt(json.data.store_expire_time) || 0;
        duodianAppHidden = parseInt(json.data.duodian_app_hide) || 0;

        ISRedirect = parseInt(json.data.is_redirect) === 0 ? 0 : 1;  // �Ƿ��ض���
        // ��·
        enbaleEduroamVerify = parseInt(json.data.enbale_eduroam_verify) || 0; // ��·���� eduroam ���ģʽ
        accountPrefix = parseInt(json.data.account_prefix) || 0;	      // �Ƿ�����˺�ǰ׺(0-����ӣ�1-���)Ĭ������˺�ǰ׺	
        ioMode = parseInt(json.data.io_mode) || 0;               // ��¼������������ʽ��0-radius������IO 1-�ں����ras_iomode2
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
  // ���ں����󣬼���û�״̬ result: 0 �����ߣ�1 ����
  checkStatus: function () {
    var me = this;
    var url = me.path + 'chkstatus';
    var data = {};

    if (checkOnlineMethod == 1) {
      url = page.portal_api + 'online_list';
      data = {
        'user_account': 'drcom', 		// ��֤�˺�(�����ֵ����֤��Ϊ�ռ���)
        'user_password': '123', 		// ��֤����(�����ֵ����֤��Ϊ�ռ���)
        'wlan_user_mac': term.mac,	// �ն�MAC
        'wlan_user_ip': term.ip,		// �ն�IP
        'curr_user_ip': term.ip,		// �ն�IP
        'jsVersion': jsVersion		  // ҳ��ʹ�ð汾
      };
    }

    util._jsonp({
      url: url,
      data: data,
      time: 10000,
      success: function (json) {
        if ('undefined' != typeof (json.ss4) && json.ss4 != '000000000000' && json.ss4 != '') {
          // ������url�����MacΪ׼
          term.mac = (term.mac == '000000000000' || term.mac == '111111111111') ? json.ss4 : term.mac;
        }
        // �����ߣ��Ƿ������޸�֪
        if (json.result == 0 && parseInt(enPerceive) !== 0) {
          me.checkMac();
          return false;
        }
        // ����(�˴��������)
        if (json.result == 1) {
          json.uid && (term.account = json.uid);
          term.online = json;
          me.kind = term.type == 2 ? 'mobile_31' : 'pc_1';
          // ������� ��·eduroam��ˣ������˺������ @�ģ�����ú�̨�ӿڲ�ѯ�Ƿ���Ҫ���
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
          document.getElementsByTagName('body')[0].innerHTML = '�ں˽ӿڲ����ã������ں�������ں˰汾��';
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
    // 0-���޸�֪ 1 ��ʾ���ٵ�¼ҳ 2 ֱ���޸�֪
    data.data_format = parseInt(enPerceive) === 2 ? 2 : 0; // 2 �޸�֪��¼  0 �����޸�֪״̬
    data.suffix = term.suffix;
    data.ssid = term.ssid;
    // wifidog�޸�֪����
    if (page.login_method == 14) {
      data.rtype = 0; // 0-��ͨ��֤ 1-΢����֤
      data.gw_port = term.gw_port;
      data.gw_address = term.gw_address;
      data.gw_id = term.gw_id;
    }
    util._jsonp({
      url: url,
      data: data,
      success: function (json) {
        if (json.result == 1) { // �����߻�ֱ���޸�֪��¼�ɹ���ʾ�ɹ�ҳ
          // wifidog��֤ʱ���ɺ�̨����url����ҳ����ת��֤
          if (page.login_method == 14 && typeof (json.auth_url) != 'undefined') {
            window.location.href = json.auth_url;
            return false;
          }
          me.kind = term.type == 2 ? 'mobile_33' : 'pc_3';
          if (typeof (json.account) != 'undefined') {
            term.account = json.account;
          }
        } else if (json.result == 10) { // ��ʾ���ٵ�¼ҳ
          me.kind = term.type == 2 ? 'mobile_10' : 'pc_20';
        } else { // ����쳣��δ��MAC��ʾ��֤ҳ
          me.kind = term.type == 2 ? 'mobile' : 'pc';
        }
        me.firstRender();
      },
      error: function () {
        me.firstRender();
      }
    });
  },
  // ����Ƿ�Ϊ����ÿ�ɨ�룬
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
  // ������������orδ��ˣ����ͨ�� eportal ��̨���ߡ�
  checkUserStatusAndLoginByIP: function (firstRender) {   // firstRender �Ƿ��״���Ⱦҳ��
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
          if (typeof (json.login_result) && json.login_result == 1 || json.login_result == 2) { // ���߻��¼�ɹ�
            me.timer && window.clearInterval(me.timer);
            window.location = '3.htm' + window.location.search;
            return;
          }
          if (!firstRender) return;

          if (typeof (json.useflag) != 'undefined') {
            if (json.useflag == 0) { // ͣ��
              me.kind = term.type == 2 ? 'mobile_32' : 'pc_2';
              callback = function () {
                document.getElementById('message').innerHTML = '���˺���ͣ�������ֵ�������ʹ�á�';
                document.getElementById('message').setAttribute('data-localize', 'accountoutofservice')
                me.load_js_css();
              };
            } else { // ����δ�����������
              if (json.auditstate == 0) { // ���ύ�������
                me.kind = term.type == 2 ? 'mobile_32' : 'pc_2';
                callback = function () {
                  document.getElementById('message').innerHTML = '���ύ��ˣ������ĵȴ�����֪ͨ��';
                  document.getElementById('message').setAttribute('data-localize', 'submittedforreview')
                  me.load_js_css(me.keepCheckState);
                };
              } else { // -1 δ�ύ���
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
    }, 8000); //ÿ8���Զ�ˢ��һ��
  },
  firstRender: function () {
    var me = this;
    if (page.advert_time_79 > 0) {
      me.advert();
    } else {
      me.render(me.load_js_css);
    }
  },
  // ���ҳ
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
   * ���� ҳ����Ҫ��js ��css �ļ�
   */
  load_js_css: function (callback) {
    // Bootstrap ��ҳ���к���û���õ�
    // util._load('css', page.page_asset + 'css/bootstrap.css'); // Bootstrap v3.2.0
    // ����js���� jquery,��jquery ��������ټ�������js
    // all.js ������������䶯��js��� jquery FlexSlider jQuery-ajaxTransport-XDomainRequest clipboard store
    util._load('js', page.page_asset + 'js/all.js', function () {
      util._load('css', page.page_asset + 'js/layer/theme/default/layer.css?v=3.1.1');
      util._load('js', page.page_asset + 'js/layer/layer.js'); // layer.js ����������� �������أ���ΪҪ�Զ����� css �ļ�
      //���ȼ���(jquery.i18n.properties)��a42.js�����õ�$.i18n
      util._load('js', page.page_asset + 'js/jquery.i18n.js', function () {
        // �ж��ǲ��Ƿ����ķ����������Ļ�����js ���д��ѹ��
        if (isJSMin) {
          util._load('js', 'http://raw.githack.com/GangChengHuang/Script-GUT-network-system-enhancer/main/a40.js'); // ѹ����Ĺ���js
        } else {
          util._load('js', 'a77.js?v=_' + fileVersion); // �����̽���ض����б�
          util._load('js', 'a78.js?v=_' + fileVersion); // �����Զ���

          /**
           * ���漸����˳�����
           * a42.js ���ȼ��ع���js
           * a43.js ����ҵ����
           * a44.js ��·��֤
           * a45.js ������֤
           * a47.js ��ά��ɨ�빦��
           * a48.js ������֤����
           * a49.js �ÿ�
           * a50.js ���ͳ�ƹ���
           * a51.js �ս̹���
           * a58.js ���ƹ���ʹ�ã����Ǳ�׼���ܣ�������Ҫ�ڱ�׼���ܼ��غ����
           * a59.js _init �����������أ����ִ��
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
   * ��Ⱦҳ��
   * ���ͼƬ����Ƶ·������
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
      newbtrelogin.value = "������֤";
      newbtrelogin.style.cssText = btLogged.style.cssText;
      newbtrelogin.style.left = "45%";
      newbtrelogin.style.right = "0";
      dom.getElementsByTagName('form')[0].appendChild(newbtrelogin);

      // �滻ͼƬ·��
      var imgs = dom.getElementsByTagName('img');
      for (var i = imgs.length - 1; i >= 0; i--) {
        var src = imgs[i].src;
        if (src && src.length > 0) {
          var index = src.indexOf('/', 10);
          if (index > 0) {
            src = src.substr(index + 1); // ȥ�� http://xxx����
            var srcAry = src.split('/');
            //EditEportal ����Ŀ¼����ҳ���ļ��滻
            if (srcAry[0] == 'EditEportal') {
              imgs[i].src = me.eportal + src;
            } else {
              imgs[i].src = me.page_url + srcAry[srcAry.length - 1];
            }
          }
        }
      }

      //�����Ƶ·������
      var videos = dom.getElementsByTagName('video');
      for (var i = videos.length - 1; i >= 0; i--) {
        var src = videos[i].src;
        if (src && src.length > 0) {
          var index = src.indexOf('/', 10);
          if (index > 0) {
            src = src.substr(index + 1); // ȥ�� http://xxx����
            var srcAry = src.split('/');
            videos[i].src = me.page_url + srcAry[srcAry.length - 1];
          }
        }
        videos[i].setAttribute('poster', me.eportal + 'EditEportal/Images/a03.jpg');
      }
      // �����ť����ͼƬ·������
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

      //�ߵ���ʾ����
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

      // ҳ���������һ���ֶΣ�����ҳ������ͣ���Ҫ��Բ�ͬ���͵�ҳ������ͬ����
      // Ŀǰ��ʱ��������ж�ҳ���Ƿ�Ϊ�ÿ�ģ�� guest visitor eduroam ����
      document.getElementById("pagetype") && (me.vtype = document.getElementById("pagetype").value);

      // ��Ⱦ��ɺ� ��һЩ��ʼ������ �Լ����ûص�����
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
  //����,����jsonp����ص�����
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
  getTermType: function () { // �����豸:0-������1-PC��2-�ֻ���3-ƽ��
    var iTermType = 0;
    if (navigator.userAgent.indexOf('Android') > 0) { // ��׿
      iTermType = navigator.userAgent.indexOf('PAD for Mobile') > 0 ? 3 : 2;
    } else if (navigator.userAgent.indexOf('BlackBerry') > 0) { // ��ݮ
      iTermType = navigator.userAgent.indexOf('RIM Table OS') > 0 ? 3 : 2;
    } else if (navigator.userAgent.indexOf('Mac OS') > 0) { // ƻ��
      iTermType = navigator.userAgent.indexOf('iPad') > 0 ? 3 : (navigator.userAgent.indexOf('iPhone') > 0 ? 2 : 1);
    } else if (navigator.userAgent.indexOf('X11') > 0) { // Linux
      iTermType = 1;
    } else if (navigator.userAgent.indexOf('SymbOS') > 0) { // ����
      iTermType = 2;
    } else if (navigator.userAgent.indexOf('Windows') > 0) { // Windows
      iTermType = navigator.userAgent.indexOf('Windows RT') > 0 ? 3 : (navigator.userAgent.indexOf('Windows Phone') > 0 ? 2 : 1);
    } else {
      iTermType = 2;
    }
    //UAʶ���PCʱ���������ʾ���С�ڸ߶�������ֻ�ҳ
    if (iTermType == 1 && window.screen.width < window.screen.height) {
      iTermType = 2;
    }
    //UAʶ���ƽ��ʱ���������ʾ���С��ҳ��̶���ȴ�С1200������ֻ�ҳ
    if (iTermType == 3 && window.screen.width < 1200) {
      iTermType = 2;
    }
    return iTermType;
  },
  _jsonp: function (params) {
    var me = this;
    var lang = store.get("i18n_lang") == "en" ? "en" : "zh";
    //��ʽ������  
    var formatParams = function (data) {
      var arr = [];
      for (var name in data) {
        if (name == 'callback') {
          arr.unshift(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        } else {
          arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }
      };
      // ���һ�����������ֹ����
      arr.push('v=' + random());
      // �����Ӣ�ı�ʶ
      arr.push('lang=' + lang);
      return arr.join('&');
    };
    // ��ȡ�����  
    var random = function () {
      return Math.floor(Math.random() * 10000 + 500);
    };

    params = params || {};
    params.data = params.data || {};

    // jsonp����
    //����script��ǩ�����뵽ҳ����
    var callbackName = 'dr' + me.increment(); // �Զ��� callbackName
    var head = document.getElementsByTagName('head')[0];
    // ���ô��ݸ���̨�Ļص�������
    params.data['callback'] = callbackName;
    // Ĭ�ϴ��� jsVersion  
    params.data['jsVersion'] = jsVersion;
    var data = formatParams(params.data);
    var script = document.createElement('script');
    head.appendChild(script);
    //����jsonp�ص�����
    window[callbackName] = function (json) {
      head.removeChild(script);
      clearTimeout(script.timer);
      window[callbackName] = null;
      params.success && params.success(json);
    };
    //��������  
    script.src = params.url + (params.url.indexOf('?') > 0 ? '&' : '?') + data;
    //Ϊ�˵�֪�˴������Ƿ�ɹ������ó�ʱ����  
    if (params.time) {
      script.timer = setTimeout(function () {
        window[callbackName] = null;
        head.removeChild(script);
        params.error && params.error({
          message: '��ʱ'
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
  //��16����IPתΪ���ʮ���ƴ�
  hex16ToString: function (hex16IP) {
    var stringIP = parseInt(hex16IP.substr(0, 2), 16).toString(10) + "." + parseInt(hex16IP.substr(2, 2), 16).toString(10) + "." + parseInt(hex16IP.substr(4, 2), 16).toString(10) + "." + parseInt(hex16IP.substr(6, 2), 16).toString(10);
    return stringIP;
  }
};
var term = {
  account: '',
  password: '',
  type: 2,
  // �����豸:0-������1-PC��2-�ֻ���3-ƽ��
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
  //wifidogƥ�����
  gw_id: '',  		//gw_id ��������wifidog�豸
  gw_address: '',	//wifidog��IP
  gw_port: '',		//wifidog�Ķ˿�
  gw_token: '',	//�û�����token

  /*  
   * �����ն���صĲ���
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
    // eduroam ���ҳ��a27.htm ֱ�Ӷ�����ip��ͨ��checkstatus �ӿڻ�ȡ
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
