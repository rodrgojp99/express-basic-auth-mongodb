const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://root:rootpwd@localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'ufcweb2022';

var user;
var produto;

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to Mongo server');
  const db = client.db(dbName);
  user_collection = db.collection('user');
  product_collection = db.collection('product');
  // the following code examples can be pasted here...
   
  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error);
//   .finally(() => client.close());

async function getUsers(username, password) {
    const findResult = await user_collection.find({username: username, password: password}).toArray();
    console.log('Repository - getUsers - Found documents =>', findResult);
    return findResult;
}

async function saveProd(product){
  const result = await product_collection.insertOne(product)
  console.log('Repository - saveProd - Inserted prod')
  console.log(result)
  return result;
}

async function getProdsByUser(user) {
  console.log('getProdsByUser - Username param:', user.username)
  
  const query = { "createdBy.username": user.username };
  const findResult = await product_collection.find(query).toArray();
  console.log('Repository - getProdsByUser - Found documents =>', findResult);
  return findResult;
}

//não precisa de parâmetro
//não aplica nenhum filtro
async function pegarTodosOsProdutos() {
  const findResult = await product_collection.find().toArray();
  console.log('Repository - pegarTodosOsProdutos - Found documents =>', findResult);
  return findResult;
}


exports.pegarTodosOsProdutos = pegarTodosOsProdutos;
exports.getUsers = getUsers;
exports.saveProd = saveProd;
exports.getProdsByUser = getProdsByUser;