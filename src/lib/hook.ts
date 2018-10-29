/**
 * @description hook
 */

// tslint:disable no-any no-unsafe-any

import Chart from '@/core/chart';

export const hookName: string = '__DATA_DEBUGGER_DEVTOOLS_GLOBAL_HOOK__';
export const hook: any = window ? (<any>window)[hookName] : '';

let hasInstall: boolean = false;
let debuggerMode: boolean = true;
const debuggerData: Chart[] = [];

export const hookInstall: Function = (): void => {
    if (hook && !hasInstall) {
        hook.emit('install');
        hasInstall = true;
    }
};

export const hookDispatch: Function = (): void => {
    if (!debuggerMode || !hook) {
        return;
    }

    setDebuggerData();
    hook.emit('refresh');
};

export const setDebuggerData: Function = (): void => {
    if (debuggerMode || !window) {
        if ((<any>window).__Canvas_Screen_Data) {
            return;
        }
        (<any>window).__Canvas_Screen_Data = debuggerData;
    }
};

export const addDebuggerData: Function = (obj: Chart): void => {
    const item: Chart = obj;
    let fItem: Chart = debuggerData.find((v: Chart) => v.id === item.id);
    if (!fItem) {
        debuggerData.push(item);
    } else {
        fItem = obj;
    }
    hookDispatch();
};

export const deleteDebuggerData: Function = (obj: Chart): void => {
    for (let i: number = 0; i < debuggerData.length; ) {
        if (debuggerData[i].id === obj.id) {
            debuggerData.splice(i, 1);
        } else {
            i = i + 1;
        }
    }
};
