import {Formik} from 'formik';
import {Animated, Button, LogBox, Text, View} from 'react-native';
import React from 'react';
import {TextField} from 'react-native-material-textfield';
import * as Yup from 'yup';
import {compose} from 'recompose';
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
} from 'react-native-formik';
import {useMutation, useQueryClient} from 'react-query';
import {postTodo, putTodo} from '../todos/TodoApi';
import uuid from 'react-native-uuid';

// @ts-ignore
Animated.Text.propTypes = Animated.Text.propTypes || Text.propTypes;

export const TodoFormScreen = ({navigation, route}) => {
  LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  let saveTodo = postTodo;
  let newTodo = {id: null, title: null};
  if (route && route.params) {
    const {todo} = route.params;
    newTodo = todo;
    saveTodo = putTodo;
  }

  let queryClient = useQueryClient();
  let saveTodoMutation = useMutation(saveTodo, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('todos');
      navigation.goBack();
    },
  });

  const FormikInput = compose(
    handleTextInput,
    withNextInputAutoFocusInput,
  )(TextField);
  const InputsContainer = withNextInputAutoFocusForm(View);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required()
      .min(4, 'Well, you need to type at least 4 letters'),
  });

  const handleSubmit = values => {
    saveTodoMutation.mutate({
      id: values.id ?? uuid.v4().toString(),
      title: values.title,
    });
  };

  return (
    <View>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={{id: newTodo.id, title: newTodo.title}}>
        {props => {
          return (
            <InputsContainer>
              <FormikInput label="Title" name="title" type="text" />
              <Button
                onPress={props.handleSubmit}
                disabled={!props.isValid}
                title="SUBMIT"
              />
            </InputsContainer>
          );
        }}
      </Formik>
    </View>
  );
};
