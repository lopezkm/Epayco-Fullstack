'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
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
            type: DataTypes.INTEGER, 
            allowNull: false,
            unique: true,			
		},
		phoneNumber: {
			type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
		},
		balance: {
			type: DataTypes.FLOAT,
		}
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'user',
    classMethods: {}
  });
  
  return User;
}