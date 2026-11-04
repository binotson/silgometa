/**
 * SERVER-SIDE enquiry routing. Imported only by the contact API route.
 *
 * The recipient is always chosen here from the validated enquiry type. The
 * browser never supplies, and can never override, a recipient address.
 * There is deliberately no fallback: if a department mailbox rejects mail,
 * the enquiry fails visibly rather than going to another department.
 */
import { isEnquiryType, type EnquiryType } from "./contact";

export type EnquiryRoute = {
  /** Department mailbox that receives the enquiry. */
  mailbox: string;
  /** Department name, used in subjects and email bodies. */
  department: string;
};

export const enquiryRoutes: Readonly<Record<EnquiryType, EnquiryRoute>> = Object.freeze({
  "Capital markets & deal structuring": {
    mailbox: "mdahmad@silgometa.com.ng",
    department: "Capital Markets",
  },
  "Strategy & marketing consultancy": {
    mailbox: "sales@silgometa.com.ng",
    department: "Strategy & Marketing",
  },
  "Infrastructure & technology": {
    mailbox: "support@silgometa.com.ng",
    department: "Infrastructure & Technology",
  },
  "Business consulting & capacity building": {
    mailbox: "fadil@silgometa.com.ng",
    department: "Business Consulting & Capacity Building",
  },
  Careers: {
    mailbox: "secretariat@silgometa.com.ng",
    department: "Careers & Recruitment",
  },
  "General enquiry": {
    mailbox: "infor@silgometa.com.ng",
    department: "General Enquiries",
  },
});

/** The route for a validated enquiry type, or undefined for anything else. */
export function routeForEnquiry(enquiryType: string): EnquiryRoute | undefined {
  return isEnquiryType(enquiryType) ? enquiryRoutes[enquiryType] : undefined;
}
