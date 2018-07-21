import { Component } from '@angular/core';
import { TraversingComponent, Services } from '@plone/restapi-angular';
import { Toaster } from 'pastanaga-angular';

@Component({
    selector: 'g-edit-view',
    templateUrl: './edit.html',
})
export class EditView extends TraversingComponent {
    model: any;

    constructor(services: Services, private toaster: Toaster) {
        super(services);
    }

    update(value) {
        this.model = value;
    }

    save() {
        this.services.resource.update(this.context['@id'], this.model)
        .subscribe(
            () => this.toaster.open('Updated'),
            () => this.toaster.open('Error when updating'),
        );
    }
}
