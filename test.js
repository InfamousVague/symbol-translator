const normalize = require('./index.js')

console.log(
  normalize.translate("ETH", "kraken.com") // XETH
)

console.log(
  normalize.image("ETH") // https://shapeshift.io/images/coins/ether.png
)

console.log(
  normalize.images("ETH") // { large: 'https://shapeshift.io/images/coins/ether.png', small: 'https://shapeshift.io/images/coins-sm/ether.png' }
)

console.log(
  normalize.imageSmall("ETH") // https://shapeshift.io/images/coins/ether.png
)

console.log(
  normalize.pair("ETH", "BTC", "kraken.com") // XETHXXBT
)

console.log(
  normalize.doesSupport("FCT", "kraken.com") // false
)

console.log(
  normalize.doesSupport("ETH", "kraken.com") // true
)

console.log(
  normalize.coin("ZEC")
  /*
  { name: 'Zcash',
  symbol: 'ZEC',
  images:
   { large: 'https://shapeshift.io/images/coins/zcash.png',
     small: 'https://shapeshift.io/images/coins-sm/zcash.png' },
  service:
   { 'coincap.io': 'ZEC',
     'coinmarketcap.com': 'zcash',
     'kraken.com': 'XZEC',
     'shapeshift.io': 'ZEC' } }
  */
)