/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-09 17:38:49
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import React from 'react';
import mount, { unmount } from './mount';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【mount】', () => {
    test('测试加载、卸载组件', () => {

        // 创建节点
        document.body.innerHTML = '<div id="app"></div>';

        // 挂载组件
        mount(<p id="test">Hi@!@</p>, 'app');

        // 校验元素
        expect(document.getElementById('test').innerHTML).toBe('Hi@!@');

        // 卸载组件
        unmount('app');

        // 校验元素
        expect(document.getElementById('test')).toBeNull();
    });
});
