import { Component, ElementRef } from '@angular/core';
import { Services, TraversingComponent } from '@plone/restapi-angular';
import { Target } from 'angular-traversal';
import { concatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'g-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent extends TraversingComponent {
    parentList: any[];
    context: any;

    constructor(
        public services: Services,
        private elementRef: ElementRef,
    ) {
        super(services);
    }

    onTraverse(target: Target) {
        this.context = target.context;
        this.parentList = [];
        if (!!target.context && !!target.context.parent && !!target.context.parent['@id']) {
            this.services.resource.get(target.context.parent['@id']).pipe(concatMap(resource => {
                return this.getParent(resource);
            })).subscribe(() => {
                this.parentList.reverse();
                const columnCount = !!this.context.items ? this.parentList.length + 1 : this.parentList.length;
                this.elementRef.nativeElement.style.setProperty('--colNum', `${columnCount}`);
            });
        }
    }

    private getParent(resource): Observable<any> {
        this.parentList.push(resource);
        if (!!resource.parent && !!resource.parent['@id']) {
            return this.services.resource.get(resource.parent['@id']).pipe(concatMap(parent => this.getParent(parent)));
        } else {
            return Observable.of(null);
        }
    }
}
