import type { NextPage } from "next";
import Layout from "../components/layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ko";

interface Easynote {
  id: number;
  noteTitle: string;
  content: string;
  createdAt: {};
}

const Home: NextPage = () => {
  const [easynotes, setEasynotes] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("easynote"))
      setEasynotes(JSON.parse(localStorage.getItem("easynote")!));
  }, []);

  return (
    <Layout title="이지노트">
      <div className="mb-6 flex justify-between">
        <input
          type="search"
          className="w-80 rounded-lg bg-gray-100 p-2 focus-visible:border-black"
        />
        <button className="w-20 mr-3 bg-blue-600 text-white rounded-lg">
          검색
        </button>
        <select className="w-24" defaultValue={"created"}>
          <option value="created">생성 순</option>
          <option value="edited">수정 순</option>
        </select>
      </div>
      <div>
        {easynotes.map((note: any) => (
          <Link key={note?.id} href={`/todo/${note?.id}`}>
            <div className="w-full p-5 bg-gray-100 rounded-xl my-3">
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
