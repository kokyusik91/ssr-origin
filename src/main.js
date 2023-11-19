import { App } from './component.js';
import { model } from './model.js';

/**
 * 기존 서버 의존적인 코드
 */
// function main() {
//   document.querySelector('#add').onclick = () => {
//     fetch('/api/todo-items', {
//       method: 'post',
//       body: JSON.stringify({ content: '추가된 아이템' }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }).then(() => location.reload());
//   };

//   document.querySelector('#delete').onclick = () => {
//     fetch('/api/todo-items/0', { method: 'delete' }).then(() =>
//       location.reload()
//     );
//   };
// }

// main();

function updateTodoItems(todoItems) {
  const headers = { 'Content-Type': 'application/json' };
  const body = JSON.stringify({ todoItems });
  return fetch('/api/todo-items', { method: 'put', headers, body }).then(
    (res) => res.json()
  );
}

async function syncServerModel() {
  const newTodoItems = await updateTodoItems(model.todoItems);
  model.init({ todoItems: newTodoItems });
}

// 클라이언트로 넘어온 코드 다운받으면
function render() {
  // app DOM을 가져온다.

  const $app = document.querySelector('#app');
  // model.js에 있는 todoItems을 넣어줌.
  $app.innerHTML = `<h1>클라이언트에서 그려지는 html 🧑🏼‍💻</h1>${App(
    model.todoItems
  )}`;

  $app.querySelector('#add').onclick = async () => {
    model.addTodoItem('새로운 아이템');
    syncServerModel().then(render);
  };

  $app.querySelector('#delete').onclick = async () => {
    model.delteTodoItem(model.todoItems.length - 1);
    syncServerModel().then(render);
  };
}

function main() {
  model.init(window.__INITIAL_MODEL__);
  render();
}

main();
