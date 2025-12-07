export type TCaseStage = "Disposed" | "Left" | "Active";

export type Hearing = {
  hearing_date: string; // ISO date string (yyyy-mm-dd)
  details: string;
  file?: string; // file URL (optional)
};

export type Payment = {
  paid_amount: number; // better as number for calculations
  paid_date: string; // ISO date string
};

export type TCase = {
  // --------------------
  // Case info
  // --------------------
  case_number: string;
  file_number: string;
  court_id: string;
  lawyer_id: string;
  case_stage: TCaseStage;
  case_description: string;

  // --------------------
  // Client info
  // --------------------
  client_name: string;
  client_description: string;
  account_number: string;
  account_name: string;
  account_id: string;

  // --------------------
  // Party info
  // --------------------
  party_name: string;
  party_description: string;
  party_notes: string;

  // --------------------
  // Case activity
  // --------------------
  hearings: Hearing[];
  payments: Payment[];
};
