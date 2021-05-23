module.exports = function(sequelize, dataTypes){

    //Definir un alias.
    let alias = 'Followers'; //Con este alias sequelize va a identificar internamente al archivo de modelo.

    //Describir la configuración de las columnas de la tabla
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        followed:{
            type: dataTypes.INTEGER,
        },
        follower:{
            type:dataTypes.INTEGER,
        },
        
    }

    let config = {
        tableName: 'followers', 
        timestamps: false, //Si la tabla no tiene los campos created_at y updated_at
        underscored: false, //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.        
    }

   const Followers = sequelize.define(alias, cols, config);
    Followers.associate = function(models) {
        Followers.belongsTo(models.Users,{
            foreignKey:'followed',
            as: "followedUser",
            allowNull:false,
            onDelete: "CASCADE",
            
        })
        Followers.belongsTo(models.Users,{
            foreignKey:'follower',
            as: "followerUser",
            allowNull:false,
            onDelete: "CASCADE",
            
        })
    }
   return Followers;
}