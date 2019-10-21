# pc_haojia_vue

## 目录结构

```
pc_haojia_vue
├── build                     # webpack相关配置
│   ├── base.js
│   ├── config.js
│   ├── dev.js
│   └── prod.js
├── lib                       # 公共仓库资源目录，引用路径为'lib/**/*'
│   ├── css                   # 公共仓库css资源
│   ├── img                   # 公共仓库img资源
│   ├── js                    # 公共仓库js资源
│   ├── package.json
│   ├── readme.md
│   └── tpl                   # 公共仓库ejs资源
├── package-lock.json         # npm版本锁
├── package.json
├── readme.md
└── src                       # 开发目录
    ├── assets                # 图片等资源目录
    ├── commons               # 通用资源目录
    │   ├── js                # 通用js
    │   └── style             # 通用scss
    └── pages                 # 入口文件及相关资源
        └── demo
            ├── assets        # 图片等资源
            ├── components    # 私有组件
            ├── index.ejs     # ejs模版，命名需要和入口文件js相同
            ├── index.js      # 入口文件
            └── index.vue     # vue组件
```

## 依赖安装
> 请勿使用cnpm package，部分依赖使用公司内部仓库发布，需要设置registry后通过npm获取   
> 需要配置`npm-team.smzdm.com` host: 120.132.70.128

```
npm set registry https://npm-team.smzdm.com
npm install
```

## 公共资源拉取
公共资源存放于pc_global仓库，使用`git subtree`进行使用及更新。

具体流程如下：

### 设置公共仓库remote
该步骤意在简化subtree命令，设置pc_global仓库remote：

```shell
git remote add -f pcglobal https://gitlab-team.smzdm.com/fe/pc_global.git
```

### 在本仓库中新增公共仓库
该步骤用于拉取公共资源／组件到`lib`文件夹，**仅在仓库项目搭建时使用：**

```shell
git subtree add --prefix=lib pcglobal master
```

### 从公共仓库拉取更新
该步骤在公共仓库代码 **有更新** 时使用，拉取最新的公共资源／组件：

```shell
git subtree pull --prefix=lib pcglobal master
```

### 推送修改到公共仓库
该步骤在开发过程中修改了公共资源／组件时使用，请在 **确保不影响其他事业部页面** 的情况下推送：

```shell
git subtree push --prefix=lib pcglobal master
```

## 开发环境

执行以下命令即可启动 webpack 开发调试服务器，可在浏览器输入[http://localhost:8080](http://localhost:8080)预览项目文件：

```
npm run dev
```

服务端口默认为8080，如果因为8080端口被占用而希望启用其他端口，需要追加端口参数配置，如下：

```
npm run dev --port=8082
```

修改代码后保存，会根据代码的修改情况进行自动热替换／刷新页面。

### 生产环境

```
npm run build        # 打包后无sourceMap，资源压缩
npm run build:debug  # 打包后包含sourceMap，资源未压缩
```