import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import TodosScreen from './app/screens/todos/TodosScreen';
import {QueryClient, QueryClientProvider} from 'react-query';
import {TodoFormScreen} from './app/screens/todo-form/TodoFormScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FinishedTodosScreen from './app/screens/finished-todos/FinishedTodosScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import i18next from 'i18next';
import {TRANSLATIONS_EN} from './app/translations/en/translations';
import {TRANSLATIONS_NL} from './app/translations/nl/translations';
import {initReactI18next, useTranslation} from 'react-i18next';
import {LanguageToggle} from './app/shared/components/LanguageToggle';

i18next.use(initReactI18next).init({
  // lng: 'en',
  compatibilityJSON: 'v3',
  resources: {
    en: {
      translation: TRANSLATIONS_EN,
    },
    nl: {
      translation: TRANSLATIONS_NL,
    },
  },
});

i18next.changeLanguage('en');

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const queryClient = new QueryClient();

const Home = () => {
  const {t} = useTranslation();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Todos"
        options={{
          title: t('activeTodos'),
          tabBarLabelStyle: {
            fontSize: 15,
          },
          headerRight: () => <LanguageToggle />,
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
          title: t('finishedTodos'),
          tabBarLabelStyle: {
            fontSize: 15,
          },
          headerRight: () => <LanguageToggle />,
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
};

const App = () => {
  const {t} = useTranslation();
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
            options={{title: t('saveTodo')}}
            component={TodoFormScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
