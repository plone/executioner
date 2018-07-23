import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { concatMap, filter } from 'rxjs/operators';
import { Traverser } from 'angular-traversal';
import { PloneViews, Services } from '@plone/restapi-angular';
import { DatabaseView } from './views/database/database';
import { ApplicationView } from './views/application/application';
import { GenericView } from './views/generic/view';
import { GenericAddView } from './views/generic/add';
import { SharingView } from './views/generic/sharing';
import { BehaviorsView } from './views/generic/behaviors';
import { EditView } from './views/generic/edit';
import { Toaster } from 'pastanaga-angular';
import { ContainerView } from './views/container/container';
import { AddonsView } from './views/container/addons';
import { RegistryView } from './views/container/registry';

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
        this.traverser.addView('view', 'Application', ApplicationView);
        this.traverser.addView('view', 'Database', DatabaseView);
        this.traverser.addView('view', 'Container', ContainerView);
        this.traverser.addView('view', '*', GenericView);
        this.traverser.addView('add', '*', GenericAddView);
        this.traverser.addView('edit', '*', EditView);
        this.traverser.addView('sharing', '*', SharingView);
        this.traverser.addView('behaviors', '*', BehaviorsView);
        this.traverser.addView('addons', '*', AddonsView);
        this.traverser.addView('registry', '*', RegistryView);

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
