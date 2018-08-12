/**
 * @desc bar chart (柱状图)
 */

import Chart from '@/core/chart';
import { enumRenderType, IConfig } from '@/lib/interface';

export default class Bar extends Chart {
    private data: number[];
    private heightList: number[];

    constructor(config: IConfig) {
        super(config);

        this.animation = this.config.renderType !== enumRenderType.none;
    }
}
