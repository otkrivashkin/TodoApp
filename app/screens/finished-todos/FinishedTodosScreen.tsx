import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getFinishedTodos} from '../todos/TodoApi';
import TodoList from '../todos/components/TodoList';

const FinishedTodosScreen = ({navigation}) => {
  const onPressCreateTodo = () => {
    navigation.navigate('SaveTodo');
  };

  const query = useQuery('finishedTodos', getFinishedTodos);

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
        displayActions={false}
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

export default FinishedTodosScreen;
