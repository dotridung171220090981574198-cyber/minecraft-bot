const mineflayer = require("mineflayer")
const express = require("express")

// tạo web server cho Render
const app = express()
app.get("/", (req, res) => {
  res.send("Bot Minecraft đang chạy!")
})

app.listen(process.env.PORT || 3000)

function createBot() {

const bot = mineflayer.createBot({
  host: "kingsmp.vn",
  port: 25565,
  username: "AFK_Bot_01",
  version: false
})

bot.on("login", () => {
  console.log("✅ Bot đã vào server")
})

bot.on("spawn", () => {
  console.log("🌍 Bot đã spawn")

  setTimeout(() => {
    bot.chat("/login 123456")
  }, 5000)

  setInterval(() => {
    bot.setControlState("jump", true)
    setTimeout(() => bot.setControlState("jump", false), 500)
  }, 30000)
})

bot.on("end", () => {
  console.log("🔄 Bot mất kết nối, reconnect sau 10s...")
  setTimeout(createBot, 10000)
})

bot.on("kicked", (reason) => {
  console.log("❌ Bot bị kick:", reason)
})

bot.on("error", (err) => {
  console.log("⚠️ Lỗi:", err)
})

}

createBot()
