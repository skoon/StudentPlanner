import { Book, FlaskConical, History, Palette, Sigma, Star } from 'lucide-react';

export const subjectIcons: { [key: string]: React.ReactElement } = {
  Math: <Sigma className="h-4 w-4 text-primary" />,
  Science: <FlaskConical className="h-4 w-4 text-primary" />,
  History: <History className="h-4 w-4 text-primary" />,
  English: <Book className="h-4 w-4 text-primary" />,
  Art: <Palette className="h-4 w-4 text-primary" />,
  Other: <Star className="h-4 w-4 text-primary" />,
};

export const getSubjectIcon = (subject: string): React.ReactElement => {
  return subjectIcons[subject] || <Star className="h-4 w-4 text-primary" />;
};
