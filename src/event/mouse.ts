/**
 * @desc mouse 事件
 */
import Chart from '@/core/chart';
import Event from '@/event/';
import EventCenter from '@/event/event-center';
import { mouseType } from '@/interface/event';

/**
 * default class
 */
export default class MouseEvent extends Event {
    private mouseCenter: EventCenter;

    constructor(target: Chart, center: EventCenter) {
        super(target);

        this.mouseCenter = center;
    }

    public inMouseType(name: string): void {
        // TODO in
    }

    public on(name: mouseType, cb: Function): void {
        this.mouseCenter.addTarget(this.target, 'mouse', name, cb);
    }

    public off(name: mouseType, cb: Function): void {
        this.mouseCenter.removeTarget(this.target, 'mouse', name, cb);
    }
}
