const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient({region: 'ap-northeast-1'});
const { tableName } = require('config/config.js');
let event_ = null;
let context_ = null;

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
  console.log('Start to operate GET method');
  switch (event_.action){
    case action.GET_TODAYS_TODO :
      getTodaysTodo();
      break;
    
    case action.GET_TODO_LIST :
      getTodoList();
      break;

    case action.GET_TIME_RANGE_LIST :
      getTimeRangeList();
      break;

    default:
      break;
  }
}

function handlePostMethod(){
  switch (event_.action){
    case action.ADD_TODAYS_LEARNING :
      addTodaysLearning();
      break;

    case action.UPDATE_TODAYS_TODO :
      updateTodaysTodo();
      break;

    default:
      break;
  }
}


function getTodaysTodo(){
  let params = {
    TableName : tableName.TODAYS_TODO,
    Key : {
      id : 1
    }
  }
  dynamo.get(params, function(err, data){
    if(err){
      context_.fail(err);
    }else{
      console.log('Got data by "getTodaysTodo"');
      console.log(data);
      delete data.Item.id;
      context_.succeed(data.Item);
    }
  });
}

function getTodoList(){
  let params = {
    TableName : tableName.TODO_LIST,
    key : 'id'
  }
  dynamo.scan(params, function(err, data){
    if(err){
      context_.fail(err);
    }else{
      console.log('Got data by "getTodoList"');
      console.log(data);
      data.Items.sort((a, b) => {
        if(a.order === b.order){
          return 0;
        }
        return a.order < b.order ? -1 : 1;
        // 1 means a will be lower index
        // -1 means a will be lower index
      })
      context_.succeed(data.Items);
    }
  });
}

function getTimeRangeList(){
  let params = {
    TableName : tableName.TIME_LIST,
    key : 'id'
  }
  dynamo.scan(params, function(err, data){
    if(err){
      context_.fail(err);
    }else{
      console.log('Got data by "getTimeRangeList"');
      console.log(data);
      context_.succeed(data);
    }
  });
}

function addTodaysLearning(){
  let params = {
    TableName : tableName.TODAYS_LEARNING,
    id : '', // Need to fix
    title : event_.title, //?
    content : event_.content, //?
  }
  dynamo.put(params, function(err, data){ // can be templated?
    if(err){
      context_.fail(err);
    }else{
      console.log('Got data by "getTimeRangeList"');
      console.log(data);
      context_.succeed(data);
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
      context_.succeed(data);
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

const action = {
  ADD_TODAYS_LEARNING : 'addTodaysLearning',
  GET_TODAYS_TODO : 'getTodaysTodo',
  GET_TODO_LIST : 'getTodoList',
  GET_TIME_RANGE_LIST : 'getTimeRangeList',
  UPDATE_TODAYS_TODO : 'updateTodaysTodo',
}