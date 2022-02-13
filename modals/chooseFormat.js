document.getElementById('cancel').addEventListener('click', () => {
  window.close()
})

document.getElementById('export').addEventListener('click', () => {
  const format = 'html'
  window.ipcApi.sendFormat(format)
  window.close()
})
