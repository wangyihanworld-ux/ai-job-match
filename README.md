# AI 求职智能匹配与简历优化助手

[![tests](https://github.com/wangyihanworld-ux/ai-job-match/actions/workflows/html-check.yml/badge.svg)](https://github.com/wangyihanworld-ux/ai-job-match/actions/workflows/html-check.yml)

面向求职场景的前端交互原型：根据用户填写的能力描述和岗位 JD，演示能力标签提取、岗位匹配、能力缺口诊断与 STAR 表达优化。

> 本项目是静态 Demo，所有分析逻辑在浏览器本地以规则模拟完成，**不调用大模型或外部 AI API**。页面中的匹配度、岗位信息和量化示例仅用于展示交互与表达方法，不构成求职、招聘或职业建议。

## 功能

- 从能力描述中提取硬技能、软技能和经历要点
- 基于意向城市与技能标签筛选演示岗位
- 根据岗位 JD 做规则化能力缺口诊断
- 提供 STAR 结构的简历表达对照示例
- 导出当前页面内容为 HTML 文件

## 本地运行

这是一个单页静态原型，无需构建步骤：直接用浏览器打开 `index.html` 即可。运行 `npm test` 可执行输入转义与页面静态安全测试。

`package.json` 保留用于生成方案文档时的 `docx` 依赖和自动化测试入口；页面运行本身不依赖 Node.js。用户输入在插入结果区域前会进行 HTML 转义。

## 项目结构

```text
.
├── index.html         # 完整交互 Demo（HTML、CSS、JavaScript）
├── 方案说明文档.md     # 产品/方案说明源码
├── 方案说明文档.docx   # 可下载的文档版本
├── package.json        # 文档生成相关依赖
└── .github/workflows/  # 静态页面基础检查
```

## 数据与隐私

用户填写的能力描述和 JD 仅在当前浏览器页面内处理；本静态 Demo 不会将它们提交到服务器。请勿在演示页面输入身份证号、联系方式、薪资明细等敏感个人信息。

## 开源许可

暂未添加许可证。若希望他人可合法复用，请补充 `MIT License` 或其他适合的许可证。
