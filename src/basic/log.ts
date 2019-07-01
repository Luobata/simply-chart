/**
 * @desc log
 */

const idCollection: {
    [key: string]: number;
} = {};
/**
 * default class
 */
export default class Log {
    public id: string;

    constructor() {
        const name: string = this.constructor.name;
        if (!idCollection[name]) {
            idCollection[name] = 0;
        }

        this.id = `${name}_${idCollection[name]}`;
        idCollection[name] = idCollection[name] + 1;
    }
}
