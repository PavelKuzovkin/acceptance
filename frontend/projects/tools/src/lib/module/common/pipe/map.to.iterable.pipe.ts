import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'mapToIterable'
})
export class MapToIterablePipe implements PipeTransform {
    transform(dict: object | null | undefined): any[] {
        const a = [];
        if (dict) {
            for (const key in dict) {
                if (dict.hasOwnProperty(key)) {
                    // @ts-ignore
                    a.push({key, val: dict[key]});
                }
            }
        }
        return a;
    }
}
