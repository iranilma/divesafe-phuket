import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lead, DivingExperience, Destination, BusinessSettings, LeadStatus, LeadNote, PaymentStatus } from '../types';
import { initialLeads, initialExperiences, initialDestinations, initialSettings } from '../data/initialData';

export interface ActivityLog {
  id: string;
  type: 'new_lead' | 'status_change' | 'note_added' | 'followup_set';
  message: string;
  timestamp: string;
  leadId?: string;
}

interface DataContextType {
  leads: Lead[];
  experiences: DivingExperience[];
  destinations: Destination[];
  settings: BusinessSettings;
  activities: ActivityLog[];
  addLead: (leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'status'> & { status?: LeadStatus }) => Lead;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  updateLeadPaymentStatus: (id: string, paymentStatus: PaymentStatus) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  addLeadNote: (leadId: string, text: string, author?: string) => void;
  setFollowUpDate: (leadId: string, date: string) => void;
  updateExperience: (id: string, updates: Partial<DivingExperience>) => void;
  addExperience: (exp: DivingExperience) => void;
  updateSettings: (newSettings: Partial<BusinessSettings>) => void;
  resetToDemoData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEY_LEADS = 'divesafe_leads_v2';
const STORAGE_KEY_EXPERIENCES = 'divesafe_experiences_v2';
const STORAGE_KEY_SETTINGS = 'divesafe_settings_v2';
const STORAGE_KEY_ACTIVITIES = 'divesafe_activities_v2';

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LEADS);
      return saved ? JSON.parse(saved) : initialLeads;
    } catch {
      return initialLeads;
    }
  });

  const [experiences, setExperiences] = useState<DivingExperience[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_EXPERIENCES);
      return saved ? JSON.parse(saved) : initialExperiences;
    } catch {
      return initialExperiences;
    }
  });

  const [destinations] = useState<Destination[]>(initialDestinations);

  const [settings, setSettings] = useState<BusinessSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      return saved ? JSON.parse(saved) : initialSettings;
    } catch {
      return initialSettings;
    }
  });

  const [activities, setActivities] = useState<ActivityLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ACTIVITIES);
      return saved ? JSON.parse(saved) : [
        {
          id: 'act-1',
          type: 'new_lead',
          message: 'Alexander Petrov confirmed booking for Phi Phi Day Trip (2 divers)',
          timestamp: '2026-11-19T14:20:00Z',
          leadId: 'DSP-8401'
        },
        {
          id: 'act-2',
          type: 'status_change',
          message: 'Sarah Jenkins moved to Booking Pending (Discover Scuba)',
          timestamp: '2026-11-21T09:15:00Z',
          leadId: 'DSP-8402'
        },
        {
          id: 'act-3',
          type: 'new_lead',
          message: 'Marcus Lindqvist submitted new enquiry for Advanced Open Water',
          timestamp: '2026-11-21T18:20:00Z',
          leadId: 'DSP-8405'
        }
      ];
    } catch {
      return [];
    }
  });

  const logActivity = (type: ActivityLog['type'], message: string, leadId?: string) => {
    const newAct: ActivityLog = {
      id: 'act-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      type,
      message,
      timestamp: new Date().toISOString(),
      leadId
    };
    setActivities(prev => {
      const updated = [newAct, ...prev].slice(0, 50);
      try {
        localStorage.setItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const saveLeads = (newLeads: Lead[]) => {
    setLeads(newLeads);
    try {
      localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(newLeads));
      window.dispatchEvent(new Event('divesafe-data-sync'));
    } catch (e) {
      console.error(e);
    }
  };

  const saveExperiences = (newExp: DivingExperience[]) => {
    setExperiences(newExp);
    try {
      localStorage.setItem(STORAGE_KEY_EXPERIENCES, JSON.stringify(newExp));
      window.dispatchEvent(new Event('divesafe-data-sync'));
    } catch (e) {
      console.error(e);
    }
  };

  const saveSettings = (newSettings: BusinessSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(newSettings));
      window.dispatchEvent(new Event('divesafe-data-sync'));
    } catch (e) {
      console.error(e);
    }
  };

  // Sync across tabs
  useEffect(() => {
    const handleStorage = () => {
      try {
        const savedLeads = localStorage.getItem(STORAGE_KEY_LEADS);
        if (savedLeads) setLeads(JSON.parse(savedLeads));
        const savedExp = localStorage.getItem(STORAGE_KEY_EXPERIENCES);
        if (savedExp) setExperiences(JSON.parse(savedExp));
        const savedSet = localStorage.getItem(STORAGE_KEY_SETTINGS);
        if (savedSet) setSettings(JSON.parse(savedSet));
        const savedAct = localStorage.getItem(STORAGE_KEY_ACTIVITIES);
        if (savedAct) setActivities(JSON.parse(savedAct));
      } catch (e) {
        console.error(e);
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('divesafe-data-sync', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('divesafe-data-sync', handleStorage);
    };
  }, []);

  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'status'> & { status?: LeadStatus }): Lead => {
    const newId = `DSP-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();
    const newLead: Lead = {
      ...leadData,
      id: newId,
      status: leadData.status || 'New',
      enquiryDate: now.split('T')[0],
      requestedDivingDate: leadData.preferredDate,
      paymentStatus: leadData.paymentStatus || 'Unpaid',
      confirmationDate: leadData.status === 'Confirmed' ? now.split('T')[0] : leadData.confirmationDate,
      createdAt: now,
      updatedAt: now,
      notes: leadData.notes || []
    };

    const updated = [newLead, ...leads];
    saveLeads(updated);
    logActivity('new_lead', `Demo enquiry ${newId} saved locally from ${newLead.customerName} (${newLead.selectedExperienceTitle})`, newId);
    return newLead;
  };

  const updateLeadStatus = (id: string, status: LeadStatus) => {
    const now = new Date().toISOString();
    const updated = leads.map(l => {
      if (l.id === id) {
        return {
          ...l,
          status,
          updatedAt: now,
          confirmationDate: status === 'Confirmed' ? (l.confirmationDate || now.split('T')[0]) : l.confirmationDate
        };
      }
      return l;
    });
    saveLeads(updated);
    const target = leads.find(l => l.id === id);
    logActivity('status_change', `Status changed to "${status}" for ${target?.customerName || id}`, id);
  };

  const updateLeadPaymentStatus = (id: string, paymentStatus: PaymentStatus) => {
    const now = new Date().toISOString();
    const updated = leads.map(l => {
      if (l.id === id) {
        return { ...l, paymentStatus, updatedAt: now };
      }
      return l;
    });
    saveLeads(updated);
    logActivity('status_change', `Payment status updated to "${paymentStatus}" for ${id}`, id);
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    const updated = leads.map(l => {
      if (l.id === id) {
        return { ...l, ...updates, updatedAt: new Date().toISOString() };
      }
      return l;
    });
    saveLeads(updated);
    logActivity('status_change', `Lead details updated for ${id}`, id);
  };

  const deleteLead = (id: string) => {
    const updated = leads.filter(l => l.id !== id);
    saveLeads(updated);
    logActivity('status_change', `Enquiry ${id} was removed`, id);
  };

  const addLeadNote = (leadId: string, text: string, author: string = 'Staff') => {
    const now = new Date().toISOString();
    const newNote: LeadNote = {
      id: 'note-' + Date.now(),
      author,
      text,
      createdAt: now
    };

    const updated = leads.map(l => {
      if (l.id === leadId) {
        const notes = l.notes ? [...l.notes, newNote] : [newNote];
        return { ...l, notes, updatedAt: now };
      }
      return l;
    });
    saveLeads(updated);
    logActivity('note_added', `Note added to ${leadId} by ${author}`, leadId);
  };

  const setFollowUpDate = (leadId: string, date: string) => {
    const updated = leads.map(l => {
      if (l.id === leadId) {
        return { ...l, followUpDate: date, updatedAt: new Date().toISOString() };
      }
      return l;
    });
    saveLeads(updated);
    logActivity('followup_set', `Follow-up scheduled for ${leadId} on ${date}`, leadId);
  };

  const updateExperience = (id: string, updates: Partial<DivingExperience>) => {
    const updated = experiences.map(e => e.id === id ? { ...e, ...updates } : e);
    saveExperiences(updated);
  };

  const addExperience = (exp: DivingExperience) => {
    const updated = [exp, ...experiences];
    saveExperiences(updated);
  };

  const updateSettings = (newSettings: Partial<BusinessSettings>) => {
    const updated = { ...settings, ...newSettings };
    saveSettings(updated);
  };

  const resetToDemoData = () => {
    try {
      localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(initialLeads));
      localStorage.setItem(STORAGE_KEY_EXPERIENCES, JSON.stringify(initialExperiences));
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(initialSettings));
      const resetAct: ActivityLog[] = [
        {
          id: 'act-init',
          type: 'new_lead',
          message: 'Demo records restored to default demonstration state',
          timestamp: new Date().toISOString()
        }
      ];
      localStorage.setItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(resetAct));
      setLeads(initialLeads);
      setExperiences(initialExperiences);
      setSettings(initialSettings);
      setActivities(resetAct);
      window.dispatchEvent(new Event('divesafe-data-sync'));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <DataContext.Provider
      value={{
        leads,
        experiences,
        destinations,
        settings,
        activities,
        addLead,
        updateLeadStatus,
        updateLeadPaymentStatus,
        updateLead,
        deleteLead,
        addLeadNote,
        setFollowUpDate,
        updateExperience,
        addExperience,
        updateSettings,
        resetToDemoData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
