const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient({region: 'ap-northeast-1'});
import { tableName } from 'config/config.js'
let event_ = nulll;
let context_ = nulll;

exports.handler = (event, context, callback) => {
  const operation = event.method;
  event_ = event;
  context_ = context;

  switch (operation) {
    case method.GET : 
      handleGetMethod();
    case method.POST : 
      handlePostMethod();
  }
}

function handleGetMethod(){
  switch (event_.type){
    case type.GET_TODAYS_TODO :
      getTodaysTodo();
      break;

    default:
      break;
  }
}

function handlePostMethod(){

}


function getTodaysTodo(){
  let params = {
    TableName : tableName.TODAYS_TODO,
    key : 'id'
  }
  dynamo.scan(params, function(err, data){
    if(err){
      context_.fail(err);
    }else{
      console.log('Got data by "getTodaysTodo"');
      console.log(data);
      context.succeed(data);
    }
  });
}


function updateTodaysTodo(){
  let params = {
    TableName : tableName.TODAYS_TODO,
    id : 1,
    content : event_.content
  }
}

const method = {
  GET : 'GET',
  POST : 'POST'
}

const type = {
  GET_TODAYS_TODO : 'getTodaysTodo',
  UPDATE_TODAYS_TODO : 'updateTodaysTodo',
}