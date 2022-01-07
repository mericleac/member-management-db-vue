<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <MemberForm :member=member />

      <button @click="saveMember" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newMember">Add</button>
    </div>
  </div>
</template>

<script>
import MemberDataService from "../services/MemberDataService";
import MemberForm from '@/components/MemberForm.vue';

export default {
  components: { MemberForm },
  name: "add-member",
  data() {
    return {
      member: {
        id: null
      },
      submitted: false
    };
  },
  methods: {
    saveMember() {
      MemberDataService.create(this.member)
        .then(response => {
          this.member.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newMember() {
      this.submitted = false;
      this.member = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 800px;
  margin: auto;
}
</style>
