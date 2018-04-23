import IAction from '../IAction';

class UserAction {
    static readonly LOAD_USER: string = 'UserAction.LOAD_USER';
    static readonly LOAD_USER_SUCCESS: string = 'UserAction.LOAD_USER_SUCCESS';
    static readonly LOAD_USER_FAIL: string = 'UserAction.LOAD_USER_FAIL';

    static loadUser(): IAction<void> {
        return {
            type: UserAction.LOAD_USER,
        };
    }
}

export default UserAction;
