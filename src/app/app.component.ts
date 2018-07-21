import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { concatMap, filter } from 'rxjs/operators';
import { Traverser } from 'angular-traversal';
import { PloneViews, Services } from '@plone/restapi-angular';
import { DatabaseView } from './views/database';
import { GenericView } from './views/view';
import { GenericAddView } from './views/add';
import { SharingView } from './views/sharing';
import { BehaviorsView } from './views/behaviors';
import { Toaster } from 'pastanaga-angular';

@Component({
    selector: 'g-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    @ViewChild('toastsContainer', {read: ViewContainerRef}) toastsContainer: ViewContainerRef;
    isAuthenticated = false;

    constructor(
        private services: Services,
        private views: PloneViews,
        private traverser: Traverser,
        private toaster: Toaster,
    ) {
        this.views.initialize();
        this.traverser.addView('view', 'Database', DatabaseView);
        this.traverser.addView('view', '*', GenericView);
        this.traverser.addView('add', '*', GenericAddView);
        this.traverser.addView('sharing', '*', SharingView);
        this.traverser.addView('behaviors', '*', BehaviorsView);

        this.services.authentication.isAuthenticated.subscribe(auth => this.isAuthenticated = auth.state);

        this.services.resource.traversingUnauthorized.subscribe(() => this.services.authentication.logout());
    }

    ngOnInit() {
        this.toaster.registerContainer(this.toastsContainer);
    }
    logout() {
        this.services.authentication.logout();
    }
}
