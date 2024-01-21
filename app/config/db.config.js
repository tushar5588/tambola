module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "greatest@22",
  DB: "Tambola",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
