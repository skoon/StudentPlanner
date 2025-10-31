import * as React from 'react';
import { Book, FlaskConical, History, Palette, Sigma, Star } from 'lucide-react';
import { getSubjectColor } from '@/lib/utils';

export const subjectIcons: { [key: string]: React.ReactElement } = {
  Math: <Sigma className="h-4 w-4" />,
  Science: <FlaskConical className="h-4 w-4" />,
  History: <History className="h-4 w-4" />,
  English: <Book className="h-4 w-4" />,
  Art: <Palette className="h-4 w-4" />,
  Other: <Star className="h-4 w-4" />,
};

export const getSubjectIcon = (subject: string): React.ReactElement => {
  const icon = subjectIcons[subject] || <Star className="h-4 w-4" />;
  const colorClass = getSubjectColor(subject);
  return React.cloneElement(icon, { className: `h-4 w-4 ${colorClass}` });
};
