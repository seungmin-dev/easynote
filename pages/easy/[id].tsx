import { NextPage } from "next";
import Layout from "../../components/layout";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import moment from "moment";

interface Note {
  id: number;
  noteTitle: string;
  content: string;
  createdAt: string;
}
interface SaveForm {
  id: Number;
  noteTitle: string;
  content: string;
}

const EasyNote: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<SaveForm>();
  const { id } = router.query;
  const noteTitle = useRef<HTMLInputElement | null>(null);
  const content = useRef<HTMLTextAreaElement | null>(null);
  const { ref: titleRef, ...titleRest } = register("noteTitle");
  const { ref: contentRef, ...contentReset } = register("content");

  // 초기값
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

  const onClickBack = (e: any) => {
    e.preventDefault();
    if (noteTitle.current?.value !== "" || content.current?.value !== "") {
      if (confirm("노트 수정을 그만두고 뒤로 가시겠어요?")) router.back();
      else return false;
    }
  };

  const onSubmit = ({ noteTitle, content }: SaveForm) => {
    let easynote = [];
    if (localStorage.getItem("easynote"))
      easynote = JSON.parse(localStorage.getItem("easynote")!);
    else easynote = [];

    let data = {
      id: router.query.id + "",
      noteTitle,
      content,
      createdAt: moment(),
    };

    let index = JSON.parse(localStorage.getItem("easynote")!).findIndex(
      (item: { id: string }) => item.id === id
    );
    easynote.splice(index, 1);
    easynote.push(data);
    localStorage.setItem("easynote", JSON.stringify(easynote));

    alert("저장 성공!💖");
    router.push("/");
  };

  const onCilckDelete = (e: any) => {
    e.preventDefault();

    if (confirm("노트를 삭제하시겠어요?🥹")) {
      let easynote = [];
      if (localStorage.getItem("easynote"))
        easynote = JSON.parse(localStorage.getItem("easynote")!);
      else easynote = [];

      let index = JSON.parse(localStorage.getItem("easynote")!).findIndex(
        (item: { id: string }) => item.id === id
      );
      easynote.splice(index, 1);
      localStorage.setItem("easynote", JSON.stringify(easynote));

      router.push("/");
    } else return false;
  };

  return (
    <Layout title="날짜노트">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full h-12 flex align-middle justify-between mb-4">
          <h1 className="w-32 text-2xl font-bold mb-3 item pt-2">이지노트</h1>
          <div>
            <button
              onClick={(e) => onClickBack(e)}
              className="w-24 h-10 mr-1 bg-blue-400 dark:bg-blue-500 text-white rounded-xl"
            >
              뒤로가기
            </button>
            <input
              type="submit"
              // onClick={onClickSave}
              className="w-16 h-10 bg-blue-600 dark:bg-blue-700 text-white rounded-xl cursor-pointer"
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
          className="w-full mb-3 p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 placeholder-gray-500"
          placeholder="제목을 입력하세요"
          ref={(e) => {
            titleRef(e);
            noteTitle.current = e;
          }}
        />
        <textarea
          {...register("content", {
            required: true,
          })}
          name="content"
          className="w-full p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 placeholder-gray-500"
          placeholder="이지노트를 작성하세요"
          ref={(e) => {
            contentRef(e);
            content.current = e;
          }}
        />
        <div className="flex">
          <button
            onClick={(e) => onCilckDelete(e)}
            className="w-24 h-10 mr-1 bg-red-500 dark:bg-red-600 text-white rounded-xl"
          >
            삭제
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default EasyNote;
