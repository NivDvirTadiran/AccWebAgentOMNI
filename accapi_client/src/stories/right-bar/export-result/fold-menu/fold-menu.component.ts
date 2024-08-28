import {ChangeDetectionStrategy, Component, HostBinding, Input} from "@angular/core";
@Component({
  selector: "app-fold-menu",
  templateUrl: "./fold-menu.component.html",
  styleUrls: ["./fold-menu.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldMenuComponent {
  @HostBinding("style.display") display = "contents";

  @Input() property1: "left" | "right" = "right";
}
