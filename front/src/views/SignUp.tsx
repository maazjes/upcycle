import {
  View, StyleSheet, GestureResponderEvent, Dimensions
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { LoginStackNavigation, TypedImage } from '../types';
import usersService from '../services/users';
import useLogin from '../hooks/useLogin';
import useError from '../hooks/useError';
import FormikTextInput from '../components/FormikTextInput';
import Button from '../components/Button';
import FormikImageInput from '../components/FormikImageInput';

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  SignupForm: {
    margin: 12
  },
  bioField: {
    height: 100,
    paddingTop: 13,
    marginTop: 10
  },
  bioAndPhoto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, 'Minimum length of username is 1')
    .max(30, 'Maximum length of username is 30')
    .required('username is required'),
  displayName: yup
    .string()
    .min(5, 'Minimum length of name is 5')
    .max(10, 'Maximum length of name is 10')
    .required('name is required'),
  password: yup
    .string()
    .min(1, 'Minimum length of password is 1')
    .max(50, 'Maximum length of password is 4')
    .required('password is required'),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('password confirmation is required')
});

const SignUp = (): JSX.Element => {
  const { navigate } = useNavigation<LoginStackNavigation>();
  const login = useLogin();
  const error = useError();

  const initialValues = {
    email: '',
    displayName: '',
    bio: '',
    password: '',
    passwordConfirmation: '',
    images: []
  };

  const onSubmit = async ({
    images, email, password, ...props
  }: {
    email: string;
    displayName: string;
    bio: string;
    password: string;
    passwordConfirmation: string;
    images: TypedImage[];
  }): Promise<void> => {
    const image = images[0];
    try {
      await usersService.createUser({
        ...props, image, email, password
      });
      await login({ email, password });
      navigate('Home');
    } catch (e) {
      error(e);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit }): JSX.Element => (
        <View style={styles.SignupForm}>
          <View style={styles.bioAndPhoto}>
            <FormikImageInput circle name="images" amount={1} />
            <View style={{ flexDirection: 'column', width: screenWidth - 140 }}>
              <FormikTextInput name="email" placeholder="Email" />
              <FormikTextInput style={{ marginBottom: 0 }} name="displayName" placeholder="Display name" />
            </View>
          </View>
          <FormikTextInput multiline textAlignVertical="top" style={styles.bioField} name="bio" placeholder="Bio" />
          <FormikTextInput secureTextEntry name="password" placeholder="Password" />
          <FormikTextInput secureTextEntry name="passwordConfirmation" placeholder="Password confirmation" />
          <Button
            handleSubmit={handleSubmit as unknown as (event: GestureResponderEvent) => void}
            text="Sign up"
          />
        </View>
      )}
    </Formik>
  );
};

export default SignUp;