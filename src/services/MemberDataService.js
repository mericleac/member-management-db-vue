import http from "../http-common";

class MemberDataService {
  getAll() {
    return http.get("/members");
  }

  get(id) {
    return http.get(`/members/${id}`);
  }

  create(data) {
    return http.post("/members", data);
  }

  update(id, data) {
    return http.put(`/members/${id}`, data);
  }

  delete(id) {
    return http.delete(`/members/${id}`);
  }

  import(formData) {
    const headers = { 'Content-Type': 'multipart/form-data' };
    return http.post('/members/import', formData, { headers });
  }
}

export default new MemberDataService();
