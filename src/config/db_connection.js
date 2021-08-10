import { MongoClient } from "mongodb";

export const MongoHelper = {
  async connect(uri) {
    this.uri = uri;
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },

  async disconnect() {
    await this.client.close();
    this.client = null;
  },

  async getCollection(name) {
    if (!this.client?.isConnected()) {
      await this.connect(this.uri);
    }
    return this.client.db().collection(name);
  },

  map: (data) => {
    const { _id, ...rest } = data;
    return { ...rest, id: _id };
  },
};
