const norm = require('../index.js')
const _ = require('koa-route')
const Koa = require('koa')
const app = new Koa()
const send = require('koa-send')

const controllers = {
    glossary: ctx => {
        ctx.body = norm.glossary()
    },
    coins: ctx => {
        ctx.body = Object.keys(norm.glossary())
    },
    coin: (ctx, coin) => {
        ctx.body = norm.glossary()[coin.toUpperCase()]
    },
    translate: (ctx, coin, service) => {
        ctx.body = {
            service,
            symbol: norm.translate(
                coin.toUpperCase(), 
                service
            )
        }
    },
    translateFrom: (ctx, service, coin) => {
        ctx.body = {
            service,
            symbol: norm.translateFrom(
                service,
                coin.toUpperCase()
            )
        }
    },
    pair: (ctx, base, target, service) => {
        ctx.body = {
            service,
            pair: norm.pair(
                base.toUpperCase(), 
                target.toUpperCase(), 
                service
            )
        }
    },    
    shift: (ctx, pair, base, target) => {
        ctx.body = {
            service: target,
            pair: norm.shift(
                pair.toUpperCase(), 
                base, 
                target
            )
        }
    },
    check: (ctx, coin, service) => {
        ctx.body = {
            service,
            coin,
            supported: norm.doesSupport(
                coin.toUpperCase(),
                service
            )
        }
    },
    services: ctx => {
        ctx.body = Object.keys(norm.glossary()['BTC'].service)
    },
    docs: async ctx => {
        await send(ctx, 'api/output.html')
    }
}

app.use(_.get('/v1', controllers.glossary))
    .use(_.get('/v1/coins', controllers.coins))
    .use(_.get('/v1/coin/:coin', controllers.coin))
    .use(_.get('/v1/translate/:coin/:service', controllers.translate))
    .use(_.get('/v1/translate-from/:service/:coin', controllers.translateFrom))
    .use(_.get('/v1/pair/:base/:target/:service', controllers.pair))
    .use(_.get('/v1/check/:coin/:service', controllers.check))
    .use(_.get('/v1/services', controllers.services))
    .use(_.get('/v1/shift/:pair/:base/:target', controllers.shift))
    .use(_.get('/', controllers.docs))

app.listen(3008)
console.log('listening on port 3008')