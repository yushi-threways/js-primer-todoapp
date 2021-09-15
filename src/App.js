import { TodoListModel } from "./model/TodoListModel";
import { TodoItemModel } from "./model/TodoItemModel";
import { element, render } from "./view/html-util.js";

export class App {
    constructor() {
        // 1.TodoListの初期化
        this.todoListModel = new TodoListModel();
    }

    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");

        // 2.TodoListModelの状態が変更されたら表示を更新する
        this.todoListModel.onChange(() =>{
            // TodoリストをまとめるList要素
            const todoListElement = element`<ul />`;
            // それぞれのTodoItem要素をtodoListElement以下へ追加する
            const todoItems = this.todoListModel.getTodoItems();
            todoItems.forEach(item => {
                // 完了済みならchecked属性をつけ、未完了ならchecked属性を外す
                // input要素にはcheckboxクラスをつける
                const todoItemElement = item.completed
                ? element`<li>
                <input type="checkbox" class="checkbox" checked><s>${item.title}</s>
                <button class="delete">x</button>
                </li>`
                : element`<li>
                <input type="checkbox" class="checkbox">${item.title}
                <button class="delete">x</button>
                </li>`;
            // チェックボックスがトグルしたときのイベントにリスナー関数を登録
            const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
            inputCheckboxElement.addEventListener("change", () => {
                // 指定したTodoアイテムの状態を反転させる
                this.todoListModel.updateTodo({
                    id: item.id,
                    completed: !item.completed,    
                });
            });
            // 削除ボタン(x)がクリックされたときにTodoListModelからアイテムを削除する
            const deleteButtonElement = todoItemElement.querySelector(".delete");
            deleteButtonElement.addEventListener("click", () =>  {
                // 指定したTodoアイテムを削除する
                this.todoListModel.removeTodo({
                    id: item.id,
                });
            });

            todoListElement.appendChild(todoItemElement);
            });
            // containerElementの中身をtodoListElementで上書きする
            render(todoListElement, containerElement);
            // アイテム数の表示を更新
            todoItemCountElement.textContent = `Todoアイテム数： ${this.todoListModel.getTotalCount}`;
        })

        //3,フォームを送信したら、新しいTodoItemModelを追加する
        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            //新しいTodoItemをTodoListへ追加する
            this.todoListModel.addTodo(new TodoItemModel({
                title: inputElement.value,
                completed: false,
            }));
            inputElement.value = "";
        });

        // formElement.addEventListener("submit", (event) => {
        //     // submitイベントの本来の動作を止める
        //     event.preventDefault();
        //     // 追加するTodoアイテムの要素(li要素)を作成する
        //     const todoItemElement = element`<li>${inputElement.value}</li>`;
        //     // Todoアイテムをcontainerに追加する
        //     containerElement.appendChild(todoItemElement);
        //     // Todoアイテム数を+1し、表示されているテキストを更新する 
        //     todoItemCount += 1;
        //     todoItemCountElement.textContent = `Todoアイテム数： ${todoItemCount}`;
        //     // 入寮欄を空文字にリセットする
        //     inputElement.value = "";
        // });    

    }
}
