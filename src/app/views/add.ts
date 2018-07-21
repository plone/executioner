import { Component } from '@angular/core';
import { AddView } from '@plone/restapi-angular';

@Component({
    selector: 'g-add-view',
    templateUrl: './add.html',
})
export class GenericAddView extends AddView {
    onSave(model: any) {
        model['@type'] = this.type;
        this.services.resource.create(this.path, model).subscribe((res: any) => {
            const path = res['@id'] ? res['@id'] : this.path + '/' + res['id'];
            this.services.traverser.traverse(path);
        });
    }
}
