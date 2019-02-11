## bulmaを.vue内にinstallした話
```
<style lang="scss">
@import "./node_modules/bulma/bulma.sass";
</style>
```


# table logics?

## Todays Todo
- content
- date?

## Todo list
- id
- content
- isFinished?

## Time List
- id?
- content
- date

## Todays Learning
- id
- title
- content

# 普通にlambdaとAPI Gatewayの作り方忘れた
 - とりあえずDynamoDBのテーブルつくった
 - IAMでlambdaに付与するロール作った


## lambda用コードをzip化
lambdaのディレクトリいって  
`zip -r lambda-180000 ./`  
あたりでイケる  
本来的にはcliでupできるようにすべき


## 190211 dynamoは空文字を登録できない
https://qiita.com/naoki_koreeda/items/da0b98a323e37ce1f898