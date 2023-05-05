import Image from "next/image";
import lightBgImage from "../components/light_background.jpg";
import darkBgImage from "../components/dark_background.jpg";
import { cls } from "../libs/util";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const themeBtn = useRef<HTMLInputElement | null>(null);
  const newNote = () => {
    console.log(router.pathname);
    if (router.pathname.includes("schedule")) router.push("/schedule/create");
    else router.push("/easy/create");
  };
  const variants = {
    true: { x: 0 },
    false: { x: 28 },
  };

  return (
    <div className="w-full h-screen justify-center pt-32">
      <div className="w-2xl min-w-2xl max-w-2xl max-h-[40rem] m-auto rounded-2xl shadow-xl overflow-y-hidden">
        <div className="w-full h-9 mb-2 flex flex-row-reverse">
          <div className="w-16 h-9 rounded-full bg-blue-600 flex">
            <motion.div
              className="w-7 h-7 rounded-full bg-white mt-1 ml-1 cursor-pointer"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              animate={theme === "light" ? "true" : "false"}
              variants={variants}
              transition={{ ease: "easeOut", duration: 0.1 }}
            />
          </div>
        </div>
        {/* 상단탭 */}
        <div className="bg-gray-200 dark:bg-zinc-600 w-full h-14 rounded-t-2xl flex items-center">
          {/* 색깔버튼블럭 */}
          <div className="w-24 flex items-center justify-between p-2 pl-6">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
            <div className="w-4 h-4 bg-green-600 rounded-full"></div>
          </div>
          {/* 페이지탭 */}
          <div className="w-72 h-full ml-3 flex flex-grow ">
            <Link href="/">
              <div
                className={cls(
                  "w-32 h-10 mt-4 rounded-t-lg p-2 text-center",
                  title.includes("이지노트")
                    ? "bg-white dark:bg-zinc-700"
                    : "bg-gray-100 dark:bg-zinc-500"
                )}
              >
                이지노트
              </div>
            </Link>
            <Link href="/schedule">
              <div
                className={cls(
                  "w-32 h-10 mt-4 rounded-t-lg p-2 text-center",
                  title.includes("날짜노트")
                    ? "bg-white dark:bg-zinc-700"
                    : "bg-gray-100 dark:bg-zinc-500"
                )}
              >
                날짜노트
              </div>
            </Link>
            <Link href="/recommend">
              <div
                className={cls(
                  "w-32 h-10 mt-4 rounded-t-lg p-2 text-center",
                  title === "추천"
                    ? "bg-white dark:bg-zinc-700"
                    : "bg-gray-100 dark:bg-zinc-500"
                )}
              >
                추천
              </div>
            </Link>
          </div>
          {/* 추가버튼 */}
          {title.includes("노트") && !title.includes("새") ? (
            <div className="mr-5">
              <button
                onClick={newNote}
                className="font-light text-3xl text-slate-600 dark:text-zinc-100"
              >
                +
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* 하단 하얀부분 */}
        <div className="w-full h-[35rem] bg-white dark:bg-zinc-700 p-6 rounded-b-2xl">
          {children}
        </div>
      </div>
      <Image
        src={theme === "light" ? lightBgImage : darkBgImage}
        alt="배경이미지"
        fill
        style={{ objectFit: "cover", objectPosition: "center", zIndex: -100 }}
      />
    </div>
  );
}
