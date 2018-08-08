/**
 * @description interface
 */

export interface IConfig {
    dom: string | HTMLElement;
    width: number;
    height: number;
    color?: string;
    lineWidth?: number;
    renderType?: string;
    renderTime?: number;
    framePerSecond?: number;
}

export interface IPoint {
    x: number;
    y: number;
}

export interface IPointList {
    x: number[];
    y: number[];
}
