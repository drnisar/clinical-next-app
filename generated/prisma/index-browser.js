
/* !!! This is code generated by Prisma. Do not edit directly. !!!
/* eslint-disable */

Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.9.0
 * Query Engine version: 81e4af48011447c3cc503a190e86995b66d2a28e
 */
Prisma.prismaVersion = {
  client: "6.9.0",
  engine: "81e4af48011447c3cc503a190e86995b66d2a28e"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.Admission_DischargeScalarFieldEnum = {
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

exports.Prisma.Admitted_LocationScalarFieldEnum = {
  admitted_location_id: 'admitted_location_id',
  admission_id: 'admission_id',
  registration_id: 'registration_id',
  bed_no: 'bed_no',
  ward: 'ward',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.OTScalarFieldEnum = {
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

exports.Prisma.OT_TemplatesScalarFieldEnum = {
  ot_template_id: 'ot_template_id',
  template_name: 'template_name',
  procedure: 'procedure',
  findings: 'findings',
  operative_details: 'operative_details',
  closure: 'closure',
  instructions: 'instructions'
};

exports.Prisma.AppointmentScalarFieldEnum = {
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

exports.Prisma.ConsultationScalarFieldEnum = {
  consultation_id: 'consultation_id',
  created_at: 'created_at',
  diagnosis: 'diagnosis',
  history: 'history',
  plan: 'plan',
  status: 'status',
  registration_id: 'registration_id',
  updated_at: 'updated_at',
  visit_date: 'visit_date'
};

exports.Prisma.RegistrationScalarFieldEnum = {
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

exports.Prisma.MedsTemplateScalarFieldEnum = {
  meds_template_id: 'meds_template_id',
  template_name: 'template_name'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  password: 'password',
  role: 'role',
  emailVerified: 'emailVerified',
  image: 'image'
};

exports.Prisma.AccountScalarFieldEnum = {
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

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires'
};

exports.Prisma.VerificationTokenScalarFieldEnum = {
  id: 'id',
  identifier: 'identifier',
  token: 'token',
  expires: 'expires'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};


exports.Prisma.ModelName = {
  Admission_Discharge: 'Admission_Discharge',
  Admitted_Location: 'Admitted_Location',
  OT: 'OT',
  OT_Templates: 'OT_Templates',
  Appointment: 'Appointment',
  Consultation: 'Consultation',
  Registration: 'Registration',
  MedsTemplate: 'MedsTemplate',
  User: 'User',
  Account: 'Account',
  Session: 'Session',
  VerificationToken: 'VerificationToken'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
