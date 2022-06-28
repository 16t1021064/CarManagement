const setCurrentUser = (currentUSer) => ({
  type: 'SET_CURRENT_USER',
  payload: currentUSer,
});

export default {
  setCurrentUser,
};
