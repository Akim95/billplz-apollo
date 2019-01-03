import { gql } from "apollo-server";

const typeDefs = gql`
  enum Status {
    active
    inactive
  }

  enum CollectionStatus {
    deactivate
    activate
  }

  enum PaymentButton {
    pay
    buy
  }

  enum MPIStatus {
    processing
    completed
    refunded
  }

  enum State {
    due
    paid
    hidden
  }

  input SplitPaymentsInput {
    email: String
    fixed_cut: Int
    variable_cut: Int
    stack_order: Int
  }

  type SplitPayments {
    email: String
    fixed_cut: Int
    variable_cut: Int
    stack_order: Int
  }

  type Logo {
    thumb_url: String
    avatar_url: String
  }

  type Photo {
    avatar_url: String
    retina_url: String
  }

  type Collection {
    id: ID
    logo: Logo
    title: String
    split_payments: [SplitPayments]
    split_header: Boolean
    status: Status
  }

  type OpenCollection {
    id: ID
    title: String
    description: String
    amount: Int!
    fixed_amount: Boolean
    fixed_quantity: Boolean
    payment_button: PaymentButton
    reference_1_label: String
    reference_2_label: String
    email_link: String
    tax: Int
    photo: Photo
    split_payments: [SplitPayments]
    split_header: Boolean
    url: String
    status: Status
  }

  type MPICollection {
    id: ID
    title: String
    mass_payment_instructions_count: String
    paid_amount: String
    status: Status
  }

  type MPI {
    id: ID
    mass_payment_instruction_collection_id: String
    bank_code: String
    bank_account_number: String
    identity_number: String
    name: String
    description: String
    email: String
    status: MPIStatus
    notification: Boolean
    recipient_notification: Boolean
    total: Int
  }

  type WebhooRank {
    rank: Float
  }

  type Bill {
    id: String
    collection_id: String
    email: String
    mobile: String
    name: String
    amount: Int
    callback_url: String
    description: String
    due_at: String
    redirect_url: String
    reference_1_label: String
    reference_1: String
    reference_2_label: String
    reference_2: String
    state: State
    paid: Boolean
    paid_amount: Int
    url: String
  }

  type RegistrationCheckByBankAccountNumber {
    name: String
  }

  enum TransactionStatus {
    pending
    completed
    failed
  }

  type TransactionList {
    id: ID
    status: TransactionStatus
    completed_at: String
    payment_channel: String
  }

  type Transaction {
    bill_id: ID
    transactions: [TransactionList]
    page: Int
  }

  input PaymentMethodInput {
    code: String
  }

  type PaymentMethod {
    code: String
    name: String
    active: Boolean
  }

  type BankAccount {
    name: String
    id_no: String
    acc_no: String
    code: String
    organization: Boolean
    authorization_date: String
    status: String
    processed_at: String
    reject_desc: String
  }

  type FPXBank {
    name: String
    active: Boolean
  }

  type Query {
    getCollection(id: ID): Collection
    getCollectionIndex(page: Int = 1, status: Status): [Collection]
    getOpenCollection(id: ID): OpenCollection
    getOpenCollectionIndex(page: Int = 1, status: Status): [OpenCollection]
    getMPICollection(id: ID!): MPICollection
    getMPI(id: ID): MPI
    getWebHookRank: WebhooRank
    getBill(id: ID!): Bill
    registrationCheckByBankAccountNumber(
      BANK_ACCOUNT_NUMBER: String!
    ): RegistrationCheckByBankAccountNumber
    getTransactionIndex(
      bill_id: ID
      page: Int = 1
      status: TransactionStatus
    ): Transaction
    getPaymentMethodIndex(COLLECTION_ID: ID!): [PaymentMethod]
    getBankAccount(BANK_ACCOUNT_NUMBER: String!): BankAccount
    getFPXBanks: [FPXBank]
  }

  type Mutation {
    createCollection(
      title: String!
      split_payments: [SplitPaymentsInput]
      split_header: Boolean
    ): Collection
    createOpenCollection(
      title: String!
      description: String!
      amount: Int!
      fixed_amount: Boolean
      fixed_quantity: Boolean
      payment_button: PaymentButton
      reference_1_label: String
      reference_2_label: String
      email_link: String
      tax: Int
      split_payments: [SplitPaymentsInput]
      split_header: Boolean
    ): OpenCollection
    collectionActivation(id: ID!, status: CollectionStatus!): String
    createMPICollection(title: String!): MPICollection
    createMPI(
      mass_payment_instruction_collection_id: ID!
      bank_code: String!
      bank_account_number: String!
      identity_number: String!
      name: String!
      description: String!
      total: Int!
      email: String
      notification: Boolean
      recipient_notification: Boolean
    ): MPI
    createBill(
      collection_id: String!
      email: String!
      mobile: String!
      name: String!
      amount: Int!
      callback_url: String!
      description: String!
      due_at: String
      redirect_url: String
      deliver: Boolean
      reference_1_label: String
      reference_1: String
      reference_2_label: String
      reference_2: String
    ): Bill
    deleteBill(id: ID): String
    updatePaymentMethods(
      COLLECTION_ID: ID!
      payment_methods: [PaymentMethodInput!]!
    ): [PaymentMethod]
    createBankAccount(
      name: String!
      id_no: String!
      acc_no: String!
      code: String!
      organization: Boolean! = false
    ): BankAccount
  }
`;

export default typeDefs;
