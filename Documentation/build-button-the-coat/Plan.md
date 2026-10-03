# Plan - Button the Coat

## Goal
Ship one free offline pretend coat. Buttons close from the bottom. A higher button stays open until the ones below it are shut. Open peels only the top shut button.

## Approach
1. Confirm App Store Connect has no rejection waiting.
2. Build an Expo SDK 57 one-screen app. JavaScript is enough because the coat is local state and on-device storage.
3. Run the full simulator regression on the Release binary.
4. Take three 1320×2868 screenshots after every check passes.
5. Upload that binary and submit it for review.

## Rules
- Storage key `button-the-coat-v1`.
- Empty coat is zero buttons shut.
- No account, ads, camera, clock, or network.
