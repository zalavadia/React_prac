// ============================================================================
// 00 — React Study Order (Scratch → Mid → React 19 → Advanced)
// Run: node 00_StudyOrder.js
// ============================================================================

const order = {
  "BASE": [
    "01_WhatIsReactAndJSX.jsx",
    "02_FunctionalComponents.jsx",
    "03_Props.jsx",
    "04_UseState.jsx",
    "05_EventsHandling.jsx",
    "06_ConditionalRendering.jsx",
    "07_ListsAndKeys.jsx",
    "08_FormsControlled.jsx",
    "09_UseEffect.jsx",
    "10_UseRef.jsx"
  ],
  "MID": [
    "11_UseContext.jsx",
    "12_UseReducer.jsx",
    "13_CustomHooks.jsx",
    "14_LiftingStateUp.jsx",
    "15_ChildrenComposition.jsx",
    "16_UseMemoUseCallback.jsx",
    "17_ReactMemo.jsx",
    "18_UseLayoutEffect.jsx",
    "19_Portals.jsx",
    "20_ErrorBoundaries.jsx",
    "21_SuspenseAndLazy.jsx",
    "22_RoutingBasics.jsx",
    "23_DataFetchingPatterns.jsx",
    "24_ReRenderPerformance.jsx",
    "25_ControlledVsUncontrolled.jsx",
    "26_ReconciliationAndKeys.jsx",
    "27_StrictModeAndEffects.jsx"
  ],
  "REACT19": [
    "28_React19_Overview.jsx",
    "29_React19_FormActions.jsx",
    "30_React19_useActionState.jsx",
    "31_React19_useFormStatus.jsx",
    "32_React19_useOptimistic.jsx",
    "33_React19_useHook.jsx",
    "34_React19_RefAsProp.jsx",
    "35_React19_DocumentMetadata.jsx",
    "36_React19_ContextAsProvider.jsx",
    "37_ServerComponentsIntro.jsx",
    "38_ServerActions.jsx",
    "39_ReactCompilerAndEffectEvent.jsx"
  ],
  "INTERVIEW": [
    "40_MidLevelInterviewQuestions.jsx"
  ],
  "ADVANCED": [
    "41_ClassComponents.jsx",
    "42_TypeScriptAndReact.tsx",
    "43_AccessibilityA11y.jsx",
    "44_AdvancedRouting.jsx",
    "45_ConcurrentTransitions.jsx",
    "46_AuthAndFormsLibs.jsx",
    "47_Zustand.jsx"
  ]
};

for (const [level, files] of Object.entries(order)) {
  console.log("\n=== " + level + " ===");
  files.forEach((f, i) => console.log(i + 1 + ". " + f));
}
console.log("\nTotal:", Object.values(order).reduce((n,a)=>n+a.length,0));
console.log("Study order: 01 → 47. Docs app: cd docs && python3 -m http.server 5600");
