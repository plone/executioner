import { Component } from '@angular/core';
import { TraversingComponent, Services } from '@plone/restapi-angular';
import { Toaster } from 'pastanaga-angular';

@Component({
    selector: 'g-sharing-view',
    templateUrl: './sharing.html',
})
export class SharingView extends TraversingComponent {
    sharing: any;

    constructor(services: Services, private toaster: Toaster) {
        super(services);
    }

    onTraverse(target: any) {
        this.services.resource
            .sharing(target.context['@id'])
            .subscribe(sharing => (this.sharing = sharing));
    }

    update(value) {
        this.sharing = value;
    }

    save() {
        this.services.resource.updateSharing(this.context['@id'], this.sharing)
        .subscribe(
            () => this.toaster.open('Permissions updated'),
            () => this.toaster.open('Error when updating permissions'),
        );
    }
}
