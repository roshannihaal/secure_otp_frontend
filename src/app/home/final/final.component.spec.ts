import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalComponent } from './final.component';

describe('FinalComponent', () => {
    let component: FinalComponent;
    let fixture: ComponentFixture<FinalComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FinalComponent],
        });
        fixture = TestBed.createComponent(FinalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
