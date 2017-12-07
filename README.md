# wx-platform 微信公众平台抓取展示页

> 项目现在处于初级阶段

## 目录

```
browser_new // webpack 编译文件
server_express // server & spider 编译文件
```

## 平台

- node v9.0
- yarn v1.3.2
- mongo
- windows or linux or mac os

## 使用

1. 必须要有自己的微信公众号平台，并且登录
2. 在素材插入页面，选择从其它公众号插入，`chrome` 分析页面，复制其`cookie` and `token`
3. 将 `cookie` 放在 `server_express` 文件夹下的 `cookie` 文件中, `token` 复制在 `config.js` 文件中的token值中
4. 进入 `server_express` 文件夹，输入命令，如果报错查看是否启动 `mongodb` 
```bash
npm install
npm run inittest
```
5. 输入命令，启动7780端口的服务器
```bash
npm run dev
```
6. 进入 `browser_new` 文件夹，输入命令
```bash
npm install
npm run dev
```