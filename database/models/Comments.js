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
        timestamps: false, //Si la tabla no tiene los campos created_at y updated_at
        underscored: false, //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.        
    }

   const Comments = sequelize.define(alias, cols, config);
   Comments.associate = function(models){
    Comments.belongsTo(models.Users,{
        foreignKey:'userId',
        as: "Users",
        allowNull:false,
        onDelete: "CASCADE"
    })
    Comments.belongsTo(models.Posts,{
        foreignKey:'productId',
        as:"Posts",
        allowNull:false,
        onDelete:"CASCADE"
    })
}
   return Comments;
}