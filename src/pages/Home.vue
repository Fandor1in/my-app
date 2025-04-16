<script setup>
import { user } from "../lib/stores/user";
import { ideas } from "../lib/stores/ideas";
import { onMounted, ref } from "vue";

const title = ref("");
const description = ref("");

function addIdea() {
  ideas.add({
    userId: user.current.$id,
    title: title.value,
    description: description.value,
  });
  title.value = "";
  description.value = "";
}

onMounted(() => {
  ideas.init();
});
</script>

<template>
  <div>
    <section v-if="user.current">
      <h2>Submit Idea</h2>
      <form>
        <input
          type="text"
          placeholder="Title"
          v-model="title"
        />
        <textarea
          placeholder="Description"
          v-model="description"
        ></textarea>
        <button type="button" @click="addIdea()">Submit</button>
      </form>
    </section>
    <section v-else><p>Please login to submit an idea.</p></section>

    <section v-if="ideas.current">
      <h2>Latest Ideas</h2>
      <ul>
        <li v-for="idea in ideas.current" :key="idea.$id">
          <strong>{{ idea.title }}</strong>
          <p>{{ idea.description }}</p>
          <button
            v-if="user.current && idea.userId === user.current.$id"
            type="button"
            @click="ideas.remove(idea.$id)"
          >
            Remove
          </button>
        </li>
      </ul>
    </section>
  </div>
</template>
