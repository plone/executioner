import { Component } from '@angular/core';
import { ViewView } from '@plone/restapi-angular';
import { Target } from 'angular-traversal';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'g-container-view',
    templateUrl: './container.html',
    styleUrls: ['./container.scss'],
})
export class ContainerView extends ViewView {
    behaviors: string[];
    addons: {id: string, title: string}[];
    types = [{id: 'Folder', name: 'Folder'}, {id: 'Item', name: 'Item'}];

    onTraverse(target: Target) {
        super.onTraverse(target);
        this.services.resource.getBehaviors(target.contextPath).subscribe(behaviors => {
            if (behaviors.length > 0) {
                this.behaviors = behaviors;
            }
        });

        forkJoin(
            this.services.resource.availableAddons(target.contextPath),
            this.services.resource.getAddons(target.contextPath)
        ).subscribe(([availableAddons, installedAddons]) => {
            if (installedAddons.length > 0) {
                installedAddons.sort();
                this.addons = availableAddons.filter(addon => installedAddons.indexOf(addon.id) !== -1);
            }
        });
    }
}
