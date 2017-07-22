const glossary = require('./glossary.json')
const delimiters = require('./delimiters.json')

module.exports = {
  translate: (coin, service) => {
    return glossary[coin].service[service]
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

  glossary: () => glossary,

  pair: (base, target, service) => {
    base = glossary[base].service[service]
    target = glossary[target].service[service]
    delimiter = delimiters[service] || ''
    return `${base}${delimiter}${target}`
  },

  doesSupport: (coin, service) => {
    return (glossary[coin].service[service]) ? true : false
  },

  coin: coin => {
    return (glossary[coin])
  }
}