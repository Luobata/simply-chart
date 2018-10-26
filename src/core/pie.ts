/**
 * @desc pie chart (饼图)
 */

import Chart from '@/core/chart';
import { IPieConf, IPieConfig, enumRenderType, IPoint } from '@/lib/interface';
import Animation from 'canvas-bezier-curve';

interface IPieData {
    start: number;
    end: number;
    x: number;
    y: number;
}

export default class Pie extends Chart {
    public config: IPieConfig;

    private data: number[] = [];
    private renderData: IPieData[] = [];
    private renderFrameData: IPieData[][] = [];
    private center: IPoint;
    private pieWidth: number;

    constructor(config: IPieConf) {
        super(config, {
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

    public update(data: number[]): Pie {
        this.data = data;
        this.renderData = [];
        this.renderFrameData = [];
        this.center = {
            x: this.config.width / 2 - this.config.padding,
            y: this.config.height / 2 - this.config.padding,
        };
        this.pieWidth =
            Math.min(this.config.width, this.config.height) / 2 -
            this.config.padding;
        this.data = data;
        const total: number = data.reduce(
            (a: number, b: number): number => a + b,
        );

        const items: number[][] = [];

        data.map(
            (v: number): void => {
                const last: IPieData | null = this.renderData.length
                    ? this.renderData[this.renderData.length - 1]
                    : null;
                const start: number = last ? last.end : 0;
                const end: number = start + (v / total) * Math.PI * 2;

                this.renderData.push({
                    start: start,
                    end: end,
                    x: !last
                        ? this.center.x + this.pieWidth
                        : this.center.x + this.pieWidth * Math.cos(last.end),
                    y: !last
                        ? this.center.y
                        : this.center.y + this.pieWidth * Math.sin(last.end),
                });
                if (this.config.renderType === enumRenderType.point) {
                    const item: number[] = new Animation(
                        start,
                        end,
                        this.config.renderTime,
                        this.config.renderCurve,
                    ).getList(this.config.framePerSecond);
                    items.push(item);
                }
            },
        );

        if (items.length) {
            // enumRenderType.point
            for (let j: number = 0; j < items[0].length; j = j + 1) {
                const item: IPieData[] = [];
                for (let i: number = 0; i < items.length; i = i + 1) {
                    item.push({
                        ...this.renderData[i],
                        end: items[i][j],
                    });
                }
                this.renderFrameData.push(item);
            }
        }

        if (this.config.renderType === enumRenderType.total) {
            const item: number[] = new Animation(
                0,
                Math.PI * 2,
                this.config.renderTime,
                this.config.renderCurve,
            ).getList(this.config.framePerSecond);
            item.map(
                (v: number): void => {
                    const t: IPieData[] = [];
                    for (const i of this.renderData) {
                        if (i.end <= v) {
                            t.push(i);
                        } else {
                            t.push({
                                ...i,
                                end: v,
                            });
                            break;
                        }
                    }
                    this.renderFrameData.push(t);
                },
            );
        }

        return this;
    }

    public render(): Pie {
        if (this.config.renderType === enumRenderType.none) {
            this.renderWithNoFrame();
        } else if (this.config.renderType === enumRenderType.point) {
            this.renderWithFrame();
        } else if (this.config.renderType === enumRenderType.total) {
            this.renderWithFrame();
        }

        return this;
    }

    private renderWithNoFrame(
        data: IPieData[] = this.renderData,
        fn?: Function,
    ): void {
        this.reset();
        this.ctx.save();
        this.axiesChange();

        for (let i: number = 0; i < data.length; i = i + 1) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.center.x, this.center.y);
            const color: string = this.config.colors[i];
            const item: IPieData = data[i];
            this.ctx.lineTo(item.x, item.y);
            this.ctx.fillStyle = color;
            this.ctx.arc(
                this.center.x,
                this.center.y,
                this.pieWidth,
                item.start,
                item.end,
                false,
            );
            this.ctx.fill();
            this.ctx.closePath();
        }

        if (fn) {
            fn.call(this);
        }
    }

    private renderWithFrame(): void {
        requestAnimationFrame(() => {
            if (this.renderFrameData.length) {
                this.renderWithNoFrame(
                    this.renderFrameData.shift(),
                    this.renderWithFrame,
                );
            }
        });
    }
}
