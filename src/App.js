import { element } from "./view/html-util.js";

export class App {
    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");

        // Todo アイテム数
        let todoItemCount = 0;

        formElement.addEventListener("submit", (event) => {
            // submitイベントの本来の動作を止める
            event.preventDefault();
            // 追加するTodoアイテムの要素(li要素)を作成する
            const todoItemElement = element`<li>${inputElement.value}</li>`;
            // Todoアイテムをcontainerに追加する
            containerElement.appendChild(todoItemElement);
            // Todoアイテム数を+1し、表示されているテキストを更新する 
            todoItemCount += 1;
            todoItemCountElement.textContent = `Todoアイテム数： ${todoItemCount}`;
            // 入寮欄を空文字にリセットする
            inputElement.value = "";
        });    
    }
}
