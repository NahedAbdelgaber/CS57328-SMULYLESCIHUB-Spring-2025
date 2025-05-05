export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
  }
  
  export interface ResearcherProfile {
    id: number;
    userId: number;
    fullName: string;
    department: string;
    position: string;
    bio: string;
    linkedinUrl: string;
    googleScholarUrl: string;
  }
  
  export interface Document {
    id: number;
    researcherId: number;
    title: string;
    documentType: string;
    filePath: string;
    uploadDate: string;
    fileSize: number;
    processingStatus: string;
  }
  
  export interface WordCloudData {
    words: {
      text: string;
      value: number;
    }[];
  }
  
  export interface TopicPieChartData {
    labels: string[];
    data: number[];
  }
  
  export interface KeywordBarChartData {
    labels: string[];
    data: number[];
  }
  
  export interface TopicTrendData {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    }[];
  }
  
  export interface AdminAnalyticsData {
    departments: {
      [key: string]: number;
    };
    topTopics: TopicEntry[];
    researcherSummaries: ResearcherSummary[];
  }
  
export interface TopicEntry {
  topic: string;
  count: number;
}
  
  export interface AuthResponse {
    token: string;
    type: string;
    id: number;
    username: string;
    email: string;
    role: string;
  }

  export interface ResearcherSummary {
    name: string;
    department: string;
    topTopic: string;
    totalPapers: number;
  }
  
  export interface MessageResponse {
    message: string;
  }
  