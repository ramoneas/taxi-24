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

export function getRandomPrice(): number {
  const max_val = 1000
  const min_val = 100
  return Math.floor(Math.random() * (max_val - min_val + 1)) + min_val;
}
