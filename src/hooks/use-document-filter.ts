
import { useState, useCallback } from 'react';

type Category = 'all' | 'pr' | 'kernel' | 'arch';

export const useDocumentFilter = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filterDocuments = useCallback((documents: any[], category: Category) => {
    if (category === 'all') {
      return documents;
    }
    
    return documents.filter(doc => doc.category === category);
  }, []);

  return {
    activeCategory,
    setActiveCategory,
    filterDocuments
  };
};
