const normalize = require('./index.js')

normalize.translate("ETH", "kraken.com") // XETH

normalize.image("ETH") // https://shapeshift.io/images/coins/ether.png

normalize.images("ETH") // { large: 'https://shapeshift.io/images/coins/ether.png', small: 'https://shapeshift.io/images/coins-sm/ether.png' }

normalize.imageSmall("ETH") // https://shapeshift.io/images/coins/ether.png

normalize.pair("ETH", "BTC", "kraken.com") // XETHXXBT

normalize.pair("ETH", "BTC", "bittrex.com") // XETHXXBT

normalize.doesSupport("FCT", "kraken.com") // false

normalize.doesSupport("ETH", "kraken.com") // true

normalize.coin("ZEC")

console.log(
    normalize.shift("XXBTXETH", "kraken.com", "gdax.com")
)

normalize.ticker('ZRX', 'BTC', 'liqui.io').then(ticker => {
    console.log('ticker', ticker)
})
