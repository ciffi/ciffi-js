const { bgRed, bgGreen, bgWhite, white, green, blue } = require('chalk')

module.exports = class ProgressBar {
  constructor(props = {}) {
    this.total
    this.current
    this.bar_length = process.stdout.columns - 50
    this.counter = 0
    this.lines = -1
    this.fillChar = props.fillChar || ' '
    this.bgChar = props.bgChar || ' '
  }

  init(total) {
    this.total = total
    this.current = 0
    this.update(this.current)
  }

  update(current) {
    this.current = current
    const current_progress = this.current / this.total
    this.draw(current_progress)
  }

  draw(current_progress) {
    if (typeof process.stdout.clearLine !== 'function') {
      return
    }

    if (this.counter++ === 0) {
      for (let i = 0; i < this.lines * -1; i++) {
        console.log('')
      }
    }
    const filled_bar_length = (current_progress * this.bar_length).toFixed(0)
    const empty_bar_length = this.bar_length - filled_bar_length

    const filled_bar = this.get_bar(
      filled_bar_length,
      this.fillChar,
      this.fillChar === ' ' ? bgGreen : green.bold
    )
    const empty_bar = this.get_bar(
      empty_bar_length,
      this.bgChar,
      this.bgChar === ' ' ? bgWhite : white
    )
    const percentage_progress = (current_progress * 100).toFixed(2)

    process.stdout.clearScreenDown()
    process.stdout.moveCursor(0, this.lines)
    process.stdout.cursorTo(0)
    process.stdout.write(
      `${blue('🏗  Project building: ')} ${green.bold(
        `${percentage_progress}% `
      )}\n` + `${filled_bar}${empty_bar}`
    )

    if (percentage_progress === '100.00') {
      process.stdout.moveCursor(0, this.lines + 1)
      process.stdout.cursorTo(0)
      process.stdout.clearScreenDown()
      console.log('')
    }
  }

  get_bar(length, char, color = a => a) {
    let str = ''
    for (let i = 0; i < length; i++) {
      str += char
    }
    return color(str)
  }
}
