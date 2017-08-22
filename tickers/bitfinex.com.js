const fetch = require('node-fetch')

module.exports = function(base, target, normalizer) {
    if (normalizer.doesSupport(base, 'bitfinex.com')) {
        const pair = normalizer.pair(base, target, 'bitfinex.com').toLowerCase()

        return fetch(`https://api.bitfinex.com/v1/pubticker/${pair}`)
            .then(res => {
                return res.json()
            }).then(json => {
                return {
                    bid: json.bid,
                    ask: json.ask,
                    last: json.last_price,
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