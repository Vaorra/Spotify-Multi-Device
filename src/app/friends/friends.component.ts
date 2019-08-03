import { Component } from "@angular/core";
import { prompt } from "tns-core-modules/ui/dialogs";

@Component({
    selector: "ns-friends",
    moduleId: module.id,
    templateUrl: "friends.component.html",
    styleUrls: ["friends.component.css"]
})
export class FriendComponent {
    friends = ["Beat", "Michi", "Michu", "Samuel", "Quentin", "Kostya", "Pascal", "Nicolas", "Matteo", "Felix"];
}
