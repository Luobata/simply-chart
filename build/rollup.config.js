import rollup from 'rollup';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import path from 'path';
import typescript from 'rollup-plugin-typescript2';

module.exports = {
    input: 'src/core/index.ts',
    name: 'simplyChart',
    sourcemap: true,
    output: {
        file: 'dist/simplyChart.esm.js',
        format: 'es',
        name: 'simplyChart',
        sourcemap: true,
    },
    plugins: [
        // uglify(),
        resolve(),
        typescript(),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            presets: [['env', { modules: false }]],
        }),
        alias({
            Lib: path.resolve(__dirname, '../src/lib'),
            '@': path.resolve(__dirname, '../src'),
        }),
    ],
    // output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
};
