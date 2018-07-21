/**
 * @description entry core
 */

import { IConfig } from 'Lib/interface';

export default class {
    config: IConfig;
    constructor(config: IConfig) {
        this.config = config;
    }
}
