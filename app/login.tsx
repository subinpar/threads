import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Login() {
  const insets = useSafeAreaInsets();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const onLogin = async () => {
    try {
      setIsLoggingIn(true);

      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "subin",
          password: "1234",
        }),
      });

      if (!res.ok) {
 
        const errorData = await res.json().catch(() => null);
        console.log("로그인 실패:", errorData);
        Alert.alert("로그인 실패", "아이디나 비밀번호를 확인해 주세요.");
        return;
      }

      const data = await res.json();
      console.log("로그인 성공:", data);

      router.replace("/(tabs)");
    } catch (e) {
      console.log("로그인 요청 에러:", e);
      Alert.alert("에러", "로그인 중 문제가 발생했습니다.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <View style={{ paddingTop: insets.top }}>
      <Pressable onPress={() => router.back()}>
        <Text>Back</Text>
      </Pressable>

      <Pressable
        style={styles.loginButton}
        onPress={onLogin}
        disabled={isLoggingIn}
      >
        <Text style={styles.loginButtonText}>
          {isLoggingIn ? "로그인 중..." : "Login"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
  },
});
