import { Lead } from '../types';

export const isValidPhoneNumber = (phone: string): boolean => {
  if (!phone) return false;
  const digits = phone.replace(/[^0-9]/g, '');
  return digits.length >= 8 && digits.length <= 16;
};

export const sanitizePhoneNumber = (phone: string, defaultNumber: string = '66940018590'): string => {
  if (!phone) return defaultNumber;
  let digits = phone.replace(/[^0-9]/g, '');
  // If user entered local Thai number like 0940018590, convert leading 0 to 66
  if (digits.startsWith('0') && digits.length === 10) {
    digits = '66' + digits.substring(1);
  }
  return digits.length >= 8 ? digits : defaultNumber;
};

export const buildLeadWhatsAppMessage = (lead: Partial<Lead>): string => {
  const parts = [
    'Hello DiveSafe Phuket! 🌊',
    '',
    "I'm interested in:",
    '',
    `Experience: ${lead.selectedExperienceTitle || 'Diving in Phuket'}`,
    `Certification / Level: ${lead.certification || 'None / Beginner'}`,
    `Number of participants: ${lead.participants || 1}`,
    `Preferred diving date: ${lead.preferredDate || 'Flexible / Upcoming'}`,
    `Accommodation / Hotel: ${lead.accommodation || 'Not specified yet'}`,
    lead.loggedDives ? `Logged dives: ${lead.loggedDives} (Last dive: ${lead.lastDive || 'N/A'})` : '',
    lead.footSize ? `Shoe/Fin sizes: ${lead.footSize}` : '',
    lead.additionalRequests ? `Special requests / notes: ${lead.additionalRequests}` : '',
    '',
    'My Contact Details:',
    `Name: ${lead.customerName || ''}`,
    `Email: ${lead.email || ''}`,
    `WhatsApp / Phone: ${lead.whatsapp || ''}`,
    '',
    'Please confirm availability and send me full pricing details. Thank you!'
  ];

  return parts.filter(p => p !== '').join('\n');
};

export const createWhatsAppUrl = (phoneNumber: string, message: string): string => {
  const cleanNumber = sanitizePhoneNumber(phoneNumber);
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
};

export const adminWhatsAppTemplates = {
  newEnquiryReply: (lead: Lead, managerName: string = 'Roman Zack') => {
    return `Hello ${lead.customerName}! 🌊
Thank you for reaching out to DiveSafe Phuket regarding "${lead.selectedExperienceTitle}".
This is ${managerName} from DiveSafe Phuket.
I would be happy to welcome you and your group (${lead.participants} person${lead.participants > 1 ? 's' : ''}) on ${lead.preferredDate}.
Do you have any questions about equipment, pickup from ${lead.accommodation || 'your hotel'}, or dive conditions?`;
  },

  followUpReminder: (lead: Lead) => {
    return `Hi ${lead.customerName}, greeting from DiveSafe Phuket!
Just following up on your enquiry for ${lead.selectedExperienceTitle} on ${lead.preferredDate}.
Our boat spaces are filling up for those dates—would you like me to hold slots for your group?`;
  },

  bookingConfirmation: (lead: Lead) => {
    return `🎉 Booking Confirmation - DiveSafe Phuket
Dear ${lead.customerName},
Your diving trip for "${lead.selectedExperienceTitle}" on ${lead.preferredDate} is CONFIRMED for ${lead.participants} diver${lead.participants > 1 ? 's' : ''}!
Our driver will pick you up from: ${lead.accommodation || 'your hotel'} (pickup time usually 7:15 - 7:45 AM).
Please remember to bring swimwear, sunglasses, and reef-safe sunscreen.
See you on board! 🤿`;
  },

  equipmentAndShoeSize: (lead: Lead) => {
    return `Hi ${lead.customerName},
To prepare your diving equipment beforehand, could you please confirm the shoe/fin size and approximate heights/weights for all ${lead.participants} participant${lead.participants > 1 ? 's' : ''}?
Thank you, DiveSafe Phuket team!`;
  }
};
