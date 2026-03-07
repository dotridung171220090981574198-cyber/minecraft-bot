const mineflayer = require("mineflayer")
const express = require("express")

// web server cho Render
const app = express()
app.get("/", (req, res) => {
  res.send("Minecraft bot đang chạy!")
})
app.listen(process.env.PORT || 3000)

// tạo username random
function randomName() {
  return "AFK_" + Math.floor(Math.random() * 100000)
}

function createBot() {

const bot = mineflayer.createBot({
  host: "kingsmp.vn",
  port: 25565,
  username: randomName(),
  version: false
})

bot.on("login", () => {
  console.log("✅ Bot đã vào server")
})

bot.on("spawn", () => {
  console.log("🌍 Bot đã spawn")

  // login
  setTimeout(() => {
    bot.chat("/login 123456")
  }, 5000)

  // chống AFK
  setInterval(() => {
    bot.setControlState("jump", true)

    setTimeout(() => {
      bot.setControlState("jump", false)
    }, 500)

    bot.look(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI / 2,
      true
    )

  }, 30000)

  // chat tự động
  setInterval(() => {
    bot.chat("Bot AFK đang hoạt động 🤖")
  }, 300000)

})

bot.on("kicked", (reason) => {
  console.log("❌ Bot bị kick:", reason)
})

bot.on("end", () => {
  console.log("🔄 Mất kết nối, reconnect sau 30s...")
  setTimeout(createBot, 30000)
})

bot.on("error", (err) => {
  console.log("⚠️ Lỗi:", err)
})

}

createBot()
