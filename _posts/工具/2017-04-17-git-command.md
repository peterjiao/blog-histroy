---
layout: post
title:  "Git常用命令总结"
date:   2017-04-17 16:06:05
categories: Tools 
tags: Git Tools 
---

* content
{:toc}

>Git常用命令总结。



# Git

# 分支

## 查

### 查看本地分支

`git branch`

### 查看远程分支

```
$ git branch -r
```

### 查看所有分支(本地和远程)

`$ git branch -a`

`git branch -av`



### 增

### clone远程非主分支

`git checkout origin/<branchName>`

`git checkout -b <localBranchName> origin/<remoteBranchName>`

使用`-t`参数，默认建立一个和远程分支同名的分支

`git checkout -t origin/<remoteBranchName>`

### clone远程主分支

`git clone <url>`



### 改

### 重命名本地分支

`git branch -m devel develop`

### 重命名远程分支

1.删除远程分支2.重命名本地分支3.推

```
#查看
$ git branch -av
* feature-renames
remotes/origin/feature-renames
#删除
git push --delete origin feature-renames
#重命名本地
git branch -m feature-renames feature-rename
#推
git push origin feature-rename

```







### 删

### 删除本地分支

#### 删除merge了的分支

`git branch -d <banchName>`

#### 删除分支无论是否merge

`git branch -D <banchName>`



### 删除远程分支

推送一个空的分支到远程分支

```删除远程分支
git push origin :<branchName>
```

`git push origin --delete <branchName>`



### 删除本地分支中在远程没有对应的分支

> 1.创建b1分支 2. push到远程分支 3.其他人fetch或pull了b1分支 4.删除远程的b1分支5.但是其他人是不会自动删除b1分支的，即使再次fetch或者pull

使用 `git remote show <remoteName>`可以观察到本地分支和远程分支差别

根据提示 使用 `git remote prune <remoteName>`会？



`git fetch -p`

获取存在的最新，不存在则删除本地分支！



## rebase





# tag

`git push origin :refs/tags/<tagname> `

`git push origin --delete tag <tagname>`

`git tag -d <tagname>`



`git push --tags`

`git fetch origin tag <tagname>`



# 同步

从 来源 到 去处

### fetch

`git fetch origin <remoteBranchName>`

`git fetch origin <remoteBranchName>:<localBranchName>`







