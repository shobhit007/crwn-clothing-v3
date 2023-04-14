import { all, call, takeLatest, put } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";

import {
  signInSucces,
  signInFailed,
  signUpFailed,
  signUpSuccess,
  signOutFailed,
  signOutSuccess,
} from "./user.action";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signinWithGooglePopup,
  signinAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from "../../firebase/firebase.util";

export function* getUserSnapshotFromAuth(userAuth) {
  try {
    const userSnapshot = yield call(createUserDocumentFromAuth, userAuth);
    yield put(signInSucces({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signinWithGooglePopup);
    yield call(getUserSnapshotFromAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signinAuthUserWithEmailAndPassword,
      email,
      password
    );

    yield call(getUserSnapshotFromAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInAfterSingUp({ payload: { user } }) {
  try {
    yield call(getUserSnapshotFromAuth, user);
  } catch (error) {
    yield put(signUpFailed(error));
  }
}

export function* signupWithEmailAndPassword({
  payload: { email, password, displayName },
}) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );

    user.displayName = displayName;
    yield put(signUpSuccess(user));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getUserSnapshotFromAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signupWithEmailAndPassword);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSingUp);
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGNIN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGNIN_START, signInWithEmail);
}

export function* onChangeUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onChangeUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
