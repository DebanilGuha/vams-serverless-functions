const AWS = require('aws-sdk');
const sns = new AWS.SNS()

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

// Set region
AWS.config.update({region: 'eu-west-2'});

exports.handler = (event) => {
    return sns.publish(params)
    .promise()
    .then((data) => {
        console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
        console.log("MessageID is " + data.MessageId);
    }).catch((err) => {
        console.error(err, err.stack);
    });
};
