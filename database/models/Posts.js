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
        updatedAt:{
            type:dataTypes.DATE,
        },
        comments:{
            type: dataTypes.INTEGER,
        }
    }

    let config = {
        tableName: 'posts', 
        timestamps: true, //Si la tabla no tiene los campos created_at y updated_at
        underscored: false, //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.        
    }

    const Posts = sequelize.define(alias, cols, config);
    Posts.associate = function(models) {
        Posts.belongsTo(models.Users,{
            foreignKey:'userId',
            as: "user",
            allowNull:false,
            onDelete: "CASCADE",
            
        })
        Posts.hasMany(models.Comments,{
            foreignKey:'productId',
            allowNull: false,
            as: "comment"
        })
        Posts.hasMany(models.Followers,{
            foreignKey:'follower',
            allowNull:'false'
        })
    }
   return Posts;
}