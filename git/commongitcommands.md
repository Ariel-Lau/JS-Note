## 官方文档地址：https://git-scm.com/docs

## 名词解释：
```
Workspace：工作区
Index / Stage：暂存区
Repository：仓库区（或本地仓库）
Remote：远程仓库
```

## 查看历史操作
`git reflog        # 该指令输出详细的操作历史，包括提交，操作，修改等`

## 修改注释
`git commit --amend 或 git commit -amend -m “Fixes bug #42”`

## gitk 字符集编码：
```
git config --global gui.encoding utf-8    # 在git GUI中使用UTF-8编码
gitk --all & 
```

## 配置
```
git config --global user.name “ihoey”           # 设置git用户名
git config --global user.email “mail@ihoey.com” # 设置git邮箱
git config --global color.ui true               # 为true是终端着色

git config --global alias.co checkout           # 配置checkout的别名
git config --global alias.ci commit             # 配置commit的别名
git config --global alias.cm commit             # 配置commit的别名
git config --global alias.st status             # 配置status的别名
git config --global alias.br branch             # 配置branch的别名
git config --global alias.cp cherry-pick        # 配置cherry-pick的别名
 git config --global alias.rb rebase            # 配置rebase的别名

git config --sglobal core.editor “mate -w”       # 设置Editor使用textmate
git config -l                                   # 列举所有配置
#用户的git配置文件~/.gitconfig
```
## SSH 秘钥
`ssh-keygen -t rsa -C "mail@ihoey.com"`
* 连续3个回车。如果不需要密码的话。
* 最后得到了两个文件：`id_rsa`和`id_rsa.pub`，在`~/.ssh/`文件夹下面
* `id_rsa`为你的私钥，不可以告诉别人
* `id_rsa.pub`为你的公钥，一般会放在你的服务器做ssh登录，或者放在github上面

## 基本命令
```
git init            # 创建git仓库
git add fileName / git add ./ git add -u        # 添加文件到暂存区
git commit -m “版本提交信息”            # 提交文件到仓库
git status              # 查看文件提交状态
git diff readme.txt             # 查看文件修改的信息

git help <command>          # 显示command的help
git show                    # 显示某次提交的内容
git show $id
git checkout  — <file>     # 抛弃工作区修改
git checkout  .             # 抛弃工作区修改
git add <file>              # 将工作文件修改提交到本地暂存区
git add .                   # 将所有修改过的工作文件提交暂存区
git rm <file>               # 从版本库中删除文件
git rm <file> —cached      # 从版本库中删除文件，但不删除本地文件
git reset <file>            # 从暂存区恢复到工作文件
git reset — .              # 从暂存区恢复到工作文件
git reset --hard            # 恢复最近一次提交过的状态，即放弃上次提交后的所有本次修改
git reset --soft
git reset SHA1 ID           # 恢复指定提交
git commit -m “some comments”
git revert <$id>            # 恢复某次提交的状态，恢复动作本身也创建了一次提交对象
git revert HEAD             # 恢复最后一次提交的状态
```

## 查看文件
```
git diff <file>                 # 比较当前文件和暂存区文件差异
git diff
git diff <$id1> <$id2>          # 比较两次提交之间的差异
git diff <branch1>..<branch2>   # 在两个分支之间比较
git diff —staged               # 比较暂存区和版本库差异
git diff —cached               # 比较暂存区和版本库差异
git diff —stat                 # 仅仅比较统计信息
```

## 查看提交记录
```
git log
git log <file>      # 查看该文件每次提交记录
git log -p <file>   # 查看每次详细修改内容的diff
git log -p -2       # 查看最近两次详细修改内容的diff
git log —stat      # 查看提交统计信息
```

## 分支管理
```
git branch -l                           # 查看本地分支
git branch -r                           # 查看远程分支
git branch <new_branch>                 # 创建新的分支
git branch -v                           # 查看各个分支最后提交信息
git branch —merged                     # 查看已经被合并到当前分支的分支
git branch —no-merged                  # 查看尚未被合并到当前分支的分支
git checkout <branch>                   # 切换到某个分支
git checkout -b <new_branch>            # 创建新的分支，并且切换过去
git checkout -b <new_branch> <branch>   # 基于branch创建新的new_branch
git checkout $id       # 把某次历史提交记录checkout出来，但无分支信息，切换到其他分支会自动删除
git checkout $id -b <new_branch>        # 把某次历史提交记录checkout出来，创建成一个分支
git branch -d <branch>                  # 删除某个分支
git branch -D <branch>    # 强制删除某个分支 (未被合并的分支被删除的时候需要强制)
```

## 强行切换分支
`git checkout -f branch_name`

## 强制checkout分支覆盖本地文件
`git checkout -f branch_name`

## 分支合并和rebase
```
git merge <branch>               # 将branch分支合并到当前分支
git merge —no-ff <branch>       # 不要Fast-Foward合并，这样可以生成merge提交
git rebase master <branch>       # 将master rebase到branch，相当于：
git checkout <branch> && git rebase master && git checkout master && git merge <branch>
```


======================================================================

## 一、新建代码库
```
# 在当前目录新建一个Git代码库
$ git init
# 新建一个目录，将其初始化为Git代码库
$ git init [project-name]
# 下载一个项目和它的整个代码历史
$ git clone [url]
```
## 二、配置
Git的设置文件为.gitconfig，它可以在用户主目录下（全局配置），也可以在项目目录下（项目配置）。
```
# 显示当前的Git配置
$ git config --list
# 编辑Git配置文件
$ git config -e [--global]
# 设置提交代码时的用户信息
$ git config [--global] user.name "[name]"
$ git config [--global] user.email "[email address]"
```
## 三、增加/删除文件
```
# 添加指定文件到暂存区
$ git add [file1] [file2] ...
# 添加指定目录到暂存区，包括子目录
$ git add [dir]
# 添加当前目录的所有文件到暂存区
$ git add .
# 添加每个变化前，都会要求确认
# 对于同一个文件的多处变化，可以实现分次提交
$ git add -p
# 删除工作区文件，并且将这次删除放入暂存区
$ git rm [file1] [file2] ...
# 停止追踪指定文件，但该文件会保留在工作区
$ git rm --cached [file]
# 改名文件，并且将这个改名放入暂存区
$ git mv [file-original] [file-renamed]
```
## 四、代码提交
```
# 提交暂存区到仓库区
$ git commit -m [message]
# 提交暂存区的指定文件到仓库区
$ git commit [file1] [file2] ... -m [message]
# 提交工作区自上次commit之后的变化，直接到仓库区
$ git commit -a
# 提交时显示所有diff信息
$ git commit -v
# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
$ git commit --amend -m [message]
# 重做上一次commit，并包括指定文件的新变化
$ git commit --amend [file1] [file2] ...
```
## 五、分支
```
# 列出所有本地分支
$ git branch
# 列出所有远程分支
$ git branch -r
# 列出所有本地分支和远程分支
$ git branch -a
# 新建一个分支，但依然停留在当前分支
$ git branch [branch-name]
# 新建一个分支，并切换到该分支
$ git checkout -b [branch]
# 新建一个分支，指向指定commit
$ git branch [branch] [commit]
# 新建一个分支，与指定的远程分支建立追踪关系
$ git branch --track [branch] [remote-branch]
# 切换到指定分支，并更新工作区
$ git checkout [branch-name]
# 切换到上一个分支
$ git checkout -
# 建立追踪关系，在现有分支与指定的远程分支之间
$ git branch --set-upstream [branch] [remote-branch]
# 合并指定分支到当前分支
$ git merge [branch]
# 选择一个commit，合并进当前分支
$ git cherry-pick [commit]
# 删除分支
$ git branch -d [branch-name]
# 删除远程分支
$ git push origin --delete [branch-name]
$ git branch -dr [remote/branch]
```
## 六、标签
```
# 列出所有tag
$ git tag
# 新建一个tag在当前commit
$ git tag [tag]
# 新建一个tag在指定commit
$ git tag [tag] [commit]
# 删除本地tag
$ git tag -d [tag]
# 删除远程tag
$ git push origin :refs/tags/[tagName]
# 查看tag信息
$ git show [tag]
# 提交指定tag
$ git push [remote] [tag]
# 提交所有tag
$ git push [remote] --tags
# 新建一个分支，指向某个tag
$ git checkout -b [branch] [tag]
```
## 七、查看信息
```
# 显示有变更的文件
$ git status
# 显示当前分支的版本历史
$ git log
# 显示commit历史，以及每次commit发生变更的文件
$ git log --stat
# 搜索提交历史，根据关键词
$ git log -S [keyword]
# 显示某个commit之后的所有变动，每个commit占据一行
$ git log [tag] HEAD --pretty=format:%s
# 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
$ git log [tag] HEAD --grep feature
# 显示某个文件的版本历史，包括文件改名
$ git log --follow [file]
$ git whatchanged [file]
# 显示指定文件相关的每一次diff
$ git log -p [file]
# 显示过去5次提交
$ git log -5 --pretty --oneline
# 显示所有提交过的用户，按提交次数排序
$ git shortlog -sn
# 显示指定文件是什么人在什么时间修改过
$ git blame [file]
# 显示暂存区和工作区的差异
$ git diff
# 显示暂存区和上一个commit的差异
$ git diff --cached [file]
# 显示工作区与当前分支最新commit之间的差异
$ git diff HEAD
# 显示两次提交之间的差异
$ git diff [first-branch]...[second-branch]
# 显示今天你写了多少行代码
$ git diff --shortstat "@{0 day ago}"
# 显示某次提交的元数据和内容变化
$ git show [commit]
# 显示某次提交发生变化的文件
$ git show --name-only [commit]
# 显示某次提交时，某个文件的内容
$ git show [commit]:[filename]
# 显示当前分支的最近几次提交
$ git reflog
```
## 八、远程同步
```
# 下载远程仓库的所有变动，不会自动和本地分支代码merge，需要手动merge
$ git fetch [remote]
# 显示所有远程仓库
$ git remote -v
# 显示某个远程仓库的信息
$ git remote show [remote]
# 增加一个新的远程仓库，并命名
$ git remote add [shortname] [url]
# 取回远程仓库的变化，并与本地分支合并
$ git pull [remote] [branch]
# 上传本地指定分支到远程仓库
$ git push [remote] [branch]
# 强行推送当前分支到远程仓库，即使有冲突
$ git push [remote] --force
# 推送所有分支到远程仓库
$ git push [remote] --all
```
## 九、撤销
```
# 恢复暂存区的指定文件到工作区
$ git checkout [file]
# 恢复某个commit的指定文件到暂存区和工作区
$ git checkout [commit] [file]
# 恢复暂存区的所有文件到工作区
$ git checkout .
# 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
$ git reset [file]
# 重置暂存区与工作区，与上一次commit保持一致
$ git reset --hard
# 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
$ git reset [commit]
# 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
$ git reset --hard [commit]
# 重置当前HEAD为指定commit，但保持暂存区和工作区不变
$ git reset --keep [commit]
# 新建一个commit，用来撤销指定commit
# 后者的所有变化都将被前者抵消，并且应用到当前分支
$ git revert [commit]
# 暂时将未提交的变化移除，稍后再移入
$ git stash
$ git stash pop
```
## 十、其他
```
# 生成一个可供发布的压缩包
$ git archive
```