console.log("🚀 Bot đang khởi động...")

const mineflayer = require("mineflayer")
const express = require("express")

const HOST = "kingsmp.vn"
const PORT = 25565
const USERNAME = "tridumgg1234"
const PASSWORD = "1x1x1x1"
const VERSION = "1.20.1"

// web server cho Render
const app = express()
app.get("/", (req, res) => {
  res.send("Minecraft bot đang chạy")
})
app.listen(process.env.PORT || 3000)

function createBot() {

console.log("🤖 Đang tạo bot...")

const bot = mineflayer.createBot({
  host: HOST,
  port: PORT,
  username: USERNAME,
  version: VERSION
})

let antiAfk

bot.on("login", () => {
  console.log("✅ Bot đã login server")
})

bot.on("spawn", () => {

  console.log("🌍 Bot đã spawn")

  // bước 1: /dn
  setTimeout(() => {
    console.log("🔐 gửi lệnh /dn")
    bot.chat(`/dn ${PASSWORD}`)
  }, 5000)

  // bước 4: mở menu đồng hồ
  setTimeout(() => {

    const clock = bot.inventory.items().find(item =>
      item.name.includes("clock")
    )

    if (!clock) {
      console.log("❌ Không tìm thấy đồng hồ menu")
      return
    }

    bot.equip(clock, "hand", () => {

      console.log("⌚ Đã cầm đồng hồ")

      setTimeout(() => {
        console.log("📂 Mở menu server")
        bot.activateItem()
      }, 2000)

    })

  }, 12000)


  // chống AFK
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

})


// khi menu mở
bot.on("windowOpen", (window) => {

  console.log("📦 Menu mở:", window.title)

  // dòng 3 ô 7 = slot 24
  setTimeout(() => {

    console.log("🎮 Chọn cụm KingSMP")

    bot.clickWindow(24, 0, 0)

  }, 2000)

})


// reconnect khi bị kick
bot.on("kicked", (reason) => {

  console.log("❌ Bot bị kick:", reason)

  clearInterval(antiAfk)

  console.log("🔄 reconnect sau 15s")

  setTimeout(createBot, 15000)

})


// reconnect khi mất kết nối
bot.on("end", () => {

  console.log("🔄 Mất kết nối")

  clearInterval(antiAfk)

  setTimeout(createBot, 15000)

})

bot.on("error", (err) => {
  console.log("⚠️ Lỗi:", err)
})

}

createBot()
