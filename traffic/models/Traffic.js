import db from '../config/db.js';

class Traffic {
  static async writeData(nameTag, visitCounter) {
    const measurement = 'traffic';
    const tags = { host: nameTag };
    const fields = { visitCounter };
    await db.sendToInfluxDB(measurement, tags, fields);
  }
}

export default Traffic;
