import chalk from 'chalk'

const log = console.log
// const TYPE = ['bgcyan', 'bgYellow', 'bgRed']

export function consoleType (typeIndex, prefix, msg) {
  let jsonData = {}
  switch (typeIndex) {
    case 0:
      log(chalk.bgGreen(` √ ${prefix} `) + ` > ${msg}`)
      
      break
    case 1:
      log(chalk.yellow(` ! ${prefix} `) + ` > ${msg}`)
      break
    case 2:
      log(chalk.bgRed(` × ${prefix} `) + ` > ${msg}`)
      break
    default:
      log(chalk.bgBlack(` - ${prefix} > ${msg}`))
      break
  }
  jsonData.base_resp = {
    ret: typeIndex,
    err_msg: `${prefix} > ${msg}`
  }
  return JSON.stringify(jsonData)
}
