"use strict";
// Import the dependency.
const clientPromise = require('./mongo-client');
// Handler
module.exports.handler = async function(event, context, callback) {
                  const client = await clientPromise;
                  var message = event.Records[0].Sns.Message;
                  message= JSON.parse(message);
                  console.log(message,typeof message);
                  const db = client.db();
                  const collections = await db.collection('vehicles');
                  //                 console.log(collections);
                  var table;
                  //   
                  if (!collections) {
                                    table = await client.db().createCollection('vehicles');
                  }
                  else {
                                    table = collections;
                  }
                  //    console.log(`Table  `,table);
                  if (table) table.insertOne(message);


                  return client.db().databaseName;
}
