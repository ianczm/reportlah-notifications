import { Channels } from "./Channels";
import { DefaultTemplates } from "./DefaultTemplates";
import { Events } from "./Events";
import { EventTags } from "./EventTags";
import { EventTypes } from "./EventTypes";
import { NotificationBatches } from "./NotificationBatches";
import { Notifications } from "./Notifications";
import { Publishers } from "./Publishers";
import { Services } from "./Services";
import { SubscriberChannels } from "./SubscriberChannels";
import { Subscribers } from "./Subscribers";
import { Subscriptions } from "./Subscriptions";
import { Templates } from "./Templates";
import { TenantMetadata } from "./TenantMetadata";
import { Tenants } from "./Tenants";
import { Users } from "./Users";

export const collections = [
  Users,
  Tenants,
  TenantMetadata,
  DefaultTemplates,
  Templates,
  Subscriptions,
  Subscribers,
  SubscriberChannels,
  Services,
  Publishers,
  NotificationBatches,
  Notifications,
  Events,
  EventTypes,
  EventTags,
  Channels,
];
