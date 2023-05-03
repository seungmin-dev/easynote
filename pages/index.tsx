import type { NextPage } from "next";
import Layout from "../components/layout";

const Home: NextPage = () => {
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
        <select className="w-24">
          <option value="created" selected>
            생성 순
          </option>
          <option value="edited">수정 순</option>
        </select>
      </div>
      <div>
        <div className="w-full p-5 bg-gray-100 rounded-xl my-3">
          <div className="flex justify-between mb-1">
            <h2 className="font-large text-xl">이지노트</h2>
            <span className="text-gray-600 text-xs">몇 초 전</span>
          </div>
          <span className="text-gray-400 text-sm">
            어쩌구저쩌구이러쿵저러쿵
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
