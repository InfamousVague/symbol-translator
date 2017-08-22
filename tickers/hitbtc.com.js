const fetch = require('node-fetch')

module.exports = function(base, target, normalizer) {
    if (normalizer.doesSupport(base, 'hitbtc.com')) {
        const pair = normalizer.pair(base, target, 'hitbtc.com')
        return fetch(`https://api.hitbtc.com/api/1/public/${pair}/ticker`)
            .then(res => {
                return res.json()
            }).then(json => {
                return {
                    bid: json.bid,
                    ask: json.ask,
                    last: json.last,
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