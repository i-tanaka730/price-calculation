import { FeeClassification } from "src/@types/FeeClassification";

type Props = {
  classfication: FeeClassification;
  onNumOfPeopleChange: (num: number) => void;
}

/**
 * 詳細コンポーネント。
 * (propsを受け取ってJSXを返却するアロー関数)
 */
export const Detail: React.FC<Props> = props => {

  // 人数選択コンボボックス変更時の処理
  const onNumOfPeopleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // 選択された数を指定して、propsの関数を呼び出す
    const num: number = Number(e.target.value);
    props.onNumOfPeopleChange(num);
  }

  // 人数選択コンボボックスのアイテム
  const numOfPeopleItems = [];
  for(let i=0; i < 10; i++) {
      numOfPeopleItems.push(<option value={i}>{[i]}</option>)
  };

  return (
    <tr>
      <td className="classification-name">{props.classfication.name}</td>
      <td className="description">{props.classfication.description}</td>
      <td className="unit-price">{props.classfication.unitPrice}円</td>
      <td className="num-people">
        <select value={props.classfication.numOfPeople} onChange={e => onNumOfPeopleChange(e)}>
                      {numOfPeopleItems}
        </select>
        <span>名</span>
      </td>
    </tr>
  );
}
