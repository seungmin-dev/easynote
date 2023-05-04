import { NextPage } from "next";
import Layout from "../../components/layout";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

interface Note {
  id: number;
  noteTitle: string;
  content: string;
  createdAt: string;
}
const TodoNote: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm();
  const { id } = router.query;

  useEffect(() => {
    if (localStorage.getItem("easynote")) {
      let easynote = JSON.parse(localStorage.getItem("easynote")!).filter(
        function (note: { id: string }) {
          return note.id === id;
        }
      );
      if (easynote[0]) {
        setValue("noteTitle", easynote[0].noteTitle);
        setValue("content", easynote[0].content);
      }
    }
  }, [router]);

  const onClickBack = () => {};
  const onSubmit = () => {};

  return (
    <Layout title="이지노트">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full h-12 flex align-middle justify-between mb-4">
          <h1 className="w-32 text-2xl font-bold mb-3 item pt-2">이지노트</h1>
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
          // onChange={(e) => titleChange()}
          {...register("noteTitle", {
            required: true,
          })}
          type="text"
          className="w-full mb-3 p-3 rounded-lg bg-gray-100 placeholder-gray-500"
          placeholder="제목을 입력하세요"
        />
        <textarea
          {...register("content", {
            required: true,
          })}
          name="content"
          className="w-full p-3 rounded-lg bg-gray-100 placeholder-gray-500"
          placeholder="이지노트를 작성하세요"
        />
      </form>
    </Layout>
  );
};

export default TodoNote;
function note(value: never, index: number, array: never[]): value is never {
  throw new Error("Function not implemented.");
}
