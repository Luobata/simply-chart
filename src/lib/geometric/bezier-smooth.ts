/**
 * @desc smooth line generator wit beziur
 * doc: https://wenku.baidu.com/view/19682071f242336c1eb95e47.html
 */

import { IPoint } from '@/lib/interface';

export default (path: IPoint[]): IPoint[][] => {
    return getBezierList(path);
};

function getControl(P0: IPoint, P1: IPoint, P2: IPoint, P3: IPoint): IPoint[] {
    const rate1: number = 0.25;
    const rate2: number = 0.25;

    return [
        P1,
        {
            x: P1.x + rate1 * (P2.x - P0.x),
            y: P1.y + rate1 * (P2.y - P0.y),
        },
        {
            x: P2.x - rate2 * (P3.x - P1.x),
            y: P2.y - rate2 * (P3.y - P1.y),
        },
        P2,
    ];
}

function getBezierList(path: IPoint[]): IPoint[][] {
    const length: number = path.length;
    const outPath: IPoint[][] = [];

    for (let i: number = 0; i < length - 1; i += 1) {
        const controlP: IPoint[] = getControl(
            path[Math.max(0, i - 1)], // safe array steps
            path[i],
            path[Math.min(i + 1, length - 1)], // safe Array steps
            path[Math.min(i + 2, length - 1)], // safe Array steps
        );

        outPath.push(controlP); //store each value
    }

    return outPath;
}
