import { Component } from '@angular/core';
import { TraversingComponent, Services } from '@plone/restapi-angular';

@Component({
    selector: 'g-behaviors-view',
    templateUrl: './behaviors.html',
    styleUrls: ['./behaviors.scss'],
})
export class BehaviorsView extends TraversingComponent {
    availableBehaviors: string[];
    behaviors: string[];

    constructor(services: Services) {
        super(services);
    }

    onTraverse(target: any) {
        this.services.resource.availableBehaviors(target.contextPath).subscribe(behaviors => {
            if (behaviors.length > 0) {
                behaviors.sort();
                this.availableBehaviors = behaviors;
            }
        });
        this.services.resource.getBehaviors(target.contextPath).subscribe(behaviors => {
            if (behaviors.length > 0) {
                behaviors.sort();
                this.behaviors = behaviors;
            }
        });
    }

    add(behavior: string) {
        const path = this.context['@id'];
        this.services.resource.addBehavior(path, behavior)
        .subscribe(() => this.services.traverser.traverse(path + '/@@behaviors'));
    }

    delete(behavior: string) {
        if (confirm('Remove ' + behavior)) {
            const path = this.context['@id'];
            this.services.resource.deleteBehavior(path, behavior)
            .subscribe(() => this.services.traverser.traverse(path + '/@@behaviors'));
        }
    }
}
