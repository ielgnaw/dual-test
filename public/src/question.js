/**
 * @file 问题页面
 * @author ielgnaw(wuji0223@gmail.com)
 */

define(function (require) {

    var exports = {};

    /**
     * 初始化
     */
    exports.init = function () {
        var socket = io.connect(location.origin);
        socket.emit('questionEnter', {data: 'questionEnter'});
    };

    return exports;
});
