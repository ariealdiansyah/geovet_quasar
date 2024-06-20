import { store } from "quasar/wrappers";
import { createStore } from "vuex";
import SecureLS from 'secure-ls';
import VuexPersister from 'vuex-persister'

import login from "./login";
import customer from "./customer";
import global from "./global";
import groceries from "./groceries";
import pets from "./pets";
import medicine from "./medicine";
import clinic from "./clinic";
import groomings from "./groomings";

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const ls = new SecureLS({
  isCompression: false
});

const vuexPersister = new VuexPersister({
  key: 'geovet',
  storage: {
    getItem: (key) => ls.get(key),
    setItem: (key, value) => ls.set(key, value),
    removeItem: (key) => ls.remove(key),
    length: ls.getAllKeys().length,
    clear: () => ls.clear(),
  }
})

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      login,
      customer,
      global,
      groceries,
      pets,
      medicine,
      clinic,
      groomings
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,

    plugins: [vuexPersister.persist]
  });

  return Store;
});
