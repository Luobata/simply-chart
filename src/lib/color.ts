/**
 * @desc 带有透明度色值同步为不透明度
 */

export default (color: string, opacity: number = 1): string => {
    const al: number = 0.1;
    const ab: number = 0.9;
    const ff: number = 255;

    return color
        .split('')
        .reduce((a: string, b: string, i: number) =>
            i % 2 ? `${a + b}` : `${a},${b}`,
        )
        .split(',')
        .map(
            (v: string): string =>
                (parseInt(v, 16) * al + ab * ff).toString(16),
        )
        .join('');
};
