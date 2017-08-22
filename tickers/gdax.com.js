const fetch = require('node-fetch')

module.exports = function(base, target, normalizer) {
    if (normalizer.doesSupport(base, 'gdax.com')) {
        const pair = normalizer.pair(base, target, 'gdax.com')
        
        return fetch(`https://api.gdax.com/products/${pair}/ticker/`)
            .then(res => {
                return res.json()
            }).then(json => {
                return {
                    bid: json.bid,
                    last: json.price,
                    ask: json.ask,
                    volume: json.volume
                }
            }).catch(e => {
                return {
                    bid: null,
                    ask: null,
                    last: null,
                    volume: null
                }
            })
    } else {
        return new Promise(resolve => {
            resolve({
                bid: null,
                ask: null,
                last: null,
                volume: null
            })
        })
    }
}