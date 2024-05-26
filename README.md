# 宣讲会导航

![预览](https://github.com/crazyurus/recruit-miniprogram/actions/workflows/preview.yml/badge.svg) 
![上传](https://github.com/crazyurus/recruit-miniprogram/actions/workflows/upload.yml/badge.svg)

宣讲会导航小程序，为高校学生提供了校内宣讲会以及就业招聘信息，信息来源于各个高校的就业信息网。

## 使用

微信扫码小程序码

![QRCode](images/qrcode.jpg)

## 运行项目

1. 在终端打开项目，安装依赖

```bash
$ npm install
```

2. 修改 `project.config.json` 中的 `appid` 为你自己的 AppID，如果没有请先到微信公众平台注册或使用测试号。

3. 打开 **微信开发者工具**，导入此项目

4. 点击菜单栏，**工具** — **构建 npm** 完成依赖的构建

5. 点击右上角 详情，打开 本地设置 Tab，勾选 **不校验合法域名、web-view（业务域名）、TLS 版本及 HTTPS 证书**

6. 完成后，项目即可在 **微信开发者工具** 正常运行