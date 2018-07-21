/**
 * @description entry core
 */

import { IConfig } from '../lib/interface';

export default class {
    config: IConfig;
    constructor(config: IConfig) {
        this.config = config;
    }
}
