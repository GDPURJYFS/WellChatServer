# mongoose

```
var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://127.0.0.1:27017/test");
var TestSchema = new mongoose.Schema({
    name : { type:String },
    age  : { type:Number, default:0 },
    email: { type:String },
    time : { type:Date, default:Date.now }
});
var TestModel = db.model("test1", TestSchema);
var TestEntity = new TestModel({
    name : "helloworld",
    age  : 28,
    email: "helloworld@qq.com"
});
TestEntity.save(function(error,doc){
  if(error){
     console.log("error :" + error);
  }else{
     console.log(doc);
  }
});
```

1. Schema：数据库集合的模型骨架，或者是数据属性模型传统意义的表结构。

2. Model ：通过Schema构造而成，除了具有Schema定义的数据库骨架以外，还可以具体的操作数据库。

3. Entity：通过Model创建的实体，它也可以操作数据库。

## find

```
TestModel.find({},function(error,docs){
   //若没有向find传递参数，默认的是显示所有文档
});

TestModel.find({ "age": 28 }, function (error, docs) {
  if(error){
    console.log("error :" + error);
  }else{
    console.log(docs); //docs: age为28的所有文档
  }
});
```

2.属性过滤 find(Conditions,field,callback);

```
//返回只包含一个键值name、age的所有记录
Model.find({},{name:1, age:1, _id:0}，function(err,docs){
   //docs 查询结果集
})
```

> 我们只需要把显示的属性设置为大于零的数就可以，当然1是最好理解的，_id是默认返回，如果不要显示加上("_id":0)，
> 但是，对其他不需要显示的属性且不是_id，如果设置为0的话将会抛异常或查询无果。

## create

```
TestModel.create({name:'fucker', age: 10, email: "lover@qq.com"}
                , function(error,doc){
  console.log(doc);
});
```

## save

```
var TestEntity = new TestModel({
    name : "jerry",
    age  : 28,
    email: "jerry@qq.com"
});
TestEntity.save(function(error,doc) {
   console.log(doc);
});
```

## update

```
var conditions = {name : 'test_update'};

var update = {$set : { age : 16 }};

TestModel.update(conditions, update, function(error){
    if(error) {
        console.log(error);
    } else {
        console.log('Update success!');
    }
});
```

## remove

```
var conditions = { name: 'tom' };

TestModel.remove(conditions, function(error){
    if(error) {
        console.log(error);
    } else {
        console.log('Delete success!');
    }
});
```

1. 查询：find查询返回符合条件一个、多个或者空数组文档结果。

2. 保存：model调用create方法，entity调用的save方法。

3. 更新：obj.update(查询条件,更新对象,callback)，根据条件更新相关数据。

4. 删除：obj.remove(查询条件,callback)，根据条件删除相关数据

## 查询

1. find过滤查询 ：find查询时我们可以过滤返回结果所显示的属性个数。

2. findOne查询 ：只返回符合条件的首条文档数据。

3. findById查询：根据文档_id来查询文档

## 条件查询

```
Model.find({"age":{"$gt":18}},function(error,docs){
   //查询所有nage大于18的数据
});

Model.find({"age":{"$lt":60}},function(error,docs){
   //查询所有nage小于60的数据
});

Model.find({"age":{"$gt":18,"$lt":60}},function(error,docs){
   //查询所有nage大于18小于60的数据
});
```

## find limit

```
1.限制数量：find(Conditions,fields,options,callback);
```

1. limit函数：限制返回结果的数量。

2. skip函数：略过指定的返回结果数量。

3. sort函数：对返回结果进行有效排序

## 属性方法

```
var mongoose = require("mongoose");

var db = mongoose.connect("mongodb://127.0.0.1:27017/test");

var TestSchema = new mongoose.Schema({
    name : { type:String },
    age  : { type:Number, default:0 },
    email: { type:String, default:"" },
    time : { type:Date, default:Date.now }
});

TestSchema.static('findByName', function (name, callback) {
    return this.find({ name: name }, callback);
});

var TestModel = db.model("test1", TestSchema );

TestModel.findByName('tom', function (err, docs) {
 //docs所有名字叫tom的文档结果集
});
```
