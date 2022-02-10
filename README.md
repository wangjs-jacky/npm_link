# npm_link

## 0.前言

一直搞不懂`npm link`的用作，这里做一个说明。

> 提前注：`package.json` 中定义的`packageName`应小写，不要采用驼峰命名。



## 1.自定义 `module` 的使用

如果我们想自己开发一个依赖包，可以在多个项目中使用，标准的做法是：

1. 将开发好的 `module` 直接发布到 `npm` 仓库上。
2. 当其他项目中需要使用这个`module`时，直接在本地项目中执行 `npm install moduleNmae`。

但是这样做存在一个问题，在每次修改 `module` 源码后，需要重新发布到`npm`镜像仓库。

使用`npm link`命令可以简化 `module` 修改后繁琐的`npm publish`和`npm update module`操作。



## 2.示例项目

示例代码地址：[https://github.com/wangjs-jacky/npm_link.git](https://github.com/wangjs-jacky/npm_link.git)

项目结构如下：

```shell
.
├── main          # 在项目中需要导入`module_name1`文件 
│   └── demo.js
└── module_name1  # 自定义的module文件
    ├── index.js
    └── package.json
```

如果直接运行`node main/demo.js`，会报错误信息`“MODULE_NOT_FOUND”`。

在不使用将`module`推送到`npm`官方制品库的条件下，可以使用`npm link`解决上面的问题。



测试步骤如下：

1. 在`module_name1`文件夹下，执行

   ```shell
   sudo npm link # mac需要开权限
   ```

   执行后，会在全局的`node_modules`环境下会生成一个**符号链接文件**，在`windows`下就是创建一个快捷方式文件。

   > 这个操作就是替换：`npm install -g 包名`

2. 在`main`文件夹下，执行

   ```shell
   npm link 包名(module_name1)
   ```

   执行后，将全局`node_modules`下刚创建的`module`安装到本地项目

   > 这个操作就是替换：`npm install --save 包名`



执行后，原先项目的结构会发生变化，目录结构如下：

```shell
.
├── main
│   ├── demo.js
│   └── + node_modules  
│       └── + module_name1 -> ../../../../../../../usr/local/lib/node_modules/module_name1
└── module_name1
    ├── index.js
    ├── + package-lock.json
    └── package.json
```

从上面可以发现，共增加了三个文件。

此时，再执行`node main/demo.js`，就可以正常打印出期望值，不会报错了。



## 3.卸载操作

在卸载阶段，`module_name1`和`main`执行的指令都是相同的：

```shell
sudo npm unlink 包名(module_name1)
```



## 4.npm install -g 和 -s的区别

这个`DEMO`项目延时结束后，会突然冒出一个疑问，既然全局已经安装了`module`了，为什么在`main`文件夹下，仍然需要使用`npm link`再安装一遍呢？

这是因为：

`npm install -g moduleName`是将模块装到全局目录下，但是全局方式的安装是供命令行`(command line)`使用的，比如`grunt`，全局安装的模块是没有办法用`require`调用包的。因为上面要在项目中`require`包，所以必须先`npm link`一下。



## 5.参考博客

1. [博客园：npm link的用法](https://www.cnblogs.com/zhangzl419/p/15210835.html)
