const fetch = require('node-fetch')

module.exports = function(base, target, normalizer) {
    const pair = normalizer.pair(base, target, 'okcoin.com')
    
    return fetch(`https://www.okcoin.com/api/v1//ticker.do?symbol=${pair}`)
        .then(res => {
            return res.json()
        }).then(json => {
            return {
                buy: json.ticker.buy,
                sell: json.ticker.sell,
                last: json.ticker.last
            }
        })
}