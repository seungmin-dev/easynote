import { NextPage } from "next";
import Layout from "../../components/layout";
import { cls } from "../../libs/util";
import moment from "moment";
import "moment/locale/ko";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

const Schedule: NextPage = () => {
  const router = useRouter();
  const [schenotes, setSchenotes] = useState([]);
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
      localStorage.getItem("schenote") &&
      localStorage.getItem("schenote")!.length > 0
    ) {
      if (confirm("정말로 노트를 전부 삭제하시겠어요?🥹")) {
        let temp = JSON.parse(localStorage.getItem("schenote")!);
        temp.splice(0, temp.length);
        localStorage.setItem("schenote", JSON.stringify(temp));
        setDeleteAll(true);
      } else return false;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("schenote") || deleteAll)
      setSchenotes(
        JSON.parse(localStorage.getItem("schenote")!)
          .reverse()
          .filter(function (note: { noteTitle: string }) {
            if (searchText.current?.value === "") return true;
            else return note.noteTitle.includes(searchText.current?.value);
          })
      );
    setSearch(false);
    setDeleteAll(false);
  }, [deleteAll, search]);

  return (
    <Layout title="날짜노트">
      <div className="mb-6 flex justify-between">
        <input
          type="text"
          className="w-80 rounded-lg bg-gray-100 p-2 pl-4 focus-visible:border-black"
          placeholder="제목으로 검색"
          ref={searchText}
        />
        <div>
          <button
            onClick={(e) => onClickSearch(e)}
            className={cls(
              "w-24 py-2 mr-2  text-white rounded-lg",
              schenotes.length > 0
                ? "bg-blue-600"
                : "bg-blue-300 cursor-not-allowed"
            )}
          >
            검색
          </button>
          <button
            onClick={(e) => onClickDeleteAll(e)}
            className={cls(
              "w-24 py-2  text-white rounded-lg",
              schenotes.length > 0
                ? "bg-red-600"
                : "bg-red-300 cursor-not-allowed"
            )}
          >
            전체삭제
          </button>
        </div>
      </div>
      <div>
        {schenotes.map((note: any) => (
          <Link key={note?.id} href={`/schedule/${note?.id}`}>
            <div className="w-full p-5 bg-gray-100 rounded-xl my-3 flex">
              <div className="w-20 mr-2">
                <h2 className="font-bold text-2xl text-center border-r-[1px] border-gray-300 mr-2 p-2 pl-0">
                  D{""}
                  {moment().diff(moment(note?.date), "days") == 0
                    ? `-day`
                    : moment().diff(moment(note?.date), "days") > 0
                    ? `+` + moment().diff(moment(note?.date), "days")
                    : moment().diff(moment(note?.date), "days")}
                </h2>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-400 text-xs">{note?.date}</h2>
                <div className="flex justify-between mb-1">
                  <h2 className="font-large text-xl">{note?.noteTitle}</h2>
                  <span className="text-gray-600 text-xs">
                    {moment(note?.createdAt).fromNow()}
                  </span>
                </div>
                <span className="text-gray-400 text-sm">{note?.content}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Schedule;
