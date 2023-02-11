import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PasswordStrengthPluginComponent} from "./password-strength-plugin.component";

describe('PasswordStrengthPluginComponent', () => {
    let component: PasswordStrengthPluginComponent;
    let fixture: ComponentFixture<PasswordStrengthPluginComponent>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PasswordStrengthPluginComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(PasswordStrengthPluginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});