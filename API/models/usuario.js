'use strict';

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('usuario', {
    firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				isEmail: true
			}
		},
		documentNumber: {
            type: DataTypes.NUMBER,
            allowNull: false,
            unique: true,			
		},
		phoneNumber: {
			type: DataTypes.NUMBER,
            allowNull: false,
            unique: true,
		},
		balance: {
			type: DataTypes.FLOAT,
		}
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'usuario',
    classMethods: {}
  });
  Usuario.associate = function(models) {
  // associations can be defined here
  };
  return Usuario;
}
