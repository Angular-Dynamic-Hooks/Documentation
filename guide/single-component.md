---
---

<div class="page-title">
  <img class="page-title-icon" src="{{ "/assets/images/icons/circle.svg"| relative_url }}">
  <h1 class="page-title-text">Single component</h1>
</div>

While you can always load just one component via the <a href="https://github.com/Angular-Dynamic-Hooks/ngx-dynamic-hooks/blob/1a94c3517235a2b2d571379d1cfce88958cb3f66/projects/ngx-dynamic-hooks/src/lib/components/dynamicHooksComponent.ts" target="_blank">`DynamicHooksComponent`</a>, sometimes that can feel a bit verbose and it would be more convenient to have a dedicated tool for the job.

For that purpose, you can simply use the <a href="https://github.com/Angular-Dynamic-Hooks/ngx-dynamic-hooks/blob/1a94c3517235a2b2d571379d1cfce88958cb3f66/projects/ngx-dynamic-hooks/src/lib/components/dynamicSingleComponent.ts" target="_blank">`DynamicSingleComponent`</a>. It loads a single dynamic component with inputs/outputs whereever you need it.

```html
<ngx-dynamic-single
  [component]="compClass"
  [inputs]="yourInputs"
  [outputs]="yourInputs"
  [options]="yourOptions"
  (componentLoaded)="onComponentLoaded(compRef)"
></ngx-dynamic-single>
```

Here are some details about the inputs:

Input name | Type | Description
--- | --- | ---
`component` | Any component class | The component class to load.
`inputs` | Object literal | An object literal where the keys are the input names and the values are their values.
`outputs` | Object literal | An object literal where the keys are the output names and the values are functions that will be called when they emit.
`options` | <a href="https://github.com/Angular-Dynamic-Hooks/ngx-dynamic-hooks/blob/1a94c3517235a2b2d571379d1cfce88958cb3f66/projects/ngx-dynamic-hooks/src/lib/components/dynamicSingleComponent.ts#L10" target="_blank">`DynamicHooksSingleOptions`</a> | A couple of options to modify how the component works.

A <a href="https://github.com/Angular-Dynamic-Hooks/ngx-dynamic-hooks/blob/1a94c3517235a2b2d571379d1cfce88958cb3f66/projects/ngx-dynamic-hooks/src/lib/components/dynamicSingleComponent.ts#L10" target="_blank">`DynamicHooksSingleOptions`</a> object is just an abbreviated version of a [ParseOptions]({{ "guide/configuration#parseoptions" | relative_url }}) object and works the same:

```ts
interface DynamicHooksSingleOptions {
  updateOnPushOnly?: boolean;
  compareInputsByValue?: boolean;
  compareOutputsByValue?: boolean;
  compareByValueDepth?: number;
  ignoreInputAliases?: boolean;
  ignoreOutputAliases?: boolean;
  acceptInputsForAnyProperty?: boolean;
  acceptOutputsForAnyObservable?: boolean;
}
```

There is also one output you can subscribe to:

Input name | Type | Description
--- | --- | ---
`componentLoaded` | `EventEmitter<ComponentRef>` | Will emit the `ComponentRef` when the component has loaded

The <a href="https://github.com/Angular-Dynamic-Hooks/ngx-dynamic-hooks/blob/1a94c3517235a2b2d571379d1cfce88958cb3f66/projects/ngx-dynamic-hooks/src/lib/components/dynamicSingleComponent.ts" target="_blank">`DynamicSingleComponent`</a> will automatically reload the internal component whenever the `component`-input changes and keep updating it if any other input changes.