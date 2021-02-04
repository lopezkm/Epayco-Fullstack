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
    tableName: 'user',
    classMethods: {}
  });
  User.associate = function(models) {
  // associations can be defined here
  };
  return User;
}