const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'IP_SERVER',
    port: 25565,
    username: 'Bot24_7',
    version: '1.21.1'
  })

  bot.on('login', () => {
    console.log('✅ Bot đã vào server')
  })

  bot.on('end', () => {
    console.log('🔁 Bot out, reconnect sau 5s')
    setTimeout(createBot, 5000)
  })

  bot.on('kicked', (reason) => {
    console.log('❌ Bị kick:', reason)
  })
}

createBot()