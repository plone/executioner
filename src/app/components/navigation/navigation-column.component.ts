import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Services } from '@plone/restapi-angular';
import { Application, buildContext, Container, Context, Database, NavigationModel } from './navigation.models';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'g-navigation-column',
    templateUrl: './navigation-column.component.html',
    styleUrls: ['./navigation-column.component.scss'],
})
export class NavigationColumnComponent implements OnChanges {
    @Input() path: string;
    @Input() activePath: string;
    @Output() columnLoaded: EventEmitter<void> = new EventEmitter();

    context: Context;
    children: NavigationModel[];

    constructor(
        public services: Services,
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes.path && !!changes.path.currentValue) {
            this.services.resource.get(changes.path.currentValue).subscribe(resource => {
                this.context = buildContext(resource);
                this.extractChildren();
            });
        }
    }

    private extractChildren() {
        const path = this.path.endsWith('/') ? this.path : `${this.path}/`;
        let childrenObs: Observable<NavigationModel[]> = of([]);
        if (this.context instanceof Application) {
            childrenObs = of(this.context.databases.map(db => ({title: db, path: `${path}${db}`})));
        } else if (this.context instanceof Database) {
            childrenObs = of(this.context.containers.map(container => ({title: container, path: `${path}${container}`})));
        } else if (this.context instanceof Container) {
            childrenObs = this.getContainerChildrenObs(this.context);
        }
        childrenObs.subscribe(children => {
            children.sort(this.sortAlphabetically);
            this.children = children;
            this.columnLoaded.emit();
        });
    }

    private sortAlphabetically(a: {title: string}, b: {title: string}): number {
        return a.title < b.title ? -1 : 1;
    }

    private getContainerChildrenObs(container: Container): Observable<NavigationModel[]> {
        let childrenObservable: Observable<NavigationModel[]> = of([]);
        if (!!container.items) {
            const children = container.items.map(item => ({path: this.services.api.getPath(item['@id']), title: item['@name']}));
            if (children.length === 0) {
                childrenObservable = this.services.resource.items(this.path).pipe(
                    map(data => {
                        return data.items.map(item => ({path: this.services.api.getPath(item['@id']), title: item['@name']}));
                    })
                );
            } else {
                childrenObservable = of(children);
            }
        }
        return childrenObservable;
    }
}
