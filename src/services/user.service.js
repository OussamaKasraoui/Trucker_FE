import createCustomAPI from './useAPI';

const UserService = {
  API: null, // Placeholder for Axios instance
  Maker: undefined,
  calls: 0,

  // Initialize the API with a customField value
  init(customField) {
    this.Maker = customField;
    this.calls = this.calls+1;
      this.API = createCustomAPI(customField);

    if (!this.API) {
    }
  },

  // Methods for API calls
  postAnonym(context, action, data) {
    return this.API.post(`/${context}/${action}`, data);
  },

  getAnonym(context, action) {
    return this.API.get(`/${context}/${action}`);
  },

  postXATdata(context, action, data) {
    return this.API.post(`/${context}/${action}`, data);
  },

  getXATdata(context, action, dependency, controller, location) {
    return this.API.get(`/${context}/${action}/`, {
      params: dependency,
      cancelToken: controller.token,
    });
  },

  patchXATdata(context, action, id, update) {
    return this.API.put(`/${context}/${action}/${id}/`, update);
  },

  getPublicContent() {
    return this.API.get('/users/');
  },

  checkLoggedUser() {
    return this.API.post('/users/check', {});
  },

  postUserBoard(action) {
    return this.API.post(`/users/${action}`);
  },

  getModeratorBoard(action) {
    return this.API.get(`/users/${action}`);
  },

  getAdminBoard(action) {
    return this.API.get(`/users/${action}`);
  },
};

export default UserService;
