/**
 * @desc event
 */

import Log from '@/basic/log';
import Chart from '@/core/chart';
/**
 * default class
 */
export default class Event extends Log {
    protected target: Chart;

    constructor(target: Chart) {
        super();
        this.target = target;
    }
}
