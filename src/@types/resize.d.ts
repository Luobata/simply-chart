// resize.d.ts
// declare interface Window {
//     addResizeListener(element: HTMLElement, fn: () => any): void;
//     removeResizeListener(element: HTMLElement, fn: () => any): void;
// }

declare module 'resize' {
    export function addResizeListener(
        element: HTMLElement,
        fn: () => any,
    ): void;
    export function removeResizeListener(
        element: HTMLElement,
        fn: () => any,
    ): void;
}
