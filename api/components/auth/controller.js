import { sign } from "../../../auth/jwt.js";
const TABLA = "auth";

export default function Controller(injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = import("../../../store/dummy.js");
  }

  function upsert(data) {
    const authData = {
      id: data.id,
    };

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = data.password;
    }

    return store.upsert(TABLA, authData);
  }

  async function login(username, password) {
    const data = await store.query(TABLA, { username: username });
    if (data.password === password) {
      //Generar token
      const token = sign(data);
      return token;
    } else {
      throw new Error("Información invalida");
    }
    return data;
  }

  return {
    upsert,
    login,
  };
}
