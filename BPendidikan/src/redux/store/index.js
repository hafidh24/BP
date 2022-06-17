import { createStore } from 'redux';
// import user from '../reducer/index';
export function user(
  state = {
    id: '',
    id_karyawan: '',
    name: '',
    tema:'',
    presensi:'',
    color:'',
    akun:'',
  },
  action,
) {
  switch (action.type) {
    case 'CHANGE/USER':
      return { ...state, ...action.payload };
  }

  return state;
}

export const store = createStore(user);