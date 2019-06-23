import { Component, ElementRef } from '@angular/core';
import { Services, TraversingComponent } from '@plone/restapi-angular';
import { Target } from 'angular-traversal';
import { buildContext, Context, Database, IContext } from './navigation.models';

@Component({
    selector: 'g-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent extends TraversingComponent {
    parentList: string[];
    context: Context;
    contextPath: string;

    constructor(
        public services: Services,
        private elementRef: ElementRef,
    ) {
        super(services);
    }

    onTraverse(target: Target) {
        this.context = buildContext(<IContext>target.context);
        this.parentList = [];
        if (!!this.context) {
            this.contextPath = target.contextPath || '/';
            this.parentList = this.getParentList();
            this.elementRef.nativeElement.style.setProperty('--colNum', `${this.parentList.length}`);
        }
    }

    private getParentList(): string[] {
        if (!this.context) {
            return [];
        }
        let parentList: string[] = [];
        if (!!this.context['@id']) {
            const resourcePath = this.services.api.getPath(this.context['@id']);
            const parentPaths = resourcePath.split('/');
            if (!this.context.is_folderish) {
                parentPaths.pop();
            }
            parentList = parentPaths.reduce((all, current) => {
                const previous = all.length === 0 ? '' : all[all.length - 1];
                all.push(previous + current + '/');
                return all;
            }, []);
        } else {
            parentList = ['/'];
            if (this.context instanceof Database) {
                parentList.push(this.contextPath);
            }
        }
        return parentList;
    }

    private scrollRight() {
        setTimeout(() => {
            const maxScroll = this.elementRef.nativeElement.scrollWidth;
            this.elementRef.nativeElement.scrollTo({ left: maxScroll, top: 0, behavior: 'smooth' });
        }, 0);
    }
}
