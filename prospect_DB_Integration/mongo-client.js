"use strict";
// Import the dependency.
const { MongoClient } = require('mongodb');
// Export a module-scoped MongoClient promise. By doing this in a separate
// module, the client can be shared across functions.
const client = new MongoClient("mongodb+srv://debanil:d3b%400_db@london-cluster-vams.wia8y.mongodb.net/vams?retryWrites=true&w=majority",
  { useNewUrlParser: true,  useUnifiedTopology: true });
module.exports = client.connect(); 