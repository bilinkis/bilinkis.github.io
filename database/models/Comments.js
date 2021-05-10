module.exports = function(sequelize, dataTypes){

    //Definir un alias.
    let alias = 'Comments'; //Con este alias sequelize va a identificar internamente al archivo de modelo.

    //Describir la configuración de las columnas de la tabla
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        userId:{
            type: dataTypes.INTEGER,
        },
        comment:{
            type:dataTypes.STRING,
        },
        createdAt:{
            type: dataTypes.DATE,
        },
        productId:{
            type: dataTypes.INTEGER,
        },
        
    }

    let config = {
        tableName: 'comments', 
        timestamps: true, //Si la tabla no tiene los campos created_at y updated_at
        underscored: false, //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.        
    }

   const Comments = sequelize.define(alias, cols, config);

   return Comments;
}