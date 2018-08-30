import { Component } from '@angular/core';
import { TraversingComponent, Services } from '@plone/restapi-angular';
import { Toaster } from 'pastanaga-angular';

@Component({
    selector: 'g-edit-view',
    templateUrl: './edit.html',
})
export class EditView extends TraversingComponent {
    json: string;
    error = false;

    constructor(services: Services, private toaster: Toaster) {
        super(services);
    }

    update(value) {
        this.json = value;
    }

    save() {
        let model: any;
        try {
            model = JSON.parse(this.json);
            this.error = false;
        } catch (SyntaxError) {
            this.error = true;
        }
        if (!this.error) {
            this.services.resource.save(this.context['@id'], model)
            .subscribe(
                () => this.toaster.open('Updated'),
                () => this.toaster.open('Error when updating'),
            );
        }
    }
}
