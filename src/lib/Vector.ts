/**
 * @description Vector
 */
import { IPoint } from '@/lib/interface';

/**
 * default class Vector
 */
export default class Vector {
    public vector: IPoint;
    public value: number; // 向量长度

    constructor(vector: IPoint) {
        this.vector = vector;
        this.value = this.getValue(this);
    }

    // 向量加
    public add(vec: Vector): Vector {
        return new Vector({
            x: this.vector.x + vec.vector.x,
            y: this.vector.y + vec.vector.y,
        });
    }

    // 向量减
    public minus(vec: Vector): Vector {
        return new Vector({
            x: this.vector.x - vec.vector.x,
            y: this.vector.y - vec.vector.y,
        });
    }

    // 向量点积
    // 物理含义 可以用来vec 在当前向量上的投影
    // 或者用来求两个向量的夹角
    public dot(vec: Vector): number {
        return this.vector.x * vec.vector.x + this.vector.y * vec.vector.y;
    }

    // 向量叉积 的值
    // 向量叉积的返回值应该是一个向量而非值，只是方向为垂直当前二维平面，所以在二维平面中，忽略他的方向
    // 物理含义 用来求向量围成的平行四边形的面积
    public cross(vec: Vector): number {
        return this.vector.x * vec.vector.y - this.vector.y * vec.vector.x;
    }

    // 向量模
    public mod(isSqrt: boolean = true): number {
        if (isSqrt) {
            return Math.sqrt(
                Math.pow(this.vector.x, 2) + Math.pow(this.vector.y, 2),
            );
        } else {
            return Math.pow(this.vector.x, 2) + Math.pow(this.vector.y, 2);
        }
    }

    // 垂直向量 默认返回单位向量
    public vertical(): Vector {
        return new Vector({
            x: this.vector.y,
            y: -this.vector.x,
        }).normaliz();
    }

    // 向量之间夹角
    public ankle(vec: Vector): number {
        const result: number =
            (Math.acos(this.dot(vec) / (this.mod() * vec.mod())) * 180) /
            Math.PI;

        return result > 180 ? result - 180 : result;
    }

    // 转化为法向量
    public normaliz(): Vector {
        const x: number = Math.sqrt(
            1 / (Math.pow(this.vector.y, 2) / Math.pow(this.vector.x, 2) + 1),
        );

        return new Vector({
            x,
            y: x === 0 ? 1 : (this.vector.y / this.vector.x) * x,
        });
    }

    private getValue(vec: Vector): number {
        return Math.sqrt(Math.pow(vec.vector.x, 2) + Math.pow(vec.vector.y, 2));
    }
}
