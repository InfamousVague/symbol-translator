const coins = require('../dist/coins.json')
const coinExtras = require('../internal/coinExtras.json')

const walk = require('walk')
const fs = require('fs')
const walker = walk.walk('../dictionaries')

let glossary = Object.assign({}, coins)

Object.keys(coins).map((coin, i) => {
  if (coinExtras[coin]) {
    console.log(coin, 'added to extras')
    glossary[coin] = Object.assign(
      {},
      glossary[coin],
      {
        name: coinExtras[coin].name,
        images: coinExtras[coin].images
      }
    )
  } else {
    glossary[coin] = coins[coin]
  }

  if (i >= Object.keys(coins).length - 1) {
    fs.writeFile('dist/glossary.json', JSON.stringify(glossary, null, 2))
  }
})
