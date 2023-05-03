import Image from "next/image";
import bgImage from "../components/background.jpg";
import { cls } from "../libs/util";
import Link from "next/link";
interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  return (
    <div className="w-full h-screen justify-center pt-20">
      <div className="w-xl max-w-xl m-auto rounded-2xl shadow-xl">
        <div className="bg-gray-200 w-full h-14 rounded-t-2xl flex items-center">
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
                  "w-32 h-10 mt-4 bg-white rounded-t-lg p-2 text-center",
                  title === "이지노트" ? "bg-white" : "bg-gray-100"
                )}
              >
                이지노트
              </div>
            </Link>
            <Link href="/schedule">
              <div
                className={cls(
                  "w-32 h-10 mt-4 bg-white rounded-t-lg p-2 text-center",
                  title === "날짜노트" ? "bg-white" : "bg-gray-100"
                )}
              >
                날짜노트
              </div>
            </Link>
            <Link href="/recommend">
              <div
                className={cls(
                  "w-32 h-10 mt-4 bg-white rounded-t-lg p-2 text-center",
                  title === "추천" ? "bg-white" : "bg-gray-100"
                )}
              >
                추천
              </div>
            </Link>
          </div>
          {/* 추가버튼 */}
          {title === "이지노트" || title === "날짜노트" ? (
            <div className="mr-5">
              <button className="font-light text-3xl text-slate-600">+</button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="bg-white p-6 w-fll min-h-lg rounded-b-2xl">
          {children}
        </div>
      </div>
      <Image
        src={bgImage}
        alt="배경이미지"
        fill
        style={{ objectFit: "cover", objectPosition: "center", zIndex: -100 }}
      />
    </div>
  );
}
