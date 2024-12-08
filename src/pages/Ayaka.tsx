import { useAyakaImage } from "../service";

export default function Ayaka() {
  const { data, refetch } = useAyakaImage();

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden">
      {data?.images?.map((image) => (
        <div>
          <img
            src={image.url}
            className="absolute inset-0 object-cover w-full h-full scale-150 blur-md"
          />
          <div className="relative size-[800px]">
            <img
              onClick={() => refetch()}
              src={image.url}
              className="object-cover object-top rounded-md cursor-pointer size-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
