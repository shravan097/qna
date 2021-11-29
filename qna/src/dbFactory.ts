class MasterMemoryDb {
  readonly db
  constructor() {
    this.db = {}
  }
  getDb(key: string) {
    if (!this.db?.key) {
      this.db[key] = {}
    }
    return this.db[key]
  }
  getMaster() {
    return this.db
  }
}
export class DbFactory {
  static masterMemoryDb: MasterMemoryDb
  // @todo test this to ensure that db does not get reset for keys
  static getDb(key) {
    if (!DbFactory.masterMemoryDb) {
      DbFactory.masterMemoryDb = new MasterMemoryDb()
    }
    return DbFactory.masterMemoryDb.getDb(key)
  }

  static getMasterDb() {
    if (!this.masterMemoryDb) {
      DbFactory.masterMemoryDb = new MasterMemoryDb()
    }
    return DbFactory.masterMemoryDb.getMaster()
  }
}
