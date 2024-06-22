import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-accordion',
    template: `
        <div ngbAccordion>
            <div *ngFor="let item of items" ngbAccordionItem>
                <h3 ngbAccordionHeader>
                    <button ngbAccordionButton>{{ item.title }}</button>
                </h3>
                <div ngbAccordionCollapse>
                    <div ngbAccordionBody>
                        {{ item.content }}
                    </div>
                </div>
            </div>
        </div>
    `,
})
export class AccordionComponent implements OnInit {
    @Input() items: { title: string; content: string }[] = [];

    constructor() {}

    ngOnInit(): void {}
}
