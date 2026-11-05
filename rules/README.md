# wmsxwd 直连规则

整理日期：2026-11-05。此分支用于存放公开分流规则的固定快照。

## 导入地址

```text
https://raw.githubusercontent.com/a2492231547-creator/Antigravity_Divination/wmsxwd-rules/rules/all-direct.yaml
```

只导入这一份合并版，不要叠加同来源的旧规则。YAML 使用 rules 数组；all-direct.list 是内容相同的纯文本备用版本。

## 内容

- 中国大陆规则：3721 条。
- 微信规则：30 条。
- 微信及小程序相关规则：123 条。
- 合并移除 36 条完全重复的规则，合计 **3838 条**。
- 所有条目明确指定 `DIRECT`；IP 条目使用 `DIRECT,no-resolve`。
- 不包含代理组名称、`MATCH` 兜底或规则集引用。

## 兼容范围与验收

采用 DOMAIN、DOMAIN-SUFFIX、DOMAIN-KEYWORD、IP-CIDR、IP-CIDR6。原始来源中的 1 条 IP-ASN 与 11 条 DOMAIN-REGEX 记录在 validation.json，未纳入兼容版。该选择依据是当前客户端导入条数与规则类型的对应关系，不表示穷尽验证所有客户端版本。

导入后展开检查：域名条目应以 DIRECT 结束，IP 条目应以 DIRECT,no-resolve 结束。文件检查不等于实际连接命中检查。

本文件保留来源的匹配范围，包含来源列出的部分共用云服务地址；没有逐一独立验证所有地址的地域与归属。它是固定快照，不会自动合并上游更新。

## 来源与作者

- [blackmatrix7 China](https://github.com/blackmatrix7/ios_rule_script/blob/master/rule/Clash/China/China_Classical.yaml)
- [blackmatrix7 WeChat](https://github.com/blackmatrix7/ios_rule_script/blob/master/rule/Clash/WeChat/WeChat.yaml)
- [CHENHUI-X WeChat miniapp](https://gist.githubusercontent.com/CHENHUI-X/531e1aed9591067ad255945ffdec5158/raw/0ae59eda829618b9c5a04a13eed92237cc4ead43/wechat-direct.stoverride)

详细来源哈希、排除条目与合并计数见 [validation.json](validation.json)。
