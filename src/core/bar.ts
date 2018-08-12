/**
 * @desc bar chart (柱状图)
 */

import Chart from '@/core/chart';
import { enumRenderType, IConfig } from '@/lib/interface';

export default class Bar extends Chart {
    private data: number[] = [];
    private heightList: number[] = [];

    constructor(config: IConfig) {
        super(config);
    }

    public update(data: number[]): Bar {
        this.data = data;

        const maxBarWidth: number =
            (this.config.width - data.length - 1) / data.length;
        const aveBarWidth: number = this.config.width / (data.length * 2 + 1);
        if (this.config.barWidth) {
            if (this.config.barWidth > maxBarWidth) {
                this.config.barWidth = maxBarWidth;
            }
        } else {
            this.config.barWidth = aveBarWidth;
        }
        const maxY: number = Math.max(...this.data);
        const minY: number = 0;
        const rateY: number =
            maxY !== minY
                ? (this.config.height - this.margin * 2) / (maxY - minY)
                : 1;

        // tslint:disable prefer-for-of
        for (let i: number = 0; i < this.data.length; i = i + 1) {
            this.heightList.push((this.data[i] - minY) * rateY);
        }
        // tslint:enable prefer-for-of

        return this;
    }

    public render(): Bar {
        if (this.config.renderType === enumRenderType.none) {
            this.renderWidthNoFrame();
        } else if (this.config.renderType === enumRenderType.total) {
            this.renderWidthFrame();
        }

        return this;
    }

    public renderWidthNoFrame(): void {
        this.reset();
        this.ctx.save();
        this.axiesChange();

        for (let i: number = 0; i < this.heightList.length; i = i + 1) {
            this.ctx.beginPath();
            this.ctx.fillStyle = this.config.colors[i];
            this.ctx.fillRect(
                this.config.barWidth * (i * 2 + 1) * this.pixelRatio,
                0,
                this.config.barWidth * this.pixelRatio,
                this.heightList[i] * this.pixelRatio,
            );
            this.ctx.closePath();
        }

        this.ctx.restore();
    }

    public renderWidthFrame(): void {}
}
