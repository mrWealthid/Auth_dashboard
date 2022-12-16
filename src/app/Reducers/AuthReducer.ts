import {CurrentUser, LOGIN, LoginAction} from "../Actions/AuthActions";

export interface IState {
    currentUser: CurrentUser | null;
}

const initialState: IState = {
    currentUser: null
};

export function AuthReducer(state = initialState, action: LoginAction) {
    switch (action.type) {
        case LOGIN:
            return {...state, currentUser: action.payload};
    }
}