const {connect} = require('async-mqtt');
const client = connect('mqtt://broker');

async function measureTemp () {
    setTimeout(async () => {
        await measureTemp();
    }, Math.round(Math.random() * 1000));
    await client.publish('temp/room', JSON.stringify({value: Math.random() * 50}));
}

(async () => {
    try {
        await measureTemp();
    } catch (error) {
        console.log('error:', error);
        process.exit(1);
    }
})();
