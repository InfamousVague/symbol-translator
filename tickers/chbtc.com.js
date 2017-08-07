const fetch = require('node-fetch')

module.exports = function(base, target, normalizer) {
    if (normalizer.doesSupport(base, 'chbtc.com')) {
        return fetch(`http://api.chbtc.com/data/${base}/ticker`)
            .then(res => {
                return res.json()
            }).then(json => {
                return {
                    bid: json.ticker.buy,
                    ask: json.ticker.sell,
                    last: json.ticker.last
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