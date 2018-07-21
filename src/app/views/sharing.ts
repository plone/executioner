import { Component } from '@angular/core';
import { TraversingComponent, Services } from '@plone/restapi-angular';

@Component({
    selector: 'g-sharing-view',
    templateUrl: './sharing.html',
})
export class SharingView extends TraversingComponent {
    sharing: any;

    constructor(services: Services) {
        super(services);
    }

    onTraverse(target: any) {
        this.services.resource
            .sharing(target.context['@id'])
            .subscribe(sharing => (this.sharing = sharing));
    }
}
