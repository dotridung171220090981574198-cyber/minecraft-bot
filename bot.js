const mineflayer = require("mineflayer")
const express = require("express")

const HOST = "kingsmp.vn"
const PORT = 25565
const USERNAME = "tridumgg1234"
const PASSWORD = "1x1x1x1"

const app = express()
app.get("/", (req, res) => res.send("Bot đang chạy"))
app.listen(process.env.PORT || 3000)

function createBot() {

const bot = mineflayer.createBot({
  host: HOST,
  port: PORT,
  username: USERNAME,
  version: "1.20.1"
})

let antiAfk

bot.on("login", () => {
  console.log("✅ Bot đã login")
})

bot.on("spawn", () => {

  console.log("🌍 Bot spawn")

  // bước 1 + 3: /dn
  setTimeout(() => {
    bot.chat(`/dn ${PASSWORD}`)
    console.log("🔐 gửi /dn")
  }, 5000)

  // mở menu đồng hồ
  setTimeout(() => {

    const clock = bot.inventory.items().find(i =>
      i.name.includes("clock")
    )

    if (!clock) {
      console.log("❌ Không thấy đồng hồ menu")
      return
    }

    bot.equip(clock, "hand", () => {
      console.log("⌚ mở menu")
      bot.activateItem()
    })

  }, 12000)

})


// khi menu mở
bot.on("windowOpen", (window) => {

  console.log("📦 Menu mở:", window.title)

  // dòng 3 ô 7 = slot 24
  setTimeout(() => {
    bot.clickWindow(24, 0, 0)
    console.log("🎮 Đã chọn KingSMP")
  }, 2000)

})


// chống AFK
function startAFK(bot){

antiAfk = setInterval(() => {

  bot.setControlState("jump", true)

  setTimeout(() => {
    bot.setControlState("jump", false)
  }, 400)

  bot.look(
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI / 2,
    true
  )

}, 60000)

}

bot.on("spawn", () => startAFK(bot))


bot.on("kicked", (reason) => {
  console.log("❌ Kick:", reason)

  clearInterval(antiAfk)

  setTimeout(createBot, 15000)
})

bot.on("end", () => {
  console.log("🔄 reconnect...")

  clearInterval(antiAfk)

  setTimeout(createBot, 15000)
})

bot.on("error", console.log)

}

createBot()
