const fetch = require('node-fetch')

module.exports = function(base, target, normalizer) {
    if (normalizer.doesSupport(base, 'kraken.com')) {
        const pair = normalizer.pair(base, target, 'kraken.com')

        return fetch(`https://api.kraken.com/0/public/Ticker?pair=${pair}`)
            .then(res => {
                return res.json()
            }).then(json => {
                return {
                    bid: json.result[pair].b[0],
                    ask: json.result[pair].a[0],
                    last: json.result[pair].c[0],
                    volume: json.result[pair].v[1]
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