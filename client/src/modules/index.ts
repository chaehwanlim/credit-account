//루트 리듀서
import { combineReducers } from 'redux';
import { GlobalThemeState, globalThemeReducer as globalTheme } from './globalTheme';
import { TitleState, titleReducer as titleState } from './title';

export interface StoreState {
  globalTheme: GlobalThemeState;
  titleState: TitleState;
}

export default combineReducers<StoreState>({
  globalTheme,
  titleState
});

//컨테이너 컴포넌트를 만들 때 스토어에서 관리하고 있는 상태를 조회하기 위해 useSelector 함수를 사용할 때 필요