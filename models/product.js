const mongodb=require('mongodb');
const getDb=require('../util/database').getDb;


class Product {
    constructor(title,price,imageurl,description,id){
      this.title=title;
      this.price=price;
      this.description=description;
      this.imageurl=imageurl;
      this._id=id?new mongodb.ObjectId(id):null;
    }

    save(){
      const db=getDb();
      let dbop;
      if(this._id){
        dbop=db.collection('products').updateOne({_id:this._id},{$set:this})

      }
      else{
        dbop=db.collection('products').insertOne(this)

      }
      return dbop
      .then(result=>{console.log(result)})
      .catch(err=>{console.log(err)});
    }

    static fetchall(){
      const db=getDb();
      return db.collection('products').find().
      toArray().then(products=>{
        console.log(products);
        return products;
        })
        .catch(err=>{console.log(err)});
    }

    static findbyid(prodid){
      const db=getDb();
      return db.collection('products').find({_id:new mongodb.ObjectId(prodid)})
      .next()
      .then(product=>{
        console.log(product);
        return product;
      })
      .catch(err=>{console.log(err)});
    }

    static deletebyid(prodId){
      const db=getDb();
      return db.collection('products').deleteOne({_id:new mongodb.ObjectId(prodId)})
      .then(result=>{console.log('DELETED')})
      .catch(err=>{console.log(err)})
    }

}

/*const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});*/

module.exports = Product;
