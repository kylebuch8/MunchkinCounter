<script setup lang="ts">
import { ref } from "vue";

const players = [];
const dialog = ref(null);
const playerName = ref(null);
const addPlayerForm = ref(null);

const openAddPlayerModal = () => {
  if (!dialog.value) {
    return;
  }

  dialog.value.showModal();
};

const addPlayer = () => {
  players.push({
    name: playerName.value,
  });

  addPlayerForm.value.reset();
  dialog.value.close();
  console.log(players);
};
</script>

<template>
  <h1>Setup</h1>
  <h2>Players</h2>
  <button v-on:click="openAddPlayerModal">Add player</button>
  <dialog ref="dialog">
    <form ref="addPlayerForm" @submit.prevent="addPlayer">
      <input type="text" placeholder="Name" v-model="playerName" />
      <button>Add player</button>
    </form>
  </dialog>
</template>
