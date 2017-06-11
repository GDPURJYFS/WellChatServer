const mongoose = require('mongoose');

var db = mongoose.connect("mongodb://127.0.0.1:27017/test");
db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
db.connection.on("open", function () {
    // console.log("------数据库连接成功！------", db);
    console.log("------数据库连接成功！------");
});


var TestSchema = new mongoose.Schema({
    name: {type: String},
    age: {type: Number, default: 0},
    email: {type: String},
    time: {type: Date, default: Date.now}
});
var TestModel = db.model("test1", TestSchema);
var TestEntity = new TestModel({
    name: "helloworld",
    age: 28,
    email: "helloworld@qq.com"
});

TestEntity.save(function (error, doc) {
    if (error) {
        console.log("error :" + error);
    } else {
        console.log(doc);
    }
});

TestModel.find({"age": 28}, function (error, docs) {
    if (error) {
        console.log("error :" + error);
    } else {
        for (let iter in docs) {
            console.log(docs[iter]);
        }
        // console.log(docs); //docs: age为28的所有文档
    }
});