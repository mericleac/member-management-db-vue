<template>
	<div class="col-md-12">
		<h4>Member List</h4>
		<button class="btn btn-primary" v-on:click="showFilter = !showFilter">
			Show Filter
		</button>
		<button
			class="btn btn-secondary"
			v-if="selectedMembers.length"
			v-on:click="exportMembers()"
		>
			Export Selected
		</button>
		<div v-if="showFilter">
			<div class="form-group">
				<label for="membership_type">Membership Type</label>
				<input
					type="text"
					class="form-control"
					id="membership_type"
					required
					v-model="filterMembershipType"
					name="membership_type"
				/>
			</div>
			<div class="form-group">
				<label for="membership_end_date_start"
					>Membership End Date - Start</label
				>
				<input
					type="text"
					class="form-control"
					id="membership_end_date_start"
					required
					v-model="filterMembershipEndDateStart"
					name="membership_end_date_start"
				/>
			</div>
			<div class="form-group">
				<label for="membership_end_date_end">Membership End Date - End</label>
				<input
					type="text"
					class="form-control"
					id="membership_end_date_end"
					required
					v-model="filterMembershipEndDateEnd"
					name="membership_end_date_end"
				/>
			</div>
			<div class="form-group">
				<label for="qb_date_start">QB Date - Start</label>
				<input
					type="text"
					class="form-control"
					id="qb_date_start"
					required
					v-model="filterQBDateStart"
					name="qb_date_start"
				/>
			</div>
			<div class="form-group">
				<label for="qb_date_end">QB Date - End</label>
				<input
					type="text"
					class="form-control"
					id="qb_date_end"
					required
					v-model="filterQBDateEnd"
					name="qb_date_end"
				/>
			</div>
			<button class="btn btn-primary" v-on:click="filterMembers()">
				Filter
			</button>
			<button class="btn btn-secondary" v-on:click="clearFilters()">
				Clear Filters
			</button>
		</div>
		<v-data-table
			v-model="selectedMembers"
			:headers="headers"
			:items="filteredMembers"
			disable-pagination
			:hide-default-footer="true"
			:multi-sort="true"
			show-select
		>
			<template v-slot:[`item.actions`]="{ item }">
				<v-icon small class="mr-2" @click="editMember(item.id)"
					>mdi-pencil</v-icon
				>
				<v-icon small @click="deleteMember(item.id)">mdi-delete</v-icon>
			</template>
		</v-data-table>
	</div>
</template>

<script>
import MemberDataService from "../services/MemberDataService";

export default {
	name: "members-list",
	data() {
		return {
			showFilter: false,
			filterMembershipType: null,
			filterMembershipEndDateStart: null,
			filterMembershipEndDateEnd: null,
			filterQBDateStart: null,
			filterQBDateEnd: null,
			members: [],
			selectedMembers: [],
			filteredMembers: [],
			headers: [
				{
					text: "First Name",
					align: "start",
					sortable: true,
					value: "first_name",
				},
				{ text: "Last Name", sortable: true, value: "last_name" },
				{ text: "Email", value: "email", sortable: true },
				{ text: "Street Address", sortable: true, value: "street_address" },
				{ text: "City", sortable: true, value: "city" },
				{ text: "State", sortable: true, value: "state" },
				{ text: "Zip", sortable: true, value: "zip" },
				{ text: "County", sortable: true, value: "county" },
				{ text: "Phone #", sortable: true, value: "phone_number" },
				{ text: "Membership Type", sortable: true, value: "type" },
				{ text: "Renewal", sortable: true, value: "renewal" },
				{
					text: "Membership End Date",
					sortable: true,
					value: "membership_end_date",
				},
				{ text: "QB Date", sortable: true, value: "qb_date" },
				{ text: "Invoice #", sortable: true, value: "invoice_num" },
				{ text: "Receipt #", sortable: true, value: "receipt_num" },
				{ text: "Notes", sortable: false, value: "notes" },
				{ text: "Actions", value: "actions", sortable: false },
			],
		};
	},
	methods: {
		retrieveMembers() {
			MemberDataService.getAll()
				.then((response) => {
					console.log(response);
					this.members = response.data;
					console.log(response.data);
					this.filterMembers();
				})
				.catch((e) => {
					console.log(e);
				});
		},

		refreshList() {
			this.retrieveMembers();
		},

		editMember(id) {
			this.$router.push({ name: "member-details", params: { id: id } });
		},

		deleteMember(id) {
			MemberDataService.delete(id)
				.then(() => {
					this.refreshList();
				})
				.catch((e) => {
					console.log(e);
				});
		},

		filterMembers() {
			let filteredMembers = this.members;

			if (this.filterMembershipType) {
				filteredMembers = filteredMembers.filter(
					(member) => member.type === this.filterMembershipType
				);
			}

			if (this.filterMembershipEndDateStart) {
				filteredMembers = filteredMembers.filter(
					(member) =>
						new Date(member.membership_end_date) >=
						new Date(this.filterMembershipEndDateStart)
				);
			}

			if (this.filterMembershipEndDateEnd) {
				filteredMembers = filteredMembers.filter(
					(member) =>
						new Date(member.membership_end_date) <=
						new Date(this.filterMembershipEndDateEnd)
				);
			}

			if (this.filterQBDateStart) {
				filteredMembers = filteredMembers.filter(
					(member) =>
						new Date(member.qb_date) >= new Date(this.filterQBDateStart)
				);
			}

			if (this.filterQBDateEnd) {
				filteredMembers = filteredMembers.filter(
					(member) => new Date(member.qb_date) <= new Date(this.filterQBDateEnd)
				);
			}

			const filteredIds = filteredMembers.map((member) => member.id);
			this.selectedMembers = this.selectedMembers.filter((member) =>
				filteredIds.includes(member.id)
			);
			this.filteredMembers = filteredMembers;
		},

		clearFilters() {
			this.filterMembershipType = null;
			this.filterMembershipEndDateStart = null;
			this.filterMembershipEndDateEnd = null;
			this.filterQBDateStart = null;
			this.filterQBDateEnd = null;

			this.filterMembers();
		},

		exportMembers() {
			console.log(this.selectedMembers);
		},
	},
	mounted() {
		this.retrieveMembers();
	},
};
</script>

<style>
.list {
	text-align: left;
	max-width: 750px;
	margin: auto;
}
</style>
