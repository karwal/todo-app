<template>
  <div class="home">
    <div class="center">
      <h1>To Do List</h1>
      <md-button class="md-raised" @click="showDialog = true">Add Todo</md-button>
    </div>
<div class="content">
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Add Todo</md-dialog-title>
        <form @submit="addNewTodo" novalidate>
          <md-field :class="{ 'md-invalid': errors.has('description') }">
            <label for="description">Description</label>
            <md-input
              type="text"
              name="description"
              v-model="taskData.description"
              v-validate="'required'"
            ></md-input>
            <span class="md-error" v-if="errors.has('description')">{{errors.first('description')}}</span>
          </md-field>
<md-dialog-actions>
            <md-button class="md-primary" @click="showDialog = false">Close</md-button>
            <md-button class="md-primary" @click="showDialog = false">Save</md-button>
          </md-dialog-actions>
        </form>
      </md-dialog>
      <div class="lists">
        <div class="left">
          <h2>To Do</h2>
          <draggable v-model="todo" group="tasks" @change="updateTodo">
            <div v-for="t in todo" :key="t.id" class="item">
              {{t.description}}
              <a @click="deleteTask(t.id)">
                <md-icon>close</md-icon>
              </a>
            </div>
          </draggable>
        </div>
        <div class="right">
          <h2>Done</h2>
          <draggable v-model="done" group="tasks" @change="updateTodo">
            <div v-for="d in done" :key="d.id" class="item">
              {{d.description}}
              <a @click="deleteTask(d.id)">
                <md-icon>close</md-icon>
              </a>
            </div>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import draggable from "vuedraggable";
import { todoMixin } from "@/mixins/todoMixin";
export default {
  name: "home",
  components: {
    draggable
  },
  computed: {
    isFormDirty() {
      return Object.keys(this.fields).some(key => this.fields[key].dirty);
    }
  },
  mixins: [todoMixin],
  data() {
    return {
      todo: [],
      done: [],
      showDialog: false,
      taskData: {}
    };
  },
  beforeMount() {
    this.getNewTodos();
  },
  methods: {
    async addNewTodo(evt) {
      evt.preventDefault();
      if (!this.isFormDirty || this.errors.items.length > 0) {
        return;
      }
      await this.addTodo(this.taskData);
      this.showDialog = false;
      this.getNewTodos();
    },
    async getNewTodos() {
      const response = await this.getTodos();
      this.todo = response.data.filter(t => !t.done);
      this.done = response.data.filter(t => t.done);
    },
    async updateTodo(evt) {
      let todo = evt.removed && evt.removed.element;
      if (todo) {
        todo.done = !todo.done;
        await this.editTodo(todo);
      }
    },
    async deleteTask(id) {
      await this.deleteTodo(id);
      this.getNewTodos();
    }
  }
};
</script>
<style lang="scss" scoped>
.center {
  text-align: center;
}
.md-dialog {
  width: 70vw;
}
form {
  width: 92%;
}
.md-dialog-title.md-title {
  color: black !important;
}
.lists {
  padding-left: 5vw;
  display: flex;
  align-items: flex-start;
  .left,
  .right {
    width: 45vw;
    padding: 20px;
    min-height: 200px;
    .item {
      padding: 10px;
      border: 1px solid black;
      background-color: white;
      display: flex;
      justify-content: space-between;
      a {
        cursor: pointer;
      }
    }
  }
}
</style>