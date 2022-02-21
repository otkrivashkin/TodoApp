import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import TodosScreen from './app/screens/todos/TodosScreen';
import {QueryClient, QueryClientProvider} from 'react-query';
import {TodoFormScreen} from './app/screens/todo-form/TodoFormScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FinishedTodosScreen from './app/screens/finished-todos/FinishedTodosScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const queryClient = new QueryClient();

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Todos"
        options={{
          title: 'Active Todos',
          tabBarLabelStyle: {
            fontSize: 15,
          },
          tabBarIcon: tabInfo => (
            <Icon
              name="list"
              size={20}
              color={tabInfo.focused ? 'green' : '#000'}
            />
          ),
        }}
        component={TodosScreen}
      />
      <Tab.Screen
        name="FinishedTodos"
        options={{
          title: 'Finished Todos',
          tabBarLabelStyle: {
            fontSize: 15,
          },
          tabBarIcon: tabInfo => (
            <Icon
              name="check"
              size={20}
              color={tabInfo.focused ? 'green' : '#000'}
            />
          ),
        }}
        component={FinishedTodosScreen}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Todos">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SaveTodo"
            options={{title: 'Save Todo'}}
            component={TodoFormScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
