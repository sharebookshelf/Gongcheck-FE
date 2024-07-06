"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  HeartIcon,
  MessageCircleIcon,
  OptionIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import bookshelfImage from "../../../public/images/bookshelf1.jpg";
import { Button } from "@/components/ui/button";
import { usePostsQuery, User } from "./hooks/usePostsQuery";
import { useEffect, useRef, useState } from "react";
import Loading from "../components/loading";
import { readingTypeInfo } from "../result/resultData";

export default function Page() {
  // const { data: posts } = usePostsQuery();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePostsQuery();

  const observerRef = useRef(null);
  // const [firstImageSize, setFirstImageSize] = useState<{
  //   width: number;
  //   height: number;
  // } | null>(null);
  const [firstImageSizes, setFirstImageSizes] = useState<{
    [key: string]: { width: number; height: number };
  }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const currentObserverRef = observerRef.current;

    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  if (!data) {
    return <Loading />;
  }

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

  console.log(firstImageSizes);

  return (
    <div className="flex flex-col w-full h-full max-w-md mx-auto space-y-8 p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold">다른 사람들의 책장은?</h1>
        <p className="text-muted-foreground">
          다른 독서가들은 어떤 책들을 갖고 어떤 책들을 읽을까요? 마음껏
          둘러보세요!
        </p>
      </div>
      <div className="space-y-4 p-2">
        {data.pages.map((page) =>
          page.map((user) => (
            <Card key={user.userId} className="rounded-lg shadow-md">
              <CardHeader className="flex items-center justify-between">
                <div className="flex items-center space-x-2 w-full">
                  <UserIcon className="h-6 w-6" />
                  <div>
                    <p className="font-semibold">{user.nickname}</p>
                    <p className="text-sm text-muted-foreground">
                      {readingTypeInfo[
                        user.readingType as keyof typeof readingTypeInfo
                      ]?.type || "알 수 없음"}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="w-full h-full flex justify-center items-center">
                <Carousel
                  opts={{
                    align: "center",
                    dragFree: true,
                    watchDrag: false,
                  }}
                  className="w-full h-full"
                >
                  <CarouselContent>
                    {user.bookshelf.map((shelf, index) => {
                      return (
                        <CarouselItem
                          key={shelf.id}
                          className="flex w-full h-full items-center justify-center bg-white"
                          style={{
                            width:
                              firstImageSizes[user.userId]?.width || "auto",
                            height:
                              firstImageSizes[user.userId]?.height || "auto",
                          }}
                        >
                          <div className="relative flex items-center justify-center w-full h-full bg-green-50">
                            <Image
                              className="object-contain"
                              priority
                              width={firstImageSizes[user.userId]?.width || 300}
                              height={
                                firstImageSizes[user.userId]?.height || 300
                              }
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${shelf.bookShelfImage}`}
                              alt={`Bookshelf ${shelf.id}`}
                              style={{
                                height:
                                  firstImageSizes[user.userId]?.height ||
                                  "auto",
                                width: "auto",
                                maxWidth: "100%",
                              }}
                              onLoad={
                                index === 0
                                  ? (event) =>
                                      handleFirstImageLoad(event, user.userId)
                                  : undefined
                              }
                            />
                          </div>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10" />
                  <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10" />
                </Carousel>
              </CardContent>
              <CardFooter className="flex flex-row items-center justify-center">
                <Button variant="ghost" size="icon">
                  <HeartIcon size={24} />
                  <span className="sr-only">Like</span>
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
      <div ref={observerRef} />
      {isFetchingNextPage && <p>Loading more...</p>}
    </div>
  );
}
