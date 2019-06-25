/**
 * @description util
 */

export const delay: Function = (timeTicket: number, fn: Function): Function => {
    // let start!: number;
    // let timer: NodeJS.Timer;
    let timer: number;

    return (): void => {
        // const now: number = new Date().getTime();
        if (!timer) {
            // start = new Date().getTime();
            timer = setTimeout(() => {
                fn();
            }, timeTicket);
        } else {
            clearTimeout(timer);
            timer = setTimeout((): void => {
                fn();
                clearTimeout(timer);
                timer = null;
                // start = 0;
            }, timeTicket);
        }
    };
};
