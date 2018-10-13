/**
 *****************************************
 * Created by lifx
 * Created on 2018-10-13 20:26:44
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 创建事件对象
 *****************************************
 */
export function createEvent(data = null) {
    let isDefaultPrevented = false;

    // 返回对象
    return Object.create(data, {
        defaultPrevented: {
            get() {
                return isDefaultPrevented;
            }
        },
        preventDefault: {
            value: () => {
                isDefaultPrevented = true;
            }
        }
    });
}
