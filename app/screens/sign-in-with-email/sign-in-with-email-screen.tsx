import React from "react";
import {
  View,
  ViewStyle,
  Text,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import Heading from "../../components/heading/heading";
import InputBox from "../../components/input-box/input-box";
import { color, spacing } from "../../theme";
import Screen from "../../components/screen/screen";
import LoadingButton from "../../components/loading-button/loading-button";
import { startSignIn } from "../../actions/auth/auth";
import { connect } from "react-redux";
import { translate } from "../../i18n";

const LOADING_BUTTON: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[6],
};

const SIGN_UP_MESSAGE: ViewStyle = {
  justifyContent: "center",
  flexDirection: "row",
};

const SIGN_UP_TEXT: TextStyle = {
  fontSize: spacing[4],
};

const SIGN_UP_BUTTON: TextStyle = {
  marginLeft: spacing[1],
  color: color.secondaryPrimary,
};

function SignInWithEmailScreen(props: any) {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  return (
    <Screen>
      <Heading text={translate("signInWithEmailScreen.title")} />
      <InputBox
        value={email}
        onChangeText={setEmail}
        placeholder={translate("common.placeholder.email")}
        autoCompleteType="email"
        autoFocus
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
      />
      <InputBox
        value={password}
        onChangeText={setPassword}
        placeholder={translate("common.placeholder.password")}
        autoCompleteType="password"
        textContentType="password"
        secureTextEntry
      />
      <LoadingButton
        style={LOADING_BUTTON}
        isLoading={props.isLoading}
        error={props.error}
        title={translate("common.signIn")}
        onPress={() => props.signIn(email, password)}
        disabled={!email || !password}
      />
      <View style={SIGN_UP_MESSAGE}>
        <Text style={SIGN_UP_TEXT}>
          {translate("signInWithEmailScreen.signUpMessage")}
        </Text>
        <TouchableOpacity
          onPress={() => props.navigation.push("SignUpWithEmail")}
        >
          <Text style={[SIGN_UP_TEXT, SIGN_UP_BUTTON]}>
            {translate("common.signUp")}
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  signIn: (email: string, password: string) =>
    dispatch(startSignIn(email, password)),
});

const mapStateToProps = (state: any) => ({
  isLoading: state.auth.status === "loading",
  error: state.auth.error,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInWithEmailScreen);
