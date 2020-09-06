# Markdown Editor Vue

这是一个实验性质的项目，用于进行[monaco-editor](https://microsoft.github.io/monaco-editor/)的研究。

## 项目目的

1. 从头开始，学习如何使用monaco-editor，包括语法定义，主题定义等
2. 为自己的Markdown编辑器应用做技术储备，以后会尝试借助WebView2创建自己的Markdown编辑器控件并开源
3. monaco-editor的文档太过于匮乏，如此强大的编辑器却难以入门，我欲借此机会通过构建编辑器，将自己的学习体验发布出来以帮助后来者

## 如何使用

项目采用vue2作为主体框架，通过Vue-CLI进行服务配置

1. clone项目到本地
2. 定位到项目目录，在命令行中运行`yarn`以下载依赖包
3. 下载完成后，运行`yarn dev`启动服务
4. 打开浏览器，输入`localhost:8080`以查看编辑器运行效果

## 进度

目前关于monaco-editor的学习成果在[我的博客](https://blog.richasy.cn/code/web/editor/)进行展示。

项目目前还接近完成，仍在进行探索，目前已完成的有

- [x] 编辑器的创建
- [x] 语法的定义
- [x] 主题的配置
- [x] 语法高亮
- [x] 语法解析及渲染（markdown-it）
- [x] 暴露对外方法以便集成
