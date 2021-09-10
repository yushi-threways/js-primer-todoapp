export class EventEmitter {
    constructor() {
        // 登録する[イベント名、Set（リスナー関数）]を管理するMap
        this._listeners = new Map();
    }

    /**
     * 指定したイベントが実行されたときに呼び出されるリスナー関数を登録する
     * @param {string} type イベント名
     * @param {Function} listener イベントリスナー
     */
    addEventListener(type, listener) {
        // 指定したイベントに対応するSetを作成しリスナー関数を登録する
        // 同じイベント名がないか
        if (!this._listeners.has(type)) {
            this._listeners.set(type, new Set());
        }
        // イベントを取得
        const listenerSet = this._listeners.get(type);
        // 取得したイベントに
        listenerSet.add(listener);
    }

    /**
     * 指定したイベントをディスパッチする
     * @param {string} type イベント名
     */
    emit(type) {
        // 指定したイベントに対応するSetを取り出し、すべてのリスナー関数を呼び出す
        const listenerSet = this._listeners.get(type);
        if (!listenerSet) {
            return;
        }
        listenerSet.forEach(listener => {
            listener.call(this);
        });
    }
}