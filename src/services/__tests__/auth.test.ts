import {
  authReducer,
  register,
  login,
  logout,
  getUser,
  initialState,
  updateUser
} from '../auth';
import { TUser } from '@utils-types';

describe('Тестирование редьюсера авторизации', () => {
  const fakeUser: TUser = {
    name: 'user',
    email: 'user@user.ru',
  };
  const errorMessage = 'error';

  test('Запрос получения данных пользователя', () => {
    const state = authReducer(initialState, {
      type: getUser.pending.type,
    });
    expect(state.error).toEqual(null);
    expect(state.isAuth).toEqual(false);
  });

  test('Успешное получение данных пользователя', () => {
    const state = authReducer(initialState, {
      type: getUser.fulfilled.type,
      payload: {
        user: fakeUser,
      },
    });
    expect(state.isAuth).toEqual(true);
    expect(state.user).toEqual(fakeUser);
  });

  test('Ошибка получения данных пользователя', () => {
    const state = authReducer(initialState, {
      type: getUser.rejected.type,
      error: {
        message: errorMessage,
      },
    });
    expect(state.error).toEqual(errorMessage);
  });

  test('Запрос регистрации', () => {
    const state = authReducer(initialState, {
      type: register.pending.type,
    });
    expect(state.error).toEqual(null);
  });

  test('Успешная регистрация', () => {
    const state = authReducer(initialState, {
      type: register.fulfilled.type,
      payload: {
        user: fakeUser,
      },
    });
    expect(state.user).toEqual(fakeUser);
  });

  test('Ошибка регистрации', () => {
    const state = authReducer(initialState, {
      type: register.rejected.type,
      error: {
        message: errorMessage,
      },
    });
    expect(state.error).toEqual(errorMessage);
  });

  
  test('Запрос обновления данных пользователя', () => {
    const state = authReducer(initialState, {
      type: updateUser.pending.type,
    });
    expect(state.error).toEqual(null);
  });

  test('Успешное обновление данных пользователя', () => {
    const state = authReducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: {
        user: fakeUser,
      },
    });
    expect(state.user).toEqual(fakeUser);
  });

  test('Ошибка обновления данных пользователя', () => {
    const state = authReducer(initialState, {
      type: updateUser.rejected.type,
      error: {
        message: errorMessage,
      },
    });
    expect(state.error).toEqual(errorMessage);
  });

  test('Запрос входа', () => {
    const state = authReducer(initialState, {
      type: login.pending.type,
    });
    expect(state.error).toEqual(null);
    expect(state.isAuth).toEqual(false);
  });

  test('Успешный вход', () => {
    const state = authReducer(initialState, {
      type: login.fulfilled.type,
      payload: {
        user: fakeUser,
      },
    });
    expect(state.isAuth).toEqual(true);
    expect(state.user).toEqual(fakeUser);
  });

  test('Ошибка входа', () => {
    const state = authReducer(initialState, {
      type: login.rejected.type,
      error: {
        message: errorMessage,
      },
    });
    expect(state.error).toEqual(errorMessage);
  });

  test('Выход', () => {
    const state = authReducer(initialState, {
      type: logout.fulfilled.type,
    });
    expect(state).toEqual(initialState);
  });

});
