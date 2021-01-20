import { action, makeAutoObservable, observable } from 'mobx';

import { AppStore } from '.';

interface NoticeMessage {
    type: string;
    message: string;
}
export class UIStore {
    @observable
    loading?: boolean = false;

    @observable
    notice?: NoticeMessage

    @observable
    isAuthorized = sessionStorage.getItem('token') == "" ? false : true;

    @observable
    token: string = sessionStorage.getItem('token') || ''

    appStore!: AppStore;

    @observable
    expires_in = 0

    @observable
    user_name: string = "unknow"

    constructor(appStore: AppStore) {
        this.appStore = appStore
        makeAutoObservable(this);
    }

    @action
    reset() {
        this.loading = false;
        this.notice = undefined;
    }

    @action
    startLoading() {
        this.loading = true;
    }

    @action
    stopLoading() {
        this.loading = false;
    }

    @action
    showNotice(notice: NoticeMessage) {
        this.notice = notice
    }

    @action
    removeNotice() {
        this.notice = undefined
    }

    @action
    setAuthorized() {
        this.isAuthorized = true;
    }

    @action
    setUnauthorized() {
        this.isAuthorized = false;
    }
    @action
    setToken(value: string) {
        this.token = value
        sessionStorage.setItem('token', value)
    }
    @action
    removeToken() {
        this.token = ''
        sessionStorage.removeItem('token')
    }
    @action
    setExpires(value: number) {
        this.expires_in = value
    }
}