const dummyAuth0 = () => ({
  login: () => {},
  logout: () => {},
  getAccessToken: () => {},
  isAuthenticated: false,
  isLoading: false,
  user: {
    name: "John Doe",
    picture: "https://via.placeholder.com/150",
    email: "john.doe@domain.com",
  }
});

export {dummyAuth0}