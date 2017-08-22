const fetch = require('node-fetch')

module.exports = function(base, target, normalizer) {
    if (normalizer.doesSupport(base, 'kraken.com')) {
        const pair = normalizer.pair(base, target, 'okcoin.com')
        
        return fetch(`https://www.okcoin.com/api/v1//ticker.do?symbol=${pair}`)
            .then(res => {
                return res.json()
            }).then(json => {
                return {
                    bid: json.ticker.buy,
                    ask: json.ticker.sell,
                    last: json.ticker.last,
                    volume: json.ticker.vol
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