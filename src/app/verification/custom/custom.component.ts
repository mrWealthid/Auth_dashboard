import {Component, OnInit} from '@angular/core';
import {ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, UntypedFormBuilder} from "@angular/forms";

@Component({
    selector: 'app-custom',
    templateUrl: './custom.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: CustomComponent,
        },
    ],
})
export class CustomComponent implements OnInit, ControlValueAccessor {
    customForm: FormGroup;

    constructor(private fb: UntypedFormBuilder) {
    }

    onTouched = () => {
    };

    ngOnInit(): void {
        this.customForm = this.fb.group({
            techniques: [''],
            softSkills: [''],
            hardSkills: ['']
        });
    }

    writeValue(value: any): void {
        if (value) {
            this.customForm.setValue(value);
        }
    }

    registerOnChange(onChange: any): void {
        this.customForm.valueChanges.subscribe(onChange);
    }

    registerOnTouched(onTouched: any): void {
        this.onTouched = onTouched;
    }
}