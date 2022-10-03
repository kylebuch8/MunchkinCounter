import { createApp } from "vue";
import { createPinia } from "pinia";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, signInAnonymously } from "firebase/auth";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const firebaseConfig = {
  apiKey: "AIzaSyD8eaNZoH0-TNzy7BrYD-WYFnDHvGkOXgg",
  authDomain: "munchkincounter-eaefb.firebaseapp.com",
  databaseURL: "https://munchkincounter-eaefb.firebaseio.com",
  projectId: "munchkincounter-eaefb",
  storageBucket: "munchkincounter-eaefb.appspot.com",
  messagingSenderId: "619605166975",
  appId: "1:619605166975:web:bdb5b4498f6ac03f9de84a",
};

const app = createApp(App);
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const auth = getAuth();
signInAnonymously(auth);

app.use(createPinia());
app.use(router);

app.mount("#app");
