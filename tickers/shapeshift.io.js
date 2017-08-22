const fetch = require('node-fetch')

module.exports = function(base, target, normalizer) {
    if (normalizer.doesSupport(base, 'shapeshift.io')) {
        const pair = normalizer.pair(base, target, 'shapeshift.io')
        
        return fetch(`https://shapeshift.io/marketinfo/${pair}`)
            .then(res => {
                return res.json()
            }).then(json => {
                return {
                    bid: json.rate.toString(),
                    last: json.rate.toString(),
                    ask: json.rate.toString()
                }
            }).catch(e => {
                return {
                    bid: null,
                    ask: null,
                    last: null
                }
            })
    } else {
        return new Promise(resolve => {
            resolve({
                bid: null,
                ask: null,
                last: null
            })
        })
    }
}