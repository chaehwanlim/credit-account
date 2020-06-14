export interface TitleState {
  title: string;
}

export const SET_TITLE = "setTitle" as const;

interface SetTitleAction {
  type: typeof SET_TITLE;
  payload: string;
}

export type TitleActionTypes =
  | SetTitleAction;

export const setTitle = (title: string) => ({
  type: SET_TITLE,
  payload: title
});

export const actionCreators = {
  setTitle
};

const initialState: TitleState = { title: '' };

//Reducer
export const titleReducer = (state: TitleState = initialState, action: TitleActionTypes): TitleState => {
  switch (action.type) {
    case SET_TITLE:
      return {
        title: action.payload
      }
      
    default:
      return state;
  }
}