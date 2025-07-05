
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Medication
 * 
 */
export type Medication = $Result.DefaultSelection<Prisma.$MedicationPayload>
/**
 * Model Admission_Discharge
 * 
 */
export type Admission_Discharge = $Result.DefaultSelection<Prisma.$Admission_DischargePayload>
/**
 * Model OT
 * 
 */
export type OT = $Result.DefaultSelection<Prisma.$OTPayload>
/**
 * Model Appointment
 * 
 */
export type Appointment = $Result.DefaultSelection<Prisma.$AppointmentPayload>
/**
 * Model Consultation
 * 
 */
export type Consultation = $Result.DefaultSelection<Prisma.$ConsultationPayload>
/**
 * Model Registration
 * 
 */
export type Registration = $Result.DefaultSelection<Prisma.$RegistrationPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Admission_Discharges
 * const admission_Discharges = await prisma.admission_Discharge.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Admission_Discharges
   * const admission_Discharges = await prisma.admission_Discharge.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.admission_Discharge`: Exposes CRUD operations for the **Admission_Discharge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admission_Discharges
    * const admission_Discharges = await prisma.admission_Discharge.findMany()
    * ```
    */
  get admission_Discharge(): Prisma.Admission_DischargeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oT`: Exposes CRUD operations for the **OT** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OTS
    * const oTS = await prisma.oT.findMany()
    * ```
    */
  get oT(): Prisma.OTDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appointment`: Exposes CRUD operations for the **Appointment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Appointments
    * const appointments = await prisma.appointment.findMany()
    * ```
    */
  get appointment(): Prisma.AppointmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.consultation`: Exposes CRUD operations for the **Consultation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Consultations
    * const consultations = await prisma.consultation.findMany()
    * ```
    */
  get consultation(): Prisma.ConsultationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.registration`: Exposes CRUD operations for the **Registration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Registrations
    * const registrations = await prisma.registration.findMany()
    * ```
    */
  get registration(): Prisma.RegistrationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.9.0
   * Query Engine version: 81e4af48011447c3cc503a190e86995b66d2a28e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Admission_Discharge: 'Admission_Discharge',
    OT: 'OT',
    Appointment: 'Appointment',
    Consultation: 'Consultation',
    Registration: 'Registration',
    User: 'User',
    Account: 'Account',
    Session: 'Session',
    VerificationToken: 'VerificationToken'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "admission_Discharge" | "oT" | "appointment" | "consultation" | "registration" | "user" | "account" | "session" | "verificationToken"
      txIsolationLevel: never
    }
    model: {
      Admission_Discharge: {
        payload: Prisma.$Admission_DischargePayload<ExtArgs>
        fields: Prisma.Admission_DischargeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Admission_DischargeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Admission_DischargePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Admission_DischargeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Admission_DischargePayload>
          }
          findFirst: {
            args: Prisma.Admission_DischargeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Admission_DischargePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Admission_DischargeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Admission_DischargePayload>
          }
          findMany: {
            args: Prisma.Admission_DischargeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Admission_DischargePayload>[]
          }
          create: {
            args: Prisma.Admission_DischargeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Admission_DischargePayload>
          }
          createMany: {
            args: Prisma.Admission_DischargeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.Admission_DischargeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Admission_DischargePayload>
          }
          update: {
            args: Prisma.Admission_DischargeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Admission_DischargePayload>
          }
          deleteMany: {
            args: Prisma.Admission_DischargeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Admission_DischargeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.Admission_DischargeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Admission_DischargePayload>
          }
          aggregate: {
            args: Prisma.Admission_DischargeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmission_Discharge>
          }
          groupBy: {
            args: Prisma.Admission_DischargeGroupByArgs<ExtArgs>
            result: $Utils.Optional<Admission_DischargeGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.Admission_DischargeFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.Admission_DischargeAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.Admission_DischargeCountArgs<ExtArgs>
            result: $Utils.Optional<Admission_DischargeCountAggregateOutputType> | number
          }
        }
      }
      OT: {
        payload: Prisma.$OTPayload<ExtArgs>
        fields: Prisma.OTFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OTFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OTFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPayload>
          }
          findFirst: {
            args: Prisma.OTFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OTFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPayload>
          }
          findMany: {
            args: Prisma.OTFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPayload>[]
          }
          create: {
            args: Prisma.OTCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPayload>
          }
          createMany: {
            args: Prisma.OTCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OTDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPayload>
          }
          update: {
            args: Prisma.OTUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPayload>
          }
          deleteMany: {
            args: Prisma.OTDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OTUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OTUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPayload>
          }
          aggregate: {
            args: Prisma.OTAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOT>
          }
          groupBy: {
            args: Prisma.OTGroupByArgs<ExtArgs>
            result: $Utils.Optional<OTGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.OTFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.OTAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.OTCountArgs<ExtArgs>
            result: $Utils.Optional<OTCountAggregateOutputType> | number
          }
        }
      }
      Appointment: {
        payload: Prisma.$AppointmentPayload<ExtArgs>
        fields: Prisma.AppointmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppointmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppointmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findFirst: {
            args: Prisma.AppointmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppointmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findMany: {
            args: Prisma.AppointmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          create: {
            args: Prisma.AppointmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          createMany: {
            args: Prisma.AppointmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AppointmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          update: {
            args: Prisma.AppointmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          deleteMany: {
            args: Prisma.AppointmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppointmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AppointmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          aggregate: {
            args: Prisma.AppointmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppointment>
          }
          groupBy: {
            args: Prisma.AppointmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppointmentGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.AppointmentFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.AppointmentAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.AppointmentCountArgs<ExtArgs>
            result: $Utils.Optional<AppointmentCountAggregateOutputType> | number
          }
        }
      }
      Consultation: {
        payload: Prisma.$ConsultationPayload<ExtArgs>
        fields: Prisma.ConsultationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConsultationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConsultationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          findFirst: {
            args: Prisma.ConsultationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConsultationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          findMany: {
            args: Prisma.ConsultationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>[]
          }
          create: {
            args: Prisma.ConsultationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          createMany: {
            args: Prisma.ConsultationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ConsultationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          update: {
            args: Prisma.ConsultationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          deleteMany: {
            args: Prisma.ConsultationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConsultationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ConsultationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationPayload>
          }
          aggregate: {
            args: Prisma.ConsultationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConsultation>
          }
          groupBy: {
            args: Prisma.ConsultationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConsultationGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ConsultationFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ConsultationAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ConsultationCountArgs<ExtArgs>
            result: $Utils.Optional<ConsultationCountAggregateOutputType> | number
          }
        }
      }
      Registration: {
        payload: Prisma.$RegistrationPayload<ExtArgs>
        fields: Prisma.RegistrationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RegistrationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RegistrationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>
          }
          findFirst: {
            args: Prisma.RegistrationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RegistrationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>
          }
          findMany: {
            args: Prisma.RegistrationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>[]
          }
          create: {
            args: Prisma.RegistrationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>
          }
          createMany: {
            args: Prisma.RegistrationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RegistrationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>
          }
          update: {
            args: Prisma.RegistrationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>
          }
          deleteMany: {
            args: Prisma.RegistrationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RegistrationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RegistrationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>
          }
          aggregate: {
            args: Prisma.RegistrationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegistration>
          }
          groupBy: {
            args: Prisma.RegistrationGroupByArgs<ExtArgs>
            result: $Utils.Optional<RegistrationGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.RegistrationFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.RegistrationAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.RegistrationCountArgs<ExtArgs>
            result: $Utils.Optional<RegistrationCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.AccountFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.AccountAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.SessionFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.SessionAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.VerificationTokenFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.VerificationTokenAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    admission_Discharge?: Admission_DischargeOmit
    oT?: OTOmit
    appointment?: AppointmentOmit
    consultation?: ConsultationOmit
    registration?: RegistrationOmit
    user?: UserOmit
    account?: AccountOmit
    session?: SessionOmit
    verificationToken?: VerificationTokenOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type Admission_DischargeCountOutputType
   */

  export type Admission_DischargeCountOutputType = {
    ot: number
  }

  export type Admission_DischargeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ot?: boolean | Admission_DischargeCountOutputTypeCountOtArgs
  }

  // Custom InputTypes
  /**
   * Admission_DischargeCountOutputType without action
   */
  export type Admission_DischargeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admission_DischargeCountOutputType
     */
    select?: Admission_DischargeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Admission_DischargeCountOutputType without action
   */
  export type Admission_DischargeCountOutputTypeCountOtArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OTWhereInput
  }


  /**
   * Count Type RegistrationCountOutputType
   */

  export type RegistrationCountOutputType = {
    Consultation: number
    Appointment: number
    Admission_Discharge: number
    OT: number
  }

  export type RegistrationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Consultation?: boolean | RegistrationCountOutputTypeCountConsultationArgs
    Appointment?: boolean | RegistrationCountOutputTypeCountAppointmentArgs
    Admission_Discharge?: boolean | RegistrationCountOutputTypeCountAdmission_DischargeArgs
    OT?: boolean | RegistrationCountOutputTypeCountOTArgs
  }

  // Custom InputTypes
  /**
   * RegistrationCountOutputType without action
   */
  export type RegistrationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegistrationCountOutputType
     */
    select?: RegistrationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RegistrationCountOutputType without action
   */
  export type RegistrationCountOutputTypeCountConsultationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultationWhereInput
  }

  /**
   * RegistrationCountOutputType without action
   */
  export type RegistrationCountOutputTypeCountAppointmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * RegistrationCountOutputType without action
   */
  export type RegistrationCountOutputTypeCountAdmission_DischargeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Admission_DischargeWhereInput
  }

  /**
   * RegistrationCountOutputType without action
   */
  export type RegistrationCountOutputTypeCountOTArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OTWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    sessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Medication
   */





  export type MedicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    drug_name?: boolean
    drug_dose?: boolean
    amount?: boolean
    drug_form?: boolean
    frequency?: boolean
    duration?: boolean
    instructions?: boolean
    route?: boolean
    interval?: boolean
  }, ExtArgs["result"]["medication"]>



  export type MedicationSelectScalar = {
    drug_name?: boolean
    drug_dose?: boolean
    amount?: boolean
    drug_form?: boolean
    frequency?: boolean
    duration?: boolean
    instructions?: boolean
    route?: boolean
    interval?: boolean
  }

  export type MedicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"drug_name" | "drug_dose" | "amount" | "drug_form" | "frequency" | "duration" | "instructions" | "route" | "interval", ExtArgs["result"]["medication"]>

  export type $MedicationPayload = {
    name: "Medication"
    objects: {}
    scalars: {
      drug_name: string
      drug_dose: string
      amount: number
      drug_form: string | null
      frequency: string | null
      duration: number | null
      instructions: string | null
      route: string | null
      interval: string | null
    }
    composites: {}
  }

  type MedicationGetPayload<S extends boolean | null | undefined | MedicationDefaultArgs> = $Result.GetResult<Prisma.$MedicationPayload, S>





  /**
   * Fields of the Medication model
   */
  interface MedicationFieldRefs {
    readonly drug_name: FieldRef<"Medication", 'String'>
    readonly drug_dose: FieldRef<"Medication", 'String'>
    readonly amount: FieldRef<"Medication", 'Int'>
    readonly drug_form: FieldRef<"Medication", 'String'>
    readonly frequency: FieldRef<"Medication", 'String'>
    readonly duration: FieldRef<"Medication", 'Int'>
    readonly instructions: FieldRef<"Medication", 'String'>
    readonly route: FieldRef<"Medication", 'String'>
    readonly interval: FieldRef<"Medication", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Medication without action
   */
  export type MedicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medication
     */
    select?: MedicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medication
     */
    omit?: MedicationOmit<ExtArgs> | null
  }


  /**
   * Model Admission_Discharge
   */

  export type AggregateAdmission_Discharge = {
    _count: Admission_DischargeCountAggregateOutputType | null
    _avg: Admission_DischargeAvgAggregateOutputType | null
    _sum: Admission_DischargeSumAggregateOutputType | null
    _min: Admission_DischargeMinAggregateOutputType | null
    _max: Admission_DischargeMaxAggregateOutputType | null
  }

  export type Admission_DischargeAvgAggregateOutputType = {
    bed_number: number | null
  }

  export type Admission_DischargeSumAggregateOutputType = {
    bed_number: number | null
  }

  export type Admission_DischargeMinAggregateOutputType = {
    admission_id: string | null
    registration_id: string | null
    admission_date: Date | null
    admission_mode: string | null
    status: string | null
    discharge_date: Date | null
    discharge_mode: string | null
    admission_plan: string | null
    bed_number: number | null
    diagnosis: string | null
    diagnostic_procedures: string | null
    discharge_instructions: string | null
    discharge_summary: string | null
    hospital_investigations: string | null
    hospital_medications: string | null
    instructions: string | null
    medical_leave: string | null
    therapeutic_procedures: string | null
    ward: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Admission_DischargeMaxAggregateOutputType = {
    admission_id: string | null
    registration_id: string | null
    admission_date: Date | null
    admission_mode: string | null
    status: string | null
    discharge_date: Date | null
    discharge_mode: string | null
    admission_plan: string | null
    bed_number: number | null
    diagnosis: string | null
    diagnostic_procedures: string | null
    discharge_instructions: string | null
    discharge_summary: string | null
    hospital_investigations: string | null
    hospital_medications: string | null
    instructions: string | null
    medical_leave: string | null
    therapeutic_procedures: string | null
    ward: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Admission_DischargeCountAggregateOutputType = {
    admission_id: number
    registration_id: number
    admission_date: number
    admission_mode: number
    status: number
    discharge_date: number
    discharge_mode: number
    admission_plan: number
    bed_number: number
    diagnosis: number
    diagnostic_procedures: number
    discharge_instructions: number
    discharge_medications: number
    discharge_summary: number
    hospital_investigations: number
    hospital_medications: number
    instructions: number
    medical_leave: number
    therapeutic_procedures: number
    ward: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Admission_DischargeAvgAggregateInputType = {
    bed_number?: true
  }

  export type Admission_DischargeSumAggregateInputType = {
    bed_number?: true
  }

  export type Admission_DischargeMinAggregateInputType = {
    admission_id?: true
    registration_id?: true
    admission_date?: true
    admission_mode?: true
    status?: true
    discharge_date?: true
    discharge_mode?: true
    admission_plan?: true
    bed_number?: true
    diagnosis?: true
    diagnostic_procedures?: true
    discharge_instructions?: true
    discharge_summary?: true
    hospital_investigations?: true
    hospital_medications?: true
    instructions?: true
    medical_leave?: true
    therapeutic_procedures?: true
    ward?: true
    created_at?: true
    updated_at?: true
  }

  export type Admission_DischargeMaxAggregateInputType = {
    admission_id?: true
    registration_id?: true
    admission_date?: true
    admission_mode?: true
    status?: true
    discharge_date?: true
    discharge_mode?: true
    admission_plan?: true
    bed_number?: true
    diagnosis?: true
    diagnostic_procedures?: true
    discharge_instructions?: true
    discharge_summary?: true
    hospital_investigations?: true
    hospital_medications?: true
    instructions?: true
    medical_leave?: true
    therapeutic_procedures?: true
    ward?: true
    created_at?: true
    updated_at?: true
  }

  export type Admission_DischargeCountAggregateInputType = {
    admission_id?: true
    registration_id?: true
    admission_date?: true
    admission_mode?: true
    status?: true
    discharge_date?: true
    discharge_mode?: true
    admission_plan?: true
    bed_number?: true
    diagnosis?: true
    diagnostic_procedures?: true
    discharge_instructions?: true
    discharge_medications?: true
    discharge_summary?: true
    hospital_investigations?: true
    hospital_medications?: true
    instructions?: true
    medical_leave?: true
    therapeutic_procedures?: true
    ward?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Admission_DischargeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admission_Discharge to aggregate.
     */
    where?: Admission_DischargeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admission_Discharges to fetch.
     */
    orderBy?: Admission_DischargeOrderByWithRelationInput | Admission_DischargeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Admission_DischargeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admission_Discharges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admission_Discharges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admission_Discharges
    **/
    _count?: true | Admission_DischargeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Admission_DischargeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Admission_DischargeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Admission_DischargeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Admission_DischargeMaxAggregateInputType
  }

  export type GetAdmission_DischargeAggregateType<T extends Admission_DischargeAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmission_Discharge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmission_Discharge[P]>
      : GetScalarType<T[P], AggregateAdmission_Discharge[P]>
  }




  export type Admission_DischargeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Admission_DischargeWhereInput
    orderBy?: Admission_DischargeOrderByWithAggregationInput | Admission_DischargeOrderByWithAggregationInput[]
    by: Admission_DischargeScalarFieldEnum[] | Admission_DischargeScalarFieldEnum
    having?: Admission_DischargeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Admission_DischargeCountAggregateInputType | true
    _avg?: Admission_DischargeAvgAggregateInputType
    _sum?: Admission_DischargeSumAggregateInputType
    _min?: Admission_DischargeMinAggregateInputType
    _max?: Admission_DischargeMaxAggregateInputType
  }

  export type Admission_DischargeGroupByOutputType = {
    admission_id: string
    registration_id: string
    admission_date: Date | null
    admission_mode: string | null
    status: string
    discharge_date: Date | null
    discharge_mode: string | null
    admission_plan: string | null
    bed_number: number | null
    diagnosis: string | null
    diagnostic_procedures: string | null
    discharge_instructions: string | null
    discharge_medications: JsonValue | null
    discharge_summary: string | null
    hospital_investigations: string | null
    hospital_medications: string | null
    instructions: string | null
    medical_leave: string | null
    therapeutic_procedures: string | null
    ward: string | null
    created_at: Date
    updated_at: Date
    _count: Admission_DischargeCountAggregateOutputType | null
    _avg: Admission_DischargeAvgAggregateOutputType | null
    _sum: Admission_DischargeSumAggregateOutputType | null
    _min: Admission_DischargeMinAggregateOutputType | null
    _max: Admission_DischargeMaxAggregateOutputType | null
  }

  type GetAdmission_DischargeGroupByPayload<T extends Admission_DischargeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Admission_DischargeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Admission_DischargeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Admission_DischargeGroupByOutputType[P]>
            : GetScalarType<T[P], Admission_DischargeGroupByOutputType[P]>
        }
      >
    >


  export type Admission_DischargeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    admission_id?: boolean
    registration_id?: boolean
    admission_date?: boolean
    admission_mode?: boolean
    status?: boolean
    discharge_date?: boolean
    discharge_mode?: boolean
    admission_plan?: boolean
    bed_number?: boolean
    diagnosis?: boolean
    diagnostic_procedures?: boolean
    discharge_instructions?: boolean
    discharge_medications?: boolean
    discharge_summary?: boolean
    hospital_investigations?: boolean
    hospital_medications?: boolean
    instructions?: boolean
    medical_leave?: boolean
    therapeutic_procedures?: boolean
    ward?: boolean
    medications?: boolean | MedicationDefaultArgs<ExtArgs>
    created_at?: boolean
    updated_at?: boolean
    ot?: boolean | Admission_Discharge$otArgs<ExtArgs>
    registration?: boolean | RegistrationDefaultArgs<ExtArgs>
    _count?: boolean | Admission_DischargeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admission_Discharge"]>



  export type Admission_DischargeSelectScalar = {
    admission_id?: boolean
    registration_id?: boolean
    admission_date?: boolean
    admission_mode?: boolean
    status?: boolean
    discharge_date?: boolean
    discharge_mode?: boolean
    admission_plan?: boolean
    bed_number?: boolean
    diagnosis?: boolean
    diagnostic_procedures?: boolean
    discharge_instructions?: boolean
    discharge_medications?: boolean
    discharge_summary?: boolean
    hospital_investigations?: boolean
    hospital_medications?: boolean
    instructions?: boolean
    medical_leave?: boolean
    therapeutic_procedures?: boolean
    ward?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type Admission_DischargeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"admission_id" | "registration_id" | "admission_date" | "admission_mode" | "status" | "discharge_date" | "discharge_mode" | "admission_plan" | "bed_number" | "diagnosis" | "diagnostic_procedures" | "discharge_instructions" | "discharge_medications" | "discharge_summary" | "hospital_investigations" | "hospital_medications" | "instructions" | "medical_leave" | "therapeutic_procedures" | "ward" | "medications" | "created_at" | "updated_at", ExtArgs["result"]["admission_Discharge"]>
  export type Admission_DischargeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ot?: boolean | Admission_Discharge$otArgs<ExtArgs>
    registration?: boolean | RegistrationDefaultArgs<ExtArgs>
    _count?: boolean | Admission_DischargeCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $Admission_DischargePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admission_Discharge"
    objects: {
      ot: Prisma.$OTPayload<ExtArgs>[]
      registration: Prisma.$RegistrationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      admission_id: string
      registration_id: string
      admission_date: Date | null
      admission_mode: string | null
      status: string
      discharge_date: Date | null
      discharge_mode: string | null
      admission_plan: string | null
      bed_number: number | null
      diagnosis: string | null
      diagnostic_procedures: string | null
      discharge_instructions: string | null
      discharge_medications: Prisma.JsonValue | null
      discharge_summary: string | null
      hospital_investigations: string | null
      hospital_medications: string | null
      instructions: string | null
      medical_leave: string | null
      therapeutic_procedures: string | null
      ward: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["admission_Discharge"]>
    composites: {
      medications: Prisma.$MedicationPayload[]
    }
  }

  type Admission_DischargeGetPayload<S extends boolean | null | undefined | Admission_DischargeDefaultArgs> = $Result.GetResult<Prisma.$Admission_DischargePayload, S>

  type Admission_DischargeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<Admission_DischargeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Admission_DischargeCountAggregateInputType | true
    }

  export interface Admission_DischargeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admission_Discharge'], meta: { name: 'Admission_Discharge' } }
    /**
     * Find zero or one Admission_Discharge that matches the filter.
     * @param {Admission_DischargeFindUniqueArgs} args - Arguments to find a Admission_Discharge
     * @example
     * // Get one Admission_Discharge
     * const admission_Discharge = await prisma.admission_Discharge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Admission_DischargeFindUniqueArgs>(args: SelectSubset<T, Admission_DischargeFindUniqueArgs<ExtArgs>>): Prisma__Admission_DischargeClient<$Result.GetResult<Prisma.$Admission_DischargePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admission_Discharge that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {Admission_DischargeFindUniqueOrThrowArgs} args - Arguments to find a Admission_Discharge
     * @example
     * // Get one Admission_Discharge
     * const admission_Discharge = await prisma.admission_Discharge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Admission_DischargeFindUniqueOrThrowArgs>(args: SelectSubset<T, Admission_DischargeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Admission_DischargeClient<$Result.GetResult<Prisma.$Admission_DischargePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admission_Discharge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Admission_DischargeFindFirstArgs} args - Arguments to find a Admission_Discharge
     * @example
     * // Get one Admission_Discharge
     * const admission_Discharge = await prisma.admission_Discharge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Admission_DischargeFindFirstArgs>(args?: SelectSubset<T, Admission_DischargeFindFirstArgs<ExtArgs>>): Prisma__Admission_DischargeClient<$Result.GetResult<Prisma.$Admission_DischargePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admission_Discharge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Admission_DischargeFindFirstOrThrowArgs} args - Arguments to find a Admission_Discharge
     * @example
     * // Get one Admission_Discharge
     * const admission_Discharge = await prisma.admission_Discharge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Admission_DischargeFindFirstOrThrowArgs>(args?: SelectSubset<T, Admission_DischargeFindFirstOrThrowArgs<ExtArgs>>): Prisma__Admission_DischargeClient<$Result.GetResult<Prisma.$Admission_DischargePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admission_Discharges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Admission_DischargeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admission_Discharges
     * const admission_Discharges = await prisma.admission_Discharge.findMany()
     * 
     * // Get first 10 Admission_Discharges
     * const admission_Discharges = await prisma.admission_Discharge.findMany({ take: 10 })
     * 
     * // Only select the `admission_id`
     * const admission_DischargeWithAdmission_idOnly = await prisma.admission_Discharge.findMany({ select: { admission_id: true } })
     * 
     */
    findMany<T extends Admission_DischargeFindManyArgs>(args?: SelectSubset<T, Admission_DischargeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Admission_DischargePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admission_Discharge.
     * @param {Admission_DischargeCreateArgs} args - Arguments to create a Admission_Discharge.
     * @example
     * // Create one Admission_Discharge
     * const Admission_Discharge = await prisma.admission_Discharge.create({
     *   data: {
     *     // ... data to create a Admission_Discharge
     *   }
     * })
     * 
     */
    create<T extends Admission_DischargeCreateArgs>(args: SelectSubset<T, Admission_DischargeCreateArgs<ExtArgs>>): Prisma__Admission_DischargeClient<$Result.GetResult<Prisma.$Admission_DischargePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admission_Discharges.
     * @param {Admission_DischargeCreateManyArgs} args - Arguments to create many Admission_Discharges.
     * @example
     * // Create many Admission_Discharges
     * const admission_Discharge = await prisma.admission_Discharge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Admission_DischargeCreateManyArgs>(args?: SelectSubset<T, Admission_DischargeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Admission_Discharge.
     * @param {Admission_DischargeDeleteArgs} args - Arguments to delete one Admission_Discharge.
     * @example
     * // Delete one Admission_Discharge
     * const Admission_Discharge = await prisma.admission_Discharge.delete({
     *   where: {
     *     // ... filter to delete one Admission_Discharge
     *   }
     * })
     * 
     */
    delete<T extends Admission_DischargeDeleteArgs>(args: SelectSubset<T, Admission_DischargeDeleteArgs<ExtArgs>>): Prisma__Admission_DischargeClient<$Result.GetResult<Prisma.$Admission_DischargePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admission_Discharge.
     * @param {Admission_DischargeUpdateArgs} args - Arguments to update one Admission_Discharge.
     * @example
     * // Update one Admission_Discharge
     * const admission_Discharge = await prisma.admission_Discharge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Admission_DischargeUpdateArgs>(args: SelectSubset<T, Admission_DischargeUpdateArgs<ExtArgs>>): Prisma__Admission_DischargeClient<$Result.GetResult<Prisma.$Admission_DischargePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admission_Discharges.
     * @param {Admission_DischargeDeleteManyArgs} args - Arguments to filter Admission_Discharges to delete.
     * @example
     * // Delete a few Admission_Discharges
     * const { count } = await prisma.admission_Discharge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Admission_DischargeDeleteManyArgs>(args?: SelectSubset<T, Admission_DischargeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admission_Discharges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Admission_DischargeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admission_Discharges
     * const admission_Discharge = await prisma.admission_Discharge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Admission_DischargeUpdateManyArgs>(args: SelectSubset<T, Admission_DischargeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Admission_Discharge.
     * @param {Admission_DischargeUpsertArgs} args - Arguments to update or create a Admission_Discharge.
     * @example
     * // Update or create a Admission_Discharge
     * const admission_Discharge = await prisma.admission_Discharge.upsert({
     *   create: {
     *     // ... data to create a Admission_Discharge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admission_Discharge we want to update
     *   }
     * })
     */
    upsert<T extends Admission_DischargeUpsertArgs>(args: SelectSubset<T, Admission_DischargeUpsertArgs<ExtArgs>>): Prisma__Admission_DischargeClient<$Result.GetResult<Prisma.$Admission_DischargePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admission_Discharges that matches the filter.
     * @param {Admission_DischargeFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const admission_Discharge = await prisma.admission_Discharge.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: Admission_DischargeFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Admission_Discharge.
     * @param {Admission_DischargeAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const admission_Discharge = await prisma.admission_Discharge.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: Admission_DischargeAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Admission_Discharges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Admission_DischargeCountArgs} args - Arguments to filter Admission_Discharges to count.
     * @example
     * // Count the number of Admission_Discharges
     * const count = await prisma.admission_Discharge.count({
     *   where: {
     *     // ... the filter for the Admission_Discharges we want to count
     *   }
     * })
    **/
    count<T extends Admission_DischargeCountArgs>(
      args?: Subset<T, Admission_DischargeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Admission_DischargeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admission_Discharge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Admission_DischargeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Admission_DischargeAggregateArgs>(args: Subset<T, Admission_DischargeAggregateArgs>): Prisma.PrismaPromise<GetAdmission_DischargeAggregateType<T>>

    /**
     * Group by Admission_Discharge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Admission_DischargeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Admission_DischargeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Admission_DischargeGroupByArgs['orderBy'] }
        : { orderBy?: Admission_DischargeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Admission_DischargeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdmission_DischargeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admission_Discharge model
   */
  readonly fields: Admission_DischargeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admission_Discharge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Admission_DischargeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ot<T extends Admission_Discharge$otArgs<ExtArgs> = {}>(args?: Subset<T, Admission_Discharge$otArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OTPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    registration<T extends RegistrationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RegistrationDefaultArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Admission_Discharge model
   */
  interface Admission_DischargeFieldRefs {
    readonly admission_id: FieldRef<"Admission_Discharge", 'String'>
    readonly registration_id: FieldRef<"Admission_Discharge", 'String'>
    readonly admission_date: FieldRef<"Admission_Discharge", 'DateTime'>
    readonly admission_mode: FieldRef<"Admission_Discharge", 'String'>
    readonly status: FieldRef<"Admission_Discharge", 'String'>
    readonly discharge_date: FieldRef<"Admission_Discharge", 'DateTime'>
    readonly discharge_mode: FieldRef<"Admission_Discharge", 'String'>
    readonly admission_plan: FieldRef<"Admission_Discharge", 'String'>
    readonly bed_number: FieldRef<"Admission_Discharge", 'Int'>
    readonly diagnosis: FieldRef<"Admission_Discharge", 'String'>
    readonly diagnostic_procedures: FieldRef<"Admission_Discharge", 'String'>
    readonly discharge_instructions: FieldRef<"Admission_Discharge", 'String'>
    readonly discharge_medications: FieldRef<"Admission_Discharge", 'Json'>
    readonly discharge_summary: FieldRef<"Admission_Discharge", 'String'>
    readonly hospital_investigations: FieldRef<"Admission_Discharge", 'String'>
    readonly hospital_medications: FieldRef<"Admission_Discharge", 'String'>
    readonly instructions: FieldRef<"Admission_Discharge", 'String'>
    readonly medical_leave: FieldRef<"Admission_Discharge", 'String'>
    readonly therapeutic_procedures: FieldRef<"Admission_Discharge", 'String'>
    readonly ward: FieldRef<"Admission_Discharge", 'String'>
    readonly created_at: FieldRef<"Admission_Discharge", 'DateTime'>
    readonly updated_at: FieldRef<"Admission_Discharge", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Admission_Discharge findUnique
   */
  export type Admission_DischargeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admission_Discharge
     */
    select?: Admission_DischargeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admission_Discharge
     */
    omit?: Admission_DischargeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Admission_DischargeInclude<ExtArgs> | null
    /**
     * Filter, which Admission_Discharge to fetch.
     */
    where: Admission_DischargeWhereUniqueInput
  }

  /**
   * Admission_Discharge findUniqueOrThrow
   */
  export type Admission_DischargeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admission_Discharge
     */
    select?: Admission_DischargeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admission_Discharge
     */
    omit?: Admission_DischargeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Admission_DischargeInclude<ExtArgs> | null
    /**
     * Filter, which Admission_Discharge to fetch.
     */
    where: Admission_DischargeWhereUniqueInput
  }

  /**
   * Admission_Discharge findFirst
   */
  export type Admission_DischargeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admission_Discharge
     */
    select?: Admission_DischargeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admission_Discharge
     */
    omit?: Admission_DischargeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Admission_DischargeInclude<ExtArgs> | null
    /**
     * Filter, which Admission_Discharge to fetch.
     */
    where?: Admission_DischargeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admission_Discharges to fetch.
     */
    orderBy?: Admission_DischargeOrderByWithRelationInput | Admission_DischargeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admission_Discharges.
     */
    cursor?: Admission_DischargeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admission_Discharges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admission_Discharges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admission_Discharges.
     */
    distinct?: Admission_DischargeScalarFieldEnum | Admission_DischargeScalarFieldEnum[]
  }

  /**
   * Admission_Discharge findFirstOrThrow
   */
  export type Admission_DischargeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admission_Discharge
     */
    select?: Admission_DischargeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admission_Discharge
     */
    omit?: Admission_DischargeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Admission_DischargeInclude<ExtArgs> | null
    /**
     * Filter, which Admission_Discharge to fetch.
     */
    where?: Admission_DischargeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admission_Discharges to fetch.
     */
    orderBy?: Admission_DischargeOrderByWithRelationInput | Admission_DischargeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admission_Discharges.
     */
    cursor?: Admission_DischargeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admission_Discharges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admission_Discharges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admission_Discharges.
     */
    distinct?: Admission_DischargeScalarFieldEnum | Admission_DischargeScalarFieldEnum[]
  }

  /**
   * Admission_Discharge findMany
   */
  export type Admission_DischargeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admission_Discharge
     */
    select?: Admission_DischargeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admission_Discharge
     */
    omit?: Admission_DischargeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Admission_DischargeInclude<ExtArgs> | null
    /**
     * Filter, which Admission_Discharges to fetch.
     */
    where?: Admission_DischargeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admission_Discharges to fetch.
     */
    orderBy?: Admission_DischargeOrderByWithRelationInput | Admission_DischargeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admission_Discharges.
     */
    cursor?: Admission_DischargeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admission_Discharges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admission_Discharges.
     */
    skip?: number
    distinct?: Admission_DischargeScalarFieldEnum | Admission_DischargeScalarFieldEnum[]
  }

  /**
   * Admission_Discharge create
   */
  export type Admission_DischargeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admission_Discharge
     */
    select?: Admission_DischargeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admission_Discharge
     */
    omit?: Admission_DischargeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Admission_DischargeInclude<ExtArgs> | null
    /**
     * The data needed to create a Admission_Discharge.
     */
    data: XOR<Admission_DischargeCreateInput, Admission_DischargeUncheckedCreateInput>
  }

  /**
   * Admission_Discharge createMany
   */
  export type Admission_DischargeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admission_Discharges.
     */
    data: Admission_DischargeCreateManyInput | Admission_DischargeCreateManyInput[]
  }

  /**
   * Admission_Discharge update
   */
  export type Admission_DischargeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admission_Discharge
     */
    select?: Admission_DischargeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admission_Discharge
     */
    omit?: Admission_DischargeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Admission_DischargeInclude<ExtArgs> | null
    /**
     * The data needed to update a Admission_Discharge.
     */
    data: XOR<Admission_DischargeUpdateInput, Admission_DischargeUncheckedUpdateInput>
    /**
     * Choose, which Admission_Discharge to update.
     */
    where: Admission_DischargeWhereUniqueInput
  }

  /**
   * Admission_Discharge updateMany
   */
  export type Admission_DischargeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admission_Discharges.
     */
    data: XOR<Admission_DischargeUpdateManyMutationInput, Admission_DischargeUncheckedUpdateManyInput>
    /**
     * Filter which Admission_Discharges to update
     */
    where?: Admission_DischargeWhereInput
    /**
     * Limit how many Admission_Discharges to update.
     */
    limit?: number
  }

  /**
   * Admission_Discharge upsert
   */
  export type Admission_DischargeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admission_Discharge
     */
    select?: Admission_DischargeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admission_Discharge
     */
    omit?: Admission_DischargeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Admission_DischargeInclude<ExtArgs> | null
    /**
     * The filter to search for the Admission_Discharge to update in case it exists.
     */
    where: Admission_DischargeWhereUniqueInput
    /**
     * In case the Admission_Discharge found by the `where` argument doesn't exist, create a new Admission_Discharge with this data.
     */
    create: XOR<Admission_DischargeCreateInput, Admission_DischargeUncheckedCreateInput>
    /**
     * In case the Admission_Discharge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Admission_DischargeUpdateInput, Admission_DischargeUncheckedUpdateInput>
  }

  /**
   * Admission_Discharge delete
   */
  export type Admission_DischargeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admission_Discharge
     */
    select?: Admission_DischargeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admission_Discharge
     */
    omit?: Admission_DischargeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Admission_DischargeInclude<ExtArgs> | null
    /**
     * Filter which Admission_Discharge to delete.
     */
    where: Admission_DischargeWhereUniqueInput
  }

  /**
   * Admission_Discharge deleteMany
   */
  export type Admission_DischargeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admission_Discharges to delete
     */
    where?: Admission_DischargeWhereInput
    /**
     * Limit how many Admission_Discharges to delete.
     */
    limit?: number
  }

  /**
   * Admission_Discharge findRaw
   */
  export type Admission_DischargeFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Admission_Discharge aggregateRaw
   */
  export type Admission_DischargeAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Admission_Discharge.ot
   */
  export type Admission_Discharge$otArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OT
     */
    select?: OTSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OT
     */
    omit?: OTOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OTInclude<ExtArgs> | null
    where?: OTWhereInput
    orderBy?: OTOrderByWithRelationInput | OTOrderByWithRelationInput[]
    cursor?: OTWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OTScalarFieldEnum | OTScalarFieldEnum[]
  }

  /**
   * Admission_Discharge without action
   */
  export type Admission_DischargeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admission_Discharge
     */
    select?: Admission_DischargeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admission_Discharge
     */
    omit?: Admission_DischargeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Admission_DischargeInclude<ExtArgs> | null
  }


  /**
   * Model OT
   */

  export type AggregateOT = {
    _count: OTCountAggregateOutputType | null
    _avg: OTAvgAggregateOutputType | null
    _sum: OTSumAggregateOutputType | null
    _min: OTMinAggregateOutputType | null
    _max: OTMaxAggregateOutputType | null
  }

  export type OTAvgAggregateOutputType = {
    finalize: number | null
  }

  export type OTSumAggregateOutputType = {
    finalize: number | null
  }

  export type OTMinAggregateOutputType = {
    ot_id: string | null
    admission_id: string | null
    registration_id: string | null
    surgery_date: Date | null
    surgeon: string | null
    assistant_1: string | null
    assistant_2: string | null
    assistant_3: string | null
    anaesthetist: string | null
    anaesthesia: string | null
    procedure_name: string | null
    findings: string | null
    operative_details: string | null
    closure: string | null
    postop_instructions: string | null
    finalize: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type OTMaxAggregateOutputType = {
    ot_id: string | null
    admission_id: string | null
    registration_id: string | null
    surgery_date: Date | null
    surgeon: string | null
    assistant_1: string | null
    assistant_2: string | null
    assistant_3: string | null
    anaesthetist: string | null
    anaesthesia: string | null
    procedure_name: string | null
    findings: string | null
    operative_details: string | null
    closure: string | null
    postop_instructions: string | null
    finalize: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type OTCountAggregateOutputType = {
    ot_id: number
    admission_id: number
    registration_id: number
    surgery_date: number
    surgeon: number
    assistant_1: number
    assistant_2: number
    assistant_3: number
    anaesthetist: number
    anaesthesia: number
    procedure_name: number
    findings: number
    operative_details: number
    closure: number
    postop_instructions: number
    finalize: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type OTAvgAggregateInputType = {
    finalize?: true
  }

  export type OTSumAggregateInputType = {
    finalize?: true
  }

  export type OTMinAggregateInputType = {
    ot_id?: true
    admission_id?: true
    registration_id?: true
    surgery_date?: true
    surgeon?: true
    assistant_1?: true
    assistant_2?: true
    assistant_3?: true
    anaesthetist?: true
    anaesthesia?: true
    procedure_name?: true
    findings?: true
    operative_details?: true
    closure?: true
    postop_instructions?: true
    finalize?: true
    created_at?: true
    updated_at?: true
  }

  export type OTMaxAggregateInputType = {
    ot_id?: true
    admission_id?: true
    registration_id?: true
    surgery_date?: true
    surgeon?: true
    assistant_1?: true
    assistant_2?: true
    assistant_3?: true
    anaesthetist?: true
    anaesthesia?: true
    procedure_name?: true
    findings?: true
    operative_details?: true
    closure?: true
    postop_instructions?: true
    finalize?: true
    created_at?: true
    updated_at?: true
  }

  export type OTCountAggregateInputType = {
    ot_id?: true
    admission_id?: true
    registration_id?: true
    surgery_date?: true
    surgeon?: true
    assistant_1?: true
    assistant_2?: true
    assistant_3?: true
    anaesthetist?: true
    anaesthesia?: true
    procedure_name?: true
    findings?: true
    operative_details?: true
    closure?: true
    postop_instructions?: true
    finalize?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type OTAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OT to aggregate.
     */
    where?: OTWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OTS to fetch.
     */
    orderBy?: OTOrderByWithRelationInput | OTOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OTWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OTS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OTS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OTS
    **/
    _count?: true | OTCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OTAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OTSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OTMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OTMaxAggregateInputType
  }

  export type GetOTAggregateType<T extends OTAggregateArgs> = {
        [P in keyof T & keyof AggregateOT]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOT[P]>
      : GetScalarType<T[P], AggregateOT[P]>
  }




  export type OTGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OTWhereInput
    orderBy?: OTOrderByWithAggregationInput | OTOrderByWithAggregationInput[]
    by: OTScalarFieldEnum[] | OTScalarFieldEnum
    having?: OTScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OTCountAggregateInputType | true
    _avg?: OTAvgAggregateInputType
    _sum?: OTSumAggregateInputType
    _min?: OTMinAggregateInputType
    _max?: OTMaxAggregateInputType
  }

  export type OTGroupByOutputType = {
    ot_id: string
    admission_id: string
    registration_id: string
    surgery_date: Date | null
    surgeon: string | null
    assistant_1: string | null
    assistant_2: string | null
    assistant_3: string | null
    anaesthetist: string | null
    anaesthesia: string | null
    procedure_name: string | null
    findings: string | null
    operative_details: string | null
    closure: string | null
    postop_instructions: string | null
    finalize: number | null
    created_at: Date
    updated_at: Date
    _count: OTCountAggregateOutputType | null
    _avg: OTAvgAggregateOutputType | null
    _sum: OTSumAggregateOutputType | null
    _min: OTMinAggregateOutputType | null
    _max: OTMaxAggregateOutputType | null
  }

  type GetOTGroupByPayload<T extends OTGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OTGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OTGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OTGroupByOutputType[P]>
            : GetScalarType<T[P], OTGroupByOutputType[P]>
        }
      >
    >


  export type OTSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ot_id?: boolean
    admission_id?: boolean
    registration_id?: boolean
    surgery_date?: boolean
    surgeon?: boolean
    assistant_1?: boolean
    assistant_2?: boolean
    assistant_3?: boolean
    anaesthetist?: boolean
    anaesthesia?: boolean
    procedure_name?: boolean
    findings?: boolean
    operative_details?: boolean
    closure?: boolean
    postop_instructions?: boolean
    finalize?: boolean
    created_at?: boolean
    updated_at?: boolean
    admission_discharge?: boolean | Admission_DischargeDefaultArgs<ExtArgs>
    registration?: boolean | RegistrationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oT"]>



  export type OTSelectScalar = {
    ot_id?: boolean
    admission_id?: boolean
    registration_id?: boolean
    surgery_date?: boolean
    surgeon?: boolean
    assistant_1?: boolean
    assistant_2?: boolean
    assistant_3?: boolean
    anaesthetist?: boolean
    anaesthesia?: boolean
    procedure_name?: boolean
    findings?: boolean
    operative_details?: boolean
    closure?: boolean
    postop_instructions?: boolean
    finalize?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type OTOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"ot_id" | "admission_id" | "registration_id" | "surgery_date" | "surgeon" | "assistant_1" | "assistant_2" | "assistant_3" | "anaesthetist" | "anaesthesia" | "procedure_name" | "findings" | "operative_details" | "closure" | "postop_instructions" | "finalize" | "created_at" | "updated_at", ExtArgs["result"]["oT"]>
  export type OTInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admission_discharge?: boolean | Admission_DischargeDefaultArgs<ExtArgs>
    registration?: boolean | RegistrationDefaultArgs<ExtArgs>
  }

  export type $OTPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OT"
    objects: {
      admission_discharge: Prisma.$Admission_DischargePayload<ExtArgs>
      registration: Prisma.$RegistrationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      ot_id: string
      admission_id: string
      registration_id: string
      surgery_date: Date | null
      surgeon: string | null
      assistant_1: string | null
      assistant_2: string | null
      assistant_3: string | null
      anaesthetist: string | null
      anaesthesia: string | null
      procedure_name: string | null
      findings: string | null
      operative_details: string | null
      closure: string | null
      postop_instructions: string | null
      finalize: number | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["oT"]>
    composites: {}
  }

  type OTGetPayload<S extends boolean | null | undefined | OTDefaultArgs> = $Result.GetResult<Prisma.$OTPayload, S>

  type OTCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OTFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OTCountAggregateInputType | true
    }

  export interface OTDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OT'], meta: { name: 'OT' } }
    /**
     * Find zero or one OT that matches the filter.
     * @param {OTFindUniqueArgs} args - Arguments to find a OT
     * @example
     * // Get one OT
     * const oT = await prisma.oT.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OTFindUniqueArgs>(args: SelectSubset<T, OTFindUniqueArgs<ExtArgs>>): Prisma__OTClient<$Result.GetResult<Prisma.$OTPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OT that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OTFindUniqueOrThrowArgs} args - Arguments to find a OT
     * @example
     * // Get one OT
     * const oT = await prisma.oT.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OTFindUniqueOrThrowArgs>(args: SelectSubset<T, OTFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OTClient<$Result.GetResult<Prisma.$OTPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OT that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTFindFirstArgs} args - Arguments to find a OT
     * @example
     * // Get one OT
     * const oT = await prisma.oT.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OTFindFirstArgs>(args?: SelectSubset<T, OTFindFirstArgs<ExtArgs>>): Prisma__OTClient<$Result.GetResult<Prisma.$OTPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OT that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTFindFirstOrThrowArgs} args - Arguments to find a OT
     * @example
     * // Get one OT
     * const oT = await prisma.oT.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OTFindFirstOrThrowArgs>(args?: SelectSubset<T, OTFindFirstOrThrowArgs<ExtArgs>>): Prisma__OTClient<$Result.GetResult<Prisma.$OTPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OTS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OTS
     * const oTS = await prisma.oT.findMany()
     * 
     * // Get first 10 OTS
     * const oTS = await prisma.oT.findMany({ take: 10 })
     * 
     * // Only select the `ot_id`
     * const oTWithOt_idOnly = await prisma.oT.findMany({ select: { ot_id: true } })
     * 
     */
    findMany<T extends OTFindManyArgs>(args?: SelectSubset<T, OTFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OTPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OT.
     * @param {OTCreateArgs} args - Arguments to create a OT.
     * @example
     * // Create one OT
     * const OT = await prisma.oT.create({
     *   data: {
     *     // ... data to create a OT
     *   }
     * })
     * 
     */
    create<T extends OTCreateArgs>(args: SelectSubset<T, OTCreateArgs<ExtArgs>>): Prisma__OTClient<$Result.GetResult<Prisma.$OTPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OTS.
     * @param {OTCreateManyArgs} args - Arguments to create many OTS.
     * @example
     * // Create many OTS
     * const oT = await prisma.oT.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OTCreateManyArgs>(args?: SelectSubset<T, OTCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OT.
     * @param {OTDeleteArgs} args - Arguments to delete one OT.
     * @example
     * // Delete one OT
     * const OT = await prisma.oT.delete({
     *   where: {
     *     // ... filter to delete one OT
     *   }
     * })
     * 
     */
    delete<T extends OTDeleteArgs>(args: SelectSubset<T, OTDeleteArgs<ExtArgs>>): Prisma__OTClient<$Result.GetResult<Prisma.$OTPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OT.
     * @param {OTUpdateArgs} args - Arguments to update one OT.
     * @example
     * // Update one OT
     * const oT = await prisma.oT.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OTUpdateArgs>(args: SelectSubset<T, OTUpdateArgs<ExtArgs>>): Prisma__OTClient<$Result.GetResult<Prisma.$OTPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OTS.
     * @param {OTDeleteManyArgs} args - Arguments to filter OTS to delete.
     * @example
     * // Delete a few OTS
     * const { count } = await prisma.oT.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OTDeleteManyArgs>(args?: SelectSubset<T, OTDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OTS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OTS
     * const oT = await prisma.oT.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OTUpdateManyArgs>(args: SelectSubset<T, OTUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OT.
     * @param {OTUpsertArgs} args - Arguments to update or create a OT.
     * @example
     * // Update or create a OT
     * const oT = await prisma.oT.upsert({
     *   create: {
     *     // ... data to create a OT
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OT we want to update
     *   }
     * })
     */
    upsert<T extends OTUpsertArgs>(args: SelectSubset<T, OTUpsertArgs<ExtArgs>>): Prisma__OTClient<$Result.GetResult<Prisma.$OTPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OTS that matches the filter.
     * @param {OTFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const oT = await prisma.oT.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: OTFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a OT.
     * @param {OTAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const oT = await prisma.oT.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: OTAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of OTS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTCountArgs} args - Arguments to filter OTS to count.
     * @example
     * // Count the number of OTS
     * const count = await prisma.oT.count({
     *   where: {
     *     // ... the filter for the OTS we want to count
     *   }
     * })
    **/
    count<T extends OTCountArgs>(
      args?: Subset<T, OTCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OTCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OT.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OTAggregateArgs>(args: Subset<T, OTAggregateArgs>): Prisma.PrismaPromise<GetOTAggregateType<T>>

    /**
     * Group by OT.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OTGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OTGroupByArgs['orderBy'] }
        : { orderBy?: OTGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OTGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOTGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OT model
   */
  readonly fields: OTFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OT.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OTClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admission_discharge<T extends Admission_DischargeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, Admission_DischargeDefaultArgs<ExtArgs>>): Prisma__Admission_DischargeClient<$Result.GetResult<Prisma.$Admission_DischargePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    registration<T extends RegistrationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RegistrationDefaultArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OT model
   */
  interface OTFieldRefs {
    readonly ot_id: FieldRef<"OT", 'String'>
    readonly admission_id: FieldRef<"OT", 'String'>
    readonly registration_id: FieldRef<"OT", 'String'>
    readonly surgery_date: FieldRef<"OT", 'DateTime'>
    readonly surgeon: FieldRef<"OT", 'String'>
    readonly assistant_1: FieldRef<"OT", 'String'>
    readonly assistant_2: FieldRef<"OT", 'String'>
    readonly assistant_3: FieldRef<"OT", 'String'>
    readonly anaesthetist: FieldRef<"OT", 'String'>
    readonly anaesthesia: FieldRef<"OT", 'String'>
    readonly procedure_name: FieldRef<"OT", 'String'>
    readonly findings: FieldRef<"OT", 'String'>
    readonly operative_details: FieldRef<"OT", 'String'>
    readonly closure: FieldRef<"OT", 'String'>
    readonly postop_instructions: FieldRef<"OT", 'String'>
    readonly finalize: FieldRef<"OT", 'Int'>
    readonly created_at: FieldRef<"OT", 'DateTime'>
    readonly updated_at: FieldRef<"OT", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OT findUnique
   */
  export type OTFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OT
     */
    select?: OTSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OT
     */
    omit?: OTOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OTInclude<ExtArgs> | null
    /**
     * Filter, which OT to fetch.
     */
    where: OTWhereUniqueInput
  }

  /**
   * OT findUniqueOrThrow
   */
  export type OTFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OT
     */
    select?: OTSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OT
     */
    omit?: OTOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OTInclude<ExtArgs> | null
    /**
     * Filter, which OT to fetch.
     */
    where: OTWhereUniqueInput
  }

  /**
   * OT findFirst
   */
  export type OTFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OT
     */
    select?: OTSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OT
     */
    omit?: OTOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OTInclude<ExtArgs> | null
    /**
     * Filter, which OT to fetch.
     */
    where?: OTWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OTS to fetch.
     */
    orderBy?: OTOrderByWithRelationInput | OTOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OTS.
     */
    cursor?: OTWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OTS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OTS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OTS.
     */
    distinct?: OTScalarFieldEnum | OTScalarFieldEnum[]
  }

  /**
   * OT findFirstOrThrow
   */
  export type OTFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OT
     */
    select?: OTSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OT
     */
    omit?: OTOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OTInclude<ExtArgs> | null
    /**
     * Filter, which OT to fetch.
     */
    where?: OTWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OTS to fetch.
     */
    orderBy?: OTOrderByWithRelationInput | OTOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OTS.
     */
    cursor?: OTWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OTS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OTS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OTS.
     */
    distinct?: OTScalarFieldEnum | OTScalarFieldEnum[]
  }

  /**
   * OT findMany
   */
  export type OTFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OT
     */
    select?: OTSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OT
     */
    omit?: OTOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OTInclude<ExtArgs> | null
    /**
     * Filter, which OTS to fetch.
     */
    where?: OTWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OTS to fetch.
     */
    orderBy?: OTOrderByWithRelationInput | OTOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OTS.
     */
    cursor?: OTWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OTS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OTS.
     */
    skip?: number
    distinct?: OTScalarFieldEnum | OTScalarFieldEnum[]
  }

  /**
   * OT create
   */
  export type OTCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OT
     */
    select?: OTSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OT
     */
    omit?: OTOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OTInclude<ExtArgs> | null
    /**
     * The data needed to create a OT.
     */
    data: XOR<OTCreateInput, OTUncheckedCreateInput>
  }

  /**
   * OT createMany
   */
  export type OTCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OTS.
     */
    data: OTCreateManyInput | OTCreateManyInput[]
  }

  /**
   * OT update
   */
  export type OTUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OT
     */
    select?: OTSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OT
     */
    omit?: OTOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OTInclude<ExtArgs> | null
    /**
     * The data needed to update a OT.
     */
    data: XOR<OTUpdateInput, OTUncheckedUpdateInput>
    /**
     * Choose, which OT to update.
     */
    where: OTWhereUniqueInput
  }

  /**
   * OT updateMany
   */
  export type OTUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OTS.
     */
    data: XOR<OTUpdateManyMutationInput, OTUncheckedUpdateManyInput>
    /**
     * Filter which OTS to update
     */
    where?: OTWhereInput
    /**
     * Limit how many OTS to update.
     */
    limit?: number
  }

  /**
   * OT upsert
   */
  export type OTUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OT
     */
    select?: OTSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OT
     */
    omit?: OTOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OTInclude<ExtArgs> | null
    /**
     * The filter to search for the OT to update in case it exists.
     */
    where: OTWhereUniqueInput
    /**
     * In case the OT found by the `where` argument doesn't exist, create a new OT with this data.
     */
    create: XOR<OTCreateInput, OTUncheckedCreateInput>
    /**
     * In case the OT was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OTUpdateInput, OTUncheckedUpdateInput>
  }

  /**
   * OT delete
   */
  export type OTDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OT
     */
    select?: OTSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OT
     */
    omit?: OTOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OTInclude<ExtArgs> | null
    /**
     * Filter which OT to delete.
     */
    where: OTWhereUniqueInput
  }

  /**
   * OT deleteMany
   */
  export type OTDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OTS to delete
     */
    where?: OTWhereInput
    /**
     * Limit how many OTS to delete.
     */
    limit?: number
  }

  /**
   * OT findRaw
   */
  export type OTFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * OT aggregateRaw
   */
  export type OTAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * OT without action
   */
  export type OTDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OT
     */
    select?: OTSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OT
     */
    omit?: OTOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OTInclude<ExtArgs> | null
  }


  /**
   * Model Appointment
   */

  export type AggregateAppointment = {
    _count: AppointmentCountAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  export type AppointmentMinAggregateOutputType = {
    appointment_id: string | null
    created_at: Date | null
    date_appointment: Date | null
    notes: string | null
    plan: string | null
    registration_id: string | null
    status: string | null
    type: string | null
    updated_at: Date | null
  }

  export type AppointmentMaxAggregateOutputType = {
    appointment_id: string | null
    created_at: Date | null
    date_appointment: Date | null
    notes: string | null
    plan: string | null
    registration_id: string | null
    status: string | null
    type: string | null
    updated_at: Date | null
  }

  export type AppointmentCountAggregateOutputType = {
    appointment_id: number
    created_at: number
    date_appointment: number
    notes: number
    plan: number
    registration_id: number
    status: number
    type: number
    updated_at: number
    _all: number
  }


  export type AppointmentMinAggregateInputType = {
    appointment_id?: true
    created_at?: true
    date_appointment?: true
    notes?: true
    plan?: true
    registration_id?: true
    status?: true
    type?: true
    updated_at?: true
  }

  export type AppointmentMaxAggregateInputType = {
    appointment_id?: true
    created_at?: true
    date_appointment?: true
    notes?: true
    plan?: true
    registration_id?: true
    status?: true
    type?: true
    updated_at?: true
  }

  export type AppointmentCountAggregateInputType = {
    appointment_id?: true
    created_at?: true
    date_appointment?: true
    notes?: true
    plan?: true
    registration_id?: true
    status?: true
    type?: true
    updated_at?: true
    _all?: true
  }

  export type AppointmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointment to aggregate.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Appointments
    **/
    _count?: true | AppointmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppointmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppointmentMaxAggregateInputType
  }

  export type GetAppointmentAggregateType<T extends AppointmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAppointment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppointment[P]>
      : GetScalarType<T[P], AggregateAppointment[P]>
  }




  export type AppointmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithAggregationInput | AppointmentOrderByWithAggregationInput[]
    by: AppointmentScalarFieldEnum[] | AppointmentScalarFieldEnum
    having?: AppointmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppointmentCountAggregateInputType | true
    _min?: AppointmentMinAggregateInputType
    _max?: AppointmentMaxAggregateInputType
  }

  export type AppointmentGroupByOutputType = {
    appointment_id: string
    created_at: Date
    date_appointment: Date
    notes: string
    plan: string
    registration_id: string
    status: string
    type: string
    updated_at: Date
    _count: AppointmentCountAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  type GetAppointmentGroupByPayload<T extends AppointmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppointmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppointmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
            : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
        }
      >
    >


  export type AppointmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    appointment_id?: boolean
    created_at?: boolean
    date_appointment?: boolean
    notes?: boolean
    plan?: boolean
    registration_id?: boolean
    status?: boolean
    type?: boolean
    updated_at?: boolean
    registration?: boolean | RegistrationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>



  export type AppointmentSelectScalar = {
    appointment_id?: boolean
    created_at?: boolean
    date_appointment?: boolean
    notes?: boolean
    plan?: boolean
    registration_id?: boolean
    status?: boolean
    type?: boolean
    updated_at?: boolean
  }

  export type AppointmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"appointment_id" | "created_at" | "date_appointment" | "notes" | "plan" | "registration_id" | "status" | "type" | "updated_at", ExtArgs["result"]["appointment"]>
  export type AppointmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registration?: boolean | RegistrationDefaultArgs<ExtArgs>
  }

  export type $AppointmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Appointment"
    objects: {
      registration: Prisma.$RegistrationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      appointment_id: string
      created_at: Date
      date_appointment: Date
      notes: string
      plan: string
      registration_id: string
      status: string
      type: string
      updated_at: Date
    }, ExtArgs["result"]["appointment"]>
    composites: {}
  }

  type AppointmentGetPayload<S extends boolean | null | undefined | AppointmentDefaultArgs> = $Result.GetResult<Prisma.$AppointmentPayload, S>

  type AppointmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppointmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppointmentCountAggregateInputType | true
    }

  export interface AppointmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Appointment'], meta: { name: 'Appointment' } }
    /**
     * Find zero or one Appointment that matches the filter.
     * @param {AppointmentFindUniqueArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppointmentFindUniqueArgs>(args: SelectSubset<T, AppointmentFindUniqueArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Appointment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppointmentFindUniqueOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppointmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppointmentFindFirstArgs>(args?: SelectSubset<T, AppointmentFindFirstArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppointmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Appointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Appointments
     * const appointments = await prisma.appointment.findMany()
     * 
     * // Get first 10 Appointments
     * const appointments = await prisma.appointment.findMany({ take: 10 })
     * 
     * // Only select the `appointment_id`
     * const appointmentWithAppointment_idOnly = await prisma.appointment.findMany({ select: { appointment_id: true } })
     * 
     */
    findMany<T extends AppointmentFindManyArgs>(args?: SelectSubset<T, AppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Appointment.
     * @param {AppointmentCreateArgs} args - Arguments to create a Appointment.
     * @example
     * // Create one Appointment
     * const Appointment = await prisma.appointment.create({
     *   data: {
     *     // ... data to create a Appointment
     *   }
     * })
     * 
     */
    create<T extends AppointmentCreateArgs>(args: SelectSubset<T, AppointmentCreateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Appointments.
     * @param {AppointmentCreateManyArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppointmentCreateManyArgs>(args?: SelectSubset<T, AppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Appointment.
     * @param {AppointmentDeleteArgs} args - Arguments to delete one Appointment.
     * @example
     * // Delete one Appointment
     * const Appointment = await prisma.appointment.delete({
     *   where: {
     *     // ... filter to delete one Appointment
     *   }
     * })
     * 
     */
    delete<T extends AppointmentDeleteArgs>(args: SelectSubset<T, AppointmentDeleteArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Appointment.
     * @param {AppointmentUpdateArgs} args - Arguments to update one Appointment.
     * @example
     * // Update one Appointment
     * const appointment = await prisma.appointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppointmentUpdateArgs>(args: SelectSubset<T, AppointmentUpdateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Appointments.
     * @param {AppointmentDeleteManyArgs} args - Arguments to filter Appointments to delete.
     * @example
     * // Delete a few Appointments
     * const { count } = await prisma.appointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppointmentDeleteManyArgs>(args?: SelectSubset<T, AppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppointmentUpdateManyArgs>(args: SelectSubset<T, AppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Appointment.
     * @param {AppointmentUpsertArgs} args - Arguments to update or create a Appointment.
     * @example
     * // Update or create a Appointment
     * const appointment = await prisma.appointment.upsert({
     *   create: {
     *     // ... data to create a Appointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Appointment we want to update
     *   }
     * })
     */
    upsert<T extends AppointmentUpsertArgs>(args: SelectSubset<T, AppointmentUpsertArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Appointments that matches the filter.
     * @param {AppointmentFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const appointment = await prisma.appointment.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: AppointmentFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Appointment.
     * @param {AppointmentAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const appointment = await prisma.appointment.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: AppointmentAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentCountArgs} args - Arguments to filter Appointments to count.
     * @example
     * // Count the number of Appointments
     * const count = await prisma.appointment.count({
     *   where: {
     *     // ... the filter for the Appointments we want to count
     *   }
     * })
    **/
    count<T extends AppointmentCountArgs>(
      args?: Subset<T, AppointmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppointmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppointmentAggregateArgs>(args: Subset<T, AppointmentAggregateArgs>): Prisma.PrismaPromise<GetAppointmentAggregateType<T>>

    /**
     * Group by Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppointmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppointmentGroupByArgs['orderBy'] }
        : { orderBy?: AppointmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Appointment model
   */
  readonly fields: AppointmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Appointment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppointmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    registration<T extends RegistrationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RegistrationDefaultArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Appointment model
   */
  interface AppointmentFieldRefs {
    readonly appointment_id: FieldRef<"Appointment", 'String'>
    readonly created_at: FieldRef<"Appointment", 'DateTime'>
    readonly date_appointment: FieldRef<"Appointment", 'DateTime'>
    readonly notes: FieldRef<"Appointment", 'String'>
    readonly plan: FieldRef<"Appointment", 'String'>
    readonly registration_id: FieldRef<"Appointment", 'String'>
    readonly status: FieldRef<"Appointment", 'String'>
    readonly type: FieldRef<"Appointment", 'String'>
    readonly updated_at: FieldRef<"Appointment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Appointment findUnique
   */
  export type AppointmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findUniqueOrThrow
   */
  export type AppointmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findFirst
   */
  export type AppointmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findFirstOrThrow
   */
  export type AppointmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findMany
   */
  export type AppointmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointments to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment create
   */
  export type AppointmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Appointment.
     */
    data: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
  }

  /**
   * Appointment createMany
   */
  export type AppointmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
  }

  /**
   * Appointment update
   */
  export type AppointmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Appointment.
     */
    data: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
    /**
     * Choose, which Appointment to update.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment updateMany
   */
  export type AppointmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
  }

  /**
   * Appointment upsert
   */
  export type AppointmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Appointment to update in case it exists.
     */
    where: AppointmentWhereUniqueInput
    /**
     * In case the Appointment found by the `where` argument doesn't exist, create a new Appointment with this data.
     */
    create: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
    /**
     * In case the Appointment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
  }

  /**
   * Appointment delete
   */
  export type AppointmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter which Appointment to delete.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment deleteMany
   */
  export type AppointmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointments to delete
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to delete.
     */
    limit?: number
  }

  /**
   * Appointment findRaw
   */
  export type AppointmentFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Appointment aggregateRaw
   */
  export type AppointmentAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Appointment without action
   */
  export type AppointmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
  }


  /**
   * Model Consultation
   */

  export type AggregateConsultation = {
    _count: ConsultationCountAggregateOutputType | null
    _min: ConsultationMinAggregateOutputType | null
    _max: ConsultationMaxAggregateOutputType | null
  }

  export type ConsultationMinAggregateOutputType = {
    consultation_id: string | null
    created_at: Date | null
    diagnosis: string | null
    examination: string | null
    history: string | null
    investigations: string | null
    plan: string | null
    status: string | null
    registration_id: string | null
    updated_at: Date | null
    visit_date: Date | null
  }

  export type ConsultationMaxAggregateOutputType = {
    consultation_id: string | null
    created_at: Date | null
    diagnosis: string | null
    examination: string | null
    history: string | null
    investigations: string | null
    plan: string | null
    status: string | null
    registration_id: string | null
    updated_at: Date | null
    visit_date: Date | null
  }

  export type ConsultationCountAggregateOutputType = {
    consultation_id: number
    created_at: number
    diagnosis: number
    examination: number
    history: number
    instructions: number
    investigations: number
    plan: number
    status: number
    registration_id: number
    updated_at: number
    visit_date: number
    _all: number
  }


  export type ConsultationMinAggregateInputType = {
    consultation_id?: true
    created_at?: true
    diagnosis?: true
    examination?: true
    history?: true
    investigations?: true
    plan?: true
    status?: true
    registration_id?: true
    updated_at?: true
    visit_date?: true
  }

  export type ConsultationMaxAggregateInputType = {
    consultation_id?: true
    created_at?: true
    diagnosis?: true
    examination?: true
    history?: true
    investigations?: true
    plan?: true
    status?: true
    registration_id?: true
    updated_at?: true
    visit_date?: true
  }

  export type ConsultationCountAggregateInputType = {
    consultation_id?: true
    created_at?: true
    diagnosis?: true
    examination?: true
    history?: true
    instructions?: true
    investigations?: true
    plan?: true
    status?: true
    registration_id?: true
    updated_at?: true
    visit_date?: true
    _all?: true
  }

  export type ConsultationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Consultation to aggregate.
     */
    where?: ConsultationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultations to fetch.
     */
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConsultationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Consultations
    **/
    _count?: true | ConsultationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConsultationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConsultationMaxAggregateInputType
  }

  export type GetConsultationAggregateType<T extends ConsultationAggregateArgs> = {
        [P in keyof T & keyof AggregateConsultation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConsultation[P]>
      : GetScalarType<T[P], AggregateConsultation[P]>
  }




  export type ConsultationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultationWhereInput
    orderBy?: ConsultationOrderByWithAggregationInput | ConsultationOrderByWithAggregationInput[]
    by: ConsultationScalarFieldEnum[] | ConsultationScalarFieldEnum
    having?: ConsultationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConsultationCountAggregateInputType | true
    _min?: ConsultationMinAggregateInputType
    _max?: ConsultationMaxAggregateInputType
  }

  export type ConsultationGroupByOutputType = {
    consultation_id: string
    created_at: Date
    diagnosis: string | null
    examination: string | null
    history: string | null
    instructions: JsonValue | null
    investigations: string | null
    plan: string | null
    status: string | null
    registration_id: string
    updated_at: Date
    visit_date: Date
    _count: ConsultationCountAggregateOutputType | null
    _min: ConsultationMinAggregateOutputType | null
    _max: ConsultationMaxAggregateOutputType | null
  }

  type GetConsultationGroupByPayload<T extends ConsultationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConsultationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConsultationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConsultationGroupByOutputType[P]>
            : GetScalarType<T[P], ConsultationGroupByOutputType[P]>
        }
      >
    >


  export type ConsultationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    consultation_id?: boolean
    created_at?: boolean
    diagnosis?: boolean
    examination?: boolean
    history?: boolean
    instructions?: boolean
    investigations?: boolean
    plan?: boolean
    medications?: boolean | MedicationDefaultArgs<ExtArgs>
    status?: boolean
    registration_id?: boolean
    updated_at?: boolean
    visit_date?: boolean
    registration?: boolean | RegistrationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["consultation"]>



  export type ConsultationSelectScalar = {
    consultation_id?: boolean
    created_at?: boolean
    diagnosis?: boolean
    examination?: boolean
    history?: boolean
    instructions?: boolean
    investigations?: boolean
    plan?: boolean
    status?: boolean
    registration_id?: boolean
    updated_at?: boolean
    visit_date?: boolean
  }

  export type ConsultationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"consultation_id" | "created_at" | "diagnosis" | "examination" | "history" | "instructions" | "investigations" | "plan" | "medications" | "status" | "registration_id" | "updated_at" | "visit_date", ExtArgs["result"]["consultation"]>
  export type ConsultationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registration?: boolean | RegistrationDefaultArgs<ExtArgs>
  }

  export type $ConsultationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Consultation"
    objects: {
      registration: Prisma.$RegistrationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      consultation_id: string
      created_at: Date
      diagnosis: string | null
      examination: string | null
      history: string | null
      instructions: Prisma.JsonValue | null
      investigations: string | null
      plan: string | null
      status: string | null
      registration_id: string
      updated_at: Date
      visit_date: Date
    }, ExtArgs["result"]["consultation"]>
    composites: {
      medications: Prisma.$MedicationPayload[]
    }
  }

  type ConsultationGetPayload<S extends boolean | null | undefined | ConsultationDefaultArgs> = $Result.GetResult<Prisma.$ConsultationPayload, S>

  type ConsultationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConsultationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConsultationCountAggregateInputType | true
    }

  export interface ConsultationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Consultation'], meta: { name: 'Consultation' } }
    /**
     * Find zero or one Consultation that matches the filter.
     * @param {ConsultationFindUniqueArgs} args - Arguments to find a Consultation
     * @example
     * // Get one Consultation
     * const consultation = await prisma.consultation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConsultationFindUniqueArgs>(args: SelectSubset<T, ConsultationFindUniqueArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Consultation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConsultationFindUniqueOrThrowArgs} args - Arguments to find a Consultation
     * @example
     * // Get one Consultation
     * const consultation = await prisma.consultation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConsultationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConsultationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Consultation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationFindFirstArgs} args - Arguments to find a Consultation
     * @example
     * // Get one Consultation
     * const consultation = await prisma.consultation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConsultationFindFirstArgs>(args?: SelectSubset<T, ConsultationFindFirstArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Consultation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationFindFirstOrThrowArgs} args - Arguments to find a Consultation
     * @example
     * // Get one Consultation
     * const consultation = await prisma.consultation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConsultationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConsultationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Consultations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Consultations
     * const consultations = await prisma.consultation.findMany()
     * 
     * // Get first 10 Consultations
     * const consultations = await prisma.consultation.findMany({ take: 10 })
     * 
     * // Only select the `consultation_id`
     * const consultationWithConsultation_idOnly = await prisma.consultation.findMany({ select: { consultation_id: true } })
     * 
     */
    findMany<T extends ConsultationFindManyArgs>(args?: SelectSubset<T, ConsultationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Consultation.
     * @param {ConsultationCreateArgs} args - Arguments to create a Consultation.
     * @example
     * // Create one Consultation
     * const Consultation = await prisma.consultation.create({
     *   data: {
     *     // ... data to create a Consultation
     *   }
     * })
     * 
     */
    create<T extends ConsultationCreateArgs>(args: SelectSubset<T, ConsultationCreateArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Consultations.
     * @param {ConsultationCreateManyArgs} args - Arguments to create many Consultations.
     * @example
     * // Create many Consultations
     * const consultation = await prisma.consultation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConsultationCreateManyArgs>(args?: SelectSubset<T, ConsultationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Consultation.
     * @param {ConsultationDeleteArgs} args - Arguments to delete one Consultation.
     * @example
     * // Delete one Consultation
     * const Consultation = await prisma.consultation.delete({
     *   where: {
     *     // ... filter to delete one Consultation
     *   }
     * })
     * 
     */
    delete<T extends ConsultationDeleteArgs>(args: SelectSubset<T, ConsultationDeleteArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Consultation.
     * @param {ConsultationUpdateArgs} args - Arguments to update one Consultation.
     * @example
     * // Update one Consultation
     * const consultation = await prisma.consultation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConsultationUpdateArgs>(args: SelectSubset<T, ConsultationUpdateArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Consultations.
     * @param {ConsultationDeleteManyArgs} args - Arguments to filter Consultations to delete.
     * @example
     * // Delete a few Consultations
     * const { count } = await prisma.consultation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConsultationDeleteManyArgs>(args?: SelectSubset<T, ConsultationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Consultations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Consultations
     * const consultation = await prisma.consultation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConsultationUpdateManyArgs>(args: SelectSubset<T, ConsultationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Consultation.
     * @param {ConsultationUpsertArgs} args - Arguments to update or create a Consultation.
     * @example
     * // Update or create a Consultation
     * const consultation = await prisma.consultation.upsert({
     *   create: {
     *     // ... data to create a Consultation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Consultation we want to update
     *   }
     * })
     */
    upsert<T extends ConsultationUpsertArgs>(args: SelectSubset<T, ConsultationUpsertArgs<ExtArgs>>): Prisma__ConsultationClient<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Consultations that matches the filter.
     * @param {ConsultationFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const consultation = await prisma.consultation.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ConsultationFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Consultation.
     * @param {ConsultationAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const consultation = await prisma.consultation.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ConsultationAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Consultations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationCountArgs} args - Arguments to filter Consultations to count.
     * @example
     * // Count the number of Consultations
     * const count = await prisma.consultation.count({
     *   where: {
     *     // ... the filter for the Consultations we want to count
     *   }
     * })
    **/
    count<T extends ConsultationCountArgs>(
      args?: Subset<T, ConsultationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConsultationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Consultation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConsultationAggregateArgs>(args: Subset<T, ConsultationAggregateArgs>): Prisma.PrismaPromise<GetConsultationAggregateType<T>>

    /**
     * Group by Consultation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConsultationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConsultationGroupByArgs['orderBy'] }
        : { orderBy?: ConsultationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConsultationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConsultationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Consultation model
   */
  readonly fields: ConsultationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Consultation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConsultationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    registration<T extends RegistrationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RegistrationDefaultArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Consultation model
   */
  interface ConsultationFieldRefs {
    readonly consultation_id: FieldRef<"Consultation", 'String'>
    readonly created_at: FieldRef<"Consultation", 'DateTime'>
    readonly diagnosis: FieldRef<"Consultation", 'String'>
    readonly examination: FieldRef<"Consultation", 'String'>
    readonly history: FieldRef<"Consultation", 'String'>
    readonly instructions: FieldRef<"Consultation", 'Json'>
    readonly investigations: FieldRef<"Consultation", 'String'>
    readonly plan: FieldRef<"Consultation", 'String'>
    readonly status: FieldRef<"Consultation", 'String'>
    readonly registration_id: FieldRef<"Consultation", 'String'>
    readonly updated_at: FieldRef<"Consultation", 'DateTime'>
    readonly visit_date: FieldRef<"Consultation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Consultation findUnique
   */
  export type ConsultationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultation to fetch.
     */
    where: ConsultationWhereUniqueInput
  }

  /**
   * Consultation findUniqueOrThrow
   */
  export type ConsultationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultation to fetch.
     */
    where: ConsultationWhereUniqueInput
  }

  /**
   * Consultation findFirst
   */
  export type ConsultationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultation to fetch.
     */
    where?: ConsultationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultations to fetch.
     */
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Consultations.
     */
    cursor?: ConsultationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Consultations.
     */
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * Consultation findFirstOrThrow
   */
  export type ConsultationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultation to fetch.
     */
    where?: ConsultationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultations to fetch.
     */
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Consultations.
     */
    cursor?: ConsultationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Consultations.
     */
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * Consultation findMany
   */
  export type ConsultationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter, which Consultations to fetch.
     */
    where?: ConsultationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consultations to fetch.
     */
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Consultations.
     */
    cursor?: ConsultationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consultations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consultations.
     */
    skip?: number
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * Consultation create
   */
  export type ConsultationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * The data needed to create a Consultation.
     */
    data: XOR<ConsultationCreateInput, ConsultationUncheckedCreateInput>
  }

  /**
   * Consultation createMany
   */
  export type ConsultationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Consultations.
     */
    data: ConsultationCreateManyInput | ConsultationCreateManyInput[]
  }

  /**
   * Consultation update
   */
  export type ConsultationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * The data needed to update a Consultation.
     */
    data: XOR<ConsultationUpdateInput, ConsultationUncheckedUpdateInput>
    /**
     * Choose, which Consultation to update.
     */
    where: ConsultationWhereUniqueInput
  }

  /**
   * Consultation updateMany
   */
  export type ConsultationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Consultations.
     */
    data: XOR<ConsultationUpdateManyMutationInput, ConsultationUncheckedUpdateManyInput>
    /**
     * Filter which Consultations to update
     */
    where?: ConsultationWhereInput
    /**
     * Limit how many Consultations to update.
     */
    limit?: number
  }

  /**
   * Consultation upsert
   */
  export type ConsultationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * The filter to search for the Consultation to update in case it exists.
     */
    where: ConsultationWhereUniqueInput
    /**
     * In case the Consultation found by the `where` argument doesn't exist, create a new Consultation with this data.
     */
    create: XOR<ConsultationCreateInput, ConsultationUncheckedCreateInput>
    /**
     * In case the Consultation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConsultationUpdateInput, ConsultationUncheckedUpdateInput>
  }

  /**
   * Consultation delete
   */
  export type ConsultationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    /**
     * Filter which Consultation to delete.
     */
    where: ConsultationWhereUniqueInput
  }

  /**
   * Consultation deleteMany
   */
  export type ConsultationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Consultations to delete
     */
    where?: ConsultationWhereInput
    /**
     * Limit how many Consultations to delete.
     */
    limit?: number
  }

  /**
   * Consultation findRaw
   */
  export type ConsultationFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Consultation aggregateRaw
   */
  export type ConsultationAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Consultation without action
   */
  export type ConsultationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
  }


  /**
   * Model Registration
   */

  export type AggregateRegistration = {
    _count: RegistrationCountAggregateOutputType | null
    _min: RegistrationMinAggregateOutputType | null
    _max: RegistrationMaxAggregateOutputType | null
  }

  export type RegistrationMinAggregateOutputType = {
    registration_id: string | null
    code: string | null
    created_at: Date | null
    first_name: string | null
    gender: string | null
    last_name: string | null
    mr_number: string | null
    phone_number: string | null
    date_of_birth: Date | null
    updated_at: Date | null
  }

  export type RegistrationMaxAggregateOutputType = {
    registration_id: string | null
    code: string | null
    created_at: Date | null
    first_name: string | null
    gender: string | null
    last_name: string | null
    mr_number: string | null
    phone_number: string | null
    date_of_birth: Date | null
    updated_at: Date | null
  }

  export type RegistrationCountAggregateOutputType = {
    registration_id: number
    code: number
    created_at: number
    first_name: number
    gender: number
    last_name: number
    mr_number: number
    phone_number: number
    date_of_birth: number
    updated_at: number
    _all: number
  }


  export type RegistrationMinAggregateInputType = {
    registration_id?: true
    code?: true
    created_at?: true
    first_name?: true
    gender?: true
    last_name?: true
    mr_number?: true
    phone_number?: true
    date_of_birth?: true
    updated_at?: true
  }

  export type RegistrationMaxAggregateInputType = {
    registration_id?: true
    code?: true
    created_at?: true
    first_name?: true
    gender?: true
    last_name?: true
    mr_number?: true
    phone_number?: true
    date_of_birth?: true
    updated_at?: true
  }

  export type RegistrationCountAggregateInputType = {
    registration_id?: true
    code?: true
    created_at?: true
    first_name?: true
    gender?: true
    last_name?: true
    mr_number?: true
    phone_number?: true
    date_of_birth?: true
    updated_at?: true
    _all?: true
  }

  export type RegistrationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Registration to aggregate.
     */
    where?: RegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Registrations to fetch.
     */
    orderBy?: RegistrationOrderByWithRelationInput | RegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Registrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Registrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Registrations
    **/
    _count?: true | RegistrationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegistrationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegistrationMaxAggregateInputType
  }

  export type GetRegistrationAggregateType<T extends RegistrationAggregateArgs> = {
        [P in keyof T & keyof AggregateRegistration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegistration[P]>
      : GetScalarType<T[P], AggregateRegistration[P]>
  }




  export type RegistrationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegistrationWhereInput
    orderBy?: RegistrationOrderByWithAggregationInput | RegistrationOrderByWithAggregationInput[]
    by: RegistrationScalarFieldEnum[] | RegistrationScalarFieldEnum
    having?: RegistrationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegistrationCountAggregateInputType | true
    _min?: RegistrationMinAggregateInputType
    _max?: RegistrationMaxAggregateInputType
  }

  export type RegistrationGroupByOutputType = {
    registration_id: string
    code: string
    created_at: Date
    first_name: string
    gender: string
    last_name: string
    mr_number: string
    phone_number: string | null
    date_of_birth: Date | null
    updated_at: Date
    _count: RegistrationCountAggregateOutputType | null
    _min: RegistrationMinAggregateOutputType | null
    _max: RegistrationMaxAggregateOutputType | null
  }

  type GetRegistrationGroupByPayload<T extends RegistrationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegistrationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegistrationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegistrationGroupByOutputType[P]>
            : GetScalarType<T[P], RegistrationGroupByOutputType[P]>
        }
      >
    >


  export type RegistrationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    registration_id?: boolean
    code?: boolean
    created_at?: boolean
    first_name?: boolean
    gender?: boolean
    last_name?: boolean
    mr_number?: boolean
    phone_number?: boolean
    date_of_birth?: boolean
    updated_at?: boolean
    Consultation?: boolean | Registration$ConsultationArgs<ExtArgs>
    Appointment?: boolean | Registration$AppointmentArgs<ExtArgs>
    Admission_Discharge?: boolean | Registration$Admission_DischargeArgs<ExtArgs>
    OT?: boolean | Registration$OTArgs<ExtArgs>
    _count?: boolean | RegistrationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["registration"]>



  export type RegistrationSelectScalar = {
    registration_id?: boolean
    code?: boolean
    created_at?: boolean
    first_name?: boolean
    gender?: boolean
    last_name?: boolean
    mr_number?: boolean
    phone_number?: boolean
    date_of_birth?: boolean
    updated_at?: boolean
  }

  export type RegistrationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"registration_id" | "code" | "created_at" | "first_name" | "gender" | "last_name" | "mr_number" | "phone_number" | "date_of_birth" | "updated_at", ExtArgs["result"]["registration"]>
  export type RegistrationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Consultation?: boolean | Registration$ConsultationArgs<ExtArgs>
    Appointment?: boolean | Registration$AppointmentArgs<ExtArgs>
    Admission_Discharge?: boolean | Registration$Admission_DischargeArgs<ExtArgs>
    OT?: boolean | Registration$OTArgs<ExtArgs>
    _count?: boolean | RegistrationCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $RegistrationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Registration"
    objects: {
      Consultation: Prisma.$ConsultationPayload<ExtArgs>[]
      Appointment: Prisma.$AppointmentPayload<ExtArgs>[]
      Admission_Discharge: Prisma.$Admission_DischargePayload<ExtArgs>[]
      OT: Prisma.$OTPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      registration_id: string
      code: string
      created_at: Date
      first_name: string
      gender: string
      last_name: string
      mr_number: string
      phone_number: string | null
      date_of_birth: Date | null
      updated_at: Date
    }, ExtArgs["result"]["registration"]>
    composites: {}
  }

  type RegistrationGetPayload<S extends boolean | null | undefined | RegistrationDefaultArgs> = $Result.GetResult<Prisma.$RegistrationPayload, S>

  type RegistrationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RegistrationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RegistrationCountAggregateInputType | true
    }

  export interface RegistrationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Registration'], meta: { name: 'Registration' } }
    /**
     * Find zero or one Registration that matches the filter.
     * @param {RegistrationFindUniqueArgs} args - Arguments to find a Registration
     * @example
     * // Get one Registration
     * const registration = await prisma.registration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RegistrationFindUniqueArgs>(args: SelectSubset<T, RegistrationFindUniqueArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Registration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RegistrationFindUniqueOrThrowArgs} args - Arguments to find a Registration
     * @example
     * // Get one Registration
     * const registration = await prisma.registration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RegistrationFindUniqueOrThrowArgs>(args: SelectSubset<T, RegistrationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Registration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationFindFirstArgs} args - Arguments to find a Registration
     * @example
     * // Get one Registration
     * const registration = await prisma.registration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RegistrationFindFirstArgs>(args?: SelectSubset<T, RegistrationFindFirstArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Registration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationFindFirstOrThrowArgs} args - Arguments to find a Registration
     * @example
     * // Get one Registration
     * const registration = await prisma.registration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RegistrationFindFirstOrThrowArgs>(args?: SelectSubset<T, RegistrationFindFirstOrThrowArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Registrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Registrations
     * const registrations = await prisma.registration.findMany()
     * 
     * // Get first 10 Registrations
     * const registrations = await prisma.registration.findMany({ take: 10 })
     * 
     * // Only select the `registration_id`
     * const registrationWithRegistration_idOnly = await prisma.registration.findMany({ select: { registration_id: true } })
     * 
     */
    findMany<T extends RegistrationFindManyArgs>(args?: SelectSubset<T, RegistrationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Registration.
     * @param {RegistrationCreateArgs} args - Arguments to create a Registration.
     * @example
     * // Create one Registration
     * const Registration = await prisma.registration.create({
     *   data: {
     *     // ... data to create a Registration
     *   }
     * })
     * 
     */
    create<T extends RegistrationCreateArgs>(args: SelectSubset<T, RegistrationCreateArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Registrations.
     * @param {RegistrationCreateManyArgs} args - Arguments to create many Registrations.
     * @example
     * // Create many Registrations
     * const registration = await prisma.registration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RegistrationCreateManyArgs>(args?: SelectSubset<T, RegistrationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Registration.
     * @param {RegistrationDeleteArgs} args - Arguments to delete one Registration.
     * @example
     * // Delete one Registration
     * const Registration = await prisma.registration.delete({
     *   where: {
     *     // ... filter to delete one Registration
     *   }
     * })
     * 
     */
    delete<T extends RegistrationDeleteArgs>(args: SelectSubset<T, RegistrationDeleteArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Registration.
     * @param {RegistrationUpdateArgs} args - Arguments to update one Registration.
     * @example
     * // Update one Registration
     * const registration = await prisma.registration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RegistrationUpdateArgs>(args: SelectSubset<T, RegistrationUpdateArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Registrations.
     * @param {RegistrationDeleteManyArgs} args - Arguments to filter Registrations to delete.
     * @example
     * // Delete a few Registrations
     * const { count } = await prisma.registration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RegistrationDeleteManyArgs>(args?: SelectSubset<T, RegistrationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Registrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Registrations
     * const registration = await prisma.registration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RegistrationUpdateManyArgs>(args: SelectSubset<T, RegistrationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Registration.
     * @param {RegistrationUpsertArgs} args - Arguments to update or create a Registration.
     * @example
     * // Update or create a Registration
     * const registration = await prisma.registration.upsert({
     *   create: {
     *     // ... data to create a Registration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Registration we want to update
     *   }
     * })
     */
    upsert<T extends RegistrationUpsertArgs>(args: SelectSubset<T, RegistrationUpsertArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Registrations that matches the filter.
     * @param {RegistrationFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const registration = await prisma.registration.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: RegistrationFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Registration.
     * @param {RegistrationAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const registration = await prisma.registration.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: RegistrationAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Registrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationCountArgs} args - Arguments to filter Registrations to count.
     * @example
     * // Count the number of Registrations
     * const count = await prisma.registration.count({
     *   where: {
     *     // ... the filter for the Registrations we want to count
     *   }
     * })
    **/
    count<T extends RegistrationCountArgs>(
      args?: Subset<T, RegistrationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegistrationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Registration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RegistrationAggregateArgs>(args: Subset<T, RegistrationAggregateArgs>): Prisma.PrismaPromise<GetRegistrationAggregateType<T>>

    /**
     * Group by Registration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RegistrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RegistrationGroupByArgs['orderBy'] }
        : { orderBy?: RegistrationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RegistrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegistrationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Registration model
   */
  readonly fields: RegistrationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Registration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RegistrationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Consultation<T extends Registration$ConsultationArgs<ExtArgs> = {}>(args?: Subset<T, Registration$ConsultationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Appointment<T extends Registration$AppointmentArgs<ExtArgs> = {}>(args?: Subset<T, Registration$AppointmentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Admission_Discharge<T extends Registration$Admission_DischargeArgs<ExtArgs> = {}>(args?: Subset<T, Registration$Admission_DischargeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Admission_DischargePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    OT<T extends Registration$OTArgs<ExtArgs> = {}>(args?: Subset<T, Registration$OTArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OTPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Registration model
   */
  interface RegistrationFieldRefs {
    readonly registration_id: FieldRef<"Registration", 'String'>
    readonly code: FieldRef<"Registration", 'String'>
    readonly created_at: FieldRef<"Registration", 'DateTime'>
    readonly first_name: FieldRef<"Registration", 'String'>
    readonly gender: FieldRef<"Registration", 'String'>
    readonly last_name: FieldRef<"Registration", 'String'>
    readonly mr_number: FieldRef<"Registration", 'String'>
    readonly phone_number: FieldRef<"Registration", 'String'>
    readonly date_of_birth: FieldRef<"Registration", 'DateTime'>
    readonly updated_at: FieldRef<"Registration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Registration findUnique
   */
  export type RegistrationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * Filter, which Registration to fetch.
     */
    where: RegistrationWhereUniqueInput
  }

  /**
   * Registration findUniqueOrThrow
   */
  export type RegistrationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * Filter, which Registration to fetch.
     */
    where: RegistrationWhereUniqueInput
  }

  /**
   * Registration findFirst
   */
  export type RegistrationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * Filter, which Registration to fetch.
     */
    where?: RegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Registrations to fetch.
     */
    orderBy?: RegistrationOrderByWithRelationInput | RegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Registrations.
     */
    cursor?: RegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Registrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Registrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Registrations.
     */
    distinct?: RegistrationScalarFieldEnum | RegistrationScalarFieldEnum[]
  }

  /**
   * Registration findFirstOrThrow
   */
  export type RegistrationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * Filter, which Registration to fetch.
     */
    where?: RegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Registrations to fetch.
     */
    orderBy?: RegistrationOrderByWithRelationInput | RegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Registrations.
     */
    cursor?: RegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Registrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Registrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Registrations.
     */
    distinct?: RegistrationScalarFieldEnum | RegistrationScalarFieldEnum[]
  }

  /**
   * Registration findMany
   */
  export type RegistrationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * Filter, which Registrations to fetch.
     */
    where?: RegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Registrations to fetch.
     */
    orderBy?: RegistrationOrderByWithRelationInput | RegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Registrations.
     */
    cursor?: RegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Registrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Registrations.
     */
    skip?: number
    distinct?: RegistrationScalarFieldEnum | RegistrationScalarFieldEnum[]
  }

  /**
   * Registration create
   */
  export type RegistrationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * The data needed to create a Registration.
     */
    data: XOR<RegistrationCreateInput, RegistrationUncheckedCreateInput>
  }

  /**
   * Registration createMany
   */
  export type RegistrationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Registrations.
     */
    data: RegistrationCreateManyInput | RegistrationCreateManyInput[]
  }

  /**
   * Registration update
   */
  export type RegistrationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * The data needed to update a Registration.
     */
    data: XOR<RegistrationUpdateInput, RegistrationUncheckedUpdateInput>
    /**
     * Choose, which Registration to update.
     */
    where: RegistrationWhereUniqueInput
  }

  /**
   * Registration updateMany
   */
  export type RegistrationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Registrations.
     */
    data: XOR<RegistrationUpdateManyMutationInput, RegistrationUncheckedUpdateManyInput>
    /**
     * Filter which Registrations to update
     */
    where?: RegistrationWhereInput
    /**
     * Limit how many Registrations to update.
     */
    limit?: number
  }

  /**
   * Registration upsert
   */
  export type RegistrationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * The filter to search for the Registration to update in case it exists.
     */
    where: RegistrationWhereUniqueInput
    /**
     * In case the Registration found by the `where` argument doesn't exist, create a new Registration with this data.
     */
    create: XOR<RegistrationCreateInput, RegistrationUncheckedCreateInput>
    /**
     * In case the Registration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RegistrationUpdateInput, RegistrationUncheckedUpdateInput>
  }

  /**
   * Registration delete
   */
  export type RegistrationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * Filter which Registration to delete.
     */
    where: RegistrationWhereUniqueInput
  }

  /**
   * Registration deleteMany
   */
  export type RegistrationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Registrations to delete
     */
    where?: RegistrationWhereInput
    /**
     * Limit how many Registrations to delete.
     */
    limit?: number
  }

  /**
   * Registration findRaw
   */
  export type RegistrationFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Registration aggregateRaw
   */
  export type RegistrationAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Registration.Consultation
   */
  export type Registration$ConsultationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consultation
     */
    select?: ConsultationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consultation
     */
    omit?: ConsultationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationInclude<ExtArgs> | null
    where?: ConsultationWhereInput
    orderBy?: ConsultationOrderByWithRelationInput | ConsultationOrderByWithRelationInput[]
    cursor?: ConsultationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsultationScalarFieldEnum | ConsultationScalarFieldEnum[]
  }

  /**
   * Registration.Appointment
   */
  export type Registration$AppointmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Registration.Admission_Discharge
   */
  export type Registration$Admission_DischargeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admission_Discharge
     */
    select?: Admission_DischargeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admission_Discharge
     */
    omit?: Admission_DischargeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Admission_DischargeInclude<ExtArgs> | null
    where?: Admission_DischargeWhereInput
    orderBy?: Admission_DischargeOrderByWithRelationInput | Admission_DischargeOrderByWithRelationInput[]
    cursor?: Admission_DischargeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Admission_DischargeScalarFieldEnum | Admission_DischargeScalarFieldEnum[]
  }

  /**
   * Registration.OT
   */
  export type Registration$OTArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OT
     */
    select?: OTSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OT
     */
    omit?: OTOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OTInclude<ExtArgs> | null
    where?: OTWhereInput
    orderBy?: OTOrderByWithRelationInput | OTOrderByWithRelationInput[]
    cursor?: OTWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OTScalarFieldEnum | OTScalarFieldEnum[]
  }

  /**
   * Registration without action
   */
  export type RegistrationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: string | null
    emailVerified: Date | null
    image: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: string | null
    emailVerified: Date | null
    image: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    emailVerified: number
    image: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    emailVerified?: true
    image?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    emailVerified?: true
    image?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    emailVerified?: true
    image?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    password: string | null
    role: string
    emailVerified: Date | null
    image: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    emailVerified?: boolean
    image?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    emailVerified?: boolean
    image?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "role" | "emailVerified" | "image", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string | null
      password: string | null
      role: string
      emailVerified: Date | null
      image: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * @param {UserFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const user = await prisma.user.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: UserFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a User.
     * @param {UserAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const user = await prisma.user.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UserAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data?: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User findRaw
   */
  export type UserFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User aggregateRaw
   */
  export type UserAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>



  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * @param {AccountFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const account = await prisma.account.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: AccountFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Account.
     * @param {AccountAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const account = await prisma.account.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: AccountAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account findRaw
   */
  export type AccountFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Account aggregateRaw
   */
  export type AccountAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>



  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionToken" | "userId" | "expires", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionToken: string
      userId: string
      expires: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * @param {SessionFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const session = await prisma.session.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: SessionFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Session.
     * @param {SessionAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const session = await prisma.session.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: SessionAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session findRaw
   */
  export type SessionFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Session aggregateRaw
   */
  export type SessionAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    id: number
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    id?: true
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    id?: true
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    id?: true
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    id: string
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>



  export type VerificationTokenSelectScalar = {
    id?: boolean
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "token" | "expires", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationTokenWithIdOnly = await prisma.verificationToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * @param {VerificationTokenFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const verificationToken = await prisma.verificationToken.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: VerificationTokenFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a VerificationToken.
     * @param {VerificationTokenAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const verificationToken = await prisma.verificationToken.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: VerificationTokenAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly id: FieldRef<"VerificationToken", 'String'>
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken findRaw
   */
  export type VerificationTokenFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * VerificationToken aggregateRaw
   */
  export type VerificationTokenAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const Admission_DischargeScalarFieldEnum: {
    admission_id: 'admission_id',
    registration_id: 'registration_id',
    admission_date: 'admission_date',
    admission_mode: 'admission_mode',
    status: 'status',
    discharge_date: 'discharge_date',
    discharge_mode: 'discharge_mode',
    admission_plan: 'admission_plan',
    bed_number: 'bed_number',
    diagnosis: 'diagnosis',
    diagnostic_procedures: 'diagnostic_procedures',
    discharge_instructions: 'discharge_instructions',
    discharge_medications: 'discharge_medications',
    discharge_summary: 'discharge_summary',
    hospital_investigations: 'hospital_investigations',
    hospital_medications: 'hospital_medications',
    instructions: 'instructions',
    medical_leave: 'medical_leave',
    therapeutic_procedures: 'therapeutic_procedures',
    ward: 'ward',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Admission_DischargeScalarFieldEnum = (typeof Admission_DischargeScalarFieldEnum)[keyof typeof Admission_DischargeScalarFieldEnum]


  export const OTScalarFieldEnum: {
    ot_id: 'ot_id',
    admission_id: 'admission_id',
    registration_id: 'registration_id',
    surgery_date: 'surgery_date',
    surgeon: 'surgeon',
    assistant_1: 'assistant_1',
    assistant_2: 'assistant_2',
    assistant_3: 'assistant_3',
    anaesthetist: 'anaesthetist',
    anaesthesia: 'anaesthesia',
    procedure_name: 'procedure_name',
    findings: 'findings',
    operative_details: 'operative_details',
    closure: 'closure',
    postop_instructions: 'postop_instructions',
    finalize: 'finalize',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type OTScalarFieldEnum = (typeof OTScalarFieldEnum)[keyof typeof OTScalarFieldEnum]


  export const AppointmentScalarFieldEnum: {
    appointment_id: 'appointment_id',
    created_at: 'created_at',
    date_appointment: 'date_appointment',
    notes: 'notes',
    plan: 'plan',
    registration_id: 'registration_id',
    status: 'status',
    type: 'type',
    updated_at: 'updated_at'
  };

  export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum]


  export const ConsultationScalarFieldEnum: {
    consultation_id: 'consultation_id',
    created_at: 'created_at',
    diagnosis: 'diagnosis',
    examination: 'examination',
    history: 'history',
    instructions: 'instructions',
    investigations: 'investigations',
    plan: 'plan',
    status: 'status',
    registration_id: 'registration_id',
    updated_at: 'updated_at',
    visit_date: 'visit_date'
  };

  export type ConsultationScalarFieldEnum = (typeof ConsultationScalarFieldEnum)[keyof typeof ConsultationScalarFieldEnum]


  export const RegistrationScalarFieldEnum: {
    registration_id: 'registration_id',
    code: 'code',
    created_at: 'created_at',
    first_name: 'first_name',
    gender: 'gender',
    last_name: 'last_name',
    mr_number: 'mr_number',
    phone_number: 'phone_number',
    date_of_birth: 'date_of_birth',
    updated_at: 'updated_at'
  };

  export type RegistrationScalarFieldEnum = (typeof RegistrationScalarFieldEnum)[keyof typeof RegistrationScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    emailVerified: 'emailVerified',
    image: 'image'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type Admission_DischargeWhereInput = {
    AND?: Admission_DischargeWhereInput | Admission_DischargeWhereInput[]
    OR?: Admission_DischargeWhereInput[]
    NOT?: Admission_DischargeWhereInput | Admission_DischargeWhereInput[]
    admission_id?: StringFilter<"Admission_Discharge"> | string
    registration_id?: StringFilter<"Admission_Discharge"> | string
    admission_date?: DateTimeNullableFilter<"Admission_Discharge"> | Date | string | null
    admission_mode?: StringNullableFilter<"Admission_Discharge"> | string | null
    status?: StringFilter<"Admission_Discharge"> | string
    discharge_date?: DateTimeNullableFilter<"Admission_Discharge"> | Date | string | null
    discharge_mode?: StringNullableFilter<"Admission_Discharge"> | string | null
    admission_plan?: StringNullableFilter<"Admission_Discharge"> | string | null
    bed_number?: IntNullableFilter<"Admission_Discharge"> | number | null
    diagnosis?: StringNullableFilter<"Admission_Discharge"> | string | null
    diagnostic_procedures?: StringNullableFilter<"Admission_Discharge"> | string | null
    discharge_instructions?: StringNullableFilter<"Admission_Discharge"> | string | null
    discharge_medications?: JsonNullableFilter<"Admission_Discharge">
    discharge_summary?: StringNullableFilter<"Admission_Discharge"> | string | null
    hospital_investigations?: StringNullableFilter<"Admission_Discharge"> | string | null
    hospital_medications?: StringNullableFilter<"Admission_Discharge"> | string | null
    instructions?: StringNullableFilter<"Admission_Discharge"> | string | null
    medical_leave?: StringNullableFilter<"Admission_Discharge"> | string | null
    therapeutic_procedures?: StringNullableFilter<"Admission_Discharge"> | string | null
    ward?: StringNullableFilter<"Admission_Discharge"> | string | null
    medications?: MedicationCompositeListFilter | MedicationObjectEqualityInput[]
    created_at?: DateTimeFilter<"Admission_Discharge"> | Date | string
    updated_at?: DateTimeFilter<"Admission_Discharge"> | Date | string
    ot?: OTListRelationFilter
    registration?: XOR<RegistrationScalarRelationFilter, RegistrationWhereInput>
  }

  export type Admission_DischargeOrderByWithRelationInput = {
    admission_id?: SortOrder
    registration_id?: SortOrder
    admission_date?: SortOrder
    admission_mode?: SortOrder
    status?: SortOrder
    discharge_date?: SortOrder
    discharge_mode?: SortOrder
    admission_plan?: SortOrder
    bed_number?: SortOrder
    diagnosis?: SortOrder
    diagnostic_procedures?: SortOrder
    discharge_instructions?: SortOrder
    discharge_medications?: SortOrder
    discharge_summary?: SortOrder
    hospital_investigations?: SortOrder
    hospital_medications?: SortOrder
    instructions?: SortOrder
    medical_leave?: SortOrder
    therapeutic_procedures?: SortOrder
    ward?: SortOrder
    medications?: MedicationOrderByCompositeAggregateInput
    created_at?: SortOrder
    updated_at?: SortOrder
    ot?: OTOrderByRelationAggregateInput
    registration?: RegistrationOrderByWithRelationInput
  }

  export type Admission_DischargeWhereUniqueInput = Prisma.AtLeast<{
    admission_id?: string
    AND?: Admission_DischargeWhereInput | Admission_DischargeWhereInput[]
    OR?: Admission_DischargeWhereInput[]
    NOT?: Admission_DischargeWhereInput | Admission_DischargeWhereInput[]
    registration_id?: StringFilter<"Admission_Discharge"> | string
    admission_date?: DateTimeNullableFilter<"Admission_Discharge"> | Date | string | null
    admission_mode?: StringNullableFilter<"Admission_Discharge"> | string | null
    status?: StringFilter<"Admission_Discharge"> | string
    discharge_date?: DateTimeNullableFilter<"Admission_Discharge"> | Date | string | null
    discharge_mode?: StringNullableFilter<"Admission_Discharge"> | string | null
    admission_plan?: StringNullableFilter<"Admission_Discharge"> | string | null
    bed_number?: IntNullableFilter<"Admission_Discharge"> | number | null
    diagnosis?: StringNullableFilter<"Admission_Discharge"> | string | null
    diagnostic_procedures?: StringNullableFilter<"Admission_Discharge"> | string | null
    discharge_instructions?: StringNullableFilter<"Admission_Discharge"> | string | null
    discharge_medications?: JsonNullableFilter<"Admission_Discharge">
    discharge_summary?: StringNullableFilter<"Admission_Discharge"> | string | null
    hospital_investigations?: StringNullableFilter<"Admission_Discharge"> | string | null
    hospital_medications?: StringNullableFilter<"Admission_Discharge"> | string | null
    instructions?: StringNullableFilter<"Admission_Discharge"> | string | null
    medical_leave?: StringNullableFilter<"Admission_Discharge"> | string | null
    therapeutic_procedures?: StringNullableFilter<"Admission_Discharge"> | string | null
    ward?: StringNullableFilter<"Admission_Discharge"> | string | null
    medications?: MedicationCompositeListFilter | MedicationObjectEqualityInput[]
    created_at?: DateTimeFilter<"Admission_Discharge"> | Date | string
    updated_at?: DateTimeFilter<"Admission_Discharge"> | Date | string
    ot?: OTListRelationFilter
    registration?: XOR<RegistrationScalarRelationFilter, RegistrationWhereInput>
  }, "admission_id">

  export type Admission_DischargeOrderByWithAggregationInput = {
    admission_id?: SortOrder
    registration_id?: SortOrder
    admission_date?: SortOrder
    admission_mode?: SortOrder
    status?: SortOrder
    discharge_date?: SortOrder
    discharge_mode?: SortOrder
    admission_plan?: SortOrder
    bed_number?: SortOrder
    diagnosis?: SortOrder
    diagnostic_procedures?: SortOrder
    discharge_instructions?: SortOrder
    discharge_medications?: SortOrder
    discharge_summary?: SortOrder
    hospital_investigations?: SortOrder
    hospital_medications?: SortOrder
    instructions?: SortOrder
    medical_leave?: SortOrder
    therapeutic_procedures?: SortOrder
    ward?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: Admission_DischargeCountOrderByAggregateInput
    _avg?: Admission_DischargeAvgOrderByAggregateInput
    _max?: Admission_DischargeMaxOrderByAggregateInput
    _min?: Admission_DischargeMinOrderByAggregateInput
    _sum?: Admission_DischargeSumOrderByAggregateInput
  }

  export type Admission_DischargeScalarWhereWithAggregatesInput = {
    AND?: Admission_DischargeScalarWhereWithAggregatesInput | Admission_DischargeScalarWhereWithAggregatesInput[]
    OR?: Admission_DischargeScalarWhereWithAggregatesInput[]
    NOT?: Admission_DischargeScalarWhereWithAggregatesInput | Admission_DischargeScalarWhereWithAggregatesInput[]
    admission_id?: StringWithAggregatesFilter<"Admission_Discharge"> | string
    registration_id?: StringWithAggregatesFilter<"Admission_Discharge"> | string
    admission_date?: DateTimeNullableWithAggregatesFilter<"Admission_Discharge"> | Date | string | null
    admission_mode?: StringNullableWithAggregatesFilter<"Admission_Discharge"> | string | null
    status?: StringWithAggregatesFilter<"Admission_Discharge"> | string
    discharge_date?: DateTimeNullableWithAggregatesFilter<"Admission_Discharge"> | Date | string | null
    discharge_mode?: StringNullableWithAggregatesFilter<"Admission_Discharge"> | string | null
    admission_plan?: StringNullableWithAggregatesFilter<"Admission_Discharge"> | string | null
    bed_number?: IntNullableWithAggregatesFilter<"Admission_Discharge"> | number | null
    diagnosis?: StringNullableWithAggregatesFilter<"Admission_Discharge"> | string | null
    diagnostic_procedures?: StringNullableWithAggregatesFilter<"Admission_Discharge"> | string | null
    discharge_instructions?: StringNullableWithAggregatesFilter<"Admission_Discharge"> | string | null
    discharge_medications?: JsonNullableWithAggregatesFilter<"Admission_Discharge">
    discharge_summary?: StringNullableWithAggregatesFilter<"Admission_Discharge"> | string | null
    hospital_investigations?: StringNullableWithAggregatesFilter<"Admission_Discharge"> | string | null
    hospital_medications?: StringNullableWithAggregatesFilter<"Admission_Discharge"> | string | null
    instructions?: StringNullableWithAggregatesFilter<"Admission_Discharge"> | string | null
    medical_leave?: StringNullableWithAggregatesFilter<"Admission_Discharge"> | string | null
    therapeutic_procedures?: StringNullableWithAggregatesFilter<"Admission_Discharge"> | string | null
    ward?: StringNullableWithAggregatesFilter<"Admission_Discharge"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Admission_Discharge"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Admission_Discharge"> | Date | string
  }

  export type OTWhereInput = {
    AND?: OTWhereInput | OTWhereInput[]
    OR?: OTWhereInput[]
    NOT?: OTWhereInput | OTWhereInput[]
    ot_id?: StringFilter<"OT"> | string
    admission_id?: StringFilter<"OT"> | string
    registration_id?: StringFilter<"OT"> | string
    surgery_date?: DateTimeNullableFilter<"OT"> | Date | string | null
    surgeon?: StringNullableFilter<"OT"> | string | null
    assistant_1?: StringNullableFilter<"OT"> | string | null
    assistant_2?: StringNullableFilter<"OT"> | string | null
    assistant_3?: StringNullableFilter<"OT"> | string | null
    anaesthetist?: StringNullableFilter<"OT"> | string | null
    anaesthesia?: StringNullableFilter<"OT"> | string | null
    procedure_name?: StringNullableFilter<"OT"> | string | null
    findings?: StringNullableFilter<"OT"> | string | null
    operative_details?: StringNullableFilter<"OT"> | string | null
    closure?: StringNullableFilter<"OT"> | string | null
    postop_instructions?: StringNullableFilter<"OT"> | string | null
    finalize?: IntNullableFilter<"OT"> | number | null
    created_at?: DateTimeFilter<"OT"> | Date | string
    updated_at?: DateTimeFilter<"OT"> | Date | string
    admission_discharge?: XOR<Admission_DischargeScalarRelationFilter, Admission_DischargeWhereInput>
    registration?: XOR<RegistrationScalarRelationFilter, RegistrationWhereInput>
  }

  export type OTOrderByWithRelationInput = {
    ot_id?: SortOrder
    admission_id?: SortOrder
    registration_id?: SortOrder
    surgery_date?: SortOrder
    surgeon?: SortOrder
    assistant_1?: SortOrder
    assistant_2?: SortOrder
    assistant_3?: SortOrder
    anaesthetist?: SortOrder
    anaesthesia?: SortOrder
    procedure_name?: SortOrder
    findings?: SortOrder
    operative_details?: SortOrder
    closure?: SortOrder
    postop_instructions?: SortOrder
    finalize?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    admission_discharge?: Admission_DischargeOrderByWithRelationInput
    registration?: RegistrationOrderByWithRelationInput
  }

  export type OTWhereUniqueInput = Prisma.AtLeast<{
    ot_id?: string
    AND?: OTWhereInput | OTWhereInput[]
    OR?: OTWhereInput[]
    NOT?: OTWhereInput | OTWhereInput[]
    admission_id?: StringFilter<"OT"> | string
    registration_id?: StringFilter<"OT"> | string
    surgery_date?: DateTimeNullableFilter<"OT"> | Date | string | null
    surgeon?: StringNullableFilter<"OT"> | string | null
    assistant_1?: StringNullableFilter<"OT"> | string | null
    assistant_2?: StringNullableFilter<"OT"> | string | null
    assistant_3?: StringNullableFilter<"OT"> | string | null
    anaesthetist?: StringNullableFilter<"OT"> | string | null
    anaesthesia?: StringNullableFilter<"OT"> | string | null
    procedure_name?: StringNullableFilter<"OT"> | string | null
    findings?: StringNullableFilter<"OT"> | string | null
    operative_details?: StringNullableFilter<"OT"> | string | null
    closure?: StringNullableFilter<"OT"> | string | null
    postop_instructions?: StringNullableFilter<"OT"> | string | null
    finalize?: IntNullableFilter<"OT"> | number | null
    created_at?: DateTimeFilter<"OT"> | Date | string
    updated_at?: DateTimeFilter<"OT"> | Date | string
    admission_discharge?: XOR<Admission_DischargeScalarRelationFilter, Admission_DischargeWhereInput>
    registration?: XOR<RegistrationScalarRelationFilter, RegistrationWhereInput>
  }, "ot_id">

  export type OTOrderByWithAggregationInput = {
    ot_id?: SortOrder
    admission_id?: SortOrder
    registration_id?: SortOrder
    surgery_date?: SortOrder
    surgeon?: SortOrder
    assistant_1?: SortOrder
    assistant_2?: SortOrder
    assistant_3?: SortOrder
    anaesthetist?: SortOrder
    anaesthesia?: SortOrder
    procedure_name?: SortOrder
    findings?: SortOrder
    operative_details?: SortOrder
    closure?: SortOrder
    postop_instructions?: SortOrder
    finalize?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: OTCountOrderByAggregateInput
    _avg?: OTAvgOrderByAggregateInput
    _max?: OTMaxOrderByAggregateInput
    _min?: OTMinOrderByAggregateInput
    _sum?: OTSumOrderByAggregateInput
  }

  export type OTScalarWhereWithAggregatesInput = {
    AND?: OTScalarWhereWithAggregatesInput | OTScalarWhereWithAggregatesInput[]
    OR?: OTScalarWhereWithAggregatesInput[]
    NOT?: OTScalarWhereWithAggregatesInput | OTScalarWhereWithAggregatesInput[]
    ot_id?: StringWithAggregatesFilter<"OT"> | string
    admission_id?: StringWithAggregatesFilter<"OT"> | string
    registration_id?: StringWithAggregatesFilter<"OT"> | string
    surgery_date?: DateTimeNullableWithAggregatesFilter<"OT"> | Date | string | null
    surgeon?: StringNullableWithAggregatesFilter<"OT"> | string | null
    assistant_1?: StringNullableWithAggregatesFilter<"OT"> | string | null
    assistant_2?: StringNullableWithAggregatesFilter<"OT"> | string | null
    assistant_3?: StringNullableWithAggregatesFilter<"OT"> | string | null
    anaesthetist?: StringNullableWithAggregatesFilter<"OT"> | string | null
    anaesthesia?: StringNullableWithAggregatesFilter<"OT"> | string | null
    procedure_name?: StringNullableWithAggregatesFilter<"OT"> | string | null
    findings?: StringNullableWithAggregatesFilter<"OT"> | string | null
    operative_details?: StringNullableWithAggregatesFilter<"OT"> | string | null
    closure?: StringNullableWithAggregatesFilter<"OT"> | string | null
    postop_instructions?: StringNullableWithAggregatesFilter<"OT"> | string | null
    finalize?: IntNullableWithAggregatesFilter<"OT"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"OT"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"OT"> | Date | string
  }

  export type AppointmentWhereInput = {
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    appointment_id?: StringFilter<"Appointment"> | string
    created_at?: DateTimeFilter<"Appointment"> | Date | string
    date_appointment?: DateTimeFilter<"Appointment"> | Date | string
    notes?: StringFilter<"Appointment"> | string
    plan?: StringFilter<"Appointment"> | string
    registration_id?: StringFilter<"Appointment"> | string
    status?: StringFilter<"Appointment"> | string
    type?: StringFilter<"Appointment"> | string
    updated_at?: DateTimeFilter<"Appointment"> | Date | string
    registration?: XOR<RegistrationScalarRelationFilter, RegistrationWhereInput>
  }

  export type AppointmentOrderByWithRelationInput = {
    appointment_id?: SortOrder
    created_at?: SortOrder
    date_appointment?: SortOrder
    notes?: SortOrder
    plan?: SortOrder
    registration_id?: SortOrder
    status?: SortOrder
    type?: SortOrder
    updated_at?: SortOrder
    registration?: RegistrationOrderByWithRelationInput
  }

  export type AppointmentWhereUniqueInput = Prisma.AtLeast<{
    appointment_id?: string
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    created_at?: DateTimeFilter<"Appointment"> | Date | string
    date_appointment?: DateTimeFilter<"Appointment"> | Date | string
    notes?: StringFilter<"Appointment"> | string
    plan?: StringFilter<"Appointment"> | string
    registration_id?: StringFilter<"Appointment"> | string
    status?: StringFilter<"Appointment"> | string
    type?: StringFilter<"Appointment"> | string
    updated_at?: DateTimeFilter<"Appointment"> | Date | string
    registration?: XOR<RegistrationScalarRelationFilter, RegistrationWhereInput>
  }, "appointment_id">

  export type AppointmentOrderByWithAggregationInput = {
    appointment_id?: SortOrder
    created_at?: SortOrder
    date_appointment?: SortOrder
    notes?: SortOrder
    plan?: SortOrder
    registration_id?: SortOrder
    status?: SortOrder
    type?: SortOrder
    updated_at?: SortOrder
    _count?: AppointmentCountOrderByAggregateInput
    _max?: AppointmentMaxOrderByAggregateInput
    _min?: AppointmentMinOrderByAggregateInput
  }

  export type AppointmentScalarWhereWithAggregatesInput = {
    AND?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    OR?: AppointmentScalarWhereWithAggregatesInput[]
    NOT?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    appointment_id?: StringWithAggregatesFilter<"Appointment"> | string
    created_at?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    date_appointment?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    notes?: StringWithAggregatesFilter<"Appointment"> | string
    plan?: StringWithAggregatesFilter<"Appointment"> | string
    registration_id?: StringWithAggregatesFilter<"Appointment"> | string
    status?: StringWithAggregatesFilter<"Appointment"> | string
    type?: StringWithAggregatesFilter<"Appointment"> | string
    updated_at?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
  }

  export type ConsultationWhereInput = {
    AND?: ConsultationWhereInput | ConsultationWhereInput[]
    OR?: ConsultationWhereInput[]
    NOT?: ConsultationWhereInput | ConsultationWhereInput[]
    consultation_id?: StringFilter<"Consultation"> | string
    created_at?: DateTimeFilter<"Consultation"> | Date | string
    diagnosis?: StringNullableFilter<"Consultation"> | string | null
    examination?: StringNullableFilter<"Consultation"> | string | null
    history?: StringNullableFilter<"Consultation"> | string | null
    instructions?: JsonNullableFilter<"Consultation">
    investigations?: StringNullableFilter<"Consultation"> | string | null
    plan?: StringNullableFilter<"Consultation"> | string | null
    medications?: MedicationCompositeListFilter | MedicationObjectEqualityInput[]
    status?: StringNullableFilter<"Consultation"> | string | null
    registration_id?: StringFilter<"Consultation"> | string
    updated_at?: DateTimeFilter<"Consultation"> | Date | string
    visit_date?: DateTimeFilter<"Consultation"> | Date | string
    registration?: XOR<RegistrationScalarRelationFilter, RegistrationWhereInput>
  }

  export type ConsultationOrderByWithRelationInput = {
    consultation_id?: SortOrder
    created_at?: SortOrder
    diagnosis?: SortOrder
    examination?: SortOrder
    history?: SortOrder
    instructions?: SortOrder
    investigations?: SortOrder
    plan?: SortOrder
    medications?: MedicationOrderByCompositeAggregateInput
    status?: SortOrder
    registration_id?: SortOrder
    updated_at?: SortOrder
    visit_date?: SortOrder
    registration?: RegistrationOrderByWithRelationInput
  }

  export type ConsultationWhereUniqueInput = Prisma.AtLeast<{
    consultation_id?: string
    AND?: ConsultationWhereInput | ConsultationWhereInput[]
    OR?: ConsultationWhereInput[]
    NOT?: ConsultationWhereInput | ConsultationWhereInput[]
    created_at?: DateTimeFilter<"Consultation"> | Date | string
    diagnosis?: StringNullableFilter<"Consultation"> | string | null
    examination?: StringNullableFilter<"Consultation"> | string | null
    history?: StringNullableFilter<"Consultation"> | string | null
    instructions?: JsonNullableFilter<"Consultation">
    investigations?: StringNullableFilter<"Consultation"> | string | null
    plan?: StringNullableFilter<"Consultation"> | string | null
    medications?: MedicationCompositeListFilter | MedicationObjectEqualityInput[]
    status?: StringNullableFilter<"Consultation"> | string | null
    registration_id?: StringFilter<"Consultation"> | string
    updated_at?: DateTimeFilter<"Consultation"> | Date | string
    visit_date?: DateTimeFilter<"Consultation"> | Date | string
    registration?: XOR<RegistrationScalarRelationFilter, RegistrationWhereInput>
  }, "consultation_id">

  export type ConsultationOrderByWithAggregationInput = {
    consultation_id?: SortOrder
    created_at?: SortOrder
    diagnosis?: SortOrder
    examination?: SortOrder
    history?: SortOrder
    instructions?: SortOrder
    investigations?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    registration_id?: SortOrder
    updated_at?: SortOrder
    visit_date?: SortOrder
    _count?: ConsultationCountOrderByAggregateInput
    _max?: ConsultationMaxOrderByAggregateInput
    _min?: ConsultationMinOrderByAggregateInput
  }

  export type ConsultationScalarWhereWithAggregatesInput = {
    AND?: ConsultationScalarWhereWithAggregatesInput | ConsultationScalarWhereWithAggregatesInput[]
    OR?: ConsultationScalarWhereWithAggregatesInput[]
    NOT?: ConsultationScalarWhereWithAggregatesInput | ConsultationScalarWhereWithAggregatesInput[]
    consultation_id?: StringWithAggregatesFilter<"Consultation"> | string
    created_at?: DateTimeWithAggregatesFilter<"Consultation"> | Date | string
    diagnosis?: StringNullableWithAggregatesFilter<"Consultation"> | string | null
    examination?: StringNullableWithAggregatesFilter<"Consultation"> | string | null
    history?: StringNullableWithAggregatesFilter<"Consultation"> | string | null
    instructions?: JsonNullableWithAggregatesFilter<"Consultation">
    investigations?: StringNullableWithAggregatesFilter<"Consultation"> | string | null
    plan?: StringNullableWithAggregatesFilter<"Consultation"> | string | null
    status?: StringNullableWithAggregatesFilter<"Consultation"> | string | null
    registration_id?: StringWithAggregatesFilter<"Consultation"> | string
    updated_at?: DateTimeWithAggregatesFilter<"Consultation"> | Date | string
    visit_date?: DateTimeWithAggregatesFilter<"Consultation"> | Date | string
  }

  export type RegistrationWhereInput = {
    AND?: RegistrationWhereInput | RegistrationWhereInput[]
    OR?: RegistrationWhereInput[]
    NOT?: RegistrationWhereInput | RegistrationWhereInput[]
    registration_id?: StringFilter<"Registration"> | string
    code?: StringFilter<"Registration"> | string
    created_at?: DateTimeFilter<"Registration"> | Date | string
    first_name?: StringFilter<"Registration"> | string
    gender?: StringFilter<"Registration"> | string
    last_name?: StringFilter<"Registration"> | string
    mr_number?: StringFilter<"Registration"> | string
    phone_number?: StringNullableFilter<"Registration"> | string | null
    date_of_birth?: DateTimeNullableFilter<"Registration"> | Date | string | null
    updated_at?: DateTimeFilter<"Registration"> | Date | string
    Consultation?: ConsultationListRelationFilter
    Appointment?: AppointmentListRelationFilter
    Admission_Discharge?: Admission_DischargeListRelationFilter
    OT?: OTListRelationFilter
  }

  export type RegistrationOrderByWithRelationInput = {
    registration_id?: SortOrder
    code?: SortOrder
    created_at?: SortOrder
    first_name?: SortOrder
    gender?: SortOrder
    last_name?: SortOrder
    mr_number?: SortOrder
    phone_number?: SortOrder
    date_of_birth?: SortOrder
    updated_at?: SortOrder
    Consultation?: ConsultationOrderByRelationAggregateInput
    Appointment?: AppointmentOrderByRelationAggregateInput
    Admission_Discharge?: Admission_DischargeOrderByRelationAggregateInput
    OT?: OTOrderByRelationAggregateInput
  }

  export type RegistrationWhereUniqueInput = Prisma.AtLeast<{
    registration_id?: string
    AND?: RegistrationWhereInput | RegistrationWhereInput[]
    OR?: RegistrationWhereInput[]
    NOT?: RegistrationWhereInput | RegistrationWhereInput[]
    code?: StringFilter<"Registration"> | string
    created_at?: DateTimeFilter<"Registration"> | Date | string
    first_name?: StringFilter<"Registration"> | string
    gender?: StringFilter<"Registration"> | string
    last_name?: StringFilter<"Registration"> | string
    mr_number?: StringFilter<"Registration"> | string
    phone_number?: StringNullableFilter<"Registration"> | string | null
    date_of_birth?: DateTimeNullableFilter<"Registration"> | Date | string | null
    updated_at?: DateTimeFilter<"Registration"> | Date | string
    Consultation?: ConsultationListRelationFilter
    Appointment?: AppointmentListRelationFilter
    Admission_Discharge?: Admission_DischargeListRelationFilter
    OT?: OTListRelationFilter
  }, "registration_id">

  export type RegistrationOrderByWithAggregationInput = {
    registration_id?: SortOrder
    code?: SortOrder
    created_at?: SortOrder
    first_name?: SortOrder
    gender?: SortOrder
    last_name?: SortOrder
    mr_number?: SortOrder
    phone_number?: SortOrder
    date_of_birth?: SortOrder
    updated_at?: SortOrder
    _count?: RegistrationCountOrderByAggregateInput
    _max?: RegistrationMaxOrderByAggregateInput
    _min?: RegistrationMinOrderByAggregateInput
  }

  export type RegistrationScalarWhereWithAggregatesInput = {
    AND?: RegistrationScalarWhereWithAggregatesInput | RegistrationScalarWhereWithAggregatesInput[]
    OR?: RegistrationScalarWhereWithAggregatesInput[]
    NOT?: RegistrationScalarWhereWithAggregatesInput | RegistrationScalarWhereWithAggregatesInput[]
    registration_id?: StringWithAggregatesFilter<"Registration"> | string
    code?: StringWithAggregatesFilter<"Registration"> | string
    created_at?: DateTimeWithAggregatesFilter<"Registration"> | Date | string
    first_name?: StringWithAggregatesFilter<"Registration"> | string
    gender?: StringWithAggregatesFilter<"Registration"> | string
    last_name?: StringWithAggregatesFilter<"Registration"> | string
    mr_number?: StringWithAggregatesFilter<"Registration"> | string
    phone_number?: StringNullableWithAggregatesFilter<"Registration"> | string | null
    date_of_birth?: DateTimeNullableWithAggregatesFilter<"Registration"> | Date | string | null
    updated_at?: DateTimeWithAggregatesFilter<"Registration"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    id?: StringFilter<"VerificationToken"> | string
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "id" | "token" | "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VerificationToken"> | string
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type Admission_DischargeCreateInput = {
    admission_id?: string
    admission_date?: Date | string | null
    admission_mode?: string | null
    status: string
    discharge_date?: Date | string | null
    discharge_mode?: string | null
    admission_plan?: string | null
    bed_number?: number | null
    diagnosis?: string | null
    diagnostic_procedures?: string | null
    discharge_instructions?: string | null
    discharge_medications?: InputJsonValue | null
    discharge_summary?: string | null
    hospital_investigations?: string | null
    hospital_medications?: string | null
    instructions?: string | null
    medical_leave?: string | null
    therapeutic_procedures?: string | null
    ward?: string | null
    medications?: XOR<MedicationListCreateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    created_at?: Date | string
    updated_at?: Date | string
    ot?: OTCreateNestedManyWithoutAdmission_dischargeInput
    registration: RegistrationCreateNestedOneWithoutAdmission_DischargeInput
  }

  export type Admission_DischargeUncheckedCreateInput = {
    admission_id?: string
    registration_id: string
    admission_date?: Date | string | null
    admission_mode?: string | null
    status: string
    discharge_date?: Date | string | null
    discharge_mode?: string | null
    admission_plan?: string | null
    bed_number?: number | null
    diagnosis?: string | null
    diagnostic_procedures?: string | null
    discharge_instructions?: string | null
    discharge_medications?: InputJsonValue | null
    discharge_summary?: string | null
    hospital_investigations?: string | null
    hospital_medications?: string | null
    instructions?: string | null
    medical_leave?: string | null
    therapeutic_procedures?: string | null
    ward?: string | null
    medications?: XOR<MedicationListCreateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    created_at?: Date | string
    updated_at?: Date | string
    ot?: OTUncheckedCreateNestedManyWithoutAdmission_dischargeInput
  }

  export type Admission_DischargeUpdateInput = {
    admission_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    admission_mode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    discharge_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discharge_mode?: NullableStringFieldUpdateOperationsInput | string | null
    admission_plan?: NullableStringFieldUpdateOperationsInput | string | null
    bed_number?: NullableIntFieldUpdateOperationsInput | number | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    diagnostic_procedures?: NullableStringFieldUpdateOperationsInput | string | null
    discharge_instructions?: NullableStringFieldUpdateOperationsInput | string | null
    discharge_medications?: InputJsonValue | InputJsonValue | null
    discharge_summary?: NullableStringFieldUpdateOperationsInput | string | null
    hospital_investigations?: NullableStringFieldUpdateOperationsInput | string | null
    hospital_medications?: NullableStringFieldUpdateOperationsInput | string | null
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    medical_leave?: NullableStringFieldUpdateOperationsInput | string | null
    therapeutic_procedures?: NullableStringFieldUpdateOperationsInput | string | null
    ward?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: XOR<MedicationListUpdateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ot?: OTUpdateManyWithoutAdmission_dischargeNestedInput
    registration?: RegistrationUpdateOneRequiredWithoutAdmission_DischargeNestedInput
  }

  export type Admission_DischargeUncheckedUpdateInput = {
    registration_id?: StringFieldUpdateOperationsInput | string
    admission_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    admission_mode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    discharge_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discharge_mode?: NullableStringFieldUpdateOperationsInput | string | null
    admission_plan?: NullableStringFieldUpdateOperationsInput | string | null
    bed_number?: NullableIntFieldUpdateOperationsInput | number | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    diagnostic_procedures?: NullableStringFieldUpdateOperationsInput | string | null
    discharge_instructions?: NullableStringFieldUpdateOperationsInput | string | null
    discharge_medications?: InputJsonValue | InputJsonValue | null
    discharge_summary?: NullableStringFieldUpdateOperationsInput | string | null
    hospital_investigations?: NullableStringFieldUpdateOperationsInput | string | null
    hospital_medications?: NullableStringFieldUpdateOperationsInput | string | null
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    medical_leave?: NullableStringFieldUpdateOperationsInput | string | null
    therapeutic_procedures?: NullableStringFieldUpdateOperationsInput | string | null
    ward?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: XOR<MedicationListUpdateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ot?: OTUncheckedUpdateManyWithoutAdmission_dischargeNestedInput
  }

  export type Admission_DischargeCreateManyInput = {
    admission_id?: string
    registration_id: string
    admission_date?: Date | string | null
    admission_mode?: string | null
    status: string
    discharge_date?: Date | string | null
    discharge_mode?: string | null
    admission_plan?: string | null
    bed_number?: number | null
    diagnosis?: string | null
    diagnostic_procedures?: string | null
    discharge_instructions?: string | null
    discharge_medications?: InputJsonValue | null
    discharge_summary?: string | null
    hospital_investigations?: string | null
    hospital_medications?: string | null
    instructions?: string | null
    medical_leave?: string | null
    therapeutic_procedures?: string | null
    ward?: string | null
    medications?: XOR<MedicationListCreateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type Admission_DischargeUpdateManyMutationInput = {
    admission_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    admission_mode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    discharge_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discharge_mode?: NullableStringFieldUpdateOperationsInput | string | null
    admission_plan?: NullableStringFieldUpdateOperationsInput | string | null
    bed_number?: NullableIntFieldUpdateOperationsInput | number | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    diagnostic_procedures?: NullableStringFieldUpdateOperationsInput | string | null
    discharge_instructions?: NullableStringFieldUpdateOperationsInput | string | null
    discharge_medications?: InputJsonValue | InputJsonValue | null
    discharge_summary?: NullableStringFieldUpdateOperationsInput | string | null
    hospital_investigations?: NullableStringFieldUpdateOperationsInput | string | null
    hospital_medications?: NullableStringFieldUpdateOperationsInput | string | null
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    medical_leave?: NullableStringFieldUpdateOperationsInput | string | null
    therapeutic_procedures?: NullableStringFieldUpdateOperationsInput | string | null
    ward?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: XOR<MedicationListUpdateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Admission_DischargeUncheckedUpdateManyInput = {
    registration_id?: StringFieldUpdateOperationsInput | string
    admission_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    admission_mode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    discharge_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discharge_mode?: NullableStringFieldUpdateOperationsInput | string | null
    admission_plan?: NullableStringFieldUpdateOperationsInput | string | null
    bed_number?: NullableIntFieldUpdateOperationsInput | number | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    diagnostic_procedures?: NullableStringFieldUpdateOperationsInput | string | null
    discharge_instructions?: NullableStringFieldUpdateOperationsInput | string | null
    discharge_medications?: InputJsonValue | InputJsonValue | null
    discharge_summary?: NullableStringFieldUpdateOperationsInput | string | null
    hospital_investigations?: NullableStringFieldUpdateOperationsInput | string | null
    hospital_medications?: NullableStringFieldUpdateOperationsInput | string | null
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    medical_leave?: NullableStringFieldUpdateOperationsInput | string | null
    therapeutic_procedures?: NullableStringFieldUpdateOperationsInput | string | null
    ward?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: XOR<MedicationListUpdateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OTCreateInput = {
    ot_id?: string
    surgery_date?: Date | string | null
    surgeon?: string | null
    assistant_1?: string | null
    assistant_2?: string | null
    assistant_3?: string | null
    anaesthetist?: string | null
    anaesthesia?: string | null
    procedure_name?: string | null
    findings?: string | null
    operative_details?: string | null
    closure?: string | null
    postop_instructions?: string | null
    finalize?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    admission_discharge: Admission_DischargeCreateNestedOneWithoutOtInput
    registration: RegistrationCreateNestedOneWithoutOTInput
  }

  export type OTUncheckedCreateInput = {
    ot_id?: string
    admission_id: string
    registration_id: string
    surgery_date?: Date | string | null
    surgeon?: string | null
    assistant_1?: string | null
    assistant_2?: string | null
    assistant_3?: string | null
    anaesthetist?: string | null
    anaesthesia?: string | null
    procedure_name?: string | null
    findings?: string | null
    operative_details?: string | null
    closure?: string | null
    postop_instructions?: string | null
    finalize?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OTUpdateInput = {
    surgery_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    surgeon?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_1?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_2?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_3?: NullableStringFieldUpdateOperationsInput | string | null
    anaesthetist?: NullableStringFieldUpdateOperationsInput | string | null
    anaesthesia?: NullableStringFieldUpdateOperationsInput | string | null
    procedure_name?: NullableStringFieldUpdateOperationsInput | string | null
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    operative_details?: NullableStringFieldUpdateOperationsInput | string | null
    closure?: NullableStringFieldUpdateOperationsInput | string | null
    postop_instructions?: NullableStringFieldUpdateOperationsInput | string | null
    finalize?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admission_discharge?: Admission_DischargeUpdateOneRequiredWithoutOtNestedInput
    registration?: RegistrationUpdateOneRequiredWithoutOTNestedInput
  }

  export type OTUncheckedUpdateInput = {
    admission_id?: StringFieldUpdateOperationsInput | string
    registration_id?: StringFieldUpdateOperationsInput | string
    surgery_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    surgeon?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_1?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_2?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_3?: NullableStringFieldUpdateOperationsInput | string | null
    anaesthetist?: NullableStringFieldUpdateOperationsInput | string | null
    anaesthesia?: NullableStringFieldUpdateOperationsInput | string | null
    procedure_name?: NullableStringFieldUpdateOperationsInput | string | null
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    operative_details?: NullableStringFieldUpdateOperationsInput | string | null
    closure?: NullableStringFieldUpdateOperationsInput | string | null
    postop_instructions?: NullableStringFieldUpdateOperationsInput | string | null
    finalize?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OTCreateManyInput = {
    ot_id?: string
    admission_id: string
    registration_id: string
    surgery_date?: Date | string | null
    surgeon?: string | null
    assistant_1?: string | null
    assistant_2?: string | null
    assistant_3?: string | null
    anaesthetist?: string | null
    anaesthesia?: string | null
    procedure_name?: string | null
    findings?: string | null
    operative_details?: string | null
    closure?: string | null
    postop_instructions?: string | null
    finalize?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OTUpdateManyMutationInput = {
    surgery_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    surgeon?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_1?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_2?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_3?: NullableStringFieldUpdateOperationsInput | string | null
    anaesthetist?: NullableStringFieldUpdateOperationsInput | string | null
    anaesthesia?: NullableStringFieldUpdateOperationsInput | string | null
    procedure_name?: NullableStringFieldUpdateOperationsInput | string | null
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    operative_details?: NullableStringFieldUpdateOperationsInput | string | null
    closure?: NullableStringFieldUpdateOperationsInput | string | null
    postop_instructions?: NullableStringFieldUpdateOperationsInput | string | null
    finalize?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OTUncheckedUpdateManyInput = {
    admission_id?: StringFieldUpdateOperationsInput | string
    registration_id?: StringFieldUpdateOperationsInput | string
    surgery_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    surgeon?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_1?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_2?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_3?: NullableStringFieldUpdateOperationsInput | string | null
    anaesthetist?: NullableStringFieldUpdateOperationsInput | string | null
    anaesthesia?: NullableStringFieldUpdateOperationsInput | string | null
    procedure_name?: NullableStringFieldUpdateOperationsInput | string | null
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    operative_details?: NullableStringFieldUpdateOperationsInput | string | null
    closure?: NullableStringFieldUpdateOperationsInput | string | null
    postop_instructions?: NullableStringFieldUpdateOperationsInput | string | null
    finalize?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateInput = {
    appointment_id?: string
    created_at?: Date | string
    date_appointment: Date | string
    notes: string
    plan: string
    status?: string
    type: string
    updated_at?: Date | string
    registration: RegistrationCreateNestedOneWithoutAppointmentInput
  }

  export type AppointmentUncheckedCreateInput = {
    appointment_id?: string
    created_at?: Date | string
    date_appointment: Date | string
    notes: string
    plan: string
    registration_id: string
    status?: string
    type: string
    updated_at?: Date | string
  }

  export type AppointmentUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    date_appointment?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    registration?: RegistrationUpdateOneRequiredWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    date_appointment?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    registration_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateManyInput = {
    appointment_id?: string
    created_at?: Date | string
    date_appointment: Date | string
    notes: string
    plan: string
    registration_id: string
    status?: string
    type: string
    updated_at?: Date | string
  }

  export type AppointmentUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    date_appointment?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    date_appointment?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    registration_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationCreateInput = {
    consultation_id?: string
    created_at?: Date | string
    diagnosis?: string | null
    examination?: string | null
    history?: string | null
    instructions?: InputJsonValue | null
    investigations?: string | null
    plan?: string | null
    medications?: XOR<MedicationListCreateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    status?: string | null
    updated_at?: Date | string
    visit_date: Date | string
    registration: RegistrationCreateNestedOneWithoutConsultationInput
  }

  export type ConsultationUncheckedCreateInput = {
    consultation_id?: string
    created_at?: Date | string
    diagnosis?: string | null
    examination?: string | null
    history?: string | null
    instructions?: InputJsonValue | null
    investigations?: string | null
    plan?: string | null
    medications?: XOR<MedicationListCreateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    status?: string | null
    registration_id: string
    updated_at?: Date | string
    visit_date: Date | string
  }

  export type ConsultationUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    examination?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    instructions?: InputJsonValue | InputJsonValue | null
    investigations?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: XOR<MedicationListUpdateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    status?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
    registration?: RegistrationUpdateOneRequiredWithoutConsultationNestedInput
  }

  export type ConsultationUncheckedUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    examination?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    instructions?: InputJsonValue | InputJsonValue | null
    investigations?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: XOR<MedicationListUpdateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    status?: NullableStringFieldUpdateOperationsInput | string | null
    registration_id?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationCreateManyInput = {
    consultation_id?: string
    created_at?: Date | string
    diagnosis?: string | null
    examination?: string | null
    history?: string | null
    instructions?: InputJsonValue | null
    investigations?: string | null
    plan?: string | null
    medications?: XOR<MedicationListCreateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    status?: string | null
    registration_id: string
    updated_at?: Date | string
    visit_date: Date | string
  }

  export type ConsultationUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    examination?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    instructions?: InputJsonValue | InputJsonValue | null
    investigations?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: XOR<MedicationListUpdateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    status?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationUncheckedUpdateManyInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    examination?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    instructions?: InputJsonValue | InputJsonValue | null
    investigations?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: XOR<MedicationListUpdateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    status?: NullableStringFieldUpdateOperationsInput | string | null
    registration_id?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistrationCreateInput = {
    registration_id?: string
    code: string
    created_at?: Date | string
    first_name: string
    gender: string
    last_name: string
    mr_number: string
    phone_number?: string | null
    date_of_birth?: Date | string | null
    updated_at?: Date | string
    Consultation?: ConsultationCreateNestedManyWithoutRegistrationInput
    Appointment?: AppointmentCreateNestedManyWithoutRegistrationInput
    Admission_Discharge?: Admission_DischargeCreateNestedManyWithoutRegistrationInput
    OT?: OTCreateNestedManyWithoutRegistrationInput
  }

  export type RegistrationUncheckedCreateInput = {
    registration_id?: string
    code: string
    created_at?: Date | string
    first_name: string
    gender: string
    last_name: string
    mr_number: string
    phone_number?: string | null
    date_of_birth?: Date | string | null
    updated_at?: Date | string
    Consultation?: ConsultationUncheckedCreateNestedManyWithoutRegistrationInput
    Appointment?: AppointmentUncheckedCreateNestedManyWithoutRegistrationInput
    Admission_Discharge?: Admission_DischargeUncheckedCreateNestedManyWithoutRegistrationInput
    OT?: OTUncheckedCreateNestedManyWithoutRegistrationInput
  }

  export type RegistrationUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    first_name?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    mr_number?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    Consultation?: ConsultationUpdateManyWithoutRegistrationNestedInput
    Appointment?: AppointmentUpdateManyWithoutRegistrationNestedInput
    Admission_Discharge?: Admission_DischargeUpdateManyWithoutRegistrationNestedInput
    OT?: OTUpdateManyWithoutRegistrationNestedInput
  }

  export type RegistrationUncheckedUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    first_name?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    mr_number?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    Consultation?: ConsultationUncheckedUpdateManyWithoutRegistrationNestedInput
    Appointment?: AppointmentUncheckedUpdateManyWithoutRegistrationNestedInput
    Admission_Discharge?: Admission_DischargeUncheckedUpdateManyWithoutRegistrationNestedInput
    OT?: OTUncheckedUpdateManyWithoutRegistrationNestedInput
  }

  export type RegistrationCreateManyInput = {
    registration_id?: string
    code: string
    created_at?: Date | string
    first_name: string
    gender: string
    last_name: string
    mr_number: string
    phone_number?: string | null
    date_of_birth?: Date | string | null
    updated_at?: Date | string
  }

  export type RegistrationUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    first_name?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    mr_number?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistrationUncheckedUpdateManyInput = {
    code?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    first_name?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    mr_number?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    password?: string | null
    role?: string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    password?: string | null
    role?: string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email?: string | null
    password?: string | null
    role?: string
    emailVerified?: Date | string | null
    image?: string | null
  }

  export type UserUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    id?: string
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    id?: string
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    id?: string
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    isSet?: boolean
  }

  export type MedicationCompositeListFilter = {
    equals?: MedicationObjectEqualityInput[]
    every?: MedicationWhereInput
    some?: MedicationWhereInput
    none?: MedicationWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type MedicationObjectEqualityInput = {
    drug_name: string
    drug_dose: string
    amount: number
    drug_form?: string | null
    frequency?: string | null
    duration?: number | null
    instructions?: string | null
    route?: string | null
    interval?: string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type OTListRelationFilter = {
    every?: OTWhereInput
    some?: OTWhereInput
    none?: OTWhereInput
  }

  export type RegistrationScalarRelationFilter = {
    is?: RegistrationWhereInput
    isNot?: RegistrationWhereInput
  }

  export type MedicationOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type OTOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type Admission_DischargeCountOrderByAggregateInput = {
    admission_id?: SortOrder
    registration_id?: SortOrder
    admission_date?: SortOrder
    admission_mode?: SortOrder
    status?: SortOrder
    discharge_date?: SortOrder
    discharge_mode?: SortOrder
    admission_plan?: SortOrder
    bed_number?: SortOrder
    diagnosis?: SortOrder
    diagnostic_procedures?: SortOrder
    discharge_instructions?: SortOrder
    discharge_medications?: SortOrder
    discharge_summary?: SortOrder
    hospital_investigations?: SortOrder
    hospital_medications?: SortOrder
    instructions?: SortOrder
    medical_leave?: SortOrder
    therapeutic_procedures?: SortOrder
    ward?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type Admission_DischargeAvgOrderByAggregateInput = {
    bed_number?: SortOrder
  }

  export type Admission_DischargeMaxOrderByAggregateInput = {
    admission_id?: SortOrder
    registration_id?: SortOrder
    admission_date?: SortOrder
    admission_mode?: SortOrder
    status?: SortOrder
    discharge_date?: SortOrder
    discharge_mode?: SortOrder
    admission_plan?: SortOrder
    bed_number?: SortOrder
    diagnosis?: SortOrder
    diagnostic_procedures?: SortOrder
    discharge_instructions?: SortOrder
    discharge_summary?: SortOrder
    hospital_investigations?: SortOrder
    hospital_medications?: SortOrder
    instructions?: SortOrder
    medical_leave?: SortOrder
    therapeutic_procedures?: SortOrder
    ward?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type Admission_DischargeMinOrderByAggregateInput = {
    admission_id?: SortOrder
    registration_id?: SortOrder
    admission_date?: SortOrder
    admission_mode?: SortOrder
    status?: SortOrder
    discharge_date?: SortOrder
    discharge_mode?: SortOrder
    admission_plan?: SortOrder
    bed_number?: SortOrder
    diagnosis?: SortOrder
    diagnostic_procedures?: SortOrder
    discharge_instructions?: SortOrder
    discharge_summary?: SortOrder
    hospital_investigations?: SortOrder
    hospital_medications?: SortOrder
    instructions?: SortOrder
    medical_leave?: SortOrder
    therapeutic_procedures?: SortOrder
    ward?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type Admission_DischargeSumOrderByAggregateInput = {
    bed_number?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type Admission_DischargeScalarRelationFilter = {
    is?: Admission_DischargeWhereInput
    isNot?: Admission_DischargeWhereInput
  }

  export type OTCountOrderByAggregateInput = {
    ot_id?: SortOrder
    admission_id?: SortOrder
    registration_id?: SortOrder
    surgery_date?: SortOrder
    surgeon?: SortOrder
    assistant_1?: SortOrder
    assistant_2?: SortOrder
    assistant_3?: SortOrder
    anaesthetist?: SortOrder
    anaesthesia?: SortOrder
    procedure_name?: SortOrder
    findings?: SortOrder
    operative_details?: SortOrder
    closure?: SortOrder
    postop_instructions?: SortOrder
    finalize?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OTAvgOrderByAggregateInput = {
    finalize?: SortOrder
  }

  export type OTMaxOrderByAggregateInput = {
    ot_id?: SortOrder
    admission_id?: SortOrder
    registration_id?: SortOrder
    surgery_date?: SortOrder
    surgeon?: SortOrder
    assistant_1?: SortOrder
    assistant_2?: SortOrder
    assistant_3?: SortOrder
    anaesthetist?: SortOrder
    anaesthesia?: SortOrder
    procedure_name?: SortOrder
    findings?: SortOrder
    operative_details?: SortOrder
    closure?: SortOrder
    postop_instructions?: SortOrder
    finalize?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OTMinOrderByAggregateInput = {
    ot_id?: SortOrder
    admission_id?: SortOrder
    registration_id?: SortOrder
    surgery_date?: SortOrder
    surgeon?: SortOrder
    assistant_1?: SortOrder
    assistant_2?: SortOrder
    assistant_3?: SortOrder
    anaesthetist?: SortOrder
    anaesthesia?: SortOrder
    procedure_name?: SortOrder
    findings?: SortOrder
    operative_details?: SortOrder
    closure?: SortOrder
    postop_instructions?: SortOrder
    finalize?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OTSumOrderByAggregateInput = {
    finalize?: SortOrder
  }

  export type AppointmentCountOrderByAggregateInput = {
    appointment_id?: SortOrder
    created_at?: SortOrder
    date_appointment?: SortOrder
    notes?: SortOrder
    plan?: SortOrder
    registration_id?: SortOrder
    status?: SortOrder
    type?: SortOrder
    updated_at?: SortOrder
  }

  export type AppointmentMaxOrderByAggregateInput = {
    appointment_id?: SortOrder
    created_at?: SortOrder
    date_appointment?: SortOrder
    notes?: SortOrder
    plan?: SortOrder
    registration_id?: SortOrder
    status?: SortOrder
    type?: SortOrder
    updated_at?: SortOrder
  }

  export type AppointmentMinOrderByAggregateInput = {
    appointment_id?: SortOrder
    created_at?: SortOrder
    date_appointment?: SortOrder
    notes?: SortOrder
    plan?: SortOrder
    registration_id?: SortOrder
    status?: SortOrder
    type?: SortOrder
    updated_at?: SortOrder
  }

  export type ConsultationCountOrderByAggregateInput = {
    consultation_id?: SortOrder
    created_at?: SortOrder
    diagnosis?: SortOrder
    examination?: SortOrder
    history?: SortOrder
    instructions?: SortOrder
    investigations?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    registration_id?: SortOrder
    updated_at?: SortOrder
    visit_date?: SortOrder
  }

  export type ConsultationMaxOrderByAggregateInput = {
    consultation_id?: SortOrder
    created_at?: SortOrder
    diagnosis?: SortOrder
    examination?: SortOrder
    history?: SortOrder
    investigations?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    registration_id?: SortOrder
    updated_at?: SortOrder
    visit_date?: SortOrder
  }

  export type ConsultationMinOrderByAggregateInput = {
    consultation_id?: SortOrder
    created_at?: SortOrder
    diagnosis?: SortOrder
    examination?: SortOrder
    history?: SortOrder
    investigations?: SortOrder
    plan?: SortOrder
    status?: SortOrder
    registration_id?: SortOrder
    updated_at?: SortOrder
    visit_date?: SortOrder
  }

  export type ConsultationListRelationFilter = {
    every?: ConsultationWhereInput
    some?: ConsultationWhereInput
    none?: ConsultationWhereInput
  }

  export type AppointmentListRelationFilter = {
    every?: AppointmentWhereInput
    some?: AppointmentWhereInput
    none?: AppointmentWhereInput
  }

  export type Admission_DischargeListRelationFilter = {
    every?: Admission_DischargeWhereInput
    some?: Admission_DischargeWhereInput
    none?: Admission_DischargeWhereInput
  }

  export type ConsultationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppointmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type Admission_DischargeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RegistrationCountOrderByAggregateInput = {
    registration_id?: SortOrder
    code?: SortOrder
    created_at?: SortOrder
    first_name?: SortOrder
    gender?: SortOrder
    last_name?: SortOrder
    mr_number?: SortOrder
    phone_number?: SortOrder
    date_of_birth?: SortOrder
    updated_at?: SortOrder
  }

  export type RegistrationMaxOrderByAggregateInput = {
    registration_id?: SortOrder
    code?: SortOrder
    created_at?: SortOrder
    first_name?: SortOrder
    gender?: SortOrder
    last_name?: SortOrder
    mr_number?: SortOrder
    phone_number?: SortOrder
    date_of_birth?: SortOrder
    updated_at?: SortOrder
  }

  export type RegistrationMinOrderByAggregateInput = {
    registration_id?: SortOrder
    code?: SortOrder
    created_at?: SortOrder
    first_name?: SortOrder
    gender?: SortOrder
    last_name?: SortOrder
    mr_number?: SortOrder
    phone_number?: SortOrder
    date_of_birth?: SortOrder
    updated_at?: SortOrder
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type MedicationListCreateEnvelopeInput = {
    set?: MedicationCreateInput | MedicationCreateInput[]
  }

  export type MedicationCreateInput = {
    drug_name: string
    drug_dose: string
    amount: number
    drug_form?: string | null
    frequency?: string | null
    duration?: number | null
    instructions?: string | null
    route?: string | null
    interval?: string | null
  }

  export type OTCreateNestedManyWithoutAdmission_dischargeInput = {
    create?: XOR<OTCreateWithoutAdmission_dischargeInput, OTUncheckedCreateWithoutAdmission_dischargeInput> | OTCreateWithoutAdmission_dischargeInput[] | OTUncheckedCreateWithoutAdmission_dischargeInput[]
    connectOrCreate?: OTCreateOrConnectWithoutAdmission_dischargeInput | OTCreateOrConnectWithoutAdmission_dischargeInput[]
    createMany?: OTCreateManyAdmission_dischargeInputEnvelope
    connect?: OTWhereUniqueInput | OTWhereUniqueInput[]
  }

  export type RegistrationCreateNestedOneWithoutAdmission_DischargeInput = {
    create?: XOR<RegistrationCreateWithoutAdmission_DischargeInput, RegistrationUncheckedCreateWithoutAdmission_DischargeInput>
    connectOrCreate?: RegistrationCreateOrConnectWithoutAdmission_DischargeInput
    connect?: RegistrationWhereUniqueInput
  }

  export type OTUncheckedCreateNestedManyWithoutAdmission_dischargeInput = {
    create?: XOR<OTCreateWithoutAdmission_dischargeInput, OTUncheckedCreateWithoutAdmission_dischargeInput> | OTCreateWithoutAdmission_dischargeInput[] | OTUncheckedCreateWithoutAdmission_dischargeInput[]
    connectOrCreate?: OTCreateOrConnectWithoutAdmission_dischargeInput | OTCreateOrConnectWithoutAdmission_dischargeInput[]
    createMany?: OTCreateManyAdmission_dischargeInputEnvelope
    connect?: OTWhereUniqueInput | OTWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type MedicationListUpdateEnvelopeInput = {
    set?: MedicationCreateInput | MedicationCreateInput[]
    push?: MedicationCreateInput | MedicationCreateInput[]
    updateMany?: MedicationUpdateManyInput
    deleteMany?: MedicationDeleteManyInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type OTUpdateManyWithoutAdmission_dischargeNestedInput = {
    create?: XOR<OTCreateWithoutAdmission_dischargeInput, OTUncheckedCreateWithoutAdmission_dischargeInput> | OTCreateWithoutAdmission_dischargeInput[] | OTUncheckedCreateWithoutAdmission_dischargeInput[]
    connectOrCreate?: OTCreateOrConnectWithoutAdmission_dischargeInput | OTCreateOrConnectWithoutAdmission_dischargeInput[]
    upsert?: OTUpsertWithWhereUniqueWithoutAdmission_dischargeInput | OTUpsertWithWhereUniqueWithoutAdmission_dischargeInput[]
    createMany?: OTCreateManyAdmission_dischargeInputEnvelope
    set?: OTWhereUniqueInput | OTWhereUniqueInput[]
    disconnect?: OTWhereUniqueInput | OTWhereUniqueInput[]
    delete?: OTWhereUniqueInput | OTWhereUniqueInput[]
    connect?: OTWhereUniqueInput | OTWhereUniqueInput[]
    update?: OTUpdateWithWhereUniqueWithoutAdmission_dischargeInput | OTUpdateWithWhereUniqueWithoutAdmission_dischargeInput[]
    updateMany?: OTUpdateManyWithWhereWithoutAdmission_dischargeInput | OTUpdateManyWithWhereWithoutAdmission_dischargeInput[]
    deleteMany?: OTScalarWhereInput | OTScalarWhereInput[]
  }

  export type RegistrationUpdateOneRequiredWithoutAdmission_DischargeNestedInput = {
    create?: XOR<RegistrationCreateWithoutAdmission_DischargeInput, RegistrationUncheckedCreateWithoutAdmission_DischargeInput>
    connectOrCreate?: RegistrationCreateOrConnectWithoutAdmission_DischargeInput
    upsert?: RegistrationUpsertWithoutAdmission_DischargeInput
    connect?: RegistrationWhereUniqueInput
    update?: XOR<XOR<RegistrationUpdateToOneWithWhereWithoutAdmission_DischargeInput, RegistrationUpdateWithoutAdmission_DischargeInput>, RegistrationUncheckedUpdateWithoutAdmission_DischargeInput>
  }

  export type OTUncheckedUpdateManyWithoutAdmission_dischargeNestedInput = {
    create?: XOR<OTCreateWithoutAdmission_dischargeInput, OTUncheckedCreateWithoutAdmission_dischargeInput> | OTCreateWithoutAdmission_dischargeInput[] | OTUncheckedCreateWithoutAdmission_dischargeInput[]
    connectOrCreate?: OTCreateOrConnectWithoutAdmission_dischargeInput | OTCreateOrConnectWithoutAdmission_dischargeInput[]
    upsert?: OTUpsertWithWhereUniqueWithoutAdmission_dischargeInput | OTUpsertWithWhereUniqueWithoutAdmission_dischargeInput[]
    createMany?: OTCreateManyAdmission_dischargeInputEnvelope
    set?: OTWhereUniqueInput | OTWhereUniqueInput[]
    disconnect?: OTWhereUniqueInput | OTWhereUniqueInput[]
    delete?: OTWhereUniqueInput | OTWhereUniqueInput[]
    connect?: OTWhereUniqueInput | OTWhereUniqueInput[]
    update?: OTUpdateWithWhereUniqueWithoutAdmission_dischargeInput | OTUpdateWithWhereUniqueWithoutAdmission_dischargeInput[]
    updateMany?: OTUpdateManyWithWhereWithoutAdmission_dischargeInput | OTUpdateManyWithWhereWithoutAdmission_dischargeInput[]
    deleteMany?: OTScalarWhereInput | OTScalarWhereInput[]
  }

  export type Admission_DischargeCreateNestedOneWithoutOtInput = {
    create?: XOR<Admission_DischargeCreateWithoutOtInput, Admission_DischargeUncheckedCreateWithoutOtInput>
    connectOrCreate?: Admission_DischargeCreateOrConnectWithoutOtInput
    connect?: Admission_DischargeWhereUniqueInput
  }

  export type RegistrationCreateNestedOneWithoutOTInput = {
    create?: XOR<RegistrationCreateWithoutOTInput, RegistrationUncheckedCreateWithoutOTInput>
    connectOrCreate?: RegistrationCreateOrConnectWithoutOTInput
    connect?: RegistrationWhereUniqueInput
  }

  export type Admission_DischargeUpdateOneRequiredWithoutOtNestedInput = {
    create?: XOR<Admission_DischargeCreateWithoutOtInput, Admission_DischargeUncheckedCreateWithoutOtInput>
    connectOrCreate?: Admission_DischargeCreateOrConnectWithoutOtInput
    upsert?: Admission_DischargeUpsertWithoutOtInput
    connect?: Admission_DischargeWhereUniqueInput
    update?: XOR<XOR<Admission_DischargeUpdateToOneWithWhereWithoutOtInput, Admission_DischargeUpdateWithoutOtInput>, Admission_DischargeUncheckedUpdateWithoutOtInput>
  }

  export type RegistrationUpdateOneRequiredWithoutOTNestedInput = {
    create?: XOR<RegistrationCreateWithoutOTInput, RegistrationUncheckedCreateWithoutOTInput>
    connectOrCreate?: RegistrationCreateOrConnectWithoutOTInput
    upsert?: RegistrationUpsertWithoutOTInput
    connect?: RegistrationWhereUniqueInput
    update?: XOR<XOR<RegistrationUpdateToOneWithWhereWithoutOTInput, RegistrationUpdateWithoutOTInput>, RegistrationUncheckedUpdateWithoutOTInput>
  }

  export type RegistrationCreateNestedOneWithoutAppointmentInput = {
    create?: XOR<RegistrationCreateWithoutAppointmentInput, RegistrationUncheckedCreateWithoutAppointmentInput>
    connectOrCreate?: RegistrationCreateOrConnectWithoutAppointmentInput
    connect?: RegistrationWhereUniqueInput
  }

  export type RegistrationUpdateOneRequiredWithoutAppointmentNestedInput = {
    create?: XOR<RegistrationCreateWithoutAppointmentInput, RegistrationUncheckedCreateWithoutAppointmentInput>
    connectOrCreate?: RegistrationCreateOrConnectWithoutAppointmentInput
    upsert?: RegistrationUpsertWithoutAppointmentInput
    connect?: RegistrationWhereUniqueInput
    update?: XOR<XOR<RegistrationUpdateToOneWithWhereWithoutAppointmentInput, RegistrationUpdateWithoutAppointmentInput>, RegistrationUncheckedUpdateWithoutAppointmentInput>
  }

  export type RegistrationCreateNestedOneWithoutConsultationInput = {
    create?: XOR<RegistrationCreateWithoutConsultationInput, RegistrationUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: RegistrationCreateOrConnectWithoutConsultationInput
    connect?: RegistrationWhereUniqueInput
  }

  export type RegistrationUpdateOneRequiredWithoutConsultationNestedInput = {
    create?: XOR<RegistrationCreateWithoutConsultationInput, RegistrationUncheckedCreateWithoutConsultationInput>
    connectOrCreate?: RegistrationCreateOrConnectWithoutConsultationInput
    upsert?: RegistrationUpsertWithoutConsultationInput
    connect?: RegistrationWhereUniqueInput
    update?: XOR<XOR<RegistrationUpdateToOneWithWhereWithoutConsultationInput, RegistrationUpdateWithoutConsultationInput>, RegistrationUncheckedUpdateWithoutConsultationInput>
  }

  export type ConsultationCreateNestedManyWithoutRegistrationInput = {
    create?: XOR<ConsultationCreateWithoutRegistrationInput, ConsultationUncheckedCreateWithoutRegistrationInput> | ConsultationCreateWithoutRegistrationInput[] | ConsultationUncheckedCreateWithoutRegistrationInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutRegistrationInput | ConsultationCreateOrConnectWithoutRegistrationInput[]
    createMany?: ConsultationCreateManyRegistrationInputEnvelope
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
  }

  export type AppointmentCreateNestedManyWithoutRegistrationInput = {
    create?: XOR<AppointmentCreateWithoutRegistrationInput, AppointmentUncheckedCreateWithoutRegistrationInput> | AppointmentCreateWithoutRegistrationInput[] | AppointmentUncheckedCreateWithoutRegistrationInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutRegistrationInput | AppointmentCreateOrConnectWithoutRegistrationInput[]
    createMany?: AppointmentCreateManyRegistrationInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type Admission_DischargeCreateNestedManyWithoutRegistrationInput = {
    create?: XOR<Admission_DischargeCreateWithoutRegistrationInput, Admission_DischargeUncheckedCreateWithoutRegistrationInput> | Admission_DischargeCreateWithoutRegistrationInput[] | Admission_DischargeUncheckedCreateWithoutRegistrationInput[]
    connectOrCreate?: Admission_DischargeCreateOrConnectWithoutRegistrationInput | Admission_DischargeCreateOrConnectWithoutRegistrationInput[]
    createMany?: Admission_DischargeCreateManyRegistrationInputEnvelope
    connect?: Admission_DischargeWhereUniqueInput | Admission_DischargeWhereUniqueInput[]
  }

  export type OTCreateNestedManyWithoutRegistrationInput = {
    create?: XOR<OTCreateWithoutRegistrationInput, OTUncheckedCreateWithoutRegistrationInput> | OTCreateWithoutRegistrationInput[] | OTUncheckedCreateWithoutRegistrationInput[]
    connectOrCreate?: OTCreateOrConnectWithoutRegistrationInput | OTCreateOrConnectWithoutRegistrationInput[]
    createMany?: OTCreateManyRegistrationInputEnvelope
    connect?: OTWhereUniqueInput | OTWhereUniqueInput[]
  }

  export type ConsultationUncheckedCreateNestedManyWithoutRegistrationInput = {
    create?: XOR<ConsultationCreateWithoutRegistrationInput, ConsultationUncheckedCreateWithoutRegistrationInput> | ConsultationCreateWithoutRegistrationInput[] | ConsultationUncheckedCreateWithoutRegistrationInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutRegistrationInput | ConsultationCreateOrConnectWithoutRegistrationInput[]
    createMany?: ConsultationCreateManyRegistrationInputEnvelope
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutRegistrationInput = {
    create?: XOR<AppointmentCreateWithoutRegistrationInput, AppointmentUncheckedCreateWithoutRegistrationInput> | AppointmentCreateWithoutRegistrationInput[] | AppointmentUncheckedCreateWithoutRegistrationInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutRegistrationInput | AppointmentCreateOrConnectWithoutRegistrationInput[]
    createMany?: AppointmentCreateManyRegistrationInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type Admission_DischargeUncheckedCreateNestedManyWithoutRegistrationInput = {
    create?: XOR<Admission_DischargeCreateWithoutRegistrationInput, Admission_DischargeUncheckedCreateWithoutRegistrationInput> | Admission_DischargeCreateWithoutRegistrationInput[] | Admission_DischargeUncheckedCreateWithoutRegistrationInput[]
    connectOrCreate?: Admission_DischargeCreateOrConnectWithoutRegistrationInput | Admission_DischargeCreateOrConnectWithoutRegistrationInput[]
    createMany?: Admission_DischargeCreateManyRegistrationInputEnvelope
    connect?: Admission_DischargeWhereUniqueInput | Admission_DischargeWhereUniqueInput[]
  }

  export type OTUncheckedCreateNestedManyWithoutRegistrationInput = {
    create?: XOR<OTCreateWithoutRegistrationInput, OTUncheckedCreateWithoutRegistrationInput> | OTCreateWithoutRegistrationInput[] | OTUncheckedCreateWithoutRegistrationInput[]
    connectOrCreate?: OTCreateOrConnectWithoutRegistrationInput | OTCreateOrConnectWithoutRegistrationInput[]
    createMany?: OTCreateManyRegistrationInputEnvelope
    connect?: OTWhereUniqueInput | OTWhereUniqueInput[]
  }

  export type ConsultationUpdateManyWithoutRegistrationNestedInput = {
    create?: XOR<ConsultationCreateWithoutRegistrationInput, ConsultationUncheckedCreateWithoutRegistrationInput> | ConsultationCreateWithoutRegistrationInput[] | ConsultationUncheckedCreateWithoutRegistrationInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutRegistrationInput | ConsultationCreateOrConnectWithoutRegistrationInput[]
    upsert?: ConsultationUpsertWithWhereUniqueWithoutRegistrationInput | ConsultationUpsertWithWhereUniqueWithoutRegistrationInput[]
    createMany?: ConsultationCreateManyRegistrationInputEnvelope
    set?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    disconnect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    delete?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    update?: ConsultationUpdateWithWhereUniqueWithoutRegistrationInput | ConsultationUpdateWithWhereUniqueWithoutRegistrationInput[]
    updateMany?: ConsultationUpdateManyWithWhereWithoutRegistrationInput | ConsultationUpdateManyWithWhereWithoutRegistrationInput[]
    deleteMany?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
  }

  export type AppointmentUpdateManyWithoutRegistrationNestedInput = {
    create?: XOR<AppointmentCreateWithoutRegistrationInput, AppointmentUncheckedCreateWithoutRegistrationInput> | AppointmentCreateWithoutRegistrationInput[] | AppointmentUncheckedCreateWithoutRegistrationInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutRegistrationInput | AppointmentCreateOrConnectWithoutRegistrationInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutRegistrationInput | AppointmentUpsertWithWhereUniqueWithoutRegistrationInput[]
    createMany?: AppointmentCreateManyRegistrationInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutRegistrationInput | AppointmentUpdateWithWhereUniqueWithoutRegistrationInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutRegistrationInput | AppointmentUpdateManyWithWhereWithoutRegistrationInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type Admission_DischargeUpdateManyWithoutRegistrationNestedInput = {
    create?: XOR<Admission_DischargeCreateWithoutRegistrationInput, Admission_DischargeUncheckedCreateWithoutRegistrationInput> | Admission_DischargeCreateWithoutRegistrationInput[] | Admission_DischargeUncheckedCreateWithoutRegistrationInput[]
    connectOrCreate?: Admission_DischargeCreateOrConnectWithoutRegistrationInput | Admission_DischargeCreateOrConnectWithoutRegistrationInput[]
    upsert?: Admission_DischargeUpsertWithWhereUniqueWithoutRegistrationInput | Admission_DischargeUpsertWithWhereUniqueWithoutRegistrationInput[]
    createMany?: Admission_DischargeCreateManyRegistrationInputEnvelope
    set?: Admission_DischargeWhereUniqueInput | Admission_DischargeWhereUniqueInput[]
    disconnect?: Admission_DischargeWhereUniqueInput | Admission_DischargeWhereUniqueInput[]
    delete?: Admission_DischargeWhereUniqueInput | Admission_DischargeWhereUniqueInput[]
    connect?: Admission_DischargeWhereUniqueInput | Admission_DischargeWhereUniqueInput[]
    update?: Admission_DischargeUpdateWithWhereUniqueWithoutRegistrationInput | Admission_DischargeUpdateWithWhereUniqueWithoutRegistrationInput[]
    updateMany?: Admission_DischargeUpdateManyWithWhereWithoutRegistrationInput | Admission_DischargeUpdateManyWithWhereWithoutRegistrationInput[]
    deleteMany?: Admission_DischargeScalarWhereInput | Admission_DischargeScalarWhereInput[]
  }

  export type OTUpdateManyWithoutRegistrationNestedInput = {
    create?: XOR<OTCreateWithoutRegistrationInput, OTUncheckedCreateWithoutRegistrationInput> | OTCreateWithoutRegistrationInput[] | OTUncheckedCreateWithoutRegistrationInput[]
    connectOrCreate?: OTCreateOrConnectWithoutRegistrationInput | OTCreateOrConnectWithoutRegistrationInput[]
    upsert?: OTUpsertWithWhereUniqueWithoutRegistrationInput | OTUpsertWithWhereUniqueWithoutRegistrationInput[]
    createMany?: OTCreateManyRegistrationInputEnvelope
    set?: OTWhereUniqueInput | OTWhereUniqueInput[]
    disconnect?: OTWhereUniqueInput | OTWhereUniqueInput[]
    delete?: OTWhereUniqueInput | OTWhereUniqueInput[]
    connect?: OTWhereUniqueInput | OTWhereUniqueInput[]
    update?: OTUpdateWithWhereUniqueWithoutRegistrationInput | OTUpdateWithWhereUniqueWithoutRegistrationInput[]
    updateMany?: OTUpdateManyWithWhereWithoutRegistrationInput | OTUpdateManyWithWhereWithoutRegistrationInput[]
    deleteMany?: OTScalarWhereInput | OTScalarWhereInput[]
  }

  export type ConsultationUncheckedUpdateManyWithoutRegistrationNestedInput = {
    create?: XOR<ConsultationCreateWithoutRegistrationInput, ConsultationUncheckedCreateWithoutRegistrationInput> | ConsultationCreateWithoutRegistrationInput[] | ConsultationUncheckedCreateWithoutRegistrationInput[]
    connectOrCreate?: ConsultationCreateOrConnectWithoutRegistrationInput | ConsultationCreateOrConnectWithoutRegistrationInput[]
    upsert?: ConsultationUpsertWithWhereUniqueWithoutRegistrationInput | ConsultationUpsertWithWhereUniqueWithoutRegistrationInput[]
    createMany?: ConsultationCreateManyRegistrationInputEnvelope
    set?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    disconnect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    delete?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    connect?: ConsultationWhereUniqueInput | ConsultationWhereUniqueInput[]
    update?: ConsultationUpdateWithWhereUniqueWithoutRegistrationInput | ConsultationUpdateWithWhereUniqueWithoutRegistrationInput[]
    updateMany?: ConsultationUpdateManyWithWhereWithoutRegistrationInput | ConsultationUpdateManyWithWhereWithoutRegistrationInput[]
    deleteMany?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutRegistrationNestedInput = {
    create?: XOR<AppointmentCreateWithoutRegistrationInput, AppointmentUncheckedCreateWithoutRegistrationInput> | AppointmentCreateWithoutRegistrationInput[] | AppointmentUncheckedCreateWithoutRegistrationInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutRegistrationInput | AppointmentCreateOrConnectWithoutRegistrationInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutRegistrationInput | AppointmentUpsertWithWhereUniqueWithoutRegistrationInput[]
    createMany?: AppointmentCreateManyRegistrationInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutRegistrationInput | AppointmentUpdateWithWhereUniqueWithoutRegistrationInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutRegistrationInput | AppointmentUpdateManyWithWhereWithoutRegistrationInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type Admission_DischargeUncheckedUpdateManyWithoutRegistrationNestedInput = {
    create?: XOR<Admission_DischargeCreateWithoutRegistrationInput, Admission_DischargeUncheckedCreateWithoutRegistrationInput> | Admission_DischargeCreateWithoutRegistrationInput[] | Admission_DischargeUncheckedCreateWithoutRegistrationInput[]
    connectOrCreate?: Admission_DischargeCreateOrConnectWithoutRegistrationInput | Admission_DischargeCreateOrConnectWithoutRegistrationInput[]
    upsert?: Admission_DischargeUpsertWithWhereUniqueWithoutRegistrationInput | Admission_DischargeUpsertWithWhereUniqueWithoutRegistrationInput[]
    createMany?: Admission_DischargeCreateManyRegistrationInputEnvelope
    set?: Admission_DischargeWhereUniqueInput | Admission_DischargeWhereUniqueInput[]
    disconnect?: Admission_DischargeWhereUniqueInput | Admission_DischargeWhereUniqueInput[]
    delete?: Admission_DischargeWhereUniqueInput | Admission_DischargeWhereUniqueInput[]
    connect?: Admission_DischargeWhereUniqueInput | Admission_DischargeWhereUniqueInput[]
    update?: Admission_DischargeUpdateWithWhereUniqueWithoutRegistrationInput | Admission_DischargeUpdateWithWhereUniqueWithoutRegistrationInput[]
    updateMany?: Admission_DischargeUpdateManyWithWhereWithoutRegistrationInput | Admission_DischargeUpdateManyWithWhereWithoutRegistrationInput[]
    deleteMany?: Admission_DischargeScalarWhereInput | Admission_DischargeScalarWhereInput[]
  }

  export type OTUncheckedUpdateManyWithoutRegistrationNestedInput = {
    create?: XOR<OTCreateWithoutRegistrationInput, OTUncheckedCreateWithoutRegistrationInput> | OTCreateWithoutRegistrationInput[] | OTUncheckedCreateWithoutRegistrationInput[]
    connectOrCreate?: OTCreateOrConnectWithoutRegistrationInput | OTCreateOrConnectWithoutRegistrationInput[]
    upsert?: OTUpsertWithWhereUniqueWithoutRegistrationInput | OTUpsertWithWhereUniqueWithoutRegistrationInput[]
    createMany?: OTCreateManyRegistrationInputEnvelope
    set?: OTWhereUniqueInput | OTWhereUniqueInput[]
    disconnect?: OTWhereUniqueInput | OTWhereUniqueInput[]
    delete?: OTWhereUniqueInput | OTWhereUniqueInput[]
    connect?: OTWhereUniqueInput | OTWhereUniqueInput[]
    update?: OTUpdateWithWhereUniqueWithoutRegistrationInput | OTUpdateWithWhereUniqueWithoutRegistrationInput[]
    updateMany?: OTUpdateManyWithWhereWithoutRegistrationInput | OTUpdateManyWithWhereWithoutRegistrationInput[]
    deleteMany?: OTScalarWhereInput | OTScalarWhereInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type MedicationWhereInput = {
    AND?: MedicationWhereInput | MedicationWhereInput[]
    OR?: MedicationWhereInput[]
    NOT?: MedicationWhereInput | MedicationWhereInput[]
    drug_name?: StringFilter<"Medication"> | string
    drug_dose?: StringFilter<"Medication"> | string
    amount?: IntFilter<"Medication"> | number
    drug_form?: StringNullableFilter<"Medication"> | string | null
    frequency?: StringNullableFilter<"Medication"> | string | null
    duration?: IntNullableFilter<"Medication"> | number | null
    instructions?: StringNullableFilter<"Medication"> | string | null
    route?: StringNullableFilter<"Medication"> | string | null
    interval?: StringNullableFilter<"Medication"> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    isSet?: boolean
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type OTCreateWithoutAdmission_dischargeInput = {
    ot_id?: string
    surgery_date?: Date | string | null
    surgeon?: string | null
    assistant_1?: string | null
    assistant_2?: string | null
    assistant_3?: string | null
    anaesthetist?: string | null
    anaesthesia?: string | null
    procedure_name?: string | null
    findings?: string | null
    operative_details?: string | null
    closure?: string | null
    postop_instructions?: string | null
    finalize?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    registration: RegistrationCreateNestedOneWithoutOTInput
  }

  export type OTUncheckedCreateWithoutAdmission_dischargeInput = {
    ot_id?: string
    registration_id: string
    surgery_date?: Date | string | null
    surgeon?: string | null
    assistant_1?: string | null
    assistant_2?: string | null
    assistant_3?: string | null
    anaesthetist?: string | null
    anaesthesia?: string | null
    procedure_name?: string | null
    findings?: string | null
    operative_details?: string | null
    closure?: string | null
    postop_instructions?: string | null
    finalize?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OTCreateOrConnectWithoutAdmission_dischargeInput = {
    where: OTWhereUniqueInput
    create: XOR<OTCreateWithoutAdmission_dischargeInput, OTUncheckedCreateWithoutAdmission_dischargeInput>
  }

  export type OTCreateManyAdmission_dischargeInputEnvelope = {
    data: OTCreateManyAdmission_dischargeInput | OTCreateManyAdmission_dischargeInput[]
  }

  export type RegistrationCreateWithoutAdmission_DischargeInput = {
    registration_id?: string
    code: string
    created_at?: Date | string
    first_name: string
    gender: string
    last_name: string
    mr_number: string
    phone_number?: string | null
    date_of_birth?: Date | string | null
    updated_at?: Date | string
    Consultation?: ConsultationCreateNestedManyWithoutRegistrationInput
    Appointment?: AppointmentCreateNestedManyWithoutRegistrationInput
    OT?: OTCreateNestedManyWithoutRegistrationInput
  }

  export type RegistrationUncheckedCreateWithoutAdmission_DischargeInput = {
    registration_id?: string
    code: string
    created_at?: Date | string
    first_name: string
    gender: string
    last_name: string
    mr_number: string
    phone_number?: string | null
    date_of_birth?: Date | string | null
    updated_at?: Date | string
    Consultation?: ConsultationUncheckedCreateNestedManyWithoutRegistrationInput
    Appointment?: AppointmentUncheckedCreateNestedManyWithoutRegistrationInput
    OT?: OTUncheckedCreateNestedManyWithoutRegistrationInput
  }

  export type RegistrationCreateOrConnectWithoutAdmission_DischargeInput = {
    where: RegistrationWhereUniqueInput
    create: XOR<RegistrationCreateWithoutAdmission_DischargeInput, RegistrationUncheckedCreateWithoutAdmission_DischargeInput>
  }

  export type MedicationUpdateManyInput = {
    where: MedicationWhereInput
    data: MedicationUpdateInput
  }

  export type MedicationDeleteManyInput = {
    where: MedicationWhereInput
  }

  export type OTUpsertWithWhereUniqueWithoutAdmission_dischargeInput = {
    where: OTWhereUniqueInput
    update: XOR<OTUpdateWithoutAdmission_dischargeInput, OTUncheckedUpdateWithoutAdmission_dischargeInput>
    create: XOR<OTCreateWithoutAdmission_dischargeInput, OTUncheckedCreateWithoutAdmission_dischargeInput>
  }

  export type OTUpdateWithWhereUniqueWithoutAdmission_dischargeInput = {
    where: OTWhereUniqueInput
    data: XOR<OTUpdateWithoutAdmission_dischargeInput, OTUncheckedUpdateWithoutAdmission_dischargeInput>
  }

  export type OTUpdateManyWithWhereWithoutAdmission_dischargeInput = {
    where: OTScalarWhereInput
    data: XOR<OTUpdateManyMutationInput, OTUncheckedUpdateManyWithoutAdmission_dischargeInput>
  }

  export type OTScalarWhereInput = {
    AND?: OTScalarWhereInput | OTScalarWhereInput[]
    OR?: OTScalarWhereInput[]
    NOT?: OTScalarWhereInput | OTScalarWhereInput[]
    ot_id?: StringFilter<"OT"> | string
    admission_id?: StringFilter<"OT"> | string
    registration_id?: StringFilter<"OT"> | string
    surgery_date?: DateTimeNullableFilter<"OT"> | Date | string | null
    surgeon?: StringNullableFilter<"OT"> | string | null
    assistant_1?: StringNullableFilter<"OT"> | string | null
    assistant_2?: StringNullableFilter<"OT"> | string | null
    assistant_3?: StringNullableFilter<"OT"> | string | null
    anaesthetist?: StringNullableFilter<"OT"> | string | null
    anaesthesia?: StringNullableFilter<"OT"> | string | null
    procedure_name?: StringNullableFilter<"OT"> | string | null
    findings?: StringNullableFilter<"OT"> | string | null
    operative_details?: StringNullableFilter<"OT"> | string | null
    closure?: StringNullableFilter<"OT"> | string | null
    postop_instructions?: StringNullableFilter<"OT"> | string | null
    finalize?: IntNullableFilter<"OT"> | number | null
    created_at?: DateTimeFilter<"OT"> | Date | string
    updated_at?: DateTimeFilter<"OT"> | Date | string
  }

  export type RegistrationUpsertWithoutAdmission_DischargeInput = {
    update: XOR<RegistrationUpdateWithoutAdmission_DischargeInput, RegistrationUncheckedUpdateWithoutAdmission_DischargeInput>
    create: XOR<RegistrationCreateWithoutAdmission_DischargeInput, RegistrationUncheckedCreateWithoutAdmission_DischargeInput>
    where?: RegistrationWhereInput
  }

  export type RegistrationUpdateToOneWithWhereWithoutAdmission_DischargeInput = {
    where?: RegistrationWhereInput
    data: XOR<RegistrationUpdateWithoutAdmission_DischargeInput, RegistrationUncheckedUpdateWithoutAdmission_DischargeInput>
  }

  export type RegistrationUpdateWithoutAdmission_DischargeInput = {
    code?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    first_name?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    mr_number?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    Consultation?: ConsultationUpdateManyWithoutRegistrationNestedInput
    Appointment?: AppointmentUpdateManyWithoutRegistrationNestedInput
    OT?: OTUpdateManyWithoutRegistrationNestedInput
  }

  export type RegistrationUncheckedUpdateWithoutAdmission_DischargeInput = {
    code?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    first_name?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    mr_number?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    Consultation?: ConsultationUncheckedUpdateManyWithoutRegistrationNestedInput
    Appointment?: AppointmentUncheckedUpdateManyWithoutRegistrationNestedInput
    OT?: OTUncheckedUpdateManyWithoutRegistrationNestedInput
  }

  export type Admission_DischargeCreateWithoutOtInput = {
    admission_id?: string
    admission_date?: Date | string | null
    admission_mode?: string | null
    status: string
    discharge_date?: Date | string | null
    discharge_mode?: string | null
    admission_plan?: string | null
    bed_number?: number | null
    diagnosis?: string | null
    diagnostic_procedures?: string | null
    discharge_instructions?: string | null
    discharge_medications?: InputJsonValue | null
    discharge_summary?: string | null
    hospital_investigations?: string | null
    hospital_medications?: string | null
    instructions?: string | null
    medical_leave?: string | null
    therapeutic_procedures?: string | null
    ward?: string | null
    medications?: XOR<MedicationListCreateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    created_at?: Date | string
    updated_at?: Date | string
    registration: RegistrationCreateNestedOneWithoutAdmission_DischargeInput
  }

  export type Admission_DischargeUncheckedCreateWithoutOtInput = {
    admission_id?: string
    registration_id: string
    admission_date?: Date | string | null
    admission_mode?: string | null
    status: string
    discharge_date?: Date | string | null
    discharge_mode?: string | null
    admission_plan?: string | null
    bed_number?: number | null
    diagnosis?: string | null
    diagnostic_procedures?: string | null
    discharge_instructions?: string | null
    discharge_medications?: InputJsonValue | null
    discharge_summary?: string | null
    hospital_investigations?: string | null
    hospital_medications?: string | null
    instructions?: string | null
    medical_leave?: string | null
    therapeutic_procedures?: string | null
    ward?: string | null
    medications?: XOR<MedicationListCreateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type Admission_DischargeCreateOrConnectWithoutOtInput = {
    where: Admission_DischargeWhereUniqueInput
    create: XOR<Admission_DischargeCreateWithoutOtInput, Admission_DischargeUncheckedCreateWithoutOtInput>
  }

  export type RegistrationCreateWithoutOTInput = {
    registration_id?: string
    code: string
    created_at?: Date | string
    first_name: string
    gender: string
    last_name: string
    mr_number: string
    phone_number?: string | null
    date_of_birth?: Date | string | null
    updated_at?: Date | string
    Consultation?: ConsultationCreateNestedManyWithoutRegistrationInput
    Appointment?: AppointmentCreateNestedManyWithoutRegistrationInput
    Admission_Discharge?: Admission_DischargeCreateNestedManyWithoutRegistrationInput
  }

  export type RegistrationUncheckedCreateWithoutOTInput = {
    registration_id?: string
    code: string
    created_at?: Date | string
    first_name: string
    gender: string
    last_name: string
    mr_number: string
    phone_number?: string | null
    date_of_birth?: Date | string | null
    updated_at?: Date | string
    Consultation?: ConsultationUncheckedCreateNestedManyWithoutRegistrationInput
    Appointment?: AppointmentUncheckedCreateNestedManyWithoutRegistrationInput
    Admission_Discharge?: Admission_DischargeUncheckedCreateNestedManyWithoutRegistrationInput
  }

  export type RegistrationCreateOrConnectWithoutOTInput = {
    where: RegistrationWhereUniqueInput
    create: XOR<RegistrationCreateWithoutOTInput, RegistrationUncheckedCreateWithoutOTInput>
  }

  export type Admission_DischargeUpsertWithoutOtInput = {
    update: XOR<Admission_DischargeUpdateWithoutOtInput, Admission_DischargeUncheckedUpdateWithoutOtInput>
    create: XOR<Admission_DischargeCreateWithoutOtInput, Admission_DischargeUncheckedCreateWithoutOtInput>
    where?: Admission_DischargeWhereInput
  }

  export type Admission_DischargeUpdateToOneWithWhereWithoutOtInput = {
    where?: Admission_DischargeWhereInput
    data: XOR<Admission_DischargeUpdateWithoutOtInput, Admission_DischargeUncheckedUpdateWithoutOtInput>
  }

  export type Admission_DischargeUpdateWithoutOtInput = {
    admission_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    admission_mode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    discharge_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discharge_mode?: NullableStringFieldUpdateOperationsInput | string | null
    admission_plan?: NullableStringFieldUpdateOperationsInput | string | null
    bed_number?: NullableIntFieldUpdateOperationsInput | number | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    diagnostic_procedures?: NullableStringFieldUpdateOperationsInput | string | null
    discharge_instructions?: NullableStringFieldUpdateOperationsInput | string | null
    discharge_medications?: InputJsonValue | InputJsonValue | null
    discharge_summary?: NullableStringFieldUpdateOperationsInput | string | null
    hospital_investigations?: NullableStringFieldUpdateOperationsInput | string | null
    hospital_medications?: NullableStringFieldUpdateOperationsInput | string | null
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    medical_leave?: NullableStringFieldUpdateOperationsInput | string | null
    therapeutic_procedures?: NullableStringFieldUpdateOperationsInput | string | null
    ward?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: XOR<MedicationListUpdateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    registration?: RegistrationUpdateOneRequiredWithoutAdmission_DischargeNestedInput
  }

  export type Admission_DischargeUncheckedUpdateWithoutOtInput = {
    registration_id?: StringFieldUpdateOperationsInput | string
    admission_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    admission_mode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    discharge_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discharge_mode?: NullableStringFieldUpdateOperationsInput | string | null
    admission_plan?: NullableStringFieldUpdateOperationsInput | string | null
    bed_number?: NullableIntFieldUpdateOperationsInput | number | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    diagnostic_procedures?: NullableStringFieldUpdateOperationsInput | string | null
    discharge_instructions?: NullableStringFieldUpdateOperationsInput | string | null
    discharge_medications?: InputJsonValue | InputJsonValue | null
    discharge_summary?: NullableStringFieldUpdateOperationsInput | string | null
    hospital_investigations?: NullableStringFieldUpdateOperationsInput | string | null
    hospital_medications?: NullableStringFieldUpdateOperationsInput | string | null
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    medical_leave?: NullableStringFieldUpdateOperationsInput | string | null
    therapeutic_procedures?: NullableStringFieldUpdateOperationsInput | string | null
    ward?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: XOR<MedicationListUpdateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegistrationUpsertWithoutOTInput = {
    update: XOR<RegistrationUpdateWithoutOTInput, RegistrationUncheckedUpdateWithoutOTInput>
    create: XOR<RegistrationCreateWithoutOTInput, RegistrationUncheckedCreateWithoutOTInput>
    where?: RegistrationWhereInput
  }

  export type RegistrationUpdateToOneWithWhereWithoutOTInput = {
    where?: RegistrationWhereInput
    data: XOR<RegistrationUpdateWithoutOTInput, RegistrationUncheckedUpdateWithoutOTInput>
  }

  export type RegistrationUpdateWithoutOTInput = {
    code?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    first_name?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    mr_number?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    Consultation?: ConsultationUpdateManyWithoutRegistrationNestedInput
    Appointment?: AppointmentUpdateManyWithoutRegistrationNestedInput
    Admission_Discharge?: Admission_DischargeUpdateManyWithoutRegistrationNestedInput
  }

  export type RegistrationUncheckedUpdateWithoutOTInput = {
    code?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    first_name?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    mr_number?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    Consultation?: ConsultationUncheckedUpdateManyWithoutRegistrationNestedInput
    Appointment?: AppointmentUncheckedUpdateManyWithoutRegistrationNestedInput
    Admission_Discharge?: Admission_DischargeUncheckedUpdateManyWithoutRegistrationNestedInput
  }

  export type RegistrationCreateWithoutAppointmentInput = {
    registration_id?: string
    code: string
    created_at?: Date | string
    first_name: string
    gender: string
    last_name: string
    mr_number: string
    phone_number?: string | null
    date_of_birth?: Date | string | null
    updated_at?: Date | string
    Consultation?: ConsultationCreateNestedManyWithoutRegistrationInput
    Admission_Discharge?: Admission_DischargeCreateNestedManyWithoutRegistrationInput
    OT?: OTCreateNestedManyWithoutRegistrationInput
  }

  export type RegistrationUncheckedCreateWithoutAppointmentInput = {
    registration_id?: string
    code: string
    created_at?: Date | string
    first_name: string
    gender: string
    last_name: string
    mr_number: string
    phone_number?: string | null
    date_of_birth?: Date | string | null
    updated_at?: Date | string
    Consultation?: ConsultationUncheckedCreateNestedManyWithoutRegistrationInput
    Admission_Discharge?: Admission_DischargeUncheckedCreateNestedManyWithoutRegistrationInput
    OT?: OTUncheckedCreateNestedManyWithoutRegistrationInput
  }

  export type RegistrationCreateOrConnectWithoutAppointmentInput = {
    where: RegistrationWhereUniqueInput
    create: XOR<RegistrationCreateWithoutAppointmentInput, RegistrationUncheckedCreateWithoutAppointmentInput>
  }

  export type RegistrationUpsertWithoutAppointmentInput = {
    update: XOR<RegistrationUpdateWithoutAppointmentInput, RegistrationUncheckedUpdateWithoutAppointmentInput>
    create: XOR<RegistrationCreateWithoutAppointmentInput, RegistrationUncheckedCreateWithoutAppointmentInput>
    where?: RegistrationWhereInput
  }

  export type RegistrationUpdateToOneWithWhereWithoutAppointmentInput = {
    where?: RegistrationWhereInput
    data: XOR<RegistrationUpdateWithoutAppointmentInput, RegistrationUncheckedUpdateWithoutAppointmentInput>
  }

  export type RegistrationUpdateWithoutAppointmentInput = {
    code?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    first_name?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    mr_number?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    Consultation?: ConsultationUpdateManyWithoutRegistrationNestedInput
    Admission_Discharge?: Admission_DischargeUpdateManyWithoutRegistrationNestedInput
    OT?: OTUpdateManyWithoutRegistrationNestedInput
  }

  export type RegistrationUncheckedUpdateWithoutAppointmentInput = {
    code?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    first_name?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    mr_number?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    Consultation?: ConsultationUncheckedUpdateManyWithoutRegistrationNestedInput
    Admission_Discharge?: Admission_DischargeUncheckedUpdateManyWithoutRegistrationNestedInput
    OT?: OTUncheckedUpdateManyWithoutRegistrationNestedInput
  }

  export type RegistrationCreateWithoutConsultationInput = {
    registration_id?: string
    code: string
    created_at?: Date | string
    first_name: string
    gender: string
    last_name: string
    mr_number: string
    phone_number?: string | null
    date_of_birth?: Date | string | null
    updated_at?: Date | string
    Appointment?: AppointmentCreateNestedManyWithoutRegistrationInput
    Admission_Discharge?: Admission_DischargeCreateNestedManyWithoutRegistrationInput
    OT?: OTCreateNestedManyWithoutRegistrationInput
  }

  export type RegistrationUncheckedCreateWithoutConsultationInput = {
    registration_id?: string
    code: string
    created_at?: Date | string
    first_name: string
    gender: string
    last_name: string
    mr_number: string
    phone_number?: string | null
    date_of_birth?: Date | string | null
    updated_at?: Date | string
    Appointment?: AppointmentUncheckedCreateNestedManyWithoutRegistrationInput
    Admission_Discharge?: Admission_DischargeUncheckedCreateNestedManyWithoutRegistrationInput
    OT?: OTUncheckedCreateNestedManyWithoutRegistrationInput
  }

  export type RegistrationCreateOrConnectWithoutConsultationInput = {
    where: RegistrationWhereUniqueInput
    create: XOR<RegistrationCreateWithoutConsultationInput, RegistrationUncheckedCreateWithoutConsultationInput>
  }

  export type RegistrationUpsertWithoutConsultationInput = {
    update: XOR<RegistrationUpdateWithoutConsultationInput, RegistrationUncheckedUpdateWithoutConsultationInput>
    create: XOR<RegistrationCreateWithoutConsultationInput, RegistrationUncheckedCreateWithoutConsultationInput>
    where?: RegistrationWhereInput
  }

  export type RegistrationUpdateToOneWithWhereWithoutConsultationInput = {
    where?: RegistrationWhereInput
    data: XOR<RegistrationUpdateWithoutConsultationInput, RegistrationUncheckedUpdateWithoutConsultationInput>
  }

  export type RegistrationUpdateWithoutConsultationInput = {
    code?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    first_name?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    mr_number?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    Appointment?: AppointmentUpdateManyWithoutRegistrationNestedInput
    Admission_Discharge?: Admission_DischargeUpdateManyWithoutRegistrationNestedInput
    OT?: OTUpdateManyWithoutRegistrationNestedInput
  }

  export type RegistrationUncheckedUpdateWithoutConsultationInput = {
    code?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    first_name?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    mr_number?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    Appointment?: AppointmentUncheckedUpdateManyWithoutRegistrationNestedInput
    Admission_Discharge?: Admission_DischargeUncheckedUpdateManyWithoutRegistrationNestedInput
    OT?: OTUncheckedUpdateManyWithoutRegistrationNestedInput
  }

  export type ConsultationCreateWithoutRegistrationInput = {
    consultation_id?: string
    created_at?: Date | string
    diagnosis?: string | null
    examination?: string | null
    history?: string | null
    instructions?: InputJsonValue | null
    investigations?: string | null
    plan?: string | null
    medications?: XOR<MedicationListCreateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    status?: string | null
    updated_at?: Date | string
    visit_date: Date | string
  }

  export type ConsultationUncheckedCreateWithoutRegistrationInput = {
    consultation_id?: string
    created_at?: Date | string
    diagnosis?: string | null
    examination?: string | null
    history?: string | null
    instructions?: InputJsonValue | null
    investigations?: string | null
    plan?: string | null
    medications?: XOR<MedicationListCreateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    status?: string | null
    updated_at?: Date | string
    visit_date: Date | string
  }

  export type ConsultationCreateOrConnectWithoutRegistrationInput = {
    where: ConsultationWhereUniqueInput
    create: XOR<ConsultationCreateWithoutRegistrationInput, ConsultationUncheckedCreateWithoutRegistrationInput>
  }

  export type ConsultationCreateManyRegistrationInputEnvelope = {
    data: ConsultationCreateManyRegistrationInput | ConsultationCreateManyRegistrationInput[]
  }

  export type AppointmentCreateWithoutRegistrationInput = {
    appointment_id?: string
    created_at?: Date | string
    date_appointment: Date | string
    notes: string
    plan: string
    status?: string
    type: string
    updated_at?: Date | string
  }

  export type AppointmentUncheckedCreateWithoutRegistrationInput = {
    appointment_id?: string
    created_at?: Date | string
    date_appointment: Date | string
    notes: string
    plan: string
    status?: string
    type: string
    updated_at?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutRegistrationInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutRegistrationInput, AppointmentUncheckedCreateWithoutRegistrationInput>
  }

  export type AppointmentCreateManyRegistrationInputEnvelope = {
    data: AppointmentCreateManyRegistrationInput | AppointmentCreateManyRegistrationInput[]
  }

  export type Admission_DischargeCreateWithoutRegistrationInput = {
    admission_id?: string
    admission_date?: Date | string | null
    admission_mode?: string | null
    status: string
    discharge_date?: Date | string | null
    discharge_mode?: string | null
    admission_plan?: string | null
    bed_number?: number | null
    diagnosis?: string | null
    diagnostic_procedures?: string | null
    discharge_instructions?: string | null
    discharge_medications?: InputJsonValue | null
    discharge_summary?: string | null
    hospital_investigations?: string | null
    hospital_medications?: string | null
    instructions?: string | null
    medical_leave?: string | null
    therapeutic_procedures?: string | null
    ward?: string | null
    medications?: XOR<MedicationListCreateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    created_at?: Date | string
    updated_at?: Date | string
    ot?: OTCreateNestedManyWithoutAdmission_dischargeInput
  }

  export type Admission_DischargeUncheckedCreateWithoutRegistrationInput = {
    admission_id?: string
    admission_date?: Date | string | null
    admission_mode?: string | null
    status: string
    discharge_date?: Date | string | null
    discharge_mode?: string | null
    admission_plan?: string | null
    bed_number?: number | null
    diagnosis?: string | null
    diagnostic_procedures?: string | null
    discharge_instructions?: string | null
    discharge_medications?: InputJsonValue | null
    discharge_summary?: string | null
    hospital_investigations?: string | null
    hospital_medications?: string | null
    instructions?: string | null
    medical_leave?: string | null
    therapeutic_procedures?: string | null
    ward?: string | null
    medications?: XOR<MedicationListCreateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    created_at?: Date | string
    updated_at?: Date | string
    ot?: OTUncheckedCreateNestedManyWithoutAdmission_dischargeInput
  }

  export type Admission_DischargeCreateOrConnectWithoutRegistrationInput = {
    where: Admission_DischargeWhereUniqueInput
    create: XOR<Admission_DischargeCreateWithoutRegistrationInput, Admission_DischargeUncheckedCreateWithoutRegistrationInput>
  }

  export type Admission_DischargeCreateManyRegistrationInputEnvelope = {
    data: Admission_DischargeCreateManyRegistrationInput | Admission_DischargeCreateManyRegistrationInput[]
  }

  export type OTCreateWithoutRegistrationInput = {
    ot_id?: string
    surgery_date?: Date | string | null
    surgeon?: string | null
    assistant_1?: string | null
    assistant_2?: string | null
    assistant_3?: string | null
    anaesthetist?: string | null
    anaesthesia?: string | null
    procedure_name?: string | null
    findings?: string | null
    operative_details?: string | null
    closure?: string | null
    postop_instructions?: string | null
    finalize?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    admission_discharge: Admission_DischargeCreateNestedOneWithoutOtInput
  }

  export type OTUncheckedCreateWithoutRegistrationInput = {
    ot_id?: string
    admission_id: string
    surgery_date?: Date | string | null
    surgeon?: string | null
    assistant_1?: string | null
    assistant_2?: string | null
    assistant_3?: string | null
    anaesthetist?: string | null
    anaesthesia?: string | null
    procedure_name?: string | null
    findings?: string | null
    operative_details?: string | null
    closure?: string | null
    postop_instructions?: string | null
    finalize?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OTCreateOrConnectWithoutRegistrationInput = {
    where: OTWhereUniqueInput
    create: XOR<OTCreateWithoutRegistrationInput, OTUncheckedCreateWithoutRegistrationInput>
  }

  export type OTCreateManyRegistrationInputEnvelope = {
    data: OTCreateManyRegistrationInput | OTCreateManyRegistrationInput[]
  }

  export type ConsultationUpsertWithWhereUniqueWithoutRegistrationInput = {
    where: ConsultationWhereUniqueInput
    update: XOR<ConsultationUpdateWithoutRegistrationInput, ConsultationUncheckedUpdateWithoutRegistrationInput>
    create: XOR<ConsultationCreateWithoutRegistrationInput, ConsultationUncheckedCreateWithoutRegistrationInput>
  }

  export type ConsultationUpdateWithWhereUniqueWithoutRegistrationInput = {
    where: ConsultationWhereUniqueInput
    data: XOR<ConsultationUpdateWithoutRegistrationInput, ConsultationUncheckedUpdateWithoutRegistrationInput>
  }

  export type ConsultationUpdateManyWithWhereWithoutRegistrationInput = {
    where: ConsultationScalarWhereInput
    data: XOR<ConsultationUpdateManyMutationInput, ConsultationUncheckedUpdateManyWithoutRegistrationInput>
  }

  export type ConsultationScalarWhereInput = {
    AND?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
    OR?: ConsultationScalarWhereInput[]
    NOT?: ConsultationScalarWhereInput | ConsultationScalarWhereInput[]
    consultation_id?: StringFilter<"Consultation"> | string
    created_at?: DateTimeFilter<"Consultation"> | Date | string
    diagnosis?: StringNullableFilter<"Consultation"> | string | null
    examination?: StringNullableFilter<"Consultation"> | string | null
    history?: StringNullableFilter<"Consultation"> | string | null
    instructions?: JsonNullableFilter<"Consultation">
    investigations?: StringNullableFilter<"Consultation"> | string | null
    plan?: StringNullableFilter<"Consultation"> | string | null
    status?: StringNullableFilter<"Consultation"> | string | null
    registration_id?: StringFilter<"Consultation"> | string
    updated_at?: DateTimeFilter<"Consultation"> | Date | string
    visit_date?: DateTimeFilter<"Consultation"> | Date | string
  }

  export type AppointmentUpsertWithWhereUniqueWithoutRegistrationInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutRegistrationInput, AppointmentUncheckedUpdateWithoutRegistrationInput>
    create: XOR<AppointmentCreateWithoutRegistrationInput, AppointmentUncheckedCreateWithoutRegistrationInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutRegistrationInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutRegistrationInput, AppointmentUncheckedUpdateWithoutRegistrationInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutRegistrationInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutRegistrationInput>
  }

  export type AppointmentScalarWhereInput = {
    AND?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    OR?: AppointmentScalarWhereInput[]
    NOT?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    appointment_id?: StringFilter<"Appointment"> | string
    created_at?: DateTimeFilter<"Appointment"> | Date | string
    date_appointment?: DateTimeFilter<"Appointment"> | Date | string
    notes?: StringFilter<"Appointment"> | string
    plan?: StringFilter<"Appointment"> | string
    registration_id?: StringFilter<"Appointment"> | string
    status?: StringFilter<"Appointment"> | string
    type?: StringFilter<"Appointment"> | string
    updated_at?: DateTimeFilter<"Appointment"> | Date | string
  }

  export type Admission_DischargeUpsertWithWhereUniqueWithoutRegistrationInput = {
    where: Admission_DischargeWhereUniqueInput
    update: XOR<Admission_DischargeUpdateWithoutRegistrationInput, Admission_DischargeUncheckedUpdateWithoutRegistrationInput>
    create: XOR<Admission_DischargeCreateWithoutRegistrationInput, Admission_DischargeUncheckedCreateWithoutRegistrationInput>
  }

  export type Admission_DischargeUpdateWithWhereUniqueWithoutRegistrationInput = {
    where: Admission_DischargeWhereUniqueInput
    data: XOR<Admission_DischargeUpdateWithoutRegistrationInput, Admission_DischargeUncheckedUpdateWithoutRegistrationInput>
  }

  export type Admission_DischargeUpdateManyWithWhereWithoutRegistrationInput = {
    where: Admission_DischargeScalarWhereInput
    data: XOR<Admission_DischargeUpdateManyMutationInput, Admission_DischargeUncheckedUpdateManyWithoutRegistrationInput>
  }

  export type Admission_DischargeScalarWhereInput = {
    AND?: Admission_DischargeScalarWhereInput | Admission_DischargeScalarWhereInput[]
    OR?: Admission_DischargeScalarWhereInput[]
    NOT?: Admission_DischargeScalarWhereInput | Admission_DischargeScalarWhereInput[]
    admission_id?: StringFilter<"Admission_Discharge"> | string
    registration_id?: StringFilter<"Admission_Discharge"> | string
    admission_date?: DateTimeNullableFilter<"Admission_Discharge"> | Date | string | null
    admission_mode?: StringNullableFilter<"Admission_Discharge"> | string | null
    status?: StringFilter<"Admission_Discharge"> | string
    discharge_date?: DateTimeNullableFilter<"Admission_Discharge"> | Date | string | null
    discharge_mode?: StringNullableFilter<"Admission_Discharge"> | string | null
    admission_plan?: StringNullableFilter<"Admission_Discharge"> | string | null
    bed_number?: IntNullableFilter<"Admission_Discharge"> | number | null
    diagnosis?: StringNullableFilter<"Admission_Discharge"> | string | null
    diagnostic_procedures?: StringNullableFilter<"Admission_Discharge"> | string | null
    discharge_instructions?: StringNullableFilter<"Admission_Discharge"> | string | null
    discharge_medications?: JsonNullableFilter<"Admission_Discharge">
    discharge_summary?: StringNullableFilter<"Admission_Discharge"> | string | null
    hospital_investigations?: StringNullableFilter<"Admission_Discharge"> | string | null
    hospital_medications?: StringNullableFilter<"Admission_Discharge"> | string | null
    instructions?: StringNullableFilter<"Admission_Discharge"> | string | null
    medical_leave?: StringNullableFilter<"Admission_Discharge"> | string | null
    therapeutic_procedures?: StringNullableFilter<"Admission_Discharge"> | string | null
    ward?: StringNullableFilter<"Admission_Discharge"> | string | null
    created_at?: DateTimeFilter<"Admission_Discharge"> | Date | string
    updated_at?: DateTimeFilter<"Admission_Discharge"> | Date | string
  }

  export type OTUpsertWithWhereUniqueWithoutRegistrationInput = {
    where: OTWhereUniqueInput
    update: XOR<OTUpdateWithoutRegistrationInput, OTUncheckedUpdateWithoutRegistrationInput>
    create: XOR<OTCreateWithoutRegistrationInput, OTUncheckedCreateWithoutRegistrationInput>
  }

  export type OTUpdateWithWhereUniqueWithoutRegistrationInput = {
    where: OTWhereUniqueInput
    data: XOR<OTUpdateWithoutRegistrationInput, OTUncheckedUpdateWithoutRegistrationInput>
  }

  export type OTUpdateManyWithWhereWithoutRegistrationInput = {
    where: OTScalarWhereInput
    data: XOR<OTUpdateManyMutationInput, OTUncheckedUpdateManyWithoutRegistrationInput>
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    password?: string | null
    role?: string
    emailVerified?: Date | string | null
    image?: string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    password?: string | null
    role?: string
    emailVerified?: Date | string | null
    image?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    password?: string | null
    role?: string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    password?: string | null
    role?: string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type OTCreateManyAdmission_dischargeInput = {
    ot_id?: string
    registration_id: string
    surgery_date?: Date | string | null
    surgeon?: string | null
    assistant_1?: string | null
    assistant_2?: string | null
    assistant_3?: string | null
    anaesthetist?: string | null
    anaesthesia?: string | null
    procedure_name?: string | null
    findings?: string | null
    operative_details?: string | null
    closure?: string | null
    postop_instructions?: string | null
    finalize?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type MedicationUpdateInput = {
    drug_name?: StringFieldUpdateOperationsInput | string
    drug_dose?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    drug_form?: NullableStringFieldUpdateOperationsInput | string | null
    frequency?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    route?: NullableStringFieldUpdateOperationsInput | string | null
    interval?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OTUpdateWithoutAdmission_dischargeInput = {
    surgery_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    surgeon?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_1?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_2?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_3?: NullableStringFieldUpdateOperationsInput | string | null
    anaesthetist?: NullableStringFieldUpdateOperationsInput | string | null
    anaesthesia?: NullableStringFieldUpdateOperationsInput | string | null
    procedure_name?: NullableStringFieldUpdateOperationsInput | string | null
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    operative_details?: NullableStringFieldUpdateOperationsInput | string | null
    closure?: NullableStringFieldUpdateOperationsInput | string | null
    postop_instructions?: NullableStringFieldUpdateOperationsInput | string | null
    finalize?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    registration?: RegistrationUpdateOneRequiredWithoutOTNestedInput
  }

  export type OTUncheckedUpdateWithoutAdmission_dischargeInput = {
    registration_id?: StringFieldUpdateOperationsInput | string
    surgery_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    surgeon?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_1?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_2?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_3?: NullableStringFieldUpdateOperationsInput | string | null
    anaesthetist?: NullableStringFieldUpdateOperationsInput | string | null
    anaesthesia?: NullableStringFieldUpdateOperationsInput | string | null
    procedure_name?: NullableStringFieldUpdateOperationsInput | string | null
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    operative_details?: NullableStringFieldUpdateOperationsInput | string | null
    closure?: NullableStringFieldUpdateOperationsInput | string | null
    postop_instructions?: NullableStringFieldUpdateOperationsInput | string | null
    finalize?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OTUncheckedUpdateManyWithoutAdmission_dischargeInput = {
    registration_id?: StringFieldUpdateOperationsInput | string
    surgery_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    surgeon?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_1?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_2?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_3?: NullableStringFieldUpdateOperationsInput | string | null
    anaesthetist?: NullableStringFieldUpdateOperationsInput | string | null
    anaesthesia?: NullableStringFieldUpdateOperationsInput | string | null
    procedure_name?: NullableStringFieldUpdateOperationsInput | string | null
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    operative_details?: NullableStringFieldUpdateOperationsInput | string | null
    closure?: NullableStringFieldUpdateOperationsInput | string | null
    postop_instructions?: NullableStringFieldUpdateOperationsInput | string | null
    finalize?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationCreateManyRegistrationInput = {
    consultation_id?: string
    created_at?: Date | string
    diagnosis?: string | null
    examination?: string | null
    history?: string | null
    instructions?: InputJsonValue | null
    investigations?: string | null
    plan?: string | null
    medications?: XOR<MedicationListCreateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    status?: string | null
    updated_at?: Date | string
    visit_date: Date | string
  }

  export type AppointmentCreateManyRegistrationInput = {
    appointment_id?: string
    created_at?: Date | string
    date_appointment: Date | string
    notes: string
    plan: string
    status?: string
    type: string
    updated_at?: Date | string
  }

  export type Admission_DischargeCreateManyRegistrationInput = {
    admission_id?: string
    admission_date?: Date | string | null
    admission_mode?: string | null
    status: string
    discharge_date?: Date | string | null
    discharge_mode?: string | null
    admission_plan?: string | null
    bed_number?: number | null
    diagnosis?: string | null
    diagnostic_procedures?: string | null
    discharge_instructions?: string | null
    discharge_medications?: InputJsonValue | null
    discharge_summary?: string | null
    hospital_investigations?: string | null
    hospital_medications?: string | null
    instructions?: string | null
    medical_leave?: string | null
    therapeutic_procedures?: string | null
    ward?: string | null
    medications?: XOR<MedicationListCreateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OTCreateManyRegistrationInput = {
    ot_id?: string
    admission_id: string
    surgery_date?: Date | string | null
    surgeon?: string | null
    assistant_1?: string | null
    assistant_2?: string | null
    assistant_3?: string | null
    anaesthetist?: string | null
    anaesthesia?: string | null
    procedure_name?: string | null
    findings?: string | null
    operative_details?: string | null
    closure?: string | null
    postop_instructions?: string | null
    finalize?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ConsultationUpdateWithoutRegistrationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    examination?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    instructions?: InputJsonValue | InputJsonValue | null
    investigations?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: XOR<MedicationListUpdateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    status?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationUncheckedUpdateWithoutRegistrationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    examination?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    instructions?: InputJsonValue | InputJsonValue | null
    investigations?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: XOR<MedicationListUpdateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    status?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationUncheckedUpdateManyWithoutRegistrationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    examination?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    instructions?: InputJsonValue | InputJsonValue | null
    investigations?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: XOR<MedicationListUpdateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    status?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    visit_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUpdateWithoutRegistrationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    date_appointment?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateWithoutRegistrationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    date_appointment?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutRegistrationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    date_appointment?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Admission_DischargeUpdateWithoutRegistrationInput = {
    admission_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    admission_mode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    discharge_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discharge_mode?: NullableStringFieldUpdateOperationsInput | string | null
    admission_plan?: NullableStringFieldUpdateOperationsInput | string | null
    bed_number?: NullableIntFieldUpdateOperationsInput | number | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    diagnostic_procedures?: NullableStringFieldUpdateOperationsInput | string | null
    discharge_instructions?: NullableStringFieldUpdateOperationsInput | string | null
    discharge_medications?: InputJsonValue | InputJsonValue | null
    discharge_summary?: NullableStringFieldUpdateOperationsInput | string | null
    hospital_investigations?: NullableStringFieldUpdateOperationsInput | string | null
    hospital_medications?: NullableStringFieldUpdateOperationsInput | string | null
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    medical_leave?: NullableStringFieldUpdateOperationsInput | string | null
    therapeutic_procedures?: NullableStringFieldUpdateOperationsInput | string | null
    ward?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: XOR<MedicationListUpdateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ot?: OTUpdateManyWithoutAdmission_dischargeNestedInput
  }

  export type Admission_DischargeUncheckedUpdateWithoutRegistrationInput = {
    admission_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    admission_mode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    discharge_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discharge_mode?: NullableStringFieldUpdateOperationsInput | string | null
    admission_plan?: NullableStringFieldUpdateOperationsInput | string | null
    bed_number?: NullableIntFieldUpdateOperationsInput | number | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    diagnostic_procedures?: NullableStringFieldUpdateOperationsInput | string | null
    discharge_instructions?: NullableStringFieldUpdateOperationsInput | string | null
    discharge_medications?: InputJsonValue | InputJsonValue | null
    discharge_summary?: NullableStringFieldUpdateOperationsInput | string | null
    hospital_investigations?: NullableStringFieldUpdateOperationsInput | string | null
    hospital_medications?: NullableStringFieldUpdateOperationsInput | string | null
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    medical_leave?: NullableStringFieldUpdateOperationsInput | string | null
    therapeutic_procedures?: NullableStringFieldUpdateOperationsInput | string | null
    ward?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: XOR<MedicationListUpdateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ot?: OTUncheckedUpdateManyWithoutAdmission_dischargeNestedInput
  }

  export type Admission_DischargeUncheckedUpdateManyWithoutRegistrationInput = {
    admission_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    admission_mode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    discharge_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discharge_mode?: NullableStringFieldUpdateOperationsInput | string | null
    admission_plan?: NullableStringFieldUpdateOperationsInput | string | null
    bed_number?: NullableIntFieldUpdateOperationsInput | number | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    diagnostic_procedures?: NullableStringFieldUpdateOperationsInput | string | null
    discharge_instructions?: NullableStringFieldUpdateOperationsInput | string | null
    discharge_medications?: InputJsonValue | InputJsonValue | null
    discharge_summary?: NullableStringFieldUpdateOperationsInput | string | null
    hospital_investigations?: NullableStringFieldUpdateOperationsInput | string | null
    hospital_medications?: NullableStringFieldUpdateOperationsInput | string | null
    instructions?: NullableStringFieldUpdateOperationsInput | string | null
    medical_leave?: NullableStringFieldUpdateOperationsInput | string | null
    therapeutic_procedures?: NullableStringFieldUpdateOperationsInput | string | null
    ward?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: XOR<MedicationListUpdateEnvelopeInput, MedicationCreateInput> | MedicationCreateInput[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OTUpdateWithoutRegistrationInput = {
    surgery_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    surgeon?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_1?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_2?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_3?: NullableStringFieldUpdateOperationsInput | string | null
    anaesthetist?: NullableStringFieldUpdateOperationsInput | string | null
    anaesthesia?: NullableStringFieldUpdateOperationsInput | string | null
    procedure_name?: NullableStringFieldUpdateOperationsInput | string | null
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    operative_details?: NullableStringFieldUpdateOperationsInput | string | null
    closure?: NullableStringFieldUpdateOperationsInput | string | null
    postop_instructions?: NullableStringFieldUpdateOperationsInput | string | null
    finalize?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admission_discharge?: Admission_DischargeUpdateOneRequiredWithoutOtNestedInput
  }

  export type OTUncheckedUpdateWithoutRegistrationInput = {
    admission_id?: StringFieldUpdateOperationsInput | string
    surgery_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    surgeon?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_1?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_2?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_3?: NullableStringFieldUpdateOperationsInput | string | null
    anaesthetist?: NullableStringFieldUpdateOperationsInput | string | null
    anaesthesia?: NullableStringFieldUpdateOperationsInput | string | null
    procedure_name?: NullableStringFieldUpdateOperationsInput | string | null
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    operative_details?: NullableStringFieldUpdateOperationsInput | string | null
    closure?: NullableStringFieldUpdateOperationsInput | string | null
    postop_instructions?: NullableStringFieldUpdateOperationsInput | string | null
    finalize?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OTUncheckedUpdateManyWithoutRegistrationInput = {
    admission_id?: StringFieldUpdateOperationsInput | string
    surgery_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    surgeon?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_1?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_2?: NullableStringFieldUpdateOperationsInput | string | null
    assistant_3?: NullableStringFieldUpdateOperationsInput | string | null
    anaesthetist?: NullableStringFieldUpdateOperationsInput | string | null
    anaesthesia?: NullableStringFieldUpdateOperationsInput | string | null
    procedure_name?: NullableStringFieldUpdateOperationsInput | string | null
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    operative_details?: NullableStringFieldUpdateOperationsInput | string | null
    closure?: NullableStringFieldUpdateOperationsInput | string | null
    postop_instructions?: NullableStringFieldUpdateOperationsInput | string | null
    finalize?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUpdateWithoutUserInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}