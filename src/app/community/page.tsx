"use client";

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
import { Heart, Trash2, UserIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePostsQuery } from "./hooks/usePostsQuery";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Loading from "../components/loading";
import { readingTypeInfo } from "../result/resultData";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { usePostDeleteMutation } from "./hooks/usePostDeleteMutation";
import debounce from "lodash/debounce";
import { useLikeMutation } from "./hooks/useLikeMutation";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLikeQuery } from "./hooks/useLikeQuery";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Post from "./components/Post";

export default function Page() {
  const [sorting, setSorting] = useState("createdAt");
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = usePostsQuery(sorting);
  const { data: userLikes } = useLikeQuery();
  const { mutate } = usePostDeleteMutation();
  const { mutate: likeMutate } = useLikeMutation();

  const router = useRouter();

  const observerElem = useRef<IntersectionObserver | null>(null);
  const [password, setPassword] = useState("");
  const [firstImageSizes, setFirstImageSizes] = useState<{
    [key: string]: { width: number; height: number };
  }>({});
  const [postId, setPostId] = useState<number>(0);
  const [api, setApi] = useState<CarouselApi>();
  const [carousels, setCarousels] = useState<{
    [key: number]: CarouselApi | null;
  }>({});
  const [carouselStates, setCarouselStates] = useState<{
    [key: number]: { current: number; count: number };
  }>({});
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [likes, setLikes] = useState<{ [key: number]: boolean }>({});

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // console.log(current, count);

  // useEffect(() => {
  //   if (!api) {
  //     return;
  //   }

  //   setCount(api.scrollSnapList().length);
  //   setCurrent(api.selectedScrollSnap() + 1);

  //   api.on("select", () => {
  //     setCurrent(api.selectedScrollSnap() + 1);
  //   });
  // }, [api]);

  // const updateCarouselState = useCallback(
  //   (postId: number, api: CarouselApi) => {
  //     const count = api.scrollSnapList().length;
  //     const current = api.selectedScrollSnap() + 1;

  //     setCarouselStates((prevState) => ({
  //       ...prevState,
  //       [postId]: { current, count },
  //     }));

  //     api.on("select", () => {
  //       const newCurrent = api.selectedScrollSnap() + 1;
  //       setCarouselStates((prevState) => ({
  //         ...prevState,
  //         [postId]: { ...prevState[postId], current: newCurrent },
  //       }));
  //     });
  //   },
  //   []
  // );

  // const setApi = useCallback(
  //   (postId: number, api: CarouselApi) => {
  //     setCarousels((prevApis) => ({
  //       ...prevApis,
  //       [postId]: api,
  //     }));
  //     updateCarouselState(postId, api);
  //   },
  //   [updateCarouselState]
  // );

  const observer = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;

      if (observerElem.current) {
        observerElem.current.disconnect();
      }

      observerElem.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerElem.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  const handleSubmit = async () => {
    mutate({ postId, password });
    setPassword("");
  };

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

  const sendLikeRequest = useCallback(
    async (likeStatus: boolean, postId: number) => {
      try {
        likeMutate({ likeStatus, postId });
        setLikes((prevLikes) => ({
          ...prevLikes,
          [postId]: likeStatus,
        }));
      } catch (error) {
        console.error("Failed to send like request", error);
      }
    },
    [likeMutate]
  );
  const debouncedLikeRequest = useMemo(
    () =>
      debounce(
        (likeStatus, postId) => sendLikeRequest(likeStatus, postId),
        1000
      ),
    [sendLikeRequest]
  );
  const handleLike = (postId: number) => {
    const newLikedStatus = !likes[postId];
    setLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: newLikedStatus,
    }));
    debouncedLikeRequest(newLikedStatus, postId);
  };

  useEffect(() => {
    if (userLikes) {
      const initialLikes = userLikes.reduce(
        (acc: { [key: number]: boolean }, postId: number) => {
          acc[postId] = true;
          return acc;
        },
        {}
      );
      setLikes(initialLikes);
    }
  }, [userLikes]);

  if (isError) {
    if (error.message === "401") {
      toast({
        variant: "destructive",
        title: "세션이 존재하지 않거나 만료되었습니다.",
        description: "홈화면으로 돌아갑니다.",
      });
      router.push("/");
    } else {
      toast({
        variant: "destructive",
        title: "오류가 발생했습니다.",
        description: "잠시후 다시 시도해주세요.",
      });
    }
  }

  if (!data || !userLikes) {
    return <Loading />;
  }

  return (
    <AlertDialog>
      <div className="flex flex-col w-full h-full max-w-md p-4 mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">다른 사람들의 책장은?</h1>
          <p className="text-muted-foreground">
            다른 독서가들은 어떤 책들을 갖고 어떤 책들을 읽을까요? 마음껏
            둘러보세요!
          </p>
        </div>
        <div className="flex justify-end p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {sorting === "createdAt" ? "최신순" : "좋아요순"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>정렬</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={sorting}
                onValueChange={setSorting}
              >
                <DropdownMenuRadioItem value="createdAt">
                  최신순
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="likeCount">
                  좋아요순
                </DropdownMenuRadioItem>
                {/* <DropdownMenuRadioItem value="right">
                  Right
                </DropdownMenuRadioItem> */}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="p-2 space-y-4">
          {data.pages.map((page, pageIndex) => (
            <div key={pageIndex} className="space-y-6">
              {page.map((post) => (
                <Card key={post.postId} className="rounded-lg shadow-md">
                  <CardHeader className="flex items-center justify-between">
                    <div className="flex items-center justify-between w-full space-x-2 ">
                      <div className="flex flex-row items-center space-x-2">
                        <UserIcon className="w-6 h-6" />
                        <div>
                          <p className="font-semibold">{post.user.nickname}</p>
                          <p className="text-sm text-muted-foreground">
                            {readingTypeInfo[
                              post.user
                                .readingType as keyof typeof readingTypeInfo
                            ]?.type || "알 수 없음"}
                          </p>
                        </div>
                      </div>
                      <AlertDialogTrigger asChild>
                        <Trash2
                          onClick={() => setPostId(post.postId)}
                          className="transition rounded-full cursor-pointer hover:bg-gray-200 hover:bg-opacity-20"
                        />
                      </AlertDialogTrigger>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-row items-center justify-around w-full h-full">
                    <Post likes={likes} handleLike={handleLike} post={post} />
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}
        </div>
        <div ref={observer}>
          {isFetchingNextPage ? <Loading /> : hasNextPage ? <Loading /> : null}
        </div>
      </div>
      <AlertDialogContent className="flex flex-col justify-center">
        <AlertDialogHeader className="flex flex-col items-center justify-center">
          <AlertDialogTitle className="text-2xl">
            책장을 정말로 삭제하시겠습니까?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col items-center justify-center w-full mb-4 space-y-4">
          <AlertDialogDescription className="w-full text-center">
            이 작업은 되돌릴 수 없습니다. 계속하려면 비밀번호를 입력하세요.
          </AlertDialogDescription>
          <label htmlFor="password" className="mb-2">
            비밀번호를 입력하세요:
          </label>
          <input
            id="password"
            className="p-2 mb-4 border rounded"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setPassword("");
            }}
          >
            취소
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>삭제</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
