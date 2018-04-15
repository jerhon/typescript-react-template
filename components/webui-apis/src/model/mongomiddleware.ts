import { MongoClient } from "mongodb";
import * as express from "express";


interface ISwaggerMiddleware {
  swagger: any;
}

export interface ICollectionInfo {
  collection: string;
  key: string;
  sort: any;
}

const collections : ICollectionInfo[] = [
  { 
    collection: 'items',
    key: 'itemid',
    sort: { 'itemid' : 1 } 
  }
];


export default function middle(mongo : MongoClient, collectionInfo: ICollectionInfo[]) {

  return (req:express.Request & ISwaggerMiddleware, res:express.Response, next:express.NextFunction) => {
    let operationId : string = req.swagger.operation.operationId;
    if (operationId) {
      let operations = operationId.split('-');
      let operationName = operations[0];
      let collectionName = operations[1];
      let collection = mongo.db().collection(collectionName);
      let collectionMeta = collectionInfo.find((i) => i.collection == collectionName);
      if (!collectionMeta) {
        next('unknown collection for operation ' + operationId);
        return;
      }

      if (operationName == "list") {
        if (collectionMeta.key in req.query) {
          let key = collectionMeta.key;
          let keys : any = {};
          keys[key] = req.body[key];
          let result = collection
            .findOne(keys)
            .then((r) => res.json(r))
            .catch((err) => next(err));;
        } else {
          let skip = req.query.$skip || 0;
          let limit = req.query.$limit || 50;

          // list all the items, need to put an order on the collection
          collection.find({}, { skip: skip, limit: limit, sort: collectionMeta.sort });
        }
      } else if (operationName == "get") {
        let keys : any = {};

        for (let i = 0; i < req.swagger.params.length; i++) {
          let param = req.swagger.params[i];
          keys[param.name] = req.params[param.name]
        }
        
        let result = collection.findOne(keys);
        res.status(200).json(result);

      } else if (operationName == "upsert") {
        let key = collectionMeta.key;
        let keys : any = {};
        keys[key] = req.body[key];

        // todo: need to go through the properties and make sure they
        // match what's in the swagger file.  I think swagger-express-middleware
        // handles this , but assumming could potentially cause extra data to get
        // into the DB when it should not be.

        collection.updateOne(keys, req.body, { upsert: true });
      }

    }

    
  }

}