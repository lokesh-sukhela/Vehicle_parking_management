module.exports=(sequelize,DataTypes)=>{
const Vehicle = sequelize.define('Vehicle', {
    vehicleType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numberPlate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    parkingFee: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});
return Vehicle;
}