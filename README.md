English | [简体中文](./README.zh-CN.md)

# 

## Features

- :gem: **Neat Design**: Follow [Ant Design specification](http://ant.design/)
- :triangular_ruler: **Common Templates**: Typical templates for enterprise applications
- :rocket: **State of The Art Development**: Newest development stack of React/dva/antd
- :iphone: **Responsive**: Designed for varies of screen size
- :art: **Theming**: Customizable theme with simple config
- :globe_with_meridians: **International**: Built-in i18n solution
- :gear: **Best Practice**: Solid workflow make your code health
- :1234: **Mock development**: Easy to use mock development solution
- :white_check_mark: **UI Test**: Fly safely with unit test and e2e test

## Templates未完待续

```
- layout
 - BaseLayout     用于工程基础页面,涉及页面权限,等页面放在此框
 - Exception      用于页面错误的分发
 - UserLayout     用于用户登录等业务的分发
 - StaticLayout   用于无交互,无权限静态页面的分发,后期可扩展
- model       --model使用jsx格式会报错,使用js文件,
 - gobal      页面全局交互使用
 - user       用户信息数据

- route
 - Home         系统首页
   - IndexPage    首页
   - ChartList    首页图标查看全部页面
 -Details       数据详情页面
   - Detail  一级详情页面
 -Demention     地表数据页面
 - Login        用户登录页面相关
   - WeChartLogin        用户登录页面,工程的入口页面
```

## Usage

```bash
$ npm install
$ npm start         # visit http://localhost:8000
```

