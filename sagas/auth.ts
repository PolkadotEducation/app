import { login, loginSuccess, loginFail } from '@/store/auth/reducers';
import { put } from 'redux-saga/effects';

export function* handleLogin(action: ReturnType<typeof login>) {
  try {
    // TODO add API call
    if (
      action?.payload.email === process.env.NEXT_PUBLIC_TEMPORARY_LOGIN &&
      action?.payload.password === process.env.NEXT_PUBLIC_TEMPORARY_PASSWORD
    ) {
      yield put(loginSuccess());
      action.payload.navigation.push('/');
    } else {
      throw new Error('User not found');
    }
  } catch (e) {
    let message = 'Unknown Error';
    if (e instanceof Error) message = e.message;

    put(loginFail({ error: message }));
  }
}
