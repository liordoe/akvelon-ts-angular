import {
    Component,
    ElementRef,
    Input,
    OnInit,
    OnDestroy
} from '@angular/core';
import * as $ from 'jquery';

import {
    ModalService
} from '../../services/modals/modal.service';

@Component({
    moduleId: module.id.toString(),
    selector: 'modal',
    template: '<ng-content></ng-content>'
})

export class ModalComponent implements OnInit, OnDestroy {
    @Input() id: string;
    private element: JQuery;

    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = $(el.nativeElement);
    }

    ngOnInit(): void {
        let modal = this;

        if (!this.id) {
            console.error('modal must have an id');
            return;
        }
        this.element.appendTo('body');

        // close modal on background click
        this.element.on('click', function (e: any) {
            var target = $(e.target);
            if (!target.closest('.modal-body').length) {
                modal.close();
            }
        });

        // add self
        this.modalService.add(this);
    }

    // remove self
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(): void {
        this.element.addClass('show-modal');
        $('body').addClass('modal-open');
    }

    // close modal
    close(): void {
        this.element.removeClass('show-modal');
        $('body').removeClass('modal-open');
    }
}