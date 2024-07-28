import React, { useContext, useEffect, useState } from "react";
import { StudentContext, LayoutContext, isAfterSeatArrangeContext, perfectSeatArrangeModeContext, fixedByGenderModeContext, seatClosestTeacherContext } from "@/app/page";
import { IsAfterSeatArrangeContextType } from "@/types/IsAfterSeatArrangeType";
import { StudentType } from "@/types/StudentType";
import { EachLabelContext } from "@/context/EachLabelContext";
import { useSession } from "next-auth/react";

interface getRecordProps {
  isActive: boolean;
}

const GetRecord: React.FC<getRecordProps> = ({ isActive }) => {
  const studentsContext = useContext(StudentContext);
  const students = studentsContext?.students || [];
  const updateStudents = studentsContext?.updateStudents;
  const layout = useContext(LayoutContext);
  const perfectSeatArrangeMode = useContext(perfectSeatArrangeModeContext);
  const isAfterSeatArrangeContextValue = useContext<IsAfterSeatArrangeContextType | null>(isAfterSeatArrangeContext);
  const fixedByGenderMode = useContext(fixedByGenderModeContext);
  const seatClosestTeacher = useContext(seatClosestTeacherContext);
  const eachLabelContext = useContext(EachLabelContext);

  const [studentsFromDB, setStudentsFromDB] = useState<StudentType[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const [totalPages, setTotalPages] = useState(1); // 総ページ数を管理する状態を追加
  const [data, setData] = useState<DataType[]>([]);
  const [label, setLabel] = useState("");
  const { data: session, status } = useSession();

  interface DataType {
    id: string;
    dataDate: string;
    jsonData?: string; // jsonData プロパティをオプションとして定義
    hashValue?: string;
  }

  useEffect(() => {
    if (studentsFromDB && students && updateStudents) {
      const updatedStudents = students.map((student) => {
        const studentFromDB = studentsFromDB.find((s) => s.IDforBackend === student.IDforBackend);
        if (studentFromDB) {
          return {
            ...student,
            name: studentFromDB.name,
            gender: studentFromDB.gender,
            currentSeat: {
              from_front: label === "before" ? studentFromDB.currentSeat.from_front : studentFromDB.assignedSeat.from_front,
              from_right: label === "before" ? studentFromDB.currentSeat.from_right : studentFromDB.assignedSeat.from_right,
            },
            assignedSeat: {
              from_front: 0,
              from_right: 0,
            },
            prefersFrontRow: studentFromDB.prefersFrontRow,
            prefersFrontTwoRows: studentFromDB.prefersFrontTwoRows,
            prefersBackRow: studentFromDB.prefersBackRow,
            prefersBackTwoRows: studentFromDB.prefersBackTwoRows,
            prefersLeftColumn: studentFromDB.prefersLeftColumn,
            prefersRightColumn: studentFromDB.prefersRightColumn,
            prefersNearTeacher: studentFromDB.prefersNearTeacher,
            studentsToPlaceNextTo: studentFromDB.studentsToPlaceNextTo,
            studentsToPlaceWithinTwoSeats: studentFromDB.studentsToPlaceWithinTwoSeats,
            studentsToPlaceAwayOneSeat: studentFromDB.studentsToPlaceAwayOneSeat,
            studentsToPlaceAwayTwoSeats: studentFromDB.studentsToPlaceAwayTwoSeats,
          };
        }
        return student;
      });

      // 並び替え
      const columns = layout?.columns || 0;
      const rows = layout?.rows || 0;
      updatedStudents.sort((a, b) => {
        const aPosition = a.currentSeat.from_front * columns + (rows - a.currentSeat.from_right);
        const bPosition = b.currentSeat.from_front * columns + (rows - b.currentSeat.from_right);
        return aPosition - bPosition;
      });
      updateStudents(updatedStudents);
    }
  }, [studentsFromDB, label]);

  const getRecord = async (page: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_USERDATA_SERVER}/userdata/${session?.user?.email}/paged?page=${page}&size=${size}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result.content); // データの内容を設定
      setTotalPages(result.totalPages); // 総ページ数を更新
    } catch (error: unknown) {
      console.error("Error occurred:", error);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const getDemo = async (index: number, label: string) => {
    try {
      if (data.length > 0) {
        let decodedData;
        if (data[index].jsonData) {
          decodedData = JSON.parse(data[index].jsonData as string); // 型アサーションを追加
        }
        if (decodedData.rows && decodedData.columns && layout && layout.setRows && layout.setColumns) {
          layout.setRows(decodedData.rows);
          layout.setColumns(decodedData.columns);
          // layoutの更新が完了するまで待機
          await new Promise((resolve) => setTimeout(resolve, 1));
        }
        if (decodedData.fixedByGenderMode && fixedByGenderMode && fixedByGenderMode.setFixedByGenderMode) {
          fixedByGenderMode.setFixedByGenderMode(decodedData.fixedByGenderMode);
        }
        if (decodedData.perfectSeatArrangeMode && perfectSeatArrangeMode && perfectSeatArrangeMode.setPerfectSeatArrangeMode) {
          perfectSeatArrangeMode.setPerfectSeatArrangeMode(decodedData.perfectSeatArrangeMode);
        }
        if (decodedData.isAfterSeatArrange && isAfterSeatArrangeContextValue && isAfterSeatArrangeContextValue.setIsAfterSeatArrange) {
          isAfterSeatArrangeContextValue.setIsAfterSeatArrange(decodedData.isAfterSeatArrange);
        }
        if (decodedData.seatClosestTeacher && seatClosestTeacher && seatClosestTeacher.setSeatClosestTeacherFrom_front && seatClosestTeacher.setSeatClosestTeacherFrom_right) {
          seatClosestTeacher.setSeatClosestTeacherFrom_front(decodedData.seatClosestTeacher.from_front);
          seatClosestTeacher.setSeatClosestTeacherFrom_right(decodedData.seatClosestTeacher.from_right);
        }
        if (decodedData.nextToPairs && eachLabelContext && eachLabelContext.setNextToPairs) {
          eachLabelContext.setNextToPairs(decodedData.nextToPairs);
        }
        if (decodedData.withInTwoSeatsPairs && eachLabelContext && eachLabelContext.setWithInTwoSeatsPairs) {
          eachLabelContext.setWithInTwoSeatsPairs(decodedData.withInTwoSeatsPairs);
        }
        if (decodedData.awayOneSeatsPairs && eachLabelContext && eachLabelContext.setAwayOneSeatsPairs) {
          eachLabelContext.setAwayOneSeatsPairs(decodedData.awayOneSeatsPairs);
        }
        if (decodedData.awayTwoSeatsPairs && eachLabelContext && eachLabelContext.setAwayTwoSeatsPairs) {
          eachLabelContext.setAwayTwoSeatsPairs(decodedData.awayTwoSeatsPairs);
        }
        setStudentsFromDB(decodedData.students);
        setLabel(label);
        console.log("Received data:", data[index].hashValue);
      }
    } catch (error: unknown) {
      console.error("Error occurred:", error);
    }
  };

  const deleteData = async (index: number) => {
    try {
      if (data[index] && data[index].hashValue) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_USERDATA_SERVER}/userdata/delete/${data[index].hashValue}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 削除が成功したら、データを再取得して表示を更新
        await getRecord(page);
        console.log("Data deleted successfully");
      } else {
        console.error("No hash value found for the selected item");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    getRecord(page);
  }, [page]);

  useEffect(() => {
    if (isActive) {
      getRecord(0);
    }
  }, [isActive]);

  return (
    <div className={` ml-5 bg-white flex-shrink-0 z-50 p-4 rounded-r-lg overflow-hidden ${isActive ? "block" : "hidden"}`} style={{ width: isActive ? "320px" : "0px", opacity: isActive ? 1 : 0 }}>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{status === "authenticated" ? `${session?.user?.name}さんの履歴` : "席替え履歴"}</h2>
      {data.length > 0 ? (
        <ul>
          {data.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <span className="mr-2">{new Date(item["dataDate"]).toLocaleString()}</span> {/* 日付を一般的な表記に変換 */}
              <div>
                <button className="text-blue-500 mr-2" onClick={() => getDemo(index, "before")}>
                  Before
                </button>
                <button className="text-green-500 mr-2" onClick={() => getDemo(index, "after")}>
                  After
                </button>
                <button className="text-red-500" onClick={() => deleteData(index)}>
                  削除
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : status === "unauthenticated" ? (
        <p>ログインしたユーザーのみ使える機能です。</p>
      ) : (
        <p>保存されたデータがありません。</p>
      )}
      <div className="flex justify-center w-full mt-2 space-x-2">
        {page > 0 && (
          <button className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring flex items-center justify-center" onClick={handlePreviousPage}>
            前の10件
          </button>
        )}
        {page < totalPages - 1 && (
          <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring flex items-center justify-center" onClick={handleNextPage}>
            次の10件
          </button>
        )}
      </div>
    </div>
  );
};

export default GetRecord;
