const frames = require('./frames')
const characters = require('./characters')

let initialized = false

function nyan(options = {}) {
  const { speed, colors, pure, stream } = options

  if (!initialized) {
    frames.forEach((e, i) => {
      frames[i] = e.slice(22, 44)
      if (colors) {
        frames[i] = frames[i].map(row => {
          return row
            .split('')
            .map(c => {
              // I don't think any characters are unaccounted for but you never know
              if (characters.draw[c]) {
                return characters.draw[c] + (pure ? ' ' : c) + characters.end
              } else {
                return c
              }
            })
            .join('')
        })
      }
      frames[i] = frames[i].join('\n')
    })
  }

  initialized = true

  let i = 0
  return setInterval(() => {
    stream.write('\033[0f')
    //process.stdout.write('\033[2J');
    stream.write(frames[i])
    i = (i + 1) % frames.length
  }, speed || 35)
}

nyan.pipe = options => {
  return nyan({
    speed: options.speed,
    colors: options.colors,
    pure: options.pure,
    stream: options.stream
  })
}

module.exports = nyan
