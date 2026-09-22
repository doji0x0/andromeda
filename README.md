# andromeda

### Local conversational intake

The assistant uses React state only. Questions and options live in `data/chat-flow.ts`; no intake information is sent to a server or saved between page reloads. Set `intakeConfig.recipient` to the confirmed official Andromeda email to prefill the recipient of the final mail draft. Mailto opens a draft in the visitor's configured email application; it never sends automatically.

The existing landing-page copy and section order are preserved. Interaction effects respect reduced-motion preferences.
