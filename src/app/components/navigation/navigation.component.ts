import { Component, ElementRef } from '@angular/core';
import { Services, TraversingComponent } from '@plone/restapi-angular';
import { Target } from 'angular-traversal';
import { concatMap } from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Component({
    selector: 'g-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent extends TraversingComponent {
    parentList: any[];
    context: any;
    contextPath: string;
    contextChildren: any[];
    isApplication = false;

    constructor(
        public services: Services,
        private elementRef: ElementRef,
    ) {
        super(services);
    }

    onTraverse(target: Target) {
        this.context = target.context;
        this.parentList = [];
        if (!!target.context) {
            this.contextPath = target.contextPath;
            this.isApplication = this.context['@type'] === 'Application';
            const parentPath = this.getParentPath(target.context);
            if (parentPath) {
                this.services.resource.get(parentPath).pipe(concatMap(parent => {
                    return this.loadParent(parent, parentPath, target.context);
                })).subscribe(() => {
                    this.parentList.reverse();
                    const columnCount = !!this.context.items ? this.parentList.length + 1 : this.parentList.length;
                    this.elementRef.nativeElement.style.setProperty('--colNum', `${columnCount}`);
                    this.scrollRight();
                });
            }

            this.contextChildren = null;
            let children = [];
            if (this.context['@type'] === 'Application') {
                children = this.context.databases
                .map(db => ({path: '/' + db, title: db}));
            } else if (this.context['@type'] === 'Database') {
                children = this.context.containers
                .map(container => ({path: this.contextPath + '/' + container, title: container}));
            } else if (!!this.context.items) {
                children = this.context.items
                .map(item => ({path: item['@id'], title: item['@name']}));
            }
            children.sort(this.sortAlphabetically);
            this.contextChildren = children;
        }
    }

    private sortAlphabetically(a: {title: string}, b: {title: string}): number {
        return a.title < b.title ? -1 : 1;
    }

    private loadParent(resource, currentPath, child): Observable<any> {
        this.parentList.push({
            resource: child,
            parentPath: currentPath,
            children: this.getChildren(resource, currentPath),
        });
        const parentPath = this.getParentPath(resource);
        if (parentPath) {
            return this.services.resource.get(parentPath).pipe(
                concatMap(parent => this.loadParent(parent, parentPath, resource))
            );
        } else {
            return of(null);
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
        let children: {path: string, title: string}[];
        if (resource.items) {
            children = resource.items.map(item => ({path: item['@id'], title: item['@name']}));
        } else if (resource.containers) {
            children = resource.containers.map(item => ({path: `${currentPath}/${item}`, title: item}));
        }
        children.sort(this.sortAlphabetically);
        return children;
    }

    private scrollRight() {
        setTimeout(() => {
            const maxScroll = this.elementRef.nativeElement.scrollWidth;
            this.elementRef.nativeElement.scrollTo({ left: maxScroll, top: 0, behavior: 'smooth' });
        }, 0);
    }
}
