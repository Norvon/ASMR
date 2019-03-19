const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getDBTable = tableName => {
  wx.cloud.init();
  const asmrDB = wx.cloud.database({
    env: 'daily-fish-yun-2a3e79'
  })

  let dbTable = asmrDB.collection(tableName)
  return dbTable
}


module.exports = {
  formatTime: formatTime,
  getDBTable: getDBTable
}
