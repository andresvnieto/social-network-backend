import { nanoid } from "nanoid";
import Auth from "../auth/index.js";

const TABLA = "user";

export default function Controller(injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = import("../../../store/dummy.js");
  }
  function list() {
    return store.list(TABLA);
  }
  function get(id) {
    return store.get(TABLA, id);
  }
  async function upsert(body) {
    const user = {
      name: body.name,
      username: body.username,
      password: body.password
    };
    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid();
    }

    if (body.password || body.username) {
      await Auth.upsert({
        id: user.id,
        username: user.username,
        password: user.password,
      });
    }
    return store.upsert(TABLA, user);
  }
  return { list, get, upsert };
}
