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
        if (!!target.context && !!target.context['@id']) {
            const parentPath = this.getParentPath(target.context);
            if (parentPath) {
                this.services.resource.get(parentPath).pipe(concatMap(resource => {
                    return this.loadParent(resource, parentPath);
                })).subscribe(() => {
                    this.parentList.reverse();
                    const columnCount = !!this.context.items ? this.parentList.length + 1 : this.parentList.length;
                    this.elementRef.nativeElement.style.setProperty('--colNum', `${columnCount}`);
                });
            }
        }
    }

    private loadParent(resource, currentPath): Observable<any> {
        this.parentList.push({children: this.getChildren(resource, currentPath), path: currentPath});
        const parentPath = this.getParentPath(resource);
        if (parentPath) {
            return this.services.resource.get(parentPath).pipe(
                concatMap(parent => this.loadParent(parent, parentPath))
            );
        } else {
            return Observable.of(null);
        }
    }

    private getParentPath(resource) {
        let parentPath = resource.parent && resource.parent['@id'];
        if (!parentPath && resource['@id']) {
            parentPath = resource['@id'].split('/').slice(0, -1).join('/');
        }
        return parentPath;
    }

    private getChildren(resource, currentPath): {path: string, title: string}[] {
        if (resource.items) {
            return resource.items.map(item => ({path: item['@id'], title: item['@name']}));
        } else if (resource.containers) {
            return resource.containers.map(item => ({path: `${currentPath}/${item}`, title: item}));
        }
    }
}
