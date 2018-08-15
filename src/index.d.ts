/**
 * @desc declare file
 */

import { IConfig, IBarConfig, IBaseConfig, ILineConfig } from '@/lib/interface';

export interface IConfig {
    base: IBaseConfig;
    attr: ILineConfig | IBarConfig;
}

export namespace Chart {
    export class Line {
        constructor(cofnig: IConfig);

        update(data: number[]): Line;

        render(): Line;
    }
    export class Bar {
        constructor(cofnig: IConfig);

        update(data: number[]): Line;

        render(): Line;
    }
}
