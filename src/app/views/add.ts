import { Component } from '@angular/core';
import { AddView } from '@plone/restapi-angular';

@Component({
    selector: 'generic-add-view',
    templateUrl: './add.html',
})
export class GenericAddView extends AddView {
    onSave(model: any) {
        model['@type'] = this.type;
        this.services.resource.create(this.path, model).subscribe((res: any) => {
            this.services.traverser.traverse(this.path + '/' + res['id']);
        });
    }
}
