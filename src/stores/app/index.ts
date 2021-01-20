import { UIStore } from './ui';

export class AppStore {

    uiStore!: UIStore;
    constructor() {
        this.uiStore = new UIStore(this)
    }
}

export { UIStore } from './ui';