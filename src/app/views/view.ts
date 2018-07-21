import { Component } from '@angular/core';
import { ViewView } from '@plone/restapi-angular';
import { Target } from 'angular-traversal';

@Component({
    selector: 'generic-view',
    templateUrl: './view.html',
    styleUrls: ['./view.scss'],
})
export class GenericView extends ViewView {
    availableBehaviors: {id: string, name: string}[];
    behaviors: string[];
    types = [{id: 'Folder', name: 'Folder'}, {id: 'Item', name: 'Item'}];

    onTraverse(target: Target) {
        super.onTraverse(target);
        this.services.resource.availableBehaviors(target.contextPath).subscribe(behaviors => {
            if (behaviors.length > 0) {
                this.availableBehaviors = behaviors.map(b => ({id: b, name: b}));
            }
        });
        this.services.resource.getBehaviors(target.contextPath).subscribe(behaviors => {
            if (behaviors.length > 0) {
                this.behaviors = behaviors;
            }
        });
    }

    addItem(type) {
        this.services.traverser.traverse(`${this.context['@id']}/@@add?type=${type}`);
    }

    deleteItem(path: string) {
        this.services.resource.delete(path).subscribe(() => {
            this.services.traverser.traverse(this.context['@id']);
        });
    }

    addBehavior(behavior: string) {
        const path = this.context['@id'];
        this.services.resource.addBehavior(path, behavior)
        .subscribe(() => this.services.traverser.traverse(path));
    }
}
