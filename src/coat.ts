export type CoatState = {
  shut: 0 | 1 | 2 | 3;
};

export const EMPTY_COAT: CoatState = { shut: 0 };

export function coatLine(state: CoatState): string {
  if (state.shut === 0) return "The coat is open.";
  if (state.shut === 1) return "The bottom is shut.";
  if (state.shut === 2) return "Two buttons shut.";
  return "The coat is warm.";
}

export function coatStatus(state: CoatState): string {
  if (state.shut === 0) return "Not buttoned.";
  if (state.shut === 1) return "One button.";
  if (state.shut === 2) return "Halfway.";
  return "All three.";
}

export function hasProgress(state: CoatState): boolean {
  return state.shut !== 0;
}

export function parseCoat(raw: string | null): CoatState {
  if (!raw) return EMPTY_COAT;
  try {
    const value = JSON.parse(raw) as { shut?: unknown };
    if (value.shut === 0 || value.shut === 1 || value.shut === 2 || value.shut === 3) {
      return { shut: value.shut };
    }
    return EMPTY_COAT;
  } catch {
    return EMPTY_COAT;
  }
}

export function shutBottom(state: CoatState): { state: CoatState; note: string } {
  if (state.shut >= 1) return { state, note: "Already shut." };
  return { state: { shut: 1 }, note: "Bottom shut." };
}

export function shutMiddle(state: CoatState): { state: CoatState; note: string } {
  if (state.shut === 0) return { state, note: "Bottom first." };
  if (state.shut >= 2) return { state, note: "Already shut." };
  return { state: { shut: 2 }, note: "Middle shut." };
}

export function shutTop(state: CoatState): { state: CoatState; note: string } {
  if (state.shut < 2) return { state, note: "Not yet." };
  if (state.shut === 3) return { state, note: "Already shut." };
  return { state: { shut: 3 }, note: "Top shut." };
}

export function openTop(state: CoatState): { state: CoatState; note: string } {
  if (state.shut === 0) return { state, note: "Already open." };
  if (state.shut === 1) return { state: { shut: 0 }, note: "Bottom opened." };
  if (state.shut === 2) return { state: { shut: 1 }, note: "Middle opened." };
  return { state: { shut: 2 }, note: "Top opened." };
}

export function resetCoat(): { state: CoatState; note: string } {
  return { state: EMPTY_COAT, note: "Look at the coat." };
}
