# ciffi-js/webpack-wcs-loader

Webpack WebComponents Style Loader

install as dev dependencies

```bash
npm i -D @ciffi-js/webpack-wcs-loader
```

add to webpack.config.js

```javascript
{
    test: /\.wcs$/,
    loader: 'wcs-loader'
}
```

options

- styleOnly: boolean

use

- create .wcs file that contains scss style

```scss
my-custom-element {
  //your styles here
}
```

- import in web component javascript file

```javascript
import { styleTag } from './style.wcs'
```

- append style in your render function

```javascript
render() {
  return this.shadowRoot.innerHTML = (`
    ${styleTag}
    <!-- web component template -->
  `)
}
```

- and result is

```html
<my-custom-element>
  <style></style>
  <!-- web component template -->
</my-custom-element>
```

**full documentation available at [ciffi.it/ciffi-js](https://www.ciffi.it/ciffi-js/docs/router)**
