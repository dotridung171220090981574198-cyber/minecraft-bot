const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'kingsmp.vn', // điền IP server
  port: 25565,
  username: 'tridumgg1234',
  version: '1.21.1'
})

bot.once('spawn', () => {
  console.log('✅ Bot đã vào server')

  setTimeout(() => {
    bot.chat('/dn 1x1x1x1')
    console.log('🔓 Đã login')
  }, 3000)
})

bot.on('windowOpen', (window) => {
  console.log('📦 Đã mở menu:', window.title)

  // slot KingSMP (có thể cần chỉnh)
  const kingSlot = 24

  setTimeout(() => {
    bot.clickWindow(kingSlot, 0, 0)
    console.log('👑 Đã chọn KingSMP')
  }, 2000)
})

bot.on('spawn', () => {
  // mở đồng hồ
  setTimeout(() => {
    const item = bot.inventory.items().find(i => i.name.includes('clock'))
    if (item) {
      bot.activateItem()
      console.log('🕒 Đã mở menu bằng đồng hồ')
    }
  }, 8000)
})

bot.on('kicked', (reason) => {
  console.log('❌ Bị kick:', reason)
})

bot.on('error', (err) => {
  console.log('⚠️ Lỗi:', err)
})


