const mongodb=require('mongodb');
const Mongoclient=mongodb.MongoClient;

let db1;

const mongoconnect=(callback)=>{
  Mongoclient.connect('mongodb+srv://swethakh:switchcareer1@cluster0.ovg1ccy.mongodb.net/shop?retryWrites=true&w=majority')
  .then(client=>{
    console.log('Connected!');
    db1=client.db()
    callback();
  })
  .catch(err=>{
    console.log(err);
    throw err;  
  });
};

const getDb=()=>{
  if(db1){
    return db1;
  }
  throw 'No database found';
};

exports.mongoconnect = mongoconnect;
exports.getDb=getDb;
