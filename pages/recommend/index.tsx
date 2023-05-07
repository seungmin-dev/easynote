import { NextPage } from "next";
import Layout from "../../components/layout";

const Recommend: NextPage = () => {
  return (
    <Layout title="추천">
      <div>
        <h1 className="pt-44 font-semibold text-2xl text-center text-zinc-500">
          새로운 기능이
          <br />곧 찾아옵니다 !
        </h1>
      </div>
    </Layout>
  );
};

export default Recommend;
