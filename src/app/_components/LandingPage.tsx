"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import React, { useRef } from "react";
import { BookOpenIcon, UsersIcon, RocketIcon } from "lucide-react";

import { useState, useEffect, useCallback } from "react";
import logo from "../../../public/images/landing/logo.jpeg";
import MainBanner from "../../../public/images/landing/mainBanner.png";
import Feature_1 from "../../../public/images/landing/feature1.png";
import Feature_2 from "../../../public/images/landing/feature2.png";
import Feature_3 from "../../../public/images/landing/feature3.png";
import AIFeature from "../../../public/images/landing/aiTechFeture.png";
import Tori from "../../../public/images/landing/tori.png";
import Coco from "../../../public/images/landing/coco.png";
import Dalgom from "../../../public/images/landing/dalgom.png";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const styles = `
  .shadow-text {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
`;
const characters = [
  {
    name: "토리",
    image: Tori,
    description:
      "MBTI: ENFP \n 좋아하는 책 종류: 문학, 소설, 동화 \n 책장 숲 속에 사는 귀여운 토끼에요! 발랄하고 밝아서 친구들에게 웃음을 주는 친구에요. 또 호기심이 많고 순수해서 친구들의 이야기 듣는 것을 가장 좋아해요 \n ",
  },
  {
    name: "달곰이",
    image: Dalgom,
    description:
      "MBTI: ISFJ \n 좋아하는 책 종류: 경제, 역사 \n 책장 숲 속에 사는 똑똑이 곰, 달곰이에요. 아는 것이 많아서 친구들이 질문하고 달곰이가 알려줄 때가 많아요. 다만 겨울이 오면 잠이 많아지는 잠꾸러기같은 모습도 있답니다. ",
  },
  {
    name: "코코",
    image: Coco,
    description:
      "MBTI: ISTP \n 좋아하는 책 종류: 자기계발서, 철학 \n 독서 도시에 사는 집냥이에요. 뭐든지 귀찮아하는게 특징이지만 왜인지 독서는 꾸준히 하는 친구에요. 혼자있는걸 정말 좋아한답니다. (너무 오랫동안 혼자 있으면 가끔 자기가 심심해서 친구들에게 먼저 놀라간답니다)",
  },
];

const useIntersectionObserver = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const currentRef = ref.current;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return [ref, isVisible] as const;
};

interface AnimatedComponentProps {
  children: React.ReactNode;
  animation?: "fade" | "slideUp" | "slideDown" | "slideLeft" | "slideRight";
  delay?: number;
  className?: string; // 새로 추가된 prop
}

const AnimatedComponent: React.FC<AnimatedComponentProps> = ({
  children,
  animation = "fade",
  delay = 0,
  className = "", // 기본값을 빈 문자열로 설정
}) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const animations = {
    fade: "opacity-0 transition-opacity duration-1000",
    slideUp: "translate-y-10 opacity-0 transition-all duration-1000",
    slideDown: "-translate-y-10 opacity-0 transition-all duration-1000",
    slideLeft: "translate-x-10 opacity-0 transition-all duration-1000",
    slideRight: "-translate-x-10 opacity-0 transition-all duration-1000",
  };

  return (
    <div
      ref={ref}
      className={`${animations[animation]} ${
        isVisible ? "opacity-100 translate-x-0 translate-y-0" : ""
      } ${className}`} // className을 여기에 추가
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setFormData({ name: "", phone: "", email: "" });
      } else {
        setError(result.error || "예약에 실패했습니다.");
      }
    } catch (err) {
      setError("서버와 연결할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const navbarHeight = 64; // 네비게이션 바의 높이 (px)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 스타일 추가 */}
      <style jsx global>
        {styles}
      </style>
      {/* 고정 네비게이션 */}
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-6 py-3">
          {/* 로고와 서비스 이름 */}
          <div className="flex justify-center items-center">
            <Image
              src={logo}
              className="h-10 w-12 mr-2"
              alt="모두의 책장 로고"
            />
            <span className="text-xl font-bold text-signitureColor drop-shadow-sm">
              모두의 책장
            </span>
          </div>
          <div className="flex justify-center items-center h-16">
            {/* 높이를 지정하여 세로 중앙 정렬 */}
            {/* 로고와 서비스 이름 */}

            <ul className="flex justify-center space-x-6 text-sm md:text-base">
              {["main", "features", "aI-tech", "character", "mvp"].map(
                (section) => (
                  <li key={section}>
                    <a
                      href={`#${section}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(section);
                      }}
                      className={`text-gray-700 hover:text-gray-900 cursor-pointer ${
                        activeSection === section
                          ? "border-b-2 border-[#51D9D1]"
                          : ""
                      }`}
                    >
                      {section.charAt(0).toUpperCase() +
                        section.slice(1).replace("-", " ")}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* 메인 헤더 섹션 */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden mt-16">
        <section id="main" className="">
          <div className="absolute inset-0 bg-center z-0">
            <Image
              className="object-cover"
              src={MainBanner}
              fill={true}
              alt="메인배너"
            />
          </div>

          {/* 검은색 오버레이 */}
          <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
          <div className="container mx-auto px-6 text-center relative z-20">
            <AnimatedComponent animation="slideDown">
              <h1 className="md:text-5xl font-bold mb-6 text-white shadow-text text-3xl">
                책을 사랑하는 당신의 고민! 모두의 책장이 해결해드립니다.
              </h1>
            </AnimatedComponent>
            <AnimatedComponent animation="slideUp" delay={300}>
              <p className="text-xl mb-8 text-white shadow-text">
                다른 사람들의 책장을 보고 더 넓은 독서 세상을 탐험하세요!
              </p>
            </AnimatedComponent>
            <AnimatedComponent animation="fade" delay={600}>
              <Button
                className="bg-[#51D9D1] hover:bg-[#3AC0B8] text-white mt-10"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("mvp");
                }}
              >
                바로 사전 예약하기
              </Button>
            </AnimatedComponent>
            <AnimatedComponent animation="fade" delay={600}>
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white mt-10"
                onClick={(e) => {
                  router.push("/community");
                }}
              >
                MVP 체험해보기
              </Button>
            </AnimatedComponent>
          </div>
        </section>
      </header>

      {/* 주요 기능 소개 섹션 */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <AnimatedComponent>
            <h2 className="text-3xl font-bold text-center mb-12">주요 기능</h2>
          </AnimatedComponent>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <BookOpenIcon className="h-12 w-12 text-[#51D9D1] mb-4" />
                ),
                title: "책 인식 AI 기술",
                description: `책장 사진 한 장으로 간편하게 당신의 책장을 정리하고 당신의 독서 현황을 진단할 수 있습니다.`,
                image: Feature_1,
              },
              {
                icon: <UsersIcon className="h-12 w-12 text-[#51D9D1] mb-4" />,
                title: "독서 취향 매칭",
                description:
                  "나와 독서 취향이 비슷한 다른 사람들의 책장과 그 책장에 담긴 이야기를 볼 수 있습니다",
                image: Feature_2,
              },
              {
                icon: <RocketIcon className="h-12 w-12 text-[#51D9D1] mb-4" />,
                title: "유명인 책장 탐험",
                description:
                  "내가 좋아하는 유명인들, 전문가들의 책장을 보고 그 발자취를 따라갈 수 있습니다",
                image: Feature_3,
              },
            ].map((feature, index) => (
              <AnimatedComponent
                key={index}
                animation="slideUp"
                delay={index * 200}
              >
                <Card className="flex flex-col h-full">
                  <CardContent className="flex flex-col items-center p-6 flex-grow">
                    {feature.icon}
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <div className="w-full h-full overflow-hidden rounded-md">
                      <Image
                        src={feature.image}
                        objectFit="cover"
                        className="drop-shadow-lg"
                        alt={feature.title}
                      />
                    </div>
                    <p className="text-center text-gray-600 whitespace-pre-line">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedComponent>
            ))}
          </div>
        </div>
      </section>

      {/* AI 기술 소개 섹션 */}
      <section id="aI-tech" className="bg-white py-32">
        <div className="container mx-auto px-6">
          <AnimatedComponent>
            <h2 className="text-4xl font-bold text-center mb-16 ">
              책장 사진 한 장으로 수 백 권의 책을 담다!
            </h2>
          </AnimatedComponent>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <AnimatedComponent
              animation="fade"
              className="md:w-1/2 mb-16 md:mb-0"
            >
              <Image
                src={AIFeature}
                alt="AI 책 인식 기술 소개"
                className="rounded-3xl "
              />
            </AnimatedComponent>
            <div className="hidden md:block w-px bg-gray-200 self-stretch mx-6"></div>
            <AnimatedComponent
              animation="fade"
              className="md:w-1/2 md:pl-12 sm:mr-0 sm:1/3"
            >
              <div>
                <h3 className="text-3xl font-semibold mb-6">
                  책장 사진 한 장이면, 책장에 어떤 책이 있는지 한 눈에 파악하기
                  쉽게!
                </h3>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  우리의 AI 기술은 책장 사진에서 개별 책의 제목, 저자, 출판사
                  등의 정보를 정확하게 인식합니다. 이를 통해 여러분의 책
                  컬렉션을 디지털화하고 쉽게 관리할 수 있습니다.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  더 이상 책장을 일일이 정리하거나 목록을 수동으로 작성할 필요가
                  없습니다. 단 한 장의 사진으로 여러분의 모든 책을 손쉽게
                  관리하세요.
                </p>
              </div>
            </AnimatedComponent>
          </div>
        </div>
      </section>

      {/* 캐릭터 소개 섹션 */}
      <section id="character" className="bg-slate-100 py-20">
        <div className="container mx-auto px-4">
          <AnimatedComponent>
            <h2 className="text-4xl font-bold text-center mb-4">
              당신의 취향껏 자유롭게 책장을 꾸미세요!
            </h2>
          </AnimatedComponent>
          <AnimatedComponent>
            <p className="text-xl text-center text-gray-600 mb-12">
              책장 숲속에는 귀여운 동물들이 살고 있어요🥰 다양한 캐릭터들과 함께
              당신의 책장을 꾸며보세요
            </p>
          </AnimatedComponent>
          <div className="grid md:grid-cols-3 gap-8">
            {characters.map((character, index) => (
              <Card
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <AnimatedComponent animation="slideRight">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-center text-black">
                      {character.name}
                    </h3>
                    <div className="mb-4 flex justify-center">
                      <Image src={character.image} alt="캐릭터 소개" />
                    </div>
                    <p className="text-gray-600 text-pretty whitespace-pre-line">
                      {character.description}
                    </p>
                  </CardContent>
                </AnimatedComponent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* MVP 체험 및 사전 예약 섹션 */}
      <section id="mvp" className="bg-white py-20">
        <div className="container mx-auto px-6">
          <AnimatedComponent>
            <h2 className="text-3xl font-bold text-center mb-12">
              공유책장은 곧 여러분을 만나러 갑니다!
            </h2>
          </AnimatedComponent>
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedComponent animation="slideRight">
              <Card>
                <CardHeader>
                  <CardTitle>미리 서비스를 체험하고 싶으신가요?</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => router.push("/mvp")}
                    className="w-full bg-[#51D9D1] hover:bg-[#3AC0B8] text-white disabled:"
                  >
                    MVP 링크 바로가기
                  </Button>
                </CardContent>
              </Card>
            </AnimatedComponent>
            <AnimatedComponent animation="slideDown">
              <Card>
                <CardHeader>
                  <CardTitle>서비스 사전 예약하기</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">이름</Label>
                      <Input
                        id="name"
                        placeholder="이름을 입력하세요"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">휴대폰 번호</Label>
                      <Input
                        id="phone"
                        placeholder="휴대폰 번호를 입력하세요"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">이메일 주소</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="이메일 주소를 입력하세요"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "예약 중..." : "사전 예약하기"}
                    </Button>
                    {success && <p>예약이 완료되었습니다!</p>}
                    {error && <p>{error}</p>}
                  </form>
                </CardContent>
              </Card>
            </AnimatedComponent>
          </div>
          <AnimatedComponent animation="slideUp" delay={400} className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>우리는 더욱 많은 의견이 필요합니다</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600">
                  주시는 소중한 의견 하나하나를 반영해서 최고의 서비스를
                  만들겠습니다.
                </p>
                <Button className="w-full bg-[#51D9D1] hover:bg-[#3AC0B8] text-white">
                  <Link href="https://forms.gle/DxTfbGfwaCZXHhs96">
                    설문 링크 바로가기
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </AnimatedComponent>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2023 모두의 책장. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
