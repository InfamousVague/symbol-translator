const fetch = require('node-fetch')

module.exports = function(base, target, normalizer) {
    const pair = normalizer.pair(target, base, 'bittrex.com')

    return fetch(`https://bittrex.com/api/v1.1/public/getticker?market=${pair}`)
        .then(res => {
            return res.json()
        }).then(json => {
            return {
                bid: json.result.Bid,
                ask: json.result.Ask,
                last: json.result.Last
            }
        }).catch(e => {
            console.warn('Error getting bittrex data', e)
            return {
                bid: null,
                ask: null,
                last: null
            }
        })
}