const AWS = require('aws-sdk');
const sns = new AWS.SNS();
const clientPromise = require('./mongo-client');

// Set the parameters
var params = {
  Message: JSON.stringify({
      "vehicleId": "MAX-IB-CH-405",
      "vehicleType": "Motorcycle",
      "vehiclePlateNumber": "MAX-AY-VO-0044",
      "hpDays":"30-120 HP",
      "helmetNumber": "8970303009",
      "vehicleTrim": "Kickstart",
      "lastUpdateTime": new Date().toISOString(),
      "messageType": "create"
  }), 
  TopicArn: "arn:aws:sns:eu-west-2:048464312507:Vehicle", 
};
/**
 * 
 * @param {string} key 
 * @param {string} updateDoc 
 */
const findVehicles= async function(key,updateDoc){
    const table= await getCollection("vehicles");
    const records = await table.find();
    console.log(records);
    const vehicle= records.find(elem => elem._id === key._id)

    
}

// Set region
AWS.config.update({region: 'eu-west-2'});

exports.handler = (event) => {
    console.log(event)
    return sns.publish(params)
    .promise()
    .then((data) => {
        console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
        console.log("MessageID is " + data.MessageId);
    }).catch((err) => {
        console.error(err, err.stack);
    });
};


const getCollection =  function (val) {
  return new Promise(async(resolve,reject)=>{
    const client = await clientPromise;
    const db = client.db();
    const collections = await db.collection(val);
    var table;
    if (!collections) {
      table = await client.db().createCollection(val);
    } else {
      table = collections;
    }
    resolve(table);
  });
};


