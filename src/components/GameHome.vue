<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getDatabase, ref as firebaseRef, set } from "firebase/database";

const gameId = ref(null);
const router = useRouter();
const onSubmit = () => {
  console.log(gameId.value);
};

const startNewGame = () => {
  const id = generateRandomId();
  const game = {
    players: [],
    winningLevel: 10,
  };

  const db = getDatabase();
  set(firebaseRef(db, `/games/${id}`), game).then(() => {
    router.push(`/game/${id}/setup`);
  });
};

const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 7);
};
</script>

<template>
  <h1>Munchkin Counter</h1>
  <form @submit.prevent="onSubmit">
    <input type="text" placeholder="Game ID" v-model="gameId" />
    <button>Join</button>
  </form>
  <button v-on:click="startNewGame">Start a new game</button>
</template>
