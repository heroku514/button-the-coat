import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import {
  coatLine,
  coatStatus,
  EMPTY_COAT,
  hasProgress,
  openTop,
  resetCoat,
  shutBottom,
  shutMiddle,
  shutTop,
  type CoatState,
} from "./src/coat";
import { loadCoat, saveCoat } from "./src/store";

export default function App() {
  const [state, setState] = useState<CoatState>(EMPTY_COAT);
  const [note, setNote] = useState("Look at the coat.");
  const [ready, setReady] = useState(false);
  const [confirmNew, setConfirmNew] = useState(false);

  useEffect(() => {
    let alive = true;
    loadCoat()
      .then((loaded) => {
        if (!alive) return;
        setState(loaded);
        setNote(hasProgress(loaded) ? "Saved coat loaded." : "Look at the coat.");
        setReady(true);
      })
      .catch(() => {
        if (alive) setNote("Could not read the coat.");
      });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveCoat(state).catch(() => setNote("Could not save the coat."));
  }, [ready, state]);

  if (!ready && note === "Look at the coat.") {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.loading}>Loading the coat</Text>
        </View>
      </SafeAreaView>
    );
  }

  function apply(result: { state: CoatState; note: string }) {
    setState(result.state);
    setConfirmNew(false);
    setNote(result.note);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.body}>
        <Text style={styles.title}>Button the Coat</Text>
        <Text style={styles.note}>{note}</Text>
        <Text style={styles.count}>{coatStatus(state)}</Text>
        <Text style={styles.line}>{coatLine(state)}</Text>
        <View style={styles.row}>
          <BigButton label="Shut the bottom" inRow onPress={() => apply(shutBottom(state))} />
          <BigButton label="Shut the middle" inRow onPress={() => apply(shutMiddle(state))} />
        </View>
        <View style={styles.row}>
          <BigButton label="Shut the top" inRow onPress={() => apply(shutTop(state))} />
          <BigButton label="Open the top one" inRow onPress={() => apply(openTop(state))} />
        </View>
        {confirmNew ? (
          <View style={styles.row}>
            <BigButton label="Confirm new" filled inRow onPress={onConfirmNew} />
            <BigButton label="Cancel new" inRow onPress={onCancelNew} />
          </View>
        ) : (
          <BigButton label="New coat" onPress={() => setConfirmNew(true)} />
        )}
      </View>
    </SafeAreaView>
  );

  function onConfirmNew() {
    const result = resetCoat();
    setState(result.state);
    setConfirmNew(false);
    setNote(result.note);
  }

  function onCancelNew() {
    setConfirmNew(false);
    setNote("New coat canceled.");
  }
}

function BigButton({
  label,
  onPress,
  filled,
  inRow,
}: {
  label: string;
  onPress: () => void;
  filled?: boolean;
  inRow?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={[styles.button, inRow && styles.buttonRow, filled && styles.buttonFilled]}
    >
      <Text style={[styles.buttonText, filled && styles.buttonTextFilled]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F4E8EA" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  loading: { fontSize: 28, fontWeight: "800", color: "#3A2430" },
  body: { flex: 1, paddingHorizontal: 16, paddingTop: 8, gap: 8 },
  title: { fontSize: 32, fontWeight: "800", color: "#3A2430" },
  note: { fontSize: 18, color: "#6E4A56", minHeight: 24 },
  count: { fontSize: 22, fontWeight: "700", color: "#3A2430" },
  line: { fontSize: 34, fontWeight: "800", color: "#8E3A56", lineHeight: 40 },
  row: { flexDirection: "row", gap: 8 },
  button: {
    minHeight: 60,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#3A2430",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    backgroundColor: "#FFFFFF",
  },
  buttonRow: { flex: 1 },
  buttonFilled: { backgroundColor: "#3A2430" },
  buttonText: { fontSize: 18, fontWeight: "800", color: "#3A2430", textAlign: "center" },
  buttonTextFilled: { color: "#FFFFFF" },
});
