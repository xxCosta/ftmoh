import Redis from "./redis"
import type { TradeProps } from "./types"
import { Position } from "./types"
let db = new Redis
db.test()

Bun.serve({
    port: 8080,
    async fetch(request: Request) {
        let url = new URL(request.url)
        if (url.pathname === "/batchGet") {
            let r = {
                message: "hold ur data my yute",
                data: null
            }
            r.data = await db.batchGet('environment', 'live')
            return new Response(JSON.stringify(r))
        }
        if (url.pathname === "/batchDelete") {
            let reqBody = await (request.json())
            let d = await db.batchDelete(reqBody.key, reqBody.value)
            return new Response(d)
        }
        if (url.pathname === "/toggle") {
            let environment = await db.toggleEnv()
            return new Response(environment)
        }
        let position: TradeProps
        const p = url.searchParams
        position = new Position(
            p.get("symbol"),
            Number(p.get("profit")),
            p.get("endTime"),
            Number(p.get("type")),
            Number(p.get("positionSize")),
            Number(p.get("tp")),
            Number(p.get("sl")),
            Number(p.get("accountBalance"))
        )

        await db.save(position)


        return new Response('wuts gud')
    }

})
console.log("ready to receive");
