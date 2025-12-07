import type { TCase } from "@/types/case.type";

export const demoCases: TCase[] = [
  {
    case_number: "DC-2024-001",
    file_number: "FILE-001",
    court_id: "1",
    lawyer_id: "1",
    case_stage: "Active",
    case_description: "Property dispute involving ancestral land ownership.",

    client_name: "Md. Abdul Karim",
    client_description: "Claiming ownership based on inheritance documents.",
    account_number: "ACC-1001",
    account_name: "Abdul Karim",
    account_id: "CLI-001",

    party_name: "Md. Rahman Ali",
    party_description: "Younger brother claiming equal share of property.",
    party_notes: "Family settlement talks ongoing.",

    hearings: [
      {
        hearing_date: "2024-08-15",
        details: "Initial hearing completed, documents submitted.",
      },
      {
        hearing_date: "2024-09-20",
        details: "Next hearing scheduled for witness examination.",
        file: "https://example.com/hearings/hearing-1.pdf",
      },
    ],

    payments: [
      {
        paid_amount: 5000,
        paid_date: "2024-08-01",
      },
      {
        paid_amount: 3000,
        paid_date: "2024-09-10",
      },
    ],
  },
  {
    case_number: "SC-2023-014",
    file_number: "FILE-014",
    court_id: "2",
    lawyer_id: "2",
    case_stage: "Disposed",
    case_description: "Business contract violation case between two firms.",

    client_name: "Rahman Traders Ltd.",
    client_description: "Wholesale company seeking unpaid dues.",
    account_number: "ACC-2002",
    account_name: "Rahman Traders Ltd.",
    account_id: "CLI-002",

    party_name: "Khan Enterprise",
    party_description: "Distributor accused of breaching contract terms.",
    party_notes: "Final judgment passed by court.",

    hearings: [
      {
        hearing_date: "2023-04-05",
        details: "Final hearing and verdict delivered.",
        file: "https://example.com/hearings/verdict-14.pdf",
      },
    ],

    payments: [
      {
        paid_amount: 25000,
        paid_date: "2023-05-02",
      },
    ],
  },
  {
    case_number: "DC-2022-078",
    file_number: "FILE-078",
    court_id: "1",
    lawyer_id: "1",
    case_stage: "Left",
    case_description: "Tenant eviction case withdrawn after settlement.",

    client_name: "Nasima Begum",
    client_description: "Residential property owner.",
    account_number: "ACC-3078",
    account_name: "Nasima Begum",
    account_id: "CLI-003",

    party_name: "Star Electronics",
    party_description: "Tenant operating an electronics shop.",
    party_notes: "Outside court settlement reached.",

    hearings: [
      {
        hearing_date: "2022-06-12",
        details: "Case withdrawn after mutual agreement.",
      },
    ],

    payments: [
      {
        paid_amount: 8000,
        paid_date: "2022-06-20",
      },
    ],
  },
  {
    case_number: "SC-2024-006",
    file_number: "FILE-006",
    court_id: "2",
    lawyer_id: "3",
    case_stage: "Active",
    case_description: "Consumer fraud case against online marketplace.",

    client_name: "Hasan Mahmud",
    client_description: "Consumer filing complaint for online fraud.",
    account_number: "ACC-4506",
    account_name: "Hasan Mahmud",
    account_id: "CLI-004",

    party_name: "FastBuy BD",
    party_description: "E-commerce platform accused of unfair practices.",
    party_notes: "Evidence under review.",

    hearings: [
      {
        hearing_date: "2024-07-10",
        details: "First hearing conducted, notices issued.",
      },
      {
        hearing_date: "2024-09-12",
        details: "Next hearing scheduled.",
      },
    ],

    payments: [
      {
        paid_amount: 3000,
        paid_date: "2024-06-28",
      },
    ],
  },
  {
    case_number: "DC-2021-099",
    file_number: "FILE-099",
    court_id: "1",
    lawyer_id: "2",
    case_stage: "Disposed",
    case_description: "Inheritance dispute resolved through mediation.",

    client_name: "Farid Ahmed",
    client_description: "Legal heir involved in inheritance case.",
    account_number: "ACC-9099",
    account_name: "Farid Ahmed",
    account_id: "CLI-005",

    party_name: "Family Members",
    party_description: "Multiple heirs disputing ownership.",
    party_notes: "Settlement approved by court.",

    hearings: [
      {
        hearing_date: "2021-03-18",
        details: "Mediation session completed successfully.",
        file: "https://example.com/hearings/settlement-99.pdf",
      },
    ],

    payments: [
      {
        paid_amount: 15000,
        paid_date: "2021-04-01",
      },
    ],
  },
];
