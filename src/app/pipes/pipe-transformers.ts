import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Pipe(
    {name: 'dateFormat'}
)
export class PipeTransformers implements PipeTransform {

    constructor(private translateService: TranslateService) {
        this.translateService.use('fr');
    }

    transform(value: any, pattern: any): any {
        const datePipe: DatePipe = new DatePipe(this.translateService.currentLang);
        return datePipe.transform(value, pattern);
    }
}