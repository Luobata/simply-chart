/**
 * @desc event center for dispatch event
 * 每一个canvas对应一个eventCenter 只应该被在canvas初始化的时候被实例化一次
 */

import Chart from '@/core/chart';
import { event, keybordType, mouseType, mouseTypeArr } from '@/interface/event';

interface IChartEventHandler {
    chart: Chart;
    handler: Function;
}

// type event = keyof mouseType;

// TODO 如何限制interface只能为由mouseType moueTypeArr中的字符串作为key的event
type eventType = {
    // mouse: { [key in mouseType]?: Chart[] };
    // keybord: { [key in keybordType]?: Chart[] };
    [K in event]?: {
        [key: string]: IChartEventHandler[];
    }
};
/**
 * default class
 */
export default class EventCenter {
    // protected targets: Chart[] = [];
    protected canvas: HTMLCanvasElement;

    private eventDispatchList: eventType;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.init();
    }

    // public cleanTargets(types: event = 'mouse'): void {
    //     this.targets = [];
    // }

    public addTarget(
        chart: Chart,
        types: event = 'mouse',
        eventTypes: mouseType | keybordType,
        cb: Function,
    ): void {
        // this.targets.push(chart);
        if (this.eventDispatchList[types][eventTypes]) {
            this.eventDispatchList[types][eventTypes].push({
                chart,
                handler: cb,
            });
        } else {
            this.eventDispatchList[types][eventTypes] = [
                {
                    chart,
                    handler: cb,
                },
            ];
        }
    }

    public removeTarget(
        chart: Chart,
        types: event = 'mouse',
        eventTypes: mouseType | keybordType,
        cb: Function,
    ): void {
        if (this.eventDispatchList[types][eventTypes]) {
            for (
                let i: number = 0;
                i < this.eventDispatchList[types][eventTypes].length;

            ) {
                const item: IChartEventHandler = this.eventDispatchList[types][
                    eventTypes
                ][i];
                if (item.handler === cb && item.chart === chart) {
                    this.eventDispatchList[types][eventTypes].splice(i, 1);
                    break;
                } else {
                    i = i + 1;
                }
            }
        }
    }

    public addEvent(name: string, cb: Function): void {
        // TODO addEvent
    }

    public init(): void {
        this.eventDispatchList = {
            mouse: {},
            keybord: {},
        };
        // TODO 是否需要节流
        // TODO 是否需要拆开绑定
        mouseTypeArr.map(
            (v: string): void => {
                this.canvas.dom.addEventListener(
                    v,
                    (me: MouseEvent): void => {
                        if (
                            this.eventDispatchList.mouse[v] &&
                            this.eventDispatchList.mouse[v].length
                        ) {
                            for (const i of this.eventDispatchList.mouse[v]) {
                                // TODO point的计算计算方式 应该相对成canvas的位置 可能需要调整
                                if (
                                    i.chart.onChart({
                                        x: me.offsetX,
                                        y: me.offsetY,
                                    })
                                ) {
                                    i.handler.call(null, me);
                                }
                            }
                        }
                    },
                );
            },
        );
    }
}
