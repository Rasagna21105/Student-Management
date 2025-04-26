const mongoose=require('mongoose');

const MONGO_URL=process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
    .then(()=>{
        console.log('mongoDB connect successfully');
    }).catch((err)=>{
        console.log('error',err);
    })
