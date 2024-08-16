import 'zone.js';
import { createProviders, HookParserEntry, observeElement } from 'ngx-dynamic-hooks';
import { ExampleComponent } from './components/docs/example/example.component';
import { StackblitzComponent } from './components/docs/stackblitz/stackblitz.component';
import { provideHttpClient } from '@angular/common/http';
import { ArticleTocComponent } from './components/docs/articleToc/articleToc.component';
import { CodeComponent } from './components/docs/code/code.component';
import { DarkModeComponent } from './components/docs/darkmode/darkmode.component';
import { SidebarComponent } from './components/docs/sidebar/sidebar.component';
import { LatestVersionComponent } from './components/docs/latestVersion/latestVersion.component';
import { VersionWarningComponent } from './components/docs/versionWarning/versionWarning.component';
import { VersionSelectComponent } from './components/docs/versionSelect/versionSelect.component';
import { CopyrightComponent } from './components/copright/copyright.component';
import { LandingMenuComponent } from './components/landing/menu/landingMenu.component';
import { LandingCardsComponent } from './components/landing/cards/landingCards.component';
import { LandingGuideComponent } from './components/landing/guide/landingGuide.component';

// Parse document.body and loads Angular components into it with Angular Dynamic Hooks
export const init = () => {
  
  const parsers: HookParserEntry[] = [
    // Landing page
    LandingMenuComponent,
    LandingCardsComponent,
    LandingGuideComponent,
    // Docs
    VersionSelectComponent,
    DarkModeComponent,
    SidebarComponent,
    LatestVersionComponent,
    VersionWarningComponent,
    ExampleComponent,
    ArticleTocComponent,
    CodeComponent,
    StackblitzComponent,
    // Other
    CopyrightComponent
  ];

  const scope = createProviders([
    provideHttpClient()
  ]);

  scope.parse(document.body, parsers);
  observeElement(document.body, () => {
    scope.parse(document.body, parsers);
  });
  
}