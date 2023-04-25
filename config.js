import "dotenv/config";

function required(key, defaultValue = "undefined") {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key(${key}) is undefined`);
  }

  return value;
}

export const config = {
  jwt: {
    scretKey: required("JWT_SCRET_KEY"),
    expiresSec: parseInt(required("JWT_EXPIRES_SEC")),
  },
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS")),
  },
  db: {
    host: required("DB_HOST"),
    user: required("DB_USER"),
    password: required("DB_PASSWORD"),
    database: required("DB_DATABASE"),
  },
  server: {
    port: parseInt(required("SERVER_PORT")),
  },
};
