import { all, takeEvery} from 'redux-saga/effects';
import { handleLogin } from './auth';
import { login } from '@/store/auth/reducers';

export default function* rootSaga() {
  yield all([
    takeEvery(login.type, handleLogin),
  ]);
}

