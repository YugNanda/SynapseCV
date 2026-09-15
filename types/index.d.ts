export interface Job {
  title: string;
  description: string;
  location: string;
  requiredSkills: string[];
}

export interface Resume {
  id: string;
  companyName?: string;
  jobTitle?: string;
  imagePath: string;
  resumePath: string;
  feedback: Feedback;
}

export interface Feedback {
  overallScore: number;
  ATS: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
    }[];
  };
  toneAndStyle: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
  content: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
  structure: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
  skills: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
}

export interface KVItem {
  key: string;
  value: string;
}

export interface FSItem {
  name: string;
  path: string;
  size: number;
  type: 'file' | 'directory';
}

export interface AIResponse {
  message: {
    content: string;
    role: string;
  };
}

export interface PuterUser {
  id: string;
  email: string;
  username: string;
}

export interface ChatMessage {
  role: string;
  content: string;
}

export interface PuterChatOptions {
  [key: string]: any;
}