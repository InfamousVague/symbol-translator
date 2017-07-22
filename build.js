const supportedCurrencies = require('./supportedCurrencies.json')

const walk = require('walk')
const fs = require('fs')
const walker = walk.walk('./dictionaries')

let glossary = Object.assign({}, supportedCurrencies)

walker.on('file', (root, fileStats, next) => {
  const dictionary = require(`./dictionaries/${fileStats.name}`)
  const tempGlossary = Object.assign({}, glossary)
  
  Object.keys(dictionary).map((coin, i) => {
    if (glossary[coin]) {
      tempGlossary[coin] = Object.assign(
        {}, 
        tempGlossary[coin], 
        {
          service: Object.assign(
            {},
            glossary[coin].service,
            {
              [fileStats.name.replace('.json', '')]: dictionary[coin]
            }
          )
        }
      ) 
    }


    if (i === Object.keys(dictionary).length - 1) {
      glossary = Object.assign({}, glossary, tempGlossary)
      next()
    }
  })
})

walker.on("end", function () {
  console.log(glossary)
  fs.writeFile('glossary.json', JSON.stringify(glossary, null, 2))
})
