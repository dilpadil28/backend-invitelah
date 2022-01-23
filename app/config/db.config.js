module.exports = {
  development: {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "invitelah_development",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  test: {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "invitelah_test",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "invitelah_production",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
