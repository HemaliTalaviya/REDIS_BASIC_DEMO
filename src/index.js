require('dotenv').config();
const http = require('http');
const express = require('express');
const app = express();

app.use(express.json());
const server = http.createServer(app);

//redis code
const redis = require('redis');
const redisClient = redis.createClient(6379,'127.0.0.1');

redisClient.connect();
redisClient.on('connect',function(err){
    console.log('connect redis')
})

app.get('/',async(req,res) => {
    // let keyName ='myKey';
    // let getData = await redisClient.get(keyName);
    // console.log(getData);
    // let result ={
    //     id:85,
    //     Name:'Demo'
    // }
    // let responseArray = ''
    // if(getData){
    //     responseArray = JSON.parse(getData)
    //     console.log('GET KEY')
    // }else{
    //     console.log('SET KEY NAME')
    //     redisClient.set(keyName,JSON.stringify(result));
    //     responseArray = result
    // }


    //###################Hash
    let parentKey = 'myKey'
    let keyName ='key3';
    let getData = await redisClient.hGet(parentKey,keyName);
    console.log(getData);
    let result ={
        id:85,
        Name:'Demo'
    }
    const testData = await redisClient.hGetAll(parentKey);
    console.log(testData);
    let responseArray = ''
    if(getData){
        responseArray = JSON.parse(getData)
        console.log('GET KEY')
    }else{
        console.log('SET KEY NAME')
        redisClient.hSet(parentKey,keyName,JSON.stringify(result));
        responseArray = result
    }
    redisClient.DEL(parentKey);
    res.status(200).json(responseArray);
})


const port = process.env.PORT || '5000';
server.listen(port,() =>console.log("Server started on..!!",port));

module.exports = app;