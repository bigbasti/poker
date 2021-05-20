import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from "@angular/core";
import {AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {PokerTextService} from "../services/text.service";

@Component({
  selector: "poker-reactive-input-group",
  styles: [`
    .small-group {
      margin-bottom: 3px;
    }

    .small-group label {
      font-size: 15px;
      margin-bottom: 3px;
    }

    .form-control {
      background-color: #fff;
      /*border: 1px solid #b2b2b2;*/
      border-radius: 4px;
      color: #383838;
      display: block;
      font-size: 18px;
      line-height: 1.2;
      padding: 6px 11px 7px;
      width: 100%;
      transition: all 150ms cubic-bezier(.445, .05, .55, .95);
    }

    .form-control:hover {
      background-color: #ededed;
      transition-duration: .1s;
    }

    .form-control:focus {
      background-color: #fff;
      outline: 0;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(226, 0, 116, .6)
    }

    .form-control.disabled, .form-control.readonly, .form-control[disabled], .form-control[readonly] {
      background-color: #fff;
      border-color: #d6d6d6;
      color: #898989;
      cursor: not-allowed;
      resize: none;
    }

    .flat-view {
      margin-bottom: 0 !important;
    }

    .flat-view input {
      border: 0 !important;
      padding: 0 !important;
      height: auto;
    }

    .element-invisible {
      position: absolute !important;
      height: 1px;
      width: 1px;
      overflow: hidden;
      clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
      clip: rect(1px, 1px, 1px, 1px);
    }
  `],
  template: `
    <div class="form-group {{class}}">
      <label *ngIf="showLabel" [class.mandatory]="hasRequiredField(control)" for="{{name}}" [attr.title]="title">{{label}}{{hasRequiredField(control)?"*":""}}
        <span class="element-invisible" *ngFor="let err of control.errors | objToKeysArray">{{textService.getErrorMessageForError(err, label, control.errors[err])}}<br/></span>
      </label>
      <input type="{{type?type:'text'}}" [class.is-invalid]="(control.invalid && control.dirty)" class="form-control {{inputClass}}" [id]="name" [name]="name"
             [(ngModel)]="value" placeholder="{{placeholder}}" [attr.aria-invalid]="(control.invalid && control.dirty)?true:false"
             [style]="inputCss"
             title="{{altLabel}}" (change)="valueHasChanged()" (blur)="elementBlured()" [disabled]="disabled">
      <div class="invalid-feedback" *ngIf="control.invalid && control.dirty && control.errors">
        <span *ngFor="let err of control.errors | objToKeysArray">{{textService.getErrorMessageForError(err, label, control.errors[err])}}<br/></span>
      </div>
    </div>
  `,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PokerReactiveInputGroupComponent), multi: true }]
})
export class PokerReactiveInputGroupComponent implements OnInit, ControlValueAccessor {
  @Input() class: string;
  @Input() inputClass: string;
  @Input() name: string;
  @Input() label: string;
  @Input() title: string;
  @Input() type: string;
  @Input() disabled: boolean;
  @Input() placeholder: string;
  @Input() altLabel: string;
  @Input() showLabel = true;
  @Input() inputCss?: string;

  @Input() control: FormControl;
  @Output() textchanged: EventEmitter<string> = new EventEmitter();
  @Output() blur = new EventEmitter();

  _text: string;

  constructor(
    public textService: PokerTextService
  ) {}

  /**
   * checks whether the wrapped control has a required validator attached to it.
   * if it does, certain visual effects will be added
   * @param abstractControl
   */
  hasRequiredField(abstractControl: AbstractControl): boolean {
    if (abstractControl.validator) {
      const validator = abstractControl.validator({}as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }
    if (abstractControl["controls"]) {
      for (const controlName in abstractControl["controls"]) {
        if (abstractControl["controls"][controlName]) {
          if (this.hasRequiredField(abstractControl["controls"][controlName])) {
            return true;
          }
        }
      }
    }
    return false;
  }

  get value(): string {
    return this._text;
  }
  set value(val: string) {
    this._text = val;
    this.textchanged.emit(val);
    this.propagateChange(this._text);
  }

  ngOnInit() {

  }

  valueHasChanged() {
    this.propagateChange(this._text);
  }
  elementBlured() {
    this.propagateChange(this._text);
    this.propagateTouched();
    this.blur.emit(null);
  }

  propagateChange = (_: any) => {};
  propagateTouched = () => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
      this.propagateChange(this._text);
    }
  }
}
