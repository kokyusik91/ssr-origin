import axios from 'axios';
import { App, PostList } from './component.js';

import { forceWait } from './utils/index.js';

const fetchData = async () => {
  // await forceWait(10000);
  const result = (await axios.get('https://jsonplaceholder.typicode.com/posts'))
    .data;
  return result;
};

// 최초 서버에서 그려주는 html 페이지
export const generateHTML = async (path, model) => {
  const data = await fetchData();
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Todo List</title>
  </head>
  <body>
    <div id="app">
      <h1>서버에서 처음에 렌더링한 투두 html임 💻</h1>
      ${App(path, model)}
    </div>
    <div>
      <h1>서버에서 fetch후 렌더링한 html임 💻</h1>
      ${PostList(data)}
    </div>
    <script>window.__INITIAL_MODEL__ = ${JSON.stringify({
      todoItems: model.todoItems,
    })}</script>

    <script src="./src/main.js" type="module"></script>
  </body>
  </html>
  `;
};
