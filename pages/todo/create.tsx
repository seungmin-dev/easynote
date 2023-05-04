import { NextPage } from "next";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import moment from "moment";
import "moment/locale/ko";
import { useRef } from "react";

interface SaveForm {
  id: Number;
  noteTitle: string;
  content: string;
}

const TodoCreate: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<SaveForm>();
  const noteTitle = useRef<HTMLInputElement | null>(null);
  const content = useRef<HTMLTextAreaElement | null>(null);
  const { ref: titleRef, ...titleRest } = register("noteTitle");
  const { ref: contentRef, ...contentReset } = register("content");

  const onClickBack = (e: any) => {
    e.preventDefault();
    if (confirm("작성하던 노트를 삭제하고 뒤로 가시겠어요?")) router.back();
    else return false;
  };

  const onSubmit = ({ noteTitle, content }: SaveForm) => {
    let easynote = [];
    if (localStorage.getItem("easynote"))
      easynote = JSON.parse(localStorage.getItem("easynote")!);
    else easynote = [];

    let data = {
      id: easynote.length + 1 + "",
      noteTitle,
      content,
      createdAt: moment(),
    };

    easynote.push(data);
    localStorage.setItem("easynote", JSON.stringify(easynote));

    alert("저장 성공!💖");
    router.push("/");
  };

  const onInvalid = (errors: any) => console.error(errors);

  return (
    <Layout title="새 이지노트">
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div className="w-full h-12 flex align-middle justify-between mb-4">
          <h1 className="w-32 text-2xl font-bold mb-3 item pt-2">
            새 이지노트
          </h1>
          <div>
            <button
              onClick={(e) => onClickBack(e)}
              className="w-24 h-10 mr-1 bg-blue-400 text-white rounded-xl"
            >
              뒤로가기
            </button>
            <input
              type="submit"
              className="w-16 h-10 bg-blue-600 text-white rounded-xl cursor-pointer"
              value="저장"
            />
          </div>
        </div>
        <input
          {...register("noteTitle", { required: true })}
          name="noteTitle"
          type="text"
          className="w-full mb-3 p-3 rounded-lg bg-gray-100 placeholder-gray-500"
          placeholder="제목을 입력하세요"
          ref={(e) => {
            titleRef(e);
            noteTitle.current = e;
          }}
        />
        <textarea
          {...register("content", { required: true })}
          name="content"
          className="w-full p-3 rounded-lg bg-gray-100 placeholder-gray-500"
          placeholder="이지노트를 작성하세요"
          ref={(e) => {
            contentRef(e);
            content.current = e;
          }}
        />
      </form>
    </Layout>
  );
};

export default TodoCreate;
