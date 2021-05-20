import { Pipe, PipeTransform } from "@angular/core";
import {DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl} from "@angular/platform-browser";

/**
 * When you must output some HTML, CSS, Script or URL directly into the template,
 * angular will escape the value for you automatically (sanitize it) - if you don't want that
 * you can use this pipe to skip sanitation for your value by providing the type of value you are processing
 * Example #1: <span>{{someModelProperty | noSanitize: 'html'}}</span>
 * Example #2: <span style="{{someModelProperty | noSanitize: 'style'}}"></span>
 * Example #3: <a href="{{someModelProperty | noSanitize: 'url'}}"></a>
 * NOTE: use with caution as this bypasses angular's internal security measures!
 */
@Pipe({ name: "noSanitize" })
export class NoSanitizePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {

  }

  public transform(value: string, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case "html":
        return this.domSanitizer.bypassSecurityTrustHtml(value);
      case "style":
        return this.domSanitizer.bypassSecurityTrustStyle(value);
      case "script":
        return this.domSanitizer.bypassSecurityTrustScript(value);
      case "url":
        return this.domSanitizer.bypassSecurityTrustUrl(value);
      case "resourceUrl":
        return this.domSanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        throw new Error(`Unable to bypass security for invalid type: ${type}`);
    }
  }
}
