import * as React from "react";
import { SubmitButtonProps } from "./submit-button.props";
import { TextStyle, TouchableOpacity, ViewStyle, Text } from "react-native";
import { color, spacing } from "../../theme";

const SUBMIT_BUTTON: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: color.secondaryBackground,
  marginVertical: spacing[1],
  marginLeft: spacing[3],
  paddingHorizontal: spacing[5],
  paddingVertical: spacing[5],
  width: 40,
  height: 40,
  borderRadius: 15,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.09,
  shadowRadius: 2.65,
  elevation: 4,
};

const SUBMIT_BUTTON_TEXT: TextStyle = {
  fontSize: spacing[4],
  color: color.text,
};

const SubmitButton: React.FC<SubmitButtonProps> = props => {
  const { style, disabled, handleClick } = props;

  return (
    <TouchableOpacity
      style={[SUBMIT_BUTTON, style]}
      disabled={disabled}
      onPress={handleClick}
    >
      <Text style={[SUBMIT_BUTTON_TEXT, { color: props.color }]}>+</Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;
