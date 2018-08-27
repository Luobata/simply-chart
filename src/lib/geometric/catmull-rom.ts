/**
 * @desc Splines, Catmull-Rom algorithm for smooth movement
 * wiki: http://www.dxstudio.com/guide_content.aspx?id=70a2b2cf-193e-4019-859c-28210b1da81f
 * for get smooth line points
 */

import { IPoint } from '@/lib/interface';
import Vector from 'Lib/Vector';

export default (path: IPoint[], frame: number): IPoint[] => {
    return savePathCatmullRom(path, frame).map(
        (v: Vector): IPoint => {
            return v.vector;
        },
    );
};

function interpolatedPosition(
    P0: IPoint,
    P1: IPoint,
    P2: IPoint,
    P3: IPoint,
    u: number,
): Vector {
    // exp: Catmull-Rom interpolation

    const u3: number = u * u * u;

    const u2: number = u * u;

    const f1: number = u3 * -0.5 + u2 - u * 0.5;

    const f2: number = u3 * 1.5 - u2 * 2.5 + 1;

    const f3: number = u3 * -1.5 + u2 * 2 + u * 0.5;

    const f4: number = u3 * 0.5 - u2 * 0.5;

    const x: number = P0.x * f1 + P1.x * f2 + P2.x * f3 + P3.x * f4;

    const y: number = P0.y * f1 + P1.y * f2 + P2.y * f3 + P3.y * f4;

    return new Vector({
        x,
        y,
    });
}

let nodesLeft: number = 0;

// main function to calculate the Path
function savePathCatmullRom(path: IPoint[], frame: number): Vector[] {
    if (!path) {
        return;
    }

    const length: number = path.length;
    const outPath: Vector[] = [];

    for (let i: number = 0; i < length - 1; i += 1) {
        // var ui = 0;

        for (let u: number = 0; u < 1; u += 1 / frame) {
            // var vec = new Vector();

            const vec: Vector = interpolatedPosition(
                //call to Catmull-Rom
                path[Math.max(0, i - 1)], // safe array steps
                path[i],
                path[Math.min(i + 1, length - 1)], // safe Array steps
                path[Math.min(i + 2, length - 1)], // safe Array steps
                u,
            );

            outPath.push(vec); //store each value
            nodesLeft += 1; // increment node counter
            // ui++;
        }
    }

    return outPath;
}
