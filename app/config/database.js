module.exports = {
  development: {
    username: "root",
    password: null,
    database: "invitelah_development",
    host: "127.0.0.1",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  test: {
    username: "root",
    password: null,
    database: "invitelah_test",
    host: "127.0.0.1",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    username: "invitela_root",
    password: "g4aG5Rb6PDdT",
    database: "invitela_production",
    host: "127.0.0.1",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
