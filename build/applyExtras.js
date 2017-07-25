const coins = require('../dist/glossary.json')
const coinExtras = require('../internal/coinExtras.json')

const walk = require('walk')
const fs = require('fs')
const walker = walk.walk('../dictionaries')

let glossary = Object.assign({}, coins)

walker.on('file', (root, fileStats, next) => {
  const dictionary = require(`../dictionaries/${fileStats.name}`)
  const tempGlossary = Object.assign({}, glossary)
  
  Object.keys(dictionary).map((coin, i) => {
    if (glossary[coin] && coinExtras[coin]) {
      glossary[coin] = Object.assign(
        {},
        glossary[coin],
        {
          name: coinExtras[coin].name,
          images: coinExtras[coin].images
        }
      )
    }
    next()
  })
})

walker.on("end", function () {
  fs.writeFile('glossary.json', JSON.stringify(glossary, null, 2))
})
