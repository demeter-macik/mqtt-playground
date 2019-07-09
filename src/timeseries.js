const Influx = require('influx');

const DATABASE_NAME = 'mqtt';

class TimeSeries {
    constructor() {
        this.influx = new Influx.InfluxDB({
            host: 'influxdb',
            port: 8086,
            database: DATABASE_NAME,
            schema: [
                {
                    measurement: 'perf',
                    fields: {
                        rss: Influx.FieldType.INTEGER,
                        heapTotal: Influx.FieldType.INTEGER,
                        heapUsed: Influx.FieldType.INTEGER,
                        external: Influx.FieldType.INTEGER,
                    },
                    tags: ['unit', 'location']
                }
            ]
        });
    }

    async checkOrCreateDatabase () {

        try {
            const names = await this.influx.getDatabaseNames();
            if (!names.includes(DATABASE_NAME)) {
                await this.influx.createDatabase(DATABASE_NAME);
            }
        } catch (error) {
            console.log('error:', error);
        }
    }

    async sendData (measurement, fields) {
        const data = [
            {
                measurement,
                tags: {
                    unit: 'unit',
                    location: 'location',
                },
                fields
            }
        ];

        await this.influx.writePoints(data, {
            database: DATABASE_NAME,
            precision: 's'
        });
    }
}

module.exports = {TimeSeries};
