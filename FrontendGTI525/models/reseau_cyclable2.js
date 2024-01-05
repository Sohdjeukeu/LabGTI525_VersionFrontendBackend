const moduleMongoose = require("mongoose");

// shema de données pour les propriétés

const shemaDonneReseauCyclable=  moduleMongoose.Schema({
type:{type:String /*,required:true*/},
crs:{
       type:{type:String /*,required:true*/},
       properties:{
                     name:{type:String/*,required:true*/}
                }
    },
features:{
            type:[
                    {
                        type:{type:String,rquired:true},
                        properties:{},
                        geometry:{
                                    type:{type:String,required:true},
                                    coordinates:{
                                                    type:[
                                                          /* [Number]*/[Number,Number]
                                                         ],
                                                    required:true
                                                }
                                }

                    }

                  ],
                    required:true
        }
});
module.exports = moduleMongoose.model('reseau_cyclable',shemaDonneReseauCyclable);


