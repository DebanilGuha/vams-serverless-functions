"use strict";
// Import the dependency.
const clientPromise = require('./mongo-client');
// Handler
module.exports.handler = async function(event, context, callback) {
                  const client = await clientPromise;
                  var message = event.Records[0].Sns.Message;
                  message= JSON.parse(message);
                  
                  const db = client.db();
                  const collections = await db.collection('vehicles');
                  //                 
                  var table;
                  //   
                  if (!collections) {
                    const response={
                      statusCode:404,
                      message:'Vehicles is not found'
                    }
                    return response;
                  }
                  else {
                                    table = collections;
                  }
                  
                  const records=await table.find().toArray();
                  const isvehicleId= records.find((record)=>record.vehicleId === message.vehicleId);
                  if(!isvehicleId && table){
                    table.insertOne(message);
                  }else{
                    if(Date.parse(isprospectId.lastUpdateTime) > Date.parse(message.lastUpdateTime) ){
                        table.updateOne(
                            {vehicleId: isvehicleId.vehicleId}
                            ,{$set:message})
                    }
                  }

                  return client.db().databaseName;
}
