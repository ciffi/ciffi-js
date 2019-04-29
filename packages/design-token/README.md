# ciffi-js/design-token

scss variables file generator from design token json file

install as dev dependencie

```
npm i -D @ciffi-js/design-token
```

configure in .ciffisettings file

```
designToken: true,
designTokenInputFile: './src/config/designToken.json',
designTokenOutputFile: './src/styles/config/_design-token.scss',
```

use in your package.json scripts

```
{
  "design-token": "ciffi-design-token"
}
```

**full documentation available at [ciffi.it/ciffi-js](https://www.ciffi.it/ciffi-js/docs/router)**
