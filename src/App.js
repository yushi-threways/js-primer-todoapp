import { render, element } from "./view/html-util.js";
import { TodoListView } from "./view/TodoListView.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListModel.js";

export class App {
    constructor({ formElement, formInputElement, todoCountElement, todoListContainerElement }) {
       this.todoListView = new TodoListView();
       this.todoListModel = new TodoListModel([]);
       // bind to Element
       this.formElement = formElement;
       this.formInputElement = formInputElement;
       this.todoListContainerElement = todoListContainerElement;
       this.todoCountElement = todoCountElement;
        // ハンドラ呼び出しで、`this`が変わらないように固定する
        // `this`が常に`App`のインスタンスを示すようにする
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Todoを追加する時に呼ばれるリスナー関数
     * @pram {string} title
     */
    handleAdd(title) {
        this.todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
    }

    /**
     * Todoの状態を更新したときに呼ばれるリスナー関数
     * @param {{ id:number, completed: boolean }}
     */
    handleUpdate({ id, completed }) {
        this.todoListModel.updateTodo({ id, completed });
    }

    /**
     * Todoを削除したときに呼ばれるリスナー関数
     * @param {{ id: number }}
     */
    handleDelete({ id }) {
        this.todoListModel.removeTodo({ id });
    }

     /**
     * フォームを送信時に呼ばれるリスナー関数
     * @param {Event} event
     */
    handleSubmit(event) {
        event.preventDefault();
        const inputElement = this.formInputElement;
        if (!inputElement.value) {
            console.log("テキストを入力してください。");
            return;
        }
        this.handleAdd(inputElement.value);
        inputElement.value = "";
    }

    handleChange() {
        const todoCountElement = this.todoCountElement;
        const todoListContainerElement = this.todoListContainerElement;
        const todoItems = this.todoListModel.getTodoItems()
        const todoListElement = this.todoListView.createElement(todoItems, {
            /// Appに定義したリスナー関数を呼び出す
            onUpdateTodo: ({ id, completed }) => {
                this.handleUpdate({ id, completed });
            },
            onDeleteTodo: ({ id }) => {
                this.handleDelete({ id });
            }
        });
        render(todoListElement, todoListContainerElement);
        todoCountElement.textContent = `Todoアイテム数： ${this.todoListModel.getTotalCount()}`;
    }
    /**
     * アプリとDOMの紐付けを登録する関数
     */
    mount() {
        this.todoListModel.onChange(this.handleChange);
        this.formElement.addEventListener("submit", this.handleSubmit);
    }

    /**
     * アプリとDOMの紐付けを解除する関数
     */
    unmount() {
        this.todoListModel.offChange(this.handleChange);
        this.formElement.removeEventListener("submit", this.handleSubmit);
    }
}
