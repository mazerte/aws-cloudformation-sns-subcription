var CfnLambda = require('cfn-lambda');
var AWS = require('aws-sdk');

var Subscription = require('./lib/subscription');

function SNSSubscriptionHandler(event, context) {
  var SNSSubscription = CfnLambda({
    Create: Subscription.Create,
    Update: Subscription.Update,
    Delete: Subscription.Delete,
    SchemaPath: [__dirname, 'src', 'schema.json']
  });
  // Not sure if there's a better way to do this...
  AWS.config.region = currentRegion(context);

  return SNSSubscription(event, context);
}

function currentRegion(context) {
  return context.invokedFunctionArn.match(/^arn:aws:lambda:(\w+-\w+-\d+):/)[1];
}

exports.handler = SNSSubscriptionHandler;
