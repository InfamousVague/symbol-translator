const fetch = require('node-fetch')

module.exports = function(base, target, normalizer) {
    if (normalizer.doesSupport(base, 'liqui.io')) {
        const pair = normalizer.pair(base, target, 'liqui.io')
        return fetch(`https://api.liqui.io/api/3/ticker/${pair.toLowerCase()}`)
            .then(res => {
                return res.json()
            }).then(json => {
                return {
                    bid: json[pair.toLowerCase()].buy,
                    ask: json[pair.toLowerCase()].sell,
                    last: json[pair.toLowerCase()].last,
                    volume: json[pair.toLowerCase()].vol_cur
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