const sequelize = require(`../db`)
const {DataTypes} = require(`sequelize`)

// Define Models
const Clients = sequelize.define('Clients', {
  idClient: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  ClientName: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  ClientBirth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  ClientAddress: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ClientPhone: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
});

const Employees = sequelize.define('Employees', {
  idEmployee: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  EmployeeName: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  EmployeePhone: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  EmployeeAddress: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  EmployeeStatus: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  EmployeeExperience: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

const Services = sequelize.define('Services', {
  idService: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  ServiceName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  ServiceDescription: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ServicePrice: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

const Accountings = sequelize.define('Accountings', {
  idAccounting: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  AccountingDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

const Users = sequelize.define('Users', {
  idUsers: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  Role: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  Email: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  Password: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
});

// Define Associations
Clients.hasMany(Users, { foreignKey: 'idClient' });
Users.belongsTo(Clients, { foreignKey: 'idClient' });

Clients.hasMany(Accountings, { foreignKey: 'idClient' });
Accountings.belongsTo(Clients, { foreignKey: 'idClient' });

Employees.hasMany(Accountings, { foreignKey: 'idEmployee' });
Accountings.belongsTo(Employees, { foreignKey: 'idEmployee' });

Services.hasMany(Accountings, { foreignKey: 'idService' });
Accountings.belongsTo(Services, { foreignKey: 'idService' });

// Export models
module.exports = {
  Clients,
  Employees,
  Services,
  Accountings,
  Users,
};
