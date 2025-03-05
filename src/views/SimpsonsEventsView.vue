<template>
  <div class="container mx-auto p-6">
    <h2 class="text-2xl font-bold text-yellow-500 mb-4">Simpsons Events</h2>

    <div v-if="loading" class="text-center text-gray-700">Loading events...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

    <div class="mb-4">
      <input v-model="newEvent.name" placeholder="Event navn" class="border p-2 mr-2">
      <input v-model="newEvent.description" placeholder="Beskrivelse" class="border p-2 mr-2">
      <input v-model="newEvent.imageURL" placeholder="Billede URL" class="border p-2">
      <button @click="createEvent" class="ml-2 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600">Tilføj Event</button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="event in events" :key="event.id" class="bg-white p-4 rounded-lg shadow-lg relative">
        <img :src="event.imageURL" alt="Event Image" class="w-full h-48 object-cover rounded-lg mb-4">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ event.name }}</h3>
        <p class="text-gray-600">{{ event.description }}</p>
        <button class="mt-4 bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600">Join Event</button>
        <button @click="deleteEvent(event.id)" class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600">X</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const events = ref([]);
const loading = ref(true);
const error = ref(null);
const newEvent = ref({ name: '', description: '', imageURL: '' });

onMounted(async () => {
  await fetchEvents();
});

const fetchEvents = async () => {
  try {
    const response = await fetch('/api/events');
    if (!response.ok) throw new Error("Failed to fetch events");
    events.value = await response.json();
  } catch (err) {
    error.value = "Failed to load events.";
  } finally {
    loading.value = false;
  }
};

const createEvent = async () => {
  try {
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent.value)
    });
    if (!response.ok) throw new Error("Failed to create event");
    await fetchEvents();
    newEvent.value = { name: '', description: '', imageURL: '' };
  } catch (err) {
    error.value = "Failed to create event.";
  }
};

const deleteEvent = async (id) => {
  try {
    const response = await fetch(`/api/events/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error("Failed to delete event");
    await fetchEvents();
  } catch (err) {
    error.value = "Failed to delete event.";
  }
};
</script>

<style scoped>
</style>
