const {connect} = require('async-mqtt');
const {TimeSeries} = require('./timeseries.js');

const client = connect('mqtt://broker');

(async () => {
    try {
        await client.subscribe('temp/room');

        const timeSeries = new TimeSeries();
        await timeSeries.checkOrCreateDatabase();

        client.on('message', async (topic, message) => {
            const temp = JSON.parse(message.toString());
            temp.topic = topic;
            await timeSeries.sendData('temp', temp);
        });
    } catch (error) {
        console.log('error:', error);
        process.exit(1);
    }
})();
