import {Component, OnInit} from '@angular/core';
import {of, switchMap} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'angular-dashboard';
    isTest = false;
    text = of('Hello guys, Welcome To');
    case1 = this.text.pipe(switchMap((value, index,) => of(value + ' ' + index + ' JavaTpoint!')));

    // @ViewChild('myTest', {static: true}) myTest: ElementRef;
    ngOnInit() {
        this.case1.subscribe((value: any) => {
            console.log(value);
        });
        // console.log(this.myTest.nativeElement.value);
    }
}