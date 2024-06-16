import {createClient} from 'redis'
import { Repository,EntityId} from 'redis-om'
import {tradeSchema} from './types'
//import type { TradeProps } from './types'

const redis = createClient({url: `redis://${Bun.env.REDIS_USER}:${Bun.env.REDIS_PASS}@172.105.8.29:6379`})

redis.on('error',(err)=>{console.log(err)})
await redis.connect()

const tradeRepository = new Repository(tradeSchema,redis)

export default class Redis{
    public async test(){
        console.log(await redis.ping()) 
    }

    public async save(trade){
        let env = await this.checkEnv()
        trade.environment = env
        await tradeRepository.save(trade)
        //trade[EntityId]
   }

   public async toggleEnv(){
        let env = await redis.get("env")
        if(env === "null"){
            redis.set("env","demo") 
        }
        env === "demo" ? redis.set("env","live") : redis.set("env","demo")
        return "now saving data from " + await this.checkEnv() + " account"
   }

   private async checkEnv(){
        let env = await redis.get("env")
        return env
   }
    

}
