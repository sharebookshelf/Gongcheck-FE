import { readingTypeInfo } from "@/app/result/resultData";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Trash2, UserIcon } from "lucide-react";
import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { Post as IPost, usePostsQuery } from "../hooks/usePostsQuery";
import { useEffect, useState } from "react";

type Props = {
  post: IPost;
  likes: { [key: number]: boolean };
  handleLike: (postId: number) => void;
};

export default function Post({ post, likes, handleLike }: Props) {
  const [firstImageSizes, setFirstImageSizes] = useState<{
    [key: string]: { width: number; height: number };
  }>({});
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const handleFirstImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement>,
    userId: string
  ) => {
    setFirstImageSizes((prevSizes) => ({
      ...prevSizes,
      [userId]: {
        width: event.currentTarget.naturalWidth,
        height: event.currentTarget.naturalHeight,
      },
    }));
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      opts={{
        // dragFree: true,
        dragThreshold: 1,
        skipSnaps: true,
      }}
      setApi={setApi}
      className="w-full h-full pointer space-y-2"
    >
      <CarouselContent>
        {post.bookshelves.map((bookshelf, index) => {
          return (
            <CarouselItem
              key={bookshelf.id}
              className=" flex items-center justify-center w-full h-full bg-white"
              style={{
                width: firstImageSizes[post.user.userId]?.width || "auto",
                height: firstImageSizes[post.user.userId]?.height || "auto",
              }}
            >
              <div className="flex items-center justify-center w-full h-full">
                <Image
                  className="object-contain w-full pointer-events-none"
                  priority
                  width={firstImageSizes[post.user.userId]?.width || 300}
                  height={firstImageSizes[post.user.userId]?.height || 300}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${bookshelf.bookShelfImage}`}
                  alt={`Bookshelf ${bookshelf.id}`}
                  onLoad={
                    index === 0
                      ? (event) => handleFirstImageLoad(event, post.user.userId)
                      : undefined
                  }
                />
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      {/* <CarouselPrevious className="absolute left-0 z-10 transform -translate-y-1/2 top-1/2" />
      <CarouselNext className="absolute right-0 z-10 transform -translate-y-1/2 top-1/2" /> */}
      <div className="relative flex flex-row items-center justify-center p-4 transform ">
        <Button className="absolute left-0" variant="ghost" size="icon">
          {likes[post.postId] ? (
            <FaHeart
              size={20}
              onClick={() => handleLike(post.postId)}
              style={{ color: "red" }}
            />
          ) : (
            <FaRegHeart
              size={20}
              onClick={() => handleLike(post.postId)}
              style={{ color: "black" }}
            />
          )}
        </Button>
        <div className="flex space-x-2">
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                current === index + 1 ? "bg-orange-500" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </Carousel>
  );
}
