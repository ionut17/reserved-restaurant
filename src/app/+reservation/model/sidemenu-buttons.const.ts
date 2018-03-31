import { SidemenuButton } from "../../shared/sidemenu";
import { ReservationStatus } from "../../shared/model";

export const sidemenuButtons : SidemenuButton[] = [{
	label: "Ocupa",
	icon: "check-circle",
	important: true,
	clickCallback: (function() {
		if (this.hasSelected()){
			this.updateStatus(this.selectedItem, ReservationStatus.Fulfilled);
		};
		this.sidemenuService.hideMenu();
    })
},{
	label: "Absent",
	icon: "ban",
	clickCallback: (function() {
		this.sidemenuService.hideMenu();
    })
},{
	label: "Sterge",
	icon: "times-circle",
	clickCallback: (function() {
		this.sidemenuService.hideMenu();
    })
}];