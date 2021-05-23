module.exports = function(sequelize, dataTypes){

    //Definir un alias.
    let alias = 'Users'; //Con este alias sequelize va a identificar internamente al archivo de modelo.

    //Describir la configuración de las columnas de la tabla
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        name:{
            type: dataTypes.STRING,
        },
        lastName:{
            type:dataTypes.STRING,
        },
        email:{
            type: dataTypes.STRING,
        },
        phone:{
            type: dataTypes.INTEGER,
        },
        gender:{
            type: dataTypes.STRING,
        },
        password:{
            type: dataTypes.STRING,
        },
        birthday:{
            type: dataTypes.DATE,
        },
        image:{
            type:dataTypes.STRING
        }
    }

    let config = {
        tableName: 'users', 
        timestamps: false, //Si la tabla no tiene los campos created_at y updated_at
        underscored: false, //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.        
    }

   const Users = sequelize.define(alias, cols, config);
    Users.associate = function(models) {
        Users.hasMany(models.Posts,{
            foreignKey: 'userId',
            as: "Posts",
            allowNull:false,
            
        })
        Users.hasMany(models.Comments,{
            foreignKey:'userId',
            as:"Comments",
            allowNull:false,
            
        })
        Users.hasMany(models.Followers,{
            foreignKey:"follower",
            as:"follower"
        })
        Users.hasMany(models.Followers,{
            foreignKey:'followed',
            as:'followed'
        })
    }
   return Users;
}