# 月华

## 项目概述
《月华》是一款以**月相变化**为核心机制，结合了牌组构建、竞速、跑分、肉鸽（Rogue-like）等多种机制以及**中国传统元素**的单机游戏，[详情]()（steam 页面建设中）

目前《月华》处于早期开发和概念阶段，预计在五月初会发布第一版初始demo

**demo 不代表最终作品质量**

本仓库是《月华》的前端开发与需求文档编写仓库，旨在记录我的独立开发过程

目录结构：

    Moonlight-Radiance-front-end-design/
    ├── docs/                           # 项目文档
    │   ├── api/                        # API文档
    │   ├── design/                     # 设计文档
    │   └── development/                # 开发文档
    ├── moonlight-radiance-web/         # 前端项目(React)
    │   ├── public/                     # 静态资源
    │   ├── src/
    │   │   ├── assets/                 # 资源文件
    │   │   │   ├── images/             # 图片资源
    │   │   │   ├── sounds/             # 音效资源
    │   │   │   └── styles/             # 样式文件
    │   │   ├── components/             # 组件
    │   │   │   ├── common/             # 通用组件
    │   │   │   │   ├── Button/
    │   │   │   │   └── Modal/
    │   │   │   └── game/               # 游戏组件
    │   │   │       ├── Board/          # 棋盘
    │   │   │       ├── Card/           # 卡牌
    │   │   │       └── Player/         # 玩家
    │   │   ├── features/               # Redux功能模块
    │   │   │   ├── auth/               # 认证状态
    │   │   │   └── game/               # 游戏状态
    │   │   ├── hooks/                  # 自定义Hooks
    │   │   │   ├── useAuth.ts
    │   │   │   ├── useGame.ts
    │   │   │   └── useWebSocket.ts
    │   │   ├── pages/                  # 页面
    │   │   │   ├── auth/
    │   │   │   ├── game/
    │   │   │   └── home/
    │   │   ├── services/               # API服务
    │   │   │   ├── api/
    │   │   │   └── websocket/
    │   │   ├── types/                  # 类型定义
    │   │   └── utils/                  # 工具函数
    │   └── tests/                      # 测试文件
    └── resources/                      # 共享资源
        ├── images/               
        └── designs/              

## 快速开始

#### 环境要求
* Node.js 16+
* npm 8+

#### 启动步骤
* 安装核心依赖：`npm install`
* 启动项目：
    * 进入项目文件夹：`cd moonlight-radiance-web`
    * 运行：`npm run dev`

## 文档索引
* api 接口
    * [后端接口](https://github.com/EthanQC/Moonlight-Radiance-front-end-design/blob/main/docs/api/%E5%90%8E%E7%AB%AF%E6%8E%A5%E5%8F%A3.md)
* 玩法与剧情设计
    * [玩法总览](https://github.com/EthanQC/Moonlight-Radiance-front-end-design/blob/main/docs/design/%E6%80%BB%E8%A7%88.md)
    * [基础牌设计](https://github.com/EthanQC/Moonlight-Radiance-front-end-design/blob/main/docs/design/%E5%9F%BA%E7%A1%80%E7%89%8C.md)
    * [功能牌设计](https://github.com/EthanQC/Moonlight-Radiance-front-end-design/blob/main/docs/design/%E5%8A%9F%E8%83%BD%E7%89%8C.md)
    * [剧情与章节设计](https://github.com/EthanQC/Moonlight-Radiance-front-end-design/blob/main/docs/design/%E5%89%A7%E6%83%85%E4%B8%8E%E7%AB%A0%E8%8A%82%E8%AE%BE%E8%AE%A1%EF%BC%88pve%EF%BC%89.md)
* 各类开发需求与已实现模块
    * [已实现模块具体细节](https://github.com/EthanQC/Moonlight-Radiance-front-end-design/blob/main/docs/development/implemented.md)
    * [地图](https://github.com/EthanQC/Moonlight-Radiance-front-end-design/blob/main/docs/development/%E5%9C%B0%E5%9B%BE%E8%AE%BE%E8%AE%A1.md)
    * [UI](https://github.com/EthanQC/Moonlight-Radiance-front-end-design/blob/main/docs/development/%E7%95%8C%E9%9D%A2UI%E8%AE%BE%E8%AE%A1.md)
    * [美术与视觉效果](https://github.com/EthanQC/Moonlight-Radiance-front-end-design/blob/main/docs/development/%E7%BE%8E%E6%9C%AF%E8%A7%86%E8%A7%89%E6%95%88%E6%9E%9C.md)
    * [音乐与听觉效果](https://github.com/EthanQC/Moonlight-Radiance-front-end-design/blob/main/docs/development/%E9%9F%B3%E4%B9%90%E5%90%AC%E8%A7%89%E6%95%88%E6%9E%9C.md)
    * [游戏交互机制](https://github.com/EthanQC/Moonlight-Radiance-front-end-design/blob/main/docs/development/%E6%B8%B8%E6%88%8F%E4%BA%A4%E4%BA%92%E6%9C%BA%E5%88%B6%E8%AE%BE%E8%AE%A1.md)
    * [游戏逻辑](https://github.com/EthanQC/Moonlight-Radiance-front-end-design/blob/mian/docs/development/%E6%B8%B8%E6%88%8F%E9%80%BB%E8%BE%91.md)
    * [每章动效 PV](https://github.com/EthanQC/Moonlight-Radiance-front-end-design/blob/main/docs/development/%E7%AB%A0%E8%8A%82%E5%AE%8C%E6%88%90%E5%90%8E%E5%8A%A8%E6%95%88PV%E8%AE%BE%E8%AE%A1.md)
    * [NPC-单机](https://github.com/EthanQC/Moonlight-Radiance-front-end-design/blob/main/docs/development/NPC%E8%AE%BE%E8%AE%A1.md)

#### 开发进度
| 日期 | 当前进度 |
| ------- | ------- |
| 2025.2.15 | 创建了前后端仓库，完成了基本的框架架构设计 |
| 2025.2.16 | 正在完善基本玩法设计，预计1-2天即可完成，随后会马上转向pve玩法的开发；开始编写需求文档 |
| 2025.2.17 | 搭建了项目基本框架，开始写后端服务器的代码，需要学习大量新知识 |
| 2025.2.18 | 准备开始使用虚幻五引擎开发，玩法设计基本完成，只差对战地图设计 |
| 2025.2.19-2.22 | 在出去玩 |
| 2025.2.23 | 初步完成了后端的用户和认证模块的开发，感觉可能3月初做不出来demo了 |
| 2025.2.24 | 画了 pve 第六章的对战地图 |
| 2025.2.25-2.28 | 在上班，详情见碎碎念 |
| 2025.3.1-3.2 | 上班太累了，在出去玩 |
| 2025.3.3 | 把基本的代码框架弄完了，还没细看，不知道该怎么规划开发进度 |
| 2025.3.4-3.7 | 在上班和上学，累 |
| 2025.3.8 | 在改简历 |
| 2025.3.9 | 整理学习计划，准备大学特学一下，希望4月初能出 demo |
| 2025.3.10 | 上班，累，玩，思考目前的项目架构 |
| 2025.3.11 | 看虚幻五官方技术文档，画完了 pve 第四章的对战地图并上传 |
| 2025.3.12 | 上课，写作业，累 |
| 2025.3.13 | 看虚幻五官方文档，感觉到了虚幻五不小的学习成本 |
| 2025.3.14 | 上班，看 MySQL 底层八股，大幅度调整游戏的后端服务器仓库结构 |
| 2025.3.15 | 彻底梳理清楚后端服务器仓库的结构，添加了简易的前端页面，把服务器跑起来并测试了目前已经完成的用户注册、登录和认证模块，它们都没问题，后续可以再根据需求作修改 |
| 2025.3.16 | 完成了卡牌模块的第一版开发，包括分层结构和单元测试，完成后发现需要设计一下游戏联机版的玩法，之前只确定了单机版的，联机版还只是个概念，准备花时间好好构思一下玩法设计；开始规划单机版和联机版的开发日程 |
| 2025.3.17-3.20 | 上班上课，累 |
| 2025.3.21 | 初始化前端项目，准备开始写；把后端服务器的基本模板全写完了，但还要自己一个一个看一个一个调整修改才行 |
| 2025.3.22-3.23 | 增加SQL脚本，搭建前端代码框架 |
| 2025.3.24 | 调整后端路由，添加前端必需文件 |
| 2025.3.25-3.26 | 修改前端 UI 界面，实现了游戏 Home 页的 MVP 版本；修改了后端路由配置，实现了前后端用户以及卡牌模块的 http 通信；完善项目 readme 结构，修改文档模块，补充对已实现模块的详细解释，便于学习 |
| 2025.3.27 | 有点忘了干了啥了，好像是在看已经实现模块的代码然后看了下部署上云的东西 |
| 2025.3.28 | 看已经实现模块的代码，添加 SQL 脚本 |
| 2025.3.29 | 改动了 common 模块，实现了房间模块，开始修改卡牌模块，卡牌模块要改的地方好多啊啊啊，前端也好多要改的啊啊啊啊啊 |
| 2025.3.30-3.31 | 学习虚幻五引擎 |