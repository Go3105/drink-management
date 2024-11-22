'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ShowVoteMessage({
  votedDrink,
}: {
  votedDrink: string;
}) {
  const searchParams = useSearchParams();
  const selectValue = searchParams.get('select'); // selectの値を取得
  const [isVisible, setIsVisible] = useState(false); // スライド表示のためのステート

  useEffect(() => {
    if (selectValue && selectValue !== votedDrink) {
      setIsVisible(true); // selectが存在する場合は表示
    } else {
      setIsVisible(false); // selectが存在しない場合は非表示
    }
  }, [selectValue, votedDrink]); // selectValueまたはvotedDrinkが変わるたびに実行

  // メッセージの内容
  const message = '左側のボタンを押したら投票完了!!';

  // isVisibleがfalseならコンポーネントを非表示にする
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`absolute bottom-20 left-0 right-0 z-50 transition-transform duration-300`}
    >
      {/* absolute を使用して画面の下から少し上に表示 */}
      <div className="mx-auto w-80 rounded-full bg-white p-4 text-center shadow-lg">
        {/* 楕円形を作成 */}
        <p className="font-bold text-red-500">{message}</p>
      </div>
    </div>
  );
}
