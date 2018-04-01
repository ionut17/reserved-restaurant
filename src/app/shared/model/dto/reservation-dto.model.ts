import { ReservationStatus } from "../reservation/reservation-status.enum";

export class ReservationDto {
    clientId: string;
    restaurantId: string;
    startTime: Date;
    endTime: Date;
    status: ReservationStatus;
    people: number;
    tables: string[];
}