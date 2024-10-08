---
title: Quick start
description: Learn how to quickly set up a minimal example to load Angular components into dynamic content with the Angular Dynamic Hooks library.
---

<div class="page-title">
  <img class="page-title-icon" src="{{ "/assets/images/icons/rocket.svg"| relative_url }}" alt="An icon depicting a rocket">
  <h1 class="page-title-text">Quick start</h1>
</div>

## Minimal example

Install the library with:

```sh
npm install ngx-dynamic-hooks
```

Then import the <a href="https://github.com/Angular-Dynamic-Hooks/ngx-dynamic-hooks/blob/1a94c3517235a2b2d571379d1cfce88958cb3f66/projects/ngx-dynamic-hooks/src/lib/components/dynamicHooksComponent.ts" target="_blank">`DynamicHooksComponent`</a> as well as your dynamic component(s) to load:

```ts
import { Component } from '@angular/core';
import { DynamicHooksComponent } from 'ngx-dynamic-hooks';
import { ExampleComponent } from 'somewhere';

@Component({
  ...
  imports: [DynamicHooksComponent]
})
export class AppComponent {

  // The content to parse
  content = 'Load a component here: <app-example></app-example>';

  // A list of components to look for
  parsers = [ExampleComponent];
  
}
```
You can now use the <a href="https://github.com/Angular-Dynamic-Hooks/ngx-dynamic-hooks/blob/1a94c3517235a2b2d571379d1cfce88958cb3f66/projects/ngx-dynamic-hooks/src/lib/components/dynamicHooksComponent.ts" target="_blank">`DynamicHooksComponent`</a> (`<ngx-dynamic-hooks>`) where you want to render the content:

```html
<ngx-dynamic-hooks [content]="content" [parsers]="parsers"></ngx-dynamic-hooks>
```

That's it! If `app-example` is the selector of `ExampleComponent`, it will automatically be loaded in its place, just like in a normal template.

## See it in action

<app-stackblitz
  url="https://stackblitz.com/github/Angular-Dynamic-Hooks/Example-v3-Quickstart" 
  fileQueryParam="file=src%2Fapp%2Fapp.component.ts"
  image="{{ "/assets/images/stackblitz/quickstart.jpg" | relative_url }}"
></app-stackblitz>

## About using modules

If your app uses modules instead of the new standalone components structure, you can import the <a href="https://github.com/Angular-Dynamic-Hooks/ngx-dynamic-hooks/blob/1a94c3517235a2b2d571379d1cfce88958cb3f66/projects/ngx-dynamic-hooks/src/lib/components/dynamicHooksComponent.ts" target="_blank">`DynamicHooksComponent`</a> there instead:

```ts
@NgModule({
  ...
  imports: [DynamicHooksComponent],
  declarations: [ExampleComponent]
})
export class AppModule {}
```

## Next steps

Please note that the above is a minimal example and that there are plenty more features and options available to you. You can read about them on these pages:

- The [Introduction]({{ "guide" | relative_url }}) page explains what a hook is and what the library is for.
- The [How to use]({{ "guide/how-to-use" | relative_url }}) page shows you the most common ways to use the library when used as part of an Angular app.
- The [Standalone mode]({{ "guide/standalone-mode" | relative_url }}) page explains how to use the library without Angular, allowing you to load fully-functional Angular components freely in other contexts (CMS, static HTML, etc).
- The [Component features]({{ "guide/dynamic-component-features" | relative_url }}) page shows how to pass data to your dynamically-loaded components, subscribe to their outputs, special lifecycle methods, etc.
- The [Configuration]({{ "guide/configuration" | relative_url }}) page gives an overview of all the options and settings available to you.
- The [Parsers]({{ "guide/parsers" | relative_url }}) page lists the various ways to find components - including writing your own parsers!