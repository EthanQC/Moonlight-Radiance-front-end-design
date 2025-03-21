# 月华
《月华》是一款以**月相变化**为核心机制，结合了牌组构建、竞速、跑分、肉鸽（Rogue-like）等多种机制以及**中国传统元素**的单机游戏，[详情]()（steam 页面建设中）

目前《月华》处于早期开发和概念阶段，预计在五月初会发布第一版初始demo

**demo 不代表最终作品质量**

本仓库是《月华》的前端开发与需求文档编写仓库，旨在记录我的独立开发过程

## 项目结构

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

## 创建项目

    npm create vite@latest moonlight-radiance-web -- --template react-ts

    cd moonlight-radiance-web

## 安装核心依赖

    sudo apt update
    sudo apt install nodejs npm

    node -v
    npm -v

    npm install @reduxjs/toolkit react-redux @tanstack/react-query antd @ant-design/icons
    npm install konva react-konva socket.io-client
    npm install tailwindcss postcss autoprefixer
    npm install react-router-dom axios

    // 初始化 TailwindCSS
    npx tailwindcss init -p

## 总览
目前游戏分为两版，联机版和单机版

单机版用虚幻五引擎开发，联机版用 Go 作为后端，React 作为前端，但也可能后续继续用虚幻五做前端 UI

### PVE（单机）
**关键词**：Rogue-like（肉鸽）、剧情、牌组构建、跑分

#### 技术选型
* **游戏引擎**：虚幻五
* **开发语言**：cpp

#### 基本玩法
一共六章，每章会有不同的通关要求，每通过一章之后，会获取剧情碎片或观看CV（视剧情工作量而定）

每个章节都有自己独特的功能牌，然后通过前五个章节，要求玩家进行牌组构建，考验他们对过牌、环境和策略的平衡，然后到第六章的时候需要玩家使用自己构建好的牌组，与一个和玩家牌组完全一样的ai对战，也就是要求玩家**战胜自己，与自己和解**

肉鸽元素目前考虑的是结合剧情一起，加入轮回或多线叙事等机制

完成每个章节后玩家会依次：
* 净化牌库：移除一张功能牌
* 星辉灌注（3）：二选一
    * 为1张基础牌灌注星辉，触发时额外+1月光
    * 为1张技能牌灌注星辉，不同技能牌效果不同

### PVP
**关键词**：竞速、牌组构建、对抗

#### 技术选型
* 后端服务器：
    * go手搓
    * Redis
* 前端：
    * React
    * TypeScript
    * Vite

#### 基本玩法
* **竞速与对抗**：需要消耗特定数量的月光才能获得前进资格，前进本身不消耗月光
    * **竞速阶段**：玩家们会在一张竞速地图上竞速，通过到达终点获得胜利
    * **对战阶段**：随着竞速阶段的进行，玩家们会在不同的对战地图上对战，通过打出基础牌和功能牌获得月光值
    * 可能会引入全局事件机制，根据游戏目前复杂度决定，例如：
        * 月光风暴：每隔3回合，月光消耗量翻倍，加速竞争。
        * 干扰区：地图中心区域格子触发机制时，对手需支付1月光才能生效

会包括匹配功能和多人联机功能，也就是可以自己开房间跟朋友一起联机，也可以线上匹配跟其他陌生人一起玩

### 核心玩法机制
| 牌组构建 | 触发 | 地图设计 |
| ------- | ------- | ------- |

* **牌组构建**：主要为构建功能牌
    * 初始时，[基础牌库](https://github.com/EthanQC/Moonlight-Radiance-front-end-design/blob/main/%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/%E5%9F%BA%E7%A1%80%E7%89%8C.md)（月相牌）为8张，[功能牌库](https://github.com/EthanQC/Moonlight-Radiance-front-end-design/blob/main/%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/%E5%8A%9F%E8%83%BD%E7%89%8C.md)为4张
    * **玩家每回合能且只能打出一张基础牌，但能打出的功能牌无数量限制**
    * 玩家开始其第一个回合时，从基础牌库摸2张牌，从功能牌库摸1张牌
    * 玩家开始其后续回合时，只需将基础牌和功能牌各补至3张
    * 基础牌手牌上限为3，功能牌手牌上限会随着游戏进程而改变，依次为3，3，4，5，6，7
* **触发**：（计分机制，所有机制均可多次同时并行触发，无限制，也就是说如果有多条路径能触发，一并计算）
    * 同相：打出一张牌使得相同的牌相邻时，获得1点月光
    * 反相：打出一张牌使得相反的牌相邻时，获得2点月光
        * 相反：两张牌的月相刚好一起能组成满月
    * 月相周期：打出一张牌使得相邻的牌能组成连续的月相
        * 至少三张才称为连续，可获得3-8点月光
        * 月相顺序：空——弯——半——椭——满，左右皆可
    * 牌的归属：打出一张牌满足上面任意一种机制时，所有组成这种机制的牌均归这张牌的打出者
        * 牌的归属会随月相牌或功能牌的打出而实时改变
        * 地图放满基础牌时，每有一张基础牌归属于你，你额外获得1点月光
* [地图设计](https://github.com/EthanQC/Moonlight-Radiance-front-end-design/blob/e00c68d8a637865c63f60fd50db898a92f92d9bf/%E9%9C%80%E6%B1%82%E6%96%87%E6%A1%A3/%E5%9C%B0%E5%9B%BE%E8%AE%BE%E8%AE%A1.md)
    * 分为两张地图，一张为对战地图，一张为竞速地图
    * 对战地图会根据pvp和pve中玩法的不同产生相应的改变
    * 竞速地图为pvp专属，记录玩家对抗进度


其他：
* 如何减少运气的影响？如何平衡功能牌和道具？

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