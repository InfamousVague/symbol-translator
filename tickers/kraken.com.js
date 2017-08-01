const fetch = require('node-fetch')

module.exports = function(base, target, normalizer) {
    const pair = normalizer.pair(base, target, 'kraken.com')

    return fetch(`https://api.kraken.com/0/public/Ticker?pair=${pair}`)
        .then(res => {
            return res.json()
        }).then(json => {
            return {
                bid: json.result[pair].b[0],
                ask: json.result[pair].a[0],
                last: json.result[pair].c[0]
            }
        })
}