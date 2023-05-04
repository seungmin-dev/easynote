import Image from "next/image";
import bgImage from "../components/background.jpg";
import { cls } from "../libs/util";
import Link from "next/link";
import { useRouter } from "next/router";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  const router = useRouter();
  const newNote = () => {
    if (title === "이지노트") router.push("/easy/create");
    else if (title === "날짜노트") router.push("/schedule/create");
  };
  return (
    <div className="w-full h-screen justify-center pt-32">
      <div className="w-2xl min-w-2xl max-w-2xl max-h-[40rem] m-auto rounded-2xl shadow-xl overflow-y-hidden">
        {/* 상단탭 */}
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
                  "w-32 h-10 mt-4 rounded-t-lg p-2 text-center",
                  title.includes("이지노트") ? "bg-white" : "bg-gray-100"
                )}
              >
                이지노트
              </div>
            </Link>
            <Link href="/schedule">
              <div
                className={cls(
                  "w-32 h-10 mt-4 rounded-t-lg p-2 text-center",
                  title.includes("날짜노트") ? "bg-white" : "bg-gray-100"
                )}
              >
                날짜노트
              </div>
            </Link>
            <Link href="/recommend">
              <div
                className={cls(
                  "w-32 h-10 mt-4 rounded-t-lg p-2 text-center",
                  title === "추천" ? "bg-white" : "bg-gray-100"
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
                className="font-light text-3xl text-slate-600"
              >
                +
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* 하단 하얀부분 */}
        <div className="bg-white p-6 w-full rounded-b-2xl">{children}</div>
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
