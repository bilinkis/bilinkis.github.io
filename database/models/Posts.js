module.exports = function(sequelize, dataTypes){

    //Definir un alias.
    let alias = 'Posts'; //Con este alias sequelize va a identificar internamente al archivo de modelo.

    //Describir la configuración de las columnas de la tabla
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        title:{
            type: dataTypes.STRING,
        },
        description:{
            type:dataTypes.STRING,
        },
        image:{
            type: dataTypes.STRING,
        },
        userId:{
            type: dataTypes.INTEGER,
        },
        
        createdAt:{
            type: dataTypes.DATE,
        },
        comments:{
            type: dataTypes.INTEGER,
        }
    }

    let config = {
        tableName: 'posts', 
        timestamps: false, //Si la tabla no tiene los campos created_at y updated_at
        underscored: false, //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.        
    }

   const Posts = sequelize.define(alias, cols, config);

   return Posts;
}