import mobx, { action, autorun, computed, makeAutoObservable, observable } from 'mobx';

import { AppStore } from '.';

interface NoticeMessage {
    type: string;
    message: string;
}
export class UIStore {
    // side收起/展开
    @observable
    siderCollapsed: boolean = false;

    @observable
    isAuthorized: boolean = false;

    @observable
    loading?: boolean = false;

    @observable
    notice?: NoticeMessage

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
        autorun(() => console.log("UIStore AutoRun IsAuthorized: " + this.isAuthorized));
    }

    @action
    setSiderCollapse(value: boolean) {
        this.siderCollapsed = value;
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
    setToken(value: string) {
        this.token = value
        sessionStorage.setItem('token', value)
        this.refreshIsAuthorized();
    }
    @action
    removeToken() {
        this.token = ''
        sessionStorage.removeItem('token')
        this.refreshIsAuthorized();
    }

    @action
    refreshIsAuthorized() {
        this.isAuthorized = sessionStorage.getItem('token') !== null;
    }

    @action
    setExpires(value: number) {
        this.expires_in = value
    }
}