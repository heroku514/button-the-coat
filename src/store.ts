import AsyncStorage from "@react-native-async-storage/async-storage";
import { parseCoat, type CoatState } from "./coat";

const KEY = "button-the-coat-v1";

export async function loadCoat(): Promise<CoatState> {
  const raw = await AsyncStorage.getItem(KEY);
  return parseCoat(raw);
}

export async function saveCoat(state: CoatState): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(state));
}
