const amqplib = require('amqplib');

async function sendMessageInFeedbackQueue(message) {
  try {
    const queueName = 'FeedbackQueue';
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    channel.assertQueue(queueName, { durable: false });
    return channel.sendToQueue(queueName, Buffer.from(message, 'utf-8'));
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = sendMessageInFeedbackQueue;
