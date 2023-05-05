import type { NextPage } from "next";
import Layout from "../components/layout";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import "moment/locale/ko";
import { useRouter } from "next/router";
import { cls } from "../libs/util";

interface EasyNoteData {
  id: number;
  noteTitle: string;
  content: string;
  createdAt: string;
}
const Home: NextPage = () => {
  const router = useRouter();
  const [easynotes, setEasynotes] = useState([]);
  const [search, setSearch] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);
  const searchText = useRef<HTMLInputElement | null>(null);

  const onClickSearch = (e: any) => {
    e.preventDefault();
    setSearch(true);
  };

  const onClickDeleteAll = (e: any) => {
    e.preventDefault();
    if (
      localStorage.getItem("easynote") &&
      JSON.parse(localStorage.getItem("easynote")!).length > 0
    ) {
      if (confirm("정말로 노트를 전부 삭제하시겠어요?🥹")) {
        let temp = JSON.parse(localStorage.getItem("easynote")!);
        temp.splice(0, temp.length);
        localStorage.setItem("easynote", JSON.stringify(temp));
        setDeleteAll(true);
      } else return false;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("easynote") || deleteAll)
      setEasynotes(
        JSON.parse(localStorage.getItem("easynote")!)
          .reverse()
          .filter(function (note: { noteTitle: string }) {
            if (searchText.current?.value === "") return true;
            else return note.noteTitle.includes(searchText.current?.value);
          })
      );
    setSearch(false);
    setDeleteAll(false);
  }, [search, deleteAll]);

  return (
    <Layout title="이지노트">
      <div className="mb-6 flex justify-between">
        <input
          type="text"
          className="flex-grow mr-2 rounded-lg bg-gray-100 dark:bg-zinc-800 p-2 pl-4 focus-visible:border-black"
          placeholder="제목으로 검색"
          ref={searchText}
        />
        <div>
          <button
            onClick={(e) => onClickSearch(e)}
            className={cls(
              "w-24 py-2 mr-2  text-white rounded-lg",
              easynotes.length > 0
                ? "bg-blue-600 dark:bg-blue-700"
                : "bg-blue-300 dark:bg-blue-400 cursor-not-allowed"
            )}
          >
            검색
          </button>
          <button
            onClick={(e) => onClickDeleteAll(e)}
            className={cls(
              "w-24 py-2  text-white rounded-lg",
              easynotes.length > 0
                ? "bg-red-600 dark:bg-red-700"
                : "bg-red-300 dark:bg-red-400 cursor-not-allowed"
            )}
          >
            전체삭제
          </button>
        </div>
      </div>
      <div>
        {easynotes.map((note: EasyNoteData) => (
          <Link href={`/easy/${note.id}`} key={note.id}>
            <div className="w-full p-5 bg-gray-100 dark:bg-zinc-600 rounded-xl my-3">
              <div className="flex justify-between mb-1">
                <h2 className="font-large text-xl">{note?.noteTitle}</h2>
                <span className="text-gray-600 text-xs">
                  {moment(note?.createdAt).fromNow()}
                </span>
              </div>
              <span className="text-gray-400 text-sm">{note?.content}</span>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
