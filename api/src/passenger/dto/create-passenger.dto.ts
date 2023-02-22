import { IsString, IsLatitude, IsLongitude, IsNumber, Max, Min  } from "class-validator";

export class CreatePassengerDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsNumber()
    @Max(5)
    @Min(1)
    rating: number;

    @IsLatitude()
    latitude: string;

    @IsLongitude()
    longitude: string;
}
