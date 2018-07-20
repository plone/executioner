import { Component } from '@angular/core';
import { ViewView } from '@plone/restapi-angular';
import { Target } from 'angular-traversal';

@Component({
    selector: 'generic-view',
    templateUrl: './view.html',
})
export class GenericView extends ViewView {
    availableBehaviors: string[];
    behaviors: string[];

    onTraverse(target: Target) {
        super.onTraverse(target);
        this.services.resource.availableBehaviors(target.contextPath).subscribe(behaviors => {
            if (behaviors.length > 0) {
                this.availableBehaviors = behaviors;
            }
        });
        this.services.resource.getBehaviors(target.contextPath).subscribe(behaviors => {
            if (behaviors.length > 0) {
                this.behaviors = behaviors;
            }
        });
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
