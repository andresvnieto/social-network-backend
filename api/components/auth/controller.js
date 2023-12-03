import bcrypt from "bcrypt";
import auth from "../../../auth/index.js";
const TABLA = "auth";

export default function Controller(injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = import("../../../store/dummy.js");
  }

  async function upsert(data) {
    const authData = {
      id: data.id,
    };

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
    }

    return store.upsert(TABLA, authData);
  }

  async function login(username, password) {
    const data = await store.query(TABLA, { username: username });
    return bcrypt.compare(password, data.password).then((validPassword) => {
      if (validPassword === true) {
        //Generar token
        const token = auth.sign(data);
        return token;
      } else {
        throw new Error("Información invalida");
      }
    });
  }

  return {
    upsert,
    login,
  };
}
