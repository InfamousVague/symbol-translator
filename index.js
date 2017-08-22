const glossary = require('./dist/glossary.json')
const delimiters = require('./internal/delimiters.json')
const tickers = require('./tickers')

const symbolwiki = {
  translate: (coin, service) => {
    return glossary[coin].service[service]
  },

  translateFrom: (service, coin) => {
    const coins = {}
    Object.keys(glossary).map(coin => {
      if (glossary[coin].service[service]) {
        coins[glossary[coin].service[service]] = coin
      }
    })

    return coins[coin]
  },
  
  
  image: coin => {
    return glossary[coin].images.large
  },

  imageSmall: coin => {
    return glossary[coin].images.large
  },

  images: coin => {
    return glossary[coin].images
  },

  ticker: (base, target, service) => {
    return tickers[service](base, target, symbolwiki)
  },

  glossary: () => glossary,

  pair: (base, target, service) => {
    base = glossary[base].service[service]
    target = glossary[target].service[service]
    delimiter = delimiters[service] || ''

    return `${base}${delimiter}${target}`
  },

  doesSupport: (coin, service) => {
    return (glossary[coin] && glossary[coin].service[service]) ? true : false
  },

  coin: coin => {
    return (glossary[coin])
  },

  shift: (pair, inputService, outputService) => {
    if (delimiters[inputService].length) {
      const symbols = pair.split(delimiters[inputService])
      return symbolwiki.pair(symbols[0], symbols[1], outputService)
    } else {
      const inputServiceCoins = () => {
        return Object.keys(glossary).map(coin => {
          if (glossary[coin].service[inputService]) {
            return glossary[coin].service[inputService]
          } 
        }).filter(e => {
          return e
        })
      }

      let symbols = []
      inputServiceCoins().map(coin => {
        if (pair.startsWith(coin)) {
          symbols.push(coin)
          symbols.push(pair.replace(coin, ''))
        }
      })

      return symbolwiki.pair(
        symbolwiki.translateFrom(inputService, symbols[0]), 
        symbolwiki.translateFrom(inputService, symbols[1]), 
        outputService
      )
    }
  },

  services: () => {
    return Object.keys(delimiters)
  }
}

module.exports = symbolwiki