import { Component } from '@angular/core';
import { ViewView } from '@plone/restapi-angular';
import { Target } from 'angular-traversal';

@Component({
    selector: 'g-view',
    templateUrl: './view.html',
    styleUrls: ['./view.scss'],
})
export class GenericView extends ViewView {
    availableBehaviors: {id: string, name: string}[];
    behaviors: string[];
    types = [{id: 'Folder', name: 'Folder'}, {id: 'Item', name: 'Item'}];

    onTraverse(target: Target) {
        super.onTraverse(target);
        this.services.resource.getBehaviors(target.contextPath).subscribe(behaviors => {
            if (behaviors.length > 0) {
                this.behaviors = behaviors;
            }
        });
    }
}
