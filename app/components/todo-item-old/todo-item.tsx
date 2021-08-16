import * as React from "react";
import { TodoProps } from "./todo-item.props";
import {
  TextStyle,
  View,
  ViewStyle,
  Text,
  TouchableOpacity,
} from "react-native";
import { color, spacing, typography } from "../../theme";
import { connect } from "react-redux";
import Checkbox from "../checkbox/checkbox";
import { startRemoveTodo, startUpdateTodo } from "../../actions/todos/todos";

const CONTAINER: ViewStyle = {
  flexDirection: "row",
  padding: spacing[5],
  marginVertical: spacing[1],
  marginHorizontal: spacing[5],
  backgroundColor: "white",
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

const CHECKBOX: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
};

const DESCRIPTION_CONTAINER: ViewStyle = {
  justifyContent: "center",
  marginLeft: spacing[5],
};

const DESCRIPTION: TextStyle = {
  fontFamily: typography.primary.regular,
  fontSize: 30,
  color: "white",
};

const DESCRIPTION_CROSSED: TextStyle = {
  ...DESCRIPTION,
  textDecorationLine: "line-through",
  opacity: 0.3,
};

const REMOVE_BUTTON: ViewStyle = {
  marginLeft: "auto",
};

const REMOVE_BUTTON_TEXT: TextStyle = {
  fontFamily: typography.primary.regular,
  fontSize: 30,
  color: "white",
};

const TodoItem: React.FC<TodoProps> = props => {
  const { style, description, isCompleted, type, id } = props;

  return (
    <View style={[CONTAINER, style]}>
      <View style={CHECKBOX}>
        <Checkbox
          isChecked={isCompleted}
          size={27}
          color={type === "personal" ? color.primary : color.secondaryPrimary}
          handlePress={() => props.handleClickCheckbox(id, isCompleted)}
        />
      </View>
      <View style={DESCRIPTION_CONTAINER}>
        <Text style={isCompleted ? DESCRIPTION_CROSSED : DESCRIPTION}>
          {description}
        </Text>
      </View>
      <TouchableOpacity
        style={REMOVE_BUTTON}
        onPress={() => props.handleClickRemove(id)}
      >
        <Text style={REMOVE_BUTTON_TEXT}>🗑</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  handleClickCheckbox: (id: string, isCompleted: boolean) => {
    dispatch(startUpdateTodo(id, { isCompleted: !isCompleted }));
  },
  handleClickRemove: (id: string) => {
    dispatch(startRemoveTodo(id));
  },
});

export default connect(undefined, mapDispatchToProps)(TodoItem);