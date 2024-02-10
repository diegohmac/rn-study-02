import { TextInput, TextInputProps } from "react-native";
import { Container } from "./styles";
import { useTheme } from "styled-components/native";
import { RefObject } from "react";

type Props = TextInputProps & {
  inputRef: RefObject<TextInput>;
}

export function Input({ inputRef, ...rest }: Props) {

  const { COLORS } = useTheme();

  return (
    <Container
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_300}
      {...rest}
    />
  )
}