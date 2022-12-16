import {ActionReducerMap} from '@ngrx/store';
import {AuthReducer, IState} from "./AuthReducer";

export const rootReducer = {};

export interface AppState {
    Auth: IState;
}

export const reducers: ActionReducerMap<AppState, any> = {
    Auth: AuthReducer
};