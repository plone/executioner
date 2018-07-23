import { Component } from '@angular/core';
import { TraversingComponent, Services } from '@plone/restapi-angular';
import { forkJoin, of } from 'rxjs';
import { Toaster } from 'pastanaga-angular';
import { concatMap } from 'rxjs/operators';

@Component({
    selector: 'g-registry-view',
    templateUrl: './registry.html',
    styleUrls: ['./registry.scss']
})
export class RegistryView extends TraversingComponent {

    registry: any;
    entries: {key: string, value: any}[];
    currentEntry: {key: string, value: any};
    newEntry: {key: string, value: any} = {key: null, value: null};

    constructor(services: Services, private toaster: Toaster) {
        super(services);
    }

    onTraverse(target: any) {
        this.services.resource.registry(target.contextPath)
        .subscribe(registry => {
            const entries = registry.value;
            this.entries = Object.keys(entries).map(key => ({key: key, value: entries[key][0]}));
            this.entries.sort((a, b) => a.key < b.key ? -1 : 1);
        });
    }

    edit(key: string) {
        this.currentEntry = this.entries.find(entry => entry.key === key);
    }

    cancel() {
        this.currentEntry = null;
    }

    save(entry: {key: string, value: any}, isNew = false) {
        let value: any;
        try {
            value = JSON.parse(entry.value);
        } catch (e) {
            this.toaster.open('Value is not a valid JSON');
            return;
        }
        const operation = isNew ? this.services.resource.declareRegistry(this.context['@id'], entry.key) : of(null);
        operation.pipe(
            concatMap(() => this.services.resource.setRegistryEntry(
                this.context['@id'],
                entry.key,
                value))
        ).subscribe(
            () => {
                this.toaster.open('Value saved');
                this.currentEntry = null;
            },
            () => this.toaster.open('Error when saving the value')
        );
    }
}
