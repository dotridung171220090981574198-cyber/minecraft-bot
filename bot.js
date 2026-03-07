const mineflayer = require("mineflayer")

function createBot() {

const bot = mineflayer.createBot({
  host: "kingsmp.vn", // IP server
  port: 25565,        // port (thường là 25565)
  username: "AFK_Bot_01", // tên bot
  version: false
})

bot.on("login", () => {
  console.log("✅ Bot đã vào server")
})

bot.on("spawn", () => {
  console.log("🌍 Bot đã spawn")

  // tự login nếu server yêu cầu
  setTimeout(() => {
    bot.chat("/login 123456")
  }, 5000)

  // nhảy AFK để không bị kick
  setInterval(() => {
    bot.setControlState("jump", true)
    setTimeout(() => bot.setControlState("jump", false), 500)
  }, 30000)
})

bot.on("chat", (username, message) => {
  if (username === bot.username) return
  console.log(username + ": " + message)
})

bot.on("kicked", (reason) => {
  console.log("❌ Bot bị kick:", reason)
})

bot.on("end", () => {
  console.log("🔄 Bot mất kết nối, reconnect sau 10s...")
  setTimeout(createBot, 10000)
})

bot.on("error", (err) => {
  console.log("⚠️ Lỗi:", err)
})

}

createBot()
