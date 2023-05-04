import { NextPage } from "next";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import moment from "moment";
import "moment/locale/ko";
import { useRef } from "react";

interface SaveForm {
  id: Number;
  date: string;
  noteTitle: string;
  content: string;
}

const ScheCreate: NextPage = () => {
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

  const onSubmit = ({ date, noteTitle, content }: SaveForm) => {
    let schenote = [];
    if (localStorage.getItem("schenote"))
      schenote = JSON.parse(localStorage.getItem("schenote")!);
    else schenote = [];

    let data = {
      id: schenote.length + 1 + "",
      date,
      noteTitle,
      content,
      createdAt: moment(),
    };

    schenote.push(data);
    localStorage.setItem("schenote", JSON.stringify(schenote));

    alert("저장 성공!💖");
    router.push("/schedule");
  };

  const onInvalid = (errors: any) => console.error(errors);

  return (
    <Layout title="새 날짜노트">
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div className="w-full h-10 flex align-middle justify-between mb-4">
          <h1 className="flex-grow text-2xl font-bold mb-3 item pt-2">
            새 날짜노트
          </h1>
          <input
            {...register("date", { required: true })}
            type="date"
            defaultValue={moment().format("YYYY-MM-DD")}
            className="text-base bg-gray-100 rounded-lg text-center px-2 mr-2"
          />
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
          placeholder="날짜노트를 작성하세요"
          ref={(e) => {
            contentRef(e);
            content.current = e;
          }}
        />
      </form>
    </Layout>
  );
};

export default ScheCreate;
