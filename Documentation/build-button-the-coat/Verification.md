# Verification - Button the Coat

## 2026-10-03

- Rejection scan: Chrome apps page login false, Rejected 0. API NO_REJECTION.
- Logic: 22 pass.
- Release binary on iPhone 17 Pro Max, iOS 26.4, UDID `4CBEED5E-21F1-41AF-A87E-AE0B5B5CC857`. UIDeviceFamily 1. No UIBackgroundModes. Display name Button the Coat. Version 1.0.0 build 1.
- Simulator regression: 101 checks ALL PASS on that binary, including cold open, bottom first, top too early, already open, bottom shut, already shut, top still blocked, middle, already middle, top, already top, open top, open middle, open bottom, new-coat cancel, new-coat confirm, and a relaunch that kept two buttons.
- Screenshots 1320×2868: open coat, bottom shut, coat warm.
- App Store version 1.0.0 is WAITING_FOR_REVIEW. Submission `c01c365a-58fc-46de-be88-8f69ec1526b2` WAITING_FOR_REVIEW. Build `5420e9c6-2df5-4f88-984a-4872fdf5b39b` VALID.
