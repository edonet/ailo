/**
 *****************************************
 * Created by lifx
 * Created on 2018-09-25 17:39:46
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 创建本地状态对象
 *****************************************
 */
export default function createState(key, { delay } = {}) {
    let state = {},
        listeners = [],
        invokeSave = saveStateToLocalStorage(delay);

    // 处理参数
    if (!key || typeof key !== 'string') {
        throw new Error('LocalState key expect a String!');
    }

    // 获取本地数据
    try {
        state = JSON.parse(localStorage.getItem(key) || '{}');
    } catch (error) {
        // do nothing;
    }

    // 获取属性
    function get(name) {
        return name ? state[name] : state;
    }

    // 设置属性
    function set(data) {

        // 更新属性
        state = { ...state, ...data };

        // 返回数据
        return save();
    }

    // 清除属性
    function clear(name) {

        // 更新数据
        if (name) {
            delete state[name];
        } else {
            state = {};
        }

        // 保存更新
        return save();
    }

    // 添加监听
    function subscribe(callback) {

        // 添加回调
        if (typeof callback === 'function') {
            listeners.push(callback);
        }

        // 返回取消函数
        return function unsubscribe() {
            listeners = listeners.filter(v => v !== callback);
        };
    }

    // 存储数据
    function save() {

        // 保存状态
        invokeSave(key, state);

        // 执行回调事件
        listeners.forEach(cb => cb(state));

        // 返回状态
        return state;
    }

    // 返回接口
    return { set, get, clear, subscribe };
}


/**
 *****************************************
 * 保存状态
 *****************************************
 */
function saveStateToLocalStorage(delay = 1000) {
    let timeId = null;

    // 返回保存函数
    return function save(key, data) {
        timeId && clearTimeout(timeId);
        timeId = setTimeout(() => {
            try {
                localStorage.setItem(key, JSON.stringify(data));
            } catch (error) {
                // do nothing;
            } finally {
                timeId = null;
            }
        }, delay);
    };
}
