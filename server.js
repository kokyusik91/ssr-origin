import express from 'express';

import { generateHTML } from './src/ssr.js';
import { model } from './src/model.js';

// 실제 서버가 돌아가는 데 필요한 로직들 위치

const app = express();
app.use(express.json());

app.use('/src', express.static('./src'));

app.get('/', async (req, res) => {
  const html = await generateHTML(model);
  res.send(html);
});

// app.post('/api/todo-items', (req, res) => {
//   model.addTodoItem(req.body.content);
//   res.status(201).send();
// });

app.put('/api/todo-items', (req, res) => {
  model.init({ todoItems: req.body.todoItems });
  res.status(200).send(model.todoItems);
});

app.delete('/api/todo-items/:index', (req, res) => {
  model.delteTodoItem(req.params.index);
  res.status(204).send();
});

app.listen(8000, () => console.log('listen to http://localhost:8000'));
