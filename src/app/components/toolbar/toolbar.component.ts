import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Services } from '@plone/restapi-angular';
import { Toaster } from 'pastanaga-angular';
import { Subscription } from 'rxjs';

@Component({
    selector: 'g-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnChanges, OnDestroy {
    @Input() context: any;
    @Input() parentPath: string;
    @Input() canAdd = true;

    canPaste = false;
    sourceToCopy: string;
    subscription: Subscription;

    constructor(
        private services: Services,
        private toaster: Toaster,
    ) {}

    ngOnInit() {
        this.subscription = this.services.resource.copySource.subscribe(sourceToCopy => {
            this.sourceToCopy = sourceToCopy;
            this.updateCanPaste();
        });
    }

    ngOnChanges(changes) {
        if (changes.context && changes.context.currentValue) {
            this.updateCanPaste();
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    updateCanPaste() {
        this.canPaste = !!this.sourceToCopy && !!this.parentPath;
    }

    copy() {
        this.services.resource.copySource.next(this.context['@id']);
        this.toaster.open(`${this.context.title} copied`);
    }

    paste() {
        if (this.sourceToCopy) {
            this.services.resource.duplicate(this.sourceToCopy, this.parentPath).subscribe(data => {
                this.services.resource.copySource.next(null);
            }, error => {
                let message = error.message;
                if (!!error.details) {
                    message += `: ${error.details}`;
                }
                this.toaster.open(message, 'Dismiss', 0);
            });
        }
    }

    delete() {
        if (confirm('Delete ' + this.context.title)) {
            const parent = this.context.parent['@id'] || '/';
            this.services.resource.delete(this.context['@id']).subscribe(() => {
                this.services.traverser.traverse(parent);
            });
        }
    }
}
