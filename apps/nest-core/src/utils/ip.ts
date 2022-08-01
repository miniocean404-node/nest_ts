import os from 'os'

//获取 mac windows ip 地址
export function getIpAddress() {
  // 网络接口
  const interfaces = os.networkInterfaces()

  const Inter = interfaces['WLAN'] || interfaces['en0']

  for (const value of Inter) {
    const { family, address, internal } = value
    if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
      return address
    }
  }
}
