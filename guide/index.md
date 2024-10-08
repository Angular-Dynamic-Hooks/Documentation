---
title: Getting started
description: The Angular Dynamic Hooks guide shows you step-by-step how to install and use the library to load Angular components into dynamic content.
---

<div class="page-title">
  <img class="page-title-icon" src="{{ "/assets/images/icons/hand.svg"| relative_url }}" alt="An icon of a waving hand">
  <h1 class="page-title-text">Getting started</h1>
</div>

<div class="badges" markdown="1">
  [![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/angular-dynamic-hooks/ngx-dynamic-hooks/ci-test.yml?style=flat-square&logo=github&label=CI%20tests)](https://github.com/angular-dynamic-hooks/ngx-dynamic-hooks/actions/workflows/ci-test.yml)
  [![Coverage](https://img.shields.io/codecov/c/gh/angular-dynamic-hooks/ngx-dynamic-hooks?style=flat-square)](https://codecov.io/gh/angular-dynamic-hooks/ngx-dynamic-hooks)
  [![NPM](https://img.shields.io/npm/v/ngx-dynamic-hooks?color=orange&style=flat-square)](https://www.npmjs.com/package/ngx-dynamic-hooks)
  [![License](https://img.shields.io/github/license/angular-dynamic-hooks/ngx-dynamic-hooks?color=blue&style=flat-square)](https://github.com/angular-dynamic-hooks/ngx-dynamic-hooks/blob/master/LICENSE.md)
  [![Static Badge](https://img.shields.io/badge/Donate%20-%20Thank%20you!%20-%20%23ff8282?style=flat-square)](https://www.paypal.com/donate/?hosted_button_id=3XVSEZKNQW8HC)
</div>

Angular Dynamic Hooks allows you to load Angular components into any dynamic content, such as HTML strings (similar to a "dynamic" template) or even already-existing HTML elements.

Works as part of an Angular app or fully standalone. Load components by selectors or **any text pattern**. No JiT-compiler required - [just install and go]( {{ "/guide/quickstart" | relative_url }} ).

![A short animated gif showing how to use the Angular Dynamic Hooks library to load components](https://github.com/angular-dynamic-hooks/ngx-dynamic-hooks/assets/12670925/ef27d405-4663-48a5-97b5-ca068d7b67d8)

## Installation

Simply install via npm (or yarn)

```sh
npm install ngx-dynamic-hooks
```

[See the Quickstart page]( {{ "/guide/quickstart" | relative_url }} ) for an example on how to get going right away.

| Angular | Version | NPM |
| --- | --- | --- |
| 6 - 12  | 1.x.x | `ngx-dynamic-hooks@^1` |
| 13-16  | 2.x.x | `ngx-dynamic-hooks@^2` |
| 17+  | 3.x.x | `ngx-dynamic-hooks@^3` |

As the library does not rely on a runtime compiler, it works in both JiT- and AoT-environments.

{% include docs/notice.html content="
  <h4>Upgrading to v3</h4>
  <span>If you have been using v2 of the library and are looking to upgrade, have a look at <a href='/guide/version-3-whats-new'>Version 3 - What's new?</a> for a list of breaking changes.</span>
" %}

## Highlights

* ⭐ Loads fully-functional Angular components into dynamic content
* 📖 Parses both strings and HTML trees to load components into them like a template
* 🚀 Can be used [fully standalone]({{ "guide/standalone-mode" | relative_url }}) (load components directly into HTML without Angular)
* 🏃 Works **without** needing the JiT compiler
* 💻 Works **with** Server-Side-Rendering
* 🔍 Loads components by their selectors, custom selectors or [any text pattern of your choice]({{ "guide/parsers#writing-your-own-hookparser" | relative_url }})
* ⚙️ Services, Inputs/Outputs, Lifecycle Methods and other standard features all work normally
* 💤 Allows [lazy-loading components]({{ "guide/configuration#lazy-loading-components" | relative_url }}) only if they appear in the content
* 🔒 Can pass custom data safely to your components via an optional [context object]({{ "guide/dynamic-component-features" | relative_url }})

## Load components dynamically

In Angular, you normally load components by placing their selectors in a template. But what if you wanted to load components not just from static templates, but from arbitrary dynamic content as well - such as string variables, HTML elements or even the whole browser DOM?

By default, **this is not easily possible**.

<a href="https://www.npmjs.com/package/ngx-dynamic-hooks" target="_blank">Angular Dynamic Hooks</a> solves this shortcoming by allowing you to load components from any content of your choice at runtime - similar to a "dynamic template". The library does not need the Just-in-Time Angular compiler to do so, resulting in much smaller bundle sizes. 

It is able to do all this in a controlled and secure manner by using so-called **hooks**.

![An illustration about how hooks work in the Angular Dynamic Hooks library](https://i.imgur.com/e9ygec4.png)

## What's a hook?

Simply put, hooks are any HTML element or text pattern in the content to be replaced by an Angular component. 

Hooks can be **singletags** (`<hook>`) or **enclosing** (`<hook>...</hook>`). In most cases, you may simply want to use the normal component selectors as their hooks. You can easily do that with the out-of-the-box `SelectorHookParser` that comes included with this library. 

Just use your selectors like in a normal Angular template (such as `<app-mycomponent [someInput]="'hello!'">...</app-mycomponent>`) and the corresponding components will be loaded in their place.

![An illustration showing how selector hooks work in the Angular Dynamic Hooks library](https://i.imgur.com/tjAX6uU.png)

What is especially neat: Hooks can be anything - not just component selectors! 

Each hook internally has a corresponding <a href="https://github.com/Angular-Dynamic-Hooks/ngx-dynamic-hooks/blob/1a94c3517235a2b2d571379d1cfce88958cb3f66/projects/ngx-dynamic-hooks/src/lib/interfacesPublic.ts#L51" target="_blank">`HookParser`</a> that tells the library where and how to instantiate the component. You can easily create [your own hook parsers]({{ "/guide/parsers" | relative_url }}) that replace any HTML element or text pattern of your choice with Angular components!

## Do the components work normally?

Yes, the dynamically-loaded components are fully-functional as they are created with native Angular methods. They seamlessly integrate into the rest of the app with all features working as expected, such as: 

* *@Inputs()*
* *@Outputs()*
* *Content projection / transcluded content*
* *Change detection*
* *Dependency injection / services*
* *All lifecycle methods*

You can even lazy-load components only when they appear in the content to minimize the initial bundle size.

For more details about all of these topics, see the following sections.

## What this library doesn't do

Please note that this library does not aim to be a full Angular template compiler. It implements its own parsing logic that specifically looks for registered hooks and replaces them with their corresponding Angular components - nothing more. 

This means that other special Angular template syntax (such as *ngIf, *ngFor or other directives) **will not work**.

However, in terms of loading components, it allows for a lot more flexibility and possibilities than Vanilla Angular itself, such as allowing you to load them at runtime from normal strings or HTML trees, replacing text patterns with components and more.