/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    users: User;
    tenants: Tenant;
    tenantMetadata: TenantMetadatum;
    'default-templates': DefaultTemplate;
    templates: Template;
    subscriptions: Subscription;
    subscribers: Subscriber;
    'subscriber-channels': SubscriberChannel;
    services: Service;
    publishers: Publisher;
    'notification-batches': NotificationBatch;
    notifications: Notification;
    events: Event;
    'event-types': EventType;
    'event-tags': EventTag;
    channels: Channel;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {
    subscribers: {
      subscriberChannels: 'subscriber-channels';
      subscriptions: 'subscriptions';
    };
    publishers: {
      subscriptions: 'subscriptions';
    };
  };
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    tenants: TenantsSelect<false> | TenantsSelect<true>;
    tenantMetadata: TenantMetadataSelect<false> | TenantMetadataSelect<true>;
    'default-templates': DefaultTemplatesSelect<false> | DefaultTemplatesSelect<true>;
    templates: TemplatesSelect<false> | TemplatesSelect<true>;
    subscriptions: SubscriptionsSelect<false> | SubscriptionsSelect<true>;
    subscribers: SubscribersSelect<false> | SubscribersSelect<true>;
    'subscriber-channels': SubscriberChannelsSelect<false> | SubscriberChannelsSelect<true>;
    services: ServicesSelect<false> | ServicesSelect<true>;
    publishers: PublishersSelect<false> | PublishersSelect<true>;
    'notification-batches': NotificationBatchesSelect<false> | NotificationBatchesSelect<true>;
    notifications: NotificationsSelect<false> | NotificationsSelect<true>;
    events: EventsSelect<false> | EventsSelect<true>;
    'event-types': EventTypesSelect<false> | EventTypesSelect<true>;
    'event-tags': EventTagsSelect<false> | EventTagsSelect<true>;
    channels: ChannelsSelect<false> | ChannelsSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {};
  globalsSelect: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  name?: string | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tenants".
 */
export interface Tenant {
  id: string;
  name: string;
  slug?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tenantMetadata".
 */
export interface TenantMetadatum {
  id: string;
  name?: string | null;
  tenant: string | Tenant;
  /**
   * @minItems 2
   * @maxItems 2
   */
  location: [number, number];
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "default-templates".
 */
export interface DefaultTemplate {
  id: string;
  name?: string | null;
  data:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  channel: string | Channel;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "channels".
 */
export interface Channel {
  id: string;
  name?: string | null;
  provider: string;
  recipientType: string;
  recipientTypeLabel: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "templates".
 */
export interface Template {
  id: string;
  name: string;
  data:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  channel: string | Channel;
  publisher: string | Publisher;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "publishers".
 */
export interface Publisher {
  id: string;
  name?: string | null;
  service: string | Service;
  tenant: string | Tenant;
  'supported-event-tags'?: (string | EventTag)[] | null;
  'supported-event-types'?: (string | EventType)[] | null;
  subscriptions?: {
    docs?: (string | Subscription)[] | null;
    hasNextPage?: boolean | null;
  } | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "services".
 */
export interface Service {
  id: string;
  name: string;
  slug: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "event-tags".
 */
export interface EventTag {
  id: string;
  name: string;
  service?: (string | null) | Service;
  'event-type': string | EventType;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "event-types".
 */
export interface EventType {
  id: string;
  name: string;
  slug: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "subscriptions".
 */
export interface Subscription {
  id: string;
  publisher: string | Publisher;
  subscriber: string | Subscriber;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "subscribers".
 */
export interface Subscriber {
  id: string;
  name?: string | null;
  tenant: string | Tenant;
  user: string | User;
  subscriberChannels?: {
    docs?: (string | SubscriberChannel)[] | null;
    hasNextPage?: boolean | null;
  } | null;
  subscriptions?: {
    docs?: (string | Subscription)[] | null;
    hasNextPage?: boolean | null;
  } | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "subscriber-channels".
 */
export interface SubscriberChannel {
  id: string;
  subscriber: string | Subscriber;
  channel: string | Channel;
  recipient: string;
  enabled?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "notification-batches".
 */
export interface NotificationBatch {
  id: string;
  notifications?: (string | Notification)[] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "notifications".
 */
export interface Notification {
  id: string;
  event: string | Event;
  subscription: string | Subscription;
  'subscriber-channel': string | SubscriberChannel;
  body?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  response?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "events".
 */
export interface Event {
  id: string;
  publisher: string | Publisher;
  type: string | EventType;
  tag: string | EventTag;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'users';
        value: string | User;
      } | null)
    | ({
        relationTo: 'tenants';
        value: string | Tenant;
      } | null)
    | ({
        relationTo: 'tenantMetadata';
        value: string | TenantMetadatum;
      } | null)
    | ({
        relationTo: 'default-templates';
        value: string | DefaultTemplate;
      } | null)
    | ({
        relationTo: 'templates';
        value: string | Template;
      } | null)
    | ({
        relationTo: 'subscriptions';
        value: string | Subscription;
      } | null)
    | ({
        relationTo: 'subscribers';
        value: string | Subscriber;
      } | null)
    | ({
        relationTo: 'subscriber-channels';
        value: string | SubscriberChannel;
      } | null)
    | ({
        relationTo: 'services';
        value: string | Service;
      } | null)
    | ({
        relationTo: 'publishers';
        value: string | Publisher;
      } | null)
    | ({
        relationTo: 'notification-batches';
        value: string | NotificationBatch;
      } | null)
    | ({
        relationTo: 'notifications';
        value: string | Notification;
      } | null)
    | ({
        relationTo: 'events';
        value: string | Event;
      } | null)
    | ({
        relationTo: 'event-types';
        value: string | EventType;
      } | null)
    | ({
        relationTo: 'event-tags';
        value: string | EventTag;
      } | null)
    | ({
        relationTo: 'channels';
        value: string | Channel;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  name?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tenants_select".
 */
export interface TenantsSelect<T extends boolean = true> {
  name?: T;
  slug?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tenantMetadata_select".
 */
export interface TenantMetadataSelect<T extends boolean = true> {
  name?: T;
  tenant?: T;
  location?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "default-templates_select".
 */
export interface DefaultTemplatesSelect<T extends boolean = true> {
  name?: T;
  data?: T;
  channel?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "templates_select".
 */
export interface TemplatesSelect<T extends boolean = true> {
  name?: T;
  data?: T;
  channel?: T;
  publisher?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "subscriptions_select".
 */
export interface SubscriptionsSelect<T extends boolean = true> {
  publisher?: T;
  subscriber?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "subscribers_select".
 */
export interface SubscribersSelect<T extends boolean = true> {
  name?: T;
  tenant?: T;
  user?: T;
  subscriberChannels?: T;
  subscriptions?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "subscriber-channels_select".
 */
export interface SubscriberChannelsSelect<T extends boolean = true> {
  subscriber?: T;
  channel?: T;
  recipient?: T;
  enabled?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "services_select".
 */
export interface ServicesSelect<T extends boolean = true> {
  name?: T;
  slug?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "publishers_select".
 */
export interface PublishersSelect<T extends boolean = true> {
  name?: T;
  service?: T;
  tenant?: T;
  'supported-event-tags'?: T;
  'supported-event-types'?: T;
  subscriptions?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "notification-batches_select".
 */
export interface NotificationBatchesSelect<T extends boolean = true> {
  notifications?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "notifications_select".
 */
export interface NotificationsSelect<T extends boolean = true> {
  event?: T;
  subscription?: T;
  'subscriber-channel'?: T;
  body?: T;
  response?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "events_select".
 */
export interface EventsSelect<T extends boolean = true> {
  publisher?: T;
  type?: T;
  tag?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "event-types_select".
 */
export interface EventTypesSelect<T extends boolean = true> {
  name?: T;
  slug?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "event-tags_select".
 */
export interface EventTagsSelect<T extends boolean = true> {
  name?: T;
  service?: T;
  'event-type'?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "channels_select".
 */
export interface ChannelsSelect<T extends boolean = true> {
  name?: T;
  provider?: T;
  recipientType?: T;
  recipientTypeLabel?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}