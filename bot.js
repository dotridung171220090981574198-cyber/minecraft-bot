console.log("🚀 Bot đang khởi động...")

const mineflayer = require("mineflayer")
const express = require("express")

const HOST = "kingsmp.vn"
const USERNAME = "tridumgg1234"
const PASSWORD = "1x1x1x1"

const app = express()
app.get("/", (req, res) => res.send("Bot đang chạy"))
app.listen(process.env.PORT || 3000)

function createBot(){

console.log("🤖 Đang tạo bot...")

const bot = mineflayer.createBot({
  host: HOST,
  username: USERNAME,
  version: "1.20.1"
})

let antiAfk

bot.on("spawn", () => {

console.log("🌍 Bot spawn")

setTimeout(()=>{
  console.log("🔐 gửi /dn")
  bot.chat(`/dn ${PASSWORD}`)
},5000)

setTimeout(()=>{

const clock = bot.inventory.items().find(i=>i.name.includes("clock"))

if(!clock){
console.log("❌ Không thấy đồng hồ")
return
}

bot.equip(clock,"hand",()=>{
console.log("⌚ mở menu")
bot.activateItem()
})

},12000)

antiAfk=setInterval(()=>{

bot.setControlState("jump",true)

setTimeout(()=>{
bot.setControlState("jump",false)
},400)

bot.look(Math.random()*Math.PI*2,Math.random()*Math.PI/2,true)

},60000)

})

bot.on("windowOpen",(window)=>{

console.log("📦 menu mở")

setTimeout(()=>{
bot.clickWindow(24,0,0)
console.log("🎮 chọn KingSMP")
},2000)

})

bot.on("kicked",(r)=>{

console.log("❌ Bot bị kick:",r)

clearInterval(antiAfk)

console.log("⏳ reconnect sau 60s")

setTimeout(createBot,60000)

})

bot.on("end",()=>{

console.log("🔌 mất kết nối")

clearInterval(antiAfk)

console.log("⏳ reconnect sau 60s")

setTimeout(createBot,60000)

})

bot.on("error",console.log)

}

setTimeout(createBot,10000)
