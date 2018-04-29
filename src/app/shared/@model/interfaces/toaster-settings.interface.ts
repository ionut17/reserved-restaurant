import { ToasterType } from "../enums/toaster-type.enum";

export interface ToasterSettings{
	message: string;
	icon?: string;
	duration?: number;
	type: ToasterType
}