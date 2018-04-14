import { MongoClient } from "mongodb";
import * as express from "express";


interface ISwaggerMiddleware {
  swagger: any;
}

export interface CollectionInfo {
  collectionName: string;
  primaryKey: string;
}

export default function middle(mongo : MongoClient) {

  return (req:express.Request & ISwaggerMiddleware, res:express.Response, next:express.NextFunction) => {
    let operationId : string = req.swagger.operation.operationId;
    if (operationId) {
      let operations = operationId.split('-');
      let operationName = operations[0];
      let collectionName = operations[1];
      let collection = mongo.db().collection(collectionName);

      if (operationName == "list") {
        let skip = req.query.$skip || 0;
        let limit = req.query.$limit || 50;



        // list all the items, need to put an order on the collection
        collection.find({}, { skip: skip, limit: limit });
      } else if (operationName == "get") {
        let keys : any = {};

        for (let i = 0; i < req.swagger.params.length; i++) {
          let param = req.swagger.params[i];
          keys[param.name] = req.params[param.name]
        }
        
        let result = collection.findOne(keys);
        res.status(200).json(result);

      } else if (operationName == "upsert") {
        let keys : any = {};
        // todo: need to go through the properties and make sure they
        // match what's in the swagger file.  I think swagger-express-middleware
        // handles this , but assumming could potentially cause extra data to get
        // into the DB when it should not be.

      }

    }

    
  }

}