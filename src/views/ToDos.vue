<template>
  <div class="container">
    <input class="text" v-model="name" placeholder="New Todo" />
    <button @click="addTodo"><BaseIcon name="edit" /></button>
    <button><BaseIcon name="save" /></button>
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
// import TodoService from "@/services/TodoService.js";

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
  /*
  created() {
    TodoService.getTodos()
      .then(response => {
        this.$store.dispatch("fetchEvents", response.data);
      })
      .catch(error => {
        console.log("There was an error:  " + error);
      });
  },
  */
  methods: {
    /*
    saveCurrentTodo: function() {
      TodoService.postTodo(this.toDos)
        .then(() => {
          console.log("Success");
        })
        .catch(error => {
          console.log("Error " + error);
        });
    },
    */
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
