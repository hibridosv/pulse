export interface ViewTitleProps {
  text: string;
}

export function ViewTitle(props: ViewTitleProps) {
  const { text } = props;
  return (
    <div className="w-full uppercase text-primary text-2xl font-bold px-4 py-2">
        {text}
    </div>
  );
}
