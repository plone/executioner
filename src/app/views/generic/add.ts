import { Component } from '@angular/core';
import { AddView } from '@plone/restapi-angular';

@Component({
    selector: 'g-add-view',
    templateUrl: './add.html',
    styleUrls: ['./add.scss']
})
export class GenericAddView extends AddView {
    types: string[] = [];
    path: string;
    name: string;

    onTraverse(target: any) {
        if (!this.type) {
            if (target.context['@id']) {
                this.services.resource.addableTypes(target.context['@id'])
                .subscribe(types => {
                    types.sort();
                    this.types = types;
                });
            } else if (target.context['@type'] === 'Database') {
                this.types = ['Container'];
            }
        }
        this.path = target.context['@id'] || target.contextPath;
        this.name = target.context['@name'] || target.contextPath.split('/').pop();
    }

    onSave(model: any) {
        model['@type'] = this.type;
        this.services.resource.create(this.path, model).subscribe((res: any) => {
            const path = res['@id'] ? res['@id'] : this.path + '/' + res['id'];
            this.services.traverser.traverse(path);
        });
    }
}
