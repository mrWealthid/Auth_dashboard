import {FormControl} from "@angular/forms";

export class DateFormControl extends FormControl {
    override setValue(value: string, options: any) {
        //Edge Cases
        if (value.match(/[^0-9|\/]/gi)) {
            super.setValue(this.value, {...options, emitModelToViewChange: true});
            return;
        }
        if (value.length > 5) {
            super.setValue(this.value, {...options, emitModelToViewChange: true});
            return;
        }
        if (value.length === 2 && this.value.length === 3) {
            super.setValue(value, {...options, emitModelToViewChange: true});
            return;
        }
        if (value.length === 2) {
            super.setValue(value + "/", {...options, emitModelToViewChange: true});
            return;
        }
        if (value.length === 3) {
            if (value.endsWith('/')) {
                super.setValue(value.replace('/', ''), {...options, emitModelToViewChange: true});
            } else {
                super.setValue(this.value + "/", {...options, emitModelToViewChange: true});
            }
            return;
        }
        super.setValue(value, {...options, emitModelToViewChange: true});
    }
}