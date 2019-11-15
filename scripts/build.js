// quick setup just for testing .. this should be made more robust!!

import fs from 'fs'
import { rollup } from 'rollup'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const baseDir = process.env.npm_config_baseDir

const inputOptions = {
    input: baseDir + '/src/App.js',
    plugins: [resolve({ browser: true }), commonjs(), babel()],
}

const outputOptions = {
    format: 'iife',
    name: 'appBundle',
    file: baseDir + '/dist/appBundle.js',
}

rollup(inputOptions)
    .then(bundle => {
    return bundle
        .generate(outputOptions)
        .then(() => {
            bundle
                .write(outputOptions)
                .then(console.log('App bundle written to ' + outputOptions.file))
                .catch(console.error)
        })
        .catch(console.error)
    })
    .catch(console.error)

fs.copyFile('./node_modules/wpe-lightning/dist/lightning.js', baseDir + '/dist/lightning.js', (err) => {
    if(!err) {
        console.log('Lightning copied to ' + baseDir + '/dist/lightning.js')
    }
    else console.error(err)
})