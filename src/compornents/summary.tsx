type Props = {
  numOfPeople: number;
  totalAmount: number;
}

/**
 * サマリー(合計)コンポーネント。
 */
export const Summary: React.FC<Props> = props => {
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