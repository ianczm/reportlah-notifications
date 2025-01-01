import { CourierClient } from "@trycourier/courier";

export const courier = new CourierClient({
  authorizationToken: process.env.COURIER_AUTH_TOKEN,
});
