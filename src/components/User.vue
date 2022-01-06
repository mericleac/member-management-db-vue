<template>
  <div v-if="user" class="edit-form">
    <h4>User</h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
          v-model="user.name"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" class="form-control" id="email"
          v-model="user.email"
        />
      </div>
    </form>

    <button class="btn btn-success"
      @click="updateUser"
    >
      Update
    </button>

    <button class="btn btn-danger"
      @click="deleteUser"
    >
      Delete
    </button>

    <p>{{ message }}</p>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  name: "user-detail",
  data() {
    return {
      user: null,
      message: ''
    };
  },
  methods: {
    getUser(id) {
      UserDataService.get(id)
        .then(response => {
          this.user = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateUser() {
      UserDataService.update(this.user.id, this.user)
        .then(response => {
          console.log(response.data);
          this.message = 'The user was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteUser() {
      UserDataService.delete(this.user.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "users" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getUser(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
