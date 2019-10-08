<!-- 切换分支 -->
# Git checkout develop
# Git pull （拉取最新）

<!-- 提交 -->
# Git add .
# Git commit -m “xxx”
# Git push origin
# Git push origin xxx  （推送）

<!-- 版本回退 -->
# git log -3
# commit 4dc08bb8996a6ee02f
<!-- 回滚到指定的版本 -->
# 1, git reset --hard da872c30f87db14746251960572411331226895e
<!-- 强制提交 -->


<!-- 登陆测试服务器下载zip -->
# ssh test_zhidemai@10.131.0.180
# 输入密码：****

# 运行脚本：/data/download_file.sh  url
Eg:/data/download_file.sh http://artifactory.rnd.meizu.com:8081/artifactory/Internet-Business-snapshot-local/com/meizu/ipdfe-admin-external/admin-life-external/1.0.2-SNAPSHOT/admin-life-external-1.0.2-20190827.075544-1-resources.zip

# 下载包：scp 方法
# scp test_zhidemai@10.131.0.180:~/zip包名 ./
eg:scp test_zhidemai@10.131.0.180:~/admin-life-external-1.0.2-20190827.075544-1-resources.zip ./

下载包：sz 方法


a 写入
:q. 退出
:wq 保存并退出