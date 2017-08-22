const fetch = require('node-fetch')

module.exports = function(base, target, normalizer) {
    if (normalizer.doesSupport(base, 'bittrex.com')) {
        const pair = normalizer.pair(target, base, 'bittrex.com')

        return fetch(`https://bittrex.com/api/v1.1/public/getticker?market=${pair}`)
            .then(res => {
                return res.json()
            }).then(json => {
                return fetch(`https://bittrex.com/api/v1.1/public/getmarketsummaries`)
                    .then(res2 => {
                        return res2.json()
                    }).then(json2 => {
                        const data = json2.result.filter(val => {
                            return (val.MarketName === pair)
                        })
                        
                        return {
                            bid: json.result.Bid,
                            ask: json.result.Ask,
                            last: json.result.Last,
                            volume: data[0].Volume
                        }
                    })
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