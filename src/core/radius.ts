/**
 * @desc 比例图
 */

import Chart from '@/core/chart';
import {
    IPoint,
    IRadiusConf,
    IRadiusConfig,
    enumRenderType,
} from '@/lib/interface';

export default class Radius extends Chart {
    public config: IRadiusConfig;

    private data: number;
    private center: IPoint;
    private pieWidth: number;
    private pieCircularWidth: number = 10;

    constructor(config: IRadiusConf) {
        super(
            { ...config },
            {
                color: 'red',
                pieColor: 'gray',
            },
        );
    }

    public update(data: number): Radius {
        this.data = data;
        this.center = {
            x: (this.config.width / 2 - this.config.padding) * this.pixelRatio,
            y: (this.config.height / 2 - this.config.padding) * this.pixelRatio,
        };
        this.pieWidth =
            (Math.min(this.config.width, this.config.height) / 2 -
                this.config.padding) *
            this.pixelRatio;

        return this;
    }

    public render(): Radius {
        if (this.config.renderType === enumRenderType.none) {
            this.renderWithNoFrame();
        }

        return this;
    }

    private renderWithNoFrame(): void {
        this.reset();
        this.ctx.save();
        this.axiesChange();

        this.ctx.beginPath();
        this.ctx.moveTo(this.center.x, this.center.y);
        this.ctx.fillStyle = this.config.pieColor;
        this.ctx.arc(
            this.center.x,
            this.center.y,
            this.pieWidth - this.pieCircularWidth,
            0,
            Math.PI * 2,
            false,
        );
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.restore();
    }
}
