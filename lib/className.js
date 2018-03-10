/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-09 23:07:41
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载样式列表
 *****************************************
 */
export default function className(locals = {}) {
    return function use(...args) {
        var map = {},
            list = [];


        // 添加样式
        function add(name) {
            if (name && !(name in map)) {
                map[name] = list.push(locals[name] || name);
            }
        }

        // 获取列表
        args.forEach(argv => {
            if (argv) {
                var type = typeof argv;

                // 处理字符串
                if (type === 'string') {
                    return add(argv);
                }

                // 处理列表
                if (Array.isArray(argv)) {
                    return add(use.apply(null, argv));
                }

                // 处理对象
                if (type === 'object') {
                    return Object.keys(argv).forEach(key => {
                        argv[key] && add(key);
                    });
                }

                // 处理函数
                if (type === 'function') {
                    return add(use(argv()));
                }
            }
        });

        // 返回样式
        return list.join(' ');
    };
}
