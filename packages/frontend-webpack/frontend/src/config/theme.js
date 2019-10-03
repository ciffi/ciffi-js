export const BPSizes = {
  tablet: 768,
  ipad: 1024,
  desktop: 1280,
  large: 1440,
  big: 1680
}

export const BP = {}

Object.keys(BPSizes).map(item => {
  BP[item] = `min-width: ${BPSizes[item]}px`
})

BP.smartphone = `max-width: ${BPSizes.tablet - 1}px`
BP.portrait = `max-width: ${BPSizes.ipad - 1}px`

export const Colors = {
  black: '#000000',
  gray: '#999999',
  white: '#FFFFFF'
}

export const Rem = size => {
  return `${size / 16}rem`
}

export const Fonts = {}

export const Weights = {}

export const Sizes = {}

export const Ratio = (w, h) =>
  `&:before {
    content: '';
    display: block;
    width: 100%;
    padding-bottom: ${(w / h) * 100}%;
  }`
