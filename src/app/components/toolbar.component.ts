import { Component, Input } from '@angular/core';
import { Services } from '@plone/restapi-angular';

@Component({
    selector: 'g-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
    @Input() context: any;
    @Input() parentPath: string;

    constructor(private services: Services) {}

    delete() {
        if (confirm('Delete ' + this.context.title)) {
            const parent = this.context.parent['@id'] || '/';
            this.services.resource.delete(this.context['@id']).subscribe(() => {
                this.services.traverser.traverse(parent);
            });
        }
    }
}
