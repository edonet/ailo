/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-26 15:19:13
 *****************************************
 */
'use strict';

// const path = require('path');


/**
 *****************************************
 * 抛出配置
 *****************************************
 */
module.exports = {
    roots: [
        '<rootDir>/test/'
    ],
    moduleNameMapper: {
        '^ailo/(.*)$': '../lib/$1'
    }
};
