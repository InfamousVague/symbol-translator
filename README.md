# crypto-normalize
Apparently nobody can agree on crypto naming conventions, this package aggregates popular exchanges and sites and allows you to easily translate from our spec to other parties conventions.


# usage 
```js
const normalize = require('crypto-normalize')

// Translate symbol
normalize.translate("ETH", "kraken.com") // XETH

// Get image of coin
normalize.image("ETH") // https://shapeshift.io/images/coins/ether.png

// Get all image sizes of coin
normalize.images("ETH") // { large: 'https://shapeshift.io/images/coins/ether.png', small: 'https://shapeshift.io/images/coins-sm/ether.png' }

// Small image of coin
normalize.imageSmall("ETH") // https://shapeshift.io/images/coins/ether.png

// Translate pair
normalize.pair("ETH", "BTC", "kraken.com") // XETHXXBT

// Check for support
normalize.doesSupport("FCT", "kraken.com") // false
normalize.doesSupport("ETH", "kraken.com") // true
```