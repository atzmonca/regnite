import React from "react";
import { ViewStyle } from "react-native";
import { useCredentialsFields } from "../../hooks/useCredentialsFields";
import Heading from "../../components/heading/heading";
import Input from "../../components/input/input";
import Screen from "../../components/screen/screen";
import LoadingButton from "../../components/loading-button/loading-button";
import { startSignUp } from "../../actions/auth/auth";
import { connect } from "react-redux";
import { spacing } from "../../theme";
import { translate } from "../../i18n";
import styled from "@emotion/native";

const PaddLoadingButton = styled(LoadingButton)({
  paddingVertical: spacing[3],
  paddingHorizontal: spacing[5],
});

const PaddInput = styled(Input)({
  paddingVertical: spacing[1],
  paddingHorizontal: spacing[5],
});

function SignUpWithEmailScreen(props: any) {
  const credentialsFields = useCredentialsFields();

  return (
    <Screen>
      <Heading>{translate("signUpWithEmailScreen.title")}</Heading>
      <PaddInput
        value={credentialsFields.email.value}
        onChangeText={credentialsFields.email.update}
        label={translate("common.email").toLocaleUpperCase()}
        placeholder={translate("common.placeholder.email")}
        autoCompleteType="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
        error={
          !!credentialsFields.email.value && !credentialsFields.email.isValid
        }
        errorMessage={translate("errors.invalidEmail")}
      />
      <PaddInput
        value={credentialsFields.password.value}
        onChangeText={credentialsFields.password.update}
        label={translate("common.password").toLocaleUpperCase()}
        placeholder={translate("common.placeholder.password")}
        autoCompleteType="password"
        textContentType="password"
        secureTextEntry
        error={
          !!credentialsFields.password.value &&
          !credentialsFields.password.isValid
        }
        errorMessage={translate("errors.invalidPassword")}
      />
      <PaddLoadingButton
        isLoading={props.isLoading}
        error={props.error}
        onPress={() =>
          props.signUp(
            credentialsFields.email.value,
            credentialsFields.password.value,
          )
        }
        disabled={
          !credentialsFields.email.value ||
          !credentialsFields.password.value ||
          !credentialsFields.password.isValid ||
          !credentialsFields.email.isValid
        }
      >
        {translate("common.signUp")}
      </PaddLoadingButton>
    </Screen>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  signUp: (email: string, password: string) =>
    dispatch(startSignUp(email, password)),
});

const mapStateToProps = (state: any) => ({
  isLoading: state.auth.status === "loading",
  error: state.auth.error,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpWithEmailScreen);
