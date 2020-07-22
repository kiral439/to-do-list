import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    toDos: [
      {
        id: 1,
        name: "New Todo",
        list: [
          {
            name: "Test List1",
            done: false
          },
          {
            name: "Test List1",
            done: false
          }
        ]
      }
    ]
  },
  mutations: {
    ADD_TODO: function(state, value) {
      state.toDos.push(value);
    },
    DELETE_TODO: function(state, index) {
      state.toDos.splice(index, 1);
    },
    ADD_TODO_LIST: function(state, payload) {
      state.toDos[payload.index].list.push(payload.value);
    },
    DELETE_TODO_LIST: function(state, payload) {
      state.toDos[payload.index].list.splice(payload.listIndex, 1);
    }
  },
  actions: {
    updateToDo: function({ commit }, value) {
      commit("ADD_TODO", value);
    },
    deleteTodo: function({ commit }, index) {
      commit("DELETE_TODO", index);
    },
    addTodoList: function({ commit }, payload) {
      commit("ADD_TODO_LIST", payload);
    },
    deleteTodoList: function({ commit }, payload) {
      commit("DELETE_TODO_LIST", payload);
    }
  },
  modules: {},
  getters: {
    toDoLength: state => {
      return index => state.toDos[index].list.length;
    },
    toDoId: state => {
      return state.toDos.length;
    },
    doneLength: state => {
      return index => state.toDos[index].list.filter(todo => !todo.done).length;
    }
  }
});
