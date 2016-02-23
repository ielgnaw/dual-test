/**
 * @file pc 首页
 * @author ielgnaw(wuji0223@gmail.com)
 */

define(function (require) {

    return {
        /**
         * 启动
         */
        start: function () {
            var $ = require('jquery');

            $('#ajax').on('click', function () {
                $.ajax({
                    method: 'post',
                    url: '/testAjax?aaa=1',
                    data: {
                        dir: 'test'
                    },
                    success: function (data) {
                        console.warn(data);
                        socket.emit('wocaonidaye', { n: 'nnn' });
                    },
                    dataType: 'json'
                });
            });

            var socket = io.connect(location.origin);
            // socket.on('wocao', function (data) {
            //     console.log(data);
            //     // socket.emit('wocaonidaye', { n: 'nnn' });
            // });
            socket.on('jump', function (data) {
                window.location.href = data.url;
                // socket.emit('wocaonidaye', { n: 'nnn' });
            });
        }
    };
});
