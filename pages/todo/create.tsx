import { NextPage } from "next";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const TodoCreate: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onClickBack = () => {
    // input이 비어있지 않으면 alert
    // alert("작성하던 노트를 삭제하고 뒤로 가시겠습니까?");
  };
  const onSubmit = () => {};

  return (
    <Layout title="새 이지노트">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full h-12 flex align-middle justify-between mb-4">
          <h1 className="w-32 text-2xl font-bold mb-3 item pt-2">
            새 이지노트
          </h1>
          <div>
            <button
              onClick={onClickBack}
              className="w-24 h-10 mr-1 bg-blue-400 text-white rounded-xl"
            >
              뒤로가기
            </button>
            <input
              type="submit"
              // onClick={onClickSave}
              className="w-16 h-10 bg-blue-600 text-white rounded-xl"
              value="저장"
            />
          </div>
        </div>
        <input
          {...register("noteTitle", { required: true })}
          type="text"
          className="w-full mb-3 p-3 rounded-lg bg-gray-100 placeholder-gray-500"
          placeholder="제목을 입력하세요"
        />
        <textarea
          {...register("note", { required: true })}
          name="note"
          className="w-full p-3 rounded-lg bg-gray-100 placeholder-gray-500"
          placeholder="이지노트를 작성하세요"
        />
      </form>
    </Layout>
  );
};

export default TodoCreate;
