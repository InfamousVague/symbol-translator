const fetch = require('node-fetch')

module.exports = function(base, target, normalizer) {
    const pair = normalizer.pair(base, target, 'shapeshift.io')
    
    return fetch(`https://shapeshift.io/marketinfo/${pair}`)
        .then(res => {
            return res.json()
        }).then(json => {
            return {
                last: json.rate.toString()
            }
        }).catch(e => {
            console.warn('Error getting shapeshift data', e)
            return {
                bid: null,
                ask: null,
                last: null
            }
        })
}