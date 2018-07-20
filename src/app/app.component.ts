import { Component } from '@angular/core';
import { Traverser } from 'angular-traversal';
import { PloneViews, Services } from '@plone/restapi-angular';
import { DatabaseView } from './views/database';
import { GenericView } from './views/view';
import { GenericAddView } from './views/add';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    isAuthenticated = false;

    constructor(
        private services: Services,
        private views: PloneViews,
        private traverser: Traverser,
    ) {
        this.views.initialize();
        this.traverser.addView('view', 'Database', DatabaseView);
        this.traverser.addView('view', '*', GenericView);
        this.traverser.addView('add', '*', GenericAddView);
        this.services.authentication.isAuthenticated.subscribe(auth => {
            this.isAuthenticated = auth.state;
        });
        this.services.resource.traversingUnauthorized.subscribe(() => {
            this.services.authentication.logout();
        });
    }
}
