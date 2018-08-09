/**
 * @desc common help util
 */

import { IPoint } from '@/lib/interface';
import Vector from '@/lib/Vector';

export function getLength(p1: IPoint, p2: IPoint): number {
    return new Vector({
        x: p2.x - p1.x,
        y: p2.y - p1.y,
    }).value;
}

export function getTotal(arr: number[]): number {
    let n: number = 0;
    arr.map((v: number) => (n += v));

    return n;
}
