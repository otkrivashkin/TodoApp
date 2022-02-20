import {Text, View} from 'react-native';
import React from 'react';

const TodoList: React.FC<{}> = ({children}) => {
  return (
    <View>
      <Text>TodoList</Text>
      {children}
    </View>
  );
};

export default TodoList;
