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
export const Home = (todoItems) => `
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

export const DefaultLayout = (children) => `
  <main>
    <h1>Todo App</h1>
    <header>
      <nav>
        <a href="/">메인페이지</a>
        <a href="/sub">서브페이지</a>
      </nav>
    </header>
    <section style="margin: 30px 0">
      ${children}
    </section>
    <footer>
      <p>Copyright &copy; 2023 곡식곡식 🧑🏼‍💻</p
    </footer>
  </main>
`;

// path에 따라 다른 html 문자열을 내려줌.
export const App = (path, model) => {
  if (path === '/') {
    return DefaultLayout(Home(model.todoItems));
  } else if (path === '/sub') {
    return DefaultLayout(`<p>서브페이지 입니다.</p>`);
  } else {
    return DefaultLayout(`<p>404</p>`);
  }
};
