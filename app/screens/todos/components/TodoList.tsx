import {FlatList, SafeAreaView} from 'react-native';
import React from 'react';
import {Todo} from '../../../shared/models/Todo';
import {TodoItem} from './TodoItem';
import tw from 'twrnc';

const TodoList: React.FC<{
  todos: Array<Todo>;
  navigation;
  displayActions: boolean;
}> = ({todos, navigation, displayActions}) => {
  const renderItem = ({item}) => {
    return (
      <TodoItem
        todo={item}
        navigation={navigation}
        displayActions={displayActions}
      />
    );
  };
  const todosAsArray = Array.from(todos.values());

  return (
    <SafeAreaView style={tw`w-full h-full`}>
      <FlatList
        data={todosAsArray}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default TodoList;
