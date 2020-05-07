import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
    transform(data: any) {
        return Object.keys(data).filter(e => !isNaN(+e)).map(
            o => {
                return {
                    index: +o, name: data[o]
                };
            });
    }
}
