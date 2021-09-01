import React from 'react';
import './App.css';

// アプリケーション内で共通的に使用する型の定義
type FeeClassification = {
  name: string;
  description: string;
  unitPrice: number;
  numOfPeople: number;
  totalPrice: number;
}

type DetailProps = {
  classfication: FeeClassification;
  onNumOfPeopleChange: (num: number) => void;
}

/**
 * 詳細コンポーネント。
 * (propsを受け取ってJSXを返却するアロー関数)
 */
const Detail: React.FC<DetailProps> = props => {

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

type SummaryProps = {
  numOfPeople: number;
  totalAmount: number;
}

/**
 * サマリー(合計)コンポーネント。
 */
const Summary: React.FC<SummaryProps> = props => {
  return (
    <div>
      <div className="party">
        <input type="text" className="party" value={props.numOfPeople} />
        <span>名様</span>
      </div>
      <div className="total-amount">
        <span>合計</span>
        <input type="text" className="total-amount" value={props.totalAmount} />
        <span>円</span>
      </div>
    </div>
  );
}

type AdmissionFeeCalculatorState = {
  feeClassifications: FeeClassification[];
}

/**
 * 料金計算コンポーネント。
 */
class AdmissionFeeCalculator extends React.Component<{}, AdmissionFeeCalculatorState> {
  constructor(props: {}) {
    super(props);

    // 明細データを作成する
    const adults: FeeClassification = {
      name: "大人",
      description: "",
      unitPrice: 1000,
      numOfPeople: 0,
      totalPrice: 0
    };
    const students: FeeClassification = {
      name: "学生",
      description: "中学生・高校生",
      unitPrice: 700,
      numOfPeople: 0,
      totalPrice: 0
    };
    const children: FeeClassification = {
      name: "子供",
      description: "小学生",
      unitPrice: 300,
      numOfPeople: 0,
      totalPrice: 0
    };
    const infants: FeeClassification = {
      name: "幼児",
      description: "未就学",
      unitPrice: 0,
      numOfPeople: 0,
      totalPrice: 0
    };

    // 初期値として明細データをステートに設定する
    this.state = { feeClassifications: [adults, students, children, infants] };
  }

  // 詳細コンポーネントで人数が変更された場合のイベントハンドラ
  handleNumOfPeopleChange(idx: number, num: number) {
    // 変更対象の明細を取得
    const currentFC = this.state.feeClassifications[idx];
    // 単価と人数で料金を再計算
    const newTotalPrice = currentFC.unitPrice * num;
    // 人数と合計額以外は既存の値をコピー
    const newFC: FeeClassification = Object.assign({}, currentFC, {numOfPeople: num, totalPrice: newTotalPrice});
    // 新たな配列を作成
    const feeClassifications = this.state.feeClassifications.slice();
    feeClassifications[idx] = newFC;

    // stateの更新
    this.setState({ feeClassifications: feeClassifications });
  }

  render() {
    const details = this.state.feeClassifications.map((fc, idx) => {
      return (
                    <Detail key={idx.toString()} classfication={fc} onNumOfPeopleChange={n => this.handleNumOfPeopleChange(idx, n)} />
      );
    });

    const numOfPeople = this.state.feeClassifications
      .map(fc => fc.numOfPeople).reduce((p, c) => p + c);
    const totalAmount = this.state.feeClassifications
      .map(fc => fc.totalPrice).reduce((p, c) => p + c);

    return (
      <>
          <table className="regularTable">
            <thead>
              <tr>
                <th>名前</th>
                <th>説明</th>
                <th>金額</th>
                <th>人数</th>
              </tr>
            </thead>
            {details}
          </table>
        <Summary numOfPeople={numOfPeople} totalAmount={totalAmount}/>
      </>
    );
  }
}

/**
 * アプリケーション。
 */
const App: React.FC = () => {
  return (
    <div className="main">
      <AdmissionFeeCalculator />
    </div>
  );
}

export default App;