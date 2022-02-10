// demo.js
// 在 demo 文件中引入 custom_module
var myModule = require("module_name1");

// 期望打印出 "custom_module"
console.log(myModule.name);

// 期望打印出 "hello world!"
myModule.sayHello();