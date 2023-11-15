import { nanoid } from "nanoid";

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
  function upsert(body) {
    const user = {
      name: body.name,
    };
    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid();
    }
    return store.upsert(TABLA, user);
  }
  return { list, get, upsert };
}
