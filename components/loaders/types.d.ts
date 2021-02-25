interface StepperProps {
  value: number;
  progress: number;
  steps: StepProps[];
}

interface StepProps {
  label: string;
  content?: number | string | JSX.Element;
  progress?: number;
  active?: boolean;
}
