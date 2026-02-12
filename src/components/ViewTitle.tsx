export interface ViewTitleProps {
  text: string;
}

export function ViewTitle(props: ViewTitleProps) {
  const { text } = props;
  return (
    <div className="w-full uppercase text-primary text-lg sm:text-xl md:text-2xl font-bold px-2 sm:px-4 py-1.5 sm:py-2 truncate">
        {text}
    </div>
  );
}
