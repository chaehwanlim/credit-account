//type 선언
export interface GlobalThemeState {
  mode: string;
}

export const DARK_MODE = "darkMode" as const;
export const LIGHT_MODE = "lightMode" as const;

interface DarkModeAction {
  type: typeof DARK_MODE;
}

interface LightModeAction {
  type: typeof LIGHT_MODE;
}

export type GlobalThemeActionTypes =
  | DarkModeAction
  | LightModeAction;

//액션 생성 함수 선언
export const darkMode = () => ({ 
  type: DARK_MODE 
})

export const lightMode = () => ({
  type: LIGHT_MODE
})

export const actionCreators = {
  darkMode,
  lightMode
};

const localTheme = window.localStorage.getItem('theme');

const initialState: GlobalThemeState = 
  localTheme ? 
  { mode: localTheme } : 
  { mode: 'lightMode' };

//Reducer
export const globalThemeReducer = (
  state: GlobalThemeState = initialState,
  action: GlobalThemeActionTypes
): GlobalThemeState => {

  switch (action.type) {
    case LIGHT_MODE:
      window.localStorage.setItem('theme', 'lightMode');
      return {
        mode: 'lightMode'
      }

    case DARK_MODE:
      window.localStorage.setItem('theme', 'darkMode');
      return {
        mode: 'darkMode'
      }
    
    default:
      window.localStorage.setItem('theme', state.mode);
      return state;
  }

}

/* //type 선언
export interface GlobalThemeState {
  darkModeEnabled: boolean;
}

export const TOGGLE_DARKMODE = "TOGGLE_DARKMODE" as const;

interface ToggleDarkModeAction {
  type: typeof TOGGLE_DARKMODE;
}

export type GlobalThemeActionTypes =
  ToggleDarkModeAction;

//액션 생성 함수 선언
export const toggleDarkMode = () => ({ 
  type: TOGGLE_DARKMODE 
})

export const actionCreators = {
  toggleDarkMode
};

const initialState: GlobalThemeState = { darkModeEnabled: false };

//Reducer
export const globalThemeReducer = (
  state: GlobalThemeState = initialState,
  action: GlobalThemeActionTypes
): GlobalThemeState => {

  switch (action.type) {
    case TOGGLE_DARKMODE:
      return {
        darkModeEnabled: !state.darkModeEnabled
      }
    
    default:
      return state;
  }
} */