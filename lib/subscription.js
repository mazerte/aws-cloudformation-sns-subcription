var AWS = require('aws-sdk');
var sns = new AWS.SNS({apiVersion: '2010-03-31'});

var Create = function(params, reply) {
  sns.subscribe(params, function(err, data) {
    if (err) return reply(err);
    reply(null, data.SubscriptionArn);
  });
};

var Update = function(physicalId, params, oldParams, reply) {
  Create(params, function(err, SubscriptionArn) {
    if (err) return reply(err);
    Delete(physicalId, oldParams, function(err) {
      if (err) return reply(err);
      reply(null, SubscriptionArn);
    });
  });
};

var Delete = function(physicalId, params, reply) {
  sns.unsubscribe({ SubscriptionArn: physicalId }, function(err, data) {
    if (err) return reply(err);
    reply(null, physicalId);
  });
};

exports.Create = Create;
exports.Update = Update;
exports.Delete = Delete;
