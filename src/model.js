// 서버와 클라이언트에서 모두 실행 가능한 코드

export const model = {
  todoItems: [
    'SSR이 뭔데',
    'CSR은 뭔데',
    '이게 왜 필요한건데?',
    'MVVM은 또 뭐야',
    '공부해야 할게 왜이렇게 많아?',
  ],

  addTodoItem(item) {
    this.todoItems.push(item);
  },

  delteTodoItem(index) {
    this.todoItems.splice(index, 1);
  },

  init(initialModel) {
    // 전역에 있는 데이터를 todoItems에 할당
    this.todoItems = initialModel.todoItems;
  },
};
