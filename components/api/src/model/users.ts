import { MongoClient } from "mongodb"

// Users Collection

interface IUserKey {
  username: string;
}

interface IUserDesc extends IUserKey {
  name:     string;
  username: string; // PRIMARY KEY
  email:    string;
  roles:    string[];
}

export class Users {
  _client : MongoClient;

  constructor(client:MongoClient) {
    this._client = client;
  }

  private getCollection() {
    return this._client.db().collection<IUserDesc>('users');
  }

  /**
   * Creates a user.
   * @param user The object associated with the user.
   */
  async create(user:IUserDesc) {
    // TODO: validate user before insertion

    await this.getCollection().insertOne(user);
  }

  /**
   * Returns a list of users.
   * @param skip a number of users
   * @param limit a number of users
   */
  async list(skip:number, limit:number) {
    let collection = this.getCollection();
    let cursor = collection.find({}).sort({username: 1});
    if (skip) { 
      cursor = cursor.skip(skip);
    }
    if (limit) { 
      cursor = cursor.limit(limit);
    }
    let users = await cursor.toArray();
    return users;
  }

  async get(username: string) {
    let collection = this.getCollection();
    let user = await collection.findOne({ username: username });
    return user;
  }
  
  isUserDesc(object: any): object is IUserKey {
    return 'username' in object;
  }

  async delete(key : IUserDesc | IUserKey | string) {
    if (this.isUserDesc(key)) {
      await this.deleteByUsername(key.username);
    } else {
      await this.deleteByUsername(key as string);
    }
  }
  
  async deleteByUsername(username: string) {
    await this.getCollection().remove({ username: username });
  }

  // provisions the model for a user.
  async provision() {
    // make the primary key on the collection
    if (await this._client.db().collection('users').indexExists('users_username'))
    {
      this._client
        .db()
        .collection('users')
        .createIndex({'username': 1}, {unique:true, name: 'users_username'});
    }
  }

}