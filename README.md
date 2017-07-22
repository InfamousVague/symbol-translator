# crypto-normalize
Apparently nobody can agree on crypto naming conventions, this package aggregates popular exchanges and sites and allows you to easily translate from our spec to other parties conventions.


# usage 
```js
  const cryptoNormalize = require('crypto-normalize')
  const krakenBTCSymbol = cryptoNormalize.BTC.service['kraken.com']
  
  console.log(krakenBTCSymbol) // => XXBT
```