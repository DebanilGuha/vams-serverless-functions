"use strict";
// Import the dependency.
const clientPromise = require('./mongo-client');
// Handler
module.exports.handler = async function(event, context, callback) {
                  const client = await clientPromise;
                  var message = event.Records[0].Sns.Message;
                  message= JSON.parse(message);
                  
                  const db = client.db();
                  const collections = await db.collection('prospects');
                  //                 
                  var table;
                  //   
                  if (!collections) {
                                    table = await client.db().createCollection('prospects');
                  }
                  else {
                                    table = collections;
                  }
                  //    
                  const records=await table.find().toArray();
                  const isprospectId= records.find((record)=>record.prospectId === message.prospectId);
                  if(!isprospectId && table){
                    table.insertOne(message);
                  }else{
                    let date1=new Date(Date.parse(isprospectId.lastUpdateTime));
                    let date2=new Date(Date.parse(message.lastUpdateTime));
                    const diff= Math.abs(date2.getTime() - date1.getTime()) / 3600000;
                    if(diff > 1){
                        table.updateOne(
                            {vehicleId: isprospectId.vehicleId}
                            ,{$set:message})
                    }
                  }

                  return client.db().databaseName;
}
