import { Component } from '@angular/core';
import { TraversingComponent, Services } from '@plone/restapi-angular';
import { forkJoin } from 'rxjs';
import { Toaster } from 'pastanaga-angular';

@Component({
    selector: 'g-addons-view',
    templateUrl: './addons.html',
    styleUrls: ['./addons.scss'],
})
export class AddonsView extends TraversingComponent {
    availableAddons: {id: string, title: string}[];
    addons: string[];

    constructor(services: Services, private toaster: Toaster) {
        super(services);
    }

    onTraverse(target: any) {
        forkJoin(
            this.services.resource.availableAddons(target.contextPath),
            this.services.resource.getAddons(target.contextPath)
        ).subscribe(([availableAddons, installedAddons]) => {
            if (availableAddons.length > 0) {
                availableAddons.sort();
                this.availableAddons = availableAddons.filter(addon => installedAddons.indexOf(addon.id) === -1);
            }

            if (installedAddons.length > 0) {
                installedAddons.sort();
                this.addons = installedAddons;
            }
        });
    }

    add(addon: string) {
        const path = this.context['@id'];
        this.services.resource.addAddon(path, addon)
        .subscribe(
            () => this.services.traverser.traverse(path + '/@@addons'),
            () => this.toaster.open('Error when adding the add-on')
        );
    }

    delete(addon: string) {
        if (confirm('Remove ' + addon)) {
            const path = this.context['@id'];
            this.services.resource.deleteAddon(path, addon)
            .subscribe(
                () => this.services.traverser.traverse(path + '/@@addons'),
                () => this.toaster.open('Error when deleting the add-on')
            );
        }
    }
}
