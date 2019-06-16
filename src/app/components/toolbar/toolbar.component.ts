import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Services } from '@plone/restapi-angular';
import { Container, Context } from '../navigation/navigation.models';

@Component({
    selector: 'g-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnChanges {
    @Input() context: Context | Container;
    @Input() parentPath: string;
    canAdd = false;
    hasButtons = false;

    constructor(private services: Services) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.context && changes.context.currentValue) {
            this.hasButtons = changes.context.currentValue instanceof Container;
            this.canAdd = this.hasButtons && this.context.is_folderish;
        }
    }

    delete() {
        if (this.context instanceof Container && confirm('Delete ' + this.context.title)) {
            const parent = this.context.parent['@id'] || '/';
            this.services.resource.delete(this.context['@id']).subscribe(() => {
                this.services.traverser.traverse(parent);
            });
        }
    }
}
