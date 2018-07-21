import { Component } from '@angular/core';
import { AddView } from '@plone/restapi-angular';

@Component({
    selector: 'g-add-view',
    templateUrl: './add.html',
    styleUrls: ['./add.scss']
})
export class GenericAddView extends AddView {
    types: string[] = [];

    onTraverse(target: any) {
        if (!this.type) {
            this.services.resource.addableTypes(target.context['@id'])
            .subscribe(types => {
                types.sort();
                this.types = types;
            });
        }
    }

    onSave(model: any) {
        model['@type'] = this.type;
        this.services.resource.create(this.path, model).subscribe((res: any) => {
            const path = res['@id'] ? res['@id'] : this.path + '/' + res['id'];
            this.services.traverser.traverse(path);
        });
    }
}
