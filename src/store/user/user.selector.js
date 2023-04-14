import { createSelector } from "reselect";

const selectCurrentUserReducer = (state) => state.userReducer;

export const selectCurrentUser = createSelector(
  [selectCurrentUserReducer],
  (user) => user.currentUser
);

export const selectIsUserLoading = createSelector(
  [selectCurrentUserReducer],
  (user) => user.isLoading
);

export const selectUserError = createSelector(
  [selectCurrentUserReducer],
  (user) => user.error
);
