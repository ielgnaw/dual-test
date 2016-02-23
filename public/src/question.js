/**
 * @file 问题页面
 * @author ielgnaw(wuji0223@gmail.com)
 */

define(function (require) {

    var data = require('./data');

    var socket = io.connect(location.origin);

    var curQues;

    /**
     * 设置题目
     */
    function setQuestion() {
        curQues = data.shift();
        document.querySelector('.container').innerHTML = curQues[0];
        socket.emit('questionEnter', {curQuestion: curQues});
    }

    var exports = {};

    /**
     * 初始化
     */
    exports.init = function () {
        setQuestion();
        socket.on('mobileAnwserToPC', function (d) {
            if (curQues[1] == d.answer) {
                if (data.length) {
                    alert('回答正确，进入下一题');
                    setQuestion();
                }
                else {
                    alert('你真牛逼，全对');
                    document.querySelector('.container').innerHTML = '牛逼，全对 🐂🐂🐂🐂🐂🐂🐂';
                    socket.emit('allRight');
                }
            }
            else {
                alert('回答错误，请重新回答');
            }
        });
    };

    return exports;
});
