import {Todo} from '../../../shared/models/Todo';
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';
import {useMutation, useQueryClient} from 'react-query';
import {deleteTodo} from '../TodoApi';

export const TodoItem: React.FC<{
  todo: Todo;
  navigation;
  displayActions: boolean;
}> = ({todo, navigation, displayActions}) => {
  let queryClient = useQueryClient();
  let deleteMutation = useMutation(deleteTodo, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('finishedTodos');
      await queryClient.invalidateQueries('todos');
    },
  });
  const onPressEditTodoItem = () => {
    navigation.navigate('SaveTodo', {todo: todo});
  };

  const onPressDeleteTodoItem = (deletedTodo: Todo) => {
    deleteMutation.mutate(deletedTodo);
  };

  return (
    <View style={tw`flex flex-row h-10 items-center`}>
      <Text style={tw`flex-grow text-lg`}>{todo.title}</Text>
      {displayActions && (
        <View style={tw`flex flex-row`}>
          <Pressable onPress={onPressEditTodoItem}>
            <Icon name="pencil" size={20} />
          </Pressable>
          <Pressable
            onPress={() => onPressDeleteTodoItem(todo)}
            style={tw`ml-3`}>
            <Icon name="trash" size={20} />
          </Pressable>
        </View>
      )}
    </View>
  );
};
