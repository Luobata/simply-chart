/**
 * @desc bar chart (柱状图)
 */

import Chart from '@/core/chart';
import { enumRenderType, IBarConf, IBarConfig } from '@/lib/interface';
import Animation from 'canvas-bezier-curve';

interface IBarRender {
    frameList: number[][];
}

/**
 * default class
 */
export default class Bar extends Chart {
    public config: IBarConfig;

    private data: number[] = [];
    private heightList: number[] = [];

    private renderAttr: IBarRender = {
        frameList: [],
    };

    constructor(config: IBarConf) {
        super(config, {
            barRadius: 5,
            colors: [
                'red',
                'orange',
                'yellow',
                'green',
                'cyan',
                'blue',
                'purple',
            ],
        });
    }

    public reRender(): void {
        // TODO
    }

    public update(data: number[]): Bar {
        this.data = data;

        const maxBarWidth: number =
            (this.config.innerWidth - data.length - 1) / data.length;
        const aveBarWidth: number =
            this.config.innerWidth / (data.length * 2 + 1);
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
            maxY !== minY ? this.config.innerHeight / (maxY - minY) : 1;

        // tslint:disable prefer-for-of
        for (let i: number = 0; i < this.data.length; i = i + 1) {
            if (rateY === 1 && maxY === 0) {
                // this.heightList.push((this.config.height - minY) / 2);
                this.heightList.push(1);
            } else {
                this.heightList.push((this.data[i] - minY) * rateY);
            }
            if (this.config.renderType === enumRenderType.total) {
                this.renderAttr.frameList.push(
                    new Animation(
                        0,
                        this.heightList[i],
                        this.config.renderTime,
                        this.config.renderCurve,
                    ).getList(this.config.framePerSecond),
                );
            }
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

    private renderWidthNoFrame(): void {
        this.reset();
        this.ctx.save();
        this.axiesChange();

        for (let i: number = 0; i < this.heightList.length; i = i + 1) {
            this.ctx.beginPath();
            this.ctx.fillStyle = this.config.colors[i];
            this.renderRadius(
                this.config.barWidth * (i * 2 + 1) * this.pixelRatio,
                0,
                this.config.barWidth * this.pixelRatio,
                this.heightList[i] * this.pixelRatio,
            );
            this.ctx.closePath();
        }

        this.ctx.restore();
    }

    private renderWidthFrame(): void {
        requestAnimationFrame(() => {
            this.reset();
            this.ctx.save();
            this.axiesChange();

            for (let i: number = 0; i < this.heightList.length; i = i + 1) {
                this.ctx.beginPath();
                this.ctx.fillStyle = this.config.colors[i];
                this.renderRadius(
                    this.config.barWidth * (i * 2 + 1) * this.pixelRatio,
                    0,
                    this.config.barWidth * this.pixelRatio,
                    this.renderAttr.frameList[i].shift() * this.pixelRatio,
                );
                this.ctx.closePath();
            }

            this.ctx.restore();

            if (this.renderAttr.frameList[0].length) {
                this.renderWidthFrame();
            }
        });
    }

    private renderRadius(
        x: number,
        y: number,
        width: number,
        height: number,
    ): void {
        const min: number = Math.min(width, height);
        const radius: number =
            this.config.barRadius > min / 2 ? min / 2 : this.config.barRadius;
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, y + height - radius);
        this.ctx.arc(
            x + radius,
            y + height - radius,
            radius,
            Math.PI * 0,
            Math.PI * 0.5,
            true,
        );
        this.ctx.lineTo(x + width - radius, y + height);
        this.ctx.arc(
            x + width - radius,
            y + height - radius,
            radius,
            Math.PI * 1.5,
            Math.PI * 2,
            true,
        );
        this.ctx.lineTo(x + width, y);
        this.ctx.fill();
    }
}
