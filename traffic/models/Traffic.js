import db from '../config/db.js';

class Traffic {
  static async writeData(nameTag, visitCounter) {
    const measurement = 'traffic';
    const tags = { host: nameTag || 'defaultHost' };
    const fields = { visitCounter: visitCounter || 0 };
    await db.sendToInfluxDB(measurement, tags, fields);
  }
}

export default Traffic;
