/**
 * @desc tooltip
 */

import { IPoint } from '@/lib/interface';

export default class ToolTip {
    public position: IPoint = {
        x: 0,
        y: 0,
    };
    public width: number = 0;
    public height: number = 0;
    private dom: HTMLElement;
    private container: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;
        this.init();
    }

    private init(): void {
        this.domInit();
        this.styleInit();
        this.appendDom();
    }

    private domInit(): void {
        this.dom = document.createElement('div');
    }

    private styleInit(): void {
        // TODO 增加样式
        this.dom.setAttribute(
            'style',
            `position: absolute;
            left: ${this.position.x};
            top: ${this.position.y};
            visibility: hidden;
            `,
        );
    }

    private appendDom(): void {
        this.container.append(this.dom);
    }

    // 销毁dom 可能有的事件绑定
    private destroy(): void {
        this.container = null;
    }
}
