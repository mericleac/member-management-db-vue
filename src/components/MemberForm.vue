<template>
  <div>
    <div class="form-group">
      <label for="first_name">First Name</label>
      <input
        type="text"
        class="form-control"
        id="first_name"
        required
        v-model="member.first_name"
        name="first_name"
      />
    </div>

    <div class="form-group">
      <label for="last_name">Last Name</label>
      <input
        type="text"
        class="form-control"
        id="last_name"
        required
        v-model="member.last_name"
        name="last_name"
      />
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input
        class="form-control"
        id="email"
        required
        v-model="member.email"
        name="email"
      />
    </div>

    <div class="form-group">
      <label for="street_address">Street Address</label>
      <input
        class="form-control"
        id="street_address"
        required
        v-model="member.street_address"
        name="street_address"
      />
    </div>

    <div class="form-group">
      <label for="city">City</label>
      <input
        class="form-control"
        id="city"
        required
        v-model="member.city"
        name="city"
      />
    </div>

    <div class="form-group">
      <label for="state">State</label>
      <input
        class="form-control"
        id="state"
        required
        v-model="member.state"
        name="state"
      />
    </div>

    <div class="form-group">
      <label for="zip">Zip</label>
      <input
        class="form-control"
        id="zip"
        required
        v-model="member.zip"
        name="zip"
      />
    </div>

    <div class="form-group">
      <label for="county">County</label>
      <input
        class="form-control"
        id="county"
        required
        v-model="member.county"
        name="county"
      />
    </div>

    <div class="form-group">
      <label for="phone_number">Phone #</label>
      <input
        class="form-control"
        id="phone_number"
        required
        v-model="member.phone_number"
        name="phone_number"
        v-mask="'(###) ###-####'"
      />
    </div>

    <div class="form-group">
      <label for="type">Membership Type</label>
      <select
        class="form-control"
        id="type"
        required
        v-model="member.type"
        name="type"
      >
        <option>Donation - unrestricted</option>
        <option>Donation - designated</option>
        <option>Individual</option>
        <option>Family</option>
        <option>Steward</option>
        <option>Protector</option>
        <option>Benefactor</option>
        <option>River Legacy Circle</option>
        <option>Municipal</option>
        <option>Business</option>
      </select>
    </div>

    <div class="form-group">
      <label for="type">Renewal</label>
      <select
        class="form-control"
        id="type"
        required
        v-model="member.renewal"
        name="type"
      >
        <option>Renewal - upgrade</option>
        <option>Renewal - downgrade</option>
        <option>New</option>
      </select>
    </div>

    <div class="form-group">
      <label for="membership_end_date">Membership End Date</label>
      <input
        class="form-control"
        id="membership_end_date"
        required
        v-model="member.membership_end_date"
        name="membership_end_date"
        type="date"
      />
    </div>

    <div class="form-group">
      <label for="qb_date">QB Date</label>
      <input
        class="form-control"
        id="qb_date"
        required
        v-model="member.qb_date"
        name="qb_date"
        type="date"
      />
    </div>

    <div class="form-group">
      <label for="invoice_num">Invoice #</label>
      <input
        class="form-control"
        id="invoice_num"
        required
        v-model="member.invoice_num"
        name="invoice_num"
      />
    </div>

    <div class="form-group">
      <label for="receipt_num">Receipt #</label>
      <input
        class="form-control"
        id="receipt_num"
        required
        v-model="member.receipt_num"
        name="receipt_num"
      />
    </div>

    <div class="form-group">
      <label for="notes">Notes</label>
      <textarea
        class="form-control"
        id="notes"
        required
        v-model="member.notes"
        name="notes"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "member-form",
  props: {
    member: {
      type: Object,
      required: true,
    },
  },
};
</script>
