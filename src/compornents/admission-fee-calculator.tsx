import React from 'react';
import { Detail } from "src/compornents/detail"
import { Summary} from "src/compornents/summary"
import { FeeClassification } from "src/@types/FeeClassification";

type State = {
  feeClassifications: FeeClassification[];
}

/**
 * 料金計算コンポーネント。
 */
export class AdmissionFeeCalculator extends React.Component<{}, State> {
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