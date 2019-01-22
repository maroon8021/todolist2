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
      break;
    case method.POST : 
      handlePostMethod();
      break;

    default:
      break;
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
  switch (event_.type){
    case type.UPDATE_TODAYS_TODO :
      updateTodaysTodo();
      break;

    default:
      break;
  }
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
    Key : {
      id : 1 
    },
    UpdateExpression: 'SET #content = :newContent, #date = :newDate',
    ExpressionAttributeNames: {
      '#content': 'content',
      '#date': 'date',
    },
    ExpressionAttributeValues: {
      ':newContent': event_.content,
      ':newDate': getToday()
    }
  }
  dynamo.update(params,(err, data) => {
    if(err) {
      context.fail(err);
    }else{
      console.log('data is update by "updateTodaysTodo"');
      console.log(data);
      context.succeed(data);
    }
  })

}

function getToday(){
  let date = new Date();
  let year = date.getFullYear();
  let month = ("00" + (date.getMonth()+1)).slice(-2);
  let day = ("00" + date.getDate()).slice(-2);
  return year + '-' + month + '-' + day;
}


const method = {
  GET : 'GET',
  POST : 'POST'
}

const type = {
  GET_TODAYS_TODO : 'getTodaysTodo',
  UPDATE_TODAYS_TODO : 'updateTodaysTodo',
}