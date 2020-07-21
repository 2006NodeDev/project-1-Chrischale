import {Storage} from '@google-cloud/storage'

const storage = new Storage();

(async ()=>{
    const [[bucket]] = await storage.getBuckets({
        prefix:'node-app-p1'
    })//prefix option will allow you to narrow down the buckets by name
    await bucket.upload('./tsconfig.json', {
        //set things like metadata
        destination:'demos/tsconfig.json',
        metadata:{
            contentType:'application/json'
        }
    })


})()