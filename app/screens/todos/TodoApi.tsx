import {Todo} from '../../shared/models/Todo';
import faker from '@faker-js/faker';
import uuid from 'react-native-uuid';

let todos: Array<Todo> = Array.from({length: 5}, () => ({
  id: uuid.v4().toString(),
  title: faker.random.words(2),
  finished: false,
}));

export const getTodos = () => {
  return new Promise<Array<Todo>>(resolve => {
    const unfinishedTodos = [...todos.values()].filter(item => !item.finished);
    return resolve(unfinishedTodos);
  });
};

export const postTodo = todo => {
  todos.push(todo);
  return todo;
};

export const putTodo = (todo: Todo) => {
  let findItem = todos.find(item => item.id === todo.id);
  // @ts-ignore
  let index = todos.indexOf(findItem);
  todos[index] = todo;
  return new Promise(resolve => resolve(todo));
};

export const deleteTodo = async (todo: Todo) => {
  todo.finished = true;
  await putTodo(todo);
  return new Promise<Array<Todo>>(resolve => resolve(todos));
};

export const getFinishedTodos = () => {
  return new Promise<Array<Todo>>(resolve => {
    const finishedTodos = [...todos.values()].filter(item => item.finished);
    return resolve(finishedTodos);
  });
};
