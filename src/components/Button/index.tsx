import { TouchableOpacityProps } from "react-native";
import { Container, Title, ButtonType } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
  type?: ButtonType;
}

export function Button({ title, type = 'PRIMARY', ...rest }: Props) {
  return (
    <Container type={type} {...rest}>
      <Title>
        {title}
      </Title>
    </Container>
  )
}