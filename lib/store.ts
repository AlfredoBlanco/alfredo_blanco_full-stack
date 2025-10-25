import { configureStore } from '@reduxjs/toolkit'
import { authService } from './services/auth-service'
import UserReducer from './features/user.slice';
import { artitsService } from './services/artist-service';

export const makeStore = () => {
  return configureStore({
    devTools: false,
    reducer: {
      user: UserReducer,
      [authService.reducerPath]: authService.reducer,
      [artitsService.reducerPath]: artitsService.reducer,
    },
    middleware: (getDefaulMiddleware) =>
      getDefaulMiddleware().concat(
        authService.middleware,
        artitsService.middleware,
      )
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
