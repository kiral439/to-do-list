<template>
  <div class="container">
    <input class="text" v-model="name" placeholder="New Todo" />
    <button @click="addTodo"><BaseIcon name="edit" /></button>
    <ToDoCard
      v-for="(toDo, index) in toDos"
      :key="index"
      :toDo="toDo"
      :index="index"
    ></ToDoCard>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import ToDoCard from "@/components/ToDoCard.vue";
import BaseIcon from "@/components/BaseIcon.vue";

import { mapState } from "vuex";

export default {
  data() {
    return {
      name: ""
    };
  },
  name: "ToDos",
  components: {
    ToDoCard,
    BaseIcon
  },
  methods: {
    addTodo: function() {
      if (this.name === "") {
        this.name = "New Todo";
      }
      this.$store.dispatch("updateToDo", {
        id: this.$store.getters.toDoId + 1,
        name: this.name,
        list: []
      });
      this.name = "";
    }
  },
  computed: {
    ...mapState(["toDos"])
  }
};
</script>

<style scoped>
input.text {
  color: silver;
  vertical-align: middle;
  border: solid 1px silver;
  border-radius: 15px;
  padding: 5px 15px;
}
</style>
<style>
.container {
  width: 500px;
  margin: 0 auto;
}
button {
  background: transparent;
  outline: none;
  border: none;
  vertical-align: middle;
}
</style>
