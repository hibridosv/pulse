import { CirclesWithBar } from "react-loader-spinner";

export interface LoaderProps{
    size?: string;
    visible?: boolean;
}
export function Loader(props: LoaderProps) {
  const { size = "120", visible = true } = props;

  return (<div className="z-50 flex items-center justify-center w-full h-full bg-background-main bg-opacity-75">
    <CirclesWithBar
        height={size}
        width={size}
        color="#0db4f8"
        outerCircleColor="#0a89bd"
        innerCircleColor="#024a68"
        barColor="#42b3e7"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={visible}
        />
    </div>);
}