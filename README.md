# 月华
《月华》是一款以**月相变化**为核心机制，结合了牌组构建、竞速、跑分、肉鸽（Rogue-like）等多种机制以及**中国传统元素**的单机游戏，[详情]()（网站建设中）

目前《月华》处于早期开发和概念阶段，预计在3月初会发布第一版初始demo

**demo 不代表最终作品质量**

本仓库是《月华》的前端开发与需求文档编写仓库，旨在记录我的独立开发过程

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

## 总览
### PVE（单机）
**关键词**：Rogue-like（肉鸽）、剧情、牌组构建、跑分

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

* **竞速与对抗**：需要消耗特定数量的月光才能获得前进资格，前进本身不消耗月光
    * 玩家共享同一地图，竞速填充格子并争夺归属权
    * 可能会引入全局事件机制，根据游戏目前复杂度决定，例如：
        * 月光风暴：每隔3回合，月光消耗量翻倍，加速竞争。
        * 干扰区：地图中心区域格子触发机制时，对手需支付1月光才能生效


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
* [地图设计](https://github.com/EthanQC/Moonlight-Radiance-front-end-design/blob/99f56876204bfa610bb44306e74cb4637a67a96b/%E9%9C%80%E6%B1%82%E6%96%87%E6%A1%A3/%E5%9C%B0%E5%9B%BE%E8%AE%BE%E8%AE%A1.md)
    * 分为两张地图，一张为对战地图，一张为竞速地图
    * 对战地图会根据pvp和pve中玩法的不同产生相应的改变
    * 竞速地图为pvp专属，记录玩家对抗进度


其他：
* 如何减少运气的影响？如何平衡功能牌和道具？