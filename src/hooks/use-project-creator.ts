import { useState } from 'react';
import { type ProjectFormData } from '@/types/project';

const initialFormData: ProjectFormData = {
  // Step 1: Basic Info
  title: '',
  description: '',
  objectives: '',
  category: '',
  professor: '',
  duration: '',
  
  // Step 2: Technical Details
  technologies: [],
  tags: [],
  status: 'planning',
  github_url: '',
  documentation_url: '',
  demo_url: '',
  is_open_source: false,
  seeking_collaborators: false,
  
  // Step 3: Contact Info
  contact_email: '',
  phone_number: '',
  linkedin_url: '',
  personal_website: '',
  
  // Step 4: Additional Info
  team_members: [],
  challenges: '',
  achievements: '',
  image_url: '',
  additional_links: []
};

export function useProjectCreator() {
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (updates: Partial<ProjectFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const submitProject = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Implement actual project creation API call
      console.log('Creating project:', formData);
      
      // Reset form after successful submission
      resetForm();
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    updateFormData,
    resetForm,
    isSubmitting,
    submitProject
  };
}