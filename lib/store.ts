import { configureStore } from '@reduxjs/toolkit'
import { authService } from './services/auth-service'
import UserReducer from './features/user.slice';
import { artistsService } from './services/artist-service';
import { albumService } from './services/album-service';
import { searchService } from './services/search-service';

export const makeStore = () => {
  return configureStore({
    devTools: false,
    reducer: {
      user: UserReducer,
      [authService.reducerPath]: authService.reducer,
      [searchService.reducerPath]: searchService.reducer,
      [artistsService.reducerPath]: artistsService.reducer,
      [albumService.reducerPath]: albumService.reducer,
    },
    middleware: (getDefaulMiddleware) =>
      getDefaulMiddleware().concat(
        authService.middleware,
        searchService.middleware,
        artistsService.middleware,
        albumService.middleware,
      )
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
