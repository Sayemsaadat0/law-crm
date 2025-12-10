export type TCaseStage = "Disposed" | "Left" | "Active";

export type Hearing = {
  title: string;
  serial_no: string;
  hearing_date: string; // ISO date string (yyyy-mm-dd)
  details: string;
  file?: string; // file URL (optional)
};

export type Payment = {
  paid_amount: number; // better as number for calculations
  paid_date: string; // ISO date string
};

export type CourtDetails = {
  id: string;
  name: string;
  address: string;
};

export type LawyerDetails = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  details: string;
  thumbnail: string;
};

export type ClientDetails = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  details: string;
  thumbnail: string;
  account_number: string;
  account_name: string;
  account_id: string;
  description: string;
  branch: string;
};

export type PartyDetails = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  details: string;
  thumbnail: string;
};

export type TCase = {
  id: string;
  case_number: string;
  file_number: string;
  case_stage: TCaseStage;
  case_description: string;
  court_id: string;
  // DETAILS
  court_details: CourtDetails;
  lawyer_id: string;
  // DETAILS
  lawyer_details: LawyerDetails;
  client_id: string;
  // DETAILS
  client_details: ClientDetails;
  party_id: string;
  // DETAILS
  party_details: PartyDetails;
  // ACTIVITY
  hearings: Hearing[];
  payments: Payment[];
};
