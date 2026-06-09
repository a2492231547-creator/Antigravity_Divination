# 🌌 AntiGravity 占卜 (梅花易数排盘系统)

一款融合古风水墨美学与现代科技的梅花易数排盘占卜工具。界面采用扁平化磨砂玻璃（Glassmorphism）与水墨晕染动效，支持多端运行。

---

## 📱 支持平台与获取

本系统为 100% 纯客户端离线运行，不收集任何用户隐私数据，计算速度极快。

*   **🖥️ Windows 桌面版**：单文件绿色免安装版，双击即可直接运行。
    *   位于：`plum-blossom-divination/dist/AntiGravity占卜.exe`
*   **📱 Android 移动版**：专为手机竖屏适配的安卓安装包。
    *   位于：根目录下的 `AntiGravity占卜_安卓版.apk`
*   **🌐 Web 网页版**：包含纯静态 HTML/CSS/JS 的压缩包，可一键部署至 Vercel, Netlify 等免费平台。
    *   位于：根目录下的 `AntiGravity占卜_网页版.zip`

---

## ✨ 核心特性

*   **🎨 水墨古风美学**：黛黑主色调、朱砂红高亮，配合动态太极旋转、水墨微光闪烁，带来极致的沉浸感。
*   **🔮 多种起卦方式**：
    *   **时间起卦**：根据公历/农历时间以及时辰自动换算干支并起卦。
    *   **数字起卦**：支持输入两个/三个数字进行起卦。
    *   **手发起卦**：支持手动指定上下卦及动爻。
*   **⚖️ 体用生克智能解析**：自动划分体卦、用卦、互卦、变卦，并动态计算生克比和关系，配合指向性箭头清晰展示。
*   **🧭 先天八卦易理全图**：交互式八卦图盘，点击任意卦象即可查看其象征意向、五行属性、方位等详细易理知识。
*   **📱 完美屏幕自适应**：原生 App 内置多套媒体查询规则，完美适配各类窄屏手机，八卦图盘自动等比缩放。

---

## 📂 项目结构

```text
├── index.html          # 网页结构主体
├── style.css           # 水墨动效与响应式布局样式表
├── divination.js       # 梅花易数核心排盘及生克计算算法
├── solarlunar.min.js   # 农历与干支换算服务库
├── taiji_icon.png      # 软件图标 (高保真透明太极)
├── taiji_icon.ico      # 桌面版 ICO 图标
├── ink_wash_bg.png     # 水墨宣纸背景图
├── app.py              # 桌面版 Python (PyWebView) 包装脚本
└── .gitignore          # Git 忽略配置文件
```

---

## 🛠️ 构建与编译

### 1. 桌面版 (Windows EXE) 编译
需要安装 Python 并安装依赖 `pip install pywebview pyinstaller`。然后在命令行中运行：
```bash
pyinstaller --clean --onefile --noconsole --name "AntiGravity占卜" --icon=taiji_icon.ico --add-data "index.html;." --add-data "style.css;." --add-data "divination.js;." --add-data "solarlunar.min.js;." --add-data "ink_wash_bg.png;." --add-data "taiji_icon.ico;." app.py
```

### 2. 安卓版 (Android APK) 编译
项目采用了 Google 官方的 Android CLI 工具链，基于 Kotlin + Jetpack Compose 封装：
1. 本地网页资源存放于 `app/src/main/assets` 目录中。
2. 运行 `./gradlew.bat assembleDebug` 即可在 `app/build/outputs/apk/debug/` 目录下生成最新的 `app-debug.apk` 安装包。
