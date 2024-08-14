import 'zone.js';
import { createProviders, HookParserEntry, observeElement, parseHooks } from 'ngx-dynamic-hooks';
import { ExampleComponent } from './components/example/example.component';
import { StackblitzComponent } from './components/stackbltiz/stackblitz.component';
import { provideHttpClient } from '@angular/common/http';

export const initComponents = () => {
  console.log('Loading Angular components');
  
  const parsers: HookParserEntry[] = [
    ExampleComponent,
    StackblitzComponent
  ];

  const scope = createProviders([
    provideHttpClient()
  ]);
  
  scope.parseHooks(document.body, parsers);
  observeElement(document.body, () => {
    scope.parseHooks(document.body, parsers);
  });
}

