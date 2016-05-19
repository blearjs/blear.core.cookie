/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var cookie = require('../src/index.js');

describe('测试文件', function () {
    it('.set/.get', function () {
        var cookieName = 'cookieName1';
        var cookieValue = 'cookieValue1';
        cookie.set(cookieName, cookieValue);
        expect(cookie.set('', cookieValue)).toEqual(undefined);
        var setSecure = cookie.set('secure', 'secure', {
            secure: true
        });
        console.log('set cookie', setSecure);
        console.log('cookie map', cookie.get());
        expect(setSecure).not.toEqual(undefined);
        expect(cookie.get(cookieName)).toEqual(cookieValue);
        expect(cookie.get()[cookieName]).toEqual(cookieValue);
    });

    it('.setJSON/.getJSON', function () {
        var cookieName = 'cookieName2';
        var cookieValue = {a: 1, b: 2};

        cookie.setJSON(cookieName, cookieValue);
        console.log('cookie map', cookie.getJSON());
        expect(cookie.getJSON(cookieName)).toEqual(cookieValue);
        expect(cookie.getJSON()[cookieName]).toEqual(cookieValue);
    });

    it('.remove', function () {
        var cookieName = 'cookieName3';
        var cookieValue = 'coolieValue3';

        cookie.set(cookieName, cookieValue);
        var setRemove = cookie.remove(cookieName);
        console.log('remove cookie', setRemove);
        expect(cookie.get(cookieName)).toEqual(undefined);
    });
});
