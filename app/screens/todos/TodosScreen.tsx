import React from 'react';
import {Pressable, Text, View} from 'react-native';
import TodoList from './components/TodoList';
import {useQuery} from 'react-query';
import {getTodos} from './TodoApi';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';

const TodosScreen = ({navigation}) => {
  function onPressCreateTodo() {
    navigation.navigate('SaveTodo');
  }

  const query = useQuery('todos', getTodos);

  if (query.isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (query.isError) {
    return (
      <View>
        <Text>Something went wrong, details {query.error}</Text>
      </View>
    );
  }

  return (
    <View style={tw`h-full w-full py-4 px-3`}>
      <TodoList
        todos={query.data ?? []}
        navigation={navigation}
        displayActions={true}
      />
      <Pressable
        style={tw`absolute bottom-0 right-0`}
        onPress={onPressCreateTodo}>
        <Icon
          name="plus"
          color="#fff"
          style={tw`bg-green-400 pt-4 pb-4 pl-5 pr-5 m-3 font-bold text-base rounded-full`}
        />
      </Pressable>
    </View>
  );
};

export default TodosScreen;
