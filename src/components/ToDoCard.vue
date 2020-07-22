<template>
  <div class="wrapper">
    <h1>
      Todo for {{ fullName }}
      <button @click="deleteToDo"><BaseIcon name="delete" /></button>
    </h1>
    <form class="form" @submit.prevent="addTodoList">
      <label>
        <input class="checkbox v-align" v-bind="lists.done" type="checkbox" />
        <BaseIcon
          class="v-align"
          :class="{ checked: lists.done }"
          name="check-circle"
        />
      </label>
      <span>
        <input type="text" v-model="lists.name" class="list-input" />
      </span>
    </form>
    <div class="list">
      <p
        :class="{ checked: innerList.done }"
        v-for="(innerList, index) in toDoElements"
        :key="index"
      >
        <label>
          <input
            class="checkbox v-align"
            v-model="innerList.done"
            type="checkbox"
          />
          <BaseIcon
            class="v-align"
            :class="{ checked: innerList.done }"
            name="check-circle"
          />

          {{ innerList.name }}
        </label>
        <button>
          <BaseIcon
            class="v-align"
            :class="{ checked: innerList.done }"
            name="edit-2"
          />
        </button>
        <button @click="deleteTodoList(index)">
          <BaseIcon
            class="v-align"
            :class="{ checked: innerList.done }"
            name="delete"
          />
        </button>
      </p>
    </div>
    <div class="bottom-text">
      <span>{{ doneTodoListCount }}</span>
      <div class="links">
        <span @click="active = 0">All</span>
        |
        <span @click="active = 1">Completed</span>
        |
        <span @click="active = 2">Not Completed</span>
      </div>
      <span>{{ todoListLength }}</span>
    </div>
  </div>
</template>

<script>
import BaseIcon from "@/components/BaseIcon.vue";

export default {
  components: {
    BaseIcon
  },
  data() {
    return {
      checked: false,
      lists: {
        name: "",
        done: false
      },
      active: 0,
      payload: {},
      toDoStateObj: {}
    };
  },
  props: {
    toDo: Object,
    index: Number
  },
  methods: {
    deleteToDo: function() {
      this.$store.dispatch("deleteTodo", this.index);
    },
    addTodoList: function() {
      this.payload = { value: this.lists, index: this.index };
      this.$store.dispatch("addTodoList", this.payload);
      this.lists = {
        name: "",
        done: false
      };
    },
    deleteTodoList: function(listIndex) {
      this.payload = {
        index: this.index,
        listIndex: listIndex
      };
      this.$store.dispatch("deleteTodoList", this.payload);
    }
  },
  computed: {
    toDoElements: function() {
      if (this.active == 0) {
        return this.toDo.list;
      } else if (this.active == 1) {
        return this.toDo.list.filter(todoListElement => todoListElement.done);
      } else if (this.active == 2) {
        return this.toDo.list.filter(todoListElement => !todoListElement.done);
      } else {
        return "";
      }
    },
    fullName: function() {
      if (this.toDo.name === "") {
        return this.toDo.name + " " + this.toDo.id;
      } else {
        return this.toDo.name;
      }
    },
    doneTodoListCount: function() {
      var count = this.$store.getters.doneLength(this.index);
      return (count += count < 2 ? " item" : " items") + " left";
    },
    todoListLength: function() {
      var length = this.$store.getters.toDoLength(this.index);
      return (length += length < 2 ? " item" : " items") + " total";
    }
  }
};
</script>

<style scoped>
.wrapper {
  margin-top: 20px;
  box-shadow: 1px 1px 6px 0.5px #c4c4c4;
  border: silver 1px solid;
  padding: 0 20px;
}
.checkbox {
  appearance: none;
}
.checked {
  color: silver;
  text-decoration: line-through;
}
p {
  color: green;
  border-bottom: solid #ddd 1px;
  padding-bottom: 10px;
}
.v-align {
  vertical-align: middle;
}
.list {
  text-align: left;
}
.form {
  margin-bottom: 20px;
}
.form label {
  float: left;
  margin-top: 5px;
}
.list-input {
  width: 91%;
  box-sizing: border-box;
  height: 33px;
  border: 1px silver solid;
  border-radius: 15px;
  padding: 5px 15px;
}
.bottom-text {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.links {
  cursor: pointer;
}
</style>
