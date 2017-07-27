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
        })
}