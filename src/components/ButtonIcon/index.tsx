import { TouchableOpacityProps } from "react-native";
import { Container,  ButtonType, Icon } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';

type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: ButtonType;
}

export function ButtonIcon({ icon, type = 'PRIMARY', ...rest }: Props) {
  return (
    <Container {...rest}>
      <Icon name={icon} type={type} />
    </Container>
  )
}