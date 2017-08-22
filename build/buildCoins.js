const supportedCurrencies = require('../internal/coinExtras.json')

const walk = require('walk')
const fs = require('fs')
const walker = walk.walk('./dictionaries')

let glossary = Object.assign({}, supportedCurrencies)
let coins = {}

walker.on('file', (root, fileStats, next) => {
  const dictionary = require(`../dictionaries/${fileStats.name}`)
  const tempGlossary = Object.assign({}, glossary)
  
  Object.keys(dictionary).map((coin, i) => {
    if (!coins.coin) {
      console.log(coin, 'added to list of coins')
      coins[coin] = {
        "name": "Pending",
        "symbol": coin,
        "images": {
          "large": false,
          "small": false
        }
      }
    }
    
    next()
  })
})

walker.on("end", function () {
  fs.writeFile('dist/coins.json', JSON.stringify(coins, null, 2))
})
