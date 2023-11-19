// 서버와 클라이언트 모두에서 실행되는 코드

const customStyle = 'color:blue';

// 아이템 하나
export const TodoItem = (item) => {
  return typeof window !== 'undefined'
    ? `<li style=${customStyle}>클라이언트 ${item}</li>`
    : `<li style=${customStyle}>서버 ${item}</li>`;
};

export const TodoList = (items) => `<ul>${items.map(TodoItem).join('')}</ul>`;

export const Button = (param) =>
  `<button id='${param.id}'>${param.text}</button>`;

/**
 * server와 client 양쪽에서 쓰일 수 있기 때문에, ssr.js서 분리하였음.
 * @param {*} todoItems
 * @returns
 */
export const App = (todoItems) => `
  ${Button({ id: 'add', text: '아이템 추가' })}
  ${Button({ id: 'delete', text: '아이템 삭제' })}
  ${TodoList(todoItems)}
`;

// 포스트 관련된 함수
export const PostItem = (post) => `<li>
    <h1>${post.title}</h1>
    <p>${post.body}</p>
  </li>`;

export const PostList = (posts) => {
  return `<ul>${posts.map(PostItem).join('')}</ul>`;
};
