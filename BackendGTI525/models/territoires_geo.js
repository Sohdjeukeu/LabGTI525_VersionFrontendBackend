const moduleMongoose = require("mongoose");
// schema des propriétés
const schemaDeDonneeFeaturesTerritoires =  moduleMongoose.Schema({
  type:{type:String},
  crs:{
        type:{
                name:{type:String},
                properties:{
                              type:{
                                      name:{type:String}

                                    }
                            }

             }
      },
  type:{type:String, required:true},
  // schema de données features

  properties:{
                CODEID:{type:Number,required:true},
                NOM:{type:String,required:true},
                CODEMAMH	:	{type:String},
                NUM	:{type:Number,required:true},
                ABREV	:	{type:String,required:true},
                TYPE	:	{type:String,required:true},
                COMMENT	:	{type:String},
                DATEMODIF	:	{type:String,required:true},

              },
  geometry:{
    type:{type:String,required:true},
    coordinates:{type:[[[[Number]]]],required:true}
  }
  });
module.exports = moduleMongoose.model('FeatureTerritoires',schemaDeDonneeFeaturesTerritoires);


