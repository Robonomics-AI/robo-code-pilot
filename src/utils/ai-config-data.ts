
import { Bot, BrainCircuit, Cloud, Fingerprint, SearchCode, Wind } from 'lucide-react';
import { ComponentType } from 'react';

export interface AIModel {
  id: string;
  name: string;
}

export interface Vendor {
  id: string;
  name: string;
  logo: ComponentType<{className?: string}>;
  docsUrl: string;
  models: AIModel[];
}

export interface AITask {
    id: string;
    name: string;
    description: string;
    defaultModel: string;
    defaultEnabled: boolean;
}

export const VENDOR_DATA = {
  google: {
    id: 'google',
    name: 'Google AI',
    logo: BrainCircuit,
    docsUrl: 'https://ai.google.dev/docs',
    models: [
      { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro' },
      { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash' },
    ],
  },
  openai: {
    id: 'openai',
    name: 'OpenAI',
    logo: Bot,
    docsUrl: 'https://platform.openai.com/docs/overview',
    models: [
      { id: 'gpt-4o', name: 'GPT-4o' },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
    ],
  },
  anthropic: {
    id: 'anthropic',
    name: 'Anthropic',
    logo: Fingerprint,
    docsUrl: 'https://docs.anthropic.com/claude/reference/getting-started-with-the-api',
    models: [
      { id: 'claude-3-opus', name: 'Claude 3 Opus' },
      { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet' },
      { id: 'claude-3-haiku', name: 'Claude 3 Haiku' },
    ],
  },
  azure: {
    id: 'azure',
    name: 'Microsoft Azure',
    logo: Cloud,
    docsUrl: 'https://azure.microsoft.com/en-us/products/ai-services',
    models: [],
  },
  mistral: {
    id: 'mistral',
    name: 'Mistral AI',
    logo: Wind,
    docsUrl: 'https://docs.mistral.ai/',
    models: [
        { id: 'mistral-large', name: 'Mistral-Large' },
        { id: 'mistral-small', name: 'Mistral-Small' },
    ],
  },
  deepseek: {
    id: 'deepseek',
    name: 'DeepSeek',
    logo: SearchCode,
    docsUrl: 'https://platform.deepseek.com/docs',
    models: [
        { id: 'deepseek-coder-v2', name: 'DeepSeek-Coder-V2' },
    ],
  },
};

export const TASK_DATA = {
    aiQaCodeReview: {
        id: 'aiQaCodeReview',
        name: 'AI QA - General Code Review',
        description: 'The primary AI model used for the automated Triage/AI QA step. Reviews code for quality, best practices, and clarity.',
        defaultModel: '',
        defaultEnabled: true,
    },
    ipaDocumentContext: {
        id: 'ipaDocumentContext',
        name: 'IPA - Document Context',
        description: 'The model the IPA uses to answer questions about BRDs, PRDs, and other documents. Optimized for long-context understanding.',
        defaultModel: '',
        defaultEnabled: true,
    },
    vibeCoderPromptGen: {
        id: 'vibeCoderPromptGen',
        name: 'Vibe Coder Prompt Generation',
        description: '(Future) AI that helps the Business Team formulate better prompts for Vibe Coding tools.',
        defaultModel: '',
        defaultEnabled: false,
    },
};
