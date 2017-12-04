import { dbUrl, firstUser } from '../config'
import { consoleType } from '../util/console'

const mongoose = require('mongoose')
const User = require('../models/user')
mongoose.Promise = require('bluebird')
mongoose.connect(dbUrl, {
  useMongoClient: true
})
/**
 * post body 注册得到的数据请求处理
 * @param {*请求} req
 * @param {*返回} res
 */
export async function signup (req, res) {
  let _user = req.body
  if (!isValidParamError(_user)) {
    res.status(400).send(consoleType(1, '非法', '参数不合法'))
  }
  const userCount = await getUsersCount()
  if (userCount === firstUser) {
    _user.role = 50
  }
  const isExist = await isUserExistByUser(_user)
  if (isExist) {
    res.status(409).send(consoleType(1, '重复', '相同登录名用户已存在')) // 相同登录名用户已存在
  } else {
    const _id = await insertUserRetId(_user)
    res.status(200).send(consoleType(0, '成功', '注册登录成功', {
      token: _id
    })) // 暂时先用 _id 去标识 auth-token
  }
}
/**
 * get query 登录得到的数据请求处理
 * @param {*请求} req
 * @param {*返回} res
 */
export async function signin (req, res) {
  let _user = req.query
  if (!isValidParamError(_user)) {
    res.status(400).send(consoleType(1, '非法', '参数不合法'))
  }
  try {
    const user = await isUserExistByUser(_user)
    if (!user) {
      res.status(401).send(consoleType(1, '重复', '用户名不存在')) // 用户名不存在
    } else {
      const isMatch = await user.comparePassword(_user.password)
      if (isMatch) {
        await User.update({ _id: user._id }, { $inc: { pv: 1 } })
        res.status(200).send(consoleType(0, '成功', '登录成功', {
          token: user._id
        })) // 暂时先用 _id 去标识 auth-token
      } else {
        res.status(401).send(consoleType(1, '警告', '登录失败：密码错误')) // 登录失败：密码错误
      }
    }
  } catch (error) {
    res.status(404).send(consoleType(2, '错误', error))
  }
}
// 数据库的方法重用

async function getUsersCount () {
  const users = await User.find()
  return users.length
}

async function isUserExistByUser (_user) {
  const user = await User.findOne({ username: _user.username })
  if (user) {
    return user
  } else {
    return false
  }
}

async function insertUserRetId (user) {
  let _user = new User(user)
  const resUser = await _user.save()
  return resUser._id
}

function isValidParamError (user) {
  if (user.username && user.password) {
    return true
  } else {
    return false
  }
}
