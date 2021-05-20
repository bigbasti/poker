import { Pipe, PipeTransform } from "@angular/core";

/**
 * this pipe will create an iterable array from an object input.
 * This is handy when you need to iterate over an object's properties inside a template
 * Example: <span *ngFor="let errKey of control.errors | objToKeysArray">{{textService.getErrorMessageForError(errKey)}}<br/></span>
 */
@Pipe({
  name: "objToKeysArray"
})
export class ObjToKeysArrayPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value) {
      return value;
    }
    return Object.keys(value);
  }
}
