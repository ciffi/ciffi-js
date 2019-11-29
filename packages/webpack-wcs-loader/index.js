const { getOptions } = require('loader-utils')
const validateOptions = require('schema-utils')

const sass = require('node-sass')
const autoprefixer = require('autoprefixer')
const postcss = require('postcss/lib/postcss')
const CleanCSS = require('clean-css')

const schema = {
  type: 'object',
  properties: {
    styleOnly: {
      type: 'boolean'
    }
  }
}

const minify = input => {
  return new CleanCSS().minify(input).styles
}

const createStyle = async (data, callback) => {
  await sass.render({ data }, (err, res) => {
    if (err) {
      return console.log(err)
    }

    postcss([autoprefixer])
      .process(res.css, { from: 'undefined' })
      .then(result => {
        result.warnings().forEach(warn => {
          console.warn(warn.toString())
        })
        callback(minify(result.css))
      })
  })
}

const processResult = (options, input) => {
  let result = `export const styleCss = '${input}'\n`

  if (options.styleOnly) {
    return result
  }

  result += `export const styleTag = '<style>${input}</style>'`

  return result
}

function generateStyle(source, map, meta) {
  const options = getOptions(this)

  if (options) {
    validateOptions(schema, options, 'WebComponentsStyle Loader')
  }

  const callback = this.async()

  createStyle(source, result => {
    callback(null, processResult(options, result), map, meta)
  })
}

module.exports = generateStyle
