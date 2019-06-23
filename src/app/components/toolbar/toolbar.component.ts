import { Component, Input } from '@angular/core';
import { Services } from '@plone/restapi-angular';
import { buildContext, Container, Context } from '../navigation/navigation.models';

@Component({
    selector: 'g-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
    @Input() path: string;
    @Input() canAdd = true;
    @Input() hasButtons = false;

    constructor(private services: Services) {}

    delete() {
        if (!!this.path) {
            this.services.resource.get(this.path).subscribe(context => {
                if (confirm('Delete ' + context.title)) {
                    const parent = context.parent['@id'] || '/';
                    this.services.resource.delete(context['@id']).subscribe(() => {
                        this.services.traverser.traverse(parent);
                    });
                }
            });
        }
    }
}
