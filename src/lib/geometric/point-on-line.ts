/**
 * @desc 判断点在线上的函数
 */
import { IPoint } from '@/lib/interface';
import { ENGINE_METHOD_STORE } from 'constants';

// 判断一个点是否在一个贝塞尔曲线上
export const pointOnBezier: Function = (p: IPoint): boolean => {
    return true;
};

// 判断难点是否在一个折线段上
export const pointOnLineList: Function = (p: IPoint, pList: IPoint[]): boolean => {
    return true;
};
