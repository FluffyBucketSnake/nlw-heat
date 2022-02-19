import React from "react";

import { View } from  "react-native";
import { useAuth } from "../../hooks/auth";
import { COLORS } from "../../theme";
import { Button } from "../Button";

import { styles } from "./styles";

export function SigninBox(){
  const { isSigningIn, signIn } = useAuth();

  return (
    <View style={styles.container}>
        <Button
            text="ENTRAR COM O GITHUB"
            color={COLORS.BLACK_PRIMARY}
            backgroundColor={COLORS.YELLOW}
            icon="github"
            isLoading={isSigningIn}
            onPress={signIn}
        />
    </View>
  );
}