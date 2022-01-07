<template>
  <div v-if="member" class="edit-form">
    <h4>Member</h4>
    <form>
      <member-form :member=member />
    </form>

    <button class="btn btn-success"
      @click="updateMember"
    >
      Update
    </button>

    <button class="btn btn-danger"
      @click="deleteMember"
    >
      Delete
    </button>

    <p>{{ message }}</p>
  </div>
</template>

<script>
import MemberDataService from "../services/MemberDataService";
import MemberForm from './MemberForm.vue';

export default {
  components: { MemberForm },
  name: "member-detail",
  data() {
    return {
      member: null,
      message: ''
    };
  },
  methods: {
    getMember(id) {
      MemberDataService.get(id)
        .then(response => {
          this.member = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateMember() {
      MemberDataService.update(this.member.id, this.member)
        .then(response => {
          console.log(response.data);
          this.message = 'The member was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteMember() {
      MemberDataService.delete(this.member.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "members" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getMember(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 800px;
  margin: auto;
}
</style>
