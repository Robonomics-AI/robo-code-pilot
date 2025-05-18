
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-robonomics-off-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6 text-robonomics-intelliblue">RoboCode Platform</h1>
        <p className="text-xl text-robonomics-dark-grey mb-8">AI-First SDLC Orchestration Platform</p>
        <div className="flex gap-4 justify-center">
          <Button asChild className="bg-robonomics-intelliblue hover:bg-robonomics-intelliblue/90">
            <Link to="/documents">Document Manager</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
