/**
 * @file mobile 首页
 * @author ielgnaw(wuji0223@gmail.com)
 */

define(function (require) {

    var DATA = require('./data');

    var $ = require('jquery');

    var WHITESPACE = /^[\s\xa0\u3000]+|[\u3000\xa0\s]+$/g;

    var socket = io.connect(location.origin);

    /**
     * 删除目标字符串两端的空白字符
     *
     * @param {string} source 目标字符串
     * @return {string} 删除两端空白字符后的字符串
     */
    function trim(source) {
        if (!source) {
            return '';
        }

        return String(source).replace(WHITESPACE, '');
    };


    /**
     * 回答问题
     *
     * @param {Object} e 时间对象
     */
    function doAnswer(e) {
        e.stopPropagation();
        e.preventDefault();

        var answerNode = document.querySelector('#answer');
        var answer = trim(answerNode.value);
        socket.emit('mobileAnwser', {answer: answer});
    }

    var exports = {};

    /**
     * 初始化
     */
    exports.init = function () {
        // 触发 mobile 扫码进入页面
        socket.emit('mobileEnter', {data: 'mobileEnter'});

        // 监听 mobile 页面生成答题文本框
        socket.on('createAnswer', function (data) {
            document.querySelector('.container').innerHTML = ''
                + '请输入题目<b>'
                +   data.curQuestion[0]
                + '</b>的答案：<input type="text" id="answer"/><a id="go" href="###">确定</a>';

            document.querySelector('#go').addEventListener('click', doAnswer);
        });

        socket.on('tell2MobileAllRight', function (data) {
            document.querySelector('.container').innerHTML = '恭喜你，全都正确～';
        });
    };

    return exports;
});
