import {Injectable} from "@angular/core";

/**
 * This service offers the ability to
 * - transform certain keys or special terms into user friendly text
 * - resolve route parts into sensible user strings
 * - get error messages for defined error keys
 * - generate error descriptions for failed http requests
 */
@Injectable()
export class PokerTextService {
    /**
     * contains the mapping of route name to user friendly name for each page
     * type {{route name -> readable name}}
     */
    pageTitles: {[id: string]: string; } = {};

    constructor(
    ) {
        this.pageTitles["home"] = "Home";

    }

    getTitleForRoutePart(part: string): string {
        const title = this.pageTitles[part];
        if (title) {
            return title;
        } else {
            return part;  // if unknown route part is provided use the route name
        }
    }

    /**
     * Holds the long texts for all the different validation errors which can occur.
     * Holds all messages. default and custom
     * @param msg the short key for an error message
     * @param fieldname name of the field if it should be included in the error text
     * @param error the object containing the additional error information (differs by the type of error)
     */
    getErrorMessageForError(msg: string, fieldname: string, error: any): string {
        const errorMessages: {[id: string]: string} = {};

        errorMessages["email"] = "Dies ist keine gültige E-Mailadresse!";
        errorMessages["required"] = "Das Feld " + fieldname + " muss gefüllt sein!";
        errorMessages["invalid"] = "Dieser Wert ist nicht zulässig für das Feld " + fieldname + "!";
        errorMessages["pattern"] = errorMessages["invalid"];
        errorMessages["passwordMismatch"] = "Die eingegebenen Passwörter stimmen nicht überein!";
        errorMessages["dateSpanInvalid"] = "Die Zeitspanne ist ungültig!";
        errorMessages["pastDate"] = "Das Datum darf nicht in der Vergangenheit liegen!";
        errorMessages["exceededMaxRegexMatches"] = "Das Feld entspricht nicht dem geforderten Format!";

        if (msg === "duplicate") {
            if (error.duplicateField) {
                return fieldname + " wird bereits " + error.duplicateField + " genutzt!";
            } else {
                return fieldname + " ist dem System bereits bekannt!";
            }
        }
        if (msg === "maxlength") {
            return fieldname + " darf maximal " + error.requiredLength + " Zeichen lang sein!";
        }
        if (msg === "max") {
            return fieldname + " darf nicht größer als " + error.max + " (" + (error.max+"").length + " Stellen) sein!";
        }
        if (msg === "min") {
            return fieldname + " muss größer als " + error.max + " sein!";
        }
        if (msg === "minlength") {
            return fieldname + " muss mindestens " + error.requiredLength + " Zeichen lang sein!";
        }
        if (msg === "invalidLength") {
            return fieldname + " muss genau " + error.requiredLength + " Zeichen lang sein!";
        }
        if (msg === "invalidStart") {
            return fieldname + " muss mit " + error.mustStartWith + " beginnen!";
        }
        if (msg === "invalidFormat") {
            return fieldname + " " + error.correctFormat + "!";
        }
        if (msg === "invalidContent") {
            return fieldname + " " + error.forbiddenStrings + "!";
        }
        if (msg === "requiredDateAfterError") {
            return fieldname + " muss nach " + error.comparedField + " liegen!";
        }
        if (msg === "invalidFileType") {
            return "Es sind nur folgende Dateitypen erlaubt: " + error.allowedFileTypes.join() + "!";
        }

        return errorMessages[msg];
    }

    /**
     * this method generates a HTML error description for a failed server side validation by listing
     * all invalid fields with a description of what went wrong
     * @param errors the errors array from the http response
     */
    getErrorDescriptionForBadRequest(errors: any[]) {
        const errorMessages: {[id: string]: string} = {};
        errorMessages["NotEmpty"] = "Das Feld darf nicht leer sein!";
        errorMessages["Length"] = "Das Feld hat eine ungültige Länge!";
        errorMessages["Pattern"] = "Der Inhalt des Feldes ist nicht gültig!";

        let htmlErrorMessage = "<strong>Die folgenden Felder haben einen ungültigen Wert, bitte korrigieren Sie diese Felder und versuchen Sie es erneut.</strong><ul>";
        if (!errors) {
            // some other error happened e.g server could not parse the request properly
            return "<li>Es ist ein Problem bei der Verarbeitung der Daten aufgetreten, bitte überprüfen SIe Ihre Eingaben!</li>";
        }
        errors.forEach(err => {
            const errField = err.field;
            const errMessage = err.code;
            htmlErrorMessage += "<li><strong>" + errField + ":</strong> " + errorMessages[errMessage] + "</li>";
        });
        htmlErrorMessage += "</ul>";
        return htmlErrorMessage;
    }
}
