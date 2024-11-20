import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'button-send',
    templateUrl: './button-send.component.html',
    styleUrls: ['./button-send.component.scss'],
})
export class ButtonSendComponent {

    /**
     * Is this gallery attribute are set?
     */
    @Input()
    gallery = false;

    /**
     * Is this gallery attribute are set?
     */
    @Input()
    disabled = false;

    /**
     * Is this the principal call to action on the login-main?
     */
    @Input()
    primary = false;

    /**
     * What background color to use
     */
    @Input()
    backgroundColor?: string;

    /**
     * How large should the button be?
     */
    @Input()
    size: 'small' | 'medium' | 'large' = 'medium';

    /**
     * Button contents
     *
     * @required
     */
    @Input()
    label = 'שליחה';

    /**
     * Optional click handler
     */
    @Output()
    onClick = new EventEmitter<Event>();

    public get classes(): string[] {
        const mode = this.primary ? 'button-send--primary' : 'button-send--secondary';
        const galleryMode = this.gallery ? 'button-send--set-in' : 'button-send--set-out';
        const disabledMode = this.disabled ? 'button-send--disabled' : 'button-send--enabled';

        return ['button-send', `button-send--${this.size}`, mode, galleryMode, disabledMode];
    }


}
