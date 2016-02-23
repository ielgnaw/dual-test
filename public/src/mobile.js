/**
 * @file mobile 首页
 * @author ielgnaw(wuji0223@gmail.com)
 */

define(function (require) {

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
        alert(answer);
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
                + '请输入答案：<input type="text" id="answer"/><a id="go" href="###">确定</a>';
            document.querySelector('#go').addEventListener('click', doAnswer);
        });

        // window.onbeforeunload = function() {
        //     var n = window.event.screenX - window.screenLeft;
        //     var b = n > document.documentElement.scrollWidth-20;
        //     if(b && window.event.clientY < 0 || window.event.altKey){
        //         // alert("这是一个关闭操作而非刷新");
        //         // window.event.returnValue = ""; //此处放你想要操作的代码
        //         return 'aaa';
        //     }else{
        //         // alert("这是一个刷新操作而非关闭");
        //         return 'bbb';
        //     }
        // }

        window.onunload = function () {
            alert(123);
        };
        // window.addEventListener('unload',function () {
        //     alert(33);
        //     var n = window.event.screenX - window.screenLeft;
        //     var b = n > document.documentElement.scrollWidth-20;
        //     if(b && window.event.clientY < 0 || window.event.altKey){
        //          alert("这是一个关闭操作而非刷新");
        //          //此处放你想要操作的代码
        //     }else{
        //          alert("这是一个刷新操作而非关闭");
        //     }
        // })
        // console.warn($);
        // $(window).unload(function(){
        //   alert("Goodbye!");
        // });
    };

    return exports;
});
