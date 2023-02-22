import Decimal from 'decimal.js';
import haversine from 's-haversine';

export const NEAREST_DISTANCE: number = 3;

export function getDistanceByCoordinates(coordinates: {
  driverLatitude: string;
  driverLongitude: string;
  latitude: string;
  longitude: string;
}) {
  const { driverLatitude, driverLongitude, latitude, longitude } = coordinates;

  return Number(
    new Decimal(
      haversine.distance(
        [Number(driverLatitude), Number(driverLongitude)],
        [Number(latitude), Number(longitude)],
      ),
    ).dividedBy(1000),
  );
}
