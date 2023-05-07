import { NextPage } from "next";
import Layout from "../../components/layout";
import { cls } from "../../libs/util";
import moment from "moment";
import "moment/locale/ko";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

interface ScheNote {
  id: number;
  noteTitle: string;
  content: string;
  date: string;
  createdAt: string;
}
const Schedule: NextPage = () => {
  const router = useRouter();
  const [method, setMethod] = useState("date");
  const [schenotes, setSchenotes] = useState<ScheNote[]>([]);
  const [search, setSearch] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);
  const searchText = useRef<HTMLInputElement | null>(null);
  const searchFromDate = useRef<HTMLInputElement | null>(null);
  const searchToDate = useRef<HTMLInputElement | null>(null);
  const searchDday = useRef<HTMLInputElement | null>(null);

  const onClickDate = () => {
    setMethod("date");
  };

  const onClickDday = () => {
    setMethod("dday");
  };

  const onClickInit = () => {
    searchFromDate.current!.value = "";
    searchToDate.current!.value = "";
  };

  const onClickSearch = (e: any) => {
    e.preventDefault();
    setSearch(true);
  };

  const onClickDeleteAll = (e: any) => {
    e.preventDefault();
    if (
      localStorage.getItem("schenote") &&
      JSON.parse(localStorage.getItem("schenote")!).length > 0
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
    if (localStorage.getItem("schenote") || deleteAll) {
      let temp: ScheNote[] = JSON.parse(localStorage.getItem("schenote")!)
        .reverse()
        .filter(function (note: {
          noteTitle: string;
          date: string;
          createdAt: string;
        }) {
          // if (searchToDate.current?.value === "")
          //   searchToDate.current!.value = moment().format("YYYY-MM-DD");
          if (searchText.current?.value === "") {
            //초기 무조건 검색 || 날짜 초기화 검색어 없이
            if (
              method === "date" &&
              searchFromDate.current?.value === "" &&
              searchToDate.current?.value === ""
            ) {
              return true;
            }
            // 날짜만
            if (method === "date" && searchFromDate) {
              return moment(note.date).isBetween(
                moment(searchFromDate.current?.value),
                moment(searchToDate.current?.value),
                null,
                "[]"
              );
            }
            //디데이만
            if (method === "dday" && searchDday) {
              return (
                moment(note.date).isAfter(moment()) &&
                Math.abs(moment().diff(moment(note.date), "days")) <=
                  Number(searchDday.current?.value)
              );
            }
            return true;
          } else if (searchText.current?.value !== "") {
            //날짜+검색어
            if (method === "date") {
              return (
                note.noteTitle.includes(searchText.current!.value) &&
                moment(note.date).isBetween(
                  searchFromDate.current?.value,
                  searchToDate.current?.value,
                  null,
                  "[]"
                )
              );
            }
            //디데이+검색어
            if (method === "dday") {
              return (
                note.noteTitle.includes(searchText.current!.value) &&
                moment(note.date).isAfter(moment()) &&
                Math.abs(moment().diff(moment(note.date), "days")) <=
                  Number(searchDday.current?.value)
              );
            }
            return note.noteTitle.includes(searchText.current!.value);
          }
        });

      // d-day가 3일 안인 노트는 상단으로 위치
      let under3 = temp.filter(function (item: ScheNote) {
        return Math.abs(moment().diff(item.date, "days")) <= 3;
      });

      let over3 = temp.filter(function (item: ScheNote) {
        return Math.abs(moment().diff(item.date, "days")) > 3;
      });

      setSchenotes([...under3, ...over3]);
    }
    setSearch(false);
    setDeleteAll(false);
  }, [deleteAll, method, search]);

  return (
    <Layout title="날짜노트">
      <div className="flex content-between mb-2">
        <div className="flex justify-content">
          <input
            type="button"
            onClick={onClickDate}
            className={cls(
              "w-24 p-2 rounded-lg rounded-r-none text-center cursor-pointer",
              method === "date"
                ? "bg-gray-100 dark:bg-zinc-800"
                : "bg-gray-200 dark:bg-zinc-600"
            )}
            value="날짜 우선"
          />
          <input
            type="button"
            onClick={onClickDday}
            className={cls(
              "w-28 rounded-lg rounded-l-none p-2 px-4 text-center mr-2 cursor-pointer",
              method === "dday"
                ? "bg-gray-100 dark:bg-zinc-800"
                : "bg-gray-200 dark:bg-zinc-600"
            )}
            value="디데이 우선"
          />
        </div>
        {method === "date" ? (
          <>
            <input
              type="date"
              ref={searchFromDate}
              // defaultValue={moment().format("YYYY-MM-DD")}
              className="text-base leading-7  bg-gray-100 dark:bg-zinc-800 rounded-lg text-center p-1 pr-2"
            />{" "}
            <span className="leading-9 px-1 text-center">-</span>
            <input
              type="date"
              ref={searchToDate}
              // defaultValue={moment().format("YYYY-MM-DD")}
              className="text-base leading-7 mr-2 bg-gray-100 dark:bg-zinc-800 rounded-lg text-center p-1 pr-2"
            />
            <input
              type="button"
              onClick={onClickInit}
              className="w-28 rounded-lg bg-gray-100 dark:bg-zinc-800 text-center"
              value="날짜 초기화"
            />
          </>
        ) : (
          ""
        )}
        {method === "dday" ? (
          <>
            <h4 className="text-lg mr-1 ml-2 leading-9">D - </h4>
            <input
              type="text"
              ref={searchDday}
              className="w-20 rounded-lg bg-gray-100 dark:bg-zinc-800 p-2 pl-4 focus-visible:border-black"
            />
          </>
        ) : (
          ""
        )}
      </div>
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
              "w-24 py-2 mr-2  text-white rounded-lg bg-blue-600 dark:bg-blue-700"
            )}
          >
            검색
          </button>
          <button
            onClick={(e) => onClickDeleteAll(e)}
            className={cls(
              "w-24 py-2  text-white rounded-lg",
              schenotes.length > 0
                ? "bg-red-600 dark:bg-red-700"
                : "bg-red-300 dark:bg-red-400 cursor-not-allowed"
            )}
          >
            전체삭제
          </button>
        </div>
      </div>
      <div className="h-[24rem] overflow-y-scroll">
        {schenotes.map((note: any) => (
          <Link key={note?.id} href={`/schedule/${note?.id}`}>
            <div
              className={cls(
                "w-full p-5 rounded-xl my-3 flex",
                Math.abs(moment().diff(moment(note?.date), "days")) <= 3
                  ? "bg-red-100 dark:bg-red-300"
                  : "bg-gray-100 dark:bg-zinc-600"
              )}
            >
              <div className="w-20 mr-2">
                <h2
                  className={cls(
                    "font-bold text-2xl text-center border-r-[1px] border-gray-300 mr-2 p-2 pl-0 ",

                    Math.abs(moment().diff(moment(note?.date), "days")) <= 3
                      ? "text-red-600 "
                      : "",
                    moment().diff(moment(note?.date), "days") === 0
                      ? "leading-1"
                      : "leading-[4rem]"
                  )}
                >
                  D{""}
                  {/* d-day */}
                  {moment
                    .duration(
                      moment(note?.date, "YYYY-MM-DD").diff(
                        moment().startOf("day")
                      )
                    )
                    .asDays() == 0
                    ? `-day`
                    : moment
                        .duration(
                          moment(note?.date, "YYYY-MM-DD").diff(
                            moment().startOf("day")
                          )
                        )
                        .asDays() > 0
                    ? `-` +
                      Number(
                        moment
                          .duration(
                            moment(note?.date, "YYYY-MM-DD").diff(
                              moment().startOf("day")
                            )
                          )
                          .asDays()
                      )
                    : `+` +
                      Math.abs(
                        moment
                          .duration(
                            moment(note?.date, "YYYY-MM-DD").diff(
                              moment().startOf("day")
                            )
                          )
                          .asDays()
                      )}
                </h2>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-400 text-xs">{note?.date}</h2>
                <div className="flex justify-between mb-1">
                  <h2 className="font-large text-xl">{note?.noteTitle}</h2>
                  <span className="text-gray-600 dark:text-white text-xs">
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
