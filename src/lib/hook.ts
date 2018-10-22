/**
 * @description hook
 */

// tslint:disable no-any no-unsafe-any

export const hookName: string = '__DATA_DEBUGGER_DEVTOOLS_GLOBAL_HOOK__';
export const hook: any = (<any>window)[hookName];

let hasInstall: boolean = false;

export const hookInstall: Function = (): void => {
    if (hook && !hasInstall) {
        hook.emit('install');
        hasInstall = true;
    }
};
