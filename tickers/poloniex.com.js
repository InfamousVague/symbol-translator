const fetch = require('node-fetch')

module.exports = function(base, target, normalizer) {
    const pair = normalizer.pair(target, base, 'poloniex.com')

    return fetch(`https://poloniex.com/public?command=returnTicker`)
        .then(res => {
            return res.json()
        }).then(json => {
            const coinPair = json[pair]
            return {
                bid: coinPair.highestBid,
                ask: coinPair.lowestAsk,
                last: coinPair.last
            }
        }).catch(e => {
            console.warn('Error getting poloniex data', e)
            return {
                bid: null,
                ask: null,
                last: null
            }
        })
}