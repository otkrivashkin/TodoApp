import tw from 'twrnc';
import {Button, View} from 'react-native';
import {changeLanguage} from 'i18next';
import React from 'react';

export const LanguageToggle = () => {
  return (
    <View style={tw`flex flex-row`}>
      <View style={tw`pr-2`}>
        <Button title="En" onPress={() => changeLanguage('en')} />
      </View>
      <View style={tw`pr-2`}>
        <Button title="Nl" onPress={() => changeLanguage('nl')} />
      </View>
    </View>
  );
};
