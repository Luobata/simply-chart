/**
 * @desc pie chart (饼图)
 */

import Chart from '@/core/chart';
import { IPieConf, IPieConfig, enumRenderType, IPoint } from '@/lib/interface';

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
            },
        );

        console.log(this.renderData);

        return this;
    }

    public render(): Pie {
        if (this.config.renderType === enumRenderType.none) {
            this.renderWithNoFrame();
        }

        return this;
    }

    private renderWithNoFrame(): void {
        this.reset();
        this.ctx.save();
        this.axiesChange();

        for (let i: number = 0; i < this.renderData.length; i = i + 1) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.center.x, this.center.y);
            const color: string = this.config.colors[i];
            const item: IPieData = this.renderData[i];
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
    }
}
