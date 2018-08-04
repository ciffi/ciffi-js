const BPSizes = {
  smartphone: 375,
  tablet: 768,
  ipad: 1024,
  desktop: 1280,
  large: 1440,
  big: 1680
};

const BP = {};

Object.keys(BPSizes).map(item => {
  BP[item] = `min-width: ${BPSizes[item]}px`;
});

const Colors = {
  black: '#000000',
  darkGray: '#0F0F0F',
  gray: '#949494',
  white: '#FFFFFF'
};

const Fonts = {};

const Rem = size => {
  return `${size / 16}rem`;
};

export { BP, BPSizes, Colors, Fonts, Rem };
