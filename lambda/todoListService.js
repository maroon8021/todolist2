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

    case action.GET_TODAYS_LEARNING :
      getTodaysLearning();
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
  console.log('Start to operate POST method');
  switch (event_.action){
    case action.ADD_TODAYS_LEARNING :
      addTodaysLearning();
      break;

    case action.DELETE_ALL_TIME_RANGE_LIST :
      deleteAllTimeRangeList();
      break;

    case action.UPDATE_TODAYS_TODO :
      updateTodaysTodo();
      break;

    case action.UPDATE_TIME_LIST_TITLE :
      updateTimeListTitle();
      break;

    case action.UPDATE_TIME_LIST_CONTENT :
      updateTimeListContent();
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

function getTodaysLearning(){
  let params = {
    TableName : tableName.TODAYS_LEARNING,
    Key : 'id'
  }
  dynamo.scan(params, function(err, data){
    if(err){
      context_.fail(err);
    }else{
      console.log('Got data by "getTodaysLearning"');
      console.log(data);
      for (let i = data.Items.length - 1; i > 0; i--) {
        let r = Math.floor(Math.random() * (i + 1));
        let tmp = data.Items[i];
        data.Items[i] = data.Items[r];
        data.Items[r] = tmp;
      }
      console.log('shuffled');
      console.log(data.Items);
      context_.succeed(data.Items);
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
      context_.succeed(data.Items);
    }
  });
}

async function addTodaysLearning(){
  console.log('Start "addTodaysLearning"');
  let count = await getCountOfTodaysLearning();
  console.log('Count is : ' + count);
  let params = {
    TableName : tableName.TODAYS_LEARNING,
    Item : {
      id : count + 1,
      title : event_.title,
      content : event_.content,
    }
  }
  console.log('params is');
  console.log(params);
  dynamo.put(params, function(err, data){
    if(err){
      context_.fail(err);
    }else{
      console.log('Add Todays Learning by "addTodaysLearning"');
      console.log(data);
      context_.succeed(data);
    }
  });
}

async function getCountOfTodaysLearning(){
  try {
    let params = {
      TableName : tableName.TODAYS_LEARNING,
      Key : 'id',
      Select : 'COUNT'
    }
    const items = await dynamo.scan(params).promise();
    return items.Count;
  } catch (error) {
    console.error(`[Error]: ${JSON.stringify(error)}`);
    return error;
  }
}

async function deleteAllTimeRangeList(){
  let result = await updateAllTimeRangeList();
  context_.succeed(result);
}

async function updateAllTimeRangeList(){
  try {
    for (let index = 0; index < 10; index++) { //10 will be changed
      let params = {
        TableName : tableName.TIME_LIST,
        Key : {
          id : index + 1
        },
        UpdateExpression: 'SET #title = :newTitle, #content = :newContent, #date = :newDate',
        ExpressionAttributeNames: {
          '#title': 'title',
          '#content': 'content',
          '#date': 'date',
        },
        ExpressionAttributeValues: {
          ':newTitle': '',
          ':newContent': '',
          ':newDate': getToday()
        }
      }
      dynamo.update(params,(err, data) => {
        if(err) {
          context.fail(err);
        }else if(index + 1 === 10){
          console.log('data is update by "deleteAllTimeRangeList"');
          return data;
        }
      });
    }
  } catch (error) {
    console.error(`[Error]: ${JSON.stringify(error)}`);
    return error;
  }
  
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

async function updateAllTimeRangeList(){
  console.log('updateAllTimeRangeList');
  try {
    for (let index = 0; index < 10; index++) { //10 will be changed
    console.log('current index');
    console.log(index);
      let params = {
        TableName : tableName.TIME_LIST,
        Key : {
          id : index + 1
        },
        UpdateExpression: 'SET #title = :newTitle, #content = :newContent, #date = :newDate',
        ExpressionAttributeNames: {
          '#title': 'title',
          '#content': 'content',
          '#date': 'date',
        },
        ExpressionAttributeValues: {
          ':newTitle': ' ', // empty string can not be inserted
          ':newContent': ' ',
          ':newDate': getToday()
        }
      }
      const item = await dynamo.update(params).promise();
      if(index + 1 === 10){
        console.log('data is update by "deleteAllTimeRangeList"');
        return item;
      }
    }
  } catch (error) {
    console.error(`[Error]: ${JSON.stringify(error)}`);
    return context_.fail(error);
  }
  
}

function updateTimeListTitle(){
  let params = {
    TableName : tableName.TIME_LIST,
    Key : {
      id : event_.id
    },
    UpdateExpression: 'SET #title = :newtitle, #date = :newDate',
    ExpressionAttributeNames: {
      '#title': 'title',
      '#date': 'date',
    },
    ExpressionAttributeValues: {
      ':newtitle': event_.title,
      ':newDate': getToday()
    }
  }
  dynamo.update(params,(err, data) => {
    if(err) {
      context.fail(err);
    }else{
      console.log('data is update by "updateTimeListTitle"');
      console.log(data);
      context_.succeed(data);
    }
  })

}

function updateTimeListContent(){
  let params = {
    TableName : tableName.TIME_LIST,
    Key : {
      id : event_.id
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
      console.log('data is update by "updateTimeListContent"');
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
  DELETE_ALL_TIME_RANGE_LIST : 'deleteAllTimeRangeList',
  GET_TODAYS_TODO : 'getTodaysTodo',
  GET_TODAYS_LEARNING : 'getTodaysLearning',
  GET_TODO_LIST : 'getTodoList',
  GET_TIME_RANGE_LIST : 'getTimeRangeList',
  UPDATE_TODAYS_TODO : 'updateTodaysTodo',
  UPDATE_TIME_LIST_TITLE : 'updateTimeListTitle',
  UPDATE_TIME_LIST_CONTENT : 'updateTimeListContent',
}