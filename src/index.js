/**
 * core cookie
 * @author ydr.me
 * @create 2016-04-08 22:45
 */




'use strict';

var object =      require('blear.utils.object');
var array =       require('blear.utils.array');
var json =        require('blear.utils.json');
var uri =         require('blear.utils.uri');
var querystring = require('blear.utils.querystring');

var defaults = exports.defaults = {
    /**
     * 在无域名的时候，必须设置为空才能在本地写入
     * @type string
     */
    domain: /\./.test(location.hostname) ? '' : location.hostname,

    /**
     * 默认cookie有效期1个小时（单位毫秒）
     * @type number
     */
    expires: 3600000,

    /**
     * 默认cookie存储路径
     * @type string
     */
    path: '/',

    /**
     * 是否加密cookie
     * @type boolean
     */
    secure: location.protocol === 'https:'
};


/**
 * 设置 cookie
 * @param name {string} cookie 名称
 * @param value {string} cookie 值
 * @param [options] {object} 配置
 * @param [options.expires] {number} 有效期
 * @param [options.path] {string} 路径
 * @param [options.domain] {string} 域
 * @param [options.secure] {boolean} 是否加密
 * @private
 */
var setCookie = function setCookie(name, value, options) {
    options = object.assign({}, defaults, options);

    name = uri.encode(name);
    value = uri.encode(value);

    if (!name) {
        return;
    }

    var d = new Date();
    var ret = [name + '=' + value];
    var secure = 'secure';

    d.setTime(d.getTime() + options.expires);
    ret.push('expires=' + d.toUTCString());

    if (options.path) {
        ret.push('path=' + options.path);
    }

    if (options.domain) {
        ret.push('domain=' + options.domain);
    }

    if (options.secure) {
        ret.push(secure + '=' + secure);
    }

    return (document.cookie = ret.join(';'));
};


/**
 * 获取 cookie map
 * @returns {{}}
 */
var getCookieMap = function (needJSON) {
    var cookies = document.cookie;
    var cookieNameValueMap = querystring.parse(cookies, ';');

    if (needJSON) {
        cookieNameValueMap = object.map(cookieNameValueMap, json.safeParse);
    }

    return cookieNameValueMap;
};


/**
 * 根据键名获取 cookie
 * @param [name] {String} cookie 名称
 * @returns {object|string|undefined}
 */
exports.get = function (name) {
    var cookieMap = getCookieMap();

    if (!name) {
        return cookieMap;
    }

    return cookieMap[name];
};


/**
 * 根据键名获取 cookie 为 JSON 格式
 * @param [name] {String} cookie 名称
 * @returns {Object|null}
 */
exports.getJSON = function (name) {
    var cookieMap = getCookieMap(true);

    if (!name) {
        return cookieMap;
    }

    return cookieMap[name];
};


/**
 * 设置 cookie
 * @param name {string} cookie 名称
 * @param value {string} cookie 值
 * @param [options] {object} 配置
 * @param [options.expires] {number} 有效期
 * @param [options.path] {string} 路径
 * @param [options.domain] {string} 域
 * @param [options.secure] {boolean} 是否加密
 */
exports.set = function (name, value, options) {
    return setCookie(name, value, options);
};


/**
 * 设置 cookie 为 JSON 格式
 * @param name {string} cookie 名称
 * @param value {Object} cookie 值
 * @param [options] {object} 配置
 * @param [options.expires] {number} 有效期
 * @param [options.path] {string} 路径
 * @param [options.domain] {string} 域
 * @param [options.secure] {boolean} 是否加密
 */
exports.setJSON = function (name, value, options) {
    return setCookie(name, json.safeStringify(value), options);
};


/**
 * 清除单个 cookie
 * @param name {string} cookie 名称
 * @param [options] {object} 配置
 * @param [options.expires] {number} 有效期
 * @param [options.path] {string} 路径
 * @param [options.domain] {string} 域
 * @param [options.secure] {boolean} 是否加密
 */
exports.remove = function (name, options) {
    options = options || {};
    options.expires = -1;

    return setCookie(name, '', options);
};

