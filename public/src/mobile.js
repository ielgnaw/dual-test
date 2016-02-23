/**
 * @file mobile 首页
 * @author ielgnaw(wuji0223@gmail.com)
 */

define(function (require) {

    var exports = {};

    /**
     * 初始化
     */
    exports.init = function () {
        alert('init');
        alert(location.origin);

        var socket = io.connect(location.origin);
        socket.emit('mobileEnter', {data: 'mobileEnter'});
        // socket.on('wocao', function (data) {
        //         console.log(data);
        //         // socket.emit('wocaonidaye', { n: 'nnn' });
        //     });
        //     console.warn(socket);
    };

    return exports;
});
