/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-09 23:16:23
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import className from './className';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【className】', () => {
    test('测试加载样式类', () => {
        let use = className({ test: 'test-class' });

        // 校验结果
        expect(use('abs', null, 'box', 1, 'test')).toBe('abs box test-class');
        expect(use(['abs', 'box'], 'c1', () => 'c2')).toBe('abs box c1 c2');
        expect(use('abs', { test: true, c1: '', c2: 1 })).toBe('abs test-class c2');
        expect(use(() => 'test', () => ({ c1: false, c2: 1 }))).toBe('test-class c2');
        expect(use('abs', 'box', { abs: true, box: false }, 'c1 c2')).toBe('abs box c1 c2');
    });
});
